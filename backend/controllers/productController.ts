import { Request, Response } from "express";
import Product from "../models/products";
import { ProductService } from "../services/productService";
import httpStatus from "http-status";
export class ProductController {
  //admin
  static createProduct = async (req: Request, res: Response) => {
    const {data,message,status} = await ProductService.createProductService(req, res)
    res.status(status).send({data,message})
  }
  static updateProduct = async (req: Request, res: Response) => {
    const data = await ProductService.updateProductService(req)
    res.status(httpStatus.OK).send({data})
  }
  static getAllProducts = async (req: Request, res: Response) => {
    const data = await ProductService.getAllProductsService()
    res.status(httpStatus.OK).send({data})
  }
  static deleteProduct = async (req: Request, res: Response) => {
    const data = await ProductService.deleteProductService(req)
    res.status(httpStatus.OK).send({data})
  }
  static getProductById = async (req: Request, res: Response) => {
    const data = await ProductService.getProductByIdService(req)
    res.status(httpStatus.OK).send({data})
  }
}