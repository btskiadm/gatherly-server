import { Comment } from "../models";
import { Group } from "../models/group.model";
import { DBGroups } from "./mock";

export interface CommentDataSourceInterface {
  addGroupComment(groupId: string, comment: Comment): Promise<Comment>;
}

export class CommentDataSource implements CommentDataSourceInterface {
  readonly #groups: Group[];

  constructor() {
    this.#groups = DBGroups;
  }

  addGroupComment(groupId: string, comment: Comment): Promise<Comment> {
    console.log(`Not implemented. addComment args: groupId: ${groupId}, comment: ${comment.id}`);
    return Promise.resolve(comment);
  }
}
