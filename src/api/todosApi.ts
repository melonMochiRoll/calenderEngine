import { axiosInstance } from "./axiosInstance";

export const getTodos = async (
  date: string,
  ) => {
  try {
    const { data } = await axiosInstance
      .get(`/api/todos?date=${date}`);

    return data;
  } catch (err: any) {
    console.error(err);
  }
};

export const getCurrentMonthTodosList = async (
  date: string,
  ) => {
  try {
    const { data } = await axiosInstance
      .get(`/api/todos/list?date=${date}`);
      
    return data;
  } catch (err: any) {
    console.error(err);
  }
};

export const createDateTodos = async (
  contents: string,
  date: string,
  ) => {
  try {
    await axiosInstance
      .post(`api/todos`, { contents, date });
  } catch (err: any) {
    console.error(err);
  }
};

export const updateDateTodos = async (
  todosId: number,
  contents: string,
  isComplete: boolean,
  date: string,
  ) => {
  try {
    await axiosInstance
      .put(`/api/todos`, { todosId, contents, isComplete, date });
  } catch (err: any) {
    console.error(err);
  }
};

export const deleteDateTodos = async (
  todosId: number,
  date: string,
  ) => {
  try {
    await axiosInstance
      .delete(`/api/todos?ti=${todosId}&date=${date}`);
  } catch (err: any) {
    console.error(err);
  }
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
    console.error(err);
  }
};