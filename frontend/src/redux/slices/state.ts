import { Product, ProductList, ProductsState } from "../../../types/IProduct";

export const productInitialState: ProductsState = {
    products: {} as ProductList,
    status: 'loading',
    error: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    product:{} as Product
};