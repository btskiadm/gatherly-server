import { City } from "../models/city.model";
import { DBCities } from "./mock";

export interface CityDataSourceInterface {
  getCities(): Promise<City[]>;
}

export class CityDataSource implements CityDataSourceInterface {
  readonly #cities: City[];

  constructor() {
    this.#cities = DBCities;
  }

  getCities(): Promise<City[]> {
    return Promise.resolve(this.#cities);
  }
}
