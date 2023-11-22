import { Types } from "mongoose";

export interface Review {
    name: string;
    rating: number;
    comment: string;
    user:Types.ObjectId
}