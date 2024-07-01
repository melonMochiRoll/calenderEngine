import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";

const initialState = {
  calendarTime: dayjs(),
};

export const calendarTimeSlice = createSlice({
  name: 'todoTime',
  initialState,
  reducers: {
    setCalendarTime: (state, actions: PayloadAction<Dayjs>) => {
      state.calendarTime = actions.payload;
    },
  },
});

export const {
  setCalendarTime,
} = calendarTimeSlice.actions;
export default calendarTimeSlice.reducer;