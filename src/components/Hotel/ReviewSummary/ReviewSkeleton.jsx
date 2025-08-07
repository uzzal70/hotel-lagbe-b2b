import {
  Skeleton,
  Box,
  Stack,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

const ReviewSkeleton = () => {
  const reviewBars = Array.from({ length: 12 }); // For 12 bars like Vibe, Service, etc.

  return (
    <Box p={2}>
      {/* Overall Rating */}
      <Box display="flex" alignItems="center" mb={2}>
        <Skeleton variant="text" width={60} height={40} />
        <Box ml={2}>
          <Skeleton variant="text" width={100} height={24} />
          <Skeleton variant="text" width={80} height={20} />
        </Box>
      </Box>

      {/* Tabs */}
      <Box mb={2}>
        <Tabs value={0}>
          <Tab label={<Skeleton variant="text" width={60} />} />
          <Tab label={<Skeleton variant="text" width={50} />} />
          <Tab label={<Skeleton variant="text" width={70} />} />
        </Tabs>
      </Box>

      <Grid container spacing={2}>
        {/* Rating Bars (Left Side) */}
        <Grid item xs={12} md={4}>
          <Stack spacing={1}>
            {reviewBars.map((_, idx) => (
              <Box key={idx} display="flex" alignItems="center">
                <Skeleton variant="text" width="30%" height={20} />
                <Box flex={1} ml={2}>
                  <Skeleton variant="rectangular" height={10} />
                </Box>
                <Skeleton variant="text" width={40} sx={{ ml: 1 }} />
              </Box>
            ))}
          </Stack>
        </Grid>

        {/* Review Cards (Right Side) */}
        <Grid item xs={12} md={8}>
          {[1, 2].map((card) => (
            <Card key={card} sx={{ mb: 2 }}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Skeleton variant="circular" width={30} height={30} />
                  <Skeleton variant="text" width={60} />
                </Box>
                <Skeleton variant="text" width="40%" height={20} />
                {[...Array(4)].map((_, idx) => (
                  <Skeleton
                    key={idx}
                    variant="text"
                    width="100%"
                    height={16}
                    sx={{ my: 0.5 }}
                  />
                ))}
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewSkeleton;
