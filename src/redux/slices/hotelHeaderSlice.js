// src/redux/slices/hotelHeaderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalState: false,
  modalIsOpen: false,
  overviewData: null,
};

const hotelHeaderSlice = createSlice({
  name: 'hotelHeader',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.overviewData = action.payload.item;
      state.modalState = action.payload.modal;
      state.modalIsOpen = true;
    },
    closeModal: (state) => {
      state.modalIsOpen = false;
    },
  },
});

export const { openModal, closeModal } = hotelHeaderSlice.actions;
export default hotelHeaderSlice.reducer;
