import { Product, ProductList, productListReq } from '../../../types/IProduct';
import { createApiThunk } from '../createApiThunk';
import { ApiErrorResponse } from '../serviceTypes';

export const fetchProducts = createApiThunk<productListReq, ProductList, ApiErrorResponse>({
  name: 'fetchProducts',
  endpoint: '',
  dynamicEndpoint: ({ page, category, price }) => {
    let cat, minmaxPrice;
    cat = category && `&category=${category}`;
    minmaxPrice = price && Array.isArray(price) && `&minPrice=${price[0]}&maxPrice=${price[1]}`;
    return `/api/v1/products?page=${page}&limit=10${cat}${minmaxPrice}`;
  },
  method: 'GET',
});

export const fetchSelectedProduct = createApiThunk<{ id: string }, Product, ApiErrorResponse>({
  name: 'selectedProduct',
  endpoint: '',
  method: 'GET',
  dynamicEndpoint: ({ id }) => `/api/v1/products/${id}`,
});
