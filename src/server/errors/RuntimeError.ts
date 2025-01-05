import { ApplicationError } from "./ApplicationError";

export class RuntimeError extends ApplicationError {
  statusCode = 500;

  constructor(message = "Something went terribly wrong") {
    super(message);
    Object.setPrototypeOf(this, RuntimeError.prototype);
  }
}
