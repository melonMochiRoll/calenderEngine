import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  path: '',
};

export const imageViewerSlice = createSlice({
  name: 'imageViewer',
  initialState,
  reducers: {
    setImagePath: (state, action: PayloadAction<string>) => {
      state.path = action.payload;
    },
  },
});

export const {
  setImagePath,
} = imageViewerSlice.actions;
export default imageViewerSlice.reducer;