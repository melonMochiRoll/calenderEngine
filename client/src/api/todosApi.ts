import { axiosInstance } from "./axiosInstance";

export const getCurrentMonthTodos = async (
  year: number,
  monthIndex: number,
  ) => {
  try {
    const { data } = await axiosInstance
      .get(`/api/todos?y=${year}&mi=${monthIndex}`);
      
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const createDateTodos = async (
  contents: string,
  date: string,
  year: number,
  monthIndex: number,
  ) => {
  try {
    await axiosInstance
      .post(`api/todos`, { contents, date, year, monthIndex });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const updateDateTodos = async (
  todosId: number,
  contents: string,
  year: number,
  monthIndex: number,
  ) => {
  try {
    await axiosInstance
      .put(`/api/todos`, { todosId, contents, year, monthIndex });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const deleteDateTodos = async (
  todosId: number,
  year: number,
  monthIndex: number,
  ) => {
  try {
    await axiosInstance
      .delete(`/api/todos?ti=${todosId}&y=${year}&mi=${monthIndex}`);
  } catch (err: any) {
    throw new Error(err);
  }
};