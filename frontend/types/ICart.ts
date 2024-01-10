import { IImage } from './IProduct';

export interface ICart {
  product: string;
  images: IImage[];
  price: string;
  name: string;
  quautity: string;
  stock: string;
  _id: string;
}
export interface IAddedToCart {
  id: string;
  quantity: number;
}
