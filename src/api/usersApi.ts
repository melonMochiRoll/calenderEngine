import { axiosInstance } from "./axiosInstance";

export const getUser = async () => {
  try {
    const { data } = await axiosInstance
      .get('/api/users');
    
    return data;
  } catch (err: any) {
    console.error(err);
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
    console.error(err);
  }
};

export const createUser = async (email: string, password: string) => {
  try {
    await axiosInstance
      .post('/api/users', { email, password });
  } catch (err: any) {
    throw new Error();
  }
};

export const login = async (email: string, password: string) => {
  try {
    await axiosInstance
      .post('/api/auth/login', { username: email, password });
  } catch (err: any) {
    throw new Error();
  }
};

export const logout = async () => {
  try {
    await axiosInstance
      .post('api/auth/logout');
  } catch (err: any) {
    console.error(err);
  }
};