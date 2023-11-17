import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import { Users } from '../models/users';
import { tryCatch } from './tryCatch';
import { CustomErrorHandler } from '../utils/errorHandler';
import { AuthenticatedRequest } from '../interface/IUserSchema';

export const isAuthenticated = tryCatch(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new CustomErrorHandler(httpStatus.UNAUTHORIZED, 'Unauthorized');
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        if (!decodeToken || typeof decodeToken !== 'object' || !decodeToken.id) {
            throw new CustomErrorHandler(httpStatus.FORBIDDEN, 'Forbidden');
        }
        const user = await Users.findById(decodeToken.id);
        if (!user) {
            throw new CustomErrorHandler(httpStatus.NOT_FOUND, 'User not found');
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
});

export const authorizeRoles = (...roles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return next(new CustomErrorHandler(httpStatus.FORBIDDEN, "You are unauthorised to perform this action"))
        }
        next()
    }
}