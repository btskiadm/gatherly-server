import { ThumbnailDto } from "./thumbnail.dto";
import { UserDetailsDto } from "./userDetails.dto";

type DateISO = string;

export interface UserWithDetailsDto {
  __typename: "UserWithDetails";
  id: string;
  username: string;
  thumbnail: ThumbnailDto;
  verifiedAt?: DateISO;
  userDetails: UserDetailsDto;
}
