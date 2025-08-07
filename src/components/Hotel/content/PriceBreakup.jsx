/* eslint-disable react/prop-types */
import { Box, Typography, Stack } from '@mui/material';
import commaNumber from 'comma-number';

// function splitAmountIntoRooms(totalAmount, numberOfRooms) {
//   const roomAmount = totalAmount / numberOfRooms;
//   const rooms = Array.from({ length: numberOfRooms }, () => ({ roomAmount }));
//   return rooms;
// }

const PriceBreakup = ({ numberOfNight, numberOfRooms, totalRoomPrice }) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        backgroundColor: 'white',
        border: '1px solid rgb(234, 234, 235)',
      }}
    >
      <Typography
        sx={{
          mb: 1,
          px: 2,
          py: 1,
          fontSize: { xs: 10, md: 13 },
          fontWeight: 600,
          // backgroundColor: 'var(--gray)',
          borderBottom: '1px solid var(--gray)',
          color: 'var(--primary)',
          borderRadius: '7px 7px 0px 0px',
        }}
        bgcolor="rgb(232, 230, 235)"
      >
        Fare Breakdown
      </Typography>

      <Stack spacing={1} sx={{ px: 2 }}>
        {/* Base Fare */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ borderBottom: '1px solid rgb(238, 240, 243)', py: 0.5 }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: 9, md: 11 },
                color: 'var(--primary)',
                mb: -0.5,
              }}
            >
              Room Fare
            </Typography>
            <Typography
              sx={{ fontSize: { xs: 11, md: 12 }, color: 'var(--primary)' }}
            >
              {numberOfRooms || 1} Room x {numberOfNight || 1} Night
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: { xs: 12, md: 15 },
              fontWeight: 500,
              color: 'var(--secondary)',
            }}
          >
            {commaNumber(Number(totalRoomPrice).toFixed(2))}
          </Typography>
        </Stack>

        {/* Partner Commission */}
        {/* <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ borderBottom: '1px solid rgb(238, 240, 243)', pb: 1 }}
        >
          <Typography sx={{ fontSize: 14, color: 'var(--primary)' }}>
            Partner Commission
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 12, md: 15 },
              color: 'var(--secondary)',
              fontWeight: 500,
            }}
          >
            - 1,234
          </Typography>
        </Stack> */}

        {/* Hotel Tax */}
        {/* <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ borderBottom: '1px solid rgb(238, 240, 243)', pb: 1 }}
        >
          <Typography sx={{ fontSize: 14, color: 'var(--primary)' }}>
            Hotel Tax
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 12, md: 15 },
              color: 'var(--secondary)',
              fontWeight: 500,
            }}
          >
            4,234
          </Typography>
        </Stack> */}

        {/* Service Charge */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            sx={{ fontSize: { xs: 12, md: 14 }, color: 'var(--primary)' }}
          >
            Service Charge
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 12, md: 15 },
              color: 'var(--secondary)',
              fontWeight: 500,
            }}
          >
            0.00
          </Typography>
        </Stack>
      </Stack>

      {/* Total */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mt: 1,
          px: 2,
          py: 0.5,
          borderRadius: '0 0 10px 10px',
          backgroundColor: 'var(--dark-bgcolor)',
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 12, md: 14 },
            fontWeight: 400,
            color: 'var(--primary)',
          }}
        >
          Amount Paid
        </Typography>
        <Typography
          sx={{ fontSize: 16, fontWeight: 600, color: 'var(--secondary)' }}
        >
          {commaNumber(Number(totalRoomPrice).toFixed(2))}
        </Typography>
      </Stack>
    </Box>
  );
};

export default PriceBreakup;
