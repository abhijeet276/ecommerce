import { IPageable } from "./IPageable";

export interface IImage {
    url: string
}
export interface IProduct {
    name: string,
    images: IImage[],
    price: string,
    _id: string,
}
export interface IReview {
    name: string;
    rating: number;
    comment: string;
    user: string
}

export interface Product {
    createdAt: string,
    _id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    rating: number,
    stock: number,
    noOfReviews: number,
    createAt: string,
    image: { url: string }[],
    review: IReview[]
}

export interface ProductList extends IPageable {
    results: Product[]
}

export interface ProductsState {
    products: ProductList;
    status: 'loading' | 'succeeded' | 'failed';
    error: any;
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    product: Product
}