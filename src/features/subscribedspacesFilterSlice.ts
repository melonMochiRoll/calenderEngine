import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: '',
};

export const subscribedspacesFilterSlice = createSlice({
  name: 'subscribedspacesFilter',
  initialState,
  reducers: {
    setFilter: (state, actions: PayloadAction<{ filter: string }>) => {
      state.filter = actions.payload.filter;
    },
  },
});

export const {
  setFilter,
} = subscribedspacesFilterSlice.actions;
export default subscribedspacesFilterSlice.reducer;