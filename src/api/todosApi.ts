import { axiosInstance } from "./axiosInstance";

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
    console.error(err);
  }
};

export const createTodo = async (
  description: string,
  date: string,
  startTime: string,
  endTime: string,
  AuthorId: number,
  ) => {
  try {
    await axiosInstance
      .post(`/api/todos`, {
        description,
        date,
        startTime,
        endTime,
        AuthorId,
      });
  } catch (err: any) {
    console.error(err);
  }
};

export const updateTodo = async (
  id: number,
  description: string,
  date: string,
  startTime: string,
  endTime: string,
  EditorId: number,
  SharedspaceId: number,
  ) => {
  try {
    await axiosInstance
      .put(`/api/todos`, {
        id,
        description,
        date,
        startTime,
        endTime,
        EditorId,
        SharedspaceId,
      });
  } catch (err: any) {
    console.error(err);
  }
};

export const deleteTodo = async (
  todosId: number,
  date: string,
  ) => {
  // try {
  //   await axiosInstance
  //     .delete(`/api/todos?ti=${todosId}&date=${date}`);
  // } catch (err: any) {
  //   console.error(err);
  // }
};

export const searchTodos = async (
  query: string,
  offset: number = 1,
  limit: number = 10,
) => {
  try {
    const url = `/api/todos/search?query=${query}&offset=${offset}&limit=${limit}`;
    const { data } = await axiosInstance.get(url);
    
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};