import { Box, Grid } from '@mui/material';
import DateRangePicker from './HotelSearchBox/DateRangePicker';
import GuestRoomsComponent from './HotelSearchBox/GuestRooms';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setDateRange } from '../../redux/slices/hotelSearchSlice';
const commonBoxStyle = {
  border: '1px solid var(--stroke)',
  borderRadius: '5px',
  p: 0.5,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};
const HotelSeachBar = ({ checkIn, checkOut, handleClick }) => {
  const dispatch = useDispatch();

  const initialDateRange = useSelector((state) => state.hotel.dateRange);
  const dateRange = [
    {
      startDate: new Date(initialDateRange?.[0]?.startDate || checkIn),
      endDate: new Date(initialDateRange?.[0]?.endDate || checkOut),
      key: 'selection',
    },
  ];

  useEffect(() => {
    dispatch(setDateRange(dateRange));
  }, []);

  return (
    <Box
      sx={{
        p: 1,
        border: '1px solid var(--light-stroke)',
        bgcolor: 'var(--white)',
        borderRadius: 1,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Box sx={commonBoxStyle}>
            <DateRangePicker />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ ...commonBoxStyle }}>
            <GuestRoomsComponent />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              bgcolor: 'var(--primary)',
              border: '1px solid gray',
              borderRadius: '5px',
              px: 1,
              py: 0.5,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              color: 'var(--white)',
              fontSize: 16,
            }}
            onClick={() => {
              handleClick('hit');
              //   if (modifyModal === true) {
              //     handleToggle();
              //   }
            }}
          >
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <SearchRoundedIcon />
              <span>Search</span>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HotelSeachBar;
