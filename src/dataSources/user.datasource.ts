import { User } from "../models/user.model";
import { DBUsers } from "./mock";

export interface UserDataSourceInterface {
  getUsers(): Promise<User[]>;
}

export class UserDataSource implements UserDataSourceInterface {
  readonly #users: User[];

  constructor() {
    this.#users = DBUsers;
  }

  getUsers(): Promise<User[]> {
    return Promise.resolve(this.#users);
  }
}
