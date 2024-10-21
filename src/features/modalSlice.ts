import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ModalName, TModalName } from "Components/modal/RenderModal";

type TModalState = {
  modalName: TModalName,
};

const initialState: TModalState = {
  modalName: ModalName.CLOSE,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<TModalName>) => {
      state.modalName = action.payload;
    },
    closeModal: (state) => {
      state.modalName = ModalName.CLOSE;
    },
  },
});

export const {
  openModal,
  closeModal,
} = modalSlice.actions;
export default modalSlice.reducer;