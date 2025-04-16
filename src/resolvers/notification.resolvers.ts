import GraphQLJSON from "graphql-type-json";
import { MercuriusContext, withFilter } from "mercurius";
import { AuthError } from "../errors/auth.error";
import {
  MutationDeleteNotificationArgs,
  MutationMarkAsReadArgs,
  Notification,
  NotificationsResponse,
  QueryNotificationsArgs,
  SubscriptionNotificationAddedArgs,
} from "../model/model";
import { NotificationType, Prisma } from "@prisma/client";
import { env } from "../utils/env";

export default {
  JSON: GraphQLJSON,

  Query: {
    notifications: async (
      _: unknown,
      { skip, take }: QueryNotificationsArgs,
      { user, prisma }: MercuriusContext
    ): Promise<NotificationsResponse> => {
      if (!user?.id) {
        throw new AuthError();
      }

      function replacePhotoFieldsInJson(input: Prisma.JsonValue, bucketUrl: string): Prisma.JsonValue {
        if (Array.isArray(input)) {
          return input.map((item) => replacePhotoFieldsInJson(item, bucketUrl));
        }

        if (input !== null && typeof input === "object") {
          const updated: Record<string, Prisma.JsonValue> = {};

          for (const [key, value] of Object.entries(input)) {
            if (value) {
              if (
                (key === "largePhoto" || key === "mediumPhoto" || key === "smallPhoto") &&
                typeof value === "string"
              ) {
                updated[key] = `${bucketUrl}/${value}`;
              } else {
                updated[key] = replacePhotoFieldsInJson(value, bucketUrl);
              }
            }
          }

          return updated;
        }

        return input;
      }

      const [notifications, count] = await Promise.all([
        prisma.notification.findMany({
          where: {
            recipientId: user?.id,
          },
          skip,
          take,
          orderBy: {
            createdAt: "desc",
          },
        }),
        prisma.notification.count({
          where: {
            recipientId: user?.id,
          },
        }),
      ]);

      return {
        count,
        notifications: notifications.map((notification) => ({
          ...notification,
          data: replacePhotoFieldsInJson(notification.data, env.PHOTOS_BUCKET_URL),
        })),
      };
    },
  },

  Mutation: {
    markAsRead: async (
      _: any,
      { id }: MutationMarkAsReadArgs,
      { user, prisma }: MercuriusContext
    ): Promise<Notification> => {
      if (!user?.id) {
        throw new AuthError();
      }

      const update = await prisma.notification.update({
        where: {
          id: id,
          recipientId: user.id,
        },
        data: {
          read: true,
        },
      });

      return update;
    },
    deleteNotification: async (
      _: any,
      { id }: MutationDeleteNotificationArgs,
      { user, prisma }: MercuriusContext
    ): Promise<Notification> => {
      const userId = user?.id;
      if (!userId) {
        throw new AuthError();
      }

      return await prisma.notification.delete({
        where: {
          recipient: {
            id: userId,
          },
          id,
        },
      });
    },
  },

  Subscription: {
    notificationAdded: {
      subscribe: withFilter(
        (__: unknown, { recipientId }: SubscriptionNotificationAddedArgs, { pubsub }: MercuriusContext) =>
          pubsub.subscribe(NotificationType.FRIEND_ACCEPTED),
        async (payload, { recipientId }: SubscriptionNotificationAddedArgs, context) => {
          console.dir({ payload, recipientId });
          return payload.notificationAdded.recipientId === recipientId;
        }
      ),
    },
  },
};
