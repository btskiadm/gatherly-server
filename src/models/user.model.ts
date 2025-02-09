import { Thumbnail } from "./thumbnail.model";
import { UserDetails } from "./userDetails.model";

type DateISO = string;

export interface User {
  id: string;
  username: string;
  thumbnail: Thumbnail;
  verifiedAt?: DateISO;
  userDetails: UserDetails;
}
