import dotenv from "dotenv";
import { RuntimeError } from "../errors/runtime.error";
import { invariant } from "./invariant";

dotenv.config();

export type NodeEnv = "development" | "production" | "test";

interface Env {
  NODE_ENV: NodeEnv;
  PORT: number;
  ALLOWED_HOSTS: string[];
  PHOTOS_BUCKET_URL: string;
  REFRESH_TOKEN_EXPIRES_IN: string;
  ACCESS_TOKEN_EXPIRES_IN: string;
}

invariant(process.env.NODE_ENV, "NODE_ENV is not set", RuntimeError);
invariant(process.env.PORT, "PORT is not set", RuntimeError);
invariant(process.env.ALLOWED_HOSTS, "ALLOWED_HOSTS is not set", RuntimeError);
invariant(process.env.ALLOWED_HOSTS, "ALLOWED_HOSTS is not set", RuntimeError);
invariant(process.env.PHOTOS_BUCKET_URL, "PHOTOS_BUCKET_URL is not set", RuntimeError);
invariant(process.env.REFRESH_TOKEN_EXPIRES_IN, "REFRESH_TOKEN_EXPIRES_IN is not set", RuntimeError);
invariant(process.env.ACCESS_TOKEN_EXPIRES_IN, "ACCESS_TOKEN_EXPIRES_IN is not set", RuntimeError);

export const env: Env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: ~~process.env.PORT,
  ALLOWED_HOSTS: process.env.ALLOWED_HOSTS.split(","),
  PHOTOS_BUCKET_URL: process.env.PHOTOS_BUCKET_URL,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
};
