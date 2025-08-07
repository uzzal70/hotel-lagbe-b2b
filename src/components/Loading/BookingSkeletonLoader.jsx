import { Box, Grid, Skeleton, Typography } from '@mui/material';

export default function BookingSkeletonLoader() {
  return (
    <Box
      sx={{
        bgcolor: 'var(--white)',
        p: { xs: 1, md: 2 },
        mt: 2,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={9}>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                mb: 2,
              }}
            >
              <Box>
                <Skeleton variant="text" width={200} height={30} />
                <Skeleton variant="text" width={250} height={20} />
              </Box>
              <Skeleton
                variant="rectangular"
                width={150}
                height={100}
                sx={{ borderRadius: 2 }}
              />
            </Box>

            {/* Check-in/out info */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {['Check-in', 'Duration', 'Check-out', 'Room Details'].map(
                (label, idx) => (
                  <Grid item xs={12} sm={6} md={3} key={idx}>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="rectangular" height={40} />
                  </Grid>
                )
              )}
            </Grid>

            {/* Guest Info Section */}
            <Typography variant="h6" sx={{ mb: 1 }}>
              <Skeleton width={200} />
            </Typography>

            <Box
              sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2, mb: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={40} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={40} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={40} />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={40} />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={40} />
                </Grid>
              </Grid>
            </Box>

            {/* Contact Info */}
            <Typography variant="h6" sx={{ mb: 1 }}>
              <Skeleton width={200} />
            </Typography>

            <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={40} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={40} />
                </Grid>
              </Grid>
            </Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              <Skeleton width={200} />
            </Typography>

            <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={40} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={40} />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ mb: 1 }}>
              <Skeleton width={'90%'} />
            </Typography>

            <Box sx={{ borderRadius: 2 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Typography key={i} variant="h3" mb={'-10px'}>
                  <Skeleton width="100%" />
                </Typography>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* Hotel Info Header */}
    </Box>
  );
}
