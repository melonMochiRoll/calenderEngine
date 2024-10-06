import { axiosInstance } from "./axiosInstance";

export const getSubscribedspaces = async (filter: string) => {
  try {
    const { data } = await axiosInstance
      .get(`/api/sharedspaces?filter=${filter}`);

    return data;
  } catch (err) {
    console.dir(err);
  }
};