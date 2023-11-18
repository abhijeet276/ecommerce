import { NextFunction, Request, Response } from "express";
import { Users } from "../models/users";
import { CustomErrorHandler } from "../utils/errorHandler";
import httpStatus from "http-status";
import { sendToken } from "../utils/jwtToken";
import { tryCatch } from "../middleware/tryCatch";
import { sendEmail } from "../utils/sendEmail";

export class UserService {
    static createUserService = async (req: Request, res: Response) => {
        const user = await Users.create(req.body);
        if (!user) throw new CustomErrorHandler(httpStatus.CREATED, "Failed to create a user");
        return sendToken(user, 201, res);
    }
    static loginUserService = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!email || !password)
            throw new CustomErrorHandler(httpStatus.BAD_REQUEST, "both email and password is required")

        const user = await Users.findOne({ email }).select("+password")
        if (!user)
            throw new CustomErrorHandler(httpStatus.FORBIDDEN, "invalid email or password ");
        // compare the hashed password with the provided one

        const isPasswordCorrect = user.comparePassword(password);

        if (!isPasswordCorrect)
            throw new CustomErrorHandler(httpStatus.FORBIDDEN, "invalid email or password ");

        return sendToken(user, 200, res);
    }
    static logoutService = async (req: Request, res: Response, next: NextFunction) => {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        return "ok"
    }
    static forgotPasswordService = async (req: Request, res: Response, next: NextFunction) => {
        const user = await Users.findOne({ email: req.body.email })
        if (!user) {
            throw new CustomErrorHandler(httpStatus.NOT_FOUND, "User not found ")
        }
        const resetToken = await user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false })

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
        try {
            await sendEmail({
                email: user.email,
                subject: "Password Reset Token",
                message: `Forgot your Password?\n Click on this link ${resetPasswordUrl} to reset it.`
            })
            return `email sent to ${user.email} successfully`
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire= undefined;
            await user.save({validateBeforeSave:false})
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error: error.message,
        }); 
        }
    }
}