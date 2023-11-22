import { Document, Types } from "mongoose";
import { Review } from "./IReview";
import { Image } from "./IImage";
export interface ProductDocument extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    rating: number;
    image: Image[];
    stock: number;
    noOfReviews: number;
    review: Review[];
    createdAt: Date;
    user:Types.ObjectId;
    calculateAverageRating():void
}