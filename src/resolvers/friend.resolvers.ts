import { FriendRequestStatus, NotificationType, Prisma } from "@prisma/client";
import { MercuriusContext } from "mercurius";
import { AuthError } from "../errors/auth.error";
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
import { userWithEnvPhotoPrefix } from "../utils/user";

function sortIds(id1: string, id2: string): [string, string] {
  return id1 < id2 ? [id1, id2] : [id2, id1];
}

export default {
  Query: {
    async getReceivedFriendRequests(
      _: unknown,
      { skip = 0, take = 10 }: QueryGetReceivedFriendRequestsArgs,
      { user, prisma }: MercuriusContext
    ): Promise<GetReceivedFriendRequestsResponse> {
      if (!user?.id) throw new AuthError();

      const [friendRequests, count] = await Promise.all([
        prisma.friendRequest.findMany({
          where: { receiverId: user.id, status: FriendRequestStatus.PENDING },
          include: { sender: true, receiver: true },
          skip,
          take,
        }),
        prisma.friendRequest.count({
          where: { receiverId: user.id, status: FriendRequestStatus.PENDING },
        }),
      ]);

      return {
        friendRequests: friendRequests.map((request) => ({
          ...request,
          sender: userWithEnvPhotoPrefix(request.sender),
        })),
        count,
      };
    },

    async getSentFriendRequests(
      _: unknown,
      { skip = 0, take = 10 }: QueryGetSentFriendRequestsArgs,
      { user, prisma }: MercuriusContext
    ): Promise<GetSentFriendRequestsReponse> {
      if (!user?.id) throw new AuthError();

      const [friendRequests, count] = await Promise.all([
        prisma.friendRequest.findMany({
          where: { senderId: user.id, status: FriendRequestStatus.PENDING },
          include: { sender: true, receiver: true },
          skip,
          take,
        }),
        prisma.friendRequest.count({
          where: { senderId: user.id, status: FriendRequestStatus.PENDING },
        }),
      ]);

      return {
        friendRequests: friendRequests.map((request) => ({
          ...request,
          receiver: userWithEnvPhotoPrefix(request.receiver),
        })),
        count,
      };
    },

    async getFriendsList(
      _: unknown,
      { userId: userIdArg, skip = 0, take = 6 }: QueryGetFriendsListArgs,
      { user, prisma }: MercuriusContext
    ): Promise<GetFriendsListResponse> {
      const userId = userIdArg || user?.id;
      if (!userId) throw new AuthError();

      const [friendships, count] = await Promise.all([
        prisma.friendship.findMany({
          where: {
            OR: [{ user1Id: userId }, { user2Id: userId }],
          },
          include: { user1: true, user2: true },
          skip,
          take,
          orderBy: {
            createdAt: "desc",
          },
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
            user: userWithEnvPhotoPrefix(friend),
          };
        }),
        count,
      };
    },
  },

  Mutation: {
    async sendFriendRequest(_: unknown, { receiverIds }: MutationSendFriendRequestArgs, context: MercuriusContext) {
      const senderId = context.user?.id;
      if (!senderId) throw new AuthError();

      const validReceivers: string[] = [];

      for (const receiverId of receiverIds) {
        if (receiverId === senderId) continue;

        const [id1, id2] = sortIds(senderId, receiverId);

        const [existingRequest, existingFriendship] = await Promise.all([
          context.prisma.friendRequest.findUnique({
            where: { senderId_receiverId: { senderId, receiverId } },
          }),
          context.prisma.friendship.findUnique({
            where: { user1Id_user2Id: { user1Id: id1, user2Id: id2 } },
          }),
        ]);

        if (!existingRequest && !existingFriendship) {
          validReceivers.push(receiverId);
        }
      }

      if (validReceivers.length === 0) {
        throw new Error("Brak ważnych zaproszeń do wysłania.");
      }

      return context.prisma.$transaction(
        async (tx) => {
          const requests = [];

          for (const receiverId of validReceivers) {
            const friendRequest = await tx.friendRequest.create({
              data: {
                sender: { connect: { id: senderId } },
                receiver: { connect: { id: receiverId } },
              },
              include: { sender: true, receiver: true },
            });

            const notification = await tx.notification.create({
              data: {
                recipient: { connect: { id: receiverId } },
                type: NotificationType.FRIEND_REQUEST,
                data: friendRequest,
              },
            });

            context.pubsub.publish({
              topic: NotificationType.FRIEND_REQUEST,
              payload: {
                notificationAdded: {
                  ...notification,
                  data: {
                    ...friendRequest,
                    sender: userWithEnvPhotoPrefix(friendRequest.sender),
                    receiver: userWithEnvPhotoPrefix(friendRequest.receiver),
                  },
                },
              },
            });

            requests.push(friendRequest);
          }

          return requests;
        },
        {
          maxWait: 10_000,
          timeout: 20_000,
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        }
      );
    },

    async acceptFriendRequest(_: unknown, { requestId }: MutationAcceptFriendRequestArgs, context: MercuriusContext) {
      const userId = context.user?.id;
      if (!userId) throw new AuthError();

      const request = await context.prisma.friendRequest.findUnique({ where: { id: requestId } });

      if (!request || request.receiverId !== userId) {
        throw new Error("Nie możesz zaakceptować tego zaproszenia.");
      }

      if (request.status !== FriendRequestStatus.PENDING) {
        throw new Error("Zaproszenie nie jest oczekujące.");
      }

      return context.prisma.$transaction(async (tx) => {
        // await tx.friendRequest.update({
        //   where: { id: requestId },
        //   data: { status: FriendRequestStatus.ACCEPTED },
        // });
        await tx.friendRequest.delete({
          where: {
            id: requestId,
          },
        });

        const [user1Id, user2Id] = sortIds(request.senderId, request.receiverId);

        const friendship = await tx.friendship.create({
          data: {
            user1: { connect: { id: user1Id } },
            user2: { connect: { id: user2Id } },
          },
          include: { user1: true, user2: true },
        });

        const notification = await tx.notification.create({
          data: {
            recipient: { connect: { id: request.senderId } },
            type: NotificationType.FRIEND_ACCEPTED,
            data: friendship,
          },
        });

        context.pubsub.publish({
          topic: NotificationType.FRIEND_ACCEPTED,
          payload: {
            notificationAdded: {
              ...notification,
              data: {
                ...friendship,
                user1: userWithEnvPhotoPrefix(friendship.user1),
                user2: userWithEnvPhotoPrefix(friendship.user2),
              },
            },
          },
        });

        return friendship;
      });
    },

    async cancelFriendship(_: unknown, { friendshipId }: MutationCancelFriendshipArgs, context: MercuriusContext) {
      const userId = context.user?.id;
      if (!userId) throw new AuthError();

      const friendship = await context.prisma.friendship.findFirst({
        where: {
          id: friendshipId,
          OR: [{ user1Id: userId }, { user2Id: userId }],
        },
      });

      if (!friendship) throw new AuthError();
      // todo : delete friend request
      return context.prisma.friendship.delete({
        where: { id: friendship.id },
        include: { user1: true, user2: true },
      });
    },

    async declineFriendRequest(_: unknown, { requestId }: MutationDeclineFriendRequestArgs, context: MercuriusContext) {
      const userId = context.user?.id;
      if (!userId) throw new AuthError();

      const request = await context.prisma.friendRequest.findUnique({
        where: { id: requestId },
      });

      if (!request || request.receiverId !== userId) {
        throw new Error("Nie możesz odrzucić tego zaproszenia.");
      }

      if (request.status !== FriendRequestStatus.PENDING) {
        throw new Error("Zaproszenie nie jest oczekujące.");
      }

      // return context.prisma.friendRequest.update({
      //   where: { id: requestId },
      //   data: { status: FriendRequestStatus.DECLINED },
      //   include: { sender: true, receiver: true },
      // });
      return context.prisma.friendRequest.delete({
        where: { id: requestId },
        include: { sender: true, receiver: true },
      });
    },

    async cancelFriendRequest(_: unknown, { requestId }: MutationCancelFriendRequestArgs, context: MercuriusContext) {
      const userId = context.user?.id;
      if (!userId) throw new AuthError();

      const request = await context.prisma.friendRequest.findUnique({
        where: { id: requestId },
      });

      if (!request || request.senderId !== userId) {
        throw new Error("Nie możesz anulować tego zaproszenia.");
      }

      if (request.status !== FriendRequestStatus.PENDING) {
        throw new Error("Zaproszenie nie jest oczekujące.");
      }

      // return context.prisma.friendRequest.update({
      //   where: { id: requestId },
      //   data: { status: FriendRequestStatus.DECLINED },
      //   include: { sender: true, receiver: true },
      // });
      return context.prisma.friendRequest.delete({
        where: { id: requestId },
        include: { sender: true, receiver: true },
      });
    },
  },
};
