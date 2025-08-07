import React from 'react';
import { Box, Skeleton, Typography, Grid } from '@mui/material';

function InsuCardSkeleton({ list }) {
  return (
    <Box mb={2}>
      {list ? (
        <Grid container spacing={2}>
          {Array.from({ length: 9 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box
                sx={{
                  padding: 2,
                  borderRadius: 1,
                  boxShadow: 1,
                  backgroundColor: 'background.paper',
                }}
              >
                {/* ID and Status */}
                <Grid container justifyContent="space-between">
                  <Skeleton variant="text" width="50%" height={20} />
                  <Skeleton variant="rectangular" width={80} height={20} />
                </Grid>

                {/* Travel Purpose */}
                <Skeleton variant="text" width="80%" height={20} />

                {/* Countries */}
                <Skeleton variant="text" width="60%" height={20} />

                {/* Days */}
                <Skeleton variant="text" width="40%" height={20} />

                {/* Created At */}
                <Skeleton variant="text" width="70%" height={20} />

                {/* View Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Skeleton variant="rectangular" width={60} height={30} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          {Array.from({ length: 4 }).map((_, i) => (
            <Grid container spacing={2} key={i} mb={2}>
              <Grid item xs={12} sm={12} md={8}>
                <Box
                  sx={{
                    padding: 2,
                    borderRadius: 1,
                    boxShadow: 1,
                    backgroundColor: 'background.paper',
                  }}
                >
                  {/* ID and Status */}
                  <Grid container justifyContent="space-between">
                    <Skeleton variant="text" width="50%" height={20} />
                    <Skeleton variant="rectangular" width={80} height={20} />
                  </Grid>

                  {/* Travel Purpose */}
                  <Skeleton variant="text" width="80%" height={20} />

                  {/* Countries */}
                  <Skeleton variant="text" width="60%" height={20} />

                  {/* Days */}
                  <Skeleton variant="text" width="40%" height={20} />

                  {/* Created At */}
                  <Skeleton variant="text" width="70%" height={20} />
                </Box>
              </Grid>
              <Grid item xs={0} sm={0} md={4} key={i}>
                <Box
                  sx={{
                    padding: 2,
                    borderRadius: 1,
                    boxShadow: 1,
                    backgroundColor: 'background.paper',
                  }}
                >
                  {/* ID and Status */}
                  <Grid container justifyContent="space-between">
                    <Skeleton variant="text" width="50%" height={20} />
                    <Skeleton variant="rectangular" width={80} height={20} />
                  </Grid>

                  {/* Travel Purpose */}
                  <Skeleton variant="text" width="80%" height={20} />

                  {/* Countries */}
                  <Skeleton variant="text" width="60%" height={20} />

                  {/* Days */}
                  <Skeleton variant="text" width="40%" height={20} />

                  {/* Created At */}
                  <Skeleton variant="text" width="70%" height={20} />
                </Box>
              </Grid>
            </Grid>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default InsuCardSkeleton;
