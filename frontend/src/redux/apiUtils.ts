import axios from 'axios';
import { RequestParams } from './serviceTypes';

export const fetchDataFromApi = async <T>(
    endpoint: string,
    params?: RequestParams
): Promise<T> => {
    try {
        const response = await axios({
            url: endpoint,
            method: params?.method || 'GET',
            data: params?.data,
            headers: {
                'Content-Type': 'application/json',
            },
            ...params,
        });
        const data: T = response.data;
        return data;
    } catch (error: any) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
};
