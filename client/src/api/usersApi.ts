import { axiosInstance } from "./axiosInstance";

export const getUser = async () => {
  try {
    const { data } = await axiosInstance
      .get('/api/users');
    
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export const getOneByEmail = async (email: string) => {
  try {
    const { data } = await axiosInstance.get(`/api/users/email?e=${email}`);

    if (data) {
      return true;
    }

    return false;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export const createUser = async (email: string, password: string) => {
  try {
    await axiosInstance.post('/api/users', { email, password });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export const login = async (email: string, password: string) => {
  try {
    await axiosInstance.post('/api/auth/login', { username: email, password });
    
    return true;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post('api/auth/logout');
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};