/* eslint-disable react/prop-types */
import { Box, Grid, Stack, Typography } from '@mui/material';
import CopyToClipboardButton from '../Common/CopyToClipboardButton';

const MFSListPhone = ({ data }) => {
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
                <img
                  src={item?.logo}
                  alt=""
                  style={{
                    height: '25px',
                    maxWidth: '100px',
                    objectFit: 'contain',
                  }}
                />
                <Typography
                  noWrap
                  sx={{ fontSize: 13, color: 'var(--primary)' }}
                >
                  {item?.bankingName}
                </Typography>
                <Box
                  sx={{
                    textAlign: 'end',
                    px: 2,
                    py: 0.4,
                    fontSize: 10,
                  }}
                  className="active-class"
                >
                  Active
                </Box>
              </Stack>
              <Grid container columnSpacing={2} pt={2}>
                <Grid item xs={6}>
                  <Box>
                    <Typography
                      sx={{
                        color: 'var(--primary-rgb)',
                        fontSize: 12,
                      }}
                    >
                      Account Number
                    </Typography>
                    <Stack
                      direction="row"
                      sx={{
                        color: 'var(--black)',
                        fontSize: 13,
                      }}
                    >
                      {item?.accountNo}&nbsp;
                      <CopyToClipboardButton
                        textToCopy={item?.accountNo}
                        fontSize={18}
                      />
                    </Stack>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box>
                    <Typography
                      sx={{
                        color: 'var(--primary-rgb)',
                        fontSize: 12,
                      }}
                    >
                      Account Name
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 13,
                      }}
                    >
                      {item?.accountName}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item>
                  <Box>
                    <Typography
                      sx={{
                        color: 'var(--primary-rgb)',
                        fontSize: 12,
                      }}
                    >
                      Payment Charge{' '}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 13,
                      }}
                    >
                      {item?.transactionCharge}
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

export default MFSListPhone;
