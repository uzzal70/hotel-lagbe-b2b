import { useEffect, useRef } from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setDateRange } from '../../../redux/slices/hotelSearchSlice';
import moment from 'moment';
import HotelPhoneDateRangPicker from './HotelPhoneDateRangPicker';
import { checkInOpen, checkOutClose } from '../../../redux/slices/modalOpen';
import hotel from '../../../assets/images/hotel';
import { useMediaQuery, useTheme } from '@mui/material';
import { addDays } from 'date-fns';

const DateRangePicker = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const dateRange = useSelector((state) => state.hotel.dateRange);

  const { checkInModal, checkOutModal } = useSelector(
    (state) => state.modalValue
  );

  const handleOpenModal = (name) => {
    if (name === 'checkInModal') {
      checkInModal
        ? dispatch(checkOutClose(name))
        : dispatch(checkInOpen(name));
    } else if (name === 'checkOutModal') {
      checkOutModal
        ? dispatch(checkOutClose(name))
        : dispatch(checkInOpen(name));
    }
  };

  const handleCloseModal = () => {
    dispatch(checkOutClose());
  };

  const pickerRef = useRef(null);

  const dateRangeStyles = {
    '.rdrDateDisplay': {
      display: 'none', // Hide the date input fields
    },
    '.rdrMonthAndYearWrapper': {
      justifyContent: 'space-between',
      height: '0',
    },
    '.rdrYearPicker': {
      display: 'none', // Hide month/year dropdowns only
    },
    '.rdrMonthPicker': {
      display: 'none', // Hide month/year dropdowns only
    },
    '.rdrMonthName': {
      textAlign: 'center',
    },
    '.rdrNextButton': {
      textAlign: 'center',
      position: 'absolute',
      right: 0,
      top: 25,
    },
    '.rdrPprevButton': {
      textAlign: 'center',
      position: 'absolute',
      left: 0,
      top: 25,
    },
    '.rdrDayPassive': {
      // display: 'none', // Hide
    },
  };
  const defultDateRange = [
    {
      startDate: addDays(new Date(), 2),
      endDate: addDays(new Date(), 3),
      key: 'selection',
    },
  ];
  // useEffect(() => {
  //   dispatch(setDateRange(defultDateRange));
  // }, [dateRange]);

  const handleDateChange = (date) => {
    let updatedStartDate = dateRange[0]?.startDate;
    let updatedEndDate = dateRange[0]?.endDate;

    if (checkInModal) {
      updatedStartDate = date;

      // If current endDate is before or equal to new startDate, auto-set to next day
      if (!updatedEndDate || new Date(updatedEndDate) <= new Date(date)) {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        updatedEndDate = nextDay;
      }
    }

    if (checkOutModal) {
      // Prevent selecting a checkout date earlier than check-in
      if (new Date(date) <= new Date(updatedStartDate)) {
        alert('Checkout date must be after check-in date.');
        return;
      }
      updatedEndDate = date;
    }

    dispatch(
      setDateRange([
        {
          ...dateRange[0],
          startDate: updatedStartDate,
          endDate: updatedEndDate,
        },
      ])
    );

    if (checkInModal) handleCloseModal('checkInModal');
    if (checkOutModal) handleCloseModal('checkOutModal');
  };

  const startDate = moment(dateRange[0]?.startDate);
  const endDate = moment(dateRange[0]?.endDate);
  const nights = endDate.diff(startDate, 'days');
  useEffect(() => {
    dispatch(setDateRange(defultDateRange));
  }, []);
  return (
    <Box>
      {/* Desktop version */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 0.5,
          py: 0.2,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Grid container alignItems={'center'}>
            <Grid item xs={5} onClick={() => handleOpenModal('checkInModal')}>
              <Stack
                direction={'row'}
                spacing={0.8}
                sx={{
                  alignItems: 'center',
                }}
              >
                <img
                  src={hotel.arrod}
                  alt="Check-in"
                  style={{
                    width: '17px',
                    height: '17px',
                    objectFit: 'contain',
                  }}
                />
                <Box>
                  <Box
                    sx={{
                      fontWeight: 300,
                      fontSize: 10,
                      color: 'var(--disable)',
                    }}
                  >
                    Check-in
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'var(--primary)',
                      width: { xs: '100%', md: '55px', lg: '100%' },
                    }}
                    noWrap
                  >
                    {moment(dateRange[0]?.startDate).format('DD MMM, YYYY')}
                  </Typography>
                  <Box
                    sx={{
                      fontWeight: 300,
                      fontSize: 10,
                      color: 'var(--disable)',
                    }}
                  >
                    {moment(dateRange[0]?.startDate).format('dddd')}
                  </Box>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={2} textAlign={'center'}>
              <Box
                sx={{
                  fontSize: 10,
                  color: 'var(--disable)',
                  border: '1px solid var(--stroke)',
                  borderRadius: 1,
                }}
              >
                {nights} Night
              </Box>
            </Grid>
            <Grid item xs={5} onClick={() => handleOpenModal('checkOutModal')}>
              <Stack
                direction="row"
                spacing={0.8}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <img
                  src={hotel.arrou}
                  alt="Check-in"
                  style={{
                    width: '17px',
                    height: '17px',
                    objectFit: 'contain',
                  }}
                />
                <Box>
                  <Box
                    sx={{
                      fontSize: 10,
                      color: 'var(--disable)',
                      fontWeight: 300,
                    }}
                  >
                    Check-out
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 13,
                      color: 'var(--primary)',
                      fontWeight: 500,
                      width: { xs: '100%', md: '55px', lg: '100%' },
                    }}
                    noWrap
                  >
                    {moment(dateRange[0]?.endDate).format('DD MMM, YYYY')}
                  </Typography>
                  <Box
                    sx={{
                      fontWeight: 300,
                      fontSize: 10,
                      color: 'var(--disable)',
                    }}
                  >
                    {moment(dateRange[0]?.endDate).format('dddd')}
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          {(checkInModal || checkOutModal) && (
            <Box
              ref={pickerRef}
              sx={{
                background: 'white',
                padding: 1,
                borderRadius: 2,
                position: 'absolute',
                top: '115%',
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: 3,
                zIndex: 10,
              }}
            >
              <Box sx={{ mb: 1 }}>
                <Calendar
                  date={
                    checkInModal
                      ? new Date(dateRange[0]?.startDate || new Date())
                      : new Date(dateRange[0]?.endDate || new Date())
                  }
                  color="var(--primary)"
                  months={1}
                  minDate={
                    !checkInModal
                      ? new Date(dateRange[0]?.startDate || new Date())
                      : new Date()
                  }
                  onChange={handleDateChange}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {/* Mobile version  bn*/}
      {isMobile && (
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <HotelPhoneDateRangPicker
            handleDateChange={handleDateChange}
            dateRange={dateRange}
            dateRangeStyles={dateRangeStyles}
            checkInModal={checkInModal}
            checkOutModal={checkOutModal}
          />
        </Box>
      )}
    </Box>
  );
};

export default DateRangePicker;
