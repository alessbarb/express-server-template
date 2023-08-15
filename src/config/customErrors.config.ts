class BaseError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class OperationalError extends BaseError {
  constructor(message: string, statusCode = 400) {
    super(message, statusCode);
  }
}

export class ProgrammingError extends BaseError {
  constructor(message: string, statusCode = 500) {
    super(message, statusCode);
  }
}
