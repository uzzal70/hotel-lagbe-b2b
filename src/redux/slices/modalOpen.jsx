import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modifyModal: false,
  creditModal: false,
  filterModal: false,
  hotelDateOpen: false,
  checkInModal: false,
  checkOutModal: false,
  // passengerModalOpen: false,
  // Add other modal states here
};

const modalOpen = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      const { modalName } = action.payload;
      state[modalName] = !state[modalName];
    },

    toggleCreditModal: (state, action) => {
      const { modalName } = action.payload;
      state[modalName] = !state[modalName];
    },
    closeCreditModal: (state, action) => {
      const { modalName } = action.payload;
      state[modalName] = false;
    },
    toggleHotelDateOpen: (state, action) => {
      const { modalName } = action.payload;
      state[modalName] = !state[modalName];
    },
    openModal: (state, action) => {
      const { modalName } = action.payload;
      state[modalName] = true;
    },
    closeModal: (state, action) => {
      const { modalName } = action.payload;
      state[modalName] = false;
    },
    checkInOpen: (state, action) => {
      state.checkInModal = action.payload === 'checkInModal';
      state.checkOutModal = action.payload === 'checkOutModal';
    },
    checkOutClose: (state) => {
      state.checkInModal = false;
      state.checkOutModal = false;
    },
  },
});

export const {
  toggleModal,
  toggleCreditModal,
  closeCreditModal,
  toggleHotelDateOpen,
  openModal,
  closeModal,
  checkInOpen,
  checkOutClose,
} = modalOpen.actions;
export default modalOpen.reducer;
