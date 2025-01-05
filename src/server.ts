import Fastify from "fastify";
import mercurius from "mercurius";
import { fastifyOptions } from "./libs/fastify";
import { mercuriusOptions } from "./libs/mercurius";
import { env } from "./utils/env";

const createServer = () => {
  const fastify = Fastify(fastifyOptions);

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
