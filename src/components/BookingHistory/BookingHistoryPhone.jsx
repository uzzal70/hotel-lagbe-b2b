/* eslint-disable react/prop-types */
import { Grid, Box, Stack, Typography, Button } from '@mui/material';
import moment from 'moment';
import companyInfo from '../../common/companyInfo';

const BookingHistoryPhone = ({ data, handleDetails, name, name2 }) => {
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
              onClick={() => handleDetails(item?.id, item)}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1}>
                  <img
                    src={`https://tripfindy-logos.s3.ap-southeast-1.amazonaws.com/airlines/${item.platingCareer}.png`}
                    style={{ width: '20px' }}
                  />
                  <Typography
                    noWrap
                    sx={{ fontSize: 13, color: 'var(--primary)' }}
                  >
                    {item?.route}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  {name2 === 'Paid Amount' ? (
                    <Box
                      textTransform={'capitalize'}
                      className={`${item?.paymentStatus?.toLowerCase()}-btn`}
                      sx={{
                        fontSize: 12,
                        px: 1,
                      }}
                    >
                      {item?.paymentStatus?.replace(/_/g, ' ').toLowerCase()}
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
                </Stack>
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
                      {item?.bookingRef}
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
                      PNR
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 13,
                      }}
                    >
                      {item?.pnr}
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
                      {parseInt(item?.adultCount) +
                        parseInt(item?.childCount) +
                        parseInt(item?.infantCount) || '0'}
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
                      {name2 === 'Paid Amount' ? 'Due Date' : 'Fly Date'}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 12,
                      }}
                    >
                      {name2 === 'Paid Amount'
                        ? moment(item?.dueDate?.split('Z')[0]).format(
                            'DD MMM YYYY hh:mm A'
                          )
                        : moment(item?.travelDate?.split('Z')[0]).format(
                            'DD MMM YYYY'
                          )}

                      {/* {moment(item?.travelDate).format('DD MMM YYYY')} */}
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
                      {name || 'Customer price'}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 13,
                      }}
                    >
                      {name === 'Reissued Amount'
                        ? item?.reissue?.totalAmount || 0
                        : name === 'Refunded Amount'
                        ? item?.refund?.amountRefunded || 0
                        : name === 'Voided Amount'
                        ? item?.void?.totalAmount || 0
                        : name === 'Due Amount'
                        ? item?.dueAmount || 0
                        : item?.grossTotalPrice || 0}{' '}
                      {companyInfo.currencyType}
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
                      {name2 || 'Agent price'}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 13,
                      }}
                    >
                      {name2 === 'Paid Amount'
                        ? item?.paidAmount || 0
                        : item?.totalClientPrice || 0}{' '}
                      {companyInfo.currencyType}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box textAlign={'end'}>
                {/* <Box sx={{ display: name === 'flight' ? 'none' : 'unset' }}>
                  <Typography
                    sx={{
                      color: 'var(--primary-rgb)',
                      fontSize: 12,
                    }}
                  >
                    {name || 'Amount'}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'var(--black)',
                      fontSize: 13,
                    }}
                  >
                    {item?.totalClientPrice}
                  </Typography>
                </Box> */}

                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    boxShadow: 'none',
                    bgcolor: 'var(--bgcolor)',
                    color: 'var(--primary)',
                    py: 0.2,
                    fontSize: 12,
                    ':hover': {
                      bgcolor: 'var(--bgcolor)',
                    },
                    textTransform: 'capitalize',
                    fontWeight: 300,
                  }}
                >
                  Details
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BookingHistoryPhone;
