import { FastifyServerOptions } from "fastify";
import { env } from "../utils/env";
import { pinoOptions } from "./pino";

export const fastifyOptions: FastifyServerOptions = {
  ignoreTrailingSlash: true,
  requestIdHeader: false,
  maxParamLength: 256,
  logger: {
    ...pinoOptions[env.NODE_ENV],
    formatters: {
      level(level) {
        return { level };
      },
    },
  },
};
