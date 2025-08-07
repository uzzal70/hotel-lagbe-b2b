/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import FindMatchingRooms from './FindMatchingRooms';
import RoomSelectSingle from './RoomSelectSingle';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import companyInfo from '../../../../common/companyInfo';

const SelectRoomModal = () => {
  const navigate = useNavigate();
  const selectedPax = { adults: '1', childs: '0' };

  const { selectedRoomNames, filterRefundable, filterFreeCancel, articleNum } =
    useSelector((state) => state.roomFilter);

  const { selectedRooms, roomData } = useSelector(
    (state) => state.roomSelection
  );
  const roomRate = roomData?.results?.[0]?.data?.[0]?.roomRate || [];
  const { roomsNumber, traceId, startDate, endDate } = useParams();
  const hotelName = roomData?.results[0].data[0].name;
  const providerHotelId = roomData?.results[0].data[0].providerHotelId;
  const hotelContact = roomData?.results[0].data[0].contact;
  const heroImage = roomData?.results[0].data[0].heroImage;
  const hotelId = roomData?.results[0].data[0].id;
  const type = roomData?.results[0].data[0].type;
  const starRating = roomData?.results[0].data[0].starRating;
  const hotelInfo = {
    hotelId,
    hotelName,
    type,
    hotelContact,
    heroImage,
    providerHotelId,
    starRating,
  };
  //   console.log(roomData);
  const selectionRoomRate = selectedRooms.slice(0, roomsNumber);
  const matchedRooms = useMemo(
    () => FindMatchingRooms({ roomRate, hotelInfo }, selectedPax),
    [roomRate]
  );

  const filteredRooms = useMemo(() => {
    if (!Array.isArray(matchedRooms)) return [];

    return matchedRooms.filter((room) => {
      const matchName =
        selectedRoomNames.length === 0 ||
        selectedRoomNames.includes(room.stdRoomName);
      const matchRefund = !filterRefundable || room.refundable === true;
      const matchFreeCancel =
        !filterFreeCancel || room.freeCancelation === true;
      return matchName && matchRefund && matchFreeCancel;
    });
  }, [matchedRooms, selectedRoomNames, filterRefundable, filterFreeCancel]);

  const dataItem = filteredRooms?.slice(0, articleNum);

  const totalFinalRate = selectedRooms.reduce(
    (sum, item) => sum + item.fare.finalRate,
    0
  );
  const handleClick = () => {
    toast.error('Please select all rooms before continue.', { duration: 3000 });
  };

  const start = moment(startDate);
  const end = moment(endDate);
  const handleNavigate = () => {
    const paramsBody = {
      traceId,
      recommendationId: selectionRoomRate?.[0]?.recommendationId,
      start,
      end,
      itineraryCode: roomData?.results?.[0]?.itinerary?.code,
      items: roomData?.results?.[0]?.items || '',
      
    };
    const encodedQuery = encodeURIComponent(JSON.stringify(paramsBody));
    navigate(`/dashboard/hotel/review?query=${encodedQuery}`);
  };
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 500,
          borderBottom: 1,
          borderColor: 'var(--secondary)',
        }}
      >
        Room
      </Typography>

      <Box
        sx={{
          mx: 'auto',
          pb: 2,
          overflowY: 'auto',
          maxHeight: '58vh',
          '&::-webkit-scrollbar': {
            width: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)', // Customize as needed
            borderRadius: '5px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <RoomSelectSingle data={dataItem} />
      </Box>

      <Box
        sx={{
          mx: 'auto',
          position: 'absolute',
          bottom: 25,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '16vw',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 20,
                color: 'var(--primary)',
              }}
            >
              {companyInfo?.currencyCode} {totalFinalRate.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            {selectionRoomRate.length === parseInt(roomsNumber) ? (
              <Button
                variant="contained"
                size={'medium'}
                sx={{
                  bgcolor: 'var(--primary)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 12,
                  '&:hover': { bgcolor: 'var(--primary)' },
                }}
                onClick={handleNavigate}
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={handleClick}
                variant="outlined"
                size={'medium'}
                sx={{
                  color: '#6e6b6b',
                  borderColor: '#6e6b6b',
                  backgroundColor: '#dcdcdc',
                  fontWeight: 600,
                  fontSize: 12,
                  '&:hover': { bgcolor: 'var(--primary-light)' },
                }}
              >
                Continue
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectRoomModal;
