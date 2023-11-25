import { createSlice } from '@reduxjs/toolkit';
import { handlePendingAndRejected } from '../rejections';
import { createApiThunk } from '../createApiThunk';
import { ApiErrorResponse, ApiResponse } from '../serviceTypes';
import { Product, ProductsState } from '../../../types/IProduct';

const fetchProducts = createApiThunk<void, ApiResponse<Product[]>, ApiErrorResponse>({
    name: 'fetchProducts',
    endpoint: '/api/v1/products',
    method: 'GET',
});

const initialState: ProductsState = {
    products: [],
    status: 'loading',
    error: null,
};
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                handlePendingAndRejected(state, action);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                handlePendingAndRejected(state, action);
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload.data;
            });
    },
});

export { fetchProducts };
export default productSlice.reducer;
