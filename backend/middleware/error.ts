import { Request, Response, NextFunction } from 'express';
import { CustomErrorHandler } from '../utils/errorHandler';


export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomErrorHandler) {
    return res.status(error.httpCode).json({ error: error.message });
  } else if (error.name === 'ValidationError') {
    const validationErrors = Object.values((error as any).errors).map(
      (err: any) => err.message
    );
    return res.status(400).json({ errors: validationErrors });
  } else if (error.name === "CastError") {
    return res.status(500).json({error:"Invalid ID"});
  } else if (error.name === "JsonWebTokenError") {
    return res.status(500).json({error:"Json Web Token is invalid, Try again"});
  } else if (error.name === "TokenExpiredError") {
    return res.status(500).json({error:"Json Web Token is Expired, Try again"});
  } else {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
