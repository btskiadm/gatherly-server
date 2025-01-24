"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invariant = invariant;
const RuntimeError_1 = require("../errors/RuntimeError");
const prefix = "Invariant failed";
// Throw an error if the condition fails
// Strip out error messages for production
// > Not providing an inline default argument for message as the result is smaller
function invariant(condition, 
// Can provide a string, or a function that returns a string for cases where
// the message takes a fair amount of effort to compute
message, ErrorType = RuntimeError_1.RuntimeError) {
    if (condition) {
        return;
    }
    // Condition not passed
    const provided = typeof message === "function" ? message() : message;
    // Options:
    // 1. message provided: `${prefix}: ${provided}`
    // 2. message not provided: prefix
    const value = provided ? `${prefix}: ${provided}` : prefix;
    throw new ErrorType(value);
}
