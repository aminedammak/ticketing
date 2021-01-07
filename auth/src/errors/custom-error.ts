export abstract class CustomError extends Error {
  abstract statusCode: number;

  //this message is only for logging purpose
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors(): { message: string; field?: string }[];
}
