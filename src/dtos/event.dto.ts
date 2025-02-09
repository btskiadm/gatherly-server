import { CategoryDto } from "./category.dto";
import { CityDto } from "./city.dto";
import { EventUserDto } from "./eventUser.dto";
import { FromToDateDto } from "./fromToDate.dto";

type DateISO = string;

export interface EventDto {
  __typename: "Event";
  id: string;
  title: string;
  description: string;
  canceled: boolean;
  createdAt: DateISO;
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
  users: EventUserDto[];
  date: FromToDateDto;
  cities: CityDto[];
  categories: CategoryDto[];
}
