import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EModalName } from "Components/common/RenderModal";

type TModalState = {
  modalName: EModalName,
};

const initialState: TModalState = {
  modalName: EModalName.Close,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<EModalName>) => {
      state.modalName = action.payload;
    },
    closeModal: (state) => {
      state.modalName = EModalName.Close;
    },
  },
});

export const {
  openModal,
  closeModal,
} = modalSlice.actions;
export default modalSlice.reducer;