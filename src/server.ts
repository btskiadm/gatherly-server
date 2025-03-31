import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import Fastify, { FastifyServerOptions } from "fastify";
import mercurius from "mercurius";
import { mercuriusOptions } from "./plugins/mercurius";
import { pinoOptions } from "./plugins/pino";
import { env } from "./utils/env";

const createServer = () => {
  const fastifyOptions: FastifyServerOptions = {
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

  const fastify = Fastify(fastifyOptions);

  fastify.register(cors, {
    credentials: true,
    origin: (origin, cb) => {
      if (!origin) {
        cb(null, true);
        return;
      }

      try {
        const hostname = new URL(origin).hostname;
        if (env.ALLOWED_HOSTS.includes(hostname)) {
          cb(null, true);
          return;
        }
        cb(new Error("Not allowed"), false);
      } catch (err) {
        cb(new Error("Invalid origin"), false);
      }
    },
  });

  fastify.register(fastifyCookie);

  fastify.register(fastifyJwt, {
    secret: "supersecret",
    // cookie: {
    //   cookieName: "token",
    //   signed: false,
    // },
  });

  fastify.register(mercurius, mercuriusOptions);

  return {
    start: async () => {
      try {
        await fastify.listen({ port: env.PORT });
      } catch (err) {
        fastify.log.error(err);
        process.exit(1);
      }
    },
  };
};

(async function initialize() {
  const server = createServer();
  await server.start();
})();
