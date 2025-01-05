import { mergeTypeDefs } from "@graphql-tools/merge";
import { healthCheckTypeDefs } from "./healthCheck.typeDefs";

export const typeDefs = mergeTypeDefs([healthCheckTypeDefs]);
