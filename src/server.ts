import { makeExecutableSchema } from "@graphql-tools/schema";
import dotenv from "dotenv";
import Fastify from "fastify";
import mercurius, { defaultErrorFormatter } from "mercurius";
import { pinoOptions } from "./server/pino";
import { resolvers } from "./server/resolvers/resolvers";
import { typeDefs } from "./server/typeDefs/typeDefs";
import { buildContext } from "./server/types/mercurius";

dotenv.config();

const createServer = () => {
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
    graphiql: true,
    schema: makeExecutableSchema({
      typeDefs: typeDefs,
      resolvers: resolvers,
    }),
    errorFormatter(execution, context) {
      const formatter = defaultErrorFormatter(execution, context);

      return {
        statusCode: formatter.statusCode || 500,
        response: formatter.response,
      };
    },
    context: buildContext,
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
