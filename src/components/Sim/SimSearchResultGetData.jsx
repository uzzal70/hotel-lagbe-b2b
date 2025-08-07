import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { baseUrl } from '../../../baseurl';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  SwipeableDrawer,
  useMediaQuery,
} from '@mui/material';
import SimSearchBox from './SimSearchBox';
import SimCardList from './content/SimCardList';
import SimCardListSkeleton from './content/SimCardListSkeleton';
import BackButton from '../Common/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../redux/slices/modalOpen';
import ESimFilter from './ESimFilter';
import {
  setDynamicFilters,
  setDynamicPriceRange,
} from '../../redux/slices/simFilterSlice';
import getAuthToken from '../Common/getAuthToken';
import hotel from '../../assets/images/hotel';

const SimSearchResultGetData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filterModal } = useSelector((state) => state.modalValue);
  const [searchParams] = useSearchParams();
  const encodedQuery = searchParams.get('query');

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let decodedQuery = {};
  try {
    if (encodedQuery) {
      decodedQuery = JSON.parse(decodeURIComponent(encodedQuery));
    }
  } catch (error) {
    console.error('Error decoding query:', error);
    decodedQuery = {};
  }

  const { count, type, region, country } = decodedQuery;
  // Get filter values from Redux
  const filters = useSelector((state) => state.simFilters);
  const token = getAuthToken();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const url = `${baseUrl}/core/mobileDataSim/packages?type=${type}&countryCode=${country}&region=${region}`;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // if (!response.ok) {
        //   throw new Error(`Error ${response.status}: ${response.statusText}`);
        // }
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.message}`);
        }
        const result = await response.json();
        if (result.status === 'failed') {
          throw new Error(result.message || 'No packages available.');
        }

        if (!result.data || result.data.length === 0) {
          throw new Error('No packages available.');
        }
        setData(result);
        const sortedData =
          result.data &&
          result.data?.sort(
            (a, b) => parseFloat(a?.netPrice) - parseFloat(b?.netPrice)
          );
        // Update Redux state with calculated price range
        dispatch(setDynamicPriceRange(sortedData));
        dispatch(setDynamicFilters({ data: result.data }));
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Something went wrong while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, region, country]);

  // Apply Filters (Automatically)
  const filteredData = data?.data?.filter((item) => {
    return (
      // Filtering by price range
      parseFloat(item.netPrice) >= filters.priceRange[0] &&
      parseFloat(item.netPrice) <= filters.priceRange[1] &&
      // Filtering by plan size (Convert data string to number)
      (!filters.planSize ||
        parseFloat(item.data) === parseFloat(filters.planSize)) &&
      // Filtering by validity (using 'day' property)
      (!filters.validity || item.day === parseInt(filters.validity)) &&
      // Filtering by voice/SMS (checkbox)
      (!filters.voiceSms || item.voiceSms === filters.voiceSms)
    );
  });

  // Apply Sorting
  if (filteredData) {
    filteredData.sort((a, b) => {
      if (filters.sortBy === 'cheapest')
        return parseFloat(a.netPrice) - parseFloat(b.netPrice);
      if (filters.sortBy === 'mostData')
        return parseFloat(b.data) - parseFloat(a.data);
      if (filters.sortBy === 'leastData')
        return parseFloat(a.data) - parseFloat(b.data);
      if (filters.sortBy === 'lowestPricePerGB')
        return a.pricePerGB - b.pricePerGB;
      return 0;
    });
  }
  const isSmallDevice = useMediaQuery('(max-width:900px)');
  const handleToggle = (key) => {
    dispatch(toggleModal({ modalName: key }));
  };
  return (
    <div>
      <Box
        sx={{ mb: { xs: 10, md: 0 }, minHeight: '100vh', position: 'relative' }}
      >
        <Container sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
          <Box pt={1.5}>
            {loading ? (
              <Box
                sx={{
                  bgcolor: 'var(--white)',
                  borderRadius: 1,
                  p: 2,
                }}
              >
                <Grid container spacing={2}>
                  {[...Array(4)].map((_, index) => (
                    <Grid key={index} item xs={12} md={3}>
                      <Skeleton
                        variant="rectangular"
                        sx={{ height: '70px', width: '100%', borderRadius: 1 }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <Box>
                {isSmallDevice && (
                  <Box
                    sx={{
                      bgcolor: 'var(--primary)',
                      display: 'flex',
                      borderRadius: 1,
                      justifyContent: 'space-between',
                      button: {
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'var(--primary-hover)',
                        },
                        color: 'var(--white)',
                        textTransform: 'capitalize',
                      },
                    }}
                  >
                    <Button
                      onClick={() => navigate('/dashboard?query=Sim')}
                      variant="outline"
                    >
                      <BackButton />
                    </Button>

                    <Button
                      onClick={() => handleToggle('filterModal')}
                      variant="outline"
                    >
                      Filter
                    </Button>
                  </Box>
                )}
                <SimSearchBox
                  p={{ xs: '0px 16px', md: '5px 16px' }}
                  country={country}
                  region={region}
                  type={type}
                  count={count}
                />
              </Box>
            )}
          </Box>
          <Grid container columnSpacing={{ xs: 1, lg: 1.5 }} mt={1.5}>
            <Grid item lg={2.8} display={{ xs: 'none', lg: 'flex' }}>
              {loading ? (
                <Box
                  sx={{
                    bgcolor: 'var(--white)',
                    borderRadius: 1,
                    p: 2,
                    width: '100%',
                  }}
                >
                  <Grid container spacing={2}>
                    {[...Array(7)].map((_, index) => (
                      <Grid key={index} item xs={12}>
                        <Skeleton
                          variant="rectangular"
                          sx={{
                            height: '50px',
                            width: '100%',
                            borderRadius: 1,
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : error ? (
                <Box></Box>
              ) : data?.data?.length > 0 ? (
                <ESimFilter data={data?.data} />
              ) : (
                ''
              )}
            </Grid>

            <Grid item xs={12} md={12} lg={9.2}>
              <Box sx={{ width: '100%' }}>
                {loading ? (
                  <SimCardListSkeleton count={4} />
                ) : error ? (
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        mt: 2,
                        color: 'red',
                        height: '40vh',
                        width: '100%',
                        position: 'absolute',
                        margin: 'auto',
                        left: 0,
                        right: 0,
                      }}
                    >
                      <Box>
                        <Box>
                          <img src={hotel.noPack} alt="" />
                        </Box>
                        <br />
                        <Alert severity="error">
                          {error || 'No packages found.'}
                        </Alert>
                        <Button
                          onClick={() => navigate('/dashboard?query=Sim')}
                          variant="contained"
                          sx={{
                            mt: 2,
                            textAlign: 'center',
                            bgcolor: 'var(--primary)',
                            '&:hover': {
                              backgroundColor: 'var(--primary)',
                            },
                          }}
                        >
                          Again Search
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ) : filteredData?.length > 0 ? (
                  <SimCardList fData={filteredData} />
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      mt: 2,
                      color: 'red',
                      height: '40vh',
                      width: '100%',
                    }}
                  >
                    <img src={hotel.noPack} alt="" />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={filterModal}
            onClose={() => handleToggle('filterModal', false)}
            onOpen={() => handleToggle('filterModal', true)}
            sx={{
              '.MuiPaper-root': {
                width: '60%',
                // p: 2,
              },
            }}
          >
            <Box sx={{ width: '100%' }}>
              {loading ? (
                <Box
                  sx={{
                    bgcolor: 'var(--white)',
                    borderRadius: 1,
                    p: 2,
                  }}
                >
                  <Grid container spacing={2}>
                    {[...Array(7)].map((_, index) => (
                      <Grid key={index} item xs={12} md={3}>
                        <Skeleton
                          variant="rectangular"
                          sx={{
                            height: '40px',
                            width: '100%',
                            borderRadius: 1,
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : error ? (
                <Box></Box>
              ) : data?.data?.length > 0 ? (
                <ESimFilter data={data?.data} />
              ) : (
                ''
              )}
            </Box>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SimSearchResultGetData;
