import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: '',
};

export const searchUsersSlice = createSlice({
  name: 'searchUsers',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<{ query: string }>) {
      if (typeof action.payload?.query !== 'string') return;

      const query = action.payload.query.trim();

      if (!query) {
        return;
      }

      state.query = query;
    },
    clearQuery(state) {
      state.query = '';
    },
  },
});

export const {
  setQuery,
  clearQuery,
} = searchUsersSlice.actions;
export default searchUsersSlice.reducer;