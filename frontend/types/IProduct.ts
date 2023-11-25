export interface IImage {
    url: string
}
export interface IProduct {
    name: string,
    images: IImage[],
    price: string,
    _id: string,
}

export interface Product {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface ProductsState {
    products: Product[];
    status: 'loading' | 'succeeded' | 'failed';
    error: any;
}