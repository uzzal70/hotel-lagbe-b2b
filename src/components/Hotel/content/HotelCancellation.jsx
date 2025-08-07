/* eslint-disable react/prop-types */
import { Box, Grid, Typography } from '@mui/material';

// Formatters
const formatDateTime = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.toLocaleString('en-GB', { day: '2-digit' });
  const month = date.toLocaleString('en-GB', { month: 'short' });
  const time = date.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return `${day} ${month}, ${time}`;
};

const HotelCancellation = ({ data }) => {
  return (
    <>
      <Box
        sx={{
          mb: 2,
          backgroundColor: 'white',
          borderRadius: 2,
          border: '1px solid rgb(234, 234, 235)',
        }}
      >
        {/* Header */}
        <Grid
          container
          bgcolor="rgb(232, 230, 235)"
          sx={{
            px: { xs: 0.1, md: 1 },
            borderRadius: 1.5,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        >
          <Grid item xs={7.5} sx={{ borderRight: '1px solid #ccc', p: '6px' }}>
            <Typography
              sx={{
                fontSize: { xs: 10, md: 13 },
                color: 'var(--primary)',
                fontWeight: 600,
              }}
            >
              Date
            </Typography>
          </Grid>
          <Grid item xs={4.5} sx={{ p: '6px' }}>
            <Typography
              sx={{
                fontSize: { xs: 10, md: 13 },
                color: 'var(--primary)',
                fontWeight: 600,
              }}
            >
              Cancellation Fee
            </Typography>
          </Grid>
        </Grid>

        {/* Rows */}
        {data?.map((rule, idx) => (
          <Grid
            container
            key={idx}
            sx={{
              borderTop: '1px solid rgb(234, 234, 235)',
              px: { xs: 0.1, md: 1 },
            }}
          >
            <Grid
              item
              xs={7.5}
              sx={{ borderRight: '1px solid #ccc', p: '6px' }}
            >
              <Typography sx={{ fontSize: { xs: 9, md: 11 } }}>
                {formatDateTime(rule.start)} - {formatDateTime(rule.end)}
              </Typography>
            </Grid>
            <Grid item xs={4.5} sx={{ p: '6px' }}>
              <Typography sx={{ fontSize: { xs: 9, md: 11 } }}>
                {rule.estimatedValue ? `৳ ${rule.estimatedValue}` : 'Free'}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  );
};

export default HotelCancellation;
