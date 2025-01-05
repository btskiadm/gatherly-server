import type { LoggerOptions } from "pino";
import { NodeEnv } from "../utils/env";

const hasPrettyFlag = process.argv.includes("--pretty");

const transportOptions: LoggerOptions["transport"] = {
  target: "pino-pretty",
  options: {
    translateTime: "HH:MM:ss Z",
    ignore: "pid,hostname,reqId",
  },
};

export const pinoOptions: Record<NodeEnv, LoggerOptions> = {
  development: {
    level: "debug",
    transport: transportOptions,
  },
  production: {
    level: "info",
    transport: hasPrettyFlag ? transportOptions : undefined,
  },
  test: {},
};
