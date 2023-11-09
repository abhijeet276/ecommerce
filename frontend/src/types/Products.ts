export interface IProduct{
    name: string,
    images: {url:string}[],
    price:string,
    id: string,
}
export interface IProductOptions{
    edit: boolean,
    value:string
    color:string
    activeColor: string,
    isHalf:boolean,
    size:number
}
export interface IProducts{
product:IProduct
}
export interface IProductsOptions{
    options:IProductsOptions
    }