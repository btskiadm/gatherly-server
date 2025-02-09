import { CityDto } from "./city.dto";

export interface UserDetailsDto {
  __typename: "UserDetails";
  id: string;
  description: string;
  city: CityDto;
}
