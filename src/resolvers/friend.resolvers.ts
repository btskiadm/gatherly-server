import { FriendRequestStatus, NotificationType } from "@prisma/client";
import { MercuriusContext } from "mercurius";
import {
  GetFriendsListResponse,
  GetReceivedFriendRequestsResponse,
  GetSentFriendRequestsReponse,
  MutationAcceptFriendRequestArgs,
  MutationCancelFriendRequestArgs,
  MutationCancelFriendshipArgs,
  MutationDeclineFriendRequestArgs,
  MutationSendFriendRequestArgs,
  QueryGetFriendsListArgs,
  QueryGetReceivedFriendRequestsArgs,
  QueryGetSentFriendRequestsArgs,
} from "../model/model";
import { env } from "../utils/env";
import { AuthError } from "../errors/auth.error";

function sortIds(id1: string, id2: string): [string, string] {
  return id1 < id2 ? [id1, id2] : [id2, id1];
}

export default {
  Query: {
    async getReceivedFriendRequests(
      _: unknown,
      { skip, take }: QueryGetReceivedFriendRequestsArgs,
      { user, prisma }: MercuriusContext
    ): Promise<GetReceivedFriendRequestsResponse> {
      const userId = user?.id;
      if (!userId) {
        throw new AuthError();
      }
      const [friendRequests, count] = await Promise.all([
        prisma.friendRequest.findMany({
          where: { receiverId: user.id, status: FriendRequestStatus.PENDING },
          include: { sender: true, receiver: true },
          skip: skip ?? 0,
          take: take ?? 10,
        }),
        prisma.friendRequest.count({
          where: { receiverId: user.id, status: FriendRequestStatus.PENDING },
        }),
      ]);

      return {
        friendRequests: friendRequests.map((request) => ({
          ...request,
          sender: {
            ...request.sender,
            largePhoto: `${env.PHOTOS_BUCKET_URL}/${request.sender.largePhoto}`,
            mediumPhoto: `${env.PHOTOS_BUCKET_URL}/${request.sender.mediumPhoto}`,
            smallPhoto: `${env.PHOTOS_BUCKET_URL}/${request.sender.smallPhoto}`,
          },
        })),
        count: count,
      };
    },
    async getSentFriendRequests(
      _: unknown,
      { skip, take }: QueryGetSentFriendRequestsArgs,
      { user, prisma }: MercuriusContext
    ): Promise<GetSentFriendRequestsReponse> {
      const userId = user?.id;
      if (!userId) {
        throw new AuthError();
      }

      const [friendRequests, count] = await Promise.all([
        prisma.friendRequest.findMany({
          where: { senderId: user.id, status: FriendRequestStatus.PENDING },
          include: { sender: true, receiver: true },
          skip: skip ?? 0,
          take: take ?? 10,
        }),
        prisma.friendRequest.count({
          where: { senderId: user.id, status: FriendRequestStatus.PENDING },
        }),
      ]);

      return {
        friendRequests: friendRequests.map((request) => ({
          ...request,
          receiver: {
            ...request.receiver,
            largePhoto: `${env.PHOTOS_BUCKET_URL}/${request.receiver.largePhoto}`,
            mediumPhoto: `${env.PHOTOS_BUCKET_URL}/${request.receiver.mediumPhoto}`,
            smallPhoto: `${env.PHOTOS_BUCKET_URL}/${request.receiver.smallPhoto}`,
          },
        })),
        count: count,
      };
    },
    async getFriendsList(
      _: unknown,
      { userId: userIdArg, skip, take }: QueryGetFriendsListArgs,
      { user, prisma }: MercuriusContext
    ): Promise<GetFriendsListResponse> {
      const userId = userIdArg || user?.id;
      if (!userId) {
        throw new AuthError();
      }

      const [friendships, friendshipsCount] = await Promise.all([
        prisma.friendship.findMany({
          where: {
            OR: [{ user1Id: userId }, { user2Id: userId }],
          },
          include: {
            user1: true,
            user2: true,
          },
          skip: skip ?? 0,
          take: take ?? 6,
        }),
        prisma.friendship.count({
          where: {
            OR: [{ user1Id: userId }, { user2Id: userId }],
          },
        }),
      ]);

      return {
        friends: friendships.map((fs) => {
          const friend = fs.user1Id === userId ? fs.user2 : fs.user1;
          return {
            id: fs.id,
            createdAt: fs.createdAt,
            user: {
              ...friend,
              largePhoto: `${env.PHOTOS_BUCKET_URL}/${friend.largePhoto}`,
              mediumPhoto: `${env.PHOTOS_BUCKET_URL}/${friend.mediumPhoto}`,
              smallPhoto: `${env.PHOTOS_BUCKET_URL}/${friend.smallPhoto}`,
            },
          };
        }),
        count: friendshipsCount,
      };
    },
  },

  Mutation: {
    async sendFriendRequest(_: unknown, { receiverId }: MutationSendFriendRequestArgs, context: MercuriusContext) {
      if (!context.user?.id) {
        throw new Error("Unauthorized");
      }
      const senderId = context.user.id;
      if (senderId === receiverId) {
        throw new Error("Nie możesz wysłać zaproszenia samemu sobie.");
      }
      // Sprawdź, czy zaproszenie już istnieje lub użytkownicy są już znajomymi
      const existingRequest = await context.prisma.friendRequest.findUnique({
        where: { senderId_receiverId: { senderId, receiverId } },
      });
      if (existingRequest) {
        throw new Error("Zaproszenie już istnieje.");
      }
      // Opcjonalnie: sprawdzenie, czy użytkownicy są już znajomymi
      const [sortedId1, sortedId2] = sortIds(senderId, receiverId);
      const existingFriendship = await context.prisma.friendship.findUnique({
        where: { user1Id_user2Id: { user1Id: sortedId1, user2Id: sortedId2 } },
      });
      if (existingFriendship) {
        throw new Error("Jesteście już znajomymi.");
      }
      return context.prisma.friendRequest.create({
        data: {
          sender: { connect: { id: senderId } },
          receiver: { connect: { id: receiverId } },
        },
        include: { sender: true, receiver: true },
      });
    },

    async acceptFriendRequest(_: unknown, { requestId }: MutationAcceptFriendRequestArgs, context: MercuriusContext) {
      if (!context.user) {
        throw new Error("Unauthorized");
      }
      const friendRequest = await context.prisma.friendRequest.findUnique({
        where: { id: requestId },
      });
      if (!friendRequest) {
        throw new Error("Zaproszenie nie znalezione.");
      }
      if (friendRequest.receiverId !== context.user.id) {
        throw new Error("Nie możesz zaakceptować tego zaproszenia.");
      }
      if (friendRequest.status !== FriendRequestStatus.PENDING) {
        throw new Error("Zaproszenie nie jest w stanie oczekiwania.");
      }

      return await context.prisma.$transaction(async (tx) => {
        const friendRequest = await tx.friendRequest.update({
          where: { id: requestId },
          data: { status: FriendRequestStatus.ACCEPTED },
        });

        const [user1Id, user2Id] = sortIds(friendRequest.senderId, friendRequest.receiverId);

        const friendship = await tx.friendship.create({
          data: {
            user1: { connect: { id: user1Id } },
            user2: { connect: { id: user2Id } },
          },
          include: { user1: true, user2: true },
        });

        const notification = await tx.notification.create({
          data: {
            recipient: {
              connect: {
                id: friendRequest.senderId,
              },
            },
            type: NotificationType.FRIEND_ACCEPTED,
            data: friendship,
          },
        });

        context.pubsub.publish({
          topic: NotificationType.FRIEND_ACCEPTED,
          payload: {
            notification,
          },
        });

        return friendship;
      });
    },

    async cancelFriendship(_: unknown, { friendshipId }: MutationCancelFriendshipArgs, context: MercuriusContext) {
      const userId = context.user?.id;
      if (!userId) {
        throw new AuthError();
      }

      const friendship = await context.prisma.friendship.findFirst({
        where: {
          AND: [
            {
              id: friendshipId,
            },
            {
              OR: [{ user1Id: userId }, { user2Id: userId }],
            },
          ],
        },
      });

      if (!friendship) {
        throw new AuthError();
      }

      return await context.prisma.friendship.delete({
        where: {
          id: friendship.id,
        },
        include: {
          user1: true,
          user2: true,
        },
      });
    },

    async declineFriendRequest(_: unknown, { requestId }: MutationDeclineFriendRequestArgs, context: MercuriusContext) {
      if (!context.user) {
        throw new Error("Unauthorized");
      }
      const friendRequest = await context.prisma.friendRequest.findUnique({
        where: { id: requestId },
      });
      console.dir({ friendRequest });
      if (!friendRequest) {
        throw new Error("Zaproszenie nie znalezione.");
      }
      if (friendRequest.receiverId !== context.user.id) {
        throw new Error("Nie możesz odrzucić tego zaproszenia.");
      }
      if (friendRequest.status !== FriendRequestStatus.PENDING) {
        throw new Error("Zaproszenie nie jest w stanie oczekiwania.");
      }
      const wtf = await context.prisma.friendRequest.update({
        where: { id: requestId },
        data: { status: FriendRequestStatus.DECLINED },
        include: { sender: true, receiver: true },
      });
      return wtf;
    },

    async cancelFriendRequest(_: unknown, { requestId }: MutationCancelFriendRequestArgs, context: MercuriusContext) {
      if (!context.user) {
        throw new Error("Unauthorized");
      }
      const friendRequest = await context.prisma.friendRequest.findUnique({
        where: { id: requestId },
      });
      if (!friendRequest) {
        throw new Error("Zaproszenie nie znalezione.");
      }
      if (friendRequest.senderId !== context.user.id) {
        throw new Error("Nie możesz anulować tego zaproszenia.");
      }
      if (friendRequest.status !== FriendRequestStatus.PENDING) {
        throw new Error("Zaproszenie nie jest w stanie oczekiwania.");
      }
      // Możesz zdecydować, czy anulowanie oznacza usunięcie rekordu czy aktualizację statusu – tu zmieniamy status
      return context.prisma.friendRequest.update({
        where: { id: requestId },
        data: { status: FriendRequestStatus.DECLINED },
        include: { sender: true, receiver: true },
      });
    },
  },
};
