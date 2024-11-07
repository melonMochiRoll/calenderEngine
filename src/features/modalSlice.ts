import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ModalName, NestedModalName, TModalName, TNestedModalName } from "Typings/types";

type TModalState = {
  modalName: TModalName,
  nestedModalName: TNestedModalName,
};

const initialState: TModalState = {
  modalName: ModalName.CLOSE,
  nestedModalName: NestedModalName.CLOSE,
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
    openNestedModal: (state, action: PayloadAction<TNestedModalName>) => {
      state.nestedModalName = action.payload;
    },
    closeNestedModal: (state) => {
      state.nestedModalName = NestedModalName.CLOSE;
    },
  },
});

export const {
  openModal,
  closeModal,
  openNestedModal,
  closeNestedModal,
} = modalSlice.actions;
export default modalSlice.reducer;