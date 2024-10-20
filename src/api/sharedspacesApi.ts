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
    console.dir(err);
  }
};

export const getTodosForSpace = async (
  url: string,
  year: string,
  month: string,
  ) => {
  try {
    const { data } = await axiosInstance
      .get(`/api/sharedspaces/${url}/todos?date=${year}-${month}`);
      
    return data;
  } catch (err: any) {
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
    console.dir(err);
  }
};

export const updateSharedspaceName = async (
  name: string,
  SharedspaceId: number,
) => {
  try {
    await axiosInstance
      .patch(`api/sharedspaces/name`, {
        name,
      }, {
        headers: {
          'sharedspace-id': SharedspaceId,
        },
      });
  } catch (err) {
    console.dir(err);
  }
};

export const deleteSharedspace = async (SharedspaceId: number) => {
  try {
    await axiosInstance
      .delete(`/api/sharedspaces`, {
          headers: {
            'sharedspace-id': SharedspaceId,
          },
        }
      );
  } catch (err) {
    console.dir(err);
  }
};