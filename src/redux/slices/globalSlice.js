// src/redux/slices/roomFilterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showChat: false,
  value: localStorage.getItem('status') || '',
  unseenCount: 0,
  unseenCountHotel: 0,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.value = action.payload;
    },
    toggleShowChat: (state) => {
      state.showChat = !state.showChat;
    },
    setShowChat: (state, action) => {
      state.showChat = action.payload;
    },
    setUnseenCount: (state, action) => {
      state.unseenCount = action.payload;
    },
    setUnseenCountHotle: (state, action) => {
      state.unseenCountHotel = action.payload;
    },
    addActiveMessageId: (state, action) => {
      const id = action.payload;
      if (!state.activeMessageIds.includes(id)) {
        state.activeMessageIds.push(id);
      }
    },
    setActiveMessageIds: (state, action) => {
      state.activeMessageIds = [action.payload]; // only one active at a time
    },
    removeActiveMessageId: (state, action) => {
      state.activeMessageIds = state.activeMessageIds.filter(
        (id) => id !== action.payload
      );
    },
    toggleActiveMessageId: (state, action) => {
      const id = action.payload;
      if (state.activeMessageIds.includes(id)) {
        state.activeMessageIds = [
          ...state.activeMessageIds.filter((item) => item !== id),
        ];
      } else {
        state.activeMessageIds = [...state.activeMessageIds, id];
      }
    },
    clearActiveMessageIds: (state) => {
      state.activeMessageIds = [];
    },
  },
});

// export const { toggleShowChat, setShowChat } = globalSlice.actions;
// export default globalSlice.reducer;

export const {
  setStatus,
  toggleShowChat,
  setShowChat,
  setUnseenCount,
  setUnseenCountHotle,
  addActiveMessageId,
  removeActiveMessageId,
  toggleActiveMessageId,
  setActiveMessageIds,
  clearActiveMessageIds,
} = globalSlice.actions;
export default globalSlice.reducer;
