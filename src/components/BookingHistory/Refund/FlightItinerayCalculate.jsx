/* eslint-disable react/prop-types */
import { Box, Grid, Stack, Typography } from '@mui/material';
import moment from 'moment';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import FlightIcon from '@mui/icons-material/Flight';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CustomTypography from '../../Common/CustomTypography';
import { totalTimeCalculate } from '../../Common/TimeAndDistanceCalculation/totalTimeCalculate';

const FlightItinerayCalculate = ({ data, handleCheckboxChange, check }) => {
  return (
    <Box>
      {data?.map((segment, index) => {
        const segmentArray = segment;
        const firstSegmentData = segment[0];
        const lastSegmentData = segmentArray[segmentArray.length - 1];

        return (
          <Box
            sx={{
              mb: { xs: 1, md: 1.5 },
              border: '1px solid var(--bgcolor)',
              borderRadius: '5px',
              overflow: 'hidden',
            }}
            key={index}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{
                justifyContent: 'space-between',
                bgcolor: 'var(--bgcolor)',
                px: 2,
                py: 1,
              }}
            >
              <Stack
                direction={'row'}
                spacing={1.5}
                sx={{
                  color: 'var(--black)',
                  fontSize: 14,
                  fontWeight: 500,
                  alignItems: 'center',
                  input: {
                    height: { xs: 16, md: 16 },
                    width: { xs: 16, md: 16 },
                  },
                }}
              >
                <input
                  id={segment[0]?.group}
                  type="checkbox"
                  checked={check.includes(segment[0].group)}
                  onChange={() =>
                    handleCheckboxChange('segments', segment[0]?.group)
                  }
                />
                <label
                  htmlFor={segment[0]?.group}
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <Box>
                    {segment[0]?.departureAirportCode}
                    {' - '}
                    {segment[segment?.length - 1]?.arrivalAirportCode}
                  </Box>
                  &nbsp;&nbsp;{'|'}
                  <Box sx={{ fontSize: 12 }}>
                    {moment(segment[0]?.departureDateTime).format(
                      'DD MMM YYYY'
                    )}
                  </Box>
                  &nbsp;&nbsp;{'|'}
                  <Box>
                    {segment?.length === 1 ? 'Non' : segment?.length} Stop
                  </Box>
                </label>
              </Stack>
            </Stack>
            <Box sx={{ p: { xs: 1, md: 2 } }}>
              <Stack
                direction={'row'}
                sx={{
                  color: 'var(--dark-sky)',
                  alignItems: 'center',
                }}
              >
                <Box>
                  {firstSegmentData?.marketingCarrierName || 'Flight Name'}
                </Box>
                <Box sx={{ fontSize: 12 }}>
                  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                  {firstSegmentData?.operatingCarrier}
                  {' - '}
                  {firstSegmentData?.marketingflight}
                </Box>
                <Box sx={{ fontSize: 12 }}>
                  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                  {firstSegmentData?.equipment}
                </Box>
              </Stack>

              <Grid container spacing={1} alignItems="center">
                <Grid item xs={4} md={4}>
                  <Box
                    sx={{
                      fontSize: { xs: 12, md: 13 },
                      color: 'var(--black)',
                    }}
                  >
                    <Box
                      sx={{
                        mt: 1,
                        fontSize: 15,
                        fontWeight: { xs: 500, md: 600 },
                      }}
                    >
                      {moment(
                        firstSegmentData?.departureTime?.slice(0, 8),
                        'HH:mm:ss'
                      ).format('hh:mm A')}
                    </Box>
                    <Box>
                      {moment(
                        firstSegmentData?.departureDateTime?.split('T')[0],
                        'YYYY-MM-DD'
                      ).format('ddd DD MMM YYYY')}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: { xs: 12, md: 13 },
                        color: 'var(--black)',
                      }}
                      noWrap
                    >
                      {firstSegmentData?.departureAirportName}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} md={4} textAlign={'center'}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: { xs: 'center', md: 'start' },
                      pl: { xs: 0, md: 2 },
                    }}
                  >
                    <CustomTypography
                      fontcolor="var(--icon-color)"
                      value={totalTimeCalculate(segmentArray)}
                      title="Flight Duration"
                      icon={
                        <ScheduleIcon sx={{ fontSize: { xs: 11, md: 13 } }} />
                      }
                      fsize={{ xs: 8, md: 11 }}
                    />
                  </Box>

                  <Box
                    sx={{ position: 'relative', my: { xs: 0.3, md: 0 } }}
                    className="dashed-top-line"
                  >
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
                </Grid>
                <Grid item xs={4} md={4}>
                  <Box
                    sx={{
                      fontSize: { xs: 12, md: 13 },
                      color: 'var(--black)',
                      textAlign: 'end',
                    }}
                  >
                    <Box
                      sx={{
                        mt: 1,
                        fontSize: 15,
                        fontWeight: { xs: 500, md: 600 },
                      }}
                    >
                      {moment(
                        lastSegmentData?.arrivalTime?.slice(0, 8),
                        'HH:mm:ss'
                      ).format('hh:mm A')}
                    </Box>
                    <Box>
                      {moment(
                        lastSegmentData?.arrivalDateTime?.split('T')[0],
                        'YYYY-MM-DD'
                      ).format('ddd DD MMM YYYY')}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: { xs: 12, md: 13 },
                        color: 'var(--black)',
                      }}
                      noWrap
                    >
                      {lastSegmentData?.arrivalAirportName}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default FlightItinerayCalculate;
