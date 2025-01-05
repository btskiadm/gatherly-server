export abstract class ApplicationError extends Error {
  abstract statusCode: number;

  protected constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
