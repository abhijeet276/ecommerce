import { NextFunction, Request, Response } from "express";
import { Users } from "../models/users";
import { CustomErrorHandler } from "../utils/errorHandler";
import httpStatus from "http-status";
import { sendToken } from "../utils/jwtToken";
import crypto from "crypto"
import { sendEmail } from "../utils/sendEmail";
import { AuthenticatedRequest } from "../interface/IUserSchema";
import mongoose from "mongoose";

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
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false })
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                error: error.message,
            });
        }
    }
    static resetPasswordService = async (req: Request, res: Response, next: NextFunction) => {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
        const user = await Users.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })
        if (!user) {
            return new CustomErrorHandler(httpStatus.FORBIDDEN, "Invalid token");
        }
        if (req.body.password !== req.body.confirmPassword) {
            return new CustomErrorHandler(httpStatus.CONFLICT, "Passwords do not match");
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save()
        return sendToken(user, 200, res);
    }
    static getMyUserDetailsService = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const userId = req.user.id as string
        if (!userId) {
            return new CustomErrorHandler(httpStatus.UNAUTHORIZED, "No User Found")
        }
        const user = await Users.findById(userId)
        if (!user) {
            return new CustomErrorHandler(httpStatus.UNAUTHORIZED, 'No User Found')
        }
        return user
    }
    static updatePasswordService = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const userId = req.user.id as string
        if (!userId) {
            return new CustomErrorHandler(httpStatus.UNAUTHORIZED, "No User Found")
        }
        const user = await Users.findById(userId).select("+password")

        if (!user) {
            return new CustomErrorHandler(httpStatus.UNAUTHORIZED, 'No User Found')
        }
        const isPasswordCorrect = user.comparePassword(req.body.currentPassword);

        if (!isPasswordCorrect)
            return new CustomErrorHandler(httpStatus.FORBIDDEN, "inCorrect Password ");

        if (req.body.password !== req.body.confirmPassword) {
            return new CustomErrorHandler(httpStatus.CONFLICT, "Passwords does not match with confirm Password");
        }
        user.password = req.body.newPassword
        await user.save();
        return sendToken(user, 200, res);

    }
    static updateProfileService = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        let userId = req.user.id as string;
        if (!userId) {
            return new CustomErrorHandler(httpStatus.UNAUTHORIZED, "No User Found")
        }
        const user = await Users.findByIdAndUpdate(userId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return new CustomErrorHandler(httpStatus.NOT_FOUND, 'No User Found');
        }
        return user
    }
    static getAllUserService = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const users = await Users.find()
            .populate({ path: 'role', select: '-__v' })
            .sort('-createdAt');
        return users
    }
    static getsingleUsersService = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return new CustomErrorHandler(httpStatus.BAD_REQUEST, 'Invalid ID')
        }
        const user = await Users.findById(userId).populate({
            path: 'role',
            select: '-__v'
        });
        if (!user) {
            return new CustomErrorHandler(httpStatus.NOT_FOUND, 'User not found');
        }
        return user;
    }
    static deleteUserUsersService = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return new CustomErrorHandler(httpStatus.BAD_REQUEST, 'Invalid ID')
        }
        const user = await Users.findByIdAndRemove(userId);
        if (!user) {
            return new CustomErrorHandler(httpStatus.NOT_FOUND, 'User not found');
        }
        return "User Delete Successfullt";
    }
    static updateUserRoleService = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const userId = req.user.id;
        const newRole = req.body.newRole;
        const allowedRoles = ['admin', 'user'];
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return new CustomErrorHandler(httpStatus.BAD_REQUEST, 'Invalid ID')
        }
        if(newRole === req.user.role){
            return new CustomErrorHandler(httpStatus.CONFLICT,'You cannot assign the same role');
        }
        if (!allowedRoles.includes(newRole)) {
            return new CustomErrorHandler(httpStatus.BAD_REQUEST, 'Invalid role.');
        }
        const updatedUser = await Users.findByIdAndUpdate(
            userId,
            { role: newRole },
            { new: true }
        ).exec();
        return updatedUser
    }
}