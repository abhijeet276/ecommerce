import { NextFunction, Request, Response } from "express";

export class CustomErrorHandler {
    static handle(error:any, req:Request, res:Response, next:NextFunction) {
      if (error instanceof CustomError) {
        res.status(error.statusCode || 500).json({ error: error.message });
      } else if (error.name === 'ValidationError') {
        const validationErrors = [];
        for (const key in error.errors) {
          validationErrors.push(error.errors[key].message);
        }
        res.status(400).json({ errors: validationErrors });
      } else {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
  
 export class CustomError extends Error {
    statusCode:number
    constructor(message:string, statusCode = 500) {
      super(message);
      this.name = 'CustomError';
      this.statusCode = statusCode;
    }
  }
  
  module.exports = { CustomErrorHandler, CustomError };
  