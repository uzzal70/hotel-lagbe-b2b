import { Box, Card, Container, Grid, Stack, Typography } from '@mui/material';
import CustomTypography from '../../Common/CustomTypography';
import FlightItinerary from '../../BookingDetails/FlightItinerary';
import PassengerDetails from '../../BookingDetails/PassengerDetails';
import CustomButton from '../../Common/CustomButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import BackButton from '../../Common/BackButton';
import HeaderTitle from '../../../common/HeaderTitle';

const QuotationProcess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); //

  const handleRefund = () => {
    navigate('/dashboard/quotationdetails', {
      state: {
        status: 'Requested for Quatation',
        title: 'Refund',
        view: 'true',
      },
    });
  };
  const handleReissue = () => {
    navigate('/dashboard/quotationdetails', {
      state: {
        status: 'Requested for Quatation',
        title: 'Re-Issue',
        view: 'true',
        old: 'Old',
        new: 'New',
        from: 'reissueflightsearch',
      },
    });
  };

  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        pb: { xs: 7, md: 1 },
      }}
    >
      <HeaderTitle headerTitle={`Partial History`} />
      <Container sx={{ px: { xs: 1, sm: 2, md: '' } }}>
        <Box
          sx={{
            p: { xs: 0, md: 2 },
            my: { xs: 2, md: 3 },
            borderRadius: '6px',
          }}
        >
          <Box
            sx={{
              bgcolor: 'var(--white)',
              borderRadius: '6px',
              p: { xs: 1.5, md: 2 },
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'flex-start', md: 'center' }}
              justifyContent="space-between"
              spacing={{ xs: 1, md: 2 }}
              pb={2}
            >
              <Stack direction="row" spacing={{ xs: 1, md: 2 }}>
                <Typography
                  sx={{
                    color: 'var(--black)',
                    fontSize: { xs: 14, md: 20 },
                    fontWeight: 500,
                  }}
                >
                  {location?.state?.title || 'Hold for'} AC-DXB-DAC{' '}
                </Typography>{' '}
                <CustomTypography
                  value={location?.state?.status || 'Hold'}
                  bgcolor="var(--yellow)"
                  fontcolor="var(--white)"
                  py={0.5}
                  px={1}
                  borderRadius="5px"
                  fsize={{ xs: 10, md: 13 }}
                />
                <CustomButton
                  fontSize={{ xs: 10, md: 13 }}
                  value="Refresh"
                  textcolor="var(--white)"
                  bgcolor="var(--secondary)"
                  hovercolor="var(--secondary)"
                  padding="4px 25px"
                  borderRadius="5px"
                  handleClick={
                    location?.state?.from ? handleReissue : handleRefund
                  }
                />
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  color: 'var(--black)',
                  fontSize: { xs: 10, md: 13 },
                }}
              >
                TimeOut in:&nbsp;
                <CustomTypography
                  value="30min:30sec"
                  bgcolor="var(--yellow)"
                  fontcolor="var(--white)"
                  py={0.5}
                  px={1}
                  fsize={{ xs: 10, md: 13 }}
                />
                <CustomButton
                  fontSize={{ xs: 10, md: 13 }}
                  value="Cancel Request"
                  textcolor="var(--white)"
                  bgcolor="var(--crimson)"
                  hovercolor="var(--crimson)"
                  padding="4px 25px"
                  borderRadius="5px"
                  // handleClick={handleRefund}
                />
              </Stack>
            </Stack>

            {/* Refund or Reissue Requested for Quatation */}
            {location?.state?.status === 'Requested for Quatation' && (
              <Box
                sx={{
                  bgcolor: 'var(--yellow)',
                  color: 'var(--white)',
                  p: 0.8,
                  fontSize: 13,
                  width: 'fit-content',
                  borderRadius: '5px',
                  mb: 3,
                }}
              >
                We&apos;re working on generating your refund quotation. Thanks
                for your patience—we&apos;ll get back to you shortly!
              </Box>
            )}
            <Grid container spacing={{ xs: 1, md: 2 }}>
              <Grid item>
                <Card title={'Booking Created'} value={'01 Aug 2023 16:40'} />
              </Grid>
              <Grid item>
                <Card title={'Time Limit'} value={'Before 01 Aug,2023 18:34'} />
              </Grid>
              <Grid item>
                <Card title={'Reservation PNR'} value={'56PNNG'} />
              </Grid>
              <Grid item>
                <Card title={'Airline PNR'} value={'IFBNJK'} />
              </Grid>
              <Grid item>
                <Card title={'Split PNR'} value={'Split PNR'} />
              </Grid>
              <Grid item>
                <Card title={'ST Reference'} value={'STFL16908864159286'} />
              </Grid>
            </Grid>

            <Box>
              <Typography
                sx={{
                  color: 'var(--black)',
                  fontSize: { xs: 14, md: 16 },
                  pt: 1,
                  pb: 1,
                }}
              >
                {location?.state?.new} Flight Information
              </Typography>
              <Box>
                <FlightItinerary />
              </Box>
            </Box>
            {location?.state?.from && (
              <Box>
                <Typography
                  sx={{
                    color: 'var(--black)',
                    fontSize: { xs: 14, md: 16 },
                    pt: 2,
                    pb: 1,
                  }}
                >
                  {location?.state?.old} Flight Information
                </Typography>
                <Box>
                  <FlightItinerary />
                </Box>
              </Box>
            )}

            <Box>
              <Typography
                sx={{
                  color: 'var(--black)',
                  fontSize: { xs: 14, md: 16 },
                  pt: 3,
                  pb: 1,
                }}
              >
                Passenger Information
              </Typography>
              <Box>
                <PassengerDetails />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default QuotationProcess;
