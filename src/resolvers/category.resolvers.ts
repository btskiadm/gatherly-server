import { MercuriusContext } from "mercurius";
import { Category } from "../model/model";
import { categoryValidator } from "../prisma/validators/category.validators";

export default {
  Query: {
    getCategories: async (_: unknown, args: unknown, { prisma }: MercuriusContext): Promise<Category[]> => {
      return await prisma.category.findMany({
        include: categoryValidator,
      });
    },
    getUsedCategories: async (_: unknown, args: unknown, { prisma }: MercuriusContext): Promise<Category[]> => {
      return await prisma.category.findMany({
        include: categoryValidator,
      });
    },
  },
};
