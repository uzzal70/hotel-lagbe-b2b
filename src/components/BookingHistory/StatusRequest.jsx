import {
  Box,
  Button,
  Container,
  Grid,
  Grow,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import webpImport from '../../assets/webpImport';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Calendar } from 'react-date-range';
import moment from 'moment';
import BackButton from '../Common/BackButton';
import RepartitionIcon from '@mui/icons-material/Repartition';
import {
  useCreateItemMutation,
  useGetItemsQuery,
} from '../../redux/slices/apiSlice';
import FlightItinerayCalculate from './Refund/FlightItinerayCalculate';
import getAuthToken from '../Common/getAuthToken';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Token from '../Common/Token';
import Swal from 'sweetalert2';
import Processoing from '../Common/Processoing';
import { ToastContainer, toast } from 'react-toastify';
import Notice from './Notice';
import BookingDetailsLoader from '../BookingDetails/BookingDetailsLoader';
import responseimg from '../../assets/responseimg';
import { InfoOutlined } from '@mui/icons-material';
import { convertToSegments } from '../BookingDetails/convertToSegments';
import HeaderTitle from '../../common/HeaderTitle';

const refundTypes = [
  {
    name: 'VOLUNTARY',
    value: 'VOLUNTARY',
  },
  {
    name: 'IN-VOLUNTARY',
    value: 'INVOLUNTARY',
  },
  {
    name: 'OTHERS',
    value: 'OTHERS',
  },
];

const StatusRequest = () => {
  const params = useParams();
  const token = getAuthToken();
  const agentId = Token();
  const title = params.status;
  const id = params?.id;
  const navigate = useNavigate();
  const [processMessage, setProcessMessage] = useState('');
  const [isDone, setIsDone] = useState(true);
  const [open, setOpen] = useState({
    departur: '',
    arrival: '',
    departOpen: false,
    arrivalOpen: false,
  });
  const initialDeparture = new Date();
  const initialReturn = new Date();

  const url = `/booking/findOneByAgent/${id}`;
  const { data: bookingData, isLoading, refetch } = useGetItemsQuery({ url });

  const data = bookingData?.data?.[0];
  const segmentData = data?.segments;
  // const segmentData =
  //   bookingData?.reissuedSegments?.length === 0
  //     ? data?.segments
  //     : bookingData?.reissuedSegments;
  const [terms, setTerms] = useState(true);
  const [selected, setSelected] = useState({
    checked: true,
    segments: [],
    passengers: [],
    refundType: '',
    agentRemarks: '',
  });

  const handleCheck = () => {
    setTerms(!terms);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSelected((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (providerType, providerId) => {
    setSelected((prevSelected) => {
      const updatedSelected = { ...prevSelected };

      // Check if providerType is either 'segments' or 'passengers'
      if (providerType === 'segments' || providerType === 'passengers') {
        // Make a copy of the array to maintain immutability
        const providerArray = [...(updatedSelected[providerType] || [])];
        const index = providerArray.indexOf(providerId);

        if (index > -1) {
          // If the providerId is already in the array, remove it
          providerArray.splice(index, 1);
        } else {
          // If the providerId is not in the array, add it
          providerArray.push(providerId);
        }

        updatedSelected[providerType] = providerArray;
      } else if (providerType === 'refundType') {
        // For 'refundType', simply update the value to providerId
        updatedSelected.refundType = providerId;
      }

      return updatedSelected;
    });
  };

  const selectedFilterSegments = segmentData?.filter((segment) =>
    selected?.segments.includes(segment?.group)
  );

  const resultSegments = selectedFilterSegments?.map((item) => ({
    segmentId: item?.id,
  }));

  const selectedConvertSegments = selectedFilterSegments?.reduce(
    (acc, current) => {
      const lastGroup = acc.length > 0 ? acc[acc.length - 1] : null;
      if (lastGroup && lastGroup[0].group === current.group) {
        lastGroup.push(current);
      } else {
        acc.push([current]);
      }
      return acc;
    },
    []
  );

  const mainData = segmentData || [];
  const segmentedData = convertToSegments(mainData);

  const resultPassengers = selected?.passengers?.map((item) => ({
    passengerId: item,
  }));

  const [createItem] = useCreateItemMutation();

  const handleError = (status) => {
    toast.error(
      <Box sx={{ fontSize: 13, color: 'var(--primary)' }}>
        Please select {status}
      </Box>
    );
  };

  const handleDepartDateOpen = () => {
    setOpen({
      ...open,
      departOpen: !open.departOpen,
      arrivalOpen: false,
    });
  };

  const handleReturnDateOpen = () => {
    setOpen({
      ...open,
      departOpen: false,
      arrivalOpen: !open.arrivalOpen,
    });
  };

  const handleDepartDate = (date) => {
    setOpen({
      ...open,
      departur: date,
      departOpen: false,
    });
  };

  const handleReturnDate = (date) => {
    setOpen({
      ...open,
      arrival: date,
      arrivalOpen: false,
    });
  };

  const segments = selected.segments;
  const condition1 = segments?.length === 1 && segments[0] === '0';
  const condition2 =
    segments?.length === 2 && (segments[0] === '0' || segments[1] === '0');
  const condition3 = segments?.length === 1 && segments[0] === '1';
  const condition4 =
    segments?.length === 2 && (segments[0] === '1' || segments[1] === '1');

  const currentDate = new Date();
  const depDate = new Date(segmentedData?.[0]?.[0]?.departureDateTime);
  const diffMs = depDate - currentDate;
  const fourHoursMs = 4 * 60 * 60 * 1000;
  const isFourHoursAhead = diffMs >= fourHoursMs;

  const reissuePayload = {
    agentId: agentId,
    bookingId: id,
    remarks: '',
    segments: selectedFilterSegments,
    depDate:
      condition1 || condition2
        ? open.departur
          ? moment(open.departur).format('DD MMM, YYYY')
          : moment(segmentedData?.[0]?.[0]?.departureDateTime).format(
              'DD MMM, YYYY'
            )
        : moment(segmentedData?.[0]?.[0]?.departureDateTime).format(
            'DD MMM, YYYY'
          ),
    returnDate:
      data?.tripType === 'ONE_WAY'
        ? ''
        : condition3 || condition4
        ? open.arrival
          ? moment(open.arrival).format('DD MMM, YYYY')
          : moment(
              segmentedData?.[segmentedData?.length - 1]?.[0]?.arrivalDateTime
            ).format('DD MMM, YYYY')
        : moment(
            segmentedData?.[segmentedData?.length - 1]?.[0]?.arrivalDateTime
          ).format('DD MMM, YYYY'),
    passengers: resultPassengers,
    reissueType: selected?.refundType || '',
    agentRemarks: selected?.agentRemarks || '',
  };
  const refundPayload = {
    agentId: agentId,
    bookingId: id,
    remarks: '',
    segments: resultSegments,
    passengers: resultPassengers,
    refundType: selected?.refundType || '',
    agentRemarks: selected?.agentRemarks || '',
  };
  const handleRequest = async (text) => {
    try {
      setProcessMessage(`${text} Request Sending...`);
      const isConfirmed = await Swal.fire({
        title: `<div style="font-size: 18px; color: var(--primary);">Are you sure you want to ${title} this booking?</div>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--primary)',
        cancelButtonColor: 'var(--crimson)',
        confirmButtonText:
          '<span style="color: white; padding: 5px 20px;">Yes Now</span>',
        cancelButtonText:
          '<span style="color: white; padding: 5px 20px;">Not Now</span>',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });

      if (isConfirmed.value) {
        setIsDone(false);
        const payload =
          title === 'refund' || title === 'void'
            ? refundPayload
            : reissuePayload;
        const method = 'POST';
        const url =
          title === 'refund'
            ? 'agent/refundRequest'
            : title === 'void'
            ? 'agent/voidRequest'
            : 'agent/reissueRequest';
        const headers = {
          accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const result = await createItem({
          url,
          method,
          headers,
          payload,
        });
        if (
          result?.data?.status === 'success' ||
          result?.data?.status === 200
        ) {
          Swal.fire({
            position: 'center',
            title: `${
              title === 'refund'
                ? 'Refund'
                : title === 'void'
                ? 'Void'
                : 'Reissue'
            } Request Submitted`,
            html: `<span style="color: var(--primary); font-size: 12px;"> We are actively processing your ${title} request and anticipate sending you the confirmation and invoice shortly after issuance.</span>`,
            showConfirmButton: true,
            confirmButtonColor: 'var(--primary)',
            customClass: {
              popup: 'custom-swal-popup',
            },
            imageUrl: `${responseimg.requestsuccess}`,
          });
          navigate(-1);
        } else {
          throw new Error(result?.error.data.message); // Handle unexpected status code
        }
        refetch();
      }
    } catch (error) {
      setIsDone(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error || 'Something went wrong!',
        showConfirmButton: true,
        confirmButtonColor: 'var(--primary)',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });

      navigate(-1);
    } finally {
      setIsDone(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        pb: { xs: 7, md: 1 },
      }}
    >
      <HeaderTitle headerTitle={`${title} Request` || 'Request'} />

      {isLoading ? (
        <Container sx={{ pt: 5 }}>
          <BookingDetailsLoader />
        </Container>
      ) : (
        <Container sx={{ p: { xs: 1, md: 'auto' } }}>
          <Box
            sx={{
              bgcolor: 'var(--white)',
              p: { xs: 1.5, md: 2 },
              my: { xs: 0, md: 3 },
              borderRadius: '5px',
            }}
          >
            {data?.status === 'TICKETED' && isFourHoursAhead && (
              <Typography
                sx={{
                  px: 1,
                  py: 0.2,
                  fontSize: 14,
                  color: 'var(--red)',
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid red',
                  borderRadius: '5px',
                  width: 'fit-content',
                  mb: 2,
                }}
              >
                <InfoOutlined
                  sx={{ color: 'var(--red)', fontSize: 16, mr: 1 }}
                />{' '}
                Please note that this is a no-show refund, and processing times
                may be longer than usual as it depends on the airline’s policy.
              </Typography>
            )}
            {(title === 'refund' || title === 'reissue') && (
              <Box sx={{ pb: 3 }}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    bgcolor: 'var(--bgcolor)',
                    py: 1,
                    px: 2,
                    borderRadius: '5px',
                  }}
                >
                  <RepartitionIcon
                    sx={{ fontSize: 20, color: 'var(--disable)' }}
                  />
                  <Typography
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 15,
                      fontWeight: 500,
                    }}
                  >
                    Select {title || ''} type
                  </Typography>
                </Stack>

                <Box px={2}>
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      fontSize: 14,
                      pt: 1,
                      mb: 2,
                      color: 'var(--secondary)',
                      span: {
                        color: 'var(--primary)',
                        fontWeight: 500,
                      },
                    }}
                  >
                    <Grid item xs={12} sm={6} md={4.5}>
                      <Stack direction={'row'} alignItems={'center'}>
                        <InfoOutlined sx={{ fontSize: 16, mr: 1 }} />
                        <span>Voluntary {title || ''}</span>
                      </Stack>
                      <Box>
                        Change of mind, Change of itinerary, Personal purpose
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={7.5}>
                      <Stack direction={'row'} alignItems={'center'}>
                        <InfoOutlined sx={{ fontSize: 16, mr: 1 }} />
                        <span>In-voluntary {title || ''}</span>
                      </Stack>
                      <Box>
                        Flight cancellations, Denied boarding, Schedule changes,
                        Travel restrictions
                      </Box>
                    </Grid>
                  </Grid>
                  <Stack
                    direction={'row'}
                    spacing={{ xs: 1, md: 3 }}
                    sx={{
                      pt: 1,
                    }}
                  >
                    {refundTypes?.map((item, index) => {
                      return (
                        <Box key={index}>
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
                              type="checkbox"
                              id={item.value}
                              checked={selected.refundType === item.value}
                              onChange={() =>
                                handleCheckboxChange('refundType', item?.value)
                              }
                            />
                            <label htmlFor={item.value}>
                              <Typography
                                sx={{
                                  color: 'var(--black)',
                                  fontWeight: { xs: 400, sm: 500 },
                                  fontSize: { xs: 12, md: 14 },
                                }}
                              >
                                <span style={{ textTransform: 'uppercase' }}>
                                  {item.name}
                                </span>
                              </Typography>
                            </label>
                          </Stack>
                        </Box>
                      );
                    })}
                  </Stack>
                  <Box
                    sx={{
                      mt: 2,
                      color: 'var(--disable)',
                      fontWeight: 500,
                      input: {
                        width: '100%',
                        padding: '10px 10px',
                        outline: 'none',
                        borderRadius: '5px',
                        border: '1px solid var(--stroke)',
                        fontSize: 14,
                      },
                    }}
                  >
                    <input
                      name="agentRemarks"
                      type="text"
                      placeholder="Please enter your remarks"
                      onChange={handleOnChange}
                    />
                  </Box>
                </Box>
              </Box>
            )}

            <Box>
              <Stack direction="row" spacing={1}>
                <FlightTakeoffIcon
                  sx={{ fontSize: 20, color: 'var(--disable)' }}
                />
                <Typography
                  sx={{
                    color: 'var(--secondary)',
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  Select Itinerary
                </Typography>
              </Stack>

              <Notice
                text1={'one or multiple Itinerary'}
                text2={'itinerary'}
                title={title || 'Status'}
                m={'10px 0'}
              />

              <FlightItinerayCalculate
                data={segmentedData}
                check={selected.segments}
                handleCheckboxChange={handleCheckboxChange}
              />
            </Box>
            <Box>
              <Stack direction="row" spacing={1} pt={2} pb={1}>
                <img src={webpImport.travellar} alt="" style={{ height: 16 }} />
                <Typography
                  sx={{
                    color: 'var(--secondary)',
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  Select Passenger{' '}
                </Typography>
              </Stack>

              <Notice
                text1={'multiple travelers '}
                text2={'travelers'}
                title={title || 'Status'}
                m={'0 0 15px 0'}
              />

              {data?.passengers?.map((item, index) => {
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
                        py: 0.8,
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
                            height: { xs: 15, md: 16 },
                            width: { xs: 15, md: 16 },
                          },
                        }}
                      >
                        <input
                          type="checkbox"
                          id={item.id}
                          checked={
                            item?.status === 'REFUNDED' ||
                            item?.status === 'VOIDED'
                              ? true
                              : selected.passengers.includes(item.id)
                          }
                          disabled={
                            item?.status === 'REFUNDED' ||
                            item?.status === 'VOIDED'
                          }
                          onChange={() =>
                            handleCheckboxChange('passengers', item?.id)
                          }
                        />
                        <label htmlFor={item.id}>
                          <Typography
                            sx={{
                              color: 'var(--black)',
                              fontWeight: { xs: 400, sm: 500 },
                              fontSize: { xs: 12, md: 14 },
                            }}
                          >
                            <span style={{ textTransform: 'uppercase' }}>
                              {item?.prefix || ''} {item.firstName}{' '}
                              {item.lastName}
                            </span>
                            <span
                              style={{
                                color: 'var(--disable)',
                                fontWeight: 400,
                              }}
                            >
                              &nbsp;&nbsp;{'||'}&nbsp;&nbsp;e-Ticket No
                              {': '}
                            </span>
                            {item?.ticketNo || ''}
                            {item?.status === 'REISSUED' ||
                            item?.status === 'VALID' ? null : (
                              <span
                                style={{
                                  color: 'var(--dark-green)',
                                  fontSize: 12,
                                  textTransform: 'capitalize',
                                }}
                              >
                                <span
                                  style={{
                                    color: 'var(--disable)',
                                    fontWeight: 400,
                                  }}
                                >
                                  &nbsp;&nbsp;{'||'}&nbsp;&nbsp;
                                </span>

                                {item?.status || ''}
                              </span>
                            )}
                          </Typography>
                        </label>
                      </Stack>
                    </Stack>
                  </Box>
                );
              })}
            </Box>

            {title === 'reissue' && (
              <Box mt={3}>
                {selectedConvertSegments?.map((items, i) => (
                  <Box key={i} pb={2}>
                    <Stack direction="row" spacing={1}>
                      <img
                        src={webpImport.calender}
                        alt=""
                        style={{ height: 16 }}
                      />
                      <Typography
                        sx={{ color: 'var(--secondary)', fontSize: 14 }}
                      >
                        Select new Journey Date ({' '}
                        {items?.[0]?.departureAirportCode || 'N/A'} -{' '}
                        {items?.[items?.length - 1]?.arrivalAirportCode ||
                          'N/A'}
                        )
                      </Typography>
                    </Stack>
                    <Box sx={{ my: 1 }}>
                      {/* <ClickAwayListener onClickAway={() => handleClose()}> */}
                      <Grid container spacing={{ xs: 1, md: 2 }}>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={3}
                          lg={3}
                          sx={{ overflow: 'hidden' }}
                        >
                          <Tooltip
                            title="Departure cannot be changed"
                            followCursor
                          >
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                              sx={{
                                bgcolor: 'var(--gray)',
                                p: 1,
                                color: 'var(--disable)',
                                borderRadius: '5px',
                              }}
                            >
                              <img src={webpImport.depart} alt="" />
                              <Box>
                                <Box sx={{ fontSize: { xs: 10, md: 12 } }}>
                                  From
                                </Box>
                                <Box
                                  sx={{
                                    fontSize: { xs: 14, md: 16 },
                                    fontWeight: 500,
                                  }}
                                >
                                  {items?.[0]?.departureLocation?.split(
                                    ','
                                  )[0] || 'NA'}
                                  {', '}
                                  {items?.[0]?.departureAirportCode || 'N/A'}
                                </Box>
                                <Typography
                                  sx={{
                                    color: 'var(--disable)',
                                    fontSize: { xs: 10, md: 12 },
                                  }}
                                  noWrap
                                >
                                  {items?.[0]?.departureAirportName || 'NA'}
                                </Typography>
                              </Box>
                            </Stack>
                          </Tooltip>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={3}
                          lg={3}
                          sx={{ overflow: 'hidden' }}
                        >
                          <Tooltip
                            title="Arrival cannot be changed"
                            followCursor
                          >
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                              sx={{
                                bgcolor: 'var(--gray)',
                                p: 1,
                                color: 'var(--disable)',
                                borderRadius: '5px',
                              }}
                            >
                              <img src={webpImport.arrival} alt="" />
                              <Box>
                                <Box sx={{ fontSize: { xs: 10, md: 12 } }}>
                                  To
                                </Box>
                                <Box
                                  sx={{
                                    fontSize: { xs: 14, md: 16 },
                                    fontWeight: 500,
                                  }}
                                >
                                  {items?.[
                                    items?.length - 1
                                  ]?.arrivalLocation?.split(',')[0] || 'NA'}
                                  {', '}
                                  {items?.[items?.length - 1]
                                    ?.arrivalAirportCode || 'N/A'}
                                </Box>
                                <Typography
                                  sx={{
                                    color: 'var(--disable)',
                                    fontSize: { xs: 10, md: 12 },
                                  }}
                                  noWrap
                                >
                                  {items?.[items?.length - 1]
                                    ?.arrivalAirportName || 'NA'}
                                </Typography>
                              </Box>
                            </Stack>
                          </Tooltip>
                        </Grid>

                        {i === 0 && (condition1 || condition2) && (
                          <Grid
                            item
                            xs={6}
                            sm={6}
                            md={3}
                            lg={2}
                            sx={{ position: 'relative' }}
                          >
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                              sx={{
                                bgcolor: 'var(--gray)',
                                p: 1,
                                color: 'var(--secondary)',
                                borderRadius: '5px',
                                border: '1px solid red',
                                cursor: 'pointer',
                              }}
                              onClick={handleDepartDateOpen}
                            >
                              <img src={webpImport.calenderLight} alt="" />
                              <Box>
                                <Box
                                  sx={{
                                    fontSize: {
                                      xs: 10,
                                      md: 12,
                                      color: 'var(--disable)',
                                    },
                                  }}
                                >
                                  Reissue Date
                                </Box>
                                <Box
                                  sx={{
                                    fontSize: { xs: 14, md: 16 },
                                    fontWeight: 500,
                                  }}
                                >
                                  {open.departur
                                    ? moment(open.departur).format(
                                        'DD MMM, YYYY'
                                      )
                                    : 'Select Date '}
                                </Box>
                                <Box
                                  sx={{
                                    fontSize: {
                                      xs: 10,
                                      md: 12,
                                      color: 'var(--disable)',
                                    },
                                  }}
                                >
                                  {open.departur
                                    ? moment(open.departur).format('dddd')
                                    : 'Day'}
                                </Box>
                              </Box>
                            </Stack>
                            <Box>
                              <Grow in={open.departOpen}>
                                <Box
                                  sx={{
                                    position: 'absolute',
                                    bottom: { xs: '100%', md: 'unset' },
                                    top: { xs: 'unset', md: '105%' },
                                    left: 0,
                                    boxShadow:
                                      'rgba(0, 0, 0, 0.24) 0px 3px 8px ',
                                    borderRadius: '14px',
                                    overflow: 'hidden',
                                    zIndex: 1,
                                  }}
                                >
                                  <Calendar
                                    date={initialDeparture}
                                    color="var(--primary)"
                                    months={1}
                                    minDate={new Date()}
                                    onChange={handleDepartDate}
                                  />
                                </Box>
                              </Grow>
                            </Box>
                          </Grid>
                        )}

                        {(selectedConvertSegments?.length === 2
                          ? i === 1
                          : i === 0) &&
                          (condition3 || condition4) &&
                          (data?.tripType?.toUpperCase() === 'ROUND_WAY' ||
                            data?.tripType?.toUpperCase() === 'MULTY_CITY') && (
                            <Grid
                              item
                              xs={6}
                              sm={6}
                              md={3}
                              lg={2}
                              sx={{ position: 'relative' }}
                            >
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{
                                  bgcolor: 'var(--gray)',
                                  p: 1,
                                  color: 'var(--secondary)',
                                  borderRadius: '5px',
                                  cursor: 'pointer',
                                  border: '1px solid red',
                                }}
                                onClick={handleReturnDateOpen}
                              >
                                <img src={webpImport.calenderLight} alt="" />
                                <Box>
                                  <Box
                                    sx={{
                                      fontSize: {
                                        xs: 10,
                                        md: 12,
                                        color: 'var(--disable)',
                                      },
                                    }}
                                  >
                                    Reissue Date
                                  </Box>
                                  <Box
                                    sx={{
                                      fontSize: { xs: 14, md: 16 },
                                      fontWeight: 500,
                                    }}
                                  >
                                    {open.arrival
                                      ? moment(open.arrival).format(
                                          'DD MMM, YYYY'
                                        )
                                      : 'Select Date '}
                                  </Box>
                                  <Box
                                    sx={{
                                      fontSize: {
                                        xs: 10,
                                        md: 12,
                                        color: 'var(--disable)',
                                      },
                                    }}
                                  >
                                    {open.arrival
                                      ? moment(open.arrival).format('dddd')
                                      : 'Day'}
                                  </Box>
                                </Box>
                              </Stack>
                              <Box>
                                <Grow in={open.arrivalOpen} unmountOnExit>
                                  <Box
                                    sx={{
                                      position: 'absolute',
                                      bottom: { xs: '100%', md: 'unset' },
                                      top: { xs: 'unset', md: '105%' },
                                      left: 0,
                                      boxShadow:
                                        'rgba(0, 0, 0, 0.24) 0px 3px 8px ',
                                      borderRadius: '14px',
                                      overflow: 'hidden',
                                      zIndex: 1,
                                    }}
                                  >
                                    <Calendar
                                      date={initialReturn}
                                      color="var(--primary)"
                                      months={1}
                                      minDate={open.departur || new Date()}
                                      onChange={handleReturnDate}
                                    />
                                  </Box>
                                </Grow>
                              </Box>
                            </Grid>
                          )}
                      </Grid>
                      {/* </ClickAwayListener> */}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
            <Box
              sx={{
                my: 3,
                label: {
                  color: 'var(--black)',
                  fontSize: 14,
                  fontWeight: 500,
                },
                span: {
                  color: 'var(--black)',
                  fontSize: 14,
                  fontWeight: 400,
                  pl: 4,
                  textTransform: '',
                },
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <input
                  type="checkbox"
                  id="1"
                  style={{ width: 15, height: 15 }}
                  checked={terms}
                  onChange={() => handleCheck()}
                />
                <label htmlFor="1" style={{ display: 'inline-block' }}>
                  &nbsp;I acknowledge the&nbsp;
                  <Link
                    target="_blank"
                    to="/privacy-policy"
                    style={{ color: 'var(--primary)' }}
                  >
                    Date Change Policy
                  </Link>
                  &nbsp;and&nbsp;
                  <Link
                    target="_blank"
                    to="/terms-condition"
                    style={{ color: 'var(--primary)' }}
                  >
                    Terms & Conditions
                  </Link>
                </label>
              </Box>
            </Box>
            {title === 'reissue' ? (
              <Button
                sx={{
                  padding: '5px 20px',
                  width: '200px',
                  bgcolor: 'var(--primary)',
                  color: 'var(--white)',
                  fontSize: 14,
                  textTransform: 'capitalize',
                  '&:hover': {
                    bgcolor: 'var(--primary)',
                  },
                }}
                onClick={() => {
                  const itinerary = resultSegments?.length === 0;
                  const pasenger = resultPassengers?.length === 0;
                  const departDate = open.departur?.length === 0;
                  const returnData = open.arrival?.length === 0;
                  itinerary
                    ? handleError('any itinerary')
                    : pasenger
                    ? handleError('at least one Passenger')
                    : departDate && data?.tripType?.toUpperCase() === 'ONE_WAY'
                    ? handleError('Reissue departure date')
                    : (departDate &&
                        selected.segments?.length === 1 &&
                        selected.segments[0] === '0' &&
                        data?.tripType?.toUpperCase() === 'ROUND_WAY') ||
                      (departDate &&
                        selected.segments?.length === 2 &&
                        (selected.segments[0] === '0' ||
                          selected.segments[1] === '0') &&
                        data?.tripType?.toUpperCase() === 'ROUND_WAY')
                    ? handleError('Reissue Date')
                    : (returnData &&
                        selected.segments?.length === 1 &&
                        selected.segments[0] === '1' &&
                        data?.tripType?.toUpperCase() === 'ROUND_WAY') ||
                      (returnData &&
                        selected.segments?.length === 2 &&
                        (selected.segments[0] === '1' ||
                          selected.segments[1] === '1') &&
                        data?.tripType?.toUpperCase() === 'ROUND_WAY')
                    ? handleError('Reissue Date')
                    : selected?.refundType === ''
                    ? handleError('Reissue Type')
                    : handleRequest('Reissue');
                }}
              >
                Submit Reissue Request
              </Button>
            ) : title === 'void' ? (
              <Button
                sx={{
                  padding: '5px 20px',
                  width: '200px',
                  bgcolor: 'var(--primary)',
                  color: 'var(--white)',
                  fontSize: 14,
                  textTransform: 'capitalize',
                  '&:hover': {
                    bgcolor: 'var(--primary)',
                  },
                }}
                onClick={() => {
                  const itinerary = resultSegments?.length === 0;
                  const pasenger = resultPassengers?.length === 0;
                  itinerary
                    ? handleError('any itinerary')
                    : pasenger
                    ? handleError('at least one Passenger')
                    : handleRequest('Void');
                }}
              >
                Submit Void Request
              </Button>
            ) : (
              <Button
                sx={{
                  padding: '5px 20px',
                  width: '200px',
                  bgcolor: 'var(--primary)',
                  color: 'var(--white)',
                  fontSize: 14,
                  textTransform: 'capitalize',
                  '&:hover': {
                    bgcolor: 'var(--primary)',
                  },
                }}
                onClick={() => {
                  const itinerary = resultSegments?.length === 0;
                  const pasenger = resultPassengers?.length === 0;
                  itinerary
                    ? handleError('any itinerary')
                    : pasenger
                    ? handleError('at least one Passenger')
                    : selected?.refundType === ''
                    ? handleError('Refund Type')
                    : handleRequest('Refund');
                }}
              >
                Submit Refund Request
              </Button>
            )}
          </Box>
        </Container>
      )}
      {!isDone && <Processoing content={processMessage || ''} />}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  );
};

export default StatusRequest;
