import { Group } from "../models/group.model";
import { DBGroups } from "./mock";

export interface GroupDataSourceInterface {
  getGroups(): Promise<Group[]>;
  getGroup(groupId: string): Promise<Group | null>;
  deleteGroup(groupId: string): Promise<void>;
  createGroup(group: Group): Promise<Group>;
}

export class GroupDataSource implements GroupDataSourceInterface {
  readonly #groups: Group[];

  constructor() {
    this.#groups = DBGroups;
  }

  getGroups(): Promise<Group[]> {
    return Promise.resolve(this.#groups);
  }

  getGroup(groupId: string): Promise<Group | null> {
    return Promise.resolve(this.#groups.find((g) => g.id === groupId) ?? null);
  }

  deleteGroup(groupId: string): Promise<void> {
    console.log(`Not implemented. deleteGroup args: groupId: ${groupId}`);
    return Promise.resolve();
  }

  createGroup(group: Group): Promise<Group> {
    console.log(`Not implemented. createGroup args: groupId: ${group.id}`);
    return Promise.resolve(group);
  }
}
