import { configureStore } from "@reduxjs/toolkit";
import modalReducer from 'Features/modalSlice';
import calendarTimeReducer from 'Features/calendarTimeSlice';
import todoTimeReducer from 'Features/todoTimeSlice';
import searchUsersReducer from 'Features/searchUsersSlice';
import subscribedspaceFilterReducer from 'Features/subscribedspacesFilterSlice';

export const reduxStore = configureStore({
  reducer: {
    modal: modalReducer,
    calendarTime: calendarTimeReducer,
    todoTime: todoTimeReducer,
    searchUsers: searchUsersReducer,
    subscribedspaceFilter: subscribedspaceFilterReducer,
  },
})

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;