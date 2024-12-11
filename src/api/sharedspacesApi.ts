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

export const updateSharedspaceOwner = async (
  url: string,
  OwnerId: number,
  newOwnerId: number,
) => {
  try {
    await axiosInstance
      .patch(`api/sharedspaces/${url}/owner`, {
        OwnerId,
        newOwnerId
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
  RoleName: TSharedspaceMembersRoles,
) => {
  try {
    await axiosInstance
      .post(`/api/sharedspaces/${url}/members`, {
        UserId,
        RoleName,
      });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateSharedspaceMembers = async (
  url: string,
  UserId: number,
  RoleName: TSharedspaceMembersRoles,
) => {
  try {
    await axiosInstance
      .patch(`/api/sharedspaces/${url}/members`, {
        UserId,
        RoleName,
      })
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateSharedspacePrivate = async (
  url: string,
  Private: boolean,
) => {
  try {
    await axiosInstance
      .patch(`/api/sharedspaces/${url}/private`, {
        private: Private,
      });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteSharedspaceMembers = async (
  url: string,
  UserId: number,
) => {
  try {
    await axiosInstance
      .delete(`/api/sharedspaces/${url}/members/${UserId}`);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getSharedspaceChats = async (
  url: string | undefined,
  offset: number,
  limit: number = 30,
) => {
  if (!url) return;

  try {
    const { data } = await axiosInstance
      .get(`/api/sharedspaces/${url}/chats`, {
        params: {
          offset,
          limit,
        }
      });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const createSharedspaceChats = async (
  url: string | undefined,
  content: string,
) => {
  if (!url || !content) return;

  try {
    await axiosInstance
      .post(`/api/sharedspaces/${url}/chats`, {
        content,
      });
  } catch (err) {
    return Promise.reject(err);
  }
};