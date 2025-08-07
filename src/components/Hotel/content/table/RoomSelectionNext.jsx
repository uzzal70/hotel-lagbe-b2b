/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  Card,
  Tooltip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack, useTheme } from '@mui/system';
import moment from 'moment';
import RoomIcon from '@mui/icons-material/Room';
import { toast } from 'react-toastify';
import companyInfo from '../../../../common/companyInfo';
import { toggleRoomSelection } from '../../../../redux/slices/roomSelectionSlice';
import { resetFilters } from '../../../../redux/slices/roomFilterSlice';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// Selected Rooms showing

const RoomSelectionNext = ({
  loading,
  traceId,
  hotelId,
  cityName,
  checkIn,
  checkOut,
  checkInDate,
  checkOutDate,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const initialDateRange = useSelector((state) => state.hotel.dateRange);
  const initialRooms = useSelector((state) => state.hotel.rooms);
  const { roomsNumber, startDate, endDate, adult, child } = useParams();
  const { selectedRooms, roomData } = useSelector(
    (state) => state.roomSelection
  );
  // console.log(checkInDate, checkOutDate);
  const numberOfRooms = initialRooms?.length || roomsNumber;
  const totalGuests = initialRooms?.reduce(
    (sum, room) => sum + (room.adults || 0) + (room.children || 0),
    0
  );
  const totalG = totalGuests || Number(adult) + Number(child);
  // console.log(selectedRooms);
  const selectionRoomRate = selectedRooms.slice(0, numberOfRooms);

  const start = moment(initialDateRange?.[0]?.startDate || startDate).format(
    'D MMM '
  );
  const end = moment(initialDateRange?.[0]?.endDate || endDate).format('D MMM');
  const payloadstart = moment(checkInDate).format('YYYY-MM-DD');
  const payloadend = moment(checkOutDate).format('YYYY-MM-DD');
  const totalFinalRate = selectedRooms.reduce(
    (sum, item) => sum + item.fare.finalRate,
    0
  );

  const dispatch = useDispatch();
  const handleSelectRoom = (room, index) => {
    if (selectedRooms.length === roomsNumber) {
      toast.warning(`You can select up to ${roomsNumber} rooms only.`);
    } else {
      dispatch(toggleRoomSelection({ room, originalIndex: index }));
    }
    dispatch(resetFilters());
  };

  const handleClick = () => {
    toast.error('Please select all rooms before continue.', { duration: 3000 });
  };

  if (loading) return null;

  const SelectedRooms2 = ({ selectionRoomRate }) =>
    selectionRoomRate.map((item, index) => (
      <Grid item xs={12} key={index}>
        <Box
          sx={{
            py: 0.5,
            px: 1,
            borderRadius: 2,
            border: '1px solid var(--dark-green)',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
            color: 'var(--primary)',

            position: 'relative',
          }}
        >
          <CloseRoundedIcon
            sx={{
              color: 'var(--white)',
              position: 'absolute',
              top: -2,
              right: -2,
              bgcolor: 'var(--red)',
              borderRadius: 20,
              fontSize: 16,
              p: 0.3,
              cursor: 'pointer',
            }}
            onClick={() => handleSelectRoom(item, item?.uuid)}
          />

          <Tooltip title={item?.roomName || 'No Name'}>
            <Typography
              sx={{
                fontSize: 12,
              }}
              noWrap
            >
              {item?.roomName || 'No Name'}
            </Typography>
          </Tooltip>

          <Typography
            sx={{
              fontSize: 12,
            }}
          >
            Adult: {item?.numberOfAdults}{' '}
            {Number(item?.numberOfChilds > 0)
              ? `Child: ${item?.numberOfChilds}`
              : ''}
          </Typography>
          <Stack
            direction={'row'}
            alignItems="center"
            justifyContent={'space-between'}
            mt={0.5}
            width={'100%'}
          >
            <Typography fontWeight="bold" fontSize="0.75rem">
              {`${companyInfo.currencyType} ${(
                Number(item?.fare?.finalRate) || 0
              ).toFixed(2)}`}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                color: 'var(--dark-green)',
                fontWeight: 500,
              }}
            >
              Selected
            </Typography>
          </Stack>
        </Box>
      </Grid>
    ));

  const SmallSelectedRooms = ({ selectionRoomRate }) =>
    selectionRoomRate.map((item, index) => {
      return (
        <Grid
          key={index}
          xs={3}
          display="flex"
          alignItems="center"
          sx={{
            px: 1,
            py: 0.5,
            border: '0.5px solid #d0d5dd', // Optional border styling
            backgroundColor: 'var(--primary)',
            borderRadius: 1,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography
              variant="caption"
              sx={{ fontSize: '10px' }}
              color="white"
              fontWeight="500"
              noWrap
            >
              {`Room ${index + 1}`}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                fontWeight="bold"
                color="white"
                sx={{ fontSize: '10px' }}
              >
                {`${companyInfo?.currencyCode} ${(
                  Number(item?.fare?.finalRate) || 0
                ).toFixed(2)}`}
              </Typography>
            </Box>
          </Box>
        </Grid>
      );
    });
  const handleNavigate = () => {
    const paramsBody = {
      traceId,
      recommendationId: selectionRoomRate?.[0]?.recommendationId,
      payloadstart,
      payloadend,
      itineraryCode: roomData?.results?.[0]?.itinerary?.code,
      items: roomData?.results?.[0]?.items || '',
      hotelId,
      checkIn,
      checkOut,
    };

    const encodedQuery = encodeURIComponent(JSON.stringify(paramsBody));
    navigate(`/dashboard/hotel/review?query=${encodedQuery}`);
  };

  return (
    <Box>
      <Box
        sx={{
          display: { xs: 'block', md: 'none ' },
        }}
      >
        <Grid container mx={'auto'} gap={0.5}>
          <Grid
            border="1px solid #d0d5dd"
            display="flex"
            alignItems="center"
            sx={{ px: 1, py: 0.5, borderRadius: 1 }}
            item
          >
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight="500"
                noWrap
                sx={{ fontSize: 10 }}
              >
                Total Room: {numberOfRooms}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  fontSize="0.75rem"
                  color="#1D2939"
                  sx={{ fontSize: 8 }}
                >
                  Total Guest: {totalG}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <SmallSelectedRooms selectionRoomRate={selectedRooms} />

          {Array.from({ length: numberOfRooms - selectionRoomRate.length }).map(
            (_, index) => (
              <Grid
                item
                xs={3}
                key={index}
                display="flex"
                alignItems="center"
                sx={{
                  px: 1,
                  py: 0.5,
                  border: '0.5px solid #d0d5dd', // Optional border styling
                  alignItems: 'center',
                  backgroundColor: 'white',
                  justifyContent: 'center',
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight="500"
                    sx={{ fontSize: 8 }}
                    noWrap
                  >
                    {`Room ${index + 1 + selectionRoomRate.length}`}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography color="red" sx={{ fontSize: 10 }}>
                      Please Select
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )
          )}
        </Grid>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--disable)',
            mt: 2,
            pt: 1,
          }}
          gap={1}
          mt={0.5}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: isSmall ? 16 : 20,
              color: 'var(--primary)',
            }}
          >
            {companyInfo?.currencyCode} {totalFinalRate.toFixed(2)}
          </Typography>

          {selectionRoomRate.length === parseInt(numberOfRooms) ? (
            <Button
              variant="contained"
              onClick={handleNavigate}
              size={'small'}
              sx={{
                bgcolor: 'var(--primary)',
                color: 'white',
                fontWeight: 600,
                '&:hover': { bgcolor: 'var(--primary)' },
              }}
            >
              Continue
            </Button>
          ) : (
            <Button
              size={'small'}
              variant="outlined"
              sx={{
                color: '#6e6b6b',
                borderColor: '#6e6b6b',
                backgroundColor: '#dcdcdc',
                fontWeight: 600,
                '&:hover': { bgcolor: 'var(--primary-light)' },
              }}
            >
              Continue
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'block ' },
        }}
      >
        <Box>
          <Card
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              backgroundColor: '#f0f4ff',
              padding: 1,
              borderRadius: 1,
              mb: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: '#ffb400',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RoomIcon sx={{ color: '#fff', fontSize: 20 }} />
            </Box>

            <Box>
              <Typography variant="subtitle1" fontWeight={600} noWrap>
                {cityName || 'City Name'}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontSize={12}
                noWrap
              >
                {start} - {end}; {numberOfRooms} Room, {totalG} Guest
              </Typography>
            </Box>
          </Card>

          <Grid container spacing={2} mb={2}>
            <SelectedRooms2
              selectionRoomRate={selectedRooms}
              handleSelectRoom={handleSelectRoom}
            />
            {Array.from({
              length: numberOfRooms - selectionRoomRate.length,
            }).map((_, index) => (
              <Grid item xs={12} key={index}>
                <Box
                  sx={{
                    px: 1,
                    py: 1.5,
                    borderRadius: 2,
                    border: '1px solid #d0d5dd',
                    backgroundColor: 'white',
                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    fontSize: { xs: 10, md: 12 },
                  }}
                >
                  <Box color="text.secondary" noWrap>
                    {`Room ${index + 1 + selectionRoomRate.length}`}
                  </Box>
                  <Box color="red">Not Selected</Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 16,
              color: 'var(--primary)',
              my: 3,
            }}
          >
            Payable Amount: {Number(totalFinalRate).toFixed(2)}{' '}
            {companyInfo?.currencyCode}
          </Typography>

          {selectionRoomRate.length === parseInt(numberOfRooms) ? (
            <Button
              variant="contained"
              sx={{
                bgcolor: 'var(--primary)',
                color: 'white',
                fontWeight: 600,
                '&:hover': { bgcolor: 'var(--primary)' },
              }}
              onClick={handleNavigate}
              fullWidth
            >
              Continue
            </Button>
          ) : (
            <Button
              onClick={handleClick}
              variant="outlined"
              fullWidth
              sx={{
                color: '#6e6b6b',
                borderColor: '#6e6b6b',
                backgroundColor: '#dcdcdc',
                fontWeight: 600,
                '&:hover': { bgcolor: 'var(--primary-light)' },
              }}
            >
              Continue
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RoomSelectionNext;
