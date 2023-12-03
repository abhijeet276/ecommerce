import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { handlePendingAndRejected } from '../rejections';
import { ProductList } from '../../../types/IProduct';
import { fetchProducts } from '../services/productService';
import { productInitialState } from './state';
const productSlice = createSlice({
    name: 'products',
    initialState: productInitialState,
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
export default productSlice.reducer;
