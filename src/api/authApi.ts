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

export const loginOAuth2Google = async (
  code: string,
  state: string,
  scope: string,
) => {
  try {
    await axiosInstance
      .post('/api/auth/login/oauth2/google', {
        code,
        state,
        scope,
      });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const loginOAuth2Naver = async (
  code: string,
  state: string,
) => {
  try {
    await axiosInstance
      .post(`/api/auth/login/oauth2/naver`, {
        code,
        state,
      });
  } catch (err) {
    return Promise.reject(err);
  }
};