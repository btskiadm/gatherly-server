"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mercuriusOptions = exports.buildContext = void 0;
const schema_1 = require("@graphql-tools/schema");
const mercurius_1 = require("mercurius");
const resolvers_1 = require("../resolvers/resolvers");
const typeDefs_1 = require("../typeDefs/typeDefs");
const buildContext = async (req, _reply) => {
    return {
        authorization: req.headers.authorization,
    };
};
exports.buildContext = buildContext;
exports.mercuriusOptions = {
    graphiql: true,
    schema: (0, schema_1.makeExecutableSchema)({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: resolvers_1.resolvers,
    }),
    errorFormatter(execution, context) {
        const formatter = (0, mercurius_1.defaultErrorFormatter)(execution, context);
        return {
            statusCode: formatter.statusCode || 500,
            response: formatter.response,
        };
    },
    context: exports.buildContext,
};
