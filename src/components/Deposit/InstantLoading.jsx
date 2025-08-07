import { Box, Container, Skeleton, Stack } from '@mui/material';
const InstantLoading = () => {
  return (
    <Container sx={{ bgcolor: 'var(--white)', mt: 3, borderRadius: 3 }}>
      <Box pt={2}>
        <Skeleton
          variant="text"
          sx={{ fontSize: '2rem', width: { xs: '90%', sm: '70%', md: '40%' } }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: '1rem', width: { xs: '90%', sm: '70%', md: '40%' } }}
        />
      </Box>
      <Stack direction={'row'} spacing={1.5}>
        <Skeleton variant="text" sx={{ fontSize: '5rem', width: '150px' }} />
        <Skeleton variant="text" sx={{ fontSize: '5rem', width: '150px' }} />
        <Skeleton variant="text" sx={{ fontSize: '5rem', width: '150px' }} />
      </Stack>
      <Stack direction={'row'} mt={-5}>
        <Skeleton variant="text" sx={{ fontSize: '10rem', width: '100%' }} />
      </Stack>
      <Stack direction={'row'} spacing={1.5} mt={-5}>
        <Skeleton variant="text" sx={{ fontSize: '3rem', width: '200px' }} />
      </Stack>
    </Container>
  );
};

export default InstantLoading;
