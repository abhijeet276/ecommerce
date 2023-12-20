import { NextFunction, Request, Response } from "express";
import { tryCatch } from "../middleware/tryCatch";
import { OrderService } from "../services/orderService";
import { AuthenticatedRequest } from "../interface/IUserSchema";

export class OrderController {
    static createProduct = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
      const data = await OrderService.newOrder(req, res)
      res.send(data)
    })
    static order = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
      const data = await OrderService.MyOrder(req, res)
      res.send(data)
    })
    static SelectedOrder = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
      const data = await OrderService.SelectedOrder(req, res)
      res.send(data)
    })
}