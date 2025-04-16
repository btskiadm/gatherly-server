import { MercuriusContext } from "mercurius";
import {
  Query,
  QueryGetUserGroupTilesArgs,
  QueryGetUsersByUsernameArgs,
  QueryGetUserWithProfileArgs,
} from "../model/model";
import { userValidator } from "../prisma/validators/user.validators";
import { count } from "console";
import { env } from "../utils/env";
import { userWithEnvPhotoPrefix } from "../utils/user";

export default {
  Query: {
    getUsers: async (_: unknown, args: unknown, { prisma }: MercuriusContext): Promise<Query["getUsers"]> => {
      return await prisma.user.findMany({ include: userValidator });
    },
    getUsersByUsername: async (
      _: unknown,
      { username }: QueryGetUsersByUsernameArgs,
      { prisma }: MercuriusContext
    ): Promise<Query["getUsersByUsername"]> => {
      const users = await prisma.user.findMany({
        where: {
          username: {
            contains: username,
          },
        },
      });
      return users.map(userWithEnvPhotoPrefix);
    },
    getUserWithProfile: async (
      _: unknown,
      { userId }: QueryGetUserWithProfileArgs,
      { prisma }: MercuriusContext
    ): Promise<Query["getUserWithProfile"]> => {
      return await prisma.user.findFirst({
        where: {
          id: {
            contains: userId,
          },
        },
        include: {
          profile: {
            include: {
              categories: {
                include: {
                  category: true,
                },
              },
              cities: {
                include: {
                  city: true,
                },
              },
            },
          },
        },
      });
    },
    getUserGroupTiles: async (
      _: unknown,
      { groupId, skip, take, search }: QueryGetUserGroupTilesArgs,
      { prisma }: MercuriusContext
    ): Promise<Query["getUserGroupTiles"]> => {
      const [users, count] = await Promise.all([
        prisma.groupUser.findMany({
          where: {
            groupId,
          },
          include: {
            user: {
              include: {
                _count: {
                  select: {
                    groups: true,
                    events: true,
                    hostEvents: true,
                    friendshipUser1: true,
                    friendshipUser2: true,
                  },
                },
              },
            },
          },
          skip: skip,
          take: take,
        }),
        prisma.groupUser.count({
          where: {
            groupId,
          },
        }),
      ]);

      return {
        userGroupTiles: users.map(({ groupId, id, role, user, userId }) => {
          return {
            role,
            userTile: {
              ...user,
              smallPhoto: `${env.PHOTOS_BUCKET_URL}/${user.smallPhoto}`,
              mediumPhoto: `${env.PHOTOS_BUCKET_URL}/${user.mediumPhoto}`,
              largePhoto: `${env.PHOTOS_BUCKET_URL}/${user.largePhoto}`,
              eventsCount: user._count.events + user._count.hostEvents,
              groupsCount: user._count.groups,
              friendsCount: user._count.friendshipUser1 + user._count.friendshipUser2,
            },
          };
        }),
        count,
      };
    },
  },
};
