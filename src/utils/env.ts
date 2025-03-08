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
}

invariant(process.env.NODE_ENV, "NODE_ENV is not set", RuntimeError);
invariant(process.env.PORT, "PORT is not set", RuntimeError);
invariant(process.env.ALLOWED_HOSTS, "ALLOWED_HOSTS is not set", RuntimeError);
invariant(process.env.ALLOWED_HOSTS, "ALLOWED_HOSTS is not set", RuntimeError);
invariant(process.env.PHOTOS_BUCKET_URL, "PHOTOS_BUCKET_URL is not set", RuntimeError);

export const env: Env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: ~~process.env.PORT,
  ALLOWED_HOSTS: process.env.ALLOWED_HOSTS.split(","),
  PHOTOS_BUCKET_URL: process.env.PHOTOS_BUCKET_URL,
};
