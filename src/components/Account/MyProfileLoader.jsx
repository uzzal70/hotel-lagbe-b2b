import { Box, Skeleton, Stack } from '@mui/material';

const MyProfileLoader = () => {
  return (
    <div>
      <Box>
        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
        <Skeleton
          variant="rectangular"
          sx={{
            borderRadius: '3px',
            width: '100%',
            height: '100px',
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            my: 1,
            borderRadius: '3px',
            width: '100%',
            height: '30px',
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            borderRadius: '3px',
            width: '100%',
            height: '30px',
          }}
        />
        <Stack
          direction={'row'}
          spacing={1.5}
          sx={{ justifyContent: 'space-between' }}
        >
          <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
          <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
        </Stack>
      </Box>
    </div>
  );
};

export default MyProfileLoader;
