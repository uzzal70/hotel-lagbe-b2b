import { Box, Skeleton, Stack } from '@mui/material';
import ListMaping from './ListMaping';

const FilterLoading = () => {
  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderRadius: '6px',
        width: '100%',
        p: 1.5,
      }}
    >
      {/* timer  */}
      <Box>
        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
      </Box>
      {/* Reset  */}
      <Stack
        direction={'row'}
        spacing={1.5}
        sx={{ justifyContent: 'space-between' }}
      >
        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
      </Stack>
      {/* GDS  */}
      <Box>
        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '80%' }} />
        <ListMaping item={2} />
      </Box>

      {/* stops */}
      <Box>
        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '80%' }} />
        <Stack
          direction={'row'}
          spacing={1.5}
          sx={{ justifyContent: 'space-between' }}
        >
          <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
          <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
          <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
        </Stack>
      </Box>

      {/* airlines */}
      <Box>
        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '80%' }} />
        <ListMaping item={5} air />
      </Box>
      {/* refundable */}
      <Box>
        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '80%' }} />
        <ListMaping item={2} />
      </Box>
      {/* Departure and arrival */}
      <Box>
        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '80%' }} />
        <Stack
          direction={'row'}
          spacing={1.5}
          sx={{ justifyContent: 'space-between' }}
        >
          <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
          <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
        </Stack>
        <Stack
          direction={'row'}
          spacing={1.5}
          sx={{ justifyContent: 'space-between' }}
        >
          <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
          <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
        </Stack>
      </Box>
      <Box>
        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '80%' }} />
        <ListMaping item={5} />
      </Box>
    </Box>
  );
};

export default FilterLoading;
