import { createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { fetchDataFromApi } from './apiUtils';
import { ApiThunkOptions } from './serviceTypes';

export const createApiThunk = <TRequest, TResponse, E = string>(options: ApiThunkOptions<TRequest, TResponse, E>) =>
    createAsyncThunk(`api/${options.name}`, async (requestData: TRequest, { rejectWithValue }) => {
        console.log(requestData)
        try {
            // Call the onRequest 
            if (options.onRequest) {
                options.onRequest(requestData);
            }

            const data = await fetchDataFromApi<TResponse>(options.endpoint, {
                method: options.method,
                data: options.method === 'POST' ? requestData : undefined,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Call the onSuccess 
            if (options.onSuccess) {
                options.onSuccess(data);
            }

            return data;
        } catch (error: any) {
            // Call the onError 
            if (options.onError) {
                options.onError(error.message);
            }

            // Use rejectWithValue to provide a structured error object
            return rejectWithValue(error as SerializedError);
        }
    });
