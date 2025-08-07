/* eslint-disable react/prop-types */
import { Box, Grid, Stack, Typography } from '@mui/material';
import CustomTypography from '../../Common/CustomTypography';
import ScheduleIcon from '@mui/icons-material/Schedule';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import FlightIcon from '@mui/icons-material/Flight';
import { FormatTime } from '../../Common/TimeAndDistanceCalculation/FormateTime';
import { TotalDistance } from '../../Common/TimeAndDistanceCalculation/TotalDistance';
import { totalTimeCalculate } from '../../Common/TimeAndDistanceCalculation/totalTimeCalculate';
import moment from 'moment';
import TransitTooltip from './TransitTooltip';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 200,
    backgroundColor: 'var(--primary-color)',
  },
});
const FlightLayout = ({ allData, data }) => {
  const segmentArray = data;
  const firstSegmentData = segmentArray[0];
  const lastSegmentData = segmentArray[segmentArray.length - 1];
  const durationCheck =
    allData?.system === 'TL' ||
    allData?.system === 'SOTO_A' ||
    allData?.system === 'TRIPFINDY' ||
    allData?.system === 'NDC_V' ||
    allData?.system === 'INDIGO' ||
    allData?.system === 'SG_IATA' ||
    allData?.system === undefined;
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      my={1}
      columnSpacing={{ xs: 0.5, sm: 1 }}
    >
      <Grid item xs={3.7} sm={3} md={2.8}>
        <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
          <Box
            sx={{
              width: { xs: '30px', sm: '30px', md: '40px' },
              height: { xs: '30px', sm: '30px', md: '40px' },
            }}
          >
            <img
              src={`https://tripfindy-logos.s3.ap-southeast-1.amazonaws.com/airlines/${firstSegmentData?.marketingCarrier}.png`}
              alt="flight logo"
              width="100%"
            />
          </Box>
          <Box width={'100%'}>
            <Typography
              noWrap
              sx={{
                color: 'var(--secondary)',
                fontSize: { xs: 10, md: 12 },
                span: { fontSize: 10 },
                maxWidth: { xs: 70, md: 90, lg: 100 },
              }}
            >
              {firstSegmentData?.departureAirportCode} -
              <span> {firstSegmentData.departureLocation?.split(',')[0]}</span>
            </Typography>
            <Typography
              sx={{
                color: 'var(--primary)',
                fontSize: { xs: 14, md: 16, fontWeight: 500 },
              }}
            >
              {FormatTime(firstSegmentData.departureDateTime)}
            </Typography>
            <Typography
              sx={{
                color: 'var(--black)',
                fontSize: { xs: 12, md: 13 },
              }}
            >
              {moment(
                firstSegmentData?.departureDateTime?.split('T')[0]
              ).format('DD MMM, ddd')}
              {/* {firstSegmentData.departureAirportCode} */}
            </Typography>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={5.8} sm={6} md={7} sx={{ pr: { xs: 1, md: 2 } }}>
        <CustomWidthTooltip
          title={
            <Box>
              {segmentArray?.length > 1 ? (
                <TransitTooltip data={segmentArray} />
              ) : null}
            </Box>
          }
          placement="top"
          followCursor
        >
          <Box>
            <Box
              sx={{
                visibility: 'hidden',
                display: { xs: 'none', md: 'block' },
              }}
            >
              gap fill up for design
            </Box>
            <Box
              sx={{ position: 'relative', mt: { xs: 2, md: 0 } }}
              className="dashed-top-line"
            >
              <Typography
                className="position-center"
                sx={{
                  bgcolor: 'var(--white)',
                  px: 0.3,
                  fontSize: { xs: 10, md: 12 },
                  fontWeight: 500,
                  color: 'var(--dark-green)',
                  mt: -0.19,
                }}
              >
                {segmentArray.length === 1
                  ? 'Direct'
                  : segmentArray.length === 2
                  ? '1 Stop'
                  : segmentArray.length === 3
                  ? '2 Stop'
                  : '3 Stop'}
              </Typography>
              <CircleOutlinedIcon
                sx={{
                  fontSize: 12,
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  transform: 'translateY(-50%)',
                  bgcolor: 'var(--white)',
                  color: 'var(--primary)',
                }}
              />
              <FlightIcon
                sx={{
                  fontSize: 18,
                  position: 'absolute',
                  top: '50%',
                  right: 0,
                  transform: 'translateY(-50%) rotate(90deg)',
                  color: 'var(--primary)',
                }}
              />
            </Box>

            <Stack
              direction="row"
              justifyContent="space-around"
              sx={{
                display: { xs: 'flex', sm: 'flex' },
                pt: { xs: 0.5, md: 0 },
              }}
            >
              <CustomTypography
                fontcolor="var(--icon-color)"
                value={totalTimeCalculate(segmentArray)}
                title="Flight Duration"
                icon={<ScheduleIcon sx={{ fontSize: { xs: 11, md: 13 } }} />}
                fsize={{ xs: 8, md: 11 }}
              />

              {durationCheck ? (
                <Box></Box>
              ) : (
                <CustomTypography
                  fontcolor="var(--icon-color)"
                  value={`${TotalDistance(segmentArray, 'totalMiles')} km`}
                  title="Total Distance"
                  icon={
                    <RoomOutlinedIcon sx={{ fontSize: { xs: 12, md: 16 } }} />
                  }
                  fsize={{ xs: 8, md: 11 }}
                />
              )}
            </Stack>
          </Box>
        </CustomWidthTooltip>
      </Grid>
      <Grid item xs={2.5} sm={3} md={2}>
        <Box>
          <Typography
            noWrap
            sx={{
              color: 'var(--secondary)',
              fontSize: { xs: 10, md: 12 },
              span: { fontSize: 10 },
            }}
          >
            {lastSegmentData?.arrivalAirportCode} -
            <span> {lastSegmentData.arrivalLocation?.split(',')[0]}</span>
          </Typography>
          <Typography
            sx={{
              color: 'var(--primary)',
              fontSize: { xs: 14, md: 16, fontWeight: 500 },
            }}
          >
            {FormatTime(lastSegmentData.arrivalDateTime)}
          </Typography>
          <Typography
            sx={{
              color: 'var(--black)',
              fontSize: { xs: 12, md: 13 },
            }}
          >
            {moment(lastSegmentData?.arrivalDateTime?.split('T')[0]).format(
              'DD MMM, ddd'
            )}
            {/* {lastSegmentData.arrivalAirportCode} */}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FlightLayout;
