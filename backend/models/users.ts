import mongoose, { Model, model } from "mongoose";
import validator from "validator"
import { IUserDocument } from "../interface/IUserSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CustomErrorHandler } from "../utils/errorHandler";
import httpStatus from "http-status";
import crypto from "crypto"
const userSchema = new mongoose.Schema<IUserDocument>({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    avatar: {
        public_id: { type: String, },
        url: { type: String, },
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        } catch (error) { next(error); }
    }
    next();
});
//Jwt Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
}

// Compare Password 
userSchema.methods.comparePassword = async function (enterdPassword: string) {
    try {
        const isPasswordMatch = await bcrypt.compare(enterdPassword, this.password);
        return isPasswordMatch;
    } catch (error) {
        throw new CustomErrorHandler(httpStatus.FORBIDDEN, "invalid email or password");
    }
}
//reset pswd token generator
userSchema.methods.getResetPasswordToken = async function () {
    const resetTokenn = crypto.randomBytes(20).toString("hex")
    try {
        this.resetPasswordToken = crypto.createHash("sha256").update(resetTokenn).digest("hex")
        this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
        return resetTokenn
    } catch (error) {
        console.log(error)
    }
    //hasing 

}
const Users: Model<IUserDocument> = model<IUserDocument>('Users', userSchema);
export { Users }