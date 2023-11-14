import { Request, Response } from "express";
import { Product } from "../models/products";
import httpStatus from "http-status";
import { CustomErrorHandler } from "../utils/errorHandler";
import { ApiFeatures } from "../utils/apiFeatures";
import { ProductDocument } from "../interface/IProductSchema";

export class ProductService {
    static createProductService = async (req: Request, res: Response) => {
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
}