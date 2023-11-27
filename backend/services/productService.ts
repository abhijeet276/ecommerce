import { Request, Response } from "express";
import { Product } from "../models/products";
import httpStatus from "http-status";
import { CustomErrorHandler } from "../utils/errorHandler";
import { ApiFeatures } from "../utils/apiFeatures";
import { ProductDocument } from "../interface/IProductSchema";
import { AuthenticatedRequest } from "../interface/IUserSchema";

export class ProductService {
    static createProductService = async (req: AuthenticatedRequest, res: Response) => {
        req.body.user = req.user.id
        const product = await Product.create(req.body);
        return product
    }

    static updateProductService = async (req: Request) => {
        let product = await Product.findById(req.params.id,);
        if (!product) throw new CustomErrorHandler(httpStatus.NOT_FOUND, "Product Not Fount");
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true, useFindAndModify: false
        })
        return product
    }
    static getAllProductsService = async (req: Request) => {
        const { page, limit, sortBy, sortOrder, search, minPrice, maxPrice, ...dynamicFilters } = req.query;
        console.log("first demo")
        const filter: { [key: string]: any } = {};
        //we are checking if we have the min or max price
        if (minPrice !== undefined) {
            filter.price = { ...filter.price, $gte: parseFloat(minPrice as string) };
        }
        if (maxPrice !== undefined) {
            filter.price = { ...filter.price, $lte: parseFloat(maxPrice as string) };
        }
        //we are adding other filters like category search
        Object.entries(dynamicFilters).forEach(([key, value]) => {
            if (typeof value === 'string')
                filter[key] = { $regex: new RegExp(value, 'i') };
            else console.warn(`Skipping this key "${key}" because its not a string.`);
        });
        //search
        if (search) {
            const searchString: string = search as string;
            filter.$or = [{ name: new RegExp(searchString, 'i') }, { description: new RegExp(searchString, 'i') }];
        }
        //sort
        const sort: { [key: string]: 'asc' | 'desc' } = {};;
        if (sortBy) {
            const sortField: string = sortBy as string;
            sort[sortField] = sortOrder === 'desc' ? 'desc' : 'asc';
        }
        const pagination = new ApiFeatures<ProductDocument>(Product, {
            page: parseInt(page as string, 10) || 1,
            limit: parseInt(limit as string, 10) || 10,
            sort,
            filter,
        });

        const results = await pagination.getResults();
        return results;
    }

    static deleteProductService = async (req: Request) => {
        const product = await Product.findById(req.params.id);
        if (!product) throw new CustomErrorHandler(httpStatus.NOT_FOUND, "Product Not Fount");
        await Product.deleteOne({ _id: req.params.id });
    }
    static getProductByIdService = async (req: Request) => {
        const product = await Product.findById(req.params.id);
        if (!product) throw new CustomErrorHandler(httpStatus.NOT_FOUND, "Product Not Fount");
        return product
    }
    static createOrUpdateProductReview = async (req: AuthenticatedRequest) => {
        const { rating, comment, productId } = req.body;
        const review = {
            user: req.user.id,
            name: req.user.name,
            rating: Number(rating),
            comment,
        };
        const product = await Product.findById(productId);
        const isReviewed = product.review.find(
            (rev) => rev.user.toString() === req.user.id.toString()
        );
        if (isReviewed) {
            product.review.forEach(rev => {
                if (rev.user.toString() === req.user.id.toString()) {
                    rev.rating = Number(rating);
                    rev.comment = comment;
                }
            });
        } else product.review.push(review);
        product.noOfReviews = product.review.length;
        await product.save();
        return product;
    }
    static getAllReviewsService = async (req: AuthenticatedRequest) => {
        const productId = req.query.id
        if (!productId) {
            return new CustomErrorHandler(httpStatus.BAD_REQUEST, 'Invalid ID')
        }
        const product = await Product.findById(productId)
        if (!product) {
            return new CustomErrorHandler(httpStatus.NOT_FOUND, 'Product Not Found')
        }
        return product.review
    }
    static deleteReviewService = async (req: AuthenticatedRequest) => {
        const productId = req.query.id;
        console.log('Received productId:', productId);
        if (!productId) {
            return new CustomErrorHandler(httpStatus.BAD_REQUEST, 'Invalid ID');
        }
        const product = await Product.findById(productId);
        if (!product) {
            return new CustomErrorHandler(httpStatus.NOT_FOUND, 'Product Not Found');
        }
        let index = -1;
        product.review.forEach((rev, i) => {
            if (rev.user.toString() === req.user.id.toString()) index = i;
        });
        if (index > -1) {
            product.review.splice(index, 1);
            product.noOfReviews = product.review.length;
            product.calculateAverageRating();
            await product.save();
        }
        return product;
    }

}