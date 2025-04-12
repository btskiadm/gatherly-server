import { ApplicationError } from "./application.error";

export class AuthError extends ApplicationError {
  statusCode = 401;

  constructor(message = "Auth error") {
    super(message);
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}
