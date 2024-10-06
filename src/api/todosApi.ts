import { axiosInstance } from "./axiosInstance";

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
    console.dir(err);
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
    console.dir(err);
  }
};

export const deleteTodo = async (todoId: number) => {
  try {
    await axiosInstance.delete(`/api/todos?ti=${todoId}`);
  } catch (err: any) {
    console.dir(err);
  }
};

export const searchTodos = async (
  url: string,
  query: string,
  offset: number = 1,
  limit: number = 10,
) => {
  try {
    const { data } = await axiosInstance.get(
      `/api/sharedspaces/${url}/todos/search?query=${query}&offset=${offset}&limit=${limit}`
    );
    
    return data;
  } catch (err: any) {
    console.dir(err);
  }
};