import { Request, Response } from "express";
import { Product } from "../models/products";
import httpStatus from "http-status";
import { CustomErrorHandler } from "../utils/errorHandler";
import { ApiFeatures } from "../utils/apiFeatures";
import { ProductDocument } from "../interface/IProductSchema";
import { FilterSearchOptions, PaginationOptions } from "../interface/IPagination";

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
    static getAllProductsService = async () => {
        const filterSearchPagination = new ApiFeatures<ProductDocument>(Product);
        const filterSearchOptions: FilterSearchOptions = {
            filters: {},
            searchKeys: ['category'],
        };
        const paginationOptions: PaginationOptions = {
            page: 1,
            limit: 10,
        };
        const result = await filterSearchPagination.filterSearchPaginate(filterSearchOptions, paginationOptions)
        // const product = await Product.find();
        return result
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