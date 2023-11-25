import { AxiosRequestConfig } from "axios";

export interface ApiResponse<T> {
    data: T;
}
export interface ApiError {
    errorCode?: string | number;
    message?: string;
    details?: string;
}

export interface ApiErrorResponse {
    error: ApiError;
}

export type RequestParams = Omit<AxiosRequestConfig, 'data'> & {
    secure?: boolean;
    data?: any
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiThunkOptions<TRequest, TResponse, E = string> {
    name: string;
    endpoint: string;
    method: HttpMethod;
    onSuccess?: (data: TResponse) => void;
    onError?: (error: E) => void;
    onRequest?: (data: TRequest) => void;
}
