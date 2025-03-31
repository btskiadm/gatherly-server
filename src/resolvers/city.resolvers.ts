import { MercuriusContext } from "mercurius";
import { Query } from "../model/model";

export default {
  Query: {
    getCities: async (_: unknown, args: unknown, { prisma }: MercuriusContext): Promise<Query["getCities"]> => {
      return await prisma.city.findMany({});
    },
    getUsedCities: async (_: unknown, args: unknown, { prisma }: MercuriusContext): Promise<Query["getUsedCities"]> => {
      return await prisma.city.findMany({
        where: {
          groups: {
            some: {},
          },
        },
      });
    },
  },
};
