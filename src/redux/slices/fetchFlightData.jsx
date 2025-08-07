import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  flight: {
    data: [],
    isLoaded: false,
    error: null,
  },
  price: {
    data: [],
    isLoaded: false,
    error: null,
  },
};
const createFetchRequest = (name) =>
  createAsyncThunk(`flight/fetch${name}Data`, async ({ body, url }) => {
    try {
      const response = await axios.post(url, body, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  });

export const fetchFlightData = createFetchRequest('Flight');
export const fetchPriceData = createFetchRequest('Price');

const flightSearchSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const setLoadedAndError = (state, action, sliceName) => {
      state[sliceName].isLoaded = true;
      state[sliceName].error = action.error.message;
    };

    builder
      .addCase(fetchFlightData.pending, (state) => {
        state.flight.isLoaded = false;
        state.flight.error = null;
      })
      .addCase(fetchFlightData.fulfilled, (state, action) => {
        state.flight.isLoaded = true;
        state.flight.data = action.payload;
      })
      .addCase(fetchFlightData.rejected, (state, action) => {
        setLoadedAndError(state, action, 'flight');
      })
      .addCase(fetchPriceData.pending, (state) => {
        state.price.isLoaded = false;
        state.price.error = null;
      })
      .addCase(fetchPriceData.fulfilled, (state, action) => {
        state.price.isLoaded = true;
        state.price.data = action.payload;
      })
      .addCase(fetchPriceData.rejected, (state, action) => {
        setLoadedAndError(state, action, 'price');
      });
  },
});
export default flightSearchSlice.reducer;
