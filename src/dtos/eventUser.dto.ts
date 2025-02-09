import { UserDto } from "./user.dto";

export interface EventUserDto {
  __typename: "EventUser";
  id: string;
  isHost: boolean;
  isModerator: boolean;
  user: UserDto;
}
