import type { LoggerOptions } from "pino";

const hasPrettyFlag = process.argv.includes("--pretty");

const transportOptions: LoggerOptions["transport"] = {
  target: "pino-pretty",
  options: {
    translateTime: "HH:MM:ss Z",
    ignore: "pid,hostname,reqId",
  },
};

export const pinoOptions: Record<"development" | "production", LoggerOptions> = {
  development: {
    level: "debug",
    transport: transportOptions,
  },
  production: {
    level: "info",
    transport: hasPrettyFlag ? transportOptions : undefined,
  },
};
