import GraphQLJSON from "graphql-type-json";
import { MercuriusContext, withFilter } from "mercurius";
import { AuthError } from "../errors/auth.error";
import {
  MutationMarkAsReadArgs,
  Notification,
  NotificationsResponse,
  QueryNotificationsArgs,
  SubscriptionNotificationAddedArgs,
} from "../model/model";
import { NotificationType } from "@prisma/client";

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
        notifications,
      };
    },
  },

  Mutation: {
    addNotification: async (_: unknown, __: unknown, { pubsub }: MercuriusContext) => {
      const n: Notification = { createdAt: new Date(), id: "11", read: false, type: "EVENT_INVITE" };
      pubsub.publish({
        topic: "NOTIFICATION_ADDED",
        payload: {
          notificationAdded: n,
        },
      });
      return true;
    },
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
  },

  Subscription: {
    notificationAdded: {
      subscribe: withFilter(
        (__: unknown, { recipientId }: SubscriptionNotificationAddedArgs, { pubsub }: MercuriusContext) =>
          pubsub.subscribe(NotificationType.FRIEND_ACCEPTED),
        async (payload, { recipientId }: SubscriptionNotificationAddedArgs, context) => {
          return true;
        }
      ),
    },
  },
};
