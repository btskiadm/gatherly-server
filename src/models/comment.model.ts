import { User } from "./user.model";

type DateISO = string;

export interface Comment {
  id: string;
  rate: number;
  content: string;
  createdAt: DateISO;
  user: User;
}
