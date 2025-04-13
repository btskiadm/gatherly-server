import { User } from "../model/model";
import { env } from "./env";

export const userWithEnvPhotoPrefix = (user: User): User => ({
  ...user,
  largePhoto: `${env.PHOTOS_BUCKET_URL}/${user.largePhoto}`,
  mediumPhoto: `${env.PHOTOS_BUCKET_URL}/${user.mediumPhoto}`,
  smallPhoto: `${env.PHOTOS_BUCKET_URL}/${user.smallPhoto}`,
});
