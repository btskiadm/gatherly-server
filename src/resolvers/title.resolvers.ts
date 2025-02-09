import { MercuriusContext } from "mercurius";
import { TitleDto } from "../dtos/title.dto";
import { ResolverError } from "../errors/resolver.error";
import { toTitleDto } from "../utils/mappers";

export default {
  Query: {
    getGroupTitles: async (
      _: unknown,
      args: unknown,
      { dataSource: { groupDataSource } }: MercuriusContext
    ): Promise<TitleDto[]> => {
      const groups = await groupDataSource.getGroups();

      return groups.map(toTitleDto);
    },
    getEventTitles: async (_: unknown, args: unknown, {}: MercuriusContext): Promise<TitleDto[]> => {
      throw new ResolverError("not implemented.");
    },
  },
};
