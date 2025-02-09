import { CategoryDto } from "./category.dto";
import { CityDto } from "./city.dto";
import { CommentDto } from "./comment.dto";
import { EventDto } from "./event.dto";
import { GroupUserDto } from "./groupUser.dto";
import { ThumbnailDto } from "./thumbnail.dto";

type DateISO = string;

export interface GroupDto {
  __typename: "Group";
  id: string;
  title: string;
  description: string;
  createdAt: DateISO;
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
  cities: CityDto[];
  categories: CategoryDto[];
  events: EventDto[];
  users: GroupUserDto[];
  comments: CommentDto[];
  thumbnail: ThumbnailDto;
}
