/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { ExpandMore } from '@mui/icons-material';
import AirlineSeatReclineNormalOutlinedIcon from '@mui/icons-material/AirlineSeatReclineNormalOutlined';
import LuggageIcon from '@mui/icons-material/Luggage';
import { Box, Collapse, Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomButton from '../../Common/CustomButton';
import CustomTypography from '../../Common/CustomTypography';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import FlightDetails from './FlightDetails';
import FlightLayout from './FlightLayout';
import PriceSection from './PriceBreakdown/PriceSection';
import TokenToName from '../../Common/TokenToName';
import ImageImport from '../../../assets/ImageImport';
import { validEmails } from '../../Utils/validEmails';

const FlightSearchResult = ({
  data,
  index,
  tripType,
  totalPassenger,
  setSelected,
  selected,
  pageIndex,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState({
    flightDetails: false,
    priceBreakdown: false,
  });

  const handleChange = (property) => {
    setOpen((prevState) => ({
      ...prevState,
      [property]: !prevState[property],
    }));
  };
  const handleClose = () => {
    setOpen({
      flightDetails: false,
      priceBreakdown: false,
    });
  };

  // const handleCheckboxChange = (providerId) => {
  //   console.log(providerId);
  //   setSelected((prevSelected) => {
  //     if (prevSelected.includes(providerId)) {
  //       return prevSelected.filter((id) => id !== providerId);
  //     } else {
  //       return [...prevSelected, providerId];
  //     }
  //   });
  // };
  const handleCheckboxChange = (providerId) => {
    setSelected((prevSelected) => {
      const updatedSelected = [...prevSelected];
      const index = updatedSelected.indexOf(providerId);

      if (index > -1) {
        updatedSelected.splice(index, 1);
      } else {
        updatedSelected.push(providerId);
      }

      return updatedSelected;
    });
  };

  const handleBooking = () => {
    navigate('/dashboard/passengerinformation', {
      state: {
        data: data,
      },
    });
  };

  const segmentArray = data.segments;

  const firstSegmentData = segmentArray[0][0];
  const baggage = parseInt(data?.priceBreakdown[0]?.baggageRule?.[0]?.Value);
  const MemoizedFlightDetails = React.memo(FlightDetails);

  const basePrcie = parseInt(data?.totalClientPrice || 0);
  const rewardPointCalculate = `+ ${parseInt(basePrcie * 0.01)}`;

  const tokenise = TokenToName();
  const temail = tokenise?.email;
  const emailIsValid = validEmails.includes(temail);
  const carriers = ['AK', 'G9', 'FZ', '3L', 'VJ'];
  const checkCarrier = carriers.includes(data?.marketingCarrier);

  const isLccPresent = data?.isLcc === true || data?.isLcc === false;
  const checkButton =
    (data?.instantPay === 'true' || isLccPresent) &&
    data?.system !== 'NDC_V' &&
    data?.system !== 'NDC_TF';
  const indigoFare =
    data?.system === 'INDIGO' && data?.marketingCarrier === '6E';

  const sotoSpacial =
    (data?.system === 'SG_IATA' || data?.system === 'TRIPFINDY') &&
    data?.tripType === 'OUTSIDE';

  const gdsMarketingCarrier = [
    'KU',
    'TG',
    'OD',
    'BG',
    'BS',
    'WY',
    'MH',
    'SL',
    'AI',
    'UL',
    'H9',
    'GF',
    'OV',
    'FZ',
    'G9',
    'RJ',
    'RQ',
    'VJ',
    'HY',
    'GM',
    'ME',
    'ID',
    'MS',
    '8D',
    'GA',
    'PR',
    'KE',
    'A3',
    'TX',
    'CY',
    'AV',
    'TP',
    'PD',
    '4N',
    'MU',
    'CZ',
    'CA',
    'AF',
  ];

  const segments = data?.segments?.[0] || [];
  const lastIndex = segments.length - 1;

  const departureSegment =
    segments[0]?.departureAirportCode === 'DAC' &&
    segments[lastIndex]?.arrivalAirportCode === 'KUL';

  const returnSegment =
    segments[0]?.departureAirportCode === 'KUL' &&
    segments[lastIndex]?.arrivalAirportCode === 'DAC';

  // for 30 kg baggage
  const akRules =
    data?.marketingCarrier === 'AK' && (departureSegment || returnSegment);

  // for 46 kg baggage
  const qrRules =
    data?.marketingCarrier === 'QR' &&
    (baggage === 0 || baggage == '0') &&
    (data?.system === 'NDC_V' || data?.system === 'NDC_TF');

  const gdsSystem =
    data?.system === 'Sabre' ||
    data?.system === 'Galileo' ||
    data?.system === 'SABRE_V';

  const isMarketingCarrierMatch = gdsMarketingCarrier.includes(
    data?.marketingCarrier
  );

  const verteilFare = data?.system === 'NDC_TF' || data?.system === 'NDC_V';

  let fareInfo = null;

  if (
    sotoSpacial ||
    (gdsSystem && isMarketingCarrierMatch && data?.tripType === 'OUTSIDE')
  ) {
    fareInfo = {
      title: 'Good news! This SOTO fare is ready to be issued',
      value: 'SOTO Issuable',
    };
  } else if (indigoFare) {
    fareInfo = {
      title: 'Good news! This exclusive fare is ready to be issued',
      value: 'Exclusive Fare',
    };
  } else if (verteilFare) {
    fareInfo = {
      title: 'Good news! This NDC fare is ready to be issued',
      value: 'NDC Fare',
    };
  }

  return (
    <Box
      sx={{
        bgcolor: 'var(--white)',
        borderRadius: '10px',
        my: 1.5,
        mx: { xs: 0.5, md: 'unset' },
        position: 'relative',
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={9}
          sx={{
            pl: { xs: 1, md: 2 },
            pt: { xs: 1, md: 2 },
            pb: { xs: 1, md: 2 },
            pr: { xs: 1, md: 0 },
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'column' }}
            justifyContent="space-between"
            sx={{ height: '100%' }}
          >
            {/* 1st Section  */}
            {/* for only mobile  */}
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <Stack direction="row" spacing={1}>
                {emailIsValid && (
                  <CustomTypography
                    fontcolor={
                      data.system === 'Sabre'
                        ? 'var(--sabre)'
                        : 'var(--galileo)'
                    }
                    bgcolor="var(--body)"
                    value={data.system}
                    fsize={10}
                  />
                )}
                <CustomTypography
                  fontcolor={'var(--dark-green)'}
                  bgcolor="var(--body)"
                  value={checkButton ? 'Instant Ticket' : 'Book & Hold'}
                  fsize={11}
                />
                {fareInfo && (
                  <CustomTypography
                    title={fareInfo.title}
                    fontcolor="var(--red)"
                    bgcolor="var(--body)"
                    value={fareInfo.value}
                    fsize={9}
                    t="uppercase"
                  />
                )}
              </Stack>

              <CustomTypography
                fsize={10}
                py={0}
                fontcolor={
                  data.refundable === 'true' || data.refundable === true
                    ? 'var(--dark-green)'
                    : 'var(--crimson)'
                }
                bgcolor={
                  data.refundable === 'true' || data.refundable === true
                    ? 'var(--green)'
                    : 'var(--light-crimson)'
                }
                value={
                  data.refundable === 'true' || data.refundable === true
                    ? 'Refundable'
                    : 'Non Refundable'
                }
                title={
                  data.refundable === 'true' || data.refundable === true
                    ? 'Refundable'
                    : 'Non Refundable'
                }
                radius="5px"
              />
            </Stack>

            <Stack
              direction="row"
              spacing={{ xs: 0, md: 1 }}
              justifyContent="space-between"
              order={{ xs: 2, sm: 2, md: 1 }}
            >
              <Stack direction="row" spacing={{ xs: 0, md: 1 }}>
                <Box
                  sx={{
                    display: {
                      xs: 'none',
                      md:
                        location?.pathname === '/dashboard/passengerinformation'
                          ? 'none'
                          : 'flex',
                    },
                  }}
                >
                  <div className="custom-checkbox">
                    <input
                      type="checkbox"
                      id={`quotation-${data.recordId}`}
                      name="quotation"
                      checked={selected.includes(data)}
                      onChange={() => handleCheckboxChange(data)}
                    />
                  </div>
                </Box>

                <Typography
                  sx={{
                    color: 'var(--black)',
                    fontWeight: 400,
                    fontSize: { xs: 10, md: 13 },
                  }}
                  noWrap
                >
                  {firstSegmentData.marketingCarrierName || 'Flight name'}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0}>
                  <CustomTypography
                    fsize={{ xs: 9, md: 12 }}
                    px={0.3}
                    fontcolor="var(--black)"
                    value={segmentArray.flatMap((career, i) => [
                      `${career[0].marketingCarrier}-${career[0].marketingflight}`,
                      i !== segmentArray.length - 1 && (
                        <>
                          &nbsp;
                          {tripType === 'roundway' ? (
                            <SwapHorizIcon
                              sx={{
                                fontSize: 12,
                                color: 'var(--place-holder)',
                              }}
                            />
                          ) : (
                            <ArrowRightAltIcon
                              sx={{
                                fontSize: 12,
                                color: 'var(--place-holder)',
                              }}
                            />
                          )}
                          &nbsp;
                        </>
                      ),
                    ])}
                  />
                  <Box display={{ xs: 'none', md: 'block' }}>
                    <Stack direction="row" spacing={1}>
                      {emailIsValid && (
                        <CustomTypography
                          fontcolor={
                            data.system === 'Sabre'
                              ? 'var(--sabre)'
                              : 'var(--galileo)'
                          }
                          bgcolor="var(--body)"
                          value={data.system}
                          fsize={10}
                        />
                      )}
                      <CustomTypography
                        fontcolor={'var(--dark-green)'}
                        bgcolor="var(--body)"
                        value={checkButton ? 'Instant Ticket' : 'Book & Hold'}
                        fsize={10}
                      />
                      {fareInfo && (
                        <CustomTypography
                          fontcolor="var(--orengel)"
                          title={fareInfo.title}
                          // bgcolor="var(--skeleton)"
                          value={fareInfo.value}
                          border="1px solid var(--dark-green)"
                          radius="5px"
                          fsize={9}
                          t="uppercase"
                          fontWeight={400}
                        />
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                {pageIndex === 0 && index < 2 && (
                  <CustomTypography
                    fontcolor="var(--dark-green)"
                    bgcolor="var(--green)"
                    value="Cheapest"
                    title="Cheapest"
                    radius="5px"
                    fsize={10}
                  />
                )}
                <CustomTypography
                  fontcolor="var(--orengel)"
                  bgcolor="var(--white)"
                  value={rewardPointCalculate || 0}
                  border="1px solid var(--yellow)"
                  title="Reward Points"
                  radius="5px"
                  fsize={10}
                  icon={
                    <img
                      src={ImageImport?.rewards}
                      style={{ width: '15px', borderRadius: '50%' }}
                      alt=""
                    />
                  }
                />
              </Box>
            </Stack>

            {/* 2nd Section  */}
            <Grid order={{ xs: 1, sm: 1, md: 2 }}>
              {data.segments.map((item, i) => (
                <FlightLayout key={i} allData={data} data={item} />
              ))}
            </Grid>

            {/* 3rd Section  */}
            <Grid
              container
              justifyContent="space-between"
              order={{ xs: 3 }}
              sx={{
                pl: { xs: 0, md: 7 },
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <Grid item>
                <Stack direction="row" spacing={0.5}>
                  <CustomTypography
                    fontcolor="var(--dark-sky)"
                    bgcolor="var(--price-color)"
                    fontWeight={300}
                    value={'7kg'}
                    title="Cabin baggage"
                    icon={<LuggageIcon sx={{ fontSize: 14 }} />}
                  />
                  <CustomTypography
                    fontcolor="var(--dark-sky)"
                    bgcolor="var(--price-color)"
                    value={`${
                      akRules
                        ? 30
                        : qrRules
                        ? 46
                        : baggage > 3
                        ? baggage
                        : baggage * 23
                    } kg`}
                    // value={`${
                    //   akRules
                    //     ? 30
                    //     : baggage > 3
                    //     ? baggage === 0 && qrRules
                    //       ? 46
                    //       : baggage
                    //     : baggage * 23
                    // } kg`}
                    title="Baggage per passenger "
                    icon={<LuggageIcon sx={{ fontSize: 14 }} />}
                    fontWeight={300}
                  />
                  {/* {akRules ? 'true' : 'false'} */}
                  <Box>
                    <CustomTypography
                      fontcolor="var(--dark-sky)"
                      bgcolor="var(--price-color)"
                      fontWeight={300}
                      value={`${
                        firstSegmentData.seatsAvailable === '0' ||
                        firstSegmentData.seatsAvailable === 0
                          ? 9
                          : firstSegmentData.seatsAvailable || 0
                      } Seat`}
                      title={`${
                        firstSegmentData.seatsAvailable === '0'
                          ? 9
                          : firstSegmentData.seatsAvailable || 0
                      } Available seat  `}
                      icon={
                        <AirlineSeatReclineNormalOutlinedIcon
                          sx={{ fontSize: 14 }}
                        />
                      }
                    />
                  </Box>
                  <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                    <CustomTypography
                      fontcolor="var(--dark-sky)"
                      bgcolor="var(--price-color)"
                      fontWeight={300}
                      title="Cabin Class"
                      value={`Class: ${firstSegmentData?.bookingCode}`}
                    />
                  </Box>
                </Stack>
              </Grid>
              <Grid item display="flex">
                <CustomTypography
                  fsize={10.5}
                  fontcolor={
                    data.refundable === 'true' || data.refundable === true
                      ? 'var(--dark-green)'
                      : 'var(--crimson)'
                  }
                  bgcolor={
                    data.refundable === 'true' || data.refundable === true
                      ? 'var(--green)'
                      : 'var(--light-crimson)'
                  }
                  value={
                    data.refundable === 'true' || data.refundable === true
                      ? 'Refundable'
                      : 'Non Refundable'
                  }
                  title={
                    data.refundable === 'true' || data.refundable === true
                      ? 'Refundable'
                      : 'Non Refundable'
                  }
                />
                <CustomTypography
                  fontcolor="var(--primary)"
                  fontWeight="400"
                  value={
                    <>
                      Flight Details&nbsp;
                      <ExpandMore
                        sx={{
                          fontSize: 20,
                          transition: 'transform 0.3s ease-in-out',
                          transform: `rotate(${
                            open.flightDetails ? 180 : 0
                          }deg)`,
                        }}
                      />
                    </>
                  }
                  click={() => handleChange('flightDetails')}
                />
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        {/* Price Section  mobile and dexktop both */}
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          sx={{
            height: 'auto',
            p: { xs: 1, md: 1 },
            py: { xs: 0, md: 1 },
          }}
        >
          <PriceSection
            open={open}
            handleChange={handleChange}
            handleClose={handleClose}
            handleClick={handleBooking}
            data={data}
            totalPassenger={totalPassenger}
            rewardPointCalculate={rewardPointCalculate}
          />
        </Grid>

        {/* only mobile  bottom button and baggage*/}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%', my: 0, p: 1, display: { md: 'none' } }}
        >
          <Stack direction="row" spacing={0.5}>
            <CustomTypography
              fontcolor="var(--dark-sky)"
              bgcolor="var(--price-color)"
              fontWeight={300}
              fsize="10px"
              value={`${
                firstSegmentData.seatsAvailable === '0' ||
                firstSegmentData.seatsAvailable === 0
                  ? 9
                  : firstSegmentData.seatsAvailable || 0
              } Seat`}
              title={`${
                firstSegmentData.seatsAvailable === '0'
                  ? 9
                  : firstSegmentData.seatsAvailable || 0
              } Available seat  `}
            />
            <CustomTypography
              fontcolor="var(--dark-sky)"
              bgcolor="var(--price-color)"
              fontWeight={300}
              fsize="10px"
              value={`${baggage > 3 ? baggage : baggage * 23} kg`}
              title="Baggage per passenger "
            />
            <CustomTypography
              fontcolor="var(--dark-sky)"
              bgcolor="var(--price-color)"
              fontWeight={300}
              fsize="10px"
              title="Cabin Class"
              value={`Class: ${firstSegmentData?.bookingCode}`}
            />
          </Stack>
          <Box>
            <Stack direction="row" spacing={1}>
              <CustomTypography
                display={{ xs: 'flex', sm: 'flex', md: 'none' }}
                fontcolor="var(--primary)"
                fontWeight="400"
                fsize="10px"
                value={
                  <>
                    Flight Details&nbsp;
                    <ExpandMore
                      sx={{
                        fontSize: 15,
                        transition: 'transform 0.3s ease-in-out',
                        transform: `rotate(${open.flightDetails ? 180 : 0}deg)`,
                      }}
                    />
                  </>
                }
                click={() => handleChange('flightDetails')}
              />
              <CustomButton
                textcolor="var(--white)"
                bgcolor={checkButton ? 'var(--dark-green)' : 'var(--primary)'}
                hovercolor="var(--primary-rgb)"
                padding="3px 0px"
                value={checkButton ? 'Issue' : 'Book'}
                fsize={11}
                fontSize="10px"
                handleClick={() => handleBooking()}
              />
            </Stack>
          </Box>
        </Stack>
      </Grid>
      {checkCarrier && (
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: -8, md: -2 },
            left: 0,
            color: 'var(--red)',
            bgcolor: 'var(--white)',
            fontSize: '10px',
            display: 'flex',
            gap: 0.5,
            px: 1,
            borderRadius: 1,
            fontWeight: 300,
          }}
        >
          <LuggageIcon sx={{ fontSize: 12 }} />
          For extra baggage, please contact the support team before booking
        </Box>
      )}

      {open.flightDetails && (
        <Collapse in={open.flightDetails}>
          <MemoizedFlightDetails
            data={data}
            tripType={tripType}
            qrRules={qrRules}
            akRules={akRules}
          />
        </Collapse>
      )}
    </Box>
  );
};

export default FlightSearchResult;
