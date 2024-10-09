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
    console.dir(err);
  }
};

export const createSharedspace = async (UserId: number) => {
  try {
    await axiosInstance
      .post(`api/sharedspaces`, {
        OwnerId: UserId,
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