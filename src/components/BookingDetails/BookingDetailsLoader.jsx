import { Box, Grid, Skeleton, Stack, Typography } from '@mui/material';

const BookingDetailsLoader = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {[...new Array(4)].map((data, i) => (
          <Grid item md={3} xs={3} key={i}>
            <Skeleton
              variant="rectangular"
              sx={{
                my: 1,
                borderRadius: '3px',
                width: '100%',
                height: '50px',
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} mb={2}>
        {[...new Array(4)].map((data, i) => (
          <Grid item md={3} xs={3} key={i}>
            <Skeleton
              variant="rectangular"
              sx={{
                my: 1,
                borderRadius: '3px',
                width: '100%',
                height: '50px',
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Box>
        {[...new Array(3)].map((data, index) => (
          <Box
            sx={{
              mb: { xs: 1, md: 1.5 },
              border: '1px solid var(--gray)',
              borderRadius: '5px',
              overflow: 'hidden',
            }}
            key={index}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{
                justifyContent: 'space-between',
                bgcolor: 'var(--gray)',
                px: 2,
              }}
            >
              <Box>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    my: 1,
                    borderRadius: '3px',
                    width: '200px',
                    height: '30px',
                  }}
                />
              </Box>
              <Box sx={{ fontSize: 12 }}>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    my: 1,
                    borderRadius: '3px',
                    width: '150px',
                    height: '30px',
                  }}
                />
              </Box>
            </Stack>
            <Box sx={{ p: { xs: 1, md: 2 } }}>
              {[...new Array(1)]?.map((item, index, arr) => (
                <Box key={index}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={4} md={4}>
                      <Box
                        sx={{
                          fontSize: { xs: 12, md: 13 },
                          color: 'var(--black)',
                        }}
                      >
                        <Box
                          sx={{
                            mt: 1,
                            fontSize: 15,
                            fontWeight: { xs: 500, md: 600 },
                          }}
                        >
                          <Skeleton
                            variant="rectangular"
                            sx={{
                              my: 1,
                              borderRadius: '3px',
                              width: '100%',
                              height: '30px',
                            }}
                          />
                        </Box>
                        <Box>
                          <Skeleton
                            variant="rectangular"
                            sx={{
                              my: 1,
                              borderRadius: '3px',
                              width: '100%',
                              height: '30px',
                            }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: { xs: 12, md: 13 },
                            color: 'var(--black)',
                          }}
                          noWrap
                        >
                          <Skeleton
                            variant="rectangular"
                            sx={{
                              my: 1,
                              borderRadius: '3px',
                              width: '100%',
                              height: '30px',
                            }}
                          />
                        </Typography>
                        <Box>{item?.cabinClass}</Box>
                      </Box>
                    </Grid>
                    <Grid item xs={4} md={4} textAlign={'center'}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: { xs: 'center', md: 'start' },
                        }}
                      >
                        <Skeleton
                          variant="rectangular"
                          sx={{
                            my: 1,
                            borderRadius: '3px',
                            width: '100%',
                            height: '20px',
                          }}
                        />
                      </Box>

                      <Box
                        sx={{ position: 'relative', my: { xs: 0.3, md: 0 } }}
                        // className="dashed-top-line"
                      >
                        <Skeleton
                          variant="rectangular"
                          sx={{
                            my: 1,
                            borderRadius: '3px',
                            width: '100%',
                            height: '20px',
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: { xs: 'center', md: 'end' },
                        }}
                      >
                        <Skeleton
                          variant="rectangular"
                          sx={{
                            my: 1,
                            borderRadius: '3px',
                            width: '100%',
                            height: '20px',
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                      <Box
                        sx={{
                          fontSize: { xs: 12, md: 13 },
                          color: 'var(--black)',
                        }}
                      >
                        <Box
                          sx={{
                            mt: 1,
                            fontSize: 15,
                            fontWeight: { xs: 500, md: 600 },
                          }}
                        >
                          <Skeleton
                            variant="rectangular"
                            sx={{
                              my: 1,
                              borderRadius: '3px',
                              width: '100%',
                              height: '30px',
                            }}
                          />
                        </Box>
                        <Box>
                          <Skeleton
                            variant="rectangular"
                            sx={{
                              my: 1,
                              borderRadius: '3px',
                              width: '100%',
                              height: '30px',
                            }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: { xs: 12, md: 13 },
                            color: 'var(--black)',
                          }}
                          noWrap
                        >
                          <Skeleton
                            variant="rectangular"
                            sx={{
                              my: 1,
                              borderRadius: '3px',
                              width: '100%',
                              height: '30px',
                            }}
                          />
                        </Typography>
                        <Box>{item?.cabinClass}</Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BookingDetailsLoader;
