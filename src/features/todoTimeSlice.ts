import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoTime: '',
};

export const todoTimeSlice = createSlice({
  name: 'todoTime',
  initialState,
  reducers: {
    setTodoTime: (state, actions: PayloadAction<string>) => {
      state.todoTime = actions.payload;
    },
  },
});

export const {
  setTodoTime,
} = todoTimeSlice.actions;
export default todoTimeSlice.reducer;