import { Stack, Box, Skeleton } from '@mui/material';

const SliderLoading = () => {
  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        sx={{
          bgcolor: 'var(--white)',
          p: { xs: 0.5, md: 1 },
          borderRadius: '6px',
        }}
      >
        {Array.from({
          length: innerWidth > 1025 ? 6 : innerWidth > 600 ? 4 : 3,
        }).map((_, i) => (
          <Stack spacing={1} direction="row" alignItems="center" key={i}>
            <Box>
              <Skeleton
                variant="circular"
                sx={{
                  width: { xs: 30, md: 40 },
                  height: { xs: 30, md: 40 },
                }}
              />
            </Box>
            <Box>
              <Skeleton
                variant="text"
                sx={{
                  fontSize: { xs: '1.2rem', md: '1.4rem' },
                  width: { xs: '45px', md: '55px' },
                }}
              />
              <Skeleton
                variant="text"
                sx={{
                  fontSize: { xs: '0.8rem', md: '1rem' },
                  width: { xs: '60px', md: '80px' },
                  mt: -0.8,
                }}
              />
            </Box>
          </Stack>
        ))}
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        sx={{ bgcolor: 'var(--white)', p: 1, borderRadius: '6px', mt: 1 }}
      >
        {Array.from({
          length: innerWidth > 1025 ? 3 : innerWidth > 600 ? 2 : 2,
        }).map((_, i) => (
          <Box
            key={i}
            sx={{
              bgcolor: 'var(--body)',
              width: '100%',
              py: 0.1,
              px: 1,
              borderRadius: '5px',
            }}
          >
            <Skeleton
              variant="text"
              sx={{
                fontSize: '1.1rem',
                width: { xs: '45px', md: '55px' },
              }}
            />
            <Skeleton
              variant="text"
              sx={{
                fontSize: '0.8rem',
                width: { xs: '60px', md: '80px' },
                mt: -0.8,
              }}
            />
          </Box>
        ))}
      </Stack>
    </div>
  );
};

export default SliderLoading;
