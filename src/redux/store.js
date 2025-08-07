import { configureStore } from '@reduxjs/toolkit';
import flightSearchSlice from './slices/fetchFlightData';
import passengerReducer from './slices/passengerCountSlice';
import { apiSlice } from './slices/apiSlice';
import toggleReducer from './slices/toggleSlice';
import searchDatepickerSlice from './slices/searchDatepicker';
import flightReducer from './slices/flightSlice';
import modalReducer from './slices/modalOpen';
import simCardReducer from './slices/simCardSlice';
import simFilterReducer from './slices/simFilterSlice';
import hotelSearchReducer from './slices/hotelSearchSlice';
import hotelFiltersReducer from './slices/hotelFiltersSlice';
import hotelBookingPassengerReducer from './slices/hotelBookingPassengerSlice';
import roomFilterReducer from './slices/roomFilterSlice';
import roomSelectionReducer from './slices/roomSelectionSlice';
import hotelHeaderReducer from './slices/hotelHeaderSlice';
import gloablReducer from './slices/globalSlice';
// import authReducer from './slices/auth/authSlice';

import roomSelectionMiddleware from './middleware/roomSelectionMiddleware';
import { flightApiSlice } from './slices/flight/flightApiSlice';
import { hotelApiSlice } from './slices/hotel/hotelApiSlice';
import { chatApiSlice } from './slices/chat/chatApiSlice';
// import { baseApi } from './slices/hotel/baseApi';

const store = configureStore({
  reducer: {
    // RTK Query APIs
    [apiSlice.reducerPath]: apiSlice.reducer,
    [flightApiSlice.reducerPath]: flightApiSlice.reducer,
    [chatApiSlice.reducerPath]: chatApiSlice.reducer,
    [hotelApiSlice.reducerPath]: hotelApiSlice.reducer,
    // [baseApi.reducerPath]: baseApi.reducer,
    // Other reducers
    // auth: authReducer,
    passengerCount: passengerReducer,
    flight: flightSearchSlice,
    toggleValue: toggleReducer,
    modalValue: modalReducer,
    datePicker: searchDatepickerSlice,
    flights: flightReducer,
    simCards: simCardReducer,
    simFilters: simFilterReducer,
    hotel: hotelSearchReducer,
    filters: hotelFiltersReducer,
    hotelPassengers: hotelBookingPassengerReducer,
    roomFilter: roomFilterReducer,
    roomSelection: roomSelectionReducer,
    hotelHeader: hotelHeaderReducer,
    global: gloablReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(apiSlice.middleware)
      .concat(flightApiSlice.middleware)
      .concat(chatApiSlice.middleware)
      .concat(hotelApiSlice.middleware)
      // .concat(baseApi.middleware)
      .concat(roomSelectionMiddleware),
});

export default store;
