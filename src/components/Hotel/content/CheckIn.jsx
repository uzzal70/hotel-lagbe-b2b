/* eslint-disable react/prop-types */
import { Box, Grid, Stack, Tooltip, Typography } from '@mui/material';
import hotel from '../../../assets/images/hotel';
import StarIcon from '@mui/icons-material/Star';
import moment from 'moment';
import { baseUrlHotel } from '../../../../baseurl';
import { useGetItemsQuery } from '../../../redux/slices/apiSlice';
import { useEffect, useState } from 'react';
import HotelOverviewModal from '../modal/HotelOverviewModal';
import { REFUND_PRELIMINARY_COMPLETED } from '../../Utils/hotel/hotel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { indigo, red } from '@mui/material/colors';

function calculateTotalGuests(roomAllocation) {
  let totalAdult = 0;
  let totalChild = 0;
  for (const room of roomAllocation) {
    totalAdult += room.adultCount || 0;
    totalChild += room.childCount || 0;
  }

  return { totalAdult, totalChild };
}
const CheckIn = ({
  check,
  data,
  checkInData,
  hotelId,
  apicheckIn,
  apicheckOut,
}) => {
  const urlHotelDetails = `${baseUrlHotel}/getHotelDetails/${hotelId}`;
  const [modalState, setModalState] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [overviewData, setOverviewData] = useState(null);

  const openModal = (item, modal) => {
    // setOverviewData(item);
    setModalState(modal);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const {
    data: hotelDetailsData,
    isLoading,
    refetch,
    // error,
    // isError,
  } = useGetItemsQuery({
    url: urlHotelDetails,
  });
  useEffect(() => {
    if (hotelId) {
      refetch();
    }
  }, [hotelId, refetch]);

  const {
    hotelName,
    hotelRating,
    coverImage,
    address,
    checkIn,
    checkOut,
    nights,
    roomLength,
    totalAdult: defaultAdult,
    totalChild: defaultChild,
  } = checkInData;

  const checkInMoment = data?.booking?.guestRoomAllocations?.checkInTime;
  const checkOutMoment = data?.booking?.guestRoomAllocations?.checkOutTime;

  const matchIn = checkInMoment?.match(/\d{1,2}:\d{2}\s?[AP]M/);
  const matchOut = checkOutMoment?.match(/\d{1,2}:\d{2}\s?[AP]M/);

  const timeIn = matchIn ? matchIn[0] : 'N/A';
  const timeOut = matchOut ? matchOut[0] : 'N/A';

  let totalAdult = defaultAdult;
  let totalChild = defaultChild;

  const refundable = data?.booking?.guestRoomAllocations?.refundable;

  if (check && data?.booking?.guestRoomAllocations?.roomAllocation) {
    const result = calculateTotalGuests(
      data.booking.guestRoomAllocations.roomAllocation
    );
    totalAdult = result.totalAdult;
    totalChild = result.totalChild;
  }
  const labelMap = {
    bookingRef: 'REF:',
    pnr: 'PNR:',
  };
  return (
    <Box>
      {check && (
        <Stack
          sx={{
            flex: '1 0 auto',
            width: '100%',
            mb: 1.8,
            borderRadius: 2,
            p: 1,
          }}
          bgcolor="white"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={1}
          >
            <Box display="flex" alignItems="center" gap={1}>
              {['bookingRef', 'pnr'].map((key) => (
                <Typography
                  key={key}
                  sx={{
                    color: 'var(--black)',
                    fontWeight: 500,
                    fontSize: { xs: 12, md: 14 },
                    px: 1,
                    py: 0.5,
                    borderLeft: 0,
                    borderRight: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Typography
                    sx={{ fontSize: { xs: 12, md: 15 }, fontWeight: 600 }}
                  >
                    {labelMap[key]}
                  </Typography>{' '}
                  {data?.booking[key] || 'N/A'}
                </Typography>
              ))}
            </Box>

            <Typography
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                color: refundable ? indigo[300] : red[500],
                fontWeight: 500,
                fontSize: { xs: 12, md: 13 },
                px: 1,
                py: 0.5,
                borderRadius: 1,
                width: { xs: '100%', md: 'auto' },
                mb: { xs: 1, md: 0 },
                textTransform: 'capitalize',
                backgroundColor: refundable ? indigo[50] : red[50],
              }}
            >
              {refundable ? (
                <>
                  <CheckCircleIcon sx={{ fontSize: 16, color: indigo[300] }} />
                  Refundable
                </>
              ) : (
                <>
                  <CancelIcon sx={{ fontSize: 16, color: red[500] }} />
                  Non Refundable
                </>
              )}
            </Typography>

            <Typography
              sx={{
                color: 'var(--black)',
                fontWeight: 500,
                fontSize: { xs: 12, md: 13 },
                px: 2,
                py: 0.5,
                borderRadius: 1,
                width: { xs: '100%', md: 'auto' },
                mb: { xs: 1, md: 0 },
                textTransform: 'capitalize',
              }}
              className={`${data.booking?.tfStatus?.toLowerCase()}`}
            >
              {data.booking?.tfStatus === REFUND_PRELIMINARY_COMPLETED
                ? 'Waiting for final Approval...'
                : data.booking?.tfStatus?.replace(/_/g, ' ').toLowerCase()}
            </Typography>
          </Box>
        </Stack>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
          padding: 1,
          rounded: 1,
          borderColor: '#DADFE6',
          bgcolor: 'var(--white)',
          borderRadius: '10px',
          mx: { xs: 0.5, md: 'unset' },
          position: 'relative',
          flexWrap: 'wrap',
        }}
      >
        <Stack sx={{ flex: '1 0 auto', pl: 1, width: '59%' }}>
          {/* Title */}
          <Box display="flex" alignItems="center">
            <Typography
              sx={{
                color: 'var(--black)',
                fontWeight: 500,
                fontSize: { xs: 12, md: 16 },
                marginRight: 1,
              }}
            >
              {hotelName || 'N/A'}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              {/* {[...Array(parseInt(hotelRating))].map((_, i) => (
                <StarIcon
                  key={i}
                  sx={{
                    fontSize: 10,
                    color: '#FFB400', // Change color based on rating
                  }}
                />
              ))} */}
              <Stack direction="row" alignItems="center" spacing={0.5}>
                {[...Array(Math.max(0, parseInt(hotelRating) || 0))].map(
                  (_, i) => (
                    <StarIcon
                      key={i}
                      sx={{
                        fontSize: 10,
                        color: '#FFB400',
                      }}
                    />
                  )
                )}
              </Stack>
            </Stack>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center" mb={2}>
            <img src={hotel.loc} alt="" width={12} height={12} />
            <Typography
              sx={{
                color: 'var(--black)',
                fontWeight: 300,
                fontSize: { xs: 10, md: 12 },
              }}
              noWrap
            >
              {address || 'N/A'}
            </Typography>
            {/* <Typography
            sx={{
              color: '#3164FF',
              fontWeight: 300,
              fontSize: { xs: 10, md: 12 },
              cursor: 'pointer',
            }}
            noWrap
          >
            Show map
          </Typography> */}
          </Stack>

          {/*Info */}

          <Grid container spacing={1.5} alignItems="stretch">
            {/* Check-in Details */}
            <Grid item xs={12} md={8}>
              <Box
                bgcolor="var(--gray)"
                borderRadius={2}
                display="flex"
                justifyContent="space-between"
                height="100%"
                px={1.5}
                py={0.8}
              >
                <Tooltip followCursor title={checkInMoment}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <img
                      src={hotel.arrod}
                      alt="Check-in"
                      style={{
                        width: '15px',
                        height: '15px',
                        objectFit: 'contain',
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{ fontSize: { xs: 10, md: 10 }, color: '#5A6573' }}
                      >
                        Check-in
                      </Typography>
                      <Typography
                        sx={{ fontSize: { xs: 10, md: 13 }, fontWeight: 500 }}
                      >
                        {moment(checkIn).format('D MMM YYYY')}
                      </Typography>
                      <Typography
                        sx={{ fontSize: { xs: 10, md: 10 }, color: '#5A6573' }}
                      >
                        {apicheckIn || timeIn}
                      </Typography>
                    </Box>
                  </Stack>
                </Tooltip>

                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography
                    sx={{
                      fontSize: { xs: 10, md: 10 },
                      color: '#5A6573',
                      bgcolor: 'white',
                      px: 1,
                      border: 1,
                      borderColor: '#DADFE6',
                      borderRadius: 1,
                    }}
                  >
                    {nights || 0} Night
                  </Typography>
                </Box>

                <Tooltip followCursor title={checkOutMoment}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <img
                      src={hotel.arrou}
                      alt="Check-in"
                      style={{
                        width: '15px',
                        height: '15px',
                        objectFit: 'contain',
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{ fontSize: { xs: 10, md: 10 }, color: '#5A6573' }}
                      >
                        Check-out
                      </Typography>
                      <Typography
                        sx={{ fontSize: { xs: 10, md: 13 }, fontWeight: 500 }}
                      >
                        {moment(checkOut).format('D MMM YYYY')}
                      </Typography>
                      <Typography
                        sx={{ fontSize: { xs: 10, md: 10 }, color: '#5A6573' }}
                      >
                        {apicheckOut || timeOut}
                      </Typography>
                    </Box>
                  </Stack>
                </Tooltip>
              </Box>
            </Grid>

            {/* Room Details */}
            <Grid item xs={12} md={4}>
              <Box
                bgcolor="var(--gray)"
                borderRadius={2}
                display="flex"
                height="100%"
                px={1.5}
                py={0.8}
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1}>
                  <Box>
                    <Typography
                      sx={{ fontSize: { xs: 10, md: 10 }, color: '#5A6573' }}
                    >
                      Room Details
                    </Typography>
                    <Typography
                      sx={{ fontSize: { xs: 11, md: 13 }, fontWeight: 500 }}
                    >
                      {roomLength} Room
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 10, md: 10 } }}>
                      Adult: {totalAdult}, Child: {totalChild}
                    </Typography>
                  </Box>
                </Stack>
                <Box
                  sx={{
                    display: { xs: 'flex', sm: 'none' },
                    justifyContent: 'flex-end',
                    mt: 0.5,
                    img: {
                      width: '100px',
                      height: '56px',
                      borderRadius: '5px',
                      objectFit: 'cover',
                    },
                    position: 'relative',
                  }}
                  onClick={
                    hotelId ? () => openModal('_', 'ALL IMAGES') : undefined
                  }
                >
                  <img src={coverImage || hotel.h1} alt="" />
                  {hotelId && (
                    <Box
                      sx={{
                        position: 'absolute',
                        color: 'var(--white)',
                        fontWeight: 400,
                        fontSize: { xs: 10, md: 12 },
                        cursor: 'pointer',
                        px: 1,
                        top: 0,
                        bgcolor: 'var(--primary)',
                        width: '100%',
                        textAlign: 'center',
                        border: '1px solid var(--light-stroke)',
                        borderRadius: 1,
                      }}
                    >
                      Show Details
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Stack>

        {/* Left Side - Hotel Image */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'block' },
            mt: 0.5,
            ml: 2,
            img: {
              width: '140px',
              height: '120px',
              borderRadius: '5px',
              objectFit: 'cover',
            },
            position: 'relative',
          }}
          onClick={hotelId ? () => openModal('_', 'ALL IMAGES') : undefined}
        >
          {hotelId && (
            <Box
              sx={{
                position: 'absolute',
                color: 'var(--white)',
                fontWeight: 400,
                fontSize: { xs: 10, md: 12 },
                cursor: 'pointer',
                px: 1,
                top: 0,
                bgcolor: 'var(--primary)',
                width: '100%',
                textAlign: 'center',
                border: '1px solid var(--light-stroke)',
                borderRadius: 1,
              }}
            >
              Show Details
            </Box>
          )}
          <img src={coverImage || hotel.h1} alt="" />
        </Box>
        {modalIsOpen && (
          <>
            {isLoading ? (
              'Loading...'
            ) : (
              <HotelOverviewModal
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                item={hotelDetailsData?.results?.[0]?.data[0] || {}}
                modalState={modalState}
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default CheckIn;
