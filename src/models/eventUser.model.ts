import { User } from "./user.model";

export interface EventUser {
  id: string;
  isHost: boolean;
  isModerator: boolean;
  user: User;
}
