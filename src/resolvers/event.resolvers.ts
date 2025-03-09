import { MercuriusContext } from "mercurius";
import { CreateEventInput, CreateEventReponse, Mutation, MutationCreateEventArgs } from "../model/model";

export default {
  Mutation: {
    createEvent: async (
      _: unknown,
      { groupId, createEventInput }: MutationCreateEventArgs,
      { prisma, user }: MercuriusContext
    ): Promise<Mutation["createEvent"]> => {
      const { title, description, categories, cities, endAt, startAt } = createEventInput;

      try {
        const newEvent = await prisma.event.create({
          data: {
            title,
            description,
            startAt,
            endAt,
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
                isHost: true,
                isModerator: false,
                user: {
                  connect: {
                    id: user.id,
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
};
