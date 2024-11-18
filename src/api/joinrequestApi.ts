import { axiosInstance } from "./axiosInstance";

export const getMyJoinRequest = async (
  url: string,
) => {
  try {
    const { data } = await axiosInstance
      .get(`api/sharedspaces/${url}/joinrequest`);

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const createJoinRequest = async (
  url: string,
  RoleName: string,
  message: string,
) => {
  try {
    await axiosInstance
      .post(`api/sharedspaces/${url}/joinrequest`, {
        RoleName,
        message,
      });
  } catch (err) {
    return Promise.reject(err);
  }
};