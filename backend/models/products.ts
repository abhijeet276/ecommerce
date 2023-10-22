import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
        default:0,
        required: [true, 'Stock field cannot be empty'],
        maxLength: [4, "Stock cannot exceed 4 Characters"]
    },
    noOfReviews: {
        type: Number,
        default: 0
    },
    reveiw: [
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
            }
        }
    ],
    createAt: {
        type: Date,
        default: Date.now()
    }
})
const Product = mongoose.model("Product", productSchema);
export default Product 