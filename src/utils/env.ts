import dotenv from "dotenv";
import { RuntimeError } from "../errors/RuntimeError";
import { invariant } from "./invariant";

dotenv.config();

export type NodeEnv = "development" | "production" | "test";

interface Env {
  NODE_ENV: NodeEnv;
  PORT: number;
}

invariant(process.env.NODE_ENV, "NODE_ENV is not set", RuntimeError);
invariant(process.env.PORT, "PORT is not set", RuntimeError);

export const env: Env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: ~~process.env.PORT,
};
