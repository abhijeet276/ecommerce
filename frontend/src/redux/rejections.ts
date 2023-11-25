import { PayloadAction } from "@reduxjs/toolkit";

type StateWithStatus = {
    status?: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: any; // Change this to the specific error type if needed
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
    } else if (action.meta.requestStatus === 'rejected') {
        state.status = 'failed';
        state.error = action.payload;
    }
};