"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinoOptions = void 0;
const hasPrettyFlag = process.argv.includes("--pretty");
const transportOptions = {
    target: "pino-pretty",
    options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname,reqId",
    },
};
exports.pinoOptions = {
    development: {
        level: "debug",
        transport: transportOptions,
    },
    production: {
        level: "info",
        transport: hasPrettyFlag ? transportOptions : undefined,
    },
    test: {},
};
