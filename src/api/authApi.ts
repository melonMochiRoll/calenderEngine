import { axiosInstance } from "./axiosInstance";

export const login = async (email: string, password: string) => {
  try {
    await axiosInstance
      .post('/api/auth/login', { username: email, password });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const logout = async () => {
  try {
    await axiosInstance
      .post('api/auth/logout');
  } catch (err) {
    return Promise.reject(err);
  }
};

export const loginOAuth2Google = async () => {
  try {
    const { data: url } = await axiosInstance
      .get(`/api/auth/login/oauth2/google`);

    return url;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const loginOAuth2Naver = async () => {
  try {
    const { data: url } = await axiosInstance
      .get(`/api/auth/login/oauth2/naver`);

    return url;
  } catch (err) {
    return Promise.reject(err);
  }
};