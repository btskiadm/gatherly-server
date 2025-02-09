import { UserDto } from "./user.dto";

export interface GroupUserDto {
  __typename: "GroupUser";
  id: string;
  isHost: boolean;
  isModerator: boolean;
  user: UserDto;
}
