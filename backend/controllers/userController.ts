import { Request, Response } from "express";
import httpStatus from "http-status";
import { tryCatch } from "../utils/tryCatch";
import { Users } from "../models/users";
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
}