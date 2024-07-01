import { configureStore } from "@reduxjs/toolkit";
import calendarTimeReducer from 'Features/calendarTimeSlice';
import todoTimeReducer from 'Features/todoTimeSlice';

export const reduxStore = configureStore({
  reducer: {
    calendarTime: calendarTimeReducer,
    todoTime: todoTimeReducer,
  },
})

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;