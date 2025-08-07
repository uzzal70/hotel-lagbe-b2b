import { createSlice } from '@reduxjs/toolkit';

const createPassenger = (
  isLeadGuest = false,
  type = 'Adult',
  childAges,
  numberOfAdults,
  numberOfChilds
) => ({
  title: '',
  firstName: '',
  lastName: '',
  isLeadGuest,
  type,
  email: '',
  isdCode: '880',
  contactNumber: '',
  panCardNumber: null,
  passPortNumber: '',
  passPortExpiry: '',
  numberOfAdults,
  numberOfChilds,
  age: type === 'Child' ? childAges : null,
});

const hotelBookingPassengerSlice = createSlice({
  name: 'hotelPassengers',
  initialState: [],
  reducers: {
    initializePassengers: (state, action) => {
      // console.log(action.payload);

      return action.payload.map((item, roomIndex) => {
        console.log('item', item);
        const numberOfAdults = parseInt(item.numberOfAdults) || 0;
        const numberOfChilds = parseInt(item.numberOfChilds) || 0;

        let passengers = [];

        if (item?.policy?.allGuestsInfoRequired) {
          // Add adult passengers
          for (let i = 0; i < numberOfAdults; i++) {
            passengers.push(createPassenger(i === 0, 'Adult', item?.childAges));
          }

          // Add child passengers
          for (let i = 0; i < numberOfChilds; i++) {
            passengers.push(createPassenger(false, 'Child', item?.childAges));
          }
        } else {
          // Add only one passenger if guest info not required
          passengers.push(createPassenger(false, 'Adult', item?.childAges));
        }
        return {
          roomNumber: roomIndex + 1,
          numberOfAdults: parseInt(item.numberOfAdults),
          numberOfChilds: parseInt(item.numberOfChilds),
          roomName: item?.roomName,
          childAges: item?.childAges,
          IsPassportMandatory: item?.IsPassportMandatory,
          IsPANMandatory: item?.IsPANMandatory,
          allGuestsInfoRequired: item?.policy?.allGuestsInfoRequired || false,
          passengers,
        };
      });
    },

    updatePassenger: (state, action) => {
      const { roomIndex, passengerIndex, name, value } = action.payload;
      state[roomIndex].passengers[passengerIndex][name] = value;
    },

    addPassenger: (state, action) => {
      const { roomIndex, type, indexofChild } = action.payload;
      const newPassenger = createPassenger(false, type, indexofChild);
      state[roomIndex].passengers.push(newPassenger);
    },
    removePassenger: (state, action) => {
      const { roomIndex, passengerIndex } = action.payload;
      state[roomIndex].passengers.splice(passengerIndex, 1);
    },
  },
});

export const {
  initializePassengers,
  updatePassenger,
  addPassenger,
  removePassenger,
} = hotelBookingPassengerSlice.actions;
export default hotelBookingPassengerSlice.reducer;
