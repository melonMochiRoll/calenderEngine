import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TJoinRequest } from "Typings/types";

const initialState: { request: TJoinRequest | null } = {
  request: null,
};

export const joinRequestDetailSlice = createSlice({
  name: 'joinRequestDetail',
  initialState,
  reducers: {
    setjoinRequestDetail: (state, action: PayloadAction<TJoinRequest>) => {
      state.request = action.payload;
    },
  },
});

export const {
  setjoinRequestDetail,
} = joinRequestDetailSlice.actions;
export default joinRequestDetailSlice.reducer;