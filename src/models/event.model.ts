import { Category } from "./category.model";
import { City } from "./city.model";
import { EventDate } from "./eventData.model";
import { EventUser } from "./eventUser.model";
import { RemoteAttribute } from "./remote.model";
import { SponsoredAttribute } from "./sponsored.model";
import { VerifiedAttribute } from "./verified.model";

type DateISO = string;

export interface Event {
  id: string;
  title: string;
  description: string;
  canceled: boolean;
  createdAt: DateISO;
  sponsored: SponsoredAttribute;
  verified: VerifiedAttribute;
  remote: RemoteAttribute;
  users: EventUser[];
  date: EventDate;
  cities: City[];
  categories: Category[];
}
