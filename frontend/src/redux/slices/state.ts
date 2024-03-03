import { User, userList } from '../../../types/ILogin';
import { Product, ProductList, ProductsState, cartState, orderState, userState } from '../../../types/IProduct';

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
  isAuthenticated: false,
  status: 'loading',
  error: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
};

export const cartInitialState: cartState = {
  cartItems: [],
  product: '',
  shippingInfo: '',
  quantity: 0,
  status: 'loading',
  error: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
};

export const orderInitialState: orderState = {
  orders: [],
  status: 'loading',
  error: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
};
