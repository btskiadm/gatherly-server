import { ThumbnailDto } from "./thumbnail.dto";

type DateISO = string;

export interface UserDto {
  __typename: "User";
  id: string;
  username: string;
  thumbnail: ThumbnailDto;
  verifiedAt?: DateISO;
}
