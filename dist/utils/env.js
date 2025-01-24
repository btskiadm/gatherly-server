"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const RuntimeError_1 = require("../errors/RuntimeError");
const invariant_1 = require("./invariant");
dotenv_1.default.config();
(0, invariant_1.invariant)(process.env.NODE_ENV, "NODE_ENV is not set", RuntimeError_1.RuntimeError);
(0, invariant_1.invariant)(process.env.PORT, "PORT is not set", RuntimeError_1.RuntimeError);
exports.env = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: ~~process.env.PORT,
};
