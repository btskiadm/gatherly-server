import { makeExecutableSchema } from "@graphql-tools/schema";
import { FastifyReply, FastifyRequest } from "fastify";
import { defaultErrorFormatter, MercuriusOptions } from "mercurius";
import { resolvers } from "../resolvers/resolvers";
import { typeDefs } from "../typeDefs/typeDefs";

export const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
  return {
    authorization: req.headers.authorization,
  };
};

export const mercuriusOptions: MercuriusOptions = {
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
};
