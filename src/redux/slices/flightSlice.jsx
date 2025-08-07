// flightSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const flightSlice = createSlice({
  name: 'flights',
  initialState: {
    flights: [],
    filteredFlights: [],

    uniqueCarriers: [],
    selectedCarriers: [],

    uniqueLayoverAirports: [],
    selectedLayover: [],
  },
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;

      // Check if either selectedCarriers or selectedLayover arrays have items
      if (
        state.selectedCarriers.length > 0 ||
        state.selectedLayover.length > 0
      ) {
        // If either array has items, apply both carrier and layover filtering
        state.filteredFlights = action.payload.filter((flight) => {
          // Filter based on selected carriers
          const carrierFilter = state.selectedCarriers.includes(
            flight.marketingCarrier
          );

          // Filter based on selected layovers
          const segments = flight.segments[0];
          const departureAirportCode =
            (segments.length === 2 && segments[1].departureAirportCode) ||
            (segments.length > 2 && segments[2].departureAirportCode);
          const layoverFilter =
            state.selectedLayover.includes(departureAirportCode);

          // Return true if both filters match, indicating the flight should be included in the filteredFlights array
          return carrierFilter && layoverFilter;
        });
      } else {
        // If no filters are applied, set filteredFlights to all flights
        state.filteredFlights = action.payload;
      }
    },
    filterByCarriers: (state) => {
      // If no layover filter is applied, simply filter by carriers
      if (state.selectedLayover.length === 0) {
        state.filteredFlights = state.flights.filter((flight) =>
          state.selectedCarriers.includes(flight.marketingCarrier)
        );
      } else {
        // If layover filter is applied, combine with existing layover filtering
        state.filteredFlights = state.filteredFlights.filter((flight) =>
          state.selectedCarriers.includes(flight.marketingCarrier)
        );
      }
    },

    filterByLayover: (state) => {
      // If no carrier filter is applied, simply filter by layovers
      if (state.selectedCarriers.length === 0) {
        state.filteredFlights = state.flights.filter((flight) => {
          const segments = flight.segments[0];
          const departureAirportCode =
            (segments.length === 2 && segments[1].departureAirportCode) ||
            (segments.length > 2 && segments[2].departureAirportCode);
          return state.selectedLayover.includes(departureAirportCode);
        });
      } else {
        // If carrier filter is applied, combine with existing carrier filtering
        state.filteredFlights = state.filteredFlights.filter((flight) => {
          const segments = flight.segments[0];
          const departureAirportCode =
            (segments.length === 2 && segments[1].departureAirportCode) ||
            (segments.length > 2 && segments[2].departureAirportCode);
          return state.selectedLayover.includes(departureAirportCode);
        });
      }
    },
    findUniqueCarriers: (state) => {
      state.uniqueCarriers = Array.from(
        new Set(
          state.flights
            .filter((item) => item.marketingCarrier)
            .map((item) => item.marketingCarrier)
        )
      );
    },
    selectCarrier: (state, action) => {
      state.selectedCarriers.push(action.payload);
    },
    deselectCarrier: (state, action) => {
      state.selectedCarriers = state.selectedCarriers.filter(
        (carrier) => carrier !== action.payload
      );
    },
    // end career

    findUniqueLayoverAirports: (state, action) => {
      state.uniqueLayoverAirports = action.payload;
    },

    selectLayover: (state, action) => {
      state.selectedLayover.push(action.payload);
    },
    deselectLayover: (state, action) => {
      state.selectedLayover = state.selectedLayover.filter(
        (code) => code !== action.payload
      );
    },
  },
});

export const {
  setFlights,
  filterByCarriers,
  filterByLayover,
  findUniqueCarriers,
  selectCarrier,
  deselectCarrier,
  findUniqueLayoverAirports,
  selectLayover,
  deselectLayover,
} = flightSlice.actions;

export const fetchUniqueLayoverAirports = () => async (dispatch, getState) => {
  const state = getState();
  const data = state.flights.flights; // Assuming you have flight data stored in the state
  const uniqueLayover = Array.from(
    new Set(
      data
        ?.filter((item) => item.segments[0].length > 1)
        .map((item) => ({
          name:
            item.segments[0].length > 2
              ? item.segments[0][2].departureAirportName
              : item.segments[0][1].departureAirportName,
          code:
            item.segments[0].length > 2
              ? item.segments[0][2].departureAirportCode
              : item.segments[0][1].departureAirportCode,
        }))
        .map((entry) => JSON.stringify(entry))
    )
  ).map((str) => JSON.parse(str));

  dispatch(findUniqueLayoverAirports(uniqueLayover));
};

export default flightSlice.reducer;
