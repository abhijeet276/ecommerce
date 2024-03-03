import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAddToCart } from '../services/cartService';
import { cartInitialState } from './state';
import { handlePendingAndRejected } from '../rejections';
import { store } from '../store';

type PendingAction = PayloadAction<
  undefined,
  string,
  { arg: void; requestId: string; requestStatus: 'pending' },
  never
>;
type RejectedAction = PayloadAction<
  any,
  string,
  { arg: void; requestId: string; requestStatus: 'rejected'; aborted: boolean; condition: boolean },
  never
>;
interface AddItemsPayload {
  id: string;
  newQty: number;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    removeItemsFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(item => item.product !== action.payload);
      // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    // addItemsToCart: (state, action: PayloadAction<AddItemsPayload>) => {
    //   state.quantity = state.quantity + action.payload.newQty;
    // },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAddToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isFetching = false;
        state.isSuccess = true;
        state.isError = false;

        const item = action.payload;

        console.log(item, 'itemitemitemitem');

        const isItemExist = state.cartItems.find(i => i.product === item._id);
        // console.log(isItemExist, 'isItemExistisItemExistisItemExist');
        if (isItemExist) {
          state.cartItems = state.cartItems.map(i => (i.product === isItemExist.product ? item : i));
        } else {
          state.cartItems = [...state.cartItems, item];
        }
        localStorage.setItem('cartItems', JSON.stringify(action.payload));
      })
      .addMatcher(
        action => action.type.endsWith('/pending') && action.type.includes('selectedProduct'),
        (state, action) => {
          handlePendingAndRejected(state, action as PendingAction);
        },
      )
      .addMatcher(
        action => action.type.endsWith('/rejected') && action.type.includes('selectedProduct'),
        (state, action) => {
          handlePendingAndRejected(state, action as RejectedAction);
        },
      );
  },
});

export const { removeItemsFromCart, saveShippingInfo } = cartSlice.actions;
export default cartSlice.reducer;
