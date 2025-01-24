"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const load_files_1 = require("@graphql-tools/load-files");
const merge_1 = require("@graphql-tools/merge");
const resolvers_composition_1 = require("@graphql-tools/resolvers-composition");
const path_1 = __importDefault(require("path"));
const loadedResolvers = (0, load_files_1.loadFilesSync)(path_1.default.join(__dirname, "./**/*.resolvers.*"));
const isAuthenticated = () => (next) => (root, args, context, info) => {
    if (!context.currentUser) {
    }
    return next(root, args, context, info);
};
const hasRole = (role) => (next) => (root, args, context, info) => {
    if (!context.currentUser.roles?.includes(role)) {
        throw new Error("You are not authorized!");
    }
    return next(root, args, context, info);
};
//  https://the-guild.dev/graphql/tools/docs/resolvers-composition
exports.resolvers = (0, resolvers_composition_1.composeResolvers)((0, merge_1.mergeResolvers)([loadedResolvers]), {
// "Query.healthCheck": [isAuthenticated(), hasRole("EDITOR")],
});
