/* eslint-disable react/prop-types */
import { Skeleton, Stack } from '@mui/material';

const CardMaping = ({ item, air }) => {
  return (
    <div>
      {Array.from({ length: item }).map((_, i) => (
        <Stack
          key={i}
          direction={'row'}
          spacing={1.5}
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '10%' }} />
          {air && (
            <Skeleton
              animation="wave"
              variant="circular"
              width={20}
              height={17}
              sx={{ borderRadius: '50%' }}
            />
          )}
          <Skeleton variant="text" sx={{ fontSize: '1.80rem', width: '90%' }} />
        </Stack>
      ))}
    </div>
  );
};

export default CardMaping;

