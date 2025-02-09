import { UserDto } from "./user.dto";

type DateISO = string;

export interface CommentDto {
  __typename: "Comment";
  id: string;
  rate: number;
  content: string;
  createdAt: DateISO;
  user: UserDto;
}
