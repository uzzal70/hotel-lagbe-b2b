/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Box, Button, Container, Grid } from '@mui/material';
import HotelFilter from './content/HotelFilter';
import { HotelCard } from './content/HotelCard';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigationType } from 'react-router-dom';
// import Token from '../Common/Token';
import { useDispatch, useSelector } from 'react-redux';
import ApartmentIcon from '@mui/icons-material/Apartment';
import {
  setDateRange,
  setNationality,
  setRooms,
  setSelectedOption,
} from '../../redux/slices/hotelSearchSlice';
import CustomLinearProgress from '../Loading/CustomLinearProgress';
import HotelHeaderFilter from './HotelHeaderFilter';
import useHotelFilterEffect from './content/useHotelFilterEffect';
import { setFilters } from '../../redux/slices/hotelFiltersSlice';
import ListSkeleton from './HotelLoading/ListSkeleton';
import FilterLoading from '../Loading/FilterLoading';
import HotelModifyHeader from './HotelModifyHeader';
import { baseUrlHotel } from '../../../baseurl';
import {
  resetAll,
  resetSelections,
} from '../../redux/slices/roomSelectionSlice';
import getAuthToken from '../Common/getAuthToken';
import VideoLoader from '../Loading/VideoLoader';

const HotelSearchResult = () => {
  // const agentId = Token();
  const token = getAuthToken();
  const navigationType = useNavigationType();
  const location = useLocation();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const queryParams = new URLSearchParams(location.search);
  const encodedQuery = queryParams.get('query');
  const decodedQuery = encodedQuery
    ? JSON.parse(decodeURIComponent(encodedQuery))
    : null;
  const [data, setData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [isScrollLoading, setIsScrollLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const body = JSON.stringify(decodedQuery);
  const selectedOption = {
    value: decodedQuery.locationId,
    label: decodedQuery?.label,
    hotelId: decodedQuery?.hotelId,
    details: {
      coordinates: decodedQuery.coordinates,
    },
  };

  const dateRange = [
    {
      startDate: new Date(decodedQuery.checkIn),
      endDate: new Date(decodedQuery.checkOut),
      key: 'selection',
    },
  ];
  // Calculate totals rooms and person
  const numberOfAdults = decodedQuery?.numberofRooms?.flatMap(
    (room) => room.adults
  );
  const numberOfChildAges = decodedQuery?.numberofRooms.map(
    (room) => room.childrenAges
  );

  const fetchData = async (append = false, currentPage = 1, traceId) => {
    if (append) {
      setIsScrollLoading(true);
    } else if (!append && !isInitialLoading && !filterLoading) {
      setFilterLoading(true);
      setIsInitialLoading(false);
    } else {
      setIsInitialLoading(true);
      setFilterLoading(false);
    }
    setError(null);

    // const normalizeRatings = (ratings) =>
    //   ratings?.flatMap((r) => r?.toString()?.split(','));

    const requestBody = JSON.stringify({
      ...decodedQuery,
      hotelIds: decodedQuery.hotelId || null,
      locationId: decodedQuery.locationId,
      freeBreakfast: filters?.freeBreakfast || false,
      isRefundable: filters?.isRefundable || false,
      subLocationIds: null,
      ratings: filters?.ratings ? filters.ratings : null, // Convert to string
      facilities: filters?.facilities || null,
      type: filters?.type || null,
      tags: null,
      reviewRatings: filters?.reviewRatings,
      finalRate: filters?.finalRate || '',
      nationality: decodedQuery?.nationality?.value || 'BD',
      hotelName: filters?.hotelName?.trim() || '',
      numberOfAdults: numberOfAdults || [1],
      childAges: numberOfChildAges || [],
      // organizationCode: 'orftjn',
      traceId: traceId ? null : data?.[0]?.traceId || null,
      priceRange: {
        min: filters?.priceRange?.min || 0,
        max: filters?.priceRange?.max || 0,
      },
      page: currentPage, // Dynamic Pagination
      pageSize: 30,
      relevance: filters?.finalRate === '' ? true : false,
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
        setError(result?.errors);
        // setIsInitialLoading(true);
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
            relevance: true,
          })
        );
      }
    } catch (err) {
      setError(err.message);
      setIsInitialLoading(true);
    } finally {
      if (append) {
        setIsScrollLoading(false);
        setFilterLoading(false);
      } else {
        setIsInitialLoading(false);
        setFilterLoading(false);
      }
    }
  };

  // Initial Load
  useEffect(() => {
    dispatch(setDateRange(dateRange));
    dispatch(setSelectedOption(selectedOption));
    dispatch(setRooms(decodedQuery?.numberofRooms));
    dispatch(setNationality(decodedQuery?.nationality));
    setPage(1);
    const traceId = true;
    fetchData(false, 1, traceId);
  }, [body]);

  useHotelFilterEffect(filters, fetchData, setPage, body);
  // Scroll Detection
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const isBottom =
  //       window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

  //     if (isBottom && !isScrollLoading && page < totalPages) {
  //       setPage((prev) => prev + 1);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [isScrollLoading, page, totalPages]);
  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

      if (isBottom && !isScrollLoading && !filterLoading && page < totalPages) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrollLoading, filterLoading, page, totalPages]);

  // Fetch on scroll page change
  useEffect(() => {
    if (page > 1) fetchData(true, page);
  }, [page]);

  const resetFilters = () => {
    dispatch(setFilters(defaultFilters));
  };

  useEffect(() => {
    if (navigationType === 'POP') {
      dispatch(resetSelections());
      resetAll();
    }
  }, [navigationType]);

  useEffect(() => {
    dispatch(resetSelections());
    resetAll();
  }, [dispatch]);
  const knownErrors = [
    'Something Went Wrong.',
    'Something Went Wrong',
    'Failed to fetchs.',
  ];
  const errorText =
    'Please refresh the page again to view the best hotel rates — the error was caused by multiple providers';
  const getErrorMessage = (errors) =>
    knownErrors.includes(errors) ||
    (Array.isArray(error) && knownErrors.includes(errors[0]))
      ? 'We apologize — no response was received from the hotel supplier. Please try again.'
      : errors ||
        'We apologize — no response was received from the hotel supplier. Please try again.';

  return (
    <Box
      sx={{
        mb: {
          xs: 10,
          md: 0,
          minHeight: '100vh',
          position: 'relative',
        },
        // bgcolor: 'var(--white)',
      }}
    >
      <Container sx={{ px: { xs: 1, sm: 2, md: '' } }}>
        <HotelModifyHeader
          filterData={data}
          filters={filters}
          resetFilters={resetFilters}
          filterLoading={filterLoading}
        />
        <Box>
          {isInitialLoading ? (
            <Box>
              <CustomLinearProgress isInitialLoading={isInitialLoading} />
              <VideoLoader isInitialLoading={isInitialLoading} />
            </Box>
          ) : error ? (
            <Box color="var(--red)" sx={{ textAlign: 'center', my: 2 }}>
              {getErrorMessage(error)}
              <br />

              <Button
                sx={{
                  mt: 3,
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'var(--primary)' },
                  px: 4,
                  borderRadius: 5,
                  textTransform: 'capitalize',
                }}
                onClick={() => window.location.reload()}
              >
                Search Again
              </Button>
            </Box>
          ) : (
            <Box>
              <Box>
                <Grid container columnSpacing={{ xs: 1, lg: 1.5 }} mt={1.5}>
                  <Grid
                    item
                    lg={2.8}
                    display={{ xs: 'none', lg: 'flex' }}
                    sx={{
                      position: 'sticky',
                      top: '100px',
                      alignSelf: 'flex-start',
                      height: 'fit-content', // ensures it doesn't stretch the full height
                    }}
                  >
                    {data?.length > 0 ? (
                      <HotelFilter
                        filterData={data}
                        filters={filters}
                        resetFilters={resetFilters}
                        filterLoading={filterLoading}
                      />
                    ) : (
                      <FilterLoading />
                    )}
                  </Grid>
                  <Grid item xs={12} md={12} lg={9.2}>
                    <Box sx={{ width: '100%' }}>
                      <Box>
                        <HotelHeaderFilter
                          resetFilters={resetFilters}
                          totalHotel={data?.[0]?.totalCount}
                          filterLoading={filterLoading}
                        />
                      </Box>
                      {filterLoading ? (
                        <ListSkeleton item={5} />
                      ) : (
                        <>
                          {storeData?.map((hotel, idx) => (
                            <HotelCard
                              key={idx}
                              data={hotel}
                              resetFilters={resetFilters}
                              traceId={data?.[0]?.traceId}
                              nationality={decodedQuery?.nationality}
                              numberofRooms={decodedQuery?.numberofRooms}
                            />
                          ))}
                        </>
                      )}

                      {storeData?.length === 0 && (
                        <Box
                          sx={{
                            pt: 2,
                            textAlign: 'center',
                          }}
                        >
                          <Alert
                            variant="outlined"
                            severity="info"
                            color="warning"
                            sx={{
                              p: 0,
                              pl: 1,
                            }}
                          >
                            No results matched your criteria. Please explore
                            similar hotels below or try searching again.
                          </Alert>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              resetFilters();
                              window.location.reload();
                            }}
                            size="small"
                            sx={{
                              textTransform: 'capitalize',
                              border: '1px solid var(--primary)',
                              color: 'var(--primary)',
                              mt: 2,
                              width: '150px',
                            }}
                          >
                            Reload Page
                          </Button>
                        </Box>
                      )}
                      {data?.[0]?.similarHotels?.length > 0 && (
                        <Box>
                          <Box
                            sx={{
                              color: 'var(--primary)',
                              mt: { xs: 1, md: 2 },
                              fontSize: { xs: 16, md: 20 },
                              textAlign: 'center',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 500,
                            }}
                          >
                            <ApartmentIcon
                              sx={{
                                color: '#FFB400',
                              }}
                            />
                            &nbsp;&nbsp; Recommended Hotels
                          </Box>
                          {data?.[0]?.similarHotels?.map((hotel, idx) => (
                            <HotelCard
                              key={idx}
                              data={hotel}
                              resetFilters={resetFilters}
                              traceId={data?.[0]?.traceId}
                              nationality={decodedQuery?.nationality}
                              numberofRooms={decodedQuery?.numberofRooms}
                            />
                          ))}
                        </Box>
                      )}
                      {(isInitialLoading || isScrollLoading) && (
                        <Box>
                          <ListSkeleton item={3} />
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default HotelSearchResult;
