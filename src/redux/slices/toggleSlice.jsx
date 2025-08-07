import { createSlice } from '@reduxjs/toolkit';

const toggleSlice = createSlice({
  name: 'option',
  initialState: {
    value: localStorage.getItem('toggleValue') === 'false' ? false : true,
  },
  reducers: {
    toggleOption: (state) => {
      state.value = !state.value;
      localStorage.setItem('toggleValue', state.value);
    },
  },
});
export const { toggleOption } = toggleSlice.actions;
export default toggleSlice.reducer;
