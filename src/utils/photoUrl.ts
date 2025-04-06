import { env } from "./env";

export const getPhotoUrl = (path: string) => `${env.PHOTOS_BUCKET_URL}/${path}`;
