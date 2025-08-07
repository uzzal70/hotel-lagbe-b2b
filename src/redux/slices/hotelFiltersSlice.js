// redux/hotelFiltersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hotelName: '',
  ratings: [],
  relevance: false,
  finalRate: '',
  freeBreakfast: false,
  isRefundable: false,
  subLocationIds: null,
  facilities: [],
  type: [],
  tags: null,
  reviewRatings: null,
  priceRange: {
    min: 0,
    max: 0,
  },
};

const hotelFiltersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      const newFilters = action.payload;
      const isSame = JSON.stringify(state) === JSON.stringify(newFilters);
      return isSame ? state : newFilters;
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = hotelFiltersSlice.actions;
export default hotelFiltersSlice.reducer;
