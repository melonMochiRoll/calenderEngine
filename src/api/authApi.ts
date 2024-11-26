import { axiosInstance } from "./axiosInstance";

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