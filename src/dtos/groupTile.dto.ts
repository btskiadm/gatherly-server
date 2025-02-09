import { CategoryDto } from "./category.dto";
import { CityDto } from "./city.dto";
import { ThumbnailDto } from "./thumbnail.dto";

export interface GroupTileDto {
  __typename: "GroupTile";
  id: string;
  title: string;
  description: string;
  createdAt: string;
  cities: CityDto[];
  categories: CategoryDto[];
  thumbnail: ThumbnailDto;
  eventsLength: number;
  usersLength: number;
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
}
