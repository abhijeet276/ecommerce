import { IOrderResp, createOrderPayload } from '../../../types/IOrder';
import { createApiThunk } from '../createApiThunk';
import { ApiErrorResponse } from '../serviceTypes';

export const fetchCreateOrder = createApiThunk<createOrderPayload, IOrderResp, ApiErrorResponse>({
  name: 'createOrder',
  endpoint: '/api/v1/order/new',
  method: 'POST',
});
