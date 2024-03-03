import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { authInitialState } from './state';
import { userLogin, userSignup } from '../services/authService';
import { handlePendingAndRejected } from '../rejections';

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

const productSlice = createSlice({
  name: 'users',
  initialState: authInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        console.log(action.payload, 'llllllllllllllllllllooooo');
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.isFetching = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      })
      // .addCase(userSignup.fulfilled, (state, action) => {
      //   console.log(action.payload, 'sdfghjkl');
      //   state.status = 'succeeded';
      //   state.isFetching = false;
      //   state.isSuccess = true;
      //   state.isError = false;
      //   state.user = action.payload;
      // })
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
export default productSlice.reducer;
