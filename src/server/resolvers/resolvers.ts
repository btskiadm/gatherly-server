import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";
import { composeResolvers, ResolversComposition } from "@graphql-tools/resolvers-composition";
import path from "path";

type Resolvers = any;

const loadedResolvers: Resolvers = loadFilesSync(path.join(__dirname, "./**/*.resolvers.*"));

const isAuthenticated = (): ResolversComposition => (next) => (root, args, context, info) => {
  if (!context.currentUser) {
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
export const resolvers = composeResolvers(mergeResolvers([loadedResolvers]), {
  "Query.healthCheck": [isAuthenticated(), hasRole("EDITOR")],
});
