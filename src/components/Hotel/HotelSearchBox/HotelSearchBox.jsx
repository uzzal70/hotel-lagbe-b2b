/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import HotelForm from './HotelForm';
import moment from 'moment';
import { setFilters } from '../../../redux/slices/hotelFiltersSlice';
import { checkOutClose } from '../../../redux/slices/modalOpen';
import TokenToName from '../../Common/TokenToName';
import getAuthToken from '../../Common/getAuthToken';
import { baseUrlHotel } from '../../../../baseurl';
const HotelSearchBox = ({ pt, filterNone }) => {
  const tokenise = TokenToName();
  const token = getAuthToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialState = useSelector((state) => state.hotel);
  const defaultFilters = {
    hotelName: '',
    ratings: [],
    finalRate: '',
    freeBreakfast: false,
    isRefundable: false,
    subLocationIds: null,
    facilities: [],
    type: [],
    tags: null,
    reviewRatings: null,
    relevance: true,
  };

  const resetFilters = () => {
    dispatch(setFilters(defaultFilters));
  };

  const handleCloseModal = () => {
    dispatch(checkOutClose());
  };

  const handleSearch = async () => {
    try {
      resetFilters();
      handleCloseModal();
      const checkIn = moment(initialState.dateRange[0].startDate).format(
        'YYYY-MM-DD'
      );
      const checkOut = moment(initialState.dateRange[0].endDate).format(
        'YYYY-MM-DD'
      );
      const label = initialState?.selectedOption?.label;
      const nationality = initialState?.nationality;

      // Validate destination
      if (!label) {
        toast.error('Please select a destination.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        return;
      }

      // Validate check-in and check-out date difference
      if (checkIn >= checkOut) {
        toast.error('Check-out date must be after check-in date.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        return;
      }

      // Validate nationality
      if (!nationality) {
        toast.error('Please select your nationality.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        return;
      }

      const searchBody = {
        label,
        locationId: initialState?.selectedOption?.value || null,
        hotelId: initialState?.selectedOption?.hotelId || null,
        checkIn,
        checkOut,
        freeBreakfast: initialState?.filters?.freeBreakfast || false,
        isRefundable: initialState?.filters?.isRefundable || false,
        subLocationIds: null,
        ratings: initialState?.filters?.ratings || null,
        facilities: null,
        type: null,
        tags: null,
        reviewRatings: null,
        finalRate: '',
        relevance: initialState?.relevance || true,
        nationality,
        numberofRooms: initialState?.rooms || 1,
        coordinates: initialState?.selectedOption?.details?.coordinates || null,
        date: new Date(),
      };
      const url = `${baseUrlHotel}/${tokenise?.email || ''}?location=${
        label ||
        initialState?.selectedOption?.value ||
        initialState?.selectedOption?.hotelId ||
        ''
      }&checkInDate=${checkIn || ''}&checkOutDate=${checkOut || ''}`;
      // Fire-and-forget API call
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const encodedQuery = encodeURIComponent(JSON.stringify(searchBody));
      navigate(`/dashboard/hotel?query=${encodedQuery}`);
    } catch (error) {
      toast.error('An error occurred during search.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'var(--white)',
        margin: 'auto',
        borderRadius: '8px',
        p: { xs: 1, sm: 2, md: 2.5, lg: 3 },
        pt: pt || { xs: 4, sm: 2, md: 2.5, lg: 5 },
        minHeight: '100px',
      }}
    >
      <HotelForm handleSearch={handleSearch} filterNone={filterNone} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  );
};

export default HotelSearchBox;
