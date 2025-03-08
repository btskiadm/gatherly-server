import { MercuriusContext } from "mercurius";
import { cityValidator } from "../prisma/validators/city.validators";
import { City } from "../model/model";

export default {
  Query: {
    getCities: async (_: unknown, args: unknown, { prisma }: MercuriusContext): Promise<City[]> => {
      return await prisma.city.findMany({
        include: cityValidator,
      });
    },
    getUsedCities: async (_: unknown, args: unknown, { prisma }: MercuriusContext): Promise<City[]> => {
      return await prisma.city.findMany({
        include: cityValidator,
      });
    },
  },
};
