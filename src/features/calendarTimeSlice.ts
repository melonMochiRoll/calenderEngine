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
    setCalendarTime: (state, actions: PayloadAction<string>) => {
      const currentTime = dayjs(actions.payload);

      state.calendarTime = actions.payload;
      state.currentYear = currentTime.year();
      state.currentMonth = currentTime.month();
      state.currentDate = currentTime.date();
      state.currentDay = currentTime.day();
      state.dates = getDates(currentTime);     
    },
    prevMonth: (state) => {
      const currentTime = dayjs(state.calendarTime);
      const prevTime = currentTime.month(currentTime.month() - 1);

      state.calendarTime = prevTime.format('YYYY-MM-DD');
      state.currentYear = prevTime.year();
      state.currentMonth = prevTime.month();
      state.currentDate = prevTime.date();
      state.currentDay = prevTime.day();
      state.dates = getDates(prevTime);
    },
    nextMonth: (state) => {
      const currentTime = dayjs(state.calendarTime);
      const nextTime = currentTime.month(currentTime.month() + 1);

      state.calendarTime = nextTime.format('YYYY-MM-DD');
      state.currentYear = nextTime.year();
      state.currentMonth = nextTime.month();
      state.currentDate = nextTime.date();
      state.currentDay = nextTime.day();
      state.dates = getDates(nextTime);
    },
  },
});

export const {
  setCalendarTime,
  prevMonth,
  nextMonth,
} = calendarTimeSlice.actions;
export default calendarTimeSlice.reducer;