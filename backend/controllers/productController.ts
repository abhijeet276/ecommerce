import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/productService";
import httpStatus from "http-status";
import { tryCatch } from "../middleware/tryCatch";
export class ProductController {
  static createProduct = tryCatch(async (req: Request, res: Response) => {
    const data = await ProductService.createProductService(req, res)
    res.send(data)
  })
  static updateProduct = tryCatch(async (req: Request, res: Response) => {
    const data = await ProductService.updateProductService(req)
    res.status(httpStatus.OK).send(data)
  })
  static getAllProducts = tryCatch(async (req: Request, res: Response,next:NextFunction) => {
    const data = await ProductService.getAllProductsService(req)
    res.status(httpStatus.OK).send(data)
  })
  static deleteProduct = tryCatch(async (req: Request, res: Response) => {
    await ProductService.deleteProductService(req)
    res.status(httpStatus.NO_CONTENT).send();
  })
  static getProductById = tryCatch(async (req: Request, res: Response) => {
    const data = await ProductService.getProductByIdService(req)
    res.status(httpStatus.OK).send(data)
  })
  static createOrUpdateReview = tryCatch(async (req: Request, res: Response) => {
    const data = await ProductService.createOrUpdateProductReview(req)
    res.status(httpStatus.OK).send(data)
  })
  static getAllReviews = tryCatch(async (req: Request, res: Response) => {
    const data = await ProductService.getAllReviewsService(req)
    res.status(httpStatus.OK).send(data)
  })
  static deleteReview = tryCatch(async (req: Request, res: Response) => {
    const data = await ProductService.deleteReviewService(req)
    res.status(httpStatus.OK).send(data)
  })
}