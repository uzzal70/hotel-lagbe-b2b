import { Box, Skeleton } from '@mui/material';
// import Processoing from '../../Common/Processoing';

const HotelReviewLoading = () => {
  return (
    <Box>
      {/* <Processoing content={'We are processing your request please wait...'} /> */}
      {/* <CustomLinearProgress /> */}

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
    </Box>
  );
};

export default HotelReviewLoading;
