export interface createOrderPayload {
  shippingInfo: string;
  orderItems: string;
  itemsPrice: string;
  taxPrice: string;
  shippingPrice: string;
  totalPrice: string;
}

export interface IOrderResp {
  success: true;
}
