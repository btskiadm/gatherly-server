import { MercuriusContext } from "mercurius";
import { userValidator, userWithProfileValidator } from "../prisma/validators/user.validators";
import { Query, QueryGetUsersByUsernameArgs, QueryGetUserWithProfileArgs, User, UserWithProfile } from "../model/model";

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
        include: userValidator,
      });
    },
    getUserWithProfile: async (
      _: unknown,
      { username }: QueryGetUserWithProfileArgs,
      { prisma }: MercuriusContext
    ): Promise<Query["getUserWithProfile"]> => {
      return await prisma.user.findFirst({
        where: {
          username: {
            contains: username,
          },
        },
        include: userWithProfileValidator,
      });
    },
  },
};
