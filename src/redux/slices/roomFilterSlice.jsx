// src/redux/slices/roomFilterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedRoomNames: [],
  selectedBoardBasis: [],
  filterRefundable: false,
  filterFreeCancel: false,
  hasBreakfast: false,
  minFinalRate: 0,
  refundableCount: 0,
  freeCancelCount: 0,
  breakfastItemsCount: 0,
  articleNum: 20,
  loadingMore: false,
};

const roomFilterSlice = createSlice({
  name: 'roomFilter',
  initialState,
  reducers: {
    setSelectedRoomNames: (state, action) => {
      state.selectedRoomNames = action.payload;
    },
    setSelectedBoardBasis: (state, action) => {
      state.selectedBoardBasis = action.payload;
    },
    setMinFinalRate: (state, action) => {
      state.minFinalRate = action.payload;
    },
    setRefundableCount: (state, action) => {
      state.refundableCount = action.payload;
    },
    setBreakfastCount: (state, action) => {
      state.breakfastItemsCount = action.payload;
    },
    toggleRefundable: (state) => {
      state.filterRefundable = !state.filterRefundable;
    },
    toggleABreakfast: (state) => {
      state.hasBreakfast = !state.hasBreakfast;
    },
    setFreeCancelCount: (state, action) => {
      state.freeCancelCount = action.payload;
    },
    toggleFreeCancel: (state) => {
      state.filterFreeCancel = !state.filterFreeCancel;
    },
    incrementArticleNum: (state) => {
      state.articleNum += 20;
    },
    setLoadingMore: (state, action) => {
      state.loadingMore = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setSelectedRoomNames,
  setSelectedBoardBasis,
  setMinFinalRate,
  setRefundableCount,
  toggleRefundable,
  setFreeCancelCount,
  toggleFreeCancel,
  incrementArticleNum,
  setLoadingMore,
  resetFilters,
  toggleABreakfast,
  setBreakfastCount,
} = roomFilterSlice.actions;

export default roomFilterSlice.reducer;
