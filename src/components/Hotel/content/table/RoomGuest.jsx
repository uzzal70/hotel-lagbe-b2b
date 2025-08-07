/* eslint-disable react/prop-types */

import { Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ChildCareIcon from '@mui/icons-material/ChildCare';

const RoomGuest = ({ item }) => {
  const adult = item?.numberOfAdults;
  const child = item?.numberOfChilds;
  return (
    <Box>
      {adult > 0 && (
        <Box
          color="#344258"
          mb={0.5}
          sx={{
            fontSize: { xs: 10, md: 11, lg: 13 },
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <PersonIcon sx={{ fontSize: 16, color: '#71767B' }} /> Adult :{' '}
            {adult}
          </Box>
        </Box>
      )}
      {child > 0 && (
        <Box
          variant="body2"
          color="#344258"
          sx={{
            fontSize: { xs: 10, md: 11, lg: 13 },
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <ChildCareIcon sx={{ fontSize: 16, color: '#71767B' }} /> Child :{' '}
            {child}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RoomGuest;
