import { MercuriusContext } from "mercurius";
import { Query } from "../model/model";
import { env } from "../utils/env";

export default {
  Query: {
    users: async (_: unknown, args: unknown, { prisma }: MercuriusContext): Promise<Query["users"]> => {
      const users = await prisma.user.findMany({});
      return users.map(({ id, createdAt, email, largePhoto, mediumPhoto, role, smallPhoto, username, status }) => ({
        id,
        createdAt,
        email,
        role,
        status,
        smallPhoto: `${env.PHOTOS_BUCKET_URL}/${smallPhoto}`,
        mediumPhoto: `${env.PHOTOS_BUCKET_URL}/${mediumPhoto}`,
        largePhoto: `${env.PHOTOS_BUCKET_URL}/${largePhoto}`,
        username,
      }));
    },
    groups: async (_: unknown, args: unknown, { prisma }: MercuriusContext): Promise<Query["groups"]> => {
      const groups = await prisma.group.findMany({
        include: {
          events: {
            select: {
              id: true,
            },
          },
          users: {
            select: {
              id: true,
            },
          },
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
        orderBy: {
          createdAt: "desc",
        },
      });

      return groups.map(
        ({
          createdAt,
          description,
          categories,
          cities,
          events,
          id,
          largePhoto,
          mediumPhoto,
          smallPhoto,
          status,
          title,
          updatedAt,
          users,
        }) => ({
          id,
          title,
          description,
          createdAt,
          updatedAt,
          status,
          categories: categories.map((c) => c.category),
          cities: cities.map((c) => c.city),
          largePhoto: `${env.PHOTOS_BUCKET_URL}/${largePhoto}`,
          mediumPhoto: `${env.PHOTOS_BUCKET_URL}/${mediumPhoto}`,
          smallPhoto: `${env.PHOTOS_BUCKET_URL}/${smallPhoto}`,

          eventsCount: events.length,
          usersCount: users.length,
        })
      );
    },
  },
};
