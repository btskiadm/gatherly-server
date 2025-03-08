import { MercuriusContext } from "mercurius";
import { userValidator, userWithProfileValidator } from "../prisma/validators/user.validators";
import { User, UserWithProfile } from "../model/model";

export default {
  Query: {
    getUsers: async (_: unknown, args: unknown, { prisma }: MercuriusContext): Promise<User[]> => {
      return await prisma.user.findMany({ include: userValidator });
    },
    getUsersByUsername: async (
      _: unknown,
      { username }: { username: string },
      { prisma }: MercuriusContext
    ): Promise<User[]> => {
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
      { username }: { username: string },
      { prisma }: MercuriusContext
    ): Promise<UserWithProfile | null> => {
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
