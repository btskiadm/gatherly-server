import { ApplicationError } from "./application.error";

export class UserNotFound extends ApplicationError {
  statusCode = 404;

  constructor(message = "User not found.") {
    super(message);
    this.name = "user not founnnd";
    Object.setPrototypeOf(this, UserNotFound.prototype);
  }
}
