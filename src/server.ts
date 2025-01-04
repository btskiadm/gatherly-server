import Fastify from "fastify";
import mercurius from "mercurius";
import { pinoOptions } from "./server/pino";

const createServer = () => {
  const schema = `
  type Query {
    hello: String
  }
`;

  const resolvers = {
    Query: {
      hello: () => "Hello, Fastify with GraphQL!",
    },
  };

  const fastify = Fastify({
    ignoreTrailingSlash: true,
    requestIdHeader: false,
    maxParamLength: 256,
    logger: {
      ...pinoOptions["development"],
      formatters: {
        level(level) {
          return { level };
        },
      },
    },
  });

  fastify.register(mercurius, {
    schema,
    resolvers,
    graphiql: true,
  });

  return {
    start: async () => {
      try {
        await fastify.listen({ port: 3000 });
        console.log("🚀 Server is running at http://localhost:3000");
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
