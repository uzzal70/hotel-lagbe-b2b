/* eslint-disable react/prop-types */
import { Grid, Box, Typography } from '@mui/material';
import moment from 'moment';
import companyInfo from '../../common/companyInfo';

const RewardHistoryPhone = ({ data, handleDetails }) => {
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
              onClick={() => {
                if (item?.id || item?.dataSimSaleId) {
                  const { id, dataSimSaleId } = item;
                  const path = id
                    ? '/dashboard/bookingdetails/'
                    : '/dashboard/sim/order/';
                  handleDetails(id || dataSimSaleId, path);
                }
              }}
            >
              <Grid container spacing={1} pt={1}>
                <Grid item xs={4}>
                  <Box>
                    <Typography
                      sx={{
                        color: 'var(--primary-rgb)',
                        fontSize: 12,
                      }}
                    >
                      Reference Id
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 13,
                      }}
                      noWrap
                    >
                      {item?.bookingRef || item?.myAgentId || '—'}
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
                      Reward Credit
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 13,
                      }}
                    >
                      {item?.rewardPointCredit || '0'} P
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
                      Reward Debit
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 13,
                      }}
                    >
                      {item?.rewardPointDebit || '0'} P
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
                      Credited Amount
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 13,
                      }}
                    >
                      {item?.rewardValue || '0'} {companyInfo.currencyType}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} textAlign={'left'}>
                  <Box>
                    <Typography
                      sx={{
                        color: 'var(--primary-rgb)',
                        fontSize: 12,
                      }}
                    >
                      Created At
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 13,
                      }}
                    >
                      {moment(item?.rewardCreatedAt?.split('Z')[0]).format(
                        'DD MMM YYYY'
                      )}
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

export default RewardHistoryPhone;
