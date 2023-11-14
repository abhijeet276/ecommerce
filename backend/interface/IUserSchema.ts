import { Document } from "mongoose";
import { Image } from "./IImage";

export interface IUserDocument extends Document {
    name: string;
    email: string;
    password?: string;
    avatar: Image;
    role:string;
    createdAt:Date;
    resetPasswordToken: string,
    resetPasswordExpire: Date,
}