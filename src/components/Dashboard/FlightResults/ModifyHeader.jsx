import { Box, Collapse, Grid, Stack, Typography } from '@mui/material';
import CustomButton from '../../Common/CustomButton';
import ImageImport from '../../../assets/ImageImport';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import moment from 'moment';
// import { useCallback, useState } from 'react';
import MainSearchBox from '../FlightSearchBox/MainSearchBox';
import CustomCircularProgress from '../../Common/CustomCircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../../redux/slices/modalOpen';

// eslint-disable-next-line react/prop-types
const ModifyHeader = ({ isLoaded, totalFlight }) => {
  const dispatch = useDispatch();
  const modifyModal = useSelector((state) => state.modalValue.modifyModal);
  const handleToggle = () => {
    dispatch(toggleModal({ modalName: 'modifyModal' }));
  };

  const queryParams = new URLSearchParams(location.search);
  const encodedQuery = queryParams.get('query');
  const decodedQuery = encodedQuery
    ? JSON.parse(decodeURIComponent(encodedQuery))
    : null;

  // for mobile device end
  const modifyData = sessionStorage.getItem('commonState');
  const data = JSON.parse(modifyData);
  const getDepDate = sessionStorage?.getItem('depDate');
  const getDateParse = JSON.parse(getDepDate);
  const dateChange = sessionStorage?.getItem('dateChange');
  const getdateChange = JSON.parse(dateChange);
  const adultCount = data?.adultCount || 1;
  const childCount = data?.childCount || 0;
  const infantCount = data?.infantCount || 0;
  return (
    <Box mt={1.5}>
      <Box>
        <Grid
          container
          alignItems="center"
          sx={{
            display: { xs: 'none', md: 'flex' },
            p: 1,
            bgcolor: 'var(--white)',
            borderRadius: '6px',
          }}
        >
          <Grid
            item
            container
            lg={2.5}
            sx={{ alignItems: 'center', display: { xs: 'none', lg: 'flex' } }}
          >
            <Stack direction="row" spacing={1} alignItems={'center'}>
              <img
                src={ImageImport.flight}
                style={{
                  border: '2px solid var(--body)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                }}
              />
              <Box>
                <Box
                  sx={{
                    color: 'var(--dark-green)',
                    fontSize: 14,
                  }}
                >
                  {!isLoaded ? (
                    <Box sx={{ display: 'flex', alignItems: 'start' }}>
                      <CustomCircularProgress />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Searching ...
                    </Box>
                  ) : (
                    `${totalFlight} Flights Avaliable`
                  )}
                </Box>
                <Typography
                  sx={{
                    color: 'var(--secondary)',
                    fontSize: 12,
                  }}
                >
                  Price includes Vat & Tax
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item container md={3} lg={2} sx={{ alignItems: 'center' }}>
            <Grid item xs={5.5}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--black)',
                }}
              >
                {decodedQuery.segments[0].locationFrom}
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 300,
                  color: 'var(--secondary)',
                }}
                noWrap
              >
                {decodedQuery?.tripType === 'multicity'
                  ? data?.searchData?.segments[0]?.departcity?.split(',')[0]
                  : data?.departureData.departureCity?.split(',')[0] || ''}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              {decodedQuery?.tripType === 'oneway' ? (
                <ArrowRightAltIcon
                  sx={{ fontSize: 20, color: 'var(--place-holder)' }}
                />
              ) : (
                <SwapHorizIcon
                  sx={{ fontSize: 20, color: 'var(--place-holder)' }}
                />
              )}
            </Grid>
            <Grid item xs={5.5} sx={{ textAlign: 'right' }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--black)',
                }}
              >
                {decodedQuery?.tripType === 'multicity'
                  ? data?.searchData?.segments[
                      data.searchData?.segments?.length - 1
                    ]?.locationTo?.split(',')[0] || ''
                  : decodedQuery?.segments[0]?.locationTo || ''}
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 300,
                  color: 'var(--secondary)',
                }}
                noWrap
              >
                {/* {console.log(data?.searchData?.segments)} */}
                {decodedQuery?.tripType === 'multicity'
                  ? data?.searchData?.segments[
                      data.searchData?.segments?.length - 1
                    ]?.arrivalcity?.split(',')[0] || ''
                  : data?.arrivalData?.arrivalCity?.split(',')[0] || ''}
              </Typography>
            </Grid>
          </Grid>
          <Grid item md={1}>
            <Box
              sx={{
                height: '30px',
                width: '1px',
                bgcolor: 'var(--place-holder)',
                margin: 'auto',
              }}
            ></Box>
          </Grid>
          <Grid
            item
            container
            md={3}
            lg={2.3}
            columnSpacing={1}
            sx={{ alignItems: 'center' }}
          >
            <Grid item xs={6}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 300,
                  color: 'var(--secondary)',
                }}
              >
                Departure
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--black)',
                }}
              >
                {moment(
                  getdateChange
                    ? getDateParse
                    : decodedQuery?.segments[0]?.depDate
                ).format('DD MMM YYYY')}
              </Typography>
            </Grid>
            {decodedQuery?.tripType === 'oneway' ? null : (
              <Grid item xs={6}>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 300,
                    color: 'var(--secondary)',
                  }}
                >
                  Return
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--black)',
                  }}
                >
                  {moment(
                    decodedQuery.segments[decodedQuery.segments.length - 1]
                      .depDate
                  ).format('DD MMM YYYY')}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            md={3}
            lg={2.2}
            columnSpacing={1}
            sx={{ alignItems: 'center' }}
          >
            <Grid item xs={6}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 300,
                  color: 'var(--secondary)',
                }}
              >
                Passenger
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--black)',
                }}
              >
                {decodedQuery.adultCount +
                  decodedQuery.childCount +
                  decodedQuery.infantCount}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 300,
                  color: 'var(--secondary)',
                }}
              >
                Cabin
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--black)',
                }}
                noWrap
              >
                {decodedQuery.cabinCode === 'P'
                  ? 'First Class'
                  : decodedQuery.cabinCode === 'J'
                  ? 'Premium Business'
                  : decodedQuery.cabinCode === 'C'
                  ? 'Business Class'
                  : decodedQuery.cabinCode === 'S'
                  ? 'Premium Economy'
                  : 'Economy Class'}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={2} textAlign="right">
            <Box>
              <CustomButton
                textcolor="var(--white)"
                bgcolor="var(--primary)"
                hovercolor="var(--primary-rgb)"
                padding="5px 15px"
                value={
                  !modifyModal
                    ? innerWidth > 1025
                      ? 'Modify Search'
                      : 'Modify'
                    : 'Close'
                }
                handleClick={handleToggle}
              />
            </Box>
          </Grid>
        </Grid>
        {/* mobile and tab design  */}
        <Stack
          direction={{ xs: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'center' }}
          sx={{
            display: { xs: 'flex', md: 'none' },
            bgcolor: 'var(--white)',
            p: 1,
            borderRadius: '6px',
          }}
        >
          <Stack direction={{ xs: 'row' }} spacing={{ xs: 1, sm: 1, md: 4 }}>
            <Stack direction="row" spacing={1} alignItems="top">
              <Box>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    color: 'var(--primary)',
                    fontSize: 16,
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {decodedQuery.segments[0].locationFrom}
                  {decodedQuery?.tripType === 'oneway' ? (
                    <ArrowRightAltIcon
                      sx={{ fontSize: 20, color: 'var(--place-holder)' }}
                    />
                  ) : (
                    <SwapHorizIcon
                      sx={{ fontSize: 20, color: 'var(--place-holder)' }}
                    />
                  )}
                  {decodedQuery?.tripType === 'multicity'
                    ? data?.searchData?.segments[
                        data.searchData?.segments?.length - 1
                      ]?.locationTo?.split(',')[0] || ''
                    : decodedQuery?.segments[0]?.locationTo || ''}
                  <Box
                    sx={{
                      color: 'var(--dark-green)',
                      fontSize: 12,
                      display: { xs: 'flex', md: 'none' },
                      pt: 0.3,
                    }}
                  >
                    {!isLoaded ? (
                      <Box sx={{ display: 'flex' }}>
                        <CustomCircularProgress pt={-0.1} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Searching ...
                      </Box>
                    ) : (
                      <Box>{totalFlight} Flights Avaliable</Box>
                    )}
                  </Box>
                </Stack>

                <Box
                  sx={{
                    color: 'var(--secondary)',
                    fontSize: 12,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {moment(decodedQuery?.segments[0]?.depDate).format(
                    'DD MMM YYYY'
                  )}{' '}
                  {decodedQuery?.tripType !== 'oneway' ? (
                    <>
                      <SwapHorizIcon
                        sx={{ fontSize: 12, color: 'var(--place-holder)' }}
                      />
                      {moment(
                        decodedQuery.segments[decodedQuery.segments.length - 1]
                          .depDate
                      ).format('DD MMM YYYY')}
                    </>
                  ) : (
                    ''
                  )}
                </Box>
              </Box>
            </Stack>
          </Stack>
          <Box>
            <CustomButton
              textcolor="var(--white)"
              bgcolor="var(--primary)"
              hovercolor="var(--primary-rgb)"
              padding="5px 15px"
              value={
                !modifyModal
                  ? innerWidth > 1025
                    ? 'Modify Search'
                    : 'Modify'
                  : 'Close'
              }
              handleClick={handleToggle}
            />
          </Box>
        </Stack>
      </Box>
      <Collapse
        in={modifyModal}
        sx={{ transition: '0.5s', mt: modifyModal ? 1.5 : 0 }}
      >
        <MainSearchBox
          adultC={adultCount}
          childC={childCount}
          infantC={infantCount}
        />
      </Collapse>
    </Box>
  );
};

export default ModifyHeader;
