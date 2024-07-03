import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";

const now = dayjs();

const getDates = (now: Dayjs) => {
  const result = [];
  const firstDay = now.date(1).day();
  const lastDate = now.daysInMonth();

  for (let i=0; i<=firstDay; i++) {
    result.push(' ');
  }

  for (let i=1; i<=lastDate; i++) {
    result.push(i);
  }

  return result;
};

const initialState = {
  calendarTime: now.format('YYYY-MM-DD'),
  currentYear: now.year(),
  currentMonth: now.month(),
  currentDate: now.date(),
  currentDay: now.day(),
  dates: getDates(now),
};

export const calendarTimeSlice = createSlice({
  name: 'todoTime',
  initialState,
  reducers: {
    setCalendarTime: (state, actions: PayloadAction<number>) => {
      const currentTime = dayjs().month(actions.payload);

      state.calendarTime = currentTime.format('YYYY-MM-DD');
      state.currentYear = currentTime.year();
      state.currentMonth = currentTime.month();
      state.currentDate = currentTime.date();
      state.currentDay = currentTime.day();
      state.dates = getDates(currentTime);
    },
  },
});

export const {
  setCalendarTime,
} = calendarTimeSlice.actions;
export default calendarTimeSlice.reducer;