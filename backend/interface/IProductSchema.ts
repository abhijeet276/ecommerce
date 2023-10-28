import { Document } from "mongoose";

interface Image {
    public_id: string;
    url: string;
}

interface Review {
    name: string;
    rating: number;
    comment: string;
}

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
}