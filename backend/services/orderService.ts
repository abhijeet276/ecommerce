import { Request, Response } from "express";
import { Product } from "../models/products";
import httpStatus from "http-status";
import { CustomErrorHandler } from "../utils/errorHandler";
import { ApiFeatures } from "../utils/apiFeatures";
import { ProductDocument } from "../interface/IProductSchema";
import { AuthenticatedRequest } from "../interface/IUserSchema";
import Order from "../models/order";

export class OrderService {
    static newOrder = async (req: AuthenticatedRequest, res: Response) => {
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user.id,
        });

        return order
    }
    static SelectedOrder = async (req: AuthenticatedRequest, res: Response) => {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );
        if (!order) {
            return new CustomErrorHandler(httpStatus.NOT_FOUND, "No Order with this ID found!");
        }
        return order
    }
    static MyOrder = async (req: AuthenticatedRequest, res: Response) => {
        const order = await Order.find(req.user.id)
        console.log(order,req.user.id)
        if (!order) {
            return new CustomErrorHandler(httpStatus.NOT_FOUND, "No Order with this ID found!");
        }
        return order
    }
}