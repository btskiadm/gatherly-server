import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";
import { composeResolvers, ResolversComposerMapping, ResolversComposition } from "@graphql-tools/resolvers-composition";
import { Role } from "@prisma/client";
import { IFieldResolver, MercuriusContext } from "mercurius";
import path from "path";

type Resolver = any;

const loadedResolvers: Resolver[] = loadFilesSync(path.join(__dirname, "./**/*.resolvers.*"));

const isAuthenticated =
  (): ResolversComposition =>
  (next): IFieldResolver<{}, MercuriusContext> =>
  (root, args, context, info) => {
    if (!context.user?.id) {
      throw new Error("isAuthenticated error.");
    }

    return next(root, args, context, info);
  };

const hasRole =
  (...roles: Role[]): ResolversComposition =>
  (next): IFieldResolver<{}, MercuriusContext> =>
  (root, args, context: MercuriusContext, info) => {
    const role = context.user?.role;

    if (roles.some((_role) => _role === role)) {
      return next(root, args, context, info);
    }

    throw new Error("hasRole error.");
  };

const resolversCompositionMapping: ResolversComposerMapping = {
  "Mutation.createGroup": [isAuthenticated()],
  "Mutation.joinGroup": [isAuthenticated()],
  "Mutation.leaveGroup": [isAuthenticated()],
  "Mutation.createEvent": [isAuthenticated()],
  "Mutation.addGroupComment": [isAuthenticated()],
};

const mergedResolvers = mergeResolvers(loadedResolvers);

//  https://the-guild.dev/graphql/tools/docs/resolvers-composition
export const resolvers = composeResolvers(mergedResolvers, resolversCompositionMapping);
