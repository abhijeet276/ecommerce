import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { handlePendingAndRejected } from '../rejections';
import { createApiThunk } from '../createApiThunk';
import { ApiErrorResponse } from '../serviceTypes';
import { ProductList, ProductsState } from '../../../types/IProduct';

const fetchProducts = createApiThunk<void, ProductList, ApiErrorResponse>({
    name: 'fetchProducts',
    endpoint: 'http://localhost:5000/api/v1/products',
    method: 'GET',
});

const initialState: ProductsState = {
    products: {} as ProductList,
    status: 'loading',
    error: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
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
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductList>) => {
                state.status = 'succeeded';
                state.isFetching = false;
                state.isSuccess = true;
                state.isError = false;
                state.products = action.payload;
            });
    },
});

export { fetchProducts };
export default productSlice.reducer;
