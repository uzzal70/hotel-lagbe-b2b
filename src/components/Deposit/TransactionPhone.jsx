/* eslint-disable react/prop-types */
import { Box, Grid, Stack, Typography } from '@mui/material';
import moment from 'moment';
import commaNumber from 'comma-number';
import PanoramaIcon from '@mui/icons-material/Panorama';

const TransactionPhone = ({ data, viewImage, baseUrl }) => {
  return (
    <div>
      <Grid container spacing={1.5} mb={1}>
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
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  textTransform={'capitalize'}
                  className={item?.status?.toLowerCase()}
                  sx={{
                    py: 0.3,
                    px: 2,
                    textAlign: 'center',
                    fontSize: 13,
                    fontWeight: 400,
                  }}
                  noWrap
                >
                  {item?.status === 'BLOCKED'
                    ? 'REJECTED'
                    : item?.status?.replace(/_/g, ' ').toLowerCase()}
                </Typography>
                <Box
                  sx={{
                    fontSize: 13,
                    fontWeight: 400,
                    bgcolor: 'var(--body)',
                    px: 2,
                    borderRadius: 2,
                    py: 0.3,
                  }}
                >
                  {item?.paymentType === 'ONLINE_MTB'
                    ? 'Online Payment'
                    : item?.paymentType || 'N/A'}
                </Box>
                <Box
                  onClick={() =>
                    viewImage(
                      `${baseUrl}/core/deposit-request/getPaySlipFilebyDepositId/${item?.depositId}`
                    )
                  }
                >
                  <PanoramaIcon
                    className="active-class"
                    sx={{ p: 0.5, fontSize: 30, borderRadius: '50%' }}
                  />
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
                    Deposit Id
                  </Box>
                  <Box
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 13,
                      fontWeight: 400,
                    }}
                  >
                    {item?.ref || 'N/A'}
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box
                    sx={{
                      color: 'var(--primary-rgb)',
                      fontSize: 12,
                    }}
                  >
                    Amount (BDT)
                  </Box>
                  <Box
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 13,
                      fontWeight: 400,
                    }}
                  >
                    {commaNumber(item?.amount || 0)}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      color: 'var(--primary-rgb)',
                      fontSize: 12,
                    }}
                  >
                    Sender
                  </Box>
                  <Typography
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 13,
                      fontWeight: 400,
                      textTransform: 'capitalize',
                    }}
                    noWrap
                  >
                    {item?.depositFrom || data?.cardHolderName || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      color: 'var(--primary-rgb)',
                      fontSize: 12,
                    }}
                  >
                    Received
                  </Box>
                  <Typography
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 13,
                      fontWeight: 400,
                      textTransform: 'capitalize',
                    }}
                    noWrap
                  >
                    {item?.depositTo === 'MTB'
                      ? 'Bank'
                      : item?.depositTo || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      color: 'var(--primary-rgb)',
                      fontSize: 12,
                    }}
                  >
                    Transaction Date
                  </Box>
                  <Box
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 13,
                      fontWeight: 400,
                    }}
                  >
                    {item?.depositDate
                      ? moment(item?.depositDate).format('DD MMM YYYY hh:mm a')
                      : 'N/A'}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      color: 'var(--primary-rgb)',
                      fontSize: 12,
                    }}
                  >
                    Deposit Date
                  </Box>
                  <Box
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 13,
                      fontWeight: 400,
                    }}
                  >
                    {item?.createdAt
                      ? moment(item?.createdAt).format('DD MMM YYYY hh:mm a')
                      : 'N/A'}
                    {/* {moment(item?.createdAt).format('DD MMM YYYY hh:mm a')} */}
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

export default TransactionPhone;
