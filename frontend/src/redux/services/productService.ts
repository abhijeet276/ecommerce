import { ProductList } from "../../../types/IProduct";
import { createApiThunk } from "../createApiThunk";
import { ApiErrorResponse } from "../serviceTypes";

export const fetchProducts = createApiThunk<void, ProductList, ApiErrorResponse>({
    name: 'fetchProducts',
    endpoint: 'http://localhost:5000/api/v1/products',
    method: 'GET',
});