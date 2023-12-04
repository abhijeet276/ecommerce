import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDataFromApi } from "./apiUtils";
import { ApiThunkOptions } from "./serviceTypes";

export const createApiThunk = <TRequest, TResponse, E = string>(
    options: ApiThunkOptions<TRequest, TResponse, E & { dynamicEndpoint?: (requestData: TRequest) => string }>
) => {
    return createAsyncThunk(`api/${options.name}`, async (requestData: TRequest, { rejectWithValue }) => {
        try {
            if (options.onRequest) {
                options.onRequest(requestData);
            }
            const endpoint = options.dynamicEndpoint
                ? options.dynamicEndpoint(requestData)
                : options.endpoint;

            const data = await fetchDataFromApi<TResponse>(endpoint, {
                method: options.method,
                data: options.method === 'POST' ? requestData : undefined,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (options.onSuccess) {
                options.onSuccess(data);
            }

            return data;
        } catch (error: any) {
            if (options.onError) {
                options.onError(error.message);
            }

            return rejectWithValue(error as SerializedError);
        }
    });
};
