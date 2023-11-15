import { Request, Response } from "express";
import { Users } from "../models/users";
import { CustomErrorHandler } from "../utils/errorHandler";
import httpStatus from "http-status";

export class UserService {
    static createUserService = async (req: Request, res: Response) => {
        const user = await Users.create(req.body);
        const token = user.getJwtToken()
        return { user, token }
    }
    static loginUserService = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!email || !password)
            throw new CustomErrorHandler(httpStatus.BAD_REQUEST, "both email and password is required")

        const user = await Users.findOne({ email }).select("+password")
        if (!user)
            throw new CustomErrorHandler(httpStatus.FORBIDDEN, "invalid email or password ")
        const isPasswordCorrect = user.comparePassword(password)
        console.log(isPasswordCorrect, "pswd compare", email, password, user)
        if (!isPasswordCorrect)
            throw new CustomErrorHandler(httpStatus.FORBIDDEN, "invalid email or password ")

        const token = user.getJwtToken()
        return { token }
    }
}