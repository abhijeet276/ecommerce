import { Request, Response } from "express";
import { Users } from "../models/users";

export class UserService {
    static createUserService = async (req: Request, res: Response) => {
        const user = await Users.create(req.body);
        return user
    }
}