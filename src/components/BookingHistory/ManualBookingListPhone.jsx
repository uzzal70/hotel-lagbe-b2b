/* eslint-disable react/prop-types */
import { Grid, Box, Stack, Typography, Button } from '@mui/material';
import moment from 'moment';
import companyInfo from '../../common/companyInfo';
import { baseUrl } from '../../../baseurl';
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';

const ManualBookingListPhone = ({
  data,
  handleDetails,
  handleOpenPdfFile,
  name2,
  downloadingRows,
}) => {
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
                        : item?.status === 'MANUAL_TICKETED' ||
                          item?.status === 'MANUALLY_TICKETED_VENDOR'
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
                      {item?.manualBookingRef}
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
                      {item?.passengers?.length || 0}
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
                      {'Booking Time'}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 12,
                      }}
                    >
                      {moment(item?.ticketTime?.split('Z')[0]).format(
                        'DD MMM YYYY'
                      )}
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
                      {item?.agentFare || 0} {companyInfo.currencyType}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box pt={1}>
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
                        cursor: downloadingRows?.[item?.manualBookingId]
                          ? 'not-allowed'
                          : 'pointer',
                        opacity: downloadingRows?.[item?.manualBookingId]
                          ? 0.6
                          : 1,
                      }}
                      endIcon={<SaveAltRoundedIcon />}
                      onClick={() =>
                        handleOpenPdfFile(
                          item?.manualBookingId, // Fixed incorrect key
                          `${baseUrl}/core/agent/getTicketFilebyManualBookingId/${item?.manualBookingId}`
                        )
                      }
                      disabled={
                        downloadingRows?.[item?.manualBookingId] || false
                      } // Prevent multiple clicks
                    >
                      {downloadingRows?.[item?.manualBookingId]
                        ? 'Downloading...'
                        : 'Download'}
                    </Button>
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

export default ManualBookingListPhone;
