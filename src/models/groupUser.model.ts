import { User } from "./user.model";

export interface GroupUser {
  id: string;
  isHost: boolean;
  isModerator: boolean;
  user: User;
}
