import { TSharedspaceMembersRoles } from "Typings/types";
import { axiosInstance } from "./axiosInstance";

export const getSharedspace = async (url: string) => {
  try {
    const { data } = await axiosInstance
      .get(`/api/sharedspaces/${url}/view`);

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getSubscribedspaces = async (filter: string) => {
  try {
    const { data } = await axiosInstance
      .get(`/api/sharedspaces/subscribed?filter=${filter}`);

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const createSharedspace = async (UserId: number) => {
  try {
    const { data } = await axiosInstance
      .post(`api/sharedspaces`, {
        OwnerId: UserId,
      });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateSharedspaceName = async (
  name: string,
  url: string,
) => {
  try {
    await axiosInstance
      .patch(`api/sharedspaces/${url}/name`, {
        name,
      });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteSharedspace = async (url: string) => {
  try {
    await axiosInstance
      .delete(`/api/sharedspaces/${url}`);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const createSharedspaceMembers = async (
  url: string,
  UserId: number,
  role: TSharedspaceMembersRoles,
) => {
  try {
    await axiosInstance
      .post(`/api/sharedspaces/${url}/members`, {
        UserId,
        role,
      });
  } catch (err) {
    return Promise.reject(err);
  }
};