import { IAddedToCart, ICart } from '../../../types/ICart';
import { createApiThunk } from '../createApiThunk';
import { ApiErrorResponse } from '../serviceTypes';

export const fetchAddToCart = createApiThunk<IAddedToCart, ICart, ApiErrorResponse>({
  name: 'addToCart',
  endpoint: '',
  method: 'GET',
  dynamicEndpoint: ({ id }) => `/api/v1/products/${id}`,
});
