/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/slices/hotelFiltersSlice';
import { baseUrlHotel } from '../../../baseurl';
import getAuthToken from '../Common/getAuthToken';
// import { setFilters } from '../../redux/slices/hotelSearchSlice';

const HotelFetchData = ({ decodedQuery, trigger }) => {
  const token = getAuthToken();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const [data, setData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isScrollLoading, setIsScrollLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (append = false, currentPage = 1) => {
    if (append) {
      setIsScrollLoading(true);
    } else {
      setIsInitialLoading(true);
    }
    setError(null);

    const requestBody = JSON.stringify({
      label: 'Dhaka, Dhaka Division, Bangladesh',
      locationId: 364216,
      hotelId: null,
      checkIn: '2025-05-17',
      checkOut: '2025-05-20',
      freeBreakfast: false,
      isRefundable: false,
      subLocationIds: null,
      ratings: null,
      facilities: [],
      type: [],
      tags: null,
      reviewRatings: null,
      finalRate: 'asc',
      nationality: 'BD',
      hotelName: '',
      numberOfAdults: [1],
      childAges: [],
      page: currentPage,
      organizationCode: 'orftjn',
      traceId: '081a8ef4-66c6-4bac-8e02-466c46cb7fe9',
    });

    try {
      const response = await fetch(`${baseUrlHotel}/hotelSearch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: requestBody,
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();

      if (!result.results || result.results.length === 0) {
        if (!append) {
          setData([]);
          setStoreData([]);
        }
      } else {
        const updatedResults = append
          ? [...storeData, ...result.results[0].data]
          : result.results[0].data;

        const allData = append ? [...data, ...result.results] : result.results;

        setData(allData);
        setStoreData(updatedResults);
        setTotalPages(result?.results?.[0]?.totalPages || 1);

        const getMaxRating = (x) => {
          const reviewRatings = x?.results?.[0]?.facets?.reviewRatings ?? [];
          return reviewRatings.length
            ? Math.max(...reviewRatings.map((item) => item?.rating ?? 0))
            : null;
        };

        dispatch(
          setFilters({
            ...filters,
            userMaxRating: getMaxRating(result),
          })
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      if (append) {
        setIsScrollLoading(false);
      } else {
        setIsInitialLoading(false);
      }
    }
  };

  // Initial Load
  useEffect(() => {
    setPage(1);
    fetchData(false, 1);
  }, [decodedQuery, trigger, filters.reviewRatings]);

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (isBottom && !isScrollLoading && page < totalPages) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrollLoading, page, totalPages]);

  // Fetch on scroll page change
  useEffect(() => {
    if (page > 1) fetchData(true, page);
  }, [page]);
  
  return (
    <Box sx={{ p: 2 }}>
      {data.length === 0 && !isInitialLoading && (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          No hotels found. Try adjusting your filters.
        </Typography>
      )}

      {error && (
        <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box>Total page Count {totalPages}</Box>

      <Grid container spacing={2}>
        {storeData.map((hotel, index) => (
          <Grid item xs={12} key={index}>
            <Box
              mb={2}
              sx={{
                border: '1px solid red',
                p: 5,
              }}
            >
              Hotel Number {index}
              <Box>Name: {hotel.name}</Box>
              <Box>NUmber {hotel.providerHotelId}</Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {(isInitialLoading || isScrollLoading) && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default HotelFetchData;
