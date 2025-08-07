import { Box, Grid, Skeleton, Stack } from '@mui/material';

const ListSkeleton = ({ item }) => {
  return (
    <Box pt={1}>
      {Array.from({
        length: item || 5,
      }).map((_, i) => (
        <Box
          key={i}
          mb={1}
          sx={{
            border: '1px solid var(--stroke)',
            borderRadius: 1,
            bgcolor: 'var(--white)',
            p: 1,
          }}
        >
          <Grid container spacing={1.5}>
            <Grid item xs={3}>
              <Skeleton
                variant="rectangular"
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 1,
                }}
              />
            </Grid>
            <Grid item xs={9}>
              <Box>
                <Grid container spacing={1.5}>
                  <Grid item xs={8} md={8}>
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: '1.5rem',
                        width: { xs: '70%', md: '50%' },
                      }}
                    />
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: '1.5rem',
                        width: { xs: '100%', md: '70%' },
                        mb: { xs: 1, md: 1 },
                      }}
                    />
                    <Box>
                      <Skeleton
                        variant="text"
                        sx={{
                          fontSize: '0.8rem',
                          width: { xs: '60%', md: '40%' },
                        }}
                      />
                      <Skeleton
                        variant="text"
                        sx={{
                          fontSize: '0.8rem',
                          width: { xs: '70%', md: '50%' },
                        }}
                      />
                    </Box>
                    <Stack direction={'row'} spacing={2}>
                      <Skeleton
                        variant="text"
                        sx={{
                          fontSize: '1rem',
                          width: { xs: '40%', md: '30%' },
                        }}
                      />
                      <Skeleton
                        variant="text"
                        sx={{
                          fontSize: '1rem',
                          width: { xs: '40%', md: '30%' },
                        }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Box>
                      {['60%', '80%'].map((width, index) => (
                        <Skeleton
                          key={index}
                          variant="text"
                          sx={{ fontSize: '1.5rem', width, ml: 'auto' }}
                        />
                      ))}

                      {/* Subtext Skeletons */}
                      <Box>
                        {['40%', '50%'].map((width, index) => (
                          <Skeleton
                            key={index}
                            variant="text"
                            sx={{
                              fontSize: '0.8rem',
                              width,
                              ml: 'auto',
                            }}
                          />
                        ))}
                      </Box>
                      <Box mt={1}>
                        <Skeleton
                          variant="text"
                          sx={{
                            fontSize: '1.5rem',
                            width: { xs: '70%', md: '60%' },
                            ml: 'auto',
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default ListSkeleton;
