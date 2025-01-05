import { RuntimeError } from "../errors/RuntimeError";
import { invariant } from "./invariant";

interface Env {
  NODE_ENV: "development" | "production" | "test";
}

invariant(process.env.NODE_ENV, "NODE_ENV is not set", RuntimeError);

export const env: Env = {
  NODE_ENV: process.env.NODE_ENV,
};
