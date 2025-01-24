"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastifyOptions = void 0;
const env_1 = require("../utils/env");
const pino_1 = require("./pino");
exports.fastifyOptions = {
    ignoreTrailingSlash: true,
    requestIdHeader: false,
    maxParamLength: 256,
    logger: {
        ...pino_1.pinoOptions[env_1.env.NODE_ENV],
        formatters: {
            level(level) {
                return { level };
            },
        },
    },
};
