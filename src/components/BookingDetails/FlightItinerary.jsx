/* eslint-disable react/prop-types */
import { Box, Grid, Stack, Typography } from '@mui/material';
import moment from 'moment';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import FlightIcon from '@mui/icons-material/Flight';
import CustomTypography from '../Common/CustomTypography';
import ScheduleIcon from '@mui/icons-material/Schedule';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import {
  GetAircraftName,
  TransitTimeCalculate,
} from '../Common/TimeAndDistanceCalculation/totalTimeDifference';
import { convertToSegments } from './convertToSegments';

const FlightItinerary = ({ data }) => {
  // const mainData = data || [];
  // const convertToSegments = mainData.reduce((acc, current) => {
  //   const lastGroup = acc.length > 0 ? acc[acc.length - 1] : null;

  //   if (lastGroup && lastGroup[0].group === current.group) {
  //     // second time then match the current group. Otherwise group the current did not match the last group agein new group created
  //     lastGroup.push(current);
  //   } else {
  //     acc.push([current]); // first time  first group created
  //   }
  //   return acc;
  // }, []);
  const segmentedData = convertToSegments(data);

  const timeAndDistance = (value, time) => {
    let totalDistance = parseInt(value);
    let totalKilometers = Math.floor(totalDistance) * 1.60934;
    const hours = Math.floor(totalDistance / 60);
    const minutes = totalDistance % 60;
    const formattedDuration = `${hours}h ${minutes}m`;
    return time ? formattedDuration : parseInt(totalKilometers);
  };
  return (
    <Box>
      {segmentedData?.map((segment, index) => (
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
              }}
            >
              <Box>
                {segment[0]?.departureAirportCode}
                {' - '}
                {segment[segment?.length - 1]?.arrivalAirportCode}
              </Box>
              &nbsp;&nbsp;&nbsp;{'|'}
              <Box sx={{ fontSize: 12 }}>
                {moment(
                  segment[0]?.departureDateTime?.split('T')[0],
                  'YYYY-MM-DD'
                ).format('DD MMM YYYY')}
                {/* {moment(segment[0]?.departureDateTime).format('DD MMM YYYY')} */}
              </Box>
              &nbsp;&nbsp;&nbsp;{'|'}
              <Box>
                {segment?.length === 1 ? 'Non' : segment?.length - 1} Stop
              </Box>
            </Stack>
            {/* <Typography sx={{ color: 'var(--primary)', fontSize: 14 }}>
              Fare terms & policy
            </Typography> */}
          </Stack>
          <Box sx={{ p: { xs: 1, md: 2 } }}>
            {segment?.map((item, index, arr) => (
              <Box key={index}>
                <Stack
                  direction={'row'}
                  sx={{
                    color: 'var(--dark-sky)',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={`https://tripfindy-logos.s3.ap-southeast-1.amazonaws.com/airlines/${item?.marketingCarrier}.png`}
                      style={{ width: '20px' }}
                    />
                    &nbsp;{item?.marketingCarrierName || 'Flight Name'}
                  </Box>
                  <Box sx={{ fontSize: 12 }}>
                    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    {item?.marketingCarrier}
                    {' - '}
                    {item?.marketingflight}
                  </Box>
                  <Box sx={{ fontSize: 12 }}>
                    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    {GetAircraftName(item)}
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
                          fontSize: 12,
                          fontWeight: 500,
                          color: 'var(--dark-sky)',
                        }}
                      >
                        {item?.marketingCarrier !== item.operatingCarrier &&
                          `Operated by ${item?.operatingCarrierName}`}
                      </Box>
                      <Box
                        sx={{
                          mt: 1,
                          fontSize: 15,
                          fontWeight: { xs: 500, md: 600 },
                        }}
                      >
                        {moment(
                          item?.departureDateTime?.slice(11, 16),
                          'HH:mm'
                        ).format('hh:mm A')}
                      </Box>
                      <Box>
                        {moment(
                          item?.departureDateTime?.split('T')[0],
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
                        {item?.departureAirportName}
                      </Typography>
                      {item?.dpartureTerminal === null ||
                      item?.dpartureTerminal === '' ? null : (
                        <Box>Terminal: {item?.dpartureTerminal}</Box>
                      )}
                      <Box>{item?.cabinClass}</Box>
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
                        value={`${timeAndDistance(
                          item.flightDuration,
                          'time'
                        )}`}
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

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'end' },
                        pr: { xs: 0, md: 2 },
                      }}
                    >
                      {Number(item?.totalMiles) > 0 ? (
                        <CustomTypography
                          fontcolor="var(--icon-color)"
                          value={`${timeAndDistance(
                            Number(item.totalMiles)
                          )} km`}
                          title="Total Distance"
                          icon={
                            <RoomOutlinedIcon
                              sx={{ fontSize: { xs: 13, md: 16 } }}
                            />
                          }
                          fsize={{ xs: 8, md: 11 }}
                        />
                      ) : null}
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
                          item?.arrivalDateTime?.slice(11, 16),
                          'HH:mm'
                        ).format('hh:mm A')}
                      </Box>
                      <Box>
                        {moment(
                          item?.arrivalDateTime?.split('T')[0],
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
                        {item?.arrivalAirportName}
                      </Typography>
                      {item?.arrivalTerminal === null ||
                      item?.arrivalTerminal === '' ? null : (
                        <Box>Terminal: {item?.arrivalTerminal}</Box>
                      )}
                      <Box>{item?.cabinClass}</Box>
                    </Box>
                  </Grid>
                </Grid>

                {arr?.length - 1 !== index && (
                  <Box
                    sx={{ position: 'relative', mt: 3, mb: 1 }}
                    className="dashed-top-line"
                  >
                    <Box
                      sx={{
                        border: '1px dashed var(--primary)',
                        bgcolor: 'var(--bgcolor)',
                        fontSize: 12,
                        color: 'var(--primary)',
                        borderRadius: '20px',
                        width: 'fit-content',
                        px: 2,
                        py: 0.3,
                        margin: 'auto',
                        mt: -1.6,
                      }}
                    >
                      Change of plane{' '}
                      {TransitTimeCalculate(
                        segment?.[index + 1]?.departureDateTime?.split('+')[0],
                        segment?.[index]?.arrivalDateTime?.split('+')[0]
                      )}{' '}
                      Layover in {item.arrivalLocation?.split(',')[0]}
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default FlightItinerary;
