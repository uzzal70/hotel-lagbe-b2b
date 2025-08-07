import { Box, Grid, Skeleton, Stack } from '@mui/material';

const HotelDetailsSkeleton = () => {
  const GuestCardSkeleton = () => {
    return (
      <Box
        sx={{
          mb: 2,
          padding: 2.5,
          py: 1,
          borderColor: '#DADFE6',
          bgcolor: 'var(--white)',
          borderRadius: '10px',
          mx: { xs: 0.5, md: 'unset' },
          position: 'relative',
          width: '100%',
        }}
      >
        <Skeleton width="80px" height={20} />
        <Skeleton width="60%" height={15} sx={{ mt: 0.5, mb: 1 }} />

        {[0, 1].map((_, i) => (
          <Grid container spacing={{ xs: 1, md: 2 }} key={i} sx={{ mb: 1 }}>
            <Grid item md={6} xs={12}>
              <Skeleton width="30%" height={15} />
              <Skeleton
                variant="rectangular"
                height={35}
                sx={{ mt: 0.5, borderRadius: 1 }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Skeleton width="30%" height={15} />
              <Skeleton
                variant="rectangular"
                height={35}
                sx={{ mt: 0.5, borderRadius: 1 }}
              />
            </Grid>
          </Grid>
        ))}

        <Grid container spacing={1} justifyContent={'space-between'} mt={1}>
          <Grid item>
            <Box display="flex" alignItems="center" gap={1}>
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton width={100} height={15} />
            </Box>
          </Grid>
          <Grid item>
            <Skeleton width={180} height={15} />
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ px: 0, mt: 4 }}>
      <Box mt={{ xs: 2, md: 2 }}>
        <Grid container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={12} md={8}>
            <Box mb={3}>
              <Stack
                sx={{
                  flex: '1 0 auto',
                  width: '100%',
                  mb: 1.8,
                  borderRadius: 2,
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flexWrap="wrap"
                  gap={1}
                  bgcolor="white"
                  p={1}
                  sx={{ borderRadius: 2 }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    {['bookingRef', 'pnr'].map((key) => (
                      <Skeleton
                        key={key}
                        width={120}
                        sx={{
                          fontSize: { xs: 12, md: 14 },
                          fontWeight: 500,
                          px: 1,
                          py: 0.5,
                          borderLeft: 0,
                          borderRight: 0,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      />
                    ))}
                  </Box>

                  <Skeleton
                    width={100}
                    sx={{
                      fontSize: { xs: 12, md: 13 },
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                    }}
                  />
                </Box>
              </Stack>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  mb: 2,
                  p: 1,
                  borderRadius: '10px',
                  bgcolor: 'var(--white)',
                  borderColor: '#DADFE6',
                  mx: { xs: 0.5, md: 'unset' },
                  position: 'relative',
                }}
              >
                {/* Right Side - Hotel Info */}
                <Stack sx={{ flex: '1 0 auto', pl: 1, width: '59%' }}>
                  <Box display="flex" alignItems="center">
                    <Skeleton width={180} height={20} />
                    <Stack direction="row" spacing={0.5}>
                      {[...Array(5)].map((_, i) => (
                        <Skeleton
                          key={i}
                          width={15}
                          height={15}
                          sx={{ borderRadius: '50%' }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* Address */}
                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <Skeleton variant="circular" width={12} height={12} />
                    <Skeleton width="60%" height={20} />
                    <Skeleton width="30%" height={20} />
                  </Stack>

                  {/* Check-in/out & Room Info */}
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} md={8}>
                      <Box
                        bgcolor="var(--gray)"
                        borderRadius={2}
                        px={1.5}
                        py={0.8}
                        display="flex"
                        justifyContent="space-between"
                        height="100%"
                      >
                        {/* Check-in */}
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Skeleton variant="circular" width={15} height={15} />
                          <Box>
                            <Skeleton width={80} height={20} />
                            <Skeleton width={60} height={20} />
                            <Skeleton width={60} height={20} />
                          </Box>
                        </Stack>

                        <Box display="flex" alignItems="center">
                          <Skeleton width={60} height={20} />
                        </Box>

                        {/* Check-out */}
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Skeleton variant="circular" width={15} height={15} />
                          <Box>
                            <Skeleton width={80} height={20} />
                            <Skeleton width={60} height={20} />
                            <Skeleton width={60} height={20} />
                          </Box>
                        </Stack>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Box
                        bgcolor="var(--gray)"
                        borderRadius={2}
                        px={1.5}
                        py={0.8}
                        display="flex"
                        height="100%"
                      >
                        <Box>
                          <Skeleton width={80} height={20} />
                          <Skeleton width="100%" height={20} />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Stack>

                {/* Left Side - Hotel Image */}
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    mt: 0.5,
                    ml: 2,
                  }}
                >
                  <Skeleton variant="rectangular" width={120} height={120} />
                </Box>
              </Box>

              {/* "dsfsd" */}

              <Box sx={{ mx: 'auto' }}>
                {Array.from({ length: 2 }).map((_, index) => (
                  <GuestCardSkeleton key={index} index={index} />
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} mb={3}>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Grid container spacing={1}>
                <Grid item>
                  <Skeleton
                    variant="rectangular"
                    width={150}
                    height={36}
                    sx={{ borderRadius: 1 }}
                  />
                </Grid>
                <Grid item>
                  <Skeleton
                    variant="rectangular"
                    width={150}
                    height={36}
                    sx={{ borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} mb={1}>
                  <Skeleton variant="text" width="60%" height={20} />
                </Grid>
              </Grid>
            </Box>

            {/* Mobile View */}
            <Box
              sx={{
                display: { xs: 'block', md: 'none' },
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                bgcolor: 'var(--gray)',
                borderTop: '1px solid black',
                color: 'white',
                fontSize: 12,
                py: 1,
                px: 1,
                zIndex: 1300,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton variant="text" width="30%" height={20} />
                <Skeleton
                  variant="rectangular"
                  width={120}
                  height={36}
                  sx={{ borderRadius: 1 }}
                />
              </Box>
              <Skeleton variant="text" width="70%" height={18} />
            </Box>
            <Box
              sx={{
                mb: 2,
                backgroundColor: 'white',
                borderRadius: 2,
                border: '1px solid rgb(234, 234, 235)',
              }}
            >
              {/* Header */}
              <Skeleton
                variant="re"
                sx={{
                  height: 35,
                }}
                className=""
              ></Skeleton>

              {/* Skeleton Rows */}
              {[...Array(3)].map((_, idx) => (
                <Grid
                  container
                  key={idx}
                  sx={{
                    borderTop: '1px solid rgb(234, 234, 235)',
                    px: { xs: 0.1, md: 1 },
                  }}
                >
                  <Grid
                    item
                    xs={8}
                    sx={{ borderRight: '1px solid #ccc', p: '6px' }}
                  >
                    <Skeleton variant="text" width="90%" height={20} />
                  </Grid>
                  <Grid item xs={4} sx={{ p: '6px' }}>
                    <Skeleton variant="text" width="60%" height={20} />
                  </Grid>
                </Grid>
              ))}
            </Box>

            <Box
              sx={{
                backgroundColor: 'white',
                border: '1px solid rgb(234, 234, 235)',
                borderRadius: 2,
              }}
            >
              <Skeleton
                variant="re"
                sx={{
                  height: 35,
                }}
                className=""
              ></Skeleton>

              {[...Array(2)].map((_, index) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  key={index}
                  sx={{
                    px: 2,
                    py: 1,
                    borderBottom:
                      index !== 1 ? '1px solid rgb(234, 234, 235)' : 0,
                  }}
                >
                  <Skeleton variant="text" width={80} height={20} />
                  <Skeleton variant="text" width={60} height={20} />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HotelDetailsSkeleton;
