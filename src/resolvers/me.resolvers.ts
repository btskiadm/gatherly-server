import { MercuriusContext } from "mercurius";
import { Query } from "../model/model";
import { env } from "process";

export default {
  Query: {
    me: async (_: unknown, args: unknown, { user, prisma }: MercuriusContext): Promise<Query["me"]> => {
      if (!user) {
        return null;
      }

      const prismaUser = await prisma.user.findFirst({
        where: {
          id: user.id,
        },
      });

      return prismaUser
        ? {
            ...prismaUser,
            largePhoto: `${env.PHOTOS_BUCKET_URL}/${prismaUser.largePhoto}`,
            mediumPhoto: `${env.PHOTOS_BUCKET_URL}/${prismaUser.mediumPhoto}`,
            smallPhoto: `${env.PHOTOS_BUCKET_URL}/${prismaUser.smallPhoto}`,
          }
        : null;
    },
  },
};
