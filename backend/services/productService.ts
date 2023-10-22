import { Request, Response } from "express";
import Product from "../models/products";
import httpStatus from "http-status";

export class ProductService {
    static createProductService = async (req: Request, res: Response) => {
        try {
            const product = await Product.create(req.body);
            return { data: product, message: "create successfully", status: httpStatus.CREATED }
        } catch (error) {
            if (error.name === 'ValidationError') {
                return { data: {}, message: error.message, status: httpStatus.EXPECTATION_FAILED }
            } else {
                return { data: {}, message: error, status: httpStatus.BAD_REQUEST }
            }
        }
    }
    static updateProductService = async (req: Request) => {
        try {
            let product = await Product.findById(req.params.id,);
            if (!product)
                return { message: "Product Not Fount", data: {}, status: httpStatus.NOT_FOUND }
            product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true, runValidators: true, useFindAndModify: false
            })
            return { data: product, message: "update successfully", status: httpStatus.OK };
        } catch (error) {
            if (error) {
                return { data: {}, message: "Something went wrong", status: httpStatus.INTERNAL_SERVER_ERROR }
            }
        }
    }
    static getAllProductsService = async () => {
        try {
            const product = await Product.find();
            return { data: product }
        } catch (error) {
            if (error) {
                return { data: {}, status: httpStatus.INTERNAL_SERVER_ERROR, message: "Something went wrong" }
            }
        }
    }
    static deleteProductService = async (req: Request) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product)
                return {
                    message: "Product Not Fount", data: {}, status: httpStatus.NOT_FOUND
                }
            await Product.deleteOne({ _id: req.params.id });
            return { data: {}, message: "Deleted Successfully", status: httpStatus.OK }

        } catch (error) {
            if (error) {
                return { data: {}, message: "Something went wrong", status: httpStatus.INTERNAL_SERVER_ERROR }
            }
        }
    }
    static getProductByIdService = async (req: Request) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product)
                return { message: "Product Not Fount", data: {}, status: httpStatus.NOT_FOUND }
            return { data: product, message: "Product Found", status: httpStatus.OK }
        } catch (error) {
            if (error) {
                return { data: {}, message: "Something went wrong", status: httpStatus.INTERNAL_SERVER_ERROR }
            }
        }
    }
}