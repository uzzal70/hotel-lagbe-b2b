import { createSlice } from '@reduxjs/toolkit';

const calculatePriceRange = (data) => {
  if (!data || data.length === 0) return [100, 5000]; // Default range

  const prices = data
    .map((item) => parseFloat(item.netPrice))
    .filter((price) => !isNaN(price) && price > 0); // Ensure positive prices

  const minPrice = Math.min(...prices); // Minimum fare
  const maxPrice = Math.max(...prices); // Maximum fare

  return [Math.floor(minPrice), Math.ceil(maxPrice)];
};

const initialState = {
  priceRange: [100, 5000], // Default, will be updated dynamically
  sortBy: 'cheapest',
  planSize: '',
  validity: '',
  voiceSms: false,
  uniquePlanSizes: '',
  uniqueValidities: '',
};

const simFilterSlice = createSlice({
  name: 'simFilters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    // resetFilters: () => {
    //   return {
    //     ...initialState,
    //     uniquePlanSizes: '',
    //     uniqueValidities: '',
    //   };
    // },
    setDynamicPriceRange: (state, action) => {
      state.priceRange = calculatePriceRange(action.payload);
    },
    // Set planSize and validity dynamically based on API response
    setDynamicFilters: (state, action) => {
      const { data } = action.payload;
      const uniquePlanSizes = Array.from(
        new Set(data.map((item) => item.data))
      ); // Unique plan sizes
      const uniqueValidities = Array.from(
        new Set(data.map((item) => item.day))
      ); // Unique validities

      state.uniquePlanSizes = uniquePlanSizes || []; // Set dynamic plan sizes
      state.uniqueValidities = uniqueValidities || []; // Set dynamic validities
    },
  },
});

export const {
  setFilters,
  resetFilters,
  setDynamicPriceRange,
  setDynamicFilters,
} = simFilterSlice.actions;
export default simFilterSlice.reducer;
