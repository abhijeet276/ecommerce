import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { handlePendingAndRejected } from '../rejections';
import { ProductList } from '../../../types/IProduct';
import { fetchProducts, fetchSelectedProduct } from '../services/productService';
import { productInitialState } from './state';
type PendingAction = PayloadAction<undefined, string, { arg: void; requestId: string; requestStatus: 'pending' }, never>;
type RejectedAction = PayloadAction<any, string, { arg: void; requestId: string; requestStatus: 'rejected'; aborted: boolean; condition: boolean }, never>;

const productSlice = createSlice({
    name: 'products',
    initialState: productInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductList>) => {
                state.status = 'succeeded';
                state.isFetching = false;
                state.isSuccess = true;
                state.isError = false;
                state.products = action.payload;
            })
            .addCase(fetchSelectedProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isFetching = false;
                state.isSuccess = true;
                state.isError = false;
                state.product = action.payload;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending') && action.type.includes('selectedProduct'),
                (state, action) => {
                    handlePendingAndRejected(state, action as PendingAction);
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected') && action.type.includes('selectedProduct'),
                (state, action) => {
                    handlePendingAndRejected(state, action as RejectedAction);
                }
            )
    },
});
export default productSlice.reducer;
