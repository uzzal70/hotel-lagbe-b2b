/* eslint-disable react/prop-types */
import { Box, Grid, Typography } from '@mui/material';
import moment from 'moment/moment';
import companyInfo from '../../common/companyInfo';

const EventTableList = ({ data, handleDetails }) => {
  return (
    <Box
      sx={{
        color: 'white',
      }}
    >
      {data?.map((item, i) => (
        <Box
          key={i}
          sx={{
            px: 1,
            py: 0.5,
            borderTop: '1px solid #3C3C3C',
          }}
        >
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item xs={6} sm={4} md={2}>
              <Box>
                <Box
                  sx={{
                    fontSize: 9,
                  }}
                >
                  {item?.route || 'N/A'}
                </Box>
                <Typography
                  sx={{
                    fontSize: 11,
                    mt: -0.2,
                    color: 'var(--yellow)',
                  }}
                  noWrap
                >
                  <Box>
                    {moment(item?.travelDate?.split('Z')[0]).format(
                      'DD MMM YYYY'
                    )}
                  </Box>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={2.5}>
              <Box>
                <Box
                  sx={{
                    fontSize: 9,
                  }}
                >
                  Booking ID
                </Box>
                <Typography
                  sx={{
                    fontSize: 11,
                    mt: -0.2,
                  }}
                  noWrap
                >
                  {item?.bookingRef || 'N/A'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Box>
                <Typography
                  sx={{
                    fontSize: 9,
                  }}
                  noWrap
                >
                  {item?.platingCareer || 'N/A'}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 11,
                    mt: -0.2,
                  }}
                >
                  {item?.marketingAirline || 'N/A'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} sm={4} md={2}>
              <Box>
                <Box
                  sx={{
                    fontSize: 9,
                  }}
                >
                  Lead Traveller
                </Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    textTransform: 'capitalize',
                    mt: -0.2,
                  }}
                  noWrap
                >
                  {item?.contactName?.toLowerCase() || 'N/A'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={1.5}>
              <Typography
                sx={{
                  fontSize: 12,
                  textTransform: 'capitalize',
                }}
                noWrap
              >
                {companyInfo.currencyType} {item?.totalClientPrice}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={4}
              md={1}
              sx={{
                cursor: 'pointer',
                color: 'var(--yellow)',
              }}
              onClick={() => handleDetails(item?.id)}
            >
              <Box fontSize={14}>View</Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default EventTableList;
