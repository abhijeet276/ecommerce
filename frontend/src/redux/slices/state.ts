import { User, userList } from '../../../types/ILogin';
import { Product, ProductList, ProductsState, userState } from '../../../types/IProduct';

export const productInitialState: ProductsState = {
  products: {} as ProductList,
  status: 'loading',
  error: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  product: {} as Product,
};

export const authInitialState: userState = {
  user: {} as userList,
  status: 'loading',
  error: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
};
