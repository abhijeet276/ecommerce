import { NextFunction, Request, Response } from "express";
import { tryCatch } from "../middleware/tryCatch";
import { UserService } from "../services/userService";

export class UserController {
    static createUser = tryCatch(async (req: Request, res: Response) => {
        const data = await UserService.createUserService(req, res)
        res.send(data)
      })
    static loginUser = tryCatch(async (req: Request, res: Response) => {
        const data = await UserService.loginUserService(req, res)
        res.send(data)
      })
    static logout = tryCatch(async (req: Request, res: Response,next:NextFunction) => {
        const data = await UserService.logoutService(req, res,next)
        res.send(data)
      })
    static forgotPassword = tryCatch(async (req: Request, res: Response,next:NextFunction) => {
        const data = await UserService.forgotPasswordService(req, res,next)
        res.send(data)
      })
}