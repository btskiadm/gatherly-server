import { CategoryDataSource, CategoryDataSourceInterface } from "./category.datasource";
import { GroupDataSource, GroupDataSourceInterface } from "./group.datasource";
import { CityDataSource, CityDataSourceInterface } from "./city.datasource";
import { UserDataSourceInterface, UserDataSource } from "./user.datasource";
import { CommentDataSource, CommentDataSourceInterface } from "./comment.datasource";

export class DataSource {
  readonly #categoryDataSource: CategoryDataSourceInterface;
  readonly #cityDataSource: CityDataSourceInterface;
  readonly #commentDataSource: CommentDataSourceInterface;
  readonly #groupDataSource: GroupDataSourceInterface;
  readonly #userDataSource: UserDataSourceInterface;

  constructor() {
    this.#categoryDataSource = new CategoryDataSource();
    this.#cityDataSource = new CityDataSource();
    this.#commentDataSource = new CommentDataSource();
    this.#groupDataSource = new GroupDataSource();
    this.#userDataSource = new UserDataSource();
  }

  get categoryDataSource(): CategoryDataSourceInterface {
    return this.#categoryDataSource;
  }

  get cityDataSource(): CityDataSourceInterface {
    return this.#cityDataSource;
  }

  get commentDataSource(): CommentDataSourceInterface {
    return this.#commentDataSource;
  }

  get groupDataSource(): GroupDataSourceInterface {
    return this.#groupDataSource;
  }

  get userDataSource(): UserDataSourceInterface {
    return this.#userDataSource;
  }
}
