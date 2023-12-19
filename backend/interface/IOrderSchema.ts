import { Types } from "mongoose";

interface ShippingInfo {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
    phoneNo: number;
}

interface OrderItem {
    name: string;
    price: number;
    quantity: number;
    image: string;
    product: Types.ObjectId
}

interface PaymentInfo {
    id: string;
    status: string;
}

export interface OrderDocument extends Document {
    shippingInfo: ShippingInfo;
    orderItems: OrderItem[];
    user: Types.ObjectId
    paymentInfo: PaymentInfo;
    paidAt: Date;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    orderStatus: string;
    deliveredAt?: Date;
    createdAt: Date;
}
