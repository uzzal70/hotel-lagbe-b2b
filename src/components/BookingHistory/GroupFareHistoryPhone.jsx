/* eslint-disable react/prop-types */
import { Grid, Box, Stack, Typography } from '@mui/material';
import commaNumber from 'comma-number';
import moment from 'moment';
import companyInfo from '../../common/companyInfo';

const GroupFareHistoryPhone = ({ data }) => {
  return (
    <div>
      <Grid container spacing={{ xs: 1.5, md: 2 }}>
        {data?.map((item, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Box
              sx={{
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
                p: 2,
                fontWeight: 300,
                span: {
                  color: 'var(--disable)',
                },
                color: 'var(--secondary)',
                borderRadius: 1,
                bgcolor: 'var(--white)',
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1}>
                  <img
                    src={`https://tripfindy-logos.s3.ap-southeast-1.amazonaws.com/airlines/${item.code}.png`}
                    style={{ width: '20px' }}
                  />
                  <Typography
                    noWrap
                    sx={{ fontSize: 13, color: 'var(--primary)' }}
                  >
                    {item?.route}
                  </Typography>
                </Stack>
                {/* <Stack direction="row" spacing={1}>
                  {name2 === 'Paid Amount' ? (
                    <Box
                      textTransform={'capitalize'}
                      className={`paid-btn`}
                      sx={{
                        fontSize: 12,
                        px: 1,
                      }}
                    >
                      Paid
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        textAlign: 'end',
                        px: 2,
                        py: 0.4,
                        fontSize: 10,
                        textTransform: 'capitalize',
                      }}
                      className={`${item?.status?.toLowerCase()}`}
                    >
                      {item?.status === 'BOOKING_HOLD'
                        ? 'Hold'
                        : item?.status === 'MANUAL_TICKETED'
                        ? 'Ticketed'
                        : item?.value === 'PARTIAL_REFUND_INITIATED'
                        ? 'Refund Initiated'
                        : item?.status?.replace(/_/g, ' ').toLowerCase()}
                    </Box>
                  )}
                </Stack> */}
                <Typography
                  noWrap
                  sx={{
                    fontSize: 13,
                    color: 'var(--primary)',
                    bgcolor: 'var(--bgcolor)',
                    px: 1,
                    py: 0.2,
                    borderRadius: 1,
                  }}
                >
                  {item?.groupRef || 'N/A'}
                </Typography>
              </Stack>
              <Grid container spacing={1} pt={1}>
                <Grid item xs={4}>
                  <Box>
                    <Typography
                      sx={{
                        color: 'var(--primary-rgb)',
                        fontSize: 12,
                      }}
                    >
                      Booking ID
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 13,
                      }}
                      noWrap
                    >
                      {item?.groupBookingRef || 'Booking ID'}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box>
                    <Typography
                      sx={{
                        color: 'var(--primary-rgb)',
                        fontSize: 12,
                      }}
                    >
                      Baggage
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 13,
                      }}
                    >
                      {item?.baggage}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box>
                    <Typography
                      sx={{
                        color: 'var(--primary-rgb)',
                        fontSize: 12,
                      }}
                    >
                      Traveler (S)
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 13,
                      }}
                    >
                      {item?.seat || 0}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box>
                    <Typography
                      sx={{
                        color: 'var(--primary-rgb)',
                        fontSize: 12,
                      }}
                    >
                      Fly Date
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 12,
                      }}
                    >
                      {item?.date}
                      {', '}
                      {item?.feature}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Typography
                      sx={{
                        color: 'var(--primary-rgb)',
                        fontSize: 12,
                      }}
                    >
                      Booking Time
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 13,
                      }}
                    >
                      {moment(
                        item.groupFareSaleHistoryUpdatedAt?.split('Z')[0]
                      ).format('DD MMM YYYY')}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Typography
                      sx={{
                        color: 'var(--primary-rgb)',
                        fontSize: 12,
                      }}
                    >
                      Agent price
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 13,
                      }}
                    >
                      {commaNumber(item?.fare)} {companyInfo.currencyType}
                    </Typography>
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

export default GroupFareHistoryPhone;
