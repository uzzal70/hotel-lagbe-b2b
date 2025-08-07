/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { toggleRoomSelection } from '../../../../redux/slices/roomSelectionSlice';
import { Box, Button, Typography } from '@mui/material';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import moment from 'moment';

import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import companyInfo from '../../../../common/companyInfo';

const RoomSelectSingle = ({ data }) => {
  const dispatch = useDispatch();
  const { roomsNumber } = useParams();

  const { selectedRooms, activeRecommendationId, isSelectedMap } = useSelector(
    (state) => state.roomSelection
  );

  const handleSelect = (room, index) => {
    if (selectedRooms.length === roomsNumber) {
      toast.warning(`You can select up to ${roomsNumber} rooms only.`);
    } else {
      dispatch(toggleRoomSelection({ room, originalIndex: index }));
    }
  };

  const isRoomSelected = (room, index) => {
    const key = `${room.stdRoomName}-${room.recommendationId}-${index}`;
    return !!isSelectedMap[key];
  };

  const initialState = useSelector((state) => state.hotel);
  const startDate = moment(initialState?.dateRange?.[0]?.startDate);
  const endDate = moment(initialState?.dateRange?.[0]?.endDate);
  const nights = endDate.diff(startDate, 'days') || 1;

  const getTypeLabel = (type) => {
    if (!type) return 'Breakfast Not Included';
    return type.toLowerCase().includes('breakfast')
      ? 'Breakfast Included'
      : 'Breakfast Not Included';
  };

  return (
    <Box mt={1.5}>
      {data?.slice(0, roomsNumber)?.map((room) => {
        const shouldDisplay =
          !activeRecommendationId ||
          room.recommendationId === activeRecommendationId;
        if (!shouldDisplay) return null;

        const isSelected = isRoomSelected(room, room?.uuid);

        const price = Number((room?.fare?.finalRate || 0).toFixed(2));
        const rules = room?.policy?.cancellationPolicies?.[0]?.rules || [];
        const firstRule = rules[0]?.end;

        return (
          <Box key={room?.uuid} mb={1.5}>
            <Box
              sx={{
                px: 1,
                py: 1,
                border: 0.5,
                borderColor: 'var(--brG)',
                borderRadius: 2,
                backgroundColor: 'var(--bgG)',
              }}
            >
              <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                {room.stdRoomName}
              </Typography>
              {/* <p>{room.description}</p> */}

              <Typography
                sx={{
                  fontSize: { xs: 10, lg: 12 },
                  pb: 0.1,
                  color: room?.refundable ? '#03939F' : 'var(--crimson)',
                }}
              >
                {room?.refundable
                  ? `Free Cancellation Till ${new Date(
                      firstRule
                    ).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}`
                  : 'Non Refundable'}
              </Typography>

              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
              >
                <RestaurantMenuIcon
                  sx={{
                    color:
                      room?.boardBasis?.type === 'RoomOnly'
                        ? 'var(--crimson)'
                        : '#334F7D',
                    fontSize: 15,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      room?.boardBasis?.type === 'RoomOnly'
                        ? 'var(--crimson)'
                        : '#334F7D',
                    fontSize: { xs: 10, lg: 12 },
                  }}
                >
                  {getTypeLabel(room?.boardBasis?.type)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography>
                    {companyInfo?.currencyCode} {(price || 0).toFixed(2)}
                  </Typography>
                  <Typography sx={{ fontSize: 10, color: '#6A7A90' }}>
                    Price for {1} room x {nights} night(s) incl. taxes & fees
                  </Typography>
                </Box>

                <Button
                  onClick={() => handleSelect(room, room?.uuid)}
                  sx={{
                    backgroundColor: isSelected ? 'var(--primary)' : 'white',
                    border: '1px solid var(--primary)',
                    color: isSelected ? 'white' : 'var(--primary)',
                    fontWeight: 300,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                    },
                    width: '70px',
                    py: 0.2,
                    px: 0.2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    {isSelected ? (
                      <CheckCircleIcon
                        sx={{ fontSize: 12, mt: 0.1, mr: 0.5, color: 'white' }}
                      />
                    ) : (
                      <RadioButtonUncheckedIcon
                        sx={{
                          fontSize: 12,
                          mt: 0.1,
                          mr: 0.5,
                          color: 'var(--primary)',
                        }}
                      />
                    )}
                    <Box sx={{ fontSize: 12, textAlign: 'center' }}>
                      {isSelected ? 'Selected' : 'Select'}
                    </Box>
                  </Box>
                </Button>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default RoomSelectSingle;
