/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Grid, Box, Button, Stack, Typography, Tooltip } from '@mui/material';
import ImageImport from '../../../assets/ImageImport';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import PriceBreakdown from './PriceBreakdown/PriceBreakdown';
import { useLocation } from 'react-router-dom';
import CustomTypography from '../../Common/CustomTypography';
import { ExpandMore } from '@mui/icons-material';
import {
  FormatDate,
  FormatTime,
} from '../../Common/TimeAndDistanceCalculation/FormateTime';
import {
  GetAircraftName,
  TransitTimeCalculate,
} from '../../Common/TimeAndDistanceCalculation/totalTimeDifference';
import { totalTimeCalculate } from '../../Common/TimeAndDistanceCalculation/totalTimeCalculate';
import companyInfo from '../../../common/companyInfo';

const FlightDetails = ({ data, px, scroll, height, akRules, qrRules }) => {
  const location = useLocation();
  const [alignment, setAlignment] = useState('Itinerary');
  const buttons = [
    { label: 'Itinerary', value: 'Itinerary' },
    { label: 'Baggage', value: 'Baggage' },
    { label: 'Fare Rules', value: 'FareRules' },
    { label: 'Price Breakdown', value: 'Price' },
  ];

  const handleChange = (newAlignment) => {
    setAlignment(newAlignment);
  };

  const cancellation = [
    {
      c1: `Ticket Cancel Fee = Airline's Fee + ${companyInfo.companyName} Fee`,
    },
    {
      c1: `Refund Amount = Airlines Paid Amount - ${companyInfo.companyName} Fee`,
    },
    {
      c1: `Ticket Cancel Fee = Airline's Fee + ${companyInfo.companyName} Fee`,
    },
  ];
  const [itineraryOpen, setItineraryOpen] = useState(Array(2).fill(false));
  const handleToggle = (index) => {
    setItineraryOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const segmentArray = data.segments;
  const TimeAndDistance = (value, time) => {
    let totalDistance = parseInt(value);
    let totalKilometers = Math.floor(totalDistance) * 1.60934;
    const hours = Math.floor(totalDistance / 60);
    const minutes = totalDistance % 60;
    const formattedDuration = `${hours}h ${minutes}m`;
    return time ? formattedDuration : parseInt(totalKilometers);
  };
  const grossTotalPrice = data?.grossTotalPrice;
  const totalClientPrice = data?.totalClientPrice;

  // const updatedPriceBreakdown = updateBaggageRules(data.priceBreakdown);
  // console.log('updatedPriceBreakdown', updatedPriceBreakdown);
  return (
    <Box>
      <Grid
        container
        px={{ xs: 0, sm: 1, md: 2, lg: 7 }}
        pt={location.pathname === '/dashboard/passengerinformation' ? 0 : 2}
      >
        <Grid
          item
          xs={12}
          md={9.5}
          className={
            location.pathname === '/dashboard/passengerinformation'
              ? ''
              : 'dashed-top-line'
          }
        ></Grid>
      </Grid>
      <Grid container px={{ xs: 1, sm: 1, md: 2, lg: px || 7 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            sx={{
              py: 2,
              button: {
                textTransform: 'capitalize',
                fontWeight: 400,
                fontSize: { xs: 10, sm: 12 },
                px: { xs: 1, sm: 2 },
                borderRadius: '5px',
              },
            }}
          >
            <Stack direction="row" spacing={{ xs: 1, sm: 2 }}>
              {buttons.map((button, i, arr) => (
                <Button
                  key={button.value}
                  onClick={() => handleChange(button.value)}
                  sx={{
                    bgcolor:
                      alignment === button.value
                        ? 'var(--primary)'
                        : 'var(--bgcolor)',
                    color:
                      alignment === button.value
                        ? 'var(--white)'
                        : 'var(--primary)',
                    '&:hover': {
                      bgcolor:
                        alignment === button.value
                          ? 'var(--primary)'
                          : 'var(--bgcolor)',
                    },
                    display: {
                      md: i === arr.length - 1 ? 'none' : 'unset',
                      xs:
                        i === arr.length - 1 &&
                        location.pathname === '/dashboard/passengerinformation'
                          ? 'none'
                          : 'unset',
                    },
                  }}
                >
                  {button.label}
                </Button>
              ))}
            </Stack>
          </Box>
          <Box
            mb={3}
            sx={{ overflowY: scroll || 'hidden', maxHeight: height || 'auto' }}
          >
            {alignment === 'Itinerary' && (
              <Box>
                <Grid container columnSpacing={{ md: 1 }}>
                  {/* {[...new Array(value === 'oneway' ? 1 : 2)].map( */}
                  {segmentArray.map((segment, index) => {
                    return (
                      <Grid
                        item
                        key={index}
                        xs={12}
                        md={
                          location.pathname ===
                          '/dashboard/passengerinformation'
                            ? 12
                            : 6
                        }
                        lg={6}
                      >
                        <Typography
                          sx={{
                            color: 'var(--primary)',
                            fontSize: { xs: 12, md: 16 },
                          }}
                        >
                          {segment[0].departureLocation?.split(',')[0]}-{' '}
                          {
                            segment[segment.length - 1].arrivalLocation?.split(
                              ','
                            )[0]
                          }
                        </Typography>
                        <Box py={2}>
                          {segment.map((item, j, arr) => {
                            return (
                              <Grid
                                container
                                key={j}
                                className={
                                  itineraryOpen[index]
                                    ? j === 0 || j === arr.length - 1
                                      ? 'animation-open'
                                      : 'animation-close'
                                    : 'animation-open'
                                }
                              >
                                <Grid
                                  item
                                  xs={2.8}
                                  sm={2}
                                  md={
                                    location.pathname ===
                                    '/dashboard/passengerinformation'
                                      ? 3
                                      : 2.5
                                  }
                                >
                                  {/* departur time and date  */}
                                  <Box
                                    className={
                                      !itineraryOpen[index] ||
                                      arr.length < 1 ||
                                      j === 0
                                        ? 'animation-height'
                                        : 'animation-close'
                                    }
                                  >
                                    <Typography
                                      sx={{
                                        color: 'var(--black)',
                                        fontSize: { xs: 12, sm: 13 },
                                        fontWeight: 400,
                                      }}
                                    >
                                      {FormatTime(item.departureDateTime)}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        color: 'var(--secondary)',
                                        fontSize: 12,
                                      }}
                                    >
                                      {FormatDate(item.departureDateTime)}
                                    </Typography>
                                  </Box>
                                  {/* duration  */}
                                  <Box
                                    className={
                                      !itineraryOpen[index] ||
                                      arr.length < 1 ||
                                      j === 0
                                        ? 'animation-height'
                                        : 'animation-close'
                                    }
                                    width="fit-content"
                                    mt={-1}
                                  >
                                    {!itineraryOpen[index] &&
                                      arr.length > 1 && (
                                        <Box>
                                          <CustomTypography
                                            value={`${TimeAndDistance(
                                              item.flightDuration,
                                              'time'
                                            )}`}
                                            title="Travel Time"
                                            bgcolor="var(--bgcolor)"
                                            fontcolor="var(--primary)"
                                            radius="0"
                                            fsize="10px"
                                          />
                                          <Box mt={0.3}>
                                            {Number(item?.totalMiles) > 0 ? (
                                              <CustomTypography
                                                value={`${TimeAndDistance(
                                                  item.totalMiles
                                                )} km`}
                                                title="Flight Distance"
                                                bgcolor="var(--green)"
                                                fontcolor="var(--dark-green)"
                                                radius="0"
                                                fsize="10px"
                                              />
                                            ) : null}
                                          </Box>
                                        </Box>
                                      )}
                                    {itineraryOpen[index] &&
                                      j === 0 &&
                                      arr.length >= 1 && (
                                        <CustomTypography
                                          value={totalTimeCalculate(segment)}
                                          title="Total Duration"
                                          bgcolor="var(--bgcolor)"
                                          fontcolor="var(--primary)"
                                          radius="0"
                                          fsize="10px"
                                        />
                                      )}

                                    {itineraryOpen[index] &&
                                      j === 0 &&
                                      arr.length >= 1 && (
                                        <Box
                                          mt={0.3}
                                          onClick={() => handleToggle(index)}
                                        >
                                          <CustomTypography
                                            value={
                                              arr.length > 1
                                                ? `${arr.length - 1} Stops`
                                                : 'Direct'
                                            }
                                            bgcolor="var(--orenge)"
                                            fontcolor="var(--dark-orenge)"
                                            radius="0"
                                            fsize="10px"
                                          />
                                        </Box>
                                      )}
                                  </Box>
                                  {/* arrival time and date  */}
                                  <Box
                                    mt={1}
                                    className={
                                      !itineraryOpen[index] ||
                                      arr.length < 1 ||
                                      j === arr.length - 1
                                        ? 'animation-height'
                                        : 'animation-close'
                                    }
                                  >
                                    <Typography
                                      sx={{
                                        color: 'var(--black)',
                                        fontSize: { xs: 12, sm: 13 },
                                        fontWeight: 400,
                                      }}
                                    >
                                      {FormatTime(item.arrivalDateTime)}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        color: 'var(--secondary)',
                                        fontSize: 12,
                                      }}
                                    >
                                      {FormatDate(item.arrivalDateTime)}
                                    </Typography>
                                  </Box>
                                  {/* Waiting Time  */}
                                  <Box
                                    width="fit-content"
                                    sx={{
                                      my: {
                                        md:
                                          !itineraryOpen[index] ||
                                          arr.length < 1 ||
                                          j === arr.length - 1
                                            ? '-20px'
                                            : '',
                                        display:
                                          j === arr.length - 1
                                            ? 'none'
                                            : 'block',
                                      },
                                    }}
                                    className={
                                      !itineraryOpen[index] ||
                                      arr.length < 1 ||
                                      j === arr.length - 1
                                        ? 'animation-open'
                                        : 'animation-close'
                                    }
                                  >
                                    <CustomTypography
                                      value={TransitTimeCalculate(
                                        segment[
                                          j + 1
                                        ]?.departureDateTime?.split('+')[0],
                                        segment[j]?.arrivalDateTime?.split(
                                          '+'
                                        )[0]
                                      )}
                                      title="Transit time"
                                      bgcolor="var(--orengel)"
                                      fontcolor="var(--white)"
                                      py="2px"
                                      radius="0"
                                      fsize="10px"
                                    />
                                  </Box>
                                </Grid>

                                <Grid item xs={9} sm={9}>
                                  {/*deparure Location Data  */}
                                  <Stack
                                    direction="row"
                                    spacing={2}
                                    className={
                                      !itineraryOpen[index] ||
                                      arr.length < 1 ||
                                      j === 0
                                        ? 'animation-open'
                                        : 'animation-close'
                                    }
                                  >
                                    <Box
                                      className={
                                        arr.length - 1 === j
                                          ? 'line-draw'
                                          : 'line-draw'
                                      }
                                    >
                                      <img
                                        src={ImageImport.circle}
                                        alt=""
                                        style={{
                                          marginLeft: '-9px',
                                          width: 18,
                                        }}
                                      />
                                    </Box>
                                    <Box>
                                      <Typography
                                        sx={{
                                          color: 'var(--black)',
                                          fontSize: { xs: 13, md: 14 },
                                          fontWeight: 400,
                                        }}
                                      >
                                        {item.departureAirportName} (
                                        {item.departureAirportCode})
                                      </Typography>
                                      <Typography
                                        sx={{
                                          color: 'var(--secondary)',
                                          fontSize: 10,
                                          mt: -0.5,
                                        }}
                                      >
                                        {'Approx 2 to 3 hours for the check-in'}
                                      </Typography>
                                      {item?.dpartureTerminal && (
                                        <Typography
                                          sx={{
                                            color: 'var(--secondary)',
                                            fontSize: 10,
                                            mt: -0.5,
                                          }}
                                        >
                                          Terminal: {item?.dpartureTerminal}
                                        </Typography>
                                      )}
                                    </Box>
                                  </Stack>
                                  {/* airlines data  */}
                                  <Stack
                                    direction="row"
                                    spacing={2}
                                    className={
                                      !itineraryOpen[index] ||
                                      arr.length < 1 ||
                                      j === 0
                                        ? 'animation-open'
                                        : 'animation-close'
                                    }
                                  >
                                    <Box
                                      className={
                                        arr.length - 1 === j
                                          ? 'line-draw'
                                          : 'line-draw'
                                      }
                                    >
                                      <Tooltip
                                        title={`${
                                          itineraryOpen[index] ? 'View' : 'Hide'
                                        } Flight Itinerary`}
                                      >
                                        <ExpandMore
                                          sx={{
                                            marginLeft: '-13px',
                                            width: '25px',
                                            height: '25px',
                                            display:
                                              arr.length > 1
                                                ? j === 0
                                                  ? 'flex'
                                                  : 'none'
                                                : 'none',
                                            bgcolor: 'var(--white)',
                                            borderRadius: '50%',
                                            border: '1px solid var(--bgcolor)',
                                            p: 0.2,
                                            color: 'var(--primary)',
                                            transition:
                                              'transform 0.3s ease-in-out',
                                            transform: `rotate(${
                                              itineraryOpen[index] ? 0 : 180
                                            }deg)`,
                                            cursor: 'pointer',
                                          }}
                                          onClick={() => handleToggle(index)}
                                        />
                                      </Tooltip>
                                    </Box>
                                    <Box>
                                      <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                        sx={{
                                          mt: { xs: '-11px', md: '-16px' },
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: { xs: '20px', md: '30px' },
                                          }}
                                        >
                                          <img
                                            src={`https://tripfindy-logos.s3.ap-southeast-1.amazonaws.com/airlines/${item?.marketingCarrier}.png`}
                                            alt="air logo"
                                            style={{ width: '100%' }}
                                          />
                                        </Box>
                                        <Box>
                                          <Typography
                                            sx={{
                                              color: 'var(--black)',
                                              fontSize: { xs: 12, md: 13 },
                                              fontWeight: 400,
                                            }}
                                          >
                                            {item.marketingCarrierName}
                                            {' - '}
                                            {item.marketingflight}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              color: 'var(--black)',
                                              fontSize: 10,
                                            }}
                                          >
                                            Operated by :{' '}
                                            {item.operatingCarrier}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              color: 'var(--secondary)',
                                              fontSize: 10,
                                            }}
                                          >
                                            Aircraft : {GetAircraftName(item)}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              color: 'var(--secondary)',
                                              fontSize: 10,
                                              // mt: -0.5,
                                            }}
                                          >
                                            Class: {item?.bookingCode} {'- '}(
                                            {item.cabinClass})
                                          </Typography>
                                        </Box>
                                      </Stack>
                                    </Box>
                                  </Stack>

                                  {/*arrival Location Data  */}
                                  <Stack
                                    direction="row"
                                    spacing={2}
                                    className={
                                      !itineraryOpen[index] ||
                                      arr.length < 1 ||
                                      j === arr.length - 1
                                        ? 'animation-open'
                                        : 'animation-close'
                                    }
                                  >
                                    <Box
                                      className={
                                        arr.length - 1 === j ? '' : 'line-draw'
                                      }
                                    >
                                      <img
                                        src={ImageImport.circle}
                                        alt=""
                                        style={{
                                          marginLeft: '-9px',
                                          width: 18,
                                        }}
                                      />
                                    </Box>
                                    <Box>
                                      <Typography
                                        sx={{
                                          color: 'var(--black)',
                                          fontSize: { xs: 13, md: 14 },
                                          fontWeight: 400,
                                        }}
                                      >
                                        {item.arrivalAirportName} (
                                        {item.arrivalAirportCode})
                                      </Typography>
                                      <Typography
                                        sx={{
                                          color: 'var(--secondary)',
                                          fontSize: 10,
                                          display:
                                            j === arr.length - 1
                                              ? 'none'
                                              : 'block',
                                        }}
                                      >
                                        {'Approx 2 to 3 hours for the check-in'}
                                      </Typography>
                                      {item?.arrivalTerminal && (
                                        <Typography
                                          sx={{
                                            color: 'var(--secondary)',
                                            fontSize: 10,
                                            pb: 0.3,
                                          }}
                                        >
                                          Terminal: {item?.arrivalTerminal}
                                        </Typography>
                                      )}
                                    </Box>
                                  </Stack>
                                  {/* Waiting Data  */}
                                  <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{
                                      my: { md: '-25px' },
                                      display:
                                        j === arr.length - 1 ? 'none' : '',
                                    }}
                                    className={
                                      !itineraryOpen[index] ||
                                      arr.length < 1 ||
                                      j === arr.length - 1
                                        ? 'animation-open'
                                        : 'animation-close'
                                    }
                                  >
                                    <Box
                                      className={
                                        arr.length - 1 === j ? '' : 'line-draw'
                                      }
                                    ></Box>
                                    <Box>
                                      <Typography
                                        sx={{
                                          color: 'var(--white)',
                                          fontSize: 10,
                                          fontWeight: 300,
                                          bgcolor: 'var(--orengel)',
                                          p: '2px 5px',
                                          ml: 1,
                                          mt: 0.7,
                                          width: 'fit-content',
                                        }}
                                      >
                                        Transit time in{' '}
                                        {item.arrivalAirportCode} Airport
                                      </Typography>
                                      {item?.marketingCarrier === 'AI' &&
                                        arr?.length >= 3 && (
                                          <Typography
                                            sx={{
                                              color: 'var(--red)',
                                              fontSize: 10,
                                              fontWeight: 300,
                                              ml: 1,
                                            }}
                                          >
                                            {/* {Compare(
                                            segment[
                                              j + 1
                                            ]?.departureDateTime?.split('+')[0],
                                            segment[j]?.arrivalDateTime?.split(
                                              '+'
                                            )[0]
                                          ) >= 10
                                            ? 'You might need a transit visa for this stopover.'
                                            : ''} */}
                                            *Transit visa is mandatory when
                                            making 2 stopover in India.
                                          </Typography>
                                        )}
                                    </Box>
                                  </Stack>
                                </Grid>
                              </Grid>
                            );
                          })}
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            )}
            {alignment === 'Baggage' && (
              <Box>
                <Typography
                  sx={{
                    color: 'var(--black)',
                    fontSize: { xs: 12, md: 16 },
                    fontWeight: 400,
                    mb: 2,
                  }}
                >
                  Baggage allowance
                </Typography>
                {/* <Box>
                  {segmentArray.map((segment, k) => (
                    <>
                      {segment[0].departureLocation?.split(',')[0]}-{' '}
                      {
                        segment[segment.length - 1].arrivalLocation?.split(
                          ','
                        )[0]
                      }
                    </>
                  ))}
                </Box> */}
                <Grid container spacing={1}>
                  {data.priceBreakdown[0].baggageRule?.length > 0 &&
                    data.priceBreakdown[0].baggageRule.map((x, i) => (
                      <Grid item xs={12} md={6} key={i}>
                        <Box
                          sx={{
                            border: '1px solid var(--stroke)',
                            borderRadius: 1,
                            p: 1,
                          }}
                        >
                          <Box>
                            {/* {data.priceBreakdown[0].baggageRule?.length}
                            {segmentArray.length} */}
                            {segmentArray[i]?.[0]?.departureLocation?.split(
                              ','
                            )[0] || 'Same location'}
                            {' - '}
                            {segmentArray[i]?.[
                              segmentArray[i]?.length - 1
                            ]?.arrivalLocation?.split(',')[0] ||
                              'Same Location'}{' '}
                          </Box>
                          <Stack
                            direction="row"
                            alignItems={'center'}
                            spacing={1}
                            mb={-0.5}
                          >
                            <Box>
                              <CheckIcon
                                sx={{
                                  color: 'var(--dark-green)',
                                  bgcolor: 'var(--green)',
                                  borderRadius: '50%',
                                  fontSize: 18,
                                  p: 0.5,
                                }}
                              />
                            </Box>
                            <Box>
                              <Typography
                                sx={{
                                  color: 'var(--secondary)',
                                  fontSize: { xs: 12, md: 12 },
                                }}
                              >
                                7 kg cabin baggage
                              </Typography>
                            </Box>
                          </Stack>

                          {data.priceBreakdown[0]?.baggageRule[0]?.Value ===
                            undefined ||
                          data.priceBreakdown[0]?.baggageRule[0]?.Value ===
                            '' ? (
                            <Stack
                              direction="row"
                              alignItems={'center'}
                              spacing={1}
                              pt={2}
                            >
                              <ClearIcon
                                sx={{
                                  color: 'var(--dark-orenge)',
                                  bgcolor: 'var(--orenge)',
                                  borderRadius: '50%',
                                  fontSize: 18,
                                  p: 0.5,
                                }}
                              />
                              <Typography
                                sx={{
                                  color: 'var(--secondary)',
                                  fontSize: { xs: 12, md: 12 },
                                }}
                              >
                                Checked in baggage not included
                              </Typography>
                            </Stack>
                          ) : (
                            <>
                              {data.priceBreakdown.map((item, j, arr) => (
                                <Stack
                                  key={j}
                                  direction="row"
                                  alignItems={'center'}
                                  spacing={1}
                                  pt={1}
                                >
                                  <CheckIcon
                                    sx={{
                                      color: 'var(--dark-green)',
                                      bgcolor: 'var(--green)',
                                      borderRadius: '50%',
                                      fontSize: 18,
                                      p: 0.5,
                                    }}
                                  />
                                  <Typography
                                    key={j}
                                    sx={{
                                      color: 'var(--secondary)',
                                      fontSize: { xs: 12, md: 12 },
                                    }}
                                  >
                                    {`${
                                      item.passengerType === 'ADT'
                                        ? `Adult's ${
                                            parseInt(
                                              item.baggageRule[i]?.Value
                                            ) > 3
                                              ? item.baggageRule[i]?.Value || 0
                                              : parseInt(
                                                  item.baggageRule[i]?.Value ||
                                                    0
                                                ) * 23
                                          } kg / person${
                                            arr.length > 1 ? ',' : ''
                                          }`
                                        : item.passengerType === 'INF'
                                        ? `Infant's ${
                                            parseInt(
                                              item.baggageRule[i]?.Value
                                            ) > 3
                                              ? item.baggageRule[i]?.Value || 0
                                              : parseInt(
                                                  item.baggageRule[i]?.Value ||
                                                    0
                                                ) * 10
                                          } kg / person${
                                            arr.length > 2 ? ',' : ''
                                          }`
                                        : `Child's ${
                                            parseInt(
                                              item.baggageRule[i]?.Value
                                            ) > 3
                                              ? item.baggageRule[i]?.Value || 0
                                              : parseInt(
                                                  item.baggageRule[i]?.Value ||
                                                    0
                                                ) * 23
                                          } kg / person`
                                    }`}
                                  </Typography>
                                </Stack>
                              ))}
                            </>
                          )}
                          {/* </Stack> */}
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            pt={0.5}
                          >
                            <Box pt={0.5}>
                              <CheckIcon
                                sx={{
                                  color: 'var(--dark-green)',
                                  bgcolor: 'var(--green)',
                                  borderRadius: '50%',
                                  fontSize: 18,
                                  p: 0.5,
                                }}
                              />
                            </Box>

                            <Typography
                              sx={{
                                color: 'var(--secondary)',
                                fontSize: { xs: 12, md: 12 },
                              }}
                            >
                              Extra checked in baggage can be purchased in next
                              step
                            </Typography>
                          </Stack>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Box>
            )}
            {alignment === 'FareRules' && (
              <Box>
                <Typography
                  sx={{
                    color: 'var(--black)',
                    fontSize: { xs: 12, md: 16 },
                    fontWeight: 400,
                    mb: 1,
                  }}
                >
                  Cancellation
                </Typography>
                {cancellation.map((item, i) => (
                  <Box key={i} my={1}>
                    <Typography
                      sx={{
                        color: 'var(--secondary)',
                        fontSize: { xs: 12, md: 12 },
                      }}
                    >
                      <img
                        src={ImageImport.arrow}
                        style={{ width: 9 }}
                        alt=""
                      />
                      &nbsp;&nbsp;{item.c1}
                    </Typography>
                  </Box>
                ))}
                <Typography
                  sx={{
                    color: 'var(--black)',
                    fontSize: { xs: 12, md: 16 },
                    fontWeight: 400,
                    mt: 2,
                    mb: 1,
                  }}
                >
                  Re-issue
                </Typography>
                <Typography
                  sx={{
                    color: 'var(--secondary)',
                    fontSize: { xs: 12, md: 12 },
                  }}
                >
                  <img src={ImageImport.arrow} style={{ width: 9 }} alt="" />
                  &nbsp;&nbsp;Re-Issuing Fee = Airline&apos;s Fee + Fare
                  Difference + {companyInfo.companyName} Fee
                </Typography>
              </Box>
            )}
            {alignment === 'Price' && (
              <Box>
                <PriceBreakdown
                  ait={data.ait}
                  data={data.priceBreakdown}
                  totalClientPrice={totalClientPrice}
                  grossTotalPrice={grossTotalPrice}
                  system={data?.system}
                  extraCommission={data?.extraCommission}
                />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlightDetails;
