import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TTodo } from "Typings/types";

const initialState: { todo: TTodo | null } = {
  todo: null,
};

export const todoDetailSlice = createSlice({
  name: 'todoDetail',
  initialState,
  reducers: {
    setTodoDetail: (state, action: PayloadAction<TTodo>) => {
      state.todo = action.payload;
    },
  },
});

export const {
  setTodoDetail,
} = todoDetailSlice.actions;
export default todoDetailSlice.reducer;