import { MercuriusContext } from "mercurius";
import { Query } from "../model/model";
import { cityValidator } from "../prisma/validators/city.validators";

export default {
  Query: {
    getCities: async (_: unknown, args: unknown, { prisma }: MercuriusContext): Promise<Query["getCities"]> => {
      return await prisma.city.findMany({
        include: cityValidator,
      });
    },
    getUsedCities: async (_: unknown, args: unknown, { prisma }: MercuriusContext): Promise<Query["getUsedCities"]> => {
      return await prisma.city.findMany({
        where: {
          groups: {
            some: {},
          },
        },
        include: cityValidator,
      });
    },
  },
};
