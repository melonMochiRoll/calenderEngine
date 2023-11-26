import { axiosInstance } from "./axiosInstance";

export const getCurrentMonthTodos = async (
  year: number,
  monthIndex: number,
  ) => {
  try {
    const { data } = await axiosInstance
      .get(`/api/todos?y=${year}&mi=${monthIndex}`);
      
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
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
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    console.error(err);
  }
};

export const updateDateTodos = async (
  todosId: number,
  contents: string,
  ) => {
  try {
    await axiosInstance
      .put(`/api/todos`, { todosId, contents });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    console.error(err);
  }
};

export const deleteDateTodos = async (
  todosId: number,
  ) => {
  try {
    await axiosInstance
      .delete(`/api/todos?ti=${todosId}`);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    console.error(err);
  }
};