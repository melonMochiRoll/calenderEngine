import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: '',
};

export const searchTodosSlice = createSlice({
  name: 'searchTodos',
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
} = searchTodosSlice.actions;
export default searchTodosSlice.reducer;