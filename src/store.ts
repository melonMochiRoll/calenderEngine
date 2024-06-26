import { configureStore } from "@reduxjs/toolkit";
import localTodosReducer from 'Features/localTodosSlice';

export const reduxStore = configureStore({
  reducer: {
    localTodos: localTodosReducer,
  },
})

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;