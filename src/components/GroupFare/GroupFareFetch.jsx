import {
  Container,
  Box,
  Button,
  Grid,
  Stack,
  Skeleton,
  Typography,
} from '@mui/material';
import GroupFlight from './GroupFlight';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import { useEffect, useState } from 'react';
import ImageImport from '../../assets/ImageImport';
import { Link } from 'react-router-dom';
import CustomSearchInput from '../Common/CustomSearchInput';
import { baseUrl } from '../../../baseurl';

const GroupFareFetch = () => {
  const [searchWord, setSearchWord] = useState(null);
  const url = `${baseUrl}/core/group-fare/getAllGroupFaresByAgent?page=1&pageSize=50&searchWord=${
    searchWord || ''
  }`;
  const { data, isLoading, refetch } = useGetItemsQuery({ url });
  const handleChange = (event) => {
    const { value } = event.target;
    setSearchWord(value);
  };
  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [refetch, searchWord]);

  return (
    <Container>
      <Box
        sx={{
          bgcolor: 'var(--primary)',
          color: 'var(--white)',
          py: 0.5,
          px: 1,
          my: 2,
          borderRadius: '5px',
        }}
      >
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Grid item>
            <Box>Available Group Flight </Box>
          </Grid>
          <Grid item>
            <CustomSearchInput
              width={{ xs: '300px', md: '100%' }}
              name="bookingId"
              value={searchWord}
              placeholder="Enter a route or airline..."
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Box>
      {isLoading ? (
        <Box width="100%">
          <Grid container spacing={{ xs: 1, md: 1.5 }}>
            {Array.from({
              length: 12,
            }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Box>
                  <Box>
                    <Stack
                      direction={'row'}
                      alignItems="center"
                      spacing={1}
                      sx={{
                        bgcolor: 'var(--group-bgcolor)',
                        px: 1,
                        py: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: '30px', sm: '30px', md: '30px' },
                          height: { xs: '30px', sm: '30px', md: '30px' },
                          borderRadius: '50%',
                          overflow: 'hidden',
                        }}
                      >
                        <Skeleton variant="circular" width={30} height={30} />
                      </Box>
                      <Typography
                        noWrap
                        sx={{
                          fontSize: { xs: 12, md: 14 },
                          color: 'var(--primary)',
                        }}
                      >
                        <Skeleton width={80} />
                      </Typography>
                    </Stack>
                  </Box>

                  <Box
                    sx={{
                      bgcolor: 'var(--white)',
                      p: { xs: 1, md: 1.2 },
                    }}
                  >
                    <Stack
                      direction={'row'}
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={1}
                    >
                      <Typography
                        noWrap
                        sx={{
                          fontSize: { xs: 12, md: 14 },
                          color: 'var(--primary)',
                        }}
                      >
                        <Skeleton width={100} />
                      </Typography>
                      <Typography
                        noWrap
                        sx={{
                          fontSize: { xs: 12, md: 14 },
                          color: 'var(--primary)',
                        }}
                      >
                        <Skeleton width={80} />
                      </Typography>
                    </Stack>

                    <Typography
                      noWrap
                      sx={{
                        fontSize: { xs: 12, md: 14 },
                        color: 'var(--primary)',
                      }}
                    >
                      <Skeleton width={120} />
                    </Typography>

                    <Typography
                      noWrap
                      sx={{
                        fontSize: { xs: 12, md: 14 },
                        color: 'var(--primary)',
                      }}
                    >
                      <Skeleton width={80} />
                    </Typography>

                    <Typography
                      noWrap
                      sx={{
                        fontSize: { xs: 12, md: 14 },
                        color: 'var(--primary)',
                      }}
                    >
                      <Skeleton width={50} />
                    </Typography>
                  </Box>
                  <Stack
                    direction={'row'}
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                    sx={{
                      bgcolor: 'var(--gray)',
                      px: 1,
                      py: 0.8,
                    }}
                  >
                    <Typography
                      noWrap
                      sx={{
                        fontSize: { xs: 12, md: 14 },
                        color:
                          data?.seat === 0 || data?.seat === '0'
                            ? 'var(--red)'
                            : 'var(--dark-green)',
                        fontWeight: 500,
                      }}
                    >
                      <Skeleton width={100} />
                    </Typography>
                    <Skeleton variant="rectangular" width={80} height={30} />
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : data?.groupFares === undefined || data?.groupFares?.length <= 0 ? (
        <Box
          sx={{
            height: '90vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            img: {
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
              borderRadius: '10px',
              p: 2,
              width: { xs: '250px', sm: '400px', md: '600px' },
            },
          }}
        >
          <Box>
            <Box
              sx={{
                color: 'var(--red)',
                fontSize: { xs: 14, md: 18 },
                textAlign: 'center',
                mb: 2,
              }}
            >
              No group fare available.
            </Box>
            <Box
              sx={{
                textAlign: 'center',
                mb: 2,
              }}
            >
              <Button
                sx={{
                  textTransform: 'capitalize',
                  bgcolor: 'var(--primary)',
                  px: 2,
                  color: 'var(--white)',
                  fontWeight: 300,
                  ':hover': {
                    bgcolor: 'var(--primary)',
                  },
                }}
                component={Link}
                to={{
                  pathname: '/dashboard',
                }}
              >
                Search other flight
              </Button>
            </Box>

            <img src={ImageImport.nogroupfare} alt="" />
          </Box>
        </Box>
      ) : (
        <Box minHeight={'100vh'}>
          <Grid container spacing={{ xs: 1, md: 1.5 }}>
            {data?.groupFares?.map((item, i) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={i}>
                <GroupFlight data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default GroupFareFetch;
