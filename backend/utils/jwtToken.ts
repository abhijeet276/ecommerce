import { CookieOptions, Response } from "express";
import { IUserDocument } from "../interface/IUserSchema";

export const sendToken = (user: IUserDocument, statusCode: number, res: Response) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 1000),
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    })
}