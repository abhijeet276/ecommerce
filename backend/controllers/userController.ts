import { NextFunction, Request, Response } from "express";
import { tryCatch } from "../middleware/tryCatch";
import { UserService } from "../services/userService";
import { AuthenticatedRequest } from "../interface/IUserSchema";

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
    static resetPassword = tryCatch(async (req: Request, res: Response,next:NextFunction) => {
        const data = await UserService.resetPasswordService(req, res,next)
        res.send(data)
      })
    static getMyUserDetails = tryCatch(async (req: AuthenticatedRequest, res: Response,next:NextFunction) => {
        const data = await UserService.getMyUserDetailsService(req, res,next)
        res.send(data)
      })
    static updatePassword = tryCatch(async (req: AuthenticatedRequest, res: Response,next:NextFunction) => {
        const data = await UserService.updatePasswordService(req, res,next)
        res.send(data)
      })
    static updateProfile = tryCatch(async (req: AuthenticatedRequest, res: Response,next:NextFunction) => {
        const data = await UserService.updateProfileService(req, res,next)
        res.send(data)
      })
    static getAllUsers = tryCatch(async (req: AuthenticatedRequest, res: Response,next:NextFunction) => {
        const data = await UserService.getAllUserService(req, res,next)
        res.send(data)
      })
    static getsingleUsers = tryCatch(async (req: AuthenticatedRequest, res: Response,next:NextFunction) => {
        const data = await UserService.getsingleUsersService(req, res,next)
        res.send(data)
      })
    static deleteUser = tryCatch(async (req: AuthenticatedRequest, res: Response,next:NextFunction) => {
        const data = await UserService.deleteUserUsersService(req, res,next)
        res.send(data)
      })
    static updateUserRole = tryCatch(async (req: AuthenticatedRequest, res: Response,next:NextFunction) => {
        const data = await UserService.updateUserRoleService(req, res,next)
        res.send(data)
      })
}