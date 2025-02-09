import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const loadedTypeDefs = loadFilesSync(path.join(__dirname, "./**/*.graphql"));

export const typeDefs = mergeTypeDefs(loadedTypeDefs);
