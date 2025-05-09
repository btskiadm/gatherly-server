import { ApplicationError } from "../errors/application.error";
import { RuntimeError } from "../errors/runtime.error";

const prefix = "Invariant failed";

// Throw an error if the condition fails
// Strip out error messages for production
// > Not providing an inline default argument for message as the result is smaller
export function invariant(
  condition: unknown,
  // Can provide a string, or a function that returns a string for cases where
  // the message takes a fair amount of effort to compute
  message?: string | (() => string),
  ErrorType: new (message: string) => ApplicationError = RuntimeError
): asserts condition {
  if (condition) {
    return;
  }

  // Condition not passed
  const provided: string | undefined = typeof message === "function" ? message() : message;

  // Options:
  // 1. message provided: `${prefix}: ${provided}`
  // 2. message not provided: prefix
  const value: string = provided ? `${prefix}: ${provided}` : prefix;
  throw new ErrorType(value);
}
