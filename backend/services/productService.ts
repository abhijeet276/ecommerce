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
    static getAllProductsService = async (req: Request) => {
        const filterSearchPagination = new ApiFeatures<ProductDocument>(Product);
        const filterCriteria: { [key: string]: any } = {...req.query}; 
        delete filterCriteria.searchKeys
        const searchKeys: string[] = (typeof req.query.searchKeys === 'string')
        ? req.query.searchKeys.split(',')
        : ['category'];
        const paginationOptions: PaginationOptions = {
          page: Number(req.query.page) || 1,
          limit: Number(req.query.limit) || 10,
        };
        console.log(searchKeys,"filterCriteria",req.query,typeof req.query.searchKeys)
        const filterSearchOptions: FilterSearchOptions = {
            filters: filterCriteria,
            searchKeys,
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