/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import BackButton from '../Common/BackButton';
import CheckIn from './content/CheckIn';
import PersonIcon from '@mui/icons-material/Person';
import ContactInformation from './content/ContactInformation';
import PriceBreakup from './content/PriceBreakup';
import { useLocation, useNavigate } from 'react-router-dom';
import HotelPassengerForm from './HotlePassengerForm';
import { useDispatch, useSelector } from 'react-redux';
import { initializePassengers } from '../../redux/slices/hotelBookingPassengerSlice';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import axios from 'axios';
import companyInfo from '../../common/companyInfo';
import Swal from 'sweetalert2';
import { baseUrlHotel } from '../../../baseurl';
import Token from '../Common/Token';
import getAuthToken from '../Common/getAuthToken';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Processoing from '../Common/Processoing';
import moment from 'moment';
import BookingSkeletonLoader from '../Loading/BookingSkeletonLoader';
import LinearProgressDott from '../Loading/FlightInfoLoading/LinearProgressDott';
import CustomModal from '../Common/CustomModal';
import responseimg from '../../assets/responseimg';
import HotelConfirmationModal from './HotelConfirmationModal';
import { toast } from 'react-toastify';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import { setDateRange } from '../../redux/slices/hotelSearchSlice';
import HeaderTitle from '../../common/HeaderTitle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: { xs: 2, md: 4 },
  borderRadius: '10px',
};
function generateRandomPassportNumber() {
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
  const number = String(Math.floor(10000000 + Math.random() * 90000000)); // 7 digits
  return letter + number;
}
function generateRandomExpiryDate() {
  const today = new Date();
  const yearsToAdd = Math.floor(Math.random() * 11) + 5; // 5 to 15 years
  today.setFullYear(today.getFullYear() + yearsToAdd);
  return today.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
}
function transformToRoomAllocation(
  passengerData,
  rooms,
  itineraryCode,
  traceId,
  contact
) {
  return {
    itineraryCode,
    traceId,
    specialRequest: [],
    roomAllocation: passengerData.map((room, roomIndex) => {
      const roomInfo = rooms[roomIndex];
      return {
        rateId: roomInfo.rateId,
        roomId: roomInfo.roomId,
        adultCount: room.numberOfAdults,
        childCount: room.numberOfChilds,
        roomType: JSON.stringify(roomInfo?.roomDetails?.beds || ''),
        services: `${[
          ...new Set([
            ...(roomInfo?.policy?.includes || []),
            roomInfo?.policy?.boardBasis?.description,
          ]),
        ]
          .filter(Boolean)
          .join(', ')}`,
        roomName: roomInfo?.roomName || '',

        freeCancellation: JSON.stringify(
          roomInfo?.policy?.cancellationPolicies || ''
        ),
        guests: room.passengers.map((passenger) => ({
          title: passenger.title,
          firstName: passenger.firstName,
          lastName: passenger.lastName,
          isLeadGuest: passenger.isLeadGuest,
          type: passenger.type.toLowerCase(), // Convert "Adult" -> "adult"
          email: contact?.email || companyInfo.email || '',
          isdCode: passenger.isdCode || '',
          contactNumber: `${contact?.phone}` || '',
          // panCardNumber: passenger.panCardNumber || null,
          panCardNumber: 'ABCPD1234F',
          passPortNumber:
            generateRandomPassportNumber() || passenger.passPortNumber || null,
          passPortExpiry:
            generateRandomExpiryDate() || passenger.passPortExpiry || null,
          age: parseInt(passenger?.age) || 0,
        })),
      };
    }),
  };
}
function calculateTotalPrice(bookingArray) {
  return bookingArray.reduce((total, item) => total + item?.fare?.finalRate, 0);
}

function calculateTotalGuests(roomAllocation) {
  let totalAdult = 0;
  let totalChild = 0;
  for (const room of roomAllocation) {
    totalAdult += parseInt(room.numberOfAdults) || 0;
    totalChild += parseInt(room.numberOfChilds) || 0;
  }
  return { totalAdult, totalChild };
}

const ReviewHotelBooking = () => {
  const agentId = Token();
  const token = getAuthToken();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const url = `/agent/findAgentById/${agentId}`;
  const { refetch } = useGetItemsQuery({ url });

  const encodedQuery = queryParams.get('query');
  const decodedQuery = encodedQuery
    ? JSON.parse(decodeURIComponent(encodedQuery))
    : null;

  const { selectedRooms } = useSelector((state) => state.roomSelection);
  const { traceId, recommendationId, payloadstart, payloadend, hotelId } =
    decodedQuery;
  const apicheckIn = decodedQuery?.checkIn;
  const apicheckOut = decodedQuery?.checkOut;

  const itineraryCode = decodedQuery?.itineraryCode || '';
  const navigate = useNavigate();
  const rooms = selectedRooms;
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [open, setOpen] = useState(false);
  const [apiResError, setApiResError] = useState(null);
  const [isModal, setIsModal] = useState(false);

  const handleOpenModal = () => setIsModal(true);
  const handleCloseModal = () => setIsModal(false);
  useEffect(() => {
    if (rooms && rooms.length > 0) {
      dispatch(initializePassengers(rooms));
    }
  }, [dispatch]);
  const [isLoaded, setIsLoaded] = useState(true);
  const data = {
    finalFare: calculateTotalPrice(rooms || []),
    checkIn: payloadstart || '',
    checkOut: payloadend || '',
    itineraryCode: itineraryCode,
    traceId: traceId || '',
    recommendationId: recommendationId || '',
    roomAllocation: rooms || [],
    items: decodedQuery?.items || [],
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrlHotel}/selectRoomRate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        const result = await res.json(); // Always parse JSON

        if (!res.ok || result.code === 100 || result.code === 1010) {
          let errorMsg = '';
          if (result.errors && result.errors.length > 0) {
            errorMsg += `\n\n${result.errors.join('\n')}`;
          }

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMsg || 'Something went wrong',
            confirmButtonText: 'Try Again',
            allowOutsideClick: false,
          }).then((res) => {
            if (res.isConfirmed) {
              navigate(-1); // Go back to previous page
            }
          });

          return;
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Network Error',
          text: err.message || 'Please check your connection and try again.',
          confirmButtonText: 'Try Again',
          allowOutsideClick: false,
        }).then((res) => {
          if (res.isConfirmed) {
            navigate(-1);
          }
        });
      } finally {
        setIsLoaded(false);
      }
    };

    if (traceId) {
      fetchData();
    }
  }, [traceId, navigate]);

  // Date Rage Reset because again back to details page not working
  const dateRange = [
    {
      startDate: '',
      endDate: '',
      key: 'selection',
    },
  ];
  useEffect(() => {
    dispatch(setDateRange(dateRange));
  }, []);

  const passengerData = useSelector((state) => state.hotelPassengers);
  const formRefs = useRef({});
  const [contact, setContact] = useState({
    code: '',
    email: '',
    phone: '',
  });
  const [contactErrors, setContactErrors] = useState({});

  const validateContact = () => {
    const errors = {};
    let isValid = true;

    if (!contact.phone) {
      errors.phone = 'Phone number is required';
      isValid = false;
    }

    if (!contact.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(contact.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    setContactErrors(errors);
    return isValid;
  };
  const validateAllPassengers = () => {
    const errorMap = {};
    let hasErrors = false;
    let firstErrorKey = null;

    passengerData.forEach((room, roomIndex) => {
      room.passengers.forEach((passenger, passengerIndex) => {
        const errors = {};

        // const { IsPassportMandatory, IsPANMandatory } = passenger; // orginal
        // const { IsPassportMandatory = true } = passenger; // test
        const IsPassportMandatory = false;

        // Basic required fields
        if (!passenger.title?.trim()) errors.title = 'Required';
        if (!passenger.firstName?.trim()) errors.firstName = 'Required';
        if (!passenger.lastName?.trim()) errors.lastName = 'Required';

        // Passport validation
        if (IsPassportMandatory) {
          const passportNumber = passenger.passPortNumber?.trim() || '';
          const passportExpiry = passenger.passPortExpiry?.trim() || '';

          if (!passportNumber) {
            errors.passPortNumber = 'Passport number is required';
          } else if (passportNumber.length < 8) {
            errors.passPortNumber = 'Passport must be at least 8 characters';
          }

          if (!passportExpiry) {
            errors.passPortExpiry = 'Passport expiry is required';
          }
        }

        // PAN validation
        // if (IsPANMandatory) {
        //   if (!passenger.panCardNumber?.trim()) {
        //     errors.panCardNumber = 'PAN number is required';
        //   } else if (passenger.panCardNumber.trim().length < 8) {
        //     errors.panCardNumber = 'PAN must be at least 8 characters';
        //   }
        // }

        // Store errors
        const key = `${roomIndex}-${passengerIndex}`;
        if (Object.keys(errors).length > 0) {
          errorMap[key] = errors;
          if (!hasErrors) {
            hasErrors = true;
            firstErrorKey = key;
          }
        }
      });
    });

    setErrors(errorMap);

    // Scroll to the first error field
    if (firstErrorKey && formRefs.current[firstErrorKey]) {
      formRefs.current[firstErrorKey].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }

    return !hasErrors;
  };
  // const bookingPayload = transformToRoomAllocation(
  //   passengerData,
  //   rooms,
  //   itineraryCode,
  //   traceId,
  //   contact
  // );
  const addresss = rooms?.[0]?.hotelInfo?.hotelContact || '';

  const handleConfirmed = async () => {
    // const isValid = validateAllPassengers();
    // const isContactValid = validateContact();
    // if (!isValid || !isContactValid) return;
    // const bookingPayload = transformToRoomAllocation(
    //   passengerData,
    //   rooms,
    //   itineraryCode,
    //   traceId,
    //   contact
    // );
    setOpen(false);
    setLoading(true);
    try {
      // 🔹 Prepare payload for guestRoomAllocation
      const bookingPayload = transformToRoomAllocation(
        passengerData,
        rooms,
        itineraryCode,
        traceId,
        contact
      );
      // console.log('bookingPayload', bookingPayload);
      const payload = {
        ...bookingPayload,
        traceId,
        userId: agentId,
        itineraryCode,
        hotelId: hotelId || '',
        hotelName: rooms?.[0]?.hotelInfo?.hotelName || '',
        coverImage: rooms?.[0]?.hotelInfo?.heroImage || '',
        hotelRating: rooms?.[0]?.hotelInfo?.starRating || '',
        address: `${addresss?.address?.line1 || ''}${
          addresss?.address?.line2 ? ', ' + addresss?.address?.line2 : ''
        }`,

        city: addresss.address?.city?.name || '',
        state: addresss?.address?.state?.name || '',
        country: addresss?.address?.country?.name || '',
        postalCode: addresss.address.postalCode || '',
        phone: addresss.phones?.[0] || '',

        type: rooms?.[0]?.hotelInfo?.type || '',
        finalFare: calculateTotalPrice(rooms || []),
        checkIn: payloadstart ? moment(payloadstart).format('YYYY-MM-DD') : '',
        checkOut: payloadend ? moment(payloadend).format('YYYY-MM-DD') : '',
        checkInTime:
          apicheckIn || rooms?.[0]?.policy?.policies?.[0]?.text || '',
        checkOutTime:
          apicheckOut || rooms?.[0]?.policy?.policies?.[1]?.text || '',
        refundable: rooms?.[0]?.policy?.refundable || false,
      };
      // 🔹 First API call
      const guestRoomAllocationResponse = await axios.post(
        `${baseUrlHotel}/guestRoomAllocation`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ❗️Manually handle logical errors from API response
      const GRresponseData = guestRoomAllocationResponse.data;
      if (GRresponseData.errors && GRresponseData.errors.length > 0) {
        throw {
          response: {
            data: {
              message: GRresponseData.message || 'Booking Failed.',
              errors: GRresponseData.errors,
              traceId: GRresponseData.traceId || '',
            },
          },
        };
      }
      // 🔹 Prepare payload for createHotelBooking
      const bPayload = {
        itineraryCode: itineraryCode || '',
        traceId: traceId || '',
        userId: agentId,
        platform: companyInfo.platform,
        amount: calculateTotalPrice(rooms || []),
        finalFare: calculateTotalPrice(rooms || []),
      };

      // 🔹 Second API call
      const bookingResponse = await axios.post(
        `${baseUrlHotel}/createHotelBooking`,
        bPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = bookingResponse.data;

      // ❗️Manually handle logical errors from API response
      if (responseData?.success === false) {
        throw {
          response: {
            data: {
              message: responseData.message || 'Booking Failed.',
              errors: responseData.errors,
              traceId: responseData.traceId || '',
            },
          },
        };
      }

      const {
        id,
        // bookingRef,
        // status,
        // pnr,
        // roomConfirmation,
        // itineraryCode: finalItineraryCode,
      } = responseData;
      setLoading(false);
      setOpen(true);
      setBookingId(responseData);

      // ✅ Show success alert
      // await Swal.fire({
      //   icon: 'success',
      //   title: 'Hotel Booking Confirmed!',
      //   html: `
      //     <b>Booking Ref:</b> ${bookingRef}<br/>
      //     <b>Status:</b> ${status}<br/>
      //     <b>PNR:</b> ${pnr}<br/>
      //     <b>Itinerary Code:</b> ${finalItineraryCode}<br/>
      //     <b>Room Confirmation:</b> ${
      //       roomConfirmation?.[0]?.hotelConfirmationNumber || 'N/A'
      //     }
      //   `,
      //   confirmButtonColor: '#3085d6',
      //   allowOutsideClick: false,
      // });

      // const encodedQuery = encodeURIComponent(JSON.stringify(paramsBody));
      navigate(`/dashboard/hotel/confirm-hotel/${id}/${hotelId}`);
    } catch (error) {
      setLoading(false);
      setOpen(true);
      const response = error?.response?.data;
      const errorMessage =
        response?.message || 'Something went wrong. Please try again.';
      const detailedErrors = Array.isArray(response?.errors)
        ? response.errors.join(', ')
        : '';
      // const traceIdInfo = response?.traceId
      //   ? `<p><strong>Trace ID:</strong> ${response.traceId}</p>`
      //   : '';
      setApiResError({ response, errorMessage, detailedErrors });

      // await Swal.fire({
      //   icon: 'error',
      //   title: 'Booking Failed',
      //   html: `
      //     <p><strong>Message:</strong> ${errorMessage}</p>
      //     ${
      //       detailedErrors
      //         ? `<p><strong>Details:</strong> ${detailedErrors}</p>`
      //         : ''
      //     }
      //     ${traceIdInfo}
      //   `,
      //   confirmButtonColor: '#d33',
      //   allowOutsideClick: false,
      // }).then((res) => {
      //   if (res.isConfirmed) {
      //     response?.message === 'Validation Errors' ? null : navigate(-2); // Go back to previous page
      //   }
      // });
    } finally {
      setLoading(false);
      refetch();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateAllPassengers();
    const isContactValid = validateContact();

    if (!isValid || !isContactValid) {
      toast.error(
        <Box sx={{ fontSize: 13, color: 'var(--primary)' }}>
          Please fill in the required input fields.
        </Box>
      );
      return;
    }

    try {
      handleOpenModal();
    } catch (error) {
      toast.error(
        <Box sx={{ fontSize: 13, color: 'var(--primary)' }}>
          Something went wrong while submitting the form.
        </Box>
      );
    }
  };

  const totalRoomPrice = calculateTotalPrice(rooms || []);
  const numberOfRooms = rooms?.length;

  const result = calculateTotalGuests(rooms);
  const { totalAdult, totalChild } = result;
  const checkIn = moment(payloadstart, 'YYYY-MM-DD');
  const checkOut = moment(payloadend, 'YYYY-MM-DD');
  const nights = checkOut.diff(checkIn, 'days');
  const checkInData = {
    hotelId: hotelId || '',
    hotelName: rooms?.[0]?.hotelInfo?.hotelName || '',
    coverImage: rooms?.[0]?.hotelInfo?.heroImage || '',
    hotelRating: rooms?.[0]?.hotelInfo?.starRating || '',
    address: `${addresss?.address?.line1}, ${addresss?.address?.line2}`,
    phone: addresss.phones?.[0] || '',
    type: rooms?.[0]?.hotelInfo?.type || '',
    checkIn: payloadstart || '',
    checkOut: payloadend || '',
    nights: nights,
    totalAdult,
    totalChild,
    roomLength: numberOfRooms,
  };
  const handleDetails = () => {
    navigate(`/dashboard/hotel/confirm-hotel/${bookingId?.id}/${hotelId}`);
  };
  // console.log(rooms);
  const refundables = rooms?.[0]?.policy?.refundable || false;
  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        pb: { xs: 10, md: 1 },
      }}
    >
      <HeaderTitle headerTitle={'Review your Booking'} />
      {isLoaded && <LinearProgressDott />}
      <Container sx={{ px: { xs: 1, sm: 2, md: '' } }}>
        {isLoaded ? (
          <BookingSkeletonLoader />
        ) : (
          <Box mt={{ xs: 2, md: 4 }}>
            <Box>
              <form>
                <Grid container spacing={{ xs: 1, md: 2 }}>
                  <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
                    <Box sx={{ mb: 3 }}>
                      <CheckIn
                        checkInData={checkInData}
                        hotelId={hotelId}
                        apicheckIn={apicheckIn}
                        apicheckOut={apicheckOut}
                        refundable={rooms?.[0]?.policy?.refundable || false}
                      />
                      {/* 
                    <ImportantInfoHotel /> */}
                      {/* <CancellationPolicy /> */}
                      {/* <AddGuest /> */}
                      <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        sx={{
                          bgcolor: 'var(--white)',
                          p: { xs: 1, md: 1.5 },
                          borderRadius: 1,
                          mb: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: 16,
                            color: 'var(--primary)',
                            fontWeight: 500,
                          }}
                        >
                          Enter Guest Details
                        </Box>{' '}
                        <Box
                          sx={{
                            fontSize: 16,
                            color: 'var(--dark-green)',
                            fontWeight: 500,
                            px: 2,
                          }}
                        >
                          {refundables ? 'Refundable' : 'Non Refundable'}
                        </Box>
                      </Stack>
                      <Box>
                        <Box
                          sx={{
                            color: 'var(--secondary)',
                            fontSize: { xs: 10, md: 14 },
                            fontWeight: 400,
                            mb: 1,
                            border: '1px solid var(--stroke)',
                            borderRadius: '5px',
                            p: '2px 5px',
                            width: 'fit-content',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          <InfoOutlinedIcon
                            sx={{
                              fontSize: 18,
                            }}
                          />
                          Only lead guest details are needed to book others
                          guest details are optional.
                        </Box>

                        <Box>
                          {passengerData?.map((item, roomIndex) => {
                            return (
                              <Box
                                key={roomIndex}
                                mb={1.5}
                                sx={{
                                  bgcolor: 'var(--white)',
                                  p: { xs: 1, md: 2 },
                                  borderRadius: 1,
                                }}
                              >
                                <Grid container spacing={1} mb={1}>
                                  <Grid item>
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'var(--primary)',
                                        fontSize: { xs: 12, md: 14 },
                                        fontWeight: 400,
                                        bgcolor: 'var(--bgcolor)',
                                        width: 'fit-content',
                                        px: 1,
                                        borderRadius: 1,
                                        position: 'relative',
                                        py: 0.5,
                                        gap: 1,
                                        mb: 1,
                                      }}
                                    >
                                      <NightShelterIcon
                                        sx={{
                                          fontSize: 18,
                                        }}
                                      />
                                      {item?.roomName}
                                    </Box>
                                  </Grid>
                                  <Grid item>
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'var(--primary)',
                                        fontSize: { xs: 12, md: 14 },
                                        fontWeight: 400,
                                        bgcolor: 'var(--bgcolor)',
                                        width: 'fit-content',
                                        px: 1,
                                        borderRadius: 1,
                                        position: 'relative',
                                        py: 0.5,
                                        gap: 1,
                                      }}
                                    >
                                      Room - {roomIndex + 1}
                                    </Box>
                                  </Grid>
                                  <Grid item>
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'var(--primary)',
                                        fontSize: { xs: 12, md: 14 },
                                        bgcolor: 'var(--bgcolor)',
                                        width: 'fit-content',
                                        px: 1,
                                        py: 0.5,
                                        borderRadius: 1,
                                        gap: 0.5,
                                        fontWeight: 400,
                                      }}
                                    >
                                      <PersonIcon sx={{ fontSize: 18 }} />
                                      {item.passengers?.[0]?.type || 'Adult'}: (
                                      {item?.numberOfAdults})
                                      {item?.numberOfChilds > 0
                                        ? ` Child: (${item?.numberOfChilds})`
                                        : null}
                                    </Box>
                                  </Grid>
                                </Grid>

                                {item.passengers.map(
                                  (passenger, passengerIndex) => {
                                    const key = `${roomIndex}-${passengerIndex}`;
                                    return (
                                      <div
                                        key={key}
                                        ref={(el) =>
                                          (formRefs.current[key] = el)
                                        }
                                      >
                                        <HotelPassengerForm
                                          roomIndex={roomIndex}
                                          passengerIndex={passengerIndex}
                                          passenger={passenger}
                                          errors={errors[key] || {}}
                                          item={item}
                                          passengerData={passengerData}
                                          setErrors={setErrors}
                                        />
                                      </div>
                                    );
                                  }
                                )}
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>
                      <ContactInformation
                        contact={contact}
                        setContact={setContact}
                        contactErrors={contactErrors}
                        setContactErrors={setContactErrors}
                      />
                      {/* <SpecialRequest /> */}

                      <Box sx={{ px: 1 }}>
                        <Typography
                          variant="body2"
                          color="var(--green-light)"
                          sx={{
                            fontSize: { xs: 9, md: 11 },
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'end',
                          }}
                        >
                          By proceeding, I agree to Ticket {`Lagbe's`} User
                          Agreement, Terms, Supplier Policies, and Cancellation
                          & Booking Policies.
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            width: '100%',
                            mt: 2,
                            mb: 10,
                          }}
                        >
                          <Button
                            onClick={handleSubmit}
                            sx={{
                              backgroundColor: 'var(--primary)',
                              color: 'white',
                              fontSize: { xs: 12, md: 14 },
                              mt: 1,
                              textTransform: 'capitalize',
                              '&:hover': {
                                backgroundColor: 'var(--secondary)',
                              },
                              width: '100%',
                            }}
                            disabled={loading}
                          >
                            {loading ? 'Submitting...' : 'Confirm Booking'}
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
                    <PriceBreakup
                      numberOfRooms={numberOfRooms}
                      numberOfNight={nights}
                      totalRoomPrice={totalRoomPrice}
                    />
                    {/* <RoomDetails /> */}
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        )}
      </Container>

      {loading && (
        <Processoing
          content={'We are processing your request please wait...'}
          // content1={'Traveler details are being saved to your list...'}
          content1={'A request is being sent to the hotel...'}
          content2={'Verifying the fare with the hotel...'}
        />
      )}
      <Modal open={open}>
        <Box sx={{ ...style, width: { xs: '80%', sm: '50%', md: '40%' } }}>
          <CustomModal
            hotel={true}
            handleClick={() => {
              setOpen(false);
              {
                bookingId ? handleDetails(bookingId?.id) : navigate(-1);
              }
            }}
            image={
              bookingId
                ? responseimg?.bookingsuccess
                : responseimg?.bookingfailed
            }
            message={
              bookingId ? (
                <>
                  {companyInfo.companyName}
                  {`Your booking is confirmed. Thank you for choosing us — we look forward to making your stay memorable!`}
                  For any query. Please contact us at{' '}
                  <strong>{companyInfo.email}</strong> or Call{' '}
                  <strong>{companyInfo.phone}</strong>
                </>
              ) : (
                <>
                  For any query. Please contact us at{' '}
                  <strong>{companyInfo.email}</strong> or Call{' '}
                  <strong>{companyInfo.phone}</strong>
                </>
              )
            }
            status={
              bookingId ? 'Booking success' : `${apiResError?.errorMessage}`
            }
          />
        </Box>
      </Modal>

      {isModal && (
        <Box>
          <HotelConfirmationModal
            isModal={isModal}
            handleCloseModal={handleCloseModal}
            handleConfirm={handleConfirmed}
            passengerData={passengerData}
            totalRoomPrice={totalRoomPrice}
          />
        </Box>
      )}
    </Box>
  );
};

export default ReviewHotelBooking;
