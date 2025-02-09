import { MercuriusContext } from "mercurius";
import { toCategoryDto } from "../utils/mappers";
import { CategoryDto } from "../dtos/category.dto";

export default {
  Query: {
    getAllCategories: async (
      _: unknown,
      args: unknown,
      { dataSource: { categoryDataSource } }: MercuriusContext
    ): Promise<CategoryDto[]> => {
      const categories = await categoryDataSource.getCategories();

      return categories.map(toCategoryDto);
    },
    getUsedCategories: async (
      _: unknown,
      args: unknown,
      { dataSource: { categoryDataSource } }: MercuriusContext
    ): Promise<CategoryDto[]> => {
      const categories = await categoryDataSource.getCategories();

      return categories.map(toCategoryDto);
    },
  },
};
