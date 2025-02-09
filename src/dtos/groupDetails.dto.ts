import { CategoryDto } from "./category.dto";
import { CityDto } from "./city.dto";
import { CommentDto } from "./comment.dto";
import { EventGroupDto } from "./eventGroup.dto";
import { GroupedEventsDto } from "./groupedEvents.dto";
import { GroupUserDto } from "./groupUser.dto";
import { ThumbnailDto } from "./thumbnail.dto";

type DateISO = string;

export interface GroupDetailsDto {
  __typename: "GroupDetails";
  id: string;
  title: string;
  description: string;
  createdAt: DateISO;
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
  cities: CityDto[];
  categories: CategoryDto[];
  users: GroupUserDto[];
  comments: CommentDto[];
  thumbnail: ThumbnailDto;
  upcoming: GroupedEventsDto[];
  pending: GroupedEventsDto[];
  past: GroupedEventsDto[];
  cancelled: GroupedEventsDto[];
  events: EventGroupDto[];
  upcomingLength: number;
  pendingLength: number;
  pastLength: number;
  cancelledLength: number;
  eventsLength: number;
  rate: number;
}
