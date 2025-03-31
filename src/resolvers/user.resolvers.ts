import { MercuriusContext } from "mercurius";
import { Query, QueryGetUsersByUsernameArgs, QueryGetUserWithProfileArgs } from "../model/model";
import { userValidator } from "../prisma/validators/user.validators";

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
      return await prisma.user.findMany({
        where: {
          username: {
            contains: username,
          },
        },
      });
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
  },
};
