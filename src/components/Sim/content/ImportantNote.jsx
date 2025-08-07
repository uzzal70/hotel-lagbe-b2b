import { Box, Stack, Typography } from '@mui/material';
import hotel from '../../../assets/images/hotel';

const ImportantNote = () => {
  return (
    <Stack
      sx={{ border: '1px solid var(--ipm)', borderRadius: 1.5 }}
      direction="row"
      bgcolor="white"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 1,
          width: { xs: '25%', lg: 150 },
        }}
      >
        <Box
          sx={{
            width: { xs: 20, lg: 30 },
            height: { xs: 20, lg: 30 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src={hotel.imp}
            alt="package"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </Box>

        <Box>
          <Typography
            sx={{
              lineHeight: 1.2,
              color: 'red',
              fontWeight: 600,
              fontSize: { xs: 7, lg: 13 },
            }}
          >
            Important
          </Typography>
          <Typography
            sx={{
              lineHeight: 1.2,
              color: 'red',
              fontWeight: 600,
              fontSize: { xs: 7, lg: 13 },
            }}
          >
            Notice
          </Typography>
        </Box>
      </Box>

      <Box
        bgcolor="var(--ipm)"
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: { md: 1 },
          width: '100%',
          borderRadius: 1,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: 'var(--white)',
              fontWeight: 200,
              fontSize: {
                xs: 8,
                md: 12,
                display: 'flex',
                alignItems: 'center',
              },
            }}
          >
            <Box sx={{ fontSize: 6, mx: 0.5 }}>⚪</Box> The eSIM QR code can
            only be scanned and installed once; it cannot be reinstalled.
          </Typography>
          <Typography
            sx={{
              color: 'var(--white)',
              fontWeight: 200,
              fontSize: {
                xs: 7,
                md: 12,
                display: 'flex',
                alignItems: 'center',
              },
            }}
          >
            <Box sx={{ fontSize: 6, mx: 0.5 }}>⚪</Box> DO NOT DELETE / REMOVE
            eSIM from your mobile after successful installation.
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default ImportantNote;
