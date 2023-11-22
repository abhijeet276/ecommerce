import mongoose, { Model, model } from "mongoose";
import { ProductDocument } from "../interface/IProductSchema";

const productSchema = new mongoose.Schema<ProductDocument>({
    name: { type: String, required: [true, "Please enter product name"], trim: true },
    description: { type: String, required: [true, "please Enter Description"] },
    price: { type: Number, required: [true, 'Price is Required'] },
    category: { type: String, required: [true, "category is required"], default: 'Electronics' },
    rating: {
        type: Number,
        validate(value) {
            if (value < 0 || value > 5) throw new Error('Rating must be between 1 and 5');
        },
        default: 0
    },
    image: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
    ],
    stock: {
        type: Number,
        default: 0,
        required: [true, 'Stock field cannot be empty'],
        maxLength: [4, "Stock cannot exceed 4 Characters"]
    },
    noOfReviews: {
        type: Number,
        default: 0
    },
    review: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"Users",
                required:true
            },
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"Users",
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
productSchema.methods.calculateAverageRating = function () {
    const totalRating = this.review.reduce((sum, rev) => sum + rev.rating, 0);
    const numberOfReviews = this.review.length;
    const avgRating = numberOfReviews > 0 ? totalRating / numberOfReviews : 0;
    this.rating = avgRating;
};

productSchema.pre('save', function (next) {
    this.calculateAverageRating();
    next();
});

productSchema.pre('findOneAndUpdate', function (this: any, next) {
    const document = this.getQuery();
    document.calculateAverageRating();
    next();
});

const Product: Model<ProductDocument> = model<ProductDocument>('Product', productSchema);
export { Product } 