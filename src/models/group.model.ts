import { Category } from "./category.model";
import { City } from "./city.model";
import { Comment } from "./comment.model";
import { Event } from "./event.model";
import { GroupUser } from "./groupUser.model";
import { RemoteAttribute } from "./remote.model";
import { SponsoredAttribute } from "./sponsored.model";
import { Thumbnail } from "./thumbnail.model";
import { VerifiedAttribute } from "./verified.model";

type DateISO = string;

export interface Group {
  id: string;
  title: string;
  description: string;
  createdAt: DateISO;
  sponsored: SponsoredAttribute;
  verified: VerifiedAttribute;
  remote: RemoteAttribute;
  cities: City[];
  categories: Category[];
  events: Event[];
  users: GroupUser[];
  comments: Comment[];
  thumbnail: Thumbnail;
}
