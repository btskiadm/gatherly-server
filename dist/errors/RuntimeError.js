"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeError = void 0;
const ApplicationError_1 = require("./ApplicationError");
class RuntimeError extends ApplicationError_1.ApplicationError {
    constructor(message = "Something went terribly wrong") {
        super(message);
        this.statusCode = 500;
        Object.setPrototypeOf(this, RuntimeError.prototype);
    }
}
exports.RuntimeError = RuntimeError;
