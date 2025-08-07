// roomSelectionStorageMiddleware.js
const roomSelectionMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const { type } = action;
  const { selectedRooms } = store.getState().roomSelection;

  // When toggling room selection, resetting selections, or resetting all
  if (
    type === 'roomSelection/toggleRoomSelection' ||
    type === 'roomSelection/resetSelections' ||
    type === 'roomSelection/resetAll'
  ) {
    // Persist selectedRooms to localStorage
    localStorage.setItem('selectedRooms', JSON.stringify(selectedRooms));
  }

  // Specifically handle reset actions to remove selectedRooms from localStorage
  if (type === 'roomSelection/resetSelections' || type === 'roomSelection/resetAll') {
    localStorage.removeItem('selectedRooms'); // Remove from localStorage on reset
  }

  return result;
};

export default roomSelectionMiddleware;
