/* eslint-disable react/prop-types */

import { Typography, Box, Grid, Stack } from '@mui/material';
import hotel from '../../assets/images/hotel';

const GuestCard = ({ room, index }) => {
  const roomTypeData = JSON.parse(room?.roomType || '[]');

  return (
    <Box
      sx={{
        mb: 2,
        padding: 2.5,
        py: 1,
        rounded: 1,
        borderColor: '#DADFE6',
        bgcolor: 'var(--white)',
        borderRadius: '10px',
        mx: { xs: 0.5, md: 'unset' },
        position: 'relative',
        width: '100%',
      }}
    >
      <Stack direction={'row'} justifyContent={'space-between'} mb={1}>
        <Typography color="var(--primary)" sx={{ fontWeight: 500 }}>
          {room?.roomName}
        </Typography>
        <Typography color="var(--primary)" sx={{ fontWeight: 500 }}>
          Room - {index + 1}
        </Typography>
      </Stack>
      <Box
        item
        xs={12}
        display="flex"
        alignItems="center"
        color="var(--primary)"
      >
        <img src={hotel.room} alt="" style={{ paddingRight: '3px' }} />
        {roomTypeData?.map((item, index) => (
          <Typography
            sx={{ fontSize: { xs: 10, md: 12 }, ml: 0.5 }}
            // noWrap
            key={index}
          >
            {item?.count} × {item?.type}
          </Typography>
        ))}
      </Box>
      <Typography
        color="var(--secondary)"
        sx={{ fontSize: { xs: 11, md: 13 }, mb: 1 }}
      >
        Guest names must match the valid identification presented at check-in.
      </Typography>

      {/* // id: 1, // primaryGuest: 'MR. Md Shohel Khan', // otherGuest: 'MR. Md
      Rakib Khan', // roomType: 'Deluxe Room Exclusive', // breakfastIncluded:
      true, // }, */}
      {room?.guests?.map((item, i) => (
        <Box key={i}>
          <Grid container spacing={{ xs: 1, md: 2 }}>
            <Grid item md={6} xs={12}>
              <Typography
                color="var(--primary)"
                sx={{ fontSize: { xs: 10, md: 12 }, pb: 0.5 }}
              >
                {item?.isLeadGuest ? 'Lead Guest ' : 'Guest'}
              </Typography>
              <Box
                sx={{
                  p: 1,
                  fontSize: { xs: 11, md: 13 },
                  bgcolor: '#F5F5F5',
                  color: 'var(--primary)',
                  borderRadius: 1,
                }}
              >
                {item?.title} {item?.firstName} {item?.lastName}
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography
                color="var(--primary)"
                sx={{ fontSize: { xs: 10, md: 12 }, pb: 0.5 }}
              >
                Type
              </Typography>
              <Box
                sx={{
                  p: 1,
                  fontSize: { xs: 11, md: 13 },
                  bgcolor: '#F5F5F5',
                  color: 'var(--primary)',
                  borderRadius: 1,
                }}
              >
                {item?.type}
              </Box>
            </Grid>
          </Grid>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            mt={1}
            mb={0.5}
          >
            <Box
              container
              spacing={{ xs: 1, md: 2 }}
              sx={{ width: { xs: '100%', sm: '60%' }, display: 'flex', gap: 2 }}
            >
              {/* Room Type */}

              {/* Breakfast Status */}
            </Box>
          </Box>
        </Box>
      ))}
      <Grid container spacing={1} justifyContent={'space-between'}>
        <Grid item>
          <Box
            item
            xs={12}
            display="flex"
            alignItems="center"
            // color={breakfastIncluded ? 'var(--green-light)' : 'red'}
          >
            <img
              src={hotel.foodInclude}
              alt=""
              style={{ paddingRight: '3px' }}
            />
            <Typography sx={{ fontSize: { xs: 10, md: 12 }, ml: 0.5 }}>
              {room?.services || 'Free Wifi'}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          {/* Guest Allowance */}
          <Box
            display="flex"
            alignItems="center"
            color="var(--secondary)"
            sx={{ mt: { xs: 1, md: 0 } }}
          >
            <Typography sx={{ fontSize: { xs: 10, md: 12 } }}>
              This booking allows for up to 2 guests.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const RoomList = ({ data }) => {
  const rooms = data?.booking?.guestRoomAllocations?.roomAllocation;

  return (
    <Box sx={{ mx: 'auto', mt: 2 }}>
      {rooms.map((room, index) => (
        <GuestCard key={index} room={room} index={index} />
      ))}
    </Box>
  );
};

export default RoomList;
