import { Box, Grid, Skeleton, Stack, Typography } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import FlightIcon from '@mui/icons-material/Flight';

const FlightLayoutLoading = () => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      columnSpacing={{ xs: 0.5, sm: 1 }}
      sx={{ my: 1 }}
    >
      <Grid item xs={3.7} sm={3} md={2.8}>
        <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
          <Box
            sx={{
              width: {
                xs: '30px',
                sm: '30px',
                md: '40px',
              },
              height: {
                xs: '30px',
                sm: '30px',
                md: '40px',
              },
            }}
          >
            <Skeleton
              variant="circular"
              sx={{
                width: '100%',
                height: '100%',
              }}
            />
          </Box>
          <Stack spacing={0.8}>
            <Skeleton
              variant="rectangular"
              sx={{
                fontSize: '1rem',
                borderRadius: '3px',
                width: { xs: '45px', md: '55px' },
              }}
            />
            <Skeleton
              variant="rectangular"
              sx={{
                fontSize: '1rem',
                borderRadius: '3px',
                width: { xs: '55px', md: '70px' },
              }}
            />
            <Skeleton
              variant="rectangular"
              sx={{
                fontSize: '1rem',
                borderRadius: '3px',
                width: { xs: '45px', md: '55px' },
              }}
            />
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={5.8} sm={6} md={7} sx={{ pr: { xs: 1, md: 2 } }}>
        <Box
          sx={{
            visibility: 'hidden',
            display: { xs: 'none', md: 'block' },
          }}
        >
          gap fill up
        </Box>
        <Box
          sx={{
            position: 'relative',
            mt: { xs: 2, md: 0 },
          }}
          className="dashed-top-line"
        >
          <Box
            className="position-center"
            sx={{
              bgcolor: 'var(--white)',
              mt: -0.2,
            }}
          >
            <Skeleton
              variant="text"
              sx={{
                width: { xs: '40px', md: '55px' },
              }}
            />
          </Box>
          <CircleOutlinedIcon
            sx={{
              fontSize: 12,
              position: 'absolute',
              top: '50%',
              left: 0,
              transform: 'translateY(-50%)',
              bgcolor: 'var(--white)',
              color: 'var(--dash)',
            }}
          />
          <FlightIcon
            sx={{
              fontSize: 18,
              position: 'absolute',
              top: '50%',
              right: 0,
              transform: 'translateY(-50%) rotate(90deg)',
              color: 'var(--dash)',
            }}
          />
        </Box>

        <Stack
          direction="row"
          justifyContent="space-around"
          sx={{
            display: { xs: 'flex', sm: 'flex' },
            pt: { xs: 0.5, md: 0 },
          }}
        >
          <Skeleton
            variant="text"
            sx={{
              fontSize: '1rem',
              width: '45px',
            }}
          />
          <Skeleton
            variant="text"
            sx={{
              fontSize: '1rem',
              width: '45px',
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={2.5} sm={3} md={2}>
        <Stack spacing={0.8}>
          <Skeleton
            variant="rectangular"
            sx={{
              fontSize: '1rem',
              borderRadius: '3px',
              width: { xs: '45px', md: '55px' },
            }}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              fontSize: '1rem',
              borderRadius: '3px',
              width: { xs: '55px', md: '70px' },
            }}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              fontSize: '1rem',
              borderRadius: '3px',
              width: { xs: '45px', md: '55px' },
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default FlightLayoutLoading;
