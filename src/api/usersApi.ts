import { axiosInstance } from "./axiosInstance";

export const getUser = async () => {
  try {
    const { data } = await axiosInstance
      .get('/api/users');
    
    return data;
  } catch (err: any) {
    console.error(`getUser : ${err}`);
  }
};

export const isUser = async (email: string) => {
  try {
    const { data } = await axiosInstance
      .get(`/api/users/email?e=${email}`);

    if (data) {
      return true;
    }

    return false;
  } catch (err: any) {
    console.error(`isUser : ${err}`);
    return false;
  }
};

export const createUser = async (email: string, password: string) => {
  try {
    await axiosInstance
      .post('/api/users', { email, password });
  } catch (err: any) {
    console.error(`createUser : ${err}`);
    throw new Error(err);
  }
};

export const login = async (email: string, password: string) => {
  try {
    await axiosInstance
      .post('/api/auth/login', { username: email, password });
  } catch (err: any) {
    console.error(`login : ${err}`);
    throw new Error(err);
  }
};

export const logout = async () => {
  try {
    await axiosInstance
      .post('api/auth/logout');
  } catch (err: any) {
    console.error(`logout : ${err}`);
  }
};