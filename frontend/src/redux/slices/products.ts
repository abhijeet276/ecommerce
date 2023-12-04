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
            .addCase(fetchSelectedProduct.fulfilled,(state,action)=>{
                
            })
            .addMatcher(
                (action) => [fetchProducts.pending, fetchSelectedProduct.pending].includes(action.type),
                (state, action) => {
                    handlePendingAndRejected(state, action as PendingAction);
                }
            )
            .addMatcher(
                (action) => [fetchProducts.rejected, fetchSelectedProduct.rejected].includes(action.type),
                (state, action) => {
                    handlePendingAndRejected(state, action as RejectedAction);

                }
            )
    },
});
export default productSlice.reducer;
