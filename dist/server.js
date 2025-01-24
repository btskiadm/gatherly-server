"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const mercurius_1 = __importDefault(require("mercurius"));
const fastify_2 = require("./libs/fastify");
const mercurius_2 = require("./libs/mercurius");
const env_1 = require("./utils/env");
const createServer = () => {
    const fastify = (0, fastify_1.default)(fastify_2.fastifyOptions);
    fastify.register(mercurius_1.default, mercurius_2.mercuriusOptions);
    return {
        start: async () => {
            try {
                await fastify.listen({ port: env_1.env.PORT });
            }
            catch (err) {
                fastify.log.error(err);
                process.exit(1);
            }
        },
    };
};
(async function initialize() {
    const server = createServer();
    await server.start();
})();
