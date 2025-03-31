import { MercuriusContext } from "mercurius";
import { Category, Query } from "../model/model";
import { categoryValidator } from "../prisma/validators/category.validators";

export default {
  Query: {
    getCategories: async (_: unknown, args: unknown, { prisma }: MercuriusContext): Promise<Query["getCategories"]> => {
      return await prisma.category.findMany({
        include: categoryValidator,
      });
    },
    getUsedCategories: async (
      _: unknown,
      args: unknown,
      { prisma }: MercuriusContext
    ): Promise<Query["getUsedCategories"]> => {
      return await prisma.category.findMany({
        where: {
          groups: {
            some: {},
          },
        },
      });
    },
  },
};
