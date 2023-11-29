import { PayloadAction } from "@reduxjs/toolkit";

export type StateWithStatus = {
    status?: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: any;
    isFetching: boolean;
    isSuccess: boolean;
    isError: boolean;
};


export const handlePendingAndRejected = <TState extends StateWithStatus>(
    state: TState,
    action: PayloadAction<
        undefined,
        string,
        { arg: void; requestId: string; requestStatus: 'pending'; },
        never
    > | PayloadAction<
        any,
        string,
        { arg: void; requestId: string; requestStatus: 'rejected'; aborted: boolean; condition: boolean; },
        never
    >
) => {
    if (action.meta.requestStatus === 'pending') {
        state.status = 'loading';
        state.isFetching = true;
        state.isSuccess = false;
        state.isError = false;
    } else if (action.meta.requestStatus === 'rejected') {
        state.status = 'failed';
        state.error = action.payload;
        state.isFetching = false;
        state.isSuccess = false;
        state.isError = true;
    }
};
