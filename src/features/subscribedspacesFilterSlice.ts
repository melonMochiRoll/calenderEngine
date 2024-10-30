import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SubscribedspacesFilter, TSubscribedspacesFilter } from "Typings/types";

const initialState: { filter: TSubscribedspacesFilter } = {
  filter: SubscribedspacesFilter.ALL,
};

export const subscribedspacesFilterSlice = createSlice({
  name: 'subscribedspacesFilter',
  initialState,
  reducers: {
    setFilter: (state, actions: PayloadAction<{ filter: TSubscribedspacesFilter }>) => {
      state.filter = actions.payload.filter;
    },
  },
});

export const {
  setFilter,
} = subscribedspacesFilterSlice.actions;
export default subscribedspacesFilterSlice.reducer;