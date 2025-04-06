import { MercuriusContext } from "mercurius";
import { Mutation, MutationCreateEventArgs, Query, QueryGetEventTilesByUserIdArgs } from "../model/model";
import { env } from "../utils/env";

export default {
  Mutation: {
    createEvent: async (
      _: unknown,
      { groupId, createEventInput }: MutationCreateEventArgs,
      { prisma, user }: MercuriusContext
    ): Promise<Mutation["createEvent"]> => {
      const { title, description, categories, cities, endAt, startAt } = createEventInput;
      const { id, role } = user ?? {};

      try {
        const newEvent = await prisma.event.create({
          data: {
            title,
            description,
            startAt,
            endAt,
            smallPhoto: "128x128",
            mediumPhoto: "256x256",
            largePhoto: "512x512",
            group: {
              connect: {
                id: groupId,
              },
            },
            categories: {
              create: categories.map((catValue) => ({
                category: { connect: { value: catValue } },
              })),
            },
            cities: {
              create: cities.map((cityValue) => ({
                city: { connect: { value: cityValue } },
              })),
            },
            users: {
              create: {
                role: "MEMBER",
                user: {
                  connect: {
                    id,
                  },
                },
              },
            },
          },
        });

        return { success: true, eventId: newEvent.id };
      } catch (error) {
        console.error("Error creating group:", error);
        return { success: false };
      }
    },
  },
  Query: {
    getEventTilesByUserId: async (
      _: unknown,
      { userId, skip: _skip, take: _take }: QueryGetEventTilesByUserIdArgs,
      { prisma }: MercuriusContext
    ): Promise<Query["getEventTilesByUserId"]> => {
      const skip = _skip || 0;
      const take = _take || 10;

      const [userEvents, count] = await Promise.all([
        prisma.eventUser.findMany({
          where: {
            userId,
          },
          include: {
            event: {
              include: {
                categories: { include: { category: true } },
                cities: { include: { city: true } },
                users: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
          skip,
          take,
          orderBy: {
            event: {
              createdAt: "desc",
            },
          },
        }),
        prisma.eventUser.count({
          where: {
            userId,
          },
        }),
      ]);

      const events = userEvents.map(({ event }) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
        canceled: event.canceled,
        startAt: event.startAt,
        endAt: event.endAt,
        eventType: event.eventType,

        categories: event.categories.map((c) => c.category),
        cities: event.cities.map((c) => c.city),
        largePhoto: `${env.PHOTOS_BUCKET_URL}/${event.largePhoto}`,
        mediumPhoto: `${env.PHOTOS_BUCKET_URL}/${event.mediumPhoto}`,
        smallPhoto: `${env.PHOTOS_BUCKET_URL}/${event.smallPhoto}`,

        usersCount: event.users.length,
      }));

      return {
        events,
        count,
      };
    },
  },
};
