import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    //this message is only for logging purpose
    super("Not authorized");

    //Only because we are extending a built in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  serializeErrors() {
    return [{ message: "Not authorized" }];
  }
}
