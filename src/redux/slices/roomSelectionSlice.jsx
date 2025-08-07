import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseUrlHotel } from '../../../baseurl';
import { toast } from 'react-toastify';
import getAuthToken from '../../components/Common/getAuthToken';

const savedRooms = JSON.parse(localStorage.getItem('selectedRooms') || '[]');

export const fetchRoomRates = createAsyncThunk(
  'roomData/fetchRoomRates',
  async ({ searchBody, endpoint = 'getRoomRates' }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const res = await fetch(`${baseUrlHotel}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(searchBody),
      });

      const data = await res.json();

      // Check for errors in the response
      if (!res.ok || data?.errors?.length > 0) {
        const errorMessage = data?.errors?.[0] || 'Internal Server Error';
        return rejectWithValue(errorMessage);
      }

      const allRooms = data?.results?.flatMap((r) => r?.data || []);
      const allRoomRates = allRooms?.flatMap(
        (roomData) => roomData?.roomRate || []
      );
      const firstRate = allRoomRates?.[0];

      // If no room rates are found, reject with an error
      if (!firstRate) {
        return rejectWithValue('No room rates found.');
      }
      return { data };
    } catch (error) {
      return rejectWithValue(error.message || 'Fetch error');
    }
  }
);

const initialState = {
  selectedRooms: savedRooms || [],
  isSelectedMap: {}, // key: string -> boolean
  activeRecommendationId: null,
  loading: true,
  error: null,
  roomData: null, // ✅ added missing property
};

const roomSelectionSlice = createSlice({
  name: 'roomSelection',
  initialState,
  reducers: {
    toggleRoomSelection: (state, action) => {
      const { room, originalIndex } = action.payload;
      const roomKey = `${room.stdRoomName}-${room.recommendationId}-${originalIndex}`;
      const isSelected = !!state.isSelectedMap[roomKey];

      if (isSelected) {
        // Remove room
        state.selectedRooms = state.selectedRooms.filter(
          (r) =>
            `${r.stdRoomName}-${r.recommendationId}-${r._originalIndex}` !==
            roomKey
        );
        delete state.isSelectedMap[roomKey];
        toast.warning(`Deselect 1 room.`);
      } else {
        // Add room
        state.selectedRooms.push({
          ...room,
          _originalIndex: originalIndex,
        });
        state.isSelectedMap[roomKey] = true;
        toast.success(`Select ${state.selectedRooms.length} room.`);

        if (!state.activeRecommendationId) {
          state.activeRecommendationId = room.recommendationId;
        }
      }

      if (state.selectedRooms.length === 0) {
        state.activeRecommendationId = null;
      }
    },
    resetSelections: (state) => {
      state.selectedRooms = [];
      state.isSelectedMap = {};
      state.activeRecommendationId = null;
      localStorage.removeItem('selectedRooms');
    },
    resetAll: (state) => {
      state.selectedRooms = [];
      state.isSelectedMap = {};
      state.activeRecommendationId = null;
      state.loading = true;
      state.error = null;
      state.roomData = null;
      localStorage.removeItem('selectedRooms');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomRates.fulfilled, (state, action) => {
        state.loading = false;
        state.roomData = action.payload.data;
      })
      .addCase(fetchRoomRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';

        // Toast with detailed error
        toast.error(`${state.error}`);
      });
  },
});

export const { toggleRoomSelection, resetSelections, resetAll } =
  roomSelectionSlice.actions;
export default roomSelectionSlice.reducer;
