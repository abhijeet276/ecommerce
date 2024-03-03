import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { handlePendingAndRejected } from '../rejections';
import { fetchCreateOrder } from '../services/orderService';
import { orderInitialState } from './state';

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

// const initialState = {
//   status: '',
//   error: '',
//   isFetching: '',
//   isSuccess: '',
//   isError: '',
// };

let orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCreateOrder.fulfilled, (state, action) => {
        // state.status = 'succeeded';
        // state.isFetching = false;
        // state.isSuccess = true;
        // state.isError = false;
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

export default orderSlice.reducer;
