export type UserDataInterface = {
  username: string;
  userId: string;
  createdAt: number;
  email: string;
};

export interface ResponseConfig {
  status: 200 | 300;
  message: string;
}

export interface BookDataResponseConfig extends ResponseConfig {
  bookData: string[];
}

export interface PageResponseConfig extends ResponseConfig {
  pageData: string[];
  totalPage: number;
}

export interface AuthResponseConfig extends ResponseConfig {
  userCredentials: UserDataInterface | null;
}
