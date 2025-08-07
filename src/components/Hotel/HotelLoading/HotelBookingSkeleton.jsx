import {
  Box,
  Card,
  Grid,
  Skeleton,
  Stack,
  Typography,
  Divider,
  Container,
} from '@mui/material';

export default function BookingLoadingSkeleton() {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', mt: 2 }}>
      <Container>
        <Grid container spacing={2}>
          {/* Left/Main section */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, mb: 3 }}>
              {/* REF, PNR */}
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Skeleton variant="text" width={150} height={24} />
                <Skeleton variant="rounded" width={80} height={30} />
              </Grid>

              {/* Hotel name & stars */}
              <Box mb={1}>
                <Skeleton variant="text" width="40%" height={30} />
                <Stack direction="row" spacing={0.5}>
                  {[...Array(5)].map((_, i) => (
                    <Skeleton
                      key={i}
                      variant="rounded"
                      width={20}
                      height={20}
                      sx={{ bgcolor: 'grey.400' }}
                    />
                  ))}
                </Stack>
              </Box>

              {/* Address line */}
              <Skeleton variant="text" width="60%" height={22} mb={2} />

              {/* Map link */}
              <Skeleton variant="text" width={80} height={20} sx={{ mb: 2 }} />

              <Divider sx={{ mb: 2 }} />

              {/* Dates and Room info (3 cols) */}
              <Grid container spacing={2} mb={2}>
                {[...Array(3)].map((_, i) => (
                  <Grid item xs={12} sm={4} key={i}>
                    <Skeleton variant="text" width={120} height={20} />
                    <Skeleton variant="rounded" width="70%" height={30} />
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ mb: 2 }} />

              {/* Important information section */}
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                <Skeleton width={180} />
              </Typography>

              {[...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  variant="text"
                  width="100%"
                  height={20}
                  sx={{ mb: 1 }}
                />
              ))}

              <Stack direction="row" spacing={2} mt={2} mb={3}>
                <Skeleton variant="rounded" width={150} height={36} />
                <Skeleton variant="rounded" width={150} height={36} />
              </Stack>

              <Divider />

              {/* Rooms */}
              {[1, 2].map((room) => (
                <Box
                  key={room}
                  mt={3}
                  p={2}
                  bgcolor="background.paper"
                  borderRadius={1}
                  boxShadow={1}
                >
                  <Skeleton
                    variant="text"
                    width={120}
                    height={24}
                    sx={{ mb: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    width="70%"
                    height={18}
                    sx={{ mb: 1 }}
                  />

                  <Grid container spacing={2} mb={1}>
                    <Grid item xs={12} sm={6}>
                      <Skeleton variant="rounded" width="100%" height={32} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Skeleton variant="rounded" width="100%" height={32} />
                    </Grid>
                  </Grid>

                  <Stack direction="row" spacing={1} mt={1} alignItems="center">
                    <Skeleton variant="rounded" width={20} height={20} />
                    <Skeleton variant="rounded" width={120} height={24} />
                    <Skeleton variant="rounded" width={20} height={20} />
                    <Skeleton variant="rounded" width={140} height={24} />
                  </Stack>

                  <Skeleton
                    variant="text"
                    width="55%"
                    height={16}
                    sx={{ mt: 1 }}
                  />
                </Box>
              ))}
            </Card>
          </Grid>

          {/* Right sidebar */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Card sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight={600} mb={1}>
                  <Skeleton width={180} />
                </Typography>
                {[...Array(3)].map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="text"
                    width="70%"
                    height={24}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Card>

              <Card sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight={600} mb={1}>
                  <Skeleton width={120} />
                </Typography>

                {['Room Fare', 'Service Charge', 'Amount to be paid'].map(
                  (item, i) => (
                    <Grid
                      container
                      key={item}
                      justifyContent="space-between"
                      sx={{ my: 1 }}
                    >
                      <Skeleton variant="text" width={100} height={24} />
                      <Skeleton variant="text" width={30} height={24} />
                    </Grid>
                  )
                )}
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
