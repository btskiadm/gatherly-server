import { mergeResolvers } from "@graphql-tools/merge";
import { composeResolvers, ResolversComposition } from "@graphql-tools/resolvers-composition";
import { healthCheckResolver } from "./healthCheck.resolver";

const isAuthenticated = (): ResolversComposition => (next) => (root, args, context, info) => {
  if (!context.currentUser) {
    // throw new Error("You are not authenticated!");
  }

  return next(root, args, context, info);
};

const hasRole =
  (role: string): ResolversComposition =>
  (next) =>
  (root, args, context, info) => {
    if (!context.currentUser.roles?.includes(role)) {
      throw new Error("You are not authorized!");
    }

    return next(root, args, context, info);
  };

//  https://the-guild.dev/graphql/tools/docs/resolvers-composition
export const resolvers = composeResolvers(mergeResolvers([healthCheckResolver]), {
  "Query.healthCheck": [isAuthenticated(), hasRole("EDITOR")],
});
