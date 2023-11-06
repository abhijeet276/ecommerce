export interface IProduct{
    name: string,
    images: {url:string}[],
    price:string,
    id: string,
}
export interface IProducts{
product:IProduct
}