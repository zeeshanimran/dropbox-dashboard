export type ILoginForm = {
  email: string;
  password: string;
};

export type ISignUpForm = {
  name: string;
  email: string;
  password: string;
};

export type IUserAPI = { email: string; password: string };

export interface User {
  email: string;
  token: string;
  name: string;
  id: string;
}
export interface IAppContext {
  user?: User | null;
  setUser: Function;
}

export type IUserType = {
  firstName: string;
  lastName: string;
  userName: string;
  createdAt: string;
  email: string;
  password: string;
  salt: string;
  updatedAt: string;
  _id: string;
};

export type IPostDetails = {
  _id: string;
  path: string;
  createdAt: string;
  extension: string;
  name: string;
  size: number;
  updatedAt: string;
  user: User;
};

export type ICommentsDataType = {
  postId: string;
  comment: string;
  createdAt: string;
  commentId: string;
}[];
