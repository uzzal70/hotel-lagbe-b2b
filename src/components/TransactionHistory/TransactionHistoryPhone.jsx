/* eslint-disable react/prop-types */
import { Box, Grid, Stack, Typography } from '@mui/material';
import moment from 'moment';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import commaNumber from 'comma-number';
const TransactionHistoryPhone = ({ data, handleDetails }) => {
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
              onClick={() =>
                item?.bookingId || item?.orderRef
                  ? handleDetails(
                      item?.orderRef
                        ? item?.bimafyOrderDetailsId
                        : item?.bookingId,
                      item?.orderRef
                        ? '/dashboard/insurancebookingdetails/'
                        : '/dashboard/bookingdetails/'
                    )
                  : null
              }
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
                  {item?.serviceType?.replace(/_/g, ' ').toLowerCase()}
                </Typography>
                <Box>
                  {item?.serviceType === 'DEPOSIT_REVERTED' ||
                  item?.debit > 0 ? (
                    <Typography
                      className="remove-class"
                      sx={{
                        fontSize: 12,
                      }}
                    >
                      Debit
                    </Typography>
                  ) : (
                    <Typography
                      className="active-class"
                      sx={{
                        fontSize: 12,
                      }}
                    >
                      Credit
                    </Typography>
                  )}
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
                    Transaction ID
                  </Box>
                  <Box
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 13,
                      fontWeight: 400,
                    }}
                  >
                    {item?.transactionId || 'N/A'}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      color: 'var(--primary-rgb)',
                      fontSize: 12,
                    }}
                  >
                    Reference
                  </Box>
                  <Box
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 13,
                      fontWeight: 400,
                    }}
                  >
                    {item?.bookingRef ||
                      item?.ref ||
                      item?.creditRef ||
                      item?.orderRef ||
                      'N/A'}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      color: 'var(--primary-rgb)',
                      fontSize: 12,
                    }}
                  >
                    Debit (BDT)
                  </Box>
                  <Box
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 13,
                      fontWeight: 400,
                    }}
                  >
                    {commaNumber(item?.debit || 0)}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      color: 'var(--primary-rgb)',
                      fontSize: 12,
                    }}
                  >
                    Credit (BDT)
                  </Box>
                  <Box
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 13,
                      fontWeight: 400,
                    }}
                  >
                    {commaNumber(item?.credit || 0)}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      color: 'var(--primary-rgb)',
                      fontSize: 12,
                    }}
                  >
                    Transaction Time
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
                    Running Balance
                  </Box>
                  <Box
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 13,
                      fontWeight: 400,
                    }}
                  >
                    {commaNumber(item?.accountBalance || 0)}
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

export default TransactionHistoryPhone;
