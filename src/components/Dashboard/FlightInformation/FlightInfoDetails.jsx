/* eslint-disable react/prop-types */
import { Box, Grid, Modal, Stack, Typography } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import FlightIcon from '@mui/icons-material/Flight';
import CustomButton from '../../Common/CustomButton';
import { useState } from 'react';
import FlightDetails from './../FlightResults/FlightDetails';
import moment from 'moment';
import { FormatTime } from '../../Common/TimeAndDistanceCalculation/FormateTime';
import CustomTypography from '../../Common/CustomTypography';
import { totalTimeCalculate } from '../../Common/TimeAndDistanceCalculation/totalTimeCalculate';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  border: 'none',
  boxShadow: 24,
  borderRadius: '6px',
  py: 0,
};

const FlightInfoDetails = ({ allData, data, index }) => {
  const [open, setOpen] = useState(false);
  const handleOpne = () => {
    setOpen(!open);
  };
  const segmentArray = data;
  const firstSegmentData = segmentArray[0];
  const lastSegmentData = segmentArray[segmentArray.length - 1];
  return (
    <Box
      sx={{
        bgcolor: 'var(--white)',
        pb: { xs: 0.5, md: 2 },
        px: 2,
        mb: 1.2,
      }}
    >
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={3}>
          <Typography sx={{ color: 'var(--black)', fontSize: 12 }}>
            Departure
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ color: 'var(--secondary)', fontSize: 12 }}>
            {moment(firstSegmentData?.departureDateTime).format('DD MMM, YYYY')}
          </Typography>
        </Grid>
        <Grid item xs={4} textAlign="end">
          {index === 0 && (
            <CustomButton
              fontSize={{ xs: '10px', sm: '11px' }}
              value={'View Details'}
              textcolor={'var(--primary)'}
              bgcolor={'var(--bgcolor)'}
              hovercolor={'var(--bgcolor)'}
              padding="3px 8px"
              handleClick={handleOpne}
            />
          )}
        </Grid>
      </Grid>

      <Box>
        <Grid
          container
          alignItems="center"
          my={2}
          columnSpacing={{ xs: 0.5, sm: 1 }}
        >
          <Grid item xs={1.5}>
            <Box
              sx={{
                width: { xs: '30px' },
                height: { xs: '30px' },
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
              <img
                src={`https://tripfindy-logos.s3.ap-southeast-1.amazonaws.com/airlines/${firstSegmentData?.marketingCarrier}.png`}
                alt="flight logo"
                width="100%"
              />
            </Box>
          </Grid>
          <Grid item xs={2.5}>
            <Box>
              <Typography
                noWrap
                sx={{ color: 'var(--secondary)', fontSize: 10 }}
              >
                {firstSegmentData.departureLocation?.split(',')[0]}
              </Typography>
              <Typography
                sx={{
                  color: 'var(--primary)',
                  fontSize: { xs: 14, fontWeight: 500 },
                }}
              >
                {FormatTime(firstSegmentData.departureDateTime)}
              </Typography>
              <Typography
                sx={{
                  color: 'var(--black)',
                  fontSize: { xs: 12 },
                }}
              >
                {moment(
                  firstSegmentData?.departureDateTime?.split('T')[0]
                ).format('DD MMM, ddd')}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={5.5} sx={{ pr: { xs: 1 } }}>
            <Box
              sx={{
                visibility: 'hidden',
                display: { xs: 'none', md: 'block' },
              }}
            >
              gap fill up
            </Box>
            <Box
              sx={{
                position: 'relative',
                mt: { xs: 2, md: 0 },
                borderTop: '1px dashed var(--dash)',
              }}
            >
              <Typography
                className="position-center"
                sx={{
                  bgcolor: 'var(--white)',
                  px: 0.3,
                  fontSize: 12,
                  fontWeight: 500,
                  color: 'var(--dark-green)',
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
                  fontSize: 10,
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
                  right: -1,
                  transform: 'translateY(-50%) rotate(90deg)',
                  color: 'var(--primary)',
                }}
              />
            </Box>
            <Stack
              direction="row"
              justifyContent="space-around"
              sx={{
                display: { xs: 'flex' },
                pt: 1,
              }}
            >
              <CustomTypography
                fontcolor="var(--icon-color)"
                value={totalTimeCalculate(segmentArray)}
                title="Flight Duration"
                icon={<ScheduleIcon sx={{ fontSize: { xs: 11, md: 12 } }} />}
                fsize={{ xs: 8, md: 10 }}
              />
            </Stack>
          </Grid>
          <Grid item xs={2.5}>
            <Box>
              <Typography
                noWrap
                sx={{ color: 'var(--secondary)', fontSize: 10 }}
              >
                {lastSegmentData?.arrivalLocation?.split(',')[0]}
              </Typography>
              <Typography
                sx={{
                  color: 'var(--primary)',
                  fontSize: { xs: 14, fontWeight: 500 },
                }}
              >
                {FormatTime(lastSegmentData?.arrivalDateTime)}
              </Typography>
              <Typography
                sx={{
                  color: 'var(--black)',
                  fontSize: { xs: 12 },
                }}
              >
                {moment(lastSegmentData?.arrivalDateTime?.split('T')[0]).format(
                  'DD MMM, ddd'
                )}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography noWrap sx={{ color: 'var(--secondary)', fontSize: 12 }}>
          {firstSegmentData.marketingCarrierName}
          {', '}
          {firstSegmentData.marketingCarrier}-{firstSegmentData.marketingflight}
        </Typography>
        <Typography noWrap sx={{ color: 'var(--secondary)', fontSize: 12 }}>
          {allData.refundable === 'true' || allData.refundable === true
            ? 'Refundable'
            : 'Non Refundable'}
        </Typography>
        <Typography noWrap sx={{ color: 'var(--secondary)', fontSize: 12 }}>
          Seat:{' '}
          {firstSegmentData?.seatsAvailable === '0' ||
          firstSegmentData?.seatsAvailable === 0
            ? 9
            : firstSegmentData?.seatsAvailable || 9}
        </Typography>
      </Stack>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            ...style,
            minWidth: { xs: '80%', sm: '50%', md: '40%' },
            minHeight: { xs: '50%', sm: '50%', md: '400px' },
            maxHeight: { xs: '60%', sm: '50%', md: '400px' },
            overflow: 'hidden',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                width: '50px',
                position: 'absolute',
                right: 0,
                top: 10,
                pl: 2,
                cursor: 'pointer',
              }}
              onClick={() => setOpen(false)}
            >
              <CloseRoundedIcon
                sx={{
                  fontSize: 20,
                  color: 'var(--crimson)',
                }}
              />
            </Box>
            <FlightDetails
              data={allData}
              value=""
              px={3}
              scroll="scroll"
              height="320px"
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default FlightInfoDetails;
