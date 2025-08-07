import { Box, Grid, Stack, Typography } from '@mui/material';
import commaNumber from 'comma-number';
import moment from 'moment';

const HotelBookingListPhone = ({ data, handleDetails }) => {
  return (
    <div>
      <Grid container spacing={1.5}>
        {data?.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={i}>
            <Box
              sx={{
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
                py: 1,
                px: 1.5,
                fontWeight: 300,
                span: {
                  color: 'var(--disable)',
                },
                color: 'var(--secondary)',
                borderRadius: 1,
                bgcolor: 'var(--white)',
              }}
              onClick={() => handleDetails(item?.bookingId, item?.hotelId)}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  textTransform={'capitalize'}
                  className={item?.serviceType?.toLowerCase()}
                  sx={{
                    py: 0.3,
                    px: 2,
                    bgcolor: 'var(--bgcolor)',
                    borderRadius: '5px',
                    textAlign: 'center',
                    fontSize: 13,
                    fontWeight: 400,
                  }}
                  noWrap
                >
                  {item?.bookingRef}
                </Typography>
                <Box>
                  <Typography
                    className="remove-class"
                    sx={{
                      fontSize: 12,
                    }}
                  >
                    {item?.tfStatus}
                  </Typography>
                </Box>
              </Stack>
              <Grid container spacing={0.5} pt={1}>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      color: 'var(--primary-rgb)',
                      fontSize: 12,
                    }}
                  >
                    Hotel Name
                  </Box>
                  <Box
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 13,
                      fontWeight: 400,
                    }}
                  >
                    {item?.hotelName || 'N/A'}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      color: 'var(--primary-rgb)',
                      fontSize: 12,
                    }}
                  >
                    Lead Pax Name
                  </Box>
                  <Box
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 13,
                      fontWeight: 400,
                    }}
                  >
                    {item?.paxName || 'N/A'}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      color: 'var(--primary-rgb)',
                      fontSize: 12,
                    }}
                  >
                    Check IN Date
                  </Box>
                  <Box
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 13,
                      fontWeight: 400,
                    }}
                  >
                    {moment(item?.checkIn).format('DD MMM YYYY')}
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box
                    sx={{
                      color: 'var(--primary-rgb)',
                      fontSize: 12,
                    }}
                  >
                    Booking Time
                  </Box>
                  <Box
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 13,
                      fontWeight: 400,
                    }}
                  >
                    {moment(item?.createdAt).format('DD MMM YYYY hh:mm a')}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      color: 'var(--primary-rgb)',
                      fontSize: 12,
                    }}
                  >
                    Amount
                  </Box>
                  <Box
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 13,
                      fontWeight: 400,
                    }}
                  >
                    {commaNumber(item?.finalFare || 0)}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HotelBookingListPhone;
