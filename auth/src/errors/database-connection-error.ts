//We can do not use this class and just throw the error directly since it only returns a string

import { CustomError } from "./custom-error";
export class DatabaseConnectionError extends CustomError {
  reason = "Error connecting to the database";
  statusCode = 500;
  constructor() {
    //Because we are extending a built in class
    super("Error connecting to the DB"); //this message is only for logging purpose

    //Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
