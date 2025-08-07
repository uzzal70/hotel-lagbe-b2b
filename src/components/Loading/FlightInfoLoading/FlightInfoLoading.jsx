import { Box, Container, Grid, Skeleton } from '@mui/material';
import Processoing from '../../Common/Processoing';

const FlightInfoLoading = () => {
  return (
    <Container sx={{ px: { xs: 1, sm: 2, md: '' } }}>
      {/* <Box pb={2}>
        <CustomLinearProgress />
      </Box> */}
      <Processoing content={'We are processing your request please wait...'} />
      <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 1.5 }}>
        {/* for xs to sm device */}
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            mb: 1,
            borderRadius: '5px',
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              height: '40px',
              borderRadius: '5px',
            }}
          />
        </Box>
        <Box my={2}>
          <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              height: '40px',
              borderRadius: '5px',
            }}
          />
        </Box>
        <Box my={2}>
          <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              height: { xs: '70px', md: '40px' },
              borderRadius: '5px',
            }}
          />
        </Box>
        <Box my={2}>
          <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              height: { xs: '70px', md: '40px' },
              borderRadius: '5px',
            }}
          />
        </Box>
        <Box my={2}>
          <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              height: '40px',
              borderRadius: '5px',
            }}
          />
        </Box>
      </Box>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        <Grid item xs={12} md={8}>
          <Grid item xs={12} mb={2}>
            <Skeleton
              variant="rectangular"
              sx={{
                width: { xs: '100%', md: '70%' },
                height: { xs: '70px', md: '40px' },
                borderRadius: '5px',
              }}
            />
            <Skeleton
              variant="rectangular"
              sx={{
                mt: 2,
                width: { xs: '100%', md: '80%' },
                height: { xs: '70px', md: '40px' },
                borderRadius: '5px',
              }}
            />
            <Skeleton
              variant="rectangular"
              sx={{
                mt: 2,
                width: { xs: '100%', md: '60%' },
                height: '40px',
                borderRadius: '5px',
              }}
            />
          </Grid>
          <Grid container spacing={2}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Grid item key={i} xs={12} md={6} sx={{ width: '100%' }}>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: '100%',
                    height: '50px',
                    borderRadius: '5px',
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} mt={2}>
            {/* Passenger Contact  */}
            <Grid item xs={12}>
              <Skeleton
                variant="rectangular"
                sx={{
                  width: '80%',
                  height: '40px',
                  borderRadius: '5px',
                }}
              />
            </Grid>
            {Array.from({ length: 2 }).map((_, i) => (
              <Grid item key={i} xs={12} md={6} sx={{ width: '100%' }}>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: '100%',
                    height: '80px',
                    borderRadius: '5px',
                  }}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Skeleton
                variant="rectangular"
                sx={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '5px',
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* Right Side  */}
        <Grid item xs={12} md={4}>
          <Box mb={2} sx={{ width: '100%' }}>
            <Skeleton
              variant="rectangular"
              sx={{
                width: '100%',
                height: '40px',
                borderRadius: '5px',
              }}
            />
          </Box>
          <Box mb={2} sx={{ width: '100%' }}>
            <Skeleton
              variant="rectangular"
              sx={{
                width: '100%',
                height: '40px',
                borderRadius: '5px',
              }}
            />
          </Box>
          <Box mb={2} sx={{ width: '100%' }}>
            <Skeleton
              variant="rectangular"
              sx={{
                width: '100%',
                height: '40px',
                borderRadius: '5px',
              }}
            />
          </Box>
          <Grid container spacing={2}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Grid item key={i} xs={12} sx={{ width: '100%' }}>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: '100%',
                    height: '80px',
                    borderRadius: '5px',
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ width: '100%' }}>
            <Skeleton
              variant="rectangular"
              sx={{
                my: 2,
                width: '100%',
                height: '40px',
                borderRadius: '5px',
              }}
            />
            <Skeleton
              variant="rectangular"
              sx={{
                my: 2,
                width: '100%',
                height: '40px',
                borderRadius: '5px',
              }}
            />
            <Skeleton
              variant="rectangular"
              sx={{
                my: 2,
                width: '100%',
                height: '40px',
                borderRadius: '5px',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FlightInfoLoading;
