/* eslint-disable react/prop-types */
import RoomType from './RoomType';
import RoomGuest from './RoomGuest';
import RoomPrice from './RoomPrice';
// import RoomFacilities from './RoomFacilities';
import { useDispatch, useSelector } from 'react-redux';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { toggleRoomSelection } from '../../../../redux/slices/roomSelectionSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { resetFilters } from '../../../../redux/slices/roomFilterSlice';

const RoomSelectionItem = ({ roomData }) => {
  const dispatch = useDispatch();
  const { roomsNumber } = useParams();
  const { selectedRooms, activeRecommendationId, isSelectedMap } = useSelector(
    (state) => state.roomSelection
  );
  // console.log(selectedRooms);
  const handleSelect = (room, index) => {
    if (selectedRooms.length === roomsNumber) {
      toast.warning(`You can select up to ${roomsNumber} rooms only.`);
    } else {
      dispatch(toggleRoomSelection({ room, originalIndex: index }));
    }
    dispatch(resetFilters());
  };

  const isRoomSelected = useCallback(
    (room, index) => {
      const key = `${room.stdRoomName}-${room.recommendationId}-${index}`;
      return !!isSelectedMap[key];
    },
    [isSelectedMap]
  );

  // const isRoomSelected = useCallback(
  //   (room, uuid) => {
  //     const key = `${room.stdRoomId}-${room.recommendationId}-${uuid}`;
  //     return !!isSelectedMap[key];
  //   },
  //   [isSelectedMap]
  // );

  // console.log('call roomselectionitm ');
  return (
    <TableBody>
      {roomData.map((room) => {
        const shouldDisplay =
          !activeRecommendationId ||
          room.recommendationId === activeRecommendationId;
        if (!shouldDisplay) return null;

        const isSelected = isRoomSelected(room, room?.uuid);

        return (
          <TableRow key={room?.uuid}>
            <TableCell
              sx={{
                border: '1px solid #E0E0E0',
                p: 1,
                width: { xs: '50%', md: '50%' }, // Responsive width
              }}
            >
              <RoomType
                item={room}
                onClick={() => handleSelect(room, room?.uuid)}
                isSelected={isSelected}
              />

              {/* <Box sx={{ fontSize: 10 }}>
                {roomsNumber === room.occupancies?.length
                  ? '⚠ Combine Rate ID'
                  : ''}
              </Box> */}
            </TableCell>

            <TableCell
              sx={{
                textAlign: 'center',
                border: '1px solid #E0E0E0',
                p: 1,
                width: { xs: '0%', md: '15%' },
                display: { xs: 'none', md: 'table-cell' }, // 👈 Responsive visibility
              }}
            >
              <RoomGuest item={room} />
            </TableCell>

            <TableCell
              sx={{
                border: '1px solid #E0E0E0',
                p: 1,
                width: { xs: '0', md: '35%' },
                display: { xs: 'none', md: 'table-cell' },
              }}
            >
              <RoomPrice
                item={room}
                isSelected={isSelected}
                onClick={() => handleSelect(room, room?.uuid)}
              />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default RoomSelectionItem;
