import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const typesArray = loadFilesSync(path.join(__dirname, "."), { extensions: ["graphql"] });

console.dir({ __dirname, typesArray });

export const typeDefs = mergeTypeDefs(typesArray);
