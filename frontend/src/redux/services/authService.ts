import { userList, loginPayload, signupPayload, updatePasswordPayload } from '../../../types/ILogin';
import { createApiThunk } from '../createApiThunk';
import { ApiErrorResponse } from '../serviceTypes';

export const userLogin = createApiThunk<loginPayload, userList, ApiErrorResponse>({
  name: 'userLogin',
  endpoint: `/api/v1/user/login`,
  method: 'POST',
});
export const userSignup = createApiThunk<signupPayload, userList, ApiErrorResponse>({
  name: 'userSignup',
  endpoint: `/api/v1/user/register`,
  method: 'POST',
});
export const updatePassword = createApiThunk<updatePasswordPayload, userList, ApiErrorResponse>({
  name: 'userSignup',
  endpoint: `/api/v1/user/change-password`,
  method: 'POST',
});
export const logoutUser = createApiThunk<void, userList, ApiErrorResponse>({
  name: 'logoutUser',
  endpoint: `/api/v1/user/logout`,
  method: 'GET',
});
export const userProfile = createApiThunk<void, userList, ApiErrorResponse>({
  name: 'logoutUser',
  endpoint: `/api/v1/user/getUserDetails`,
  method: 'GET',
});
