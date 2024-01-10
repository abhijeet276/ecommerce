export interface loginPayload {
  email: string;
  password: string;
}
export interface signupPayload {
  name: string;
  email: string;
  password: string;
}
export interface updatePasswordPayload {
  email: string;
}
export type Role = 'admin' | 'user';
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: string;
  __v: number;
}
export interface userList {
  success: true;
  user: User;
  token: string;
}
