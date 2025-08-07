/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FindMatchingRooms from './table/FindMatchingRooms';
import RoomSelectionItem from './table/RoomSelectionItem';
import { useDispatch, useSelector } from 'react-redux';
import HotelRoomFilter from './HotelRoomFilter';
import {
  toggleFreeCancel,
  toggleRefundable,
  setSelectedRoomNames,
  toggleABreakfast,
  setSelectedBoardBasis,
} from '../../../redux/slices/roomFilterSlice';
import RoomSelectionNext from './table/RoomSelectionNext';

const PAGE_SIZE = 20; // Change this if you want more/less per page
const breakfastTypes = ['BedAndBreakfast', 'HalfBoard', 'FullBoard'];
const HotelRoomList = ({
  roomDiv,
  Selectionloading,
  traceId,
  hotelId,
  checkIn,
  checkOut,
  checkOutDate,
  checkInDate,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    selectedRoomNames,
    filterRefundable,
    filterFreeCancel,
    hasBreakfast,
    selectedBoardBasis,
  } = useSelector((state) => state.roomFilter);

  const { roomData, activeRecommendationId, error, loading } = useSelector(
    (state) => state.roomSelection
  );
  const roomRate = roomData?.results?.[0]?.data?.[0]?.roomRate || [];
  const hotelData = roomData?.results?.[0]?.data?.[0] || {};
  const traceIdUpdate = roomData?.results?.[0]?.traceId || traceId;
  const hotelInfo = {
    hotelId: hotelData?.id,
    hotelName: hotelData?.name,
    type: hotelData?.type,
    heroImage: hotelData?.heroImage,
    hotelContact: hotelData?.contact,
    providerHotelId: hotelData?.providerHotelId,
    starRating: hotelData?.starRating,
  };

  const handleRoomTypeChange = (options) => {
    const selected = options ? options.map((opt) => opt.value) : [];
    dispatch(setSelectedRoomNames(selected));
  };
  const handleBoardBasisChange = (options) => {
    const selected = options ? options.map((opt) => opt.value) : [];
    dispatch(setSelectedBoardBasis(selected));
  };

  const matchedRooms = useMemo(
    () => FindMatchingRooms({ roomRate, hotelInfo })?.matchedRooms ?? [],
    [roomRate]
  );
  const refundableCount =
    matchedRooms?.filter((room) => room?.refundable)?.length || 0;

  const breakfastItemsCount =
    matchedRooms?.filter((item) => item?.hasBreakfast === true)?.length || 0;

  // console.log(matchedRooms);
  const freeCancelCount = matchedRooms.filter(
    (room) => room.freeCancelation
  ).length;

  const uniqueRoomNames = useMemo(
    () => [
      ...new Set(
        matchedRooms.map((room) => room?.stdRoomName || room?.roomName)
      ),
    ],
    [matchedRooms]
  );

  const roomTypeOptions = useMemo(
    () => uniqueRoomNames.map((name) => ({ label: name, value: name })),
    [uniqueRoomNames]
  );

  const filteredRooms = useMemo(() => {
    if (!Array.isArray(matchedRooms)) return [];

    return matchedRooms.filter((room) => {
      console.log(room);
      const matchName =
        selectedRoomNames.length === 0 ||
        selectedRoomNames.includes(room?.stdRoomName || room?.roomName);
      const matchBoardBassis =
        selectedBoardBasis.length === 0 ||
        selectedBoardBasis.includes(room?.policy?.boardBasis?.type);
      const matchRefund = !filterRefundable || room.refundable === true;
      const breakfast = !hasBreakfast || room.hasBreakfast === true;
      const matchFreeCancel =
        !filterFreeCancel || room.freeCancelation === true;
      const matchRecId =
        !activeRecommendationId ||
        room.recommendationId === activeRecommendationId;
      return (
        matchName &&
        matchRefund &&
        breakfast &&
        matchFreeCancel &&
        matchRecId &&
        matchBoardBassis
      );
    });
  }, [
    matchedRooms,
    selectedRoomNames,
    filterRefundable,
    hasBreakfast,
    filterFreeCancel,
    activeRecommendationId,
    selectedBoardBasis,
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredRooms.length / PAGE_SIZE);

  const paginatedRooms = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredRooms.slice(start, end);
  }, [filteredRooms, currentPage]);
  // console.log(roomRate);
  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredRooms.length]);
  useEffect(() => {
    window.scrollTo({ top: currentPage === 1 ? 0 : 500, behavior: 'smooth' }); // Scroll on page change
  }, [currentPage]);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const ErrorMsg = () => (
    <Box textAlign="center" p={2}>
      <Typography variant="body2" color="error" fontWeight={500}>
        ⚠️ {error}
      </Typography>
      <Button
        onClick={() => navigate(-1)}
        sx={{
          bgcolor: 'var(--primary)',
          px: 3,
          mt: 1,
          borderRadius: 5,
          color: '#fff',
          textTransform: 'none',
          '&:hover': { bgcolor: 'var(--primary)' },
        }}
      >
        Try Again
      </Button>
    </Box>
  );

  const NoData = () => (
    <Typography
      variant="body2"
      color="text.secondary"
      textAlign="center"
      mt={2}
    >
      No room data available.
    </Typography>
  );

  const renderPaginationButtons = () => {
    const pageButtons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      pageButtons.push(
        <Button
          key={page}
          variant={page === currentPage ? 'contained' : 'outlined'}
          onClick={() => handlePageChange(page)}
          sx={{
            mx: 0.5,
            width: 28,
            height: 28,
            minWidth: 0,
            p: 0,
            borderRadius: '50%',
            backgroundColor:
              page === currentPage ? 'var(--primary)' : 'transparent',
            color: page === currentPage ? '#fff' : 'var(--secondary)',
            border:
              page === currentPage ? 'none' : '1px solid var(--secondary)',
            '&:hover': {
              backgroundColor:
                page === currentPage ? 'var(--primary)' : 'rgba(0,0,0,0.04)',
            },
          }}
        >
          {page}
        </Button>
      );
    }

    return (
      <Box mt={3} display="flex" justifyContent="center" flexWrap="wrap">
        <Button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          sx={{
            mx: 0.5,
            width: 28,
            height: 28,
            minWidth: 0,
            p: 0,
            borderRadius: '50%',
            border:
              currentPage === 1
                ? '1px solid var(--disable)'
                : '1px solid var(--secondary)',
          }}
        >
          <KeyboardArrowRightIcon
            sx={{
              transform: 'rotate(180deg)',
              fontSize: 20,
              color: currentPage === 1 ? 'var(--disable)' : 'var(--primary)',
            }}
          />
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          sx={{
            mx: 0.5,
            width: 28,
            height: 28,
            minWidth: 0,
            p: 0,
            borderRadius: '50%',
            border:
              currentPage === 1
                ? '1px solid var(--disable)'
                : '1px solid var(--secondary)',
          }}
        >
          <KeyboardDoubleArrowRightIcon
            sx={{
              transform: 'rotate(180deg)',
              fontSize: 20,
              color: currentPage === 1 ? 'var(--disable)' : 'var(--primary)',
            }}
          />
        </Button>

        {pageButtons}

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          sx={{
            mx: 0.5,
            width: 28,
            height: 28,
            minWidth: 0,
            p: 0,
            borderRadius: '50%',
            border:
              currentPage === totalPages
                ? '1px solid var(--disable)'
                : '1px solid var(--secondary)',
          }}
        >
          <KeyboardArrowRightIcon
            sx={{
              fontSize: 20,
              color:
                currentPage === totalPages
                  ? 'var(--disable)'
                  : 'var(--primary)',
            }}
          />
        </Button>
        <Button
          onClick={() => handlePageChange(totalPages, 'last')}
          disabled={currentPage === totalPages}
          sx={{
            mx: 0.5,
            width: 28,
            height: 28,
            minWidth: 0,
            p: 0,
            borderRadius: '50%',
            border:
              currentPage === totalPages
                ? '1px solid var(--disable)'
                : '1px solid var(--secondary)',
          }}
        >
          <KeyboardDoubleArrowRightIcon
            sx={{
              fontSize: 20,
              color:
                currentPage === totalPages
                  ? 'var(--disable)'
                  : 'var(--primary)',
            }}
          />
        </Button>
      </Box>
    );
  };
  // console.log(hotelData);
  return (
    <div ref={roomDiv}>
      <Box>
        <HotelRoomFilter
          total={matchedRooms.length}
          filter={filteredRooms.length}
          uniqueRoomNames={uniqueRoomNames}
          handleRoomTypeChange={handleRoomTypeChange}
          selectedRoomNames={selectedRoomNames}
          roomTypeOptions={roomTypeOptions}
          onClickRefund={() => dispatch(toggleRefundable())}
          handleBoardBasisChange={handleBoardBasisChange}
          selectedBoardBasis={selectedBoardBasis}
          onClickBreakfast={() => dispatch(toggleABreakfast())}
          onClickFree={() => dispatch(toggleFreeCancel())}
          filterFreeCancel={filterFreeCancel}
          filterRefundable={filterRefundable}
          hasBreakfast={hasBreakfast}
          refundableCount={refundableCount}
          freeCancelCount={freeCancelCount}
          breakfastItemsCount={breakfastItemsCount}
        />
        {!error ? (
          <Box
            sx={{
              p: 1,
              bgcolor: 'var(--white)',
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} md={9}>
                <Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: 'var(--gray)' }}>
                          {['Room Type', 'Guest', 'Price'].map((head) => (
                            <TableCell
                              key={head}
                              sx={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                p: 1.2,
                                color: '#344258',
                                border: '0.5px solid #DADDE3',
                                display: {
                                  xs:
                                    head === 'Guest'
                                      ? 'none'
                                      : head === 'Price'
                                      ? 'none'
                                      : '',
                                  md: 'table-cell',
                                },
                              }}
                            >
                              {head}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>

                      <RoomSelectionItem roomData={paginatedRooms} />
                    </Table>
                  </TableContainer>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box
                  sx={{
                    display: { xs: 'none ', md: 'block ' },
                  }}
                >
                  <RoomSelectionNext
                    loading={Selectionloading}
                    traceId={traceIdUpdate}
                    hotelId={hotelId}
                    cityName={
                      hotelData?.contact?.address?.city?.name || 'unknown'
                    }
                    checkIn={checkIn}
                    checkOut={checkOut}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <ErrorMsg />
        )}
        {!loading && !error && filteredRooms.length === 0 && <NoData />}
        {!error &&
          filteredRooms.length > PAGE_SIZE &&
          renderPaginationButtons()}
      </Box>
    </div>
  );
};

export default HotelRoomList;
