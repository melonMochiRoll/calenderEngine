import { axiosInstance } from "./axiosInstance";

export const getUser = async () => {
  try {
    const { data } = await axiosInstance
      .get('/api/users');
    
    return data;
  } catch (err) {
    console.error(err);
    return err;
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
    return err;
  }
};