import Fastify from "fastify";
import mercurius from "mercurius";

// Sample GraphQL schema and resolver
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

async function startServer() {
  const fastify = Fastify({ logger: true });

  // Register GraphQL
  fastify.register(mercurius, {
    schema,
    resolvers,
    graphiql: true,
  });

  try {
    await fastify.listen({ port: 3000 });
    console.log("🚀 Server is running at http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();
