import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  calendarTime: '',
};

export const calendarTimeSlice = createSlice({
  name: 'todoTime',
  initialState,
  reducers: {
    setCalendarTime: (state, actions: PayloadAction<string>) => {
      state.calendarTime = actions.payload;
    },
  },
});

export const {
  setCalendarTime,
} = calendarTimeSlice.actions;
export default calendarTimeSlice.reducer;