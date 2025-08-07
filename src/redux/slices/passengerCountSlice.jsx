import { createSlice } from '@reduxjs/toolkit';

const modifyData = sessionStorage.getItem('commonState');
const data = JSON.parse(modifyData);
const initialState = {
  adultCount: 1,
  childCount: 0,
  infantCount: 0,
  classNames: data?.classNames || 'Y',
  childAge: [],
};
const ageList = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const passengerCountSlice = createSlice({
  name: 'passengerCount',
  initialState,
  reducers: {
    incrementAdult: (state) => {
      if (state.adultCount < 9 - state.childCount - state.infantCount) {
        state.adultCount += 1;
      }
    },
    decrementAdult: (state) => {
      if (state.adultCount > 1) {
        if (state.infantCount >= state.adultCount && state.infantCount > 1) {
          state.infantCount -= 1;
        }
        state.adultCount -= 1;
      }
    },
    incrementChild: (state) => {
      if (
        state.childCount < 9 - state.adultCount - state.infantCount &&
        state.childCount < 7
      ) {
        state.childCount += 1;
      }
    },
    decrementChild: (state) => {
      if (state.childCount > 0) {
        state.childCount -= 1;
      }
    },
    incrementInfant: (state) => {
      if (
        state.infantCount < 9 - state.adultCount - state.childCount &&
        state.infantCount < state.adultCount
      ) {
        state.infantCount += 1;
      }
    },
    decrementInfant: (state) => {
      if (state.infantCount > 0) {
        state.infantCount -= 1;
      }
    },
    flightClass: (state, action) => {
      state.classNames = action.payload;
    },
    updateSelectedAges: (state, action) => {
      state.childAge = action.payload;
    },
  },
});

export const {
  incrementAdult,
  decrementAdult,
  incrementChild,
  decrementChild,
  incrementInfant,
  decrementInfant,
  flightClass,
  updateSelectedAges,
} = passengerCountSlice.actions;

export default passengerCountSlice.reducer;
