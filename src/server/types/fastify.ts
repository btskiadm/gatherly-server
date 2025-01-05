import { DotenvParseOutput } from "dotenv";

declare module "fastify" {
  interface FastifyRequest {}

  interface FastifyContextConfig {}

  interface FastifyReply {}

  interface FastifyInstance {}
}
