import { axiosInstance } from "./axiosInstance";

export const createJoinRequest = async (
  url: string,
  RoleName: string,
) => {
  try {
    await axiosInstance
      .post(`api/sharedspaces/${url}/joinrequest`, {
        RoleName,
      });
  } catch (err) {
    return Promise.reject(err);
  }
};