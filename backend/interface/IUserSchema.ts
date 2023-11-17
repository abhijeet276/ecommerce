import { Document } from "mongoose";
import { Image } from "./IImage";
import { Request } from "express";

export interface IUserDocument extends Document {
    name: string;
    email: string;
    password?: string;
    avatar: Image;
    role:string;
    createdAt:Date;
    resetPasswordToken: string,
    resetPasswordExpire: Date,
    getJwtToken(): string;
    comparePassword(enterdPassword:string):string
    getResetPasswordToken():string
}

export interface AuthenticatedRequest extends Request {
    user?: IUserDocument;
  }