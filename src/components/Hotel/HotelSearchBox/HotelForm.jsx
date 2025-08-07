/* eslint-disable react/prop-types */
import { Box, Grid } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useDispatch, useSelector } from 'react-redux';
import LocationSearch from './LocationSearch';
import GuestRoomsComponent from './GuestRooms';
import Nationality from './Nationality';
import DateRangePicker from './DateRangePicker';
import HotelFormFilter from './HotelFormFilter';
import { toggleModal } from '../../../redux/slices/modalOpen';

const commonBoxStyle = {
  border: '1px solid var(--stroke)',
  borderRadius: '5px',
  p: 0.5,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

// Custom "Clear All" button

const HotelForm = ({ handleSearch, filterNone }) => {
  const selectedCountry = useSelector((state) => state.hotel.nationality);
  const modifyModal = useSelector((state) => state.modalValue.modifyModal);
  // const hotelDateOpen = useSelector((state) => state.modalValue.hotelDateOpen);

  // const [dateOpen, setDateOpen] = useState(false);
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(toggleModal({ modalName: 'modifyModal' }));
  };
  // const handleToggleDate = () => {
  //   dispatch(toggleHotelDateOpen({ hotelDateOpen: 'hotelDateOpen' }));
  // };
  // const handleOpenModal = () => {
  //   dispatch(closeModal({ modalName: 'hotelDateOpen' }));
  // };
  // const handleCloseModal = () => {
  //   dispatch(openModal({ modalName: 'hotelDateOpen' }));
  // };
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={1} alignItems="stretch">
        <Grid item xs={12} md={3.5}>
          <Box sx={commonBoxStyle}>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                bgcolor: '#EFF3FF',
                px: 1,
                py: 0.2,
                height: '100%',
              }}
            >
              <LocationSearch />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3.6}>
          <Box sx={commonBoxStyle}>
            {/* <DateRangePicker open={dateOpen} setOpen={setDateOpen} /> */}
            <DateRangePicker />
          </Box>
        </Grid>
        <Grid item xs={12} md={1.9}>
          <Box sx={{ ...commonBoxStyle }}>
            <GuestRoomsComponent />
          </Box>
        </Grid>

        <Grid item xs={12} md={1.5}>
          <Box sx={commonBoxStyle}>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                px: 1,
                py: 0.2,
                height: '100%',
              }}
            >
              <Nationality
                selectedOption={selectedCountry}
                // setSelectedOption={setSelectedCountry}
              />
            </Box>
          </Box>
        </Grid>
        {!filterNone && (
          <Grid
            item
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
            xs={12}
          >
            <HotelFormFilter />
          </Grid>
        )}

        <Grid item xs={12} md={1.5}>
          <Box
            sx={{
              bgcolor: 'var(--primary-btn)',
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
              handleSearch('hit');
              if (modifyModal === true) {
                handleToggle();
              }
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
      {!filterNone && (
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <HotelFormFilter />
        </Box>
      )}
    </Box>
  );
};

export default HotelForm;
