import { Box, Grid } from '@mui/material';

import FilterLoading from './FilterLoading';
import FlightResultLoading from './FlightResultLoading';
import CustomLinearProgress from './CustomLinearProgress';

// eslint-disable-next-line react/prop-types
const FlightSearchLoading = ({ tripType }) => {
  return (
    // Getting the best deals from over 450 airlines..
    <Box sx={{ bgcolor: 'var(--body)', mt: 2 }}>
      <Grid container columnSpacing={{ xs: 1, lg: 1.5 }} mt={1.5}>
        <Grid item lg={2.5} display={{ xs: 'none', lg: 'flex' }}>
          <FilterLoading />
        </Grid>

        <Grid item xs={12} md={12} lg={9.5}>
          <Box>
            {/* <Typography sx={{ fontSize: 14, color: 'var(--secondary)' }} pb={1}>
              Getting the best deals from over 450 airlines...
            </Typography>
            <Box pb={2}>
              <CustomLinearProgress />
            </Box> */}
            <FlightResultLoading tripType={tripType} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlightSearchLoading;
