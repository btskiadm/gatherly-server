export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: "development" | "production" | "test";
      PORT?: string;
      ALLOWED_HOSTS?: string;
      PHOTOS_BUCKET_URL?: string;
    }
  }
}
