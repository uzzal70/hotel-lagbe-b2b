/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useNavigationType, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  Stack,
  Alert,
} from '@mui/material';

import { useTheme } from '@mui/system';
import BackButton from '../Common/BackButton';
import { baseUrlHotel } from '../../../baseurl';
import RoomBarLoad from './content/RoomBarLoad';
import HotelRoomList from './content/HotelRoomList';
import HotelFacilities from './content/HotelFacilities';
import HotelHeaderDetails from './content/HotelHeaderDetails';
import RoomSelectionNext from './content/table/RoomSelectionNext';
import HotelDetailsSkeleton from './content/HotelDetailsSkeleton';
import {
  fetchRoomRates,
  resetAll,
  resetSelections,
} from '../../redux/slices/roomSelectionSlice';
import HotelRoomFilterSkeleton from './content/table/HotelRoomFilterSkeleton';
import HotelTabs from './content/HotelTabs';
import ScrollToTop from '../../ScrollToTop';
import getAuthToken from '../Common/getAuthToken';
import EmptyContent from '../Common/EmptyContent';
import HotelSeachBar from './HotelSeachBar';
import moment from 'moment';
import { setRooms } from '../../redux/slices/hotelSearchSlice';
import HeaderTitle from '../../common/HeaderTitle';

const HotelDetails = () => {
  const token = getAuthToken();
  const initialState = useSelector((state) => state.hotel);
  const { id, traceId, nationality, endDate, startDate, roomsNumber } =
    useParams();
  const decodedRooms = JSON.parse(decodeURIComponent(roomsNumber));
  const dispatch = useDispatch();
  const navigationType = useNavigationType();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomError, setRoomError] = useState(null);
  const { loading: roomLoading } = useSelector((state) => state.roomSelection);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const Div = useRef(null);
  const roomDiv = useRef(null);
  const [value, setValue] = useState(0);

  const handleScrollToDiv = (divRef) => {
    if (divRef.current) {
      const offset = 150;
      const top =
        divRef.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrlHotel}/getHotelDetails/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const result = await res.json();
        const datas = result?.results?.[0]?.data || [];
        setData(datas);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  useEffect(() => {
    setRoomError(null); // clear previous errors
    const searchBody = {
      hotelId: id || null,
      traceId: traceId,
    };
    dispatch(fetchRoomRates({ searchBody, endpoint: 'getRoomRates' }))
      .unwrap()
      .catch((err) => {
        setRoomError(err);
      });
  }, [dispatch, id]);

  useEffect(() => {
    if (navigationType === 'POP') {
      dispatch(resetSelections());
    }
  }, [navigationType, dispatch, id, traceId]);

  useEffect(() => {
    dispatch(resetSelections());
  }, [dispatch, id, traceId]);

  const handleClick = () => {
    localStorage.removeItem('selectedRooms');
    dispatch(resetAll());
    const formattedCheckIn = moment(
      initialState.dateRange[0].startDate || checkIn
    ).format('YYYY-MM-DD');
    const formattedCheckOut = moment(
      initialState.dateRange[0].endDate || checkOut
    ).format('YYYY-MM-DD');
    const numberOfAdults = initialState?.rooms?.flatMap((room) => room?.adults);
    const numberOfChilds =
      initialState?.rooms?.flatMap((room) => room?.childrenAges || []) || [];

    const searchBody = {
      hotelId: id || null,
      checkIn: formattedCheckIn,
      checkOut: formattedCheckOut,
      nationality,
      numberOfAdults: numberOfAdults || [1],
      childAges: numberOfChilds,
    };
    dispatch(fetchRoomRates({ searchBody, endpoint: 'createHotelItinerary' }));
  };
  // console.log(initialState?.rooms);
  const navcomponet = <HeaderTitle headerTitle={'Hotel Details'} />;
  if (error) {
    return (
      <Box
        sx={{
          height: '90vh',
        }}
      >
        {navcomponet}
        <Alert severity="error">{error}</Alert>
        <EmptyContent
          message="We apologize — no response was received from the hotel supplier. Please try again."
          link
          desc
        />
      </Box>
    );
  }

  const renderSkeletonMobileRooms = () =>
    [...Array(2)].map((_, index) => (
      <Grid item xs={12} key={index}>
        <Box bgcolor="white" sx={{ borderRadius: 2, p: 2 }}>
          <Stack direction="row" spacing={2}>
            <Skeleton variant="rectangular" width={120} height={120} />
            <Stack spacing={1} flex={1}>
              <Skeleton height={20} width="80%" />
              <Skeleton height={15} width="60%" />
              <Skeleton height={10} width="40%" />
            </Stack>
          </Stack>
          <Box mt={2}>
            <Skeleton height={40} width="100%" />
          </Box>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            mt={2}
          >
            <Stack spacing={1} width="90%">
              <Skeleton height={15} />
              <Skeleton height={10} />
            </Stack>
            <Skeleton height={32} width="48%" />
          </Stack>
        </Box>
      </Grid>
    ));

  const renderTableSkeleton = () => (
    <TableContainer sx={{ display: { xs: 'none', md: 'block' } }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'var(--gray)' }}>
            {['Room Type', 'Facilities', 'Guest', 'Price'].map((head, i) => (
              <TableCell
                key={i}
                sx={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  p: 1.2,
                  color: '#344258',
                  border: '0.5px solid #DADDE3',
                }}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: 'white' }}>
          {[...Array(2)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {[350, 280, 80, 300].map((w, i) => (
                <TableCell
                  key={i}
                  sx={{ width: w, border: '0.5px solid #DADDE3' }}
                  height={110}
                >
                  <Skeleton variant="rectangular" width={w} height={110} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  useEffect(() => {
    dispatch(setRooms(decodedRooms));
  }, []);
  const checkIn = data?.[0]?.checkinInfo?.beginTime;
  const checkOut = data?.[0]?.checkoutInfo?.time;

  const { roomData } = useSelector((state) => state.roomSelection);
  return (
    <Box>
      {/* Header */}
      <ScrollToTop />
      {navcomponet}

      {/* Main Content */}
      <Box>
        {loading ? (
          <>
            <HotelDetailsSkeleton />
            {isMobile && renderSkeletonMobileRooms()}
          </>
        ) : (
          <Box sx={{ minHeight: '100vh', mx: { xs: 1 } }}>
            {data?.map((item, index) => {
              const address = item?.contact?.address || {};
              const city = `${address?.city?.name || ''}${
                address?.postalCode ? '-' + address?.postalCode : ''
              }`;

              return (
                <Container key={item?.id || index} sx={{ p: 0, mb: 4 }}>
                  <HotelTabs
                    value={value}
                    handleChange={handleChange}
                    handleScrollToDiv={handleScrollToDiv}
                    Div={Div}
                    roomDiv={roomDiv}
                    item={item}
                  />

                  {/* Hotel Info Section */}
                  <Box ref={Div}>
                    <HotelHeaderDetails
                      roomDiv={roomDiv}
                      handleScrollToDiv={handleScrollToDiv}
                      item={item}
                      address={address}
                      city={city}
                      roomLoading={roomLoading}
                    />
                  </Box>

                  {/* Room List Section */}
                  <Box ref={roomDiv}>
                    {roomLoading ? (
                      <>
                        <RoomBarLoad />
                        <HotelRoomFilterSkeleton />
                        {renderTableSkeleton()}
                      </>
                    ) : (
                      <>
                        {roomError ? (
                          <Alert severity="error">
                            {roomError?.message || roomError}
                          </Alert>
                        ) : (
                          <Box>
                            <HotelSeachBar
                              hotelId={id}
                              checkIn={startDate}
                              checkOut={endDate}
                              nationality={nationality}
                              handleClick={handleClick}
                              prevRooms={decodedRooms}
                            />
                            <HotelRoomList
                              loading2={roomLoading}
                              roomDiv={Div}
                              Selectionloading={loading}
                              traceId={traceId}
                              hotelId={id}
                              checkIn={checkIn}
                              checkOut={checkOut}
                              checkInDate={
                                initialState.dateRange[0].startDate || startDate
                              }
                              checkOutDate={
                                initialState.dateRange[0].endDate || endDate
                              }
                            />
                          </Box>
                        )}
                      </>
                    )}
                  </Box>

                  <HotelFacilities item={item} />
                </Container>
              );
            })}
          </Box>
        )}
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none ' } }}>
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: '4px solid var(--primary)',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
            py: { xs: 1, md: 2 },
            px: 2,
            zIndex: 100,
            borderRadius: '15px  15px 0px  0px ',
            transition: 'all 0.4s ease',
            bgcolor: 'var(--white)',
          }}
        >
          <Box>
            <RoomSelectionNext
              loading={loading}
              traceId={roomData?.results?.[0]?.traceId || traceId}
              hotelId={id}
              checkIn={checkIn}
              checkOut={checkOut}
              checkInDate={initialState.dateRange[0].startDate || startDate}
              checkOutDate={initialState.dateRange[0].endDate || endDate}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HotelDetails;
