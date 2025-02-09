import { MercuriusContext } from "mercurius";
import { toCityDto } from "../utils/mappers";
import { CityDto } from "../dtos/city.dto";

export default {
  Query: {
    getAllCities: async (
      _: unknown,
      args: unknown,
      { dataSource: { cityDataSource } }: MercuriusContext
    ): Promise<CityDto[]> => {
      const cities = await cityDataSource.getCities();

      return cities.map(toCityDto);
    },
    getUsedCities: async (
      _: unknown,
      args: unknown,
      { dataSource: { cityDataSource } }: MercuriusContext
    ): Promise<CityDto[]> => {
      const cities = await cityDataSource.getCities();

      return cities.map(toCityDto);
    },
  },
};
