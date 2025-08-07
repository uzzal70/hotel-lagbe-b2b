/* eslint-disable react/prop-types */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import GroupIcon from '@mui/icons-material/Group';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Typography, Button, Stack, Grid, Tooltip } from '@mui/material';
import hotel from '../../../assets/images/hotel';
import Rating from './Rating';
import HotelOverviewModal from '../modal/HotelOverviewModal';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Amenities from './Amenities';
import companyInfo from '../../../common/companyInfo';

export const HotelCard = ({
  data,
  traceId,
  nationality,
  resetFilters,
  numberofRooms,
}) => {
  const navigate = useNavigate();
  const initialState = useSelector((state) => state.hotel);
  // const dateRange = useSelector((state) => state.hotel.dateRange);

  const [modalState, setModalState] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [overviewData, setOverviewData] = useState(null);

  const openModal = (item, modal) => {
    // setOverviewData(item);
    setModalState(modal);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const line1 = data?.contact?.address.line1;
  const line2 = data?.contact?.address.line2;
  const postalCode = data?.contact?.address.postalCode;
  const state = data?.contact?.address.state.name;
  const city = data?.contact?.address.city.name + '-' + postalCode;
  const countryName = data?.contact?.address.country.name;
  const providerData = data?.reviews;
  const userRating = data?.reviews?.[0]?.rating;
  const userRatingCount = data?.reviews?.[0]?.count;
  const startDate = moment(initialState?.dateRange?.[0]?.startDate);
  const endDate = moment(initialState?.dateRange?.[0]?.endDate);
  const nights = endDate.diff(startDate, 'days');
  const map = data?.geoCode;

  const numberOfAdults = initialState?.rooms.reduce(
    (total, room) => total + room.adults,
    0
  );
  const numberOfChilds = initialState?.rooms.reduce(
    (total, room) => total + room.children,
    0
  );

  const googleMapUrl = `https://www.google.com/maps?q=${map?.lat},${map?.long}`;

  const price = data?.availability?.rate?.finalRate || 0;
  const rewardPointCalculate = parseInt(price * 0.01);
  const roomsParam = encodeURIComponent(JSON.stringify(numberofRooms));
  const handleNavigatePhone = () => {
    resetFilters();
    navigate(
      `${data.id}/${traceId}/${roomsParam}/${startDate}/${endDate}/${numberOfAdults}/${numberOfChilds}/${nationality?.value}`,
      {}
    );
  };
  // const rooms = initialState.rooms?.length || 1;
  const handleNavigate = () => {
    resetFilters();
    const url = `dashboard/hotel/${data.id}/${traceId}/${roomsParam}/${startDate}/${endDate}/${numberOfAdults}/${numberOfChilds}/${nationality?.value}`;

    window.open(`${window.location.origin}/${url}`, '_blank');
  };

  return (
    <Box
      sx={{
        padding: 1,
        border: 0.1,
        rounded: 1,
        borderColor: '#DADFE6',
        bgcolor: 'var(--white)',
        borderRadius: '10px',
        my: 1,
        mx: { xs: 0.5, md: 'unset' },
      }}
    >
      {/* Left Side - Hotel Image */}

      <Grid container spacing={{ xs: 1, md: 1.5 }}>
        <Grid item xs={3.5} md={2.5}>
          <Box
            sx={{
              width: '100%',
              height: '156px',
              maxHeight: '166px',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            {/* {data?.heroImage} */}
            <img
              src={
                data?.heroImage ||
                data?.images?.[0]?.links?.[0]?.url ||
                hotel.hotelnoimage
              }
              alt="Hotel"
              onError={(e) => (e.target.src = hotel.h1)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={8.5} md={7}>
          <Stack
            sx={{
              flex: '1 0 auto',
              width: '100%',
              // border: '1px solid red'
            }}
          >
            {/* Title */}
            <Box display="flex" alignItems="center">
              <Typography
                sx={{
                  color: 'var(--black)',
                  fontWeight: 500,
                  fontSize: { xs: 12, md: 16 },
                  marginRight: 1,
                }}
                noWrap
              >
                {data?.name}
              </Typography>

              <Rating rating={data?.starRating} />
            </Box>

            {/* Address */}
            <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
              <img src={hotel.loc} alt="" width={12} height={12} />
              <Typography
                sx={{
                  color: 'var(--black)',
                  fontWeight: 300,
                  fontSize: { xs: 10, md: 12 },
                }}
                noWrap
                onClick={() => openModal(data, 'OVERVIEW')}
              >
                {line1},&nbsp;
                {line2 === undefined ? '' : line2}&nbsp;
                {city},&nbsp;
                {state}&nbsp;
                {countryName}
              </Typography>
              {/* <Box
                sx={{
                  color: '#3164FF',
                  fontWeight: 300,
                  fontSize: { xs: 10, md: 12 },
                  cursor: 'pointer',
                }}
                onClick={() => openModal(data, 'OVERVIEW')}
              >
                Show map
              </Box> */}
            </Stack>

            <Box>
              <Tooltip
                slotProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: '#333',
                      color: '#fff',
                      borderRadius: 1,
                      whiteSpace: 'normal',
                    },
                  },
                }}
                title={
                  <Box px={1} py={0.5}>
                    {Array.isArray(providerData) && providerData.length > 0 && (
                      <Box>
                        {providerData.map((provider, index) => (
                          <Box key={index} mb={1}>
                            <Box
                              fontWeight="300"
                              fontSize="0.775rem"
                              color="var(--white)"
                            >
                              <Box>
                                User Rating:{' '}
                                <Box component="span" fontWeight="normal">
                                  {!isNaN(provider.rating)
                                    ? Number(provider.rating).toFixed(1)
                                    : '0.0'}{' '}
                                  / 5
                                </Box>
                              </Box>
                              <Box fontSize="0.775rem" mb={1}>
                                Reviewed by {provider.count || 0}{' '}
                                {provider.count === 1 ? 'guest' : 'guests'}
                              </Box>
                            </Box>
                            {Array.isArray(provider.categoryratings) &&
                              provider.categoryratings.map((cat, i) => (
                                <Box
                                  key={i}
                                  pl={1.5}
                                  fontSize={10}
                                  color="var(--white)"
                                  fontWeight="300"
                                >
                                  •{' '}
                                  {cat.category.charAt(0).toUpperCase() +
                                    cat.category.slice(1)}
                                  :{' '}
                                  {parseFloat(cat.rating) <= 5
                                    ? `${cat.rating}/5`
                                    : `${cat.rating}`}
                                </Box>
                              ))}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                }
                followCursor
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      color: 'var(--dark-green)',
                      fontWeight: 300,
                      fontSize: { xs: 10, md: 12 },
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    User Rating&nbsp;&nbsp;
                    {!isNaN(userRating) ? Number(userRating).toFixed(1) : '0.0'}
                    /5
                    <StarIcon
                      sx={{
                        fontSize: 12,
                        color: 'var(--dark-green)',
                      }}
                    />
                    &nbsp;&nbsp;({userRatingCount || '0.0'})
                    <GroupIcon
                      sx={{
                        fontSize: 12,
                        color: 'var(--dark-green)',
                        ml: 0.5,
                      }}
                    />
                  </Box>
                </Stack>
              </Tooltip>
            </Box>

            {/* Room Info */}
            <Box
              sx={{
                backgroundColor: 'var(--price-color)',
                px: { xs: 0.5, md: 1 },
                py: 0.8,
                mt: 1.2,
              }}
            >
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'baseline'}
              >
                <Box>
                  <Typography sx={{ fontSize: { xs: 10 } }}>
                    {data?.availability?.options?.freeBreakfast
                      ? 'Breakfast Available'
                      : ''}
                  </Typography>
                  <Typography
                    fontSize={{ xs: 9, md: 10, fontWeight: 300 }}
                    color="#10B15A"
                  >
                    {data?.availability?.rate?.cancellationPolicy?.[0]
                      ?.rules?.[0]?.end
                      ? `Free Cancellation till ${moment(
                          data?.availability?.rate?.cancellationPolicy?.[0]
                            ?.rules?.[0]?.end
                        )
                          .local()
                          .format('DD MMM, YYYY')}`
                      : data?.availability?.options?.refundable
                      ? 'Refundable'
                      : 'Non Refundable'}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    color: 'var(--primary)',
                    fontWeight: 400,
                    fontSize: { xs: 10, md: 12 },
                    cursor: 'pointer',
                    px: 1,
                    border: '1px solid var(--light-stroke)',
                    borderRadius: 1,
                  }}
                  onClick={() => openModal(data, 'OVERVIEW')}
                >
                  Show Details
                </Box>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mt={0.2}
                sx={{ width: '100%' }} // Ensure parent stack takes full width
              >
                <Amenities facilitiesData={data?.facilityWithGroups} />
                {/* Hotel Chain Section */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{
                    width: 'fit-content', // Prevent taking unnecessary space
                    paddingX: 1,
                    paddingY: 0.5,
                    fontSize: { xs: 6, md: 9.5 },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 10, md: 10 },
                      maxWidth: { xs: 100, md: 130 },
                      color: 'var(--secondary)',
                    }}
                    noWrap
                  >
                    Chain: {data?.chainName || 'n/a'}
                  </Typography>

                  <Box
                    sx={{
                      padding: 0.5,
                      backgroundColor: '#DADFE6',
                      display: { xs: 'none', md: 'block' }, // Show only on larger screens
                      borderRadius: 1,
                    }}
                  >
                    &nbsp;
                    <img src={hotel.hotel} alt="" width={12} height={12} />{' '}
                    {data?.type}
                  </Box>
                </Stack>
              </Stack>
            </Box>

            {/* Price and Availability */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 0.8 }}>
              <Stack direction="row" justifyContent="space-between">
                <Box bgcolor="white">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: '',
                      alignItems: 'center',
                      fontSize: 11,
                      color: '#009045',
                    }}
                  >
                    <img src={hotel.trip} alt="" width={15} height={15} />
                    {rewardPointCalculate > 0
                      ? `+${rewardPointCalculate}`
                      : 'N/A'}
                  </div>
                </Box>
                <Box>
                  <Typography
                    fontWeight="bold"
                    sx={{ fontSize: 12, color: 'var(--primary)' }}
                  >
                    {companyInfo?.currencyCode} {price > 0 ? price : 'N/A'}
                  </Typography>
                </Box>
                <Button
                  sx={{
                    py: 0.2,
                    borderRadius: 1,
                    fontWeight: 300,
                    fontSize: 10,
                    backgroundColor: 'var(--primary)',
                    color: '#fff',
                    textTransform: 'capitalize',
                    '&:hover': { backgroundColor: 'var(--secondary)' },
                    display: { xs: 'flex', md: 'none' },
                  }}
                  onClick={() => {
                    handleNavigatePhone();
                  }}
                  endIcon={
                    <ArrowForwardIosIcon
                      color="white"
                      sx={{ fontSize: 10, ml: -0.5, width: 10 }}
                    />
                  }
                >
                  See&nbsp;Rooms
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={2.5}>
          <Stack
            sx={{
              //   display: 'flex',
              textAlign: 'end',
              color: 'var(--black)',
              display: { xs: 'none', md: 'block' },
              //   border: '1px solid red',
            }}
          >
            <Box sx={{ mx: 1, mt: 1.6 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  fontSize: 12,
                  color: '#009045',
                }}
              >
                <img src={hotel.trip} alt="" width={20} height={20} />
                {rewardPointCalculate > 0 ? `+${rewardPointCalculate}` : 'N/A'}
              </div>

              <Typography
                fontWeight="bold"
                sx={{
                  mb: { xs: 0, md: 0.2 },
                  mt: 3,
                  fontSize: { md: 17 },
                  color: 'var(--primary)',
                }}
              >
                {companyInfo?.currencyCode} {price > 0 ? price : 'N/A'}
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 10, md: 10 },
                  lineHeight: 1.2,
                  fontWeight: 300,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                  textOverflow: 'ellipsis',
                }}
              >
                Price for {initialState.rooms?.length || 1} rooms x{' '}
                {nights || 1} night Incl.
                <br /> all taxes and fees
              </Typography>

              <Button
                sx={{
                  mt: 2,
                  py: 0.5,
                  borderRadius: 1,
                  fontWeight: 300,
                  fontSize: 11,
                  backgroundColor: 'var(--primary)',
                  color: '#fff',
                  textTransform: 'capitalize',
                  '&:hover': { backgroundColor: 'var(--secondary)' },
                }}
                onClick={() => {
                  handleNavigate();
                }}
                endIcon={
                  <ArrowForwardIosIcon
                    color="white"
                    sx={{ fontSize: 10, ml: -0.5, width: 12 }}
                  />
                }
              >
                See&nbsp;Rooms
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      {modalIsOpen && (
        <HotelOverviewModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          item={data || {}}
          modalState={modalState}
        />
      )}
    </Box>
  );
};
