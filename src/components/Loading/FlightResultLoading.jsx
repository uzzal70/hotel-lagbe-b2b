import { Skeleton, Box, Stack, Grid } from '@mui/material';
import FlightLayoutLoading from './FlightLayoutLoading';
import SliderLoading from './SliderLoading';

// eslint-disable-next-line react/prop-types
const FlightResultLoading = ({ tripType }) => {
  return (
    <Box sx={{ width: '100%' }}>
      {/* slider */}
      <SliderLoading />

      {/* result */}
      {Array.from({
        length: 5,
      }).map((_, i) => (
        <Box key={i} mt={2}>
          <Box
            sx={{
              bgcolor: 'var(--white)',
              borderRadius: '10px',
              my: 1.5,
            }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                sm={12}
                md={9}
                sx={{
                  pl: { xs: 1, md: 2 },
                  pt: { xs: 1, md: 2 },
                  pb: { xs: 1, md: 2 },
                  pr: { xs: 1, md: 0 },
                }}
              >
                <Stack
                  direction={{ xs: 'column', md: 'column' }}
                  justifyContent="space-between"
                  sx={{ height: '100%' }}
                >
                  {/* 1st Section  */}
                  {/* for only mobile  */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ display: { xs: 'flex', md: 'none' } }}
                  >
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={{ xs: 0, md: 1 }}
                    alignItems="start"
                    order={{ xs: 2, sm: 2, md: 1 }}
                  >
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        fontSize: '1rem',
                        width: { xs: '70px', md: '100px' },
                        borderRadius: '5px',
                      }}
                    />
                    <Stack direction="row" alignItems="center" spacing={0}>
                      <Box display={{ xs: 'none', md: 'block' }}>
                        <Skeleton
                          variant="rectangular"
                          sx={{
                            fontSize: '1rem',
                            width: { xs: '70px', md: '100px' },
                            borderRadius: '5px',
                          }}
                        />
                      </Box>
                    </Stack>
                  </Stack>

                  {/* 2nd Section  */}
                  <Grid order={{ xs: 1, sm: 1, md: 2 }}>
                    {/* Flight layout  */}
                    {Array.from({
                      length: tripType === 'oneway' ? 1 : 2,
                    }).map((_, i) => (
                      <FlightLayoutLoading key={i} />
                    ))}
                  </Grid>

                  {/* 3rd Section  */}
                  <Grid
                    container
                    justifyContent="space-between"
                    order={{ xs: 3 }}
                    sx={{
                      pl: { xs: 0, md: 7 },
                      display: { xs: 'none', md: 'flex' },
                    }}
                  >
                    <Grid item>
                      <Stack direction="row" spacing={0.5}>
                        <Skeleton
                          variant="text"
                          sx={{
                            fontSize: '1.5rem',
                            width: { xs: '30px', md: '30px' },
                          }}
                        />
                        <Skeleton
                          variant="text"
                          sx={{
                            fontSize: '1.5rem',
                            width: { xs: '30px', md: '30px' },
                          }}
                        />

                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                          <Skeleton
                            variant="text"
                            sx={{
                              fontSize: '1.5rem',
                              width: { xs: '30px', md: '30px' },
                            }}
                          />
                        </Box>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                          <Skeleton
                            variant="text"
                            sx={{
                              fontSize: '1.5rem',
                              width: { xs: '30px', md: '30px' },
                            }}
                          />
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item display="flex" pt={{ xs: '', md: 0.5 }}>
                      {window.innerWidth < 1025 && window.innerWidth > 900 ? (
                        ''
                      ) : (
                        <Skeleton
                          variant="rectangular"
                          sx={{
                            fontSize: '1rem',
                            borderRadius: '3px',
                            width: { xs: '55px', md: '70px' },
                          }}
                        />
                      )}
                      &nbsp;&nbsp;
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          fontSize: '1rem',
                          borderRadius: '3px',
                          width: { xs: '55px', md: '70px' },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>

              {/* Price Section  mobile and dexktop both */}
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                sx={{
                  height: 'auto',
                  p: { xs: 1, md: 1 },
                  py: { xs: 0, md: 1 },
                }}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Grid>

              {/* only mobile  bottom button and baggage*/}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  width: '100%',
                  my: 0,
                  p: 1,
                  display: { md: 'none' },
                }}
              >
                <Stack direction="row" spacing={0.5}>
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: '1.5rem',
                      width: '30px',
                    }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: '1.5rem',
                      width: '30px',
                    }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: '1.5rem',
                      width: { xs: '55px', md: '65px' },
                    }}
                  />
                </Stack>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: '1.5rem',
                        width: { xs: '35px', md: '50px' },
                      }}
                    />
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: '1.5rem',
                        width: { xs: '35px', md: '50px' },
                      }}
                    />
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          </Box>
        </Box>
      ))}

      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Stack direction="row" spacing={{ xs: 1, md: 2 }} justifyContent="end">
          <Skeleton
            variant="circular"
            sx={{
              width: { xs: 30, md: 40 },
              height: { xs: 30, md: 40 },
            }}
          />
          <Skeleton
            variant="circular"
            sx={{
              width: { xs: 30, md: 40 },
              height: { xs: 30, md: 40 },
            }}
          />
          <Skeleton
            variant="circular"
            sx={{
              width: { xs: 30, md: 40 },
              height: { xs: 30, md: 40 },
            }}
          />
          <Skeleton
            variant="circular"
            sx={{
              width: { xs: 30, md: 40 },
              height: { xs: 30, md: 40 },
            }}
          />
          <Skeleton
            variant="circular"
            sx={{
              width: { xs: 30, md: 40 },
              height: { xs: 30, md: 40 },
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default FlightResultLoading;
