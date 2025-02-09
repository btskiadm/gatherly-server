import { Category } from "../models/category.model";
import { DBCategories } from "./mock";

export interface CategoryDataSourceInterface {
  getCategories(): Promise<Category[]>;
}

export class CategoryDataSource implements CategoryDataSourceInterface {
  readonly #categories: Category[];

  constructor() {
    this.#categories = DBCategories;
  }

  getCategories(): Promise<Category[]> {
    return Promise.resolve(this.#categories);
  }
}
