export interface IImage {
    url: string
}
export interface IProduct {
    name: string,
    images: IImage[],
    price: string,
    _id: string,
}