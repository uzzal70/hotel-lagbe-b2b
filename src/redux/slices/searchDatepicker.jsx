import { createSlice } from '@reduxjs/toolkit';
import { addDays } from 'date-fns';

const modifyData = sessionStorage.getItem('commonState');
const data = JSON.parse(modifyData);

const initialState = {
  selectDepDate: modifyData
    ? new Date(data?.departDate).getTime()
    : addDays(new Date(), 1).getTime(),
  selectArrDate: modifyData
    ? new Date(data?.arrDate).getTime()
    : addDays(new Date(), 3).getTime(),
};

const searchDatepicker = createSlice({
  name: 'datePicker',
  initialState,
  reducers: {
    setStoreDepDate: (state, action) => {
      state.selectDepDate = action.payload.getTime();
    },
    setStoreArrDate: (state, action) => {
      state.selectArrDate = action.payload.getTime();
    },
  },
});

export const { setStoreDepDate, setStoreArrDate } = searchDatepicker.actions;
export default searchDatepicker.reducer;
