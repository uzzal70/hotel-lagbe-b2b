/* eslint-disable react/prop-types */
import { Box, Grid, Skeleton } from '@mui/material';

const MobileTableLoader = ({ row }) => {
  return (
    <Box>
      <Grid container spacing={1}>
        {[...new Array(row || 5)].map((data, index) => (
          <Grid item key={index} xs={12}>
            <Box
              sx={{
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
                p: 1,
                fontWeight: 300,
                span: {
                  color: 'var(--disable)',
                },
                color: 'var(--secondary)',
                borderRadius: 1,
                bgcolor: 'var(--white)',
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      borderRadius: '3px',
                      width: '100%',
                      height: '30px',
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      borderRadius: '3px',
                      width: '100%',
                      height: '30px',
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      borderRadius: '3px',
                      width: '100%',
                      height: '30px',
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      borderRadius: '3px',
                      width: '100%',
                      height: '30px',
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      borderRadius: '3px',
                      width: '100%',
                      height: '30px',
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      borderRadius: '3px',
                      width: '100%',
                      height: '30px',
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      borderRadius: '3px',
                      width: '100%',
                      height: '30px',
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      borderRadius: '3px',
                      width: '100%',
                      height: '30px',
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      borderRadius: '3px',
                      width: '100%',
                      height: '30px',
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MobileTableLoader;
