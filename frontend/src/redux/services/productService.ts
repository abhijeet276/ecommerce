import { Product, ProductList } from "../../../types/IProduct";
import { createApiThunk } from "../createApiThunk";
import { ApiErrorResponse } from "../serviceTypes";

export const fetchProducts = createApiThunk<void, ProductList, ApiErrorResponse>({
    name: 'fetchProducts',
    endpoint: `/api/v1/products`,
    method: 'GET',
});
export const fetchSelectedProduct = createApiThunk<{id:string}, Product, ApiErrorResponse>({
    name: 'selectedProduct',
    endpoint:"",
    method: 'GET',
    dynamicEndpoint:({id})=>`/api/v1/products/${id}`
});