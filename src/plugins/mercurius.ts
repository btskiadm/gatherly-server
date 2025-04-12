import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

import { defaultErrorFormatter, MercuriusOptions } from "mercurius";
import { resolvers } from "../resolvers/resolvers";
import { typeDefs } from "../typeDefs/typeDefs";
import { WebSocket } from "ws";
import fastifyJwt from "@fastify/jwt";

const prisma = new PrismaClient();

interface QueryRequest {
  operationName?: string;
  query: string;
  variables?: object;
  extensions?: object;
}

export const buildContext = async (req: FastifyRequest, reply: FastifyReply) => {
  let user = null;
  const authHeader = req.headers.authorization;
  const refreshTokenCookie = req.cookies?.refreshToken;
  const { operationName } = (req.body as QueryRequest) || {};

  const isRefreshTokenOperation = operationName === "RefreshToken" && refreshTokenCookie;

  if (!isRefreshTokenOperation && authHeader?.startsWith("Bearer ")) {
    try {
      user = await req.jwtVerify<{ id: string; username: string; role: string }>();
    } catch (err: unknown) {
      console.error("Invalid access token.", err);
      throw err;
    }
  }

  return {
    prisma,
    user,
    req,
    reply,
  };
};

// const errorFormatter = (err: any) => {
//   // Przykładowe mapowanie błędów niestandardowych na kody błędów
//   if (err.originalError instanceof UserNotFoundError) {
//     return {
//       ...err,
//       message: err.message,
//       extensions: {
//         code: 'USER_NOT_FOUND'
//       }
//     };
//   }
//   if (err.originalError instanceof InternalError) {
//     return {
//       ...err,
//       message: err.message,
//       extensions: {
//         code: 'INTERNAL_ERROR'
//       }
//     };
//   }
//   // Dla pozostałych błędów możesz ustalić domyślny format
//   return {
//     ...err,
//     message: 'Wystąpił błąd',
//     extensions: {
//       code: 'UNKNOWN_ERROR'
//     }
//   };
// };

// // converts an error to a `GraphQLError` compatible
// // allows to copy the `path` & `locations` properties
// // from the already serialized error
// function toGraphQLError (err) {
//   if (err instanceof GraphQLError) {
//     return err
//   }

//   const gqlError = new GraphQLError(
//     err.message,
//     err.nodes,
//     err.source,
//     err.positions,
//     err.path,
//     err,
//     err.extensions
//   )

//   gqlError.locations = err.locations

//   return gqlError
// }

// function defaultErrorFormatter (execution, ctx) {
//   // There is always app if there is a context
//   const log = ctx.reply ? ctx.reply.log : ctx.app.log

//   let statusCode = execution.data ? 200 : (execution.statusCode || 200)

//   const errors = execution.errors.map((error) => {
//     log.info({ err: error }, error.message)

//     // it handles fastify errors MER_ERR_GQL_VALIDATION
//     if (error.originalError?.errors && Array.isArray(error.originalError.errors)) {
//       // not all errors are `GraphQLError` type, we need to convert them
//       return error.originalError.errors.map(toGraphQLError)
//     }

//     return error
//     // as the result of the outer map could potentially contain arrays with errors
//     // the result needs to be flattened
//     // and convert error into serializable format
//   }).reduce((acc, val) => acc.concat(val), []).map((error) => error.toJSON())

//   // Override status code when there is no data or statusCode present
//   if (!execution.data && typeof execution.statusCode === 'undefined' && execution.errors.length > 0) {
//     if (errors.length === 1) {
//       // If single error defined, use status code if present
//       if (typeof execution.errors[0].originalError !== 'undefined' && typeof execution.errors[0].originalError.statusCode === 'number') {
//         statusCode = execution.errors[0].originalError.statusCode
//         // Otherwise, use 200 as per graphql-over-http spec
//       } else {
//         statusCode = 200
//       }
//     }
//   }

//   return {
//     statusCode,
//     response: {
//       data: execution.data || null,
//       errors
//     }
//   }
// }

// "statusCode": 401,
// "code": "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED",
// "error": "Unauthorized",
// "message": "Authorization token expired"

export const mercuriusOptions: MercuriusOptions = {
  graphiql: true,
  subscription: {
    onConnect: async (data: { payload: { headers: { Authorization: string } } }) => {
      return data;
    },
    context: async (socket: WebSocket, req: FastifyRequest) => {
      return {
        req,
        prisma,
      };
    },
  },
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  errorFormatter(execution, context) {
    const formatter = defaultErrorFormatter(execution, context);
    return {
      statusCode: formatter.statusCode || 500,
      response: formatter.response,
      code: "test code",
      error: "error test",
    };
  },
  context: buildContext,
};
