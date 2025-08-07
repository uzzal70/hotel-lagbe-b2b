import { createSlice } from '@reduxjs/toolkit';
import { addDays } from 'date-fns';

const initialState = {
  filtermodal: {
    right: false,
  },
  Moefimodal: false,
  selectedOption: null,
  nationality: {
    label: 'Bangladesh',
    value: 'BD',
  },
  rooms: [{ id: 1, adults: 2, children: 0, childrenAges: [] }],
  dateRange: [
    {
      startDate: '',
      endDate: '',
      key: 'selection',
    },
  ],
};

const hotelSearchSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setSelectedOption(state, action) {
      state.selectedOption = action.payload;
    },

    setNationality(state, action) {
      state.nationality = action.payload;
    },
    setRooms(state, action) {
      state.rooms = action.payload;
    },
    setDateRange(state, action) {
      state.dateRange = action.payload;
    },
    setHotelFilterModal(state, action) {
      state.filtermodal = action.payload;
    },
  },
});

export const {
  setSelectedOption,
  setNationality,
  setRooms,
  setDateRange,
  setHotelFilterModal,
} = hotelSearchSlice.actions;
export default hotelSearchSlice.reducer;
