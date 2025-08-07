/* eslint-disable react/prop-types */
import { Box, Grid, Skeleton } from '@mui/material';
import MobileTableLoader from './MobileTableLoader';

const TableLoader = ({ row, cell }) => {
  const tablelg = cell || (window.innerWidth > 1026 && 12);
  const tableMd = cell || (window.innerWidth > 1025 && 10);
  const tableSm = window.innerWidth > 501 && 8;
  const tableXs = window.innerWidth > 500 && 6;
  return (
    <Box>
      <Box display={{ xs: 'none', md: 'block' }}>
        {[...new Array(row || 15)].map((data, index) => (
          <Grid container key={index} spacing={1}>
            {[
              ...new Array(
                window.innerWidth > 1026
                  ? tablelg
                  : window.innerWidth > 1025
                  ? tableMd
                  : window.innerWidth > 501
                  ? tableSm
                  : window.innerWidth < 500
                  ? 6
                  : tableXs
              ),
            ].map((data, index) => (
              <Grid item key={index} xs>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    my: 1,
                    borderRadius: '3px',
                    width: '100%',
                    height: '30px',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
      <Box display={{ xs: 'block', md: 'none' }}>
        <MobileTableLoader row={6} />
      </Box>
    </Box>
  );
};

export default TableLoader;
