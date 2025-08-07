// simCardSlice.js
import { createSlice } from '@reduxjs/toolkit';

const simCardSlice = createSlice({
    name: 'simCards',
    initialState: {
        count: 1, // Initial value
    },
    reducers: {
        increment: (state) => {
            if (state.count < 9) state.count += 1;
        },
        decrement: (state) => {
            if (state.count > 1) state.count -= 1;
        },
    },
});

export const { increment, decrement } = simCardSlice.actions;
export default simCardSlice.reducer;
