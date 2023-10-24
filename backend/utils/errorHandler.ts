import httpStatus from "http-status";

export class CustomErrorHandler extends Error {
  public readonly log: string;
  public readonly methodName: string;
  public readonly httpCode: number;
  public readonly isOperational: boolean;
  constructor(
    httpCode: number = httpStatus.INTERNAL_SERVER_ERROR,
    log: string,
    message: string | unknown = log,
    methodName?: string,
    isOperational = true
  ) {
    super(<string>message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.log = log;
    if (methodName) this.methodName = methodName;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}