/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Collapse,
  Grid,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import ValidIcon from '../../Common/validIcon';
import SearchableDropDown from '../SearchableDropDown/SearchableDropDown';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../Common/CustomModal';
import countrylist from '../../Utils/countrylists';
import CustomButton from '../../Common/CustomButton';
import CountdownFormatted from '../FlightResults/Fliter/CountdownFormatted ';
import FlightInfoDetails from '../FlightInformation/FlightInfoDetails';
// import PartialPaymentInfo from '../FlightInformation/PartialPaymentInfo';
import PriceSummary from '../FlightInformation/PriceSummary';
// import FileUpload from './FileUpload';
import AccordianHeader from './AccordianHeader';
import PassPortDate from './PassPortDate';
import NameInput from './NameInput';
import SelectInput from './SelectInput';
import { ToastContainer, toast } from 'react-toastify';
import CustomCircularProgress from '../../Common/CustomCircularProgress';
import Token from '../../Common/Token';
import axios from 'axios';
import Travelers from './Travelers';
import getAuthToken from '../../Common/getAuthToken';
import Processoing from '../../Common/Processoing';
import TokenToName from '../../Common/TokenToName';
import companyInfo from '../../../common/companyInfo';
import responseimg from '../../../assets/responseimg';
import Swal from 'sweetalert2';
import RedioButton from './RedioButton';
import { validationSchema } from '../../Utils/validationSchema';
import { addDays } from 'date-fns';
import Passengeraddnote from '../../Common/Passengeraddnote';
import ConfirmationModal from './ConfirmationModal';
import { baseUrl } from '../../../../baseurl';
import FileUpload from './FileUpload';
import { useGetItemsQuery } from '../../../redux/slices/apiSlice';
// import AddBaggageMeal from './AddBaggageMeal';
const genderList = [
  { name: 'MALE', value: 'M' },
  { name: 'FEMALE', value: 'F' },
];
const genderListInfant = [
  { name: 'MALE', value: 'MI' },
  { name: 'FEMALE', value: 'FI' },
];

const vipList = [
  { label: 'Regular', value: '' },
  { label: 'CIP', value: 'CIP' },
  { label: 'VIP', value: 'VIP' },
  { label: 'VVIP', value: 'VVIP' },
];
const wheelChearList = [
  { label: 'No', value: '' },
  { label: 'Yes', value: 'WCHR' },
];

function generateRandomNumber() {
  const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
  return randomNumber.toString();
}
const passExAutoGenerate = moment().add(5, 'years').format('YYYY-MM-DD');

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

const PassengerInformation = ({
  gds,
  data, //locationData
  airPriceData, //airPriceData
  segmetsData,
  priceAndBaggages,
  adultCount,
  childCount,
  infantCount,
  flightType,
  tripType,
  childAge,
  ndcPricing,
}) => {
  const agentId = Token();
  const url = `/agent/findAgentById/${agentId}`;
  const { refetch } = useGetItemsQuery({ url });

  const vipCheck =
    data?.system === 'Sabre' ||
    data?.system === 'Galileo' ||
    airPriceData?.response?.availableSSR?.includes('CIP,VIP,VVIP')
      ? true
      : false;
  const wheelChairCheck =
    data?.system === 'Sabre' ||
    data?.system === 'Galileo' ||
    airPriceData?.response?.availableSSR?.includes('WCHR')
      ? true
      : false;
  const baggage = airPriceData?.responseData?.Response?.Baggage || [];
  const meals = airPriceData?.responseData?.Response?.MealDynamic || [];

  const token = getAuthToken();
  const tokenise = TokenToName();
  const locationType = tripType || 'OUTBOUND'; //inbound or outbound
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [errorRes, setErrorRes] = useState();

  const fetchTravelers = Travelers();
  useEffect(() => {
    if (fetchTravelers) {
      fetchTravelers?.refetch();
    }
  }, []);
  const travelersData = fetchTravelers?.isLoading
    ? fetchTravelers?.data ?? []
    : fetchTravelers?.data ?? [];
  const adultTravelers = travelersData?.filter(
    (item) => item.passengerType === 'ADT'
  );
  const childTravelers = travelersData?.filter(
    (item) => item.passengerType === 'CNN'
  );
  const infantTravelers = travelersData?.filter(
    (item) => item.passengerType === 'INF'
  );

  const [error, setError] = useState({
    errorModal: false,
    errorMessage: '',
  });
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);

  const optionAdults = adultTravelers?.map((x) => {
    if (x.passengerType === 'ADT') {
      return {
        value: x,
        label: `Name: ${x.firstName?.toUpperCase()} ${x.lastName?.toUpperCase()}  / Date of Birth: ${
          x.dateOfBirth
        }`,
      };
    }
  });
  const optionChild = childTravelers?.map((x) => {
    if (x.passengerType === 'CNN') {
      return {
        value: x,
        label: `Name:${x.firstName?.toUpperCase()} ${x.lastName?.toUpperCase()}  Date of Birth:${
          x.dateOfBirth
        } `,
      };
    }
  });
  const optionInfant = infantTravelers?.map((x) => {
    if (x.passengerType === 'INF') {
      return {
        value: x,
        label: `Name:${x.firstName?.toUpperCase()} ${x.lastName.toUpperCase()}  Date of Birth:${
          x.dateOfBirth
        } `,
      };
    }
  });

  // todo: date validation
  const departureDate = new Date(data?.segments?.[0]?.[0]?.departureDateTime);
  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }
  const currentDate = new Date();
  const minDate = new Date(
    currentDate.getFullYear() - 130,
    currentDate.getMonth(),
    currentDate.getDate()
  ); //130 years
  let dateAfterSixMonths =
    locationType === 'INBOUND'
      ? addDays(new Date(departureDate), 10)
      : addMonths(new Date(departureDate), 1);
  let dateBeforeTwelveYears = addMonths(new Date(departureDate), -144);
  let dateBeforeSixYears = addMonths(new Date(departureDate), -72);
  let dateBeforeTwoYears = addMonths(new Date(departureDate), -24);

  // let dateBeforeTwoYears = addMonths(new Date(departureDate), -24);
  // todo:end
  // const random10DigitNumber = generateRandomNumber();
  const initialValues = useMemo(
    () => ({
      adult: [...new Array(adultCount)].map((item, index) => {
        return {
          agentId: agentId,
          passengerType: 'ADT',
          firstName: '',
          middleName: '',
          lastName: '',
          gender: '',
          dateOfBirth: '',
          nationalityCountry: 'BD',
          passportNo:
            locationType === 'INSIDE' ? generateRandomNumber().toString() : '',
          passportEx: locationType === 'INSIDE' ? passExAutoGenerate : '',
          frequentFlyer: '',
          frequentFlyerNumber: '',
          passport: null,
          visa: null,
          visaError: '',
          passportError: '',
          openDate: false,
          openpassportExDate: false,
          ticketNo: '',
          seatPreference: '',
          vip: '',
          wheelChair: '',
          baggage: [],
          meal: [],
          //only adult add phon and email addresses
        };
      }),
      child: [...new Array(childCount)].map((item, index) => {
        return {
          agentId: agentId,
          passengerType: 'CNN',
          firstName: '',
          middleName: '',
          lastName: '',
          gender: '',
          dateOfBirth: '',
          nationalityCountry: 'BD',
          passportNo:
            locationType === 'INSIDE' ? generateRandomNumber().toString() : '',
          passportEx: locationType === 'INSIDE' ? passExAutoGenerate : '',
          frequentFlyer: '',
          frequentFlyerNumber: '',
          passport: null,
          visa: null,
          visaError: '',
          passportError: '',
          openDate: false,
          openpassportExDate: false,
          ticketNo: '',
          seatPreference: '',
          phone: companyInfo.phone,
          email: companyInfo.email,
          vip: '',
          wheelChair: '',
          baggage: [],
          meal: [],
        };
      }),
      infant: [...new Array(infantCount)].map((item, index) => {
        return {
          agentId: agentId,
          passengerType: 'INF',
          firstName: '',
          middleName: '',
          lastName: '',
          gender: '',
          dateOfBirth: '',
          nationalityCountry: 'BD',
          passportNo:
            locationType === 'INSIDE' ? generateRandomNumber().toString() : '',
          passportEx: locationType === 'INSIDE' ? passExAutoGenerate : '',
          frequentFlyer: '',
          frequentFlyerNumber: '',
          passport: null,
          visa: null,
          visaError: '',
          passportError: '',
          openDate: false,
          openpassportExDate: false,
          ticketNo: '',
          seatPreference: '',
          phone: companyInfo.phone,
          email: companyInfo.email,
          vip: '',
          wheelChair: '',
        };
      }),
      email: '',
      phone: '',
      phoneCountryCode: '',
      termandcondition: true,
    }),
    [adultCount, childCount, infantCount, agentId, companyInfo, locationType]
  );
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {},
    validationSchema: validationSchema,
  });

  const [expandedState, setExpandedState] = useState({
    adult: [true, ...new Array(adultCount - 1).fill(false)],
    child: new Array(childCount).fill(false),
    infant: new Array(infantCount).fill(false),
  });

  const handleExpand = (type, index) => {
    setExpandedState((prevExpandedState) => {
      const newExpandedState = { ...prevExpandedState };
      newExpandedState[type][index] = !newExpandedState[type][index];
      return newExpandedState;
    });
  };

  // type, index, field, event
  const handleOnChange = useCallback(
    (e, type, index, date) => {
      let value = e.target.value;

      if (date) {
        value = moment(new Date(value)).format('YYYY-MM-DD');
      } else {
        // Allow backspace and validate other input
        value = value.replace(/[^A-Za-z0-9\s]/gi, '');
      }

      const field = e.target.name;

      let dataKey =
        type === 'ADT'
          ? 'adult'
          : type === 'CNN'
          ? 'child'
          : type === 'INF'
          ? 'infant'
          : 'contact';

      // Use setFieldValue to update the specific field
      formik.setFieldValue(`${dataKey}[${index}].${field}`, value);

      // Reset openDate and openpassportExDate if necessary
      formik.setFieldValue(`${dataKey}[${index}].openDate`, false);
      formik.setFieldValue(`${dataKey}[${index}].openpassportExDate`, false);
    },
    [formik.setFieldValue]
  );

  const handleEmailNumber = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    formik.setValues({
      ...formik.values,
      [field]: value,
    });
  };

  const handleToggleDate = (type, index, item, propertyName) => {
    const flightDataKey = type.toLowerCase(); // Convert type to lowercase

    if (formik.values[flightDataKey]) {
      const tempFlightData = [...formik.values[flightDataKey]];

      tempFlightData[index] = {
        ...tempFlightData[index],
        [propertyName]: propertyName === 'openDate' ? !item.openDate : false,
        openpassportExDate:
          propertyName === 'openpassportExDate'
            ? !item.openpassportExDate
            : false,
      };

      formik.setValues({
        ...formik.values,
        [flightDataKey]: tempFlightData,
      });
    }
  };

  const handleDateClose = () => {
    const { values, setValues } = formik;
    // Create a mapping for all passenger types
    const passengerTypes = ['adult', 'child', 'infant'];
    // Iterate through all passenger types
    const updatedValues = passengerTypes.reduce((acc, passengerType) => {
      if (values[passengerType]) {
        const tempPassengerData = values[passengerType].map((item) => ({
          ...item,
          ['openDate']: false,
          ['openpassportExDate']: false,
        }));

        acc[passengerType] = tempPassengerData;
      }

      return acc;
    }, {});
    // Update the form values for all passenger types
    setValues({
      ...values,
      ...updatedValues,
    });
  };

  const handleAutoFill = (obj, index) => {
    const {
      dateOfBirth,
      firstName,
      gender,
      lastName,
      passportEx,
      nationalityCountry,
      passportNo,
      passengerType,
      visa,
      passport,
      email,
      phone,
      phoneCountryCode,
    } = obj;
    const updateFormData = (dataKey) => {
      const tempFlightData = [...formik.values[dataKey]];

      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index],
          passengerType,
          [`firstName`]: firstName,
          [`lastName`]: lastName,
          [`gender`]: gender,
          [`dateOfBirth`]: new Date(dateOfBirth).toLocaleDateString('sv'),
          [`nationalityCountry`]: nationalityCountry,
          [`passportNo`]: passportNo,
          [`passportEx`]: new Date(passportEx).toLocaleDateString('sv'),
          [`visa`]: visa,
          [`passport`]: passport,
          // [`passportEx`]: new Date(passportEx).toLocaleDateString('sv'),
        };
      }

      formik.setValues({
        ...formik.values,
        [dataKey]: tempFlightData,
        email: email || tokenise?.email,
        phone: phone || tokenise?.phone,
        phoneCountryCode: phoneCountryCode || '+880',
      });
    };

    if (passengerType === 'ADT') {
      updateFormData('adult');
    } else if (passengerType === 'CNN') {
      updateFormData('child');
    } else {
      updateFormData('infant');
    }
  };
  const handleFillupRemove = (type, index) => {
    const updateFormData = (dataKey) => {
      const tempFlightData = [...formik.values[dataKey]];

      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index],
          type,
          [`firstName`]: '',
          [`lastName`]: '',
          [`gender`]: '',
          [`dateOfBirth`]: '',
          [`nationalityCountry`]: '',
          [`passportNo`]: '',
          [`passportEx`]: '',
        };
      }

      formik.setValues({
        ...formik.values,
        [dataKey]: tempFlightData,
      });
    };

    if (type === 'ADT') {
      updateFormData('adult');
    } else if (type === 'INF') {
      updateFormData('infant');
    } else {
      updateFormData('child');
    }
  };

  useEffect(() => {
    const updatePassengerInfo = (field) => {
      formik.setFieldValue(
        field,
        formik.values[field].map((passenger) => ({
          ...passenger,
          email: formik.values.email,
          phone: formik.values.phone,
          phoneCountryCode: formik.values.phoneCountryCode,
        }))
      );
    };

    ['adult', 'child', 'infant'].forEach(updatePassengerInfo);
  }, [
    formik.values.email,
    formik.values.phone,
    formik.values.phoneCountryCode,
  ]);
  const urlEndPoint = '/core/flight/combined-air-booking';
  const urlEndPointAdivaha = '/core/flight/soto-a-air-booking';
  const urlEndPointDirectTicket = '/core/flight/soto-a-air-direct-ticket';
  const urlEndTbo = '/core/flight/combined-air-booking';
  const [isModal, setIsModal] = useState(false);

  const handleOpenModal = () => setIsModal(true);
  const handleCloseModal = () => setIsModal(false);

  const handleConfirm = async () => {
    handleCloseModal();
    await handleFileUpload();
  };

  const handleFileUpload = async () => {
    try {
      const fileUploadResponse = await fileUpload();
    } catch (uploadError) {
      toast.error(
        <Box sx={{ fontSize: 13, color: 'var(--primary)' }}>
          Please fill in the required input fields.
        </Box>
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      formik.handleSubmit(event);
      await validationSchema.validate(formik.values, { abortEarly: false });
      handleOpenModal();
    } catch (errors) {
      toast.error(
        <Box sx={{ fontSize: 13, color: 'var(--primary)' }}>
          Please fill in the required input fields.
        </Box>
      );
    }
  };

  const fileUpload = async () => {
    try {
      const adultValue = formik.values.adult;
      const childValue = formik.values.child;
      const infantValue = formik.values.infant;
      const personArray = [adultValue, childValue, infantValue];
      const personDetails = personArray.flat(1);
      setIsDone(true);
      const formData = new FormData();
      const traveller = JSON.stringify(personDetails);
      formData.append('traveller[]', traveller);
      for (let i = 0; i < personDetails.length; i++) {
        formData.append(`passport${i}`, personDetails[i].passport);
        formData.append(`visa${i}`, personDetails[i].visa);
      }

      const commonHeaders = {
        accept: '*/*',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      };

      const endpoint = `${baseUrl}/core/traveller/createBulkTravellers`;

      const response = await axios.post(endpoint, formData, {
        headers: commonHeaders,
      });

      if (response.data) {
        postBooking(response.data, personDetails);
      }
    } catch (error) {
      toast.error(
        <Box sx={{ fontSize: 13, color: 'var(--primary)' }}>
          Traveller Failed{' '}
        </Box>
      );
      setIsDone(false);
    }
  };

  // const totalSumofAdult = formik.values.adult.reduce((sum, person) => {
  //   const baggageSum = person.baggage.reduce(
  //     (bSum, item) => bSum + item.Price,
  //     0
  //   );
  //   const mealSum = person?.meal
  //     ? person?.meal?.reduce((mSum, item) => mSum + item?.Price, 0)
  //     : 0;
  //   return sum + baggageSum + mealSum;
  // }, 0);
  // const totalSumOfChild = formik.values?.child.reduce((sum, person) => {
  //   const baggageSum = person.baggage.reduce(
  //     (bSum, item) => bSum + item?.Price,
  //     0
  //   );
  //   const mealSum = person.meal
  //     ? person?.meal?.reduce((mSum, item) => mSum + item?.Price, 0)
  //     : 0;
  //   return sum + baggageSum + mealSum;
  // }, 0);
  // const totalSumOfBaggage = totalSumofAdult + totalSumOfChild;

  const postBooking = async (fileUploadResponse, personDetails) => {
    try {
      setIsDone(true);
      const booking = {
        agentId: agentId,
        vendor: '',
        route: data?.segments
          .map((segment, index) => {
            const departureAirportCode = segment[0]?.departureAirportCode || '';
            const arrivalAirportCode =
              segment[segment.length - 1]?.arrivalAirportCode || '';
            const nextDepartureAirportCode =
              data?.segments[index + 1]?.[0]?.departureAirportCode || '';

            // Check if the arrival airport code of the current segment is different from the departure airport code of the next segment
            if (arrivalAirportCode !== nextDepartureAirportCode) {
              return `${departureAirportCode}-${arrivalAirportCode}`;
            } else {
              return departureAirportCode;
            }
          })
          .join('-'),
        fareBasisCode: data?.fareBasisCode || '',
        traceId: data?.traceId || '',
        offerId: data?.offerId || '',
        contactEmail: tokenise?.email || '', //from agent email
        contactName:
          `${fileUploadResponse?.[0]?.firstName} ${fileUploadResponse?.[0]?.lastName}` ||
          '', //from agent name
        contactPhone: tokenise?.phone || '', //from agent phone
        autoIssue: data?.autoIssue || 'false',
        refundable: data?.refundable === 'true' ? true : false,
        platingCareer: data?.marketingCarrier || '',
        adultCount: adultCount || 1,
        childCount: childCount || 0,
        infantCount: infantCount || 0,
        childAge: childAge || [],
        tripType: flightType || 'ONE_WAY',
        baseFare: data?.totalBasePrice || '0',
        tax: data?.totalTax || '0',
        totalBasePrice: data?.totalBasePrice || '0',
        grossTotalPrice: data?.grossTotalPrice || '0',
        clientBasePrice: data?.clientBasePrice || '0',
        // totalBaggagePrice: totalSumOfBaggage || '0',
        totalClientPrice: data?.totalClientPrice || '0',
        markUp: data?.markup || data?.markUp || '',
        commission: data?.commission || '',
        ait: data?.ait || '',
        instantPay: data?.instantPay || 'false',
        isLcc: data?.isLcc || false,
        marketingAirline: data?.marketingCarrierName || '',
        gds: data?.system || 'Sabre',
        travelDate: data?.segments[0][0]?.departureDateTime || '',
        couponCode: '',
        bookedAt: '',
        searchId: '',
        resultId: '',
        mealCode: '',
        ticketingTimeLimit: data?.lastTicketTime || '',
        agentTicketingTimeLimit: data?.lastTicketTime || '',
        airlinesPNR: '',
        sysCharge: data?.sysCharge || '0',
        resultIndex: data?.resultIndex || '',
        platform: companyInfo.platform,
      };

      const mergedData = personDetails?.map((pax) => {
        const price = data?.priceBreakdown?.find(
          (price) => price?.passengerType === pax?.passengerType
        );
        return {
          ...pax,
          Currency: 'INR',
          BaseFare: price?.BaseFare || 0,
          Tax: price?.Tax || 0,
          YQTax: price?.YQTax || 0,
          AdditionalTxnFeePub: price?.AdditionalTxnFeePub || 0,
          AdditionalTxnFeeOfrd: price?.AdditionalTxnFeeOfrd || 0,
          OtherCharges: price?.OtherCharges || 0,
          Discount: price?.Discount || 0,
          PublishedFare: price?.PublishedFare || 0,
          OfferedFare: price?.OfferedFare || 0,
          TdsOnCommission: price?.TdsOnCommission || 0,
          TdsOnPLB: price?.TdsOnPLB || 0,
          TdsOnIncentive: price?.TdsOnIncentive || 0,
        };
      });

      const bookingData = {
        booking: booking,
        passengers: gds === 'SOTO_A' ? mergedData : fileUploadResponse,
        // passengers: fileUploadResponse,
        priceAndBaggages: priceAndBaggages,
        segments: segmetsData,
        ...(gds === 'Galileo' || gds === 'INDIGO'
          ? { pricing: airPriceData }
          : gds === 'NDC_V' || gds === 'NDC_TF'
          ? { pricing: ndcPricing }
          : { pricing: [] }),
      };
      const body = JSON.stringify(bookingData);

      const url = `${baseUrl}${urlEndPoint}`;
      const urlAdivaha = `${baseUrl}${urlEndPointAdivaha}`;
      const urlAdivahaDirectTicket = `${baseUrl}${urlEndPointDirectTicket}`;
      const urlTbo = `${baseUrl}${urlEndTbo}`;
      const response = await fetch(
        gds === 'SOTO_A' && data?.isLcc === false
          ? urlAdivahaDirectTicket
          : gds === 'SOTO_A' && data?.isLcc === true
          ? urlAdivaha
          : gds === 'TRIPFINDY'
          ? urlTbo
          : url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: body,
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if (
        responseData?.status === 'issue_request_sent' ||
        responseData?.status === 'success' ||
        responseData?.success === true
      ) {
        setOpen(true);
        // setBookingId(responseData?.data?.newBooking?.id);
        setBookingId(responseData?.data?.newBooking);
      } else {
        setOpen(true);
        setErrorRes(responseData);
      }
      setIsDone(false);
    } catch (error) {
      toast.error(
        <Box sx={{ fontSize: 13, color: 'var(--primary)' }}>Booking Failed</Box>
      );
      setIsDone(false);
    } finally {
      setIsDone(false);
      refetch();
    }
  };

  const handleDetails = (id) => {
    navigate(`/dashboard/bookingdetails/${id}`, {
      state: {
        id: id,
      },
    });
  };
  const isTravelerRequired = (item) => {
    return (
      item.lastName &&
      item.firstName &&
      item.gender &&
      item.dateOfBirth &&
      item.nationalityCountry &&
      item.passportNo &&
      item.passportEx
    );
  };

  const isLccPresent = data?.isLcc === true || data?.isLcc === false;
  const checkButton =
    (data?.instantPay === 'true' || isLccPresent) &&
    data?.system !== 'NDC_V' &&
    data?.system !== 'NDC_TF';

  return (
    <Box mt={1.5}>
      <Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={{ xs: 1, md: 2 }}>
            <Grid item xs={12} md={8}>
              <Box
                className="custom-input"
                sx={{
                  input: {
                    textTransform: 'uppercase',
                  },
                }}
              >
                <Box>
                  {formik.values.adult.map((item, index) => {
                    const required = isTravelerRequired(item);

                    return (
                      <Box
                        key={index}
                        sx={{
                          bgcolor: 'var(--white)',
                          px: { xs: 2, md: 3 },
                          py: { xs: 0.5, md: 1 },
                          mb: { xs: 1.5, md: 2 },
                          borderRadius: '5px',
                        }}
                      >
                        <AccordianHeader
                          handleExpand={handleExpand}
                          type="adult"
                          index={index}
                          required={required}
                          expandedState={expandedState.adult[index]}
                          traveler={index + 1}
                        />

                        <Collapse in={expandedState.adult[index]}>
                          <Box
                            key={index}
                            sx={{
                              bgcolor: 'var(--white)',
                              py: 2,
                              borderRadius: '16px',
                            }}
                          >
                            <Grid container spacing={2} mb={2}>
                              <Grid item xs={12} md={6}>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                >
                                  <Box sx={{ width: '100%' }}>
                                    <label>
                                      Select Traveller From Your List
                                    </label>
                                    <SearchableDropDown
                                      index={index}
                                      loading={fetchTravelers?.isLoading}
                                      handler={handleAutoFill}
                                      options={optionAdults}
                                    />
                                  </Box>
                                  {required && (
                                    <Box
                                      onClick={() =>
                                        handleFillupRemove(
                                          item.passengerType,
                                          index
                                        )
                                      }
                                      sx={{
                                        fontSize: 12,
                                        color: 'var(--crimson)',
                                        textTransform: 'capitalize',
                                        cursor: 'pointer',
                                        width: '10%',
                                        pt: 3,
                                      }}
                                    >
                                      Clear
                                    </Box>
                                  )}
                                </Stack>
                              </Grid>
                              <Grid item xs={12}>
                                <Box className="dashed-top-line" mt={2}></Box>
                                <Typography
                                  sx={{
                                    color: 'var(--secondary)',
                                    fontSize: { xs: 10, md: 12 },
                                    textAlign: 'center',
                                    mt: '-10px',
                                    bgcolor: 'var(--white)',
                                    width: 'fit-content',
                                    marginX: 'auto',
                                    px: 1,
                                  }}
                                >
                                  or, Enter Traveller Details
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <NameInput
                                  name="firstName"
                                  item={item}
                                  index={index}
                                  value={item.firstName}
                                  label="Given Name / First name"
                                  handleOnChange={handleOnChange}
                                  handleDateClose={handleDateClose}
                                  formik={formik}
                                  error={
                                    formik?.errors?.adult?.[index]?.firstName ||
                                    ''
                                  }
                                  touched={
                                    formik.touched.adult?.[index]?.firstName ||
                                    ''
                                  }
                                  tooltip
                                  required
                                  className={error ? 'error-input' : ''}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <NameInput
                                  name="lastName"
                                  item={item}
                                  index={index}
                                  value={item.lastName}
                                  label="Surname / Last name"
                                  handleOnChange={handleOnChange}
                                  handleDateClose={handleDateClose}
                                  formik={formik}
                                  error={
                                    formik?.errors?.adult?.[index]?.lastName ||
                                    ''
                                  }
                                  touched={
                                    formik.touched.adult?.[index]?.lastName ||
                                    ''
                                  }
                                  tooltip
                                  required
                                  className={error ? 'error-input' : ''}
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <SelectInput
                                  name="gender"
                                  item={item}
                                  index={index}
                                  value={item.gender}
                                  list={genderList}
                                  label="Select Gender"
                                  placeholder="Select Gender"
                                  handleOnChange={handleOnChange}
                                  handleDateClose={handleDateClose}
                                  formik={formik}
                                  error={
                                    formik?.errors?.adult?.[index]?.gender || ''
                                  }
                                  touched={
                                    formik.touched.adult?.[index]?.gender || ''
                                  }
                                />
                              </Grid>

                              {/* Date of Birth */}
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                sx={{
                                  label: {
                                    fontSize: { xs: 12 },
                                  },
                                }}
                              >
                                <PassPortDate
                                  label="Date of Birth ( Minimum allowed age is 12
                                      years )"
                                  name="dateOfBirth"
                                  type="adult"
                                  open="openDate"
                                  placeholder="Date of Birth"
                                  index={index}
                                  item={item}
                                  handleToggleDate={handleToggleDate}
                                  handleOnChange={handleOnChange}
                                  formik={formik}
                                  date={item.dateOfBirth}
                                  selectDate={dateBeforeTwelveYears}
                                  maxDate={new Date(dateBeforeTwelveYears)}
                                  minDate={new Date(minDate)}
                                  collapse={item.openDate}
                                  error={
                                    formik?.errors?.adult?.[index]
                                      ?.dateOfBirth || ''
                                  }
                                  touched={
                                    formik.touched.adult?.[index]
                                      ?.dateOfBirth || ''
                                  }
                                />
                              </Grid>

                              {/* Select nationalityCountry */}
                              <Grid item xs={12} sm={6}>
                                <SelectInput
                                  name="nationalityCountry"
                                  item={item}
                                  index={index}
                                  value={item.nationalityCountry}
                                  list={countrylist}
                                  label="Select nationalityCountry"
                                  placeholder="Select nationalityCountry"
                                  handleOnChange={handleOnChange}
                                  handleDateClose={handleDateClose}
                                  formik={formik}
                                  error={
                                    formik?.errors?.adult?.[index]
                                      ?.nationalityCountry || ''
                                  }
                                  touched={
                                    formik.touched.adult?.[index]
                                      ?.nationalityCountry || ''
                                  }
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <label>
                                  Frequent flyer airline code with number (
                                  Optional )
                                </label>
                                <Grid container columnSpacing={0.5}>
                                  <Grid item xs={2.5}>
                                    <NameInput
                                      name="frequentFlyer"
                                      item={item}
                                      index={index}
                                      maxlength={2}
                                      value={item.frequentFlyer}
                                      placeholder="Ex: BG"
                                      handleOnChange={handleOnChange}
                                      handleDateClose={handleDateClose}
                                      formik={formik}
                                    />
                                  </Grid>
                                  <Grid item xs={9.5}>
                                    <NameInput
                                      name="frequentFlyerNumber"
                                      item={item}
                                      index={index}
                                      value={item.frequentFlyerNumber}
                                      placeholder="Ex: 345"
                                      handleOnChange={handleOnChange}
                                      handleDateClose={handleDateClose}
                                      formik={formik}
                                      maxlength={20}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              {locationType === 'INSIDE' ? null : (
                                <>
                                  <Grid item xs={12} sm={6}>
                                    <NameInput
                                      name="passportNo"
                                      item={item}
                                      index={index}
                                      value={item.passportNo}
                                      label="Passport Number"
                                      handleOnChange={handleOnChange}
                                      handleDateClose={handleDateClose}
                                      formik={formik}
                                      required
                                      error={
                                        formik?.errors?.adult?.[index]
                                          ?.passportNo || ''
                                      }
                                      maxlength={9}
                                      touched={
                                        formik.touched.adult?.[index]
                                          ?.passportNo || ''
                                      }
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <PassPortDate
                                      label="Passport Expiry Date"
                                      name="passportEx"
                                      type="adult"
                                      index={index}
                                      item={item}
                                      open="openpassportExDate"
                                      placeholder="Passport Expiry Date"
                                      handleToggleDate={handleToggleDate}
                                      handleOnChange={handleOnChange}
                                      formik={formik}
                                      date={item.passportEx}
                                      selectDate={dateAfterSixMonths}
                                      minDate={new Date(dateAfterSixMonths)}
                                      collapse={item.openpassportExDate}
                                      error={
                                        formik?.errors?.adult?.[index]
                                          ?.passportEx || ''
                                      }
                                      touched={
                                        formik.touched.adult?.[index]
                                          ?.passportEx || ''
                                      }
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <FileUpload
                                      field="passport"
                                      formik={formik}
                                      type={'adult'}
                                      pRef={`passportAdult${index}`}
                                      index={index}
                                      values={item.passport}
                                      sizeError={item.passportError}
                                      error={formik.errors.passport}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <FileUpload
                                      field="visa"
                                      formik={formik}
                                      type={'adult'}
                                      pRef={`visaAdult${index}`}
                                      index={index}
                                      values={item.visa}
                                      sizeError={item.visaError}
                                      error={formik.errors.visa}
                                    />
                                  </Grid>
                                </>
                              )}
                              {/* working vip  */}
                              {wheelChairCheck && (
                                <>
                                  <Grid item xs={12}>
                                    <Box
                                      className="dashed-top-line"
                                      mt={2}
                                    ></Box>
                                    <Typography
                                      sx={{
                                        color: 'var(--secondary)',
                                        fontSize: { xs: 10, md: 12 },
                                        textAlign: 'center',
                                        mt: '-10px',
                                        bgcolor: 'var(--white)',
                                        width: 'fit-content',
                                        marginX: 'auto',
                                        px: 1,
                                      }}
                                    >
                                      SSR (optional)
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <label>Need a wheelchair ?</label>
                                    <RedioButton
                                      name="wheelChair"
                                      item={item}
                                      index={index}
                                      list={wheelChearList}
                                      value={item.wheelChair}
                                      handleOnChange={handleOnChange}
                                      handleDateClose={handleDateClose}
                                    />
                                  </Grid>
                                </>
                              )}
                              {vipCheck && (
                                <Grid item xs={12} sm={6} container>
                                  <Grid item xs={12} sm={12}>
                                    <label>Special Service Request </label>
                                    <RedioButton
                                      name="vip"
                                      item={item}
                                      index={index}
                                      list={vipList}
                                      value={item.vip}
                                      handleOnChange={handleOnChange}
                                      handleDateClose={handleDateClose}
                                    />
                                    {item.vip && (
                                      <label>
                                        If selected, {item.vip || ''} ID
                                        required for boarding pass.
                                      </label>
                                    )}
                                  </Grid>
                                </Grid>
                              )}
                            </Grid>
                            <Grid container justifyContent={'space-between'}>
                              <Grid item>
                                <Passengeraddnote />
                              </Grid>
                              {/* {baggage?.length > 0 && (
                                <Grid item>
                                  <AddBaggageMeal
                                    formik={formik}
                                    bagData={baggage}
                                    mealData={meals}
                                    baggageValue={item?.baggage}
                                    passengerIndex={index}
                                    passengerType="adult"
                                    firstName={item?.firstName}
                                    lastName={item?.lastName}
                                  />
                                </Grid>
                              )} */}
                            </Grid>
                          </Box>
                        </Collapse>
                      </Box>
                    );
                  })}
                </Box>
                {/* Child  */}
                <Box>
                  {formik.values.child.map((item, index) => {
                    const required = isTravelerRequired(item);

                    return (
                      <Box
                        key={index}
                        sx={{
                          bgcolor: 'var(--white)',
                          px: { xs: 2, md: 3 },
                          py: { xs: 0.5, md: 1 },
                          mb: { xs: 1.5, md: 2 },
                          borderRadius: '5px',
                        }}
                      >
                        <AccordianHeader
                          handleExpand={handleExpand}
                          type="child"
                          index={index}
                          required={required}
                          expandedState={expandedState.child[index]}
                          traveler={adultCount + index + 1}
                        />

                        <Collapse in={expandedState.child[index]}>
                          <Box
                            key={index}
                            sx={{
                              bgcolor: 'var(--white)',
                              py: 2,
                              borderRadius: '16px',
                            }}
                          >
                            <Grid container spacing={2} mb={2}>
                              <Grid item xs={12} md={6}>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                >
                                  <Box sx={{ width: '100%' }}>
                                    <label>
                                      Select Traveller From Your List
                                    </label>
                                    <SearchableDropDown
                                      index={index}
                                      loading={fetchTravelers?.isLoading}
                                      handler={handleAutoFill}
                                      options={optionChild}
                                    />
                                  </Box>

                                  {required && (
                                    <Box
                                      onClick={() =>
                                        handleFillupRemove(
                                          item.passengerType,
                                          index
                                        )
                                      }
                                      sx={{
                                        fontSize: 12,
                                        color: 'var(--crimson)',
                                        textTransform: 'capitalize',
                                        cursor: 'pointer',
                                        width: '10%',
                                        pt: 3,
                                      }}
                                    >
                                      Clear
                                    </Box>
                                  )}
                                </Stack>
                              </Grid>
                              <Grid item xs={12}>
                                <Box className="dashed-top-line" mt={2}></Box>
                                <Typography
                                  sx={{
                                    color: 'var(--secondary)',
                                    fontSize: { xs: 10, md: 12 },
                                    textAlign: 'center',
                                    mt: '-10px',
                                    bgcolor: 'var(--white)',
                                    width: 'fit-content',
                                    marginX: 'auto',
                                    px: 1,
                                  }}
                                >
                                  or, Enter Traveller Details
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <NameInput
                                  name="firstName"
                                  item={item}
                                  index={index}
                                  value={item.firstName}
                                  label="Given Name / First name"
                                  handleOnChange={handleOnChange}
                                  handleDateClose={handleDateClose}
                                  formik={formik}
                                  tooltip
                                  required
                                  error={
                                    formik?.errors?.child?.[index]?.firstName ||
                                    ''
                                  }
                                  touched={
                                    formik.touched.child?.[index]?.firstName ||
                                    ''
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <NameInput
                                  name="lastName"
                                  item={item}
                                  index={index}
                                  value={item.lastName}
                                  label="Surname / Last name"
                                  handleOnChange={handleOnChange}
                                  handleDateClose={handleDateClose}
                                  formik={formik}
                                  tooltip
                                  required
                                  error={
                                    formik?.errors?.child?.[index]?.lastName ||
                                    ''
                                  }
                                  touched={
                                    formik.touched.child?.[index]?.lastName ||
                                    ''
                                  }
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <SelectInput
                                  name="gender"
                                  item={item}
                                  index={index}
                                  value={item.gender}
                                  list={genderList}
                                  label="Select Gender"
                                  placeholder="Select Gender"
                                  handleOnChange={handleOnChange}
                                  handleDateClose={handleDateClose}
                                  formik={formik}
                                  error={
                                    formik?.errors?.child?.[index]?.gender || ''
                                  }
                                  touched={
                                    formik.touched.child?.[index]?.gender || ''
                                  }
                                />
                              </Grid>

                              {/* Date of Birth */}
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                sx={{
                                  label: {
                                    fontSize: { xs: 12 },
                                  },
                                }}
                              >
                                <PassPortDate
                                  label=" Date of Birth ( Must be accurate when searching )"
                                  name="dateOfBirth"
                                  type="child"
                                  open="openDate"
                                  placeholder="Date of Birth"
                                  index={index}
                                  item={item}
                                  handleToggleDate={handleToggleDate}
                                  handleOnChange={handleOnChange}
                                  formik={formik}
                                  date={item.dateOfBirth}
                                  selectDate={dateBeforeSixYears}
                                  minDate={new Date(dateBeforeTwelveYears)}
                                  maxDate={new Date(dateBeforeTwoYears)}
                                  collapse={item.openDate}
                                  error={
                                    formik?.errors?.child?.[index]
                                      ?.dateOfBirth || ''
                                  }
                                  touched={
                                    formik.touched.child?.[index]
                                      ?.dateOfBirth || ''
                                  }
                                />
                              </Grid>

                              {/* Select nationalityCountry */}
                              <Grid item xs={12} sm={6}>
                                <SelectInput
                                  name="nationalityCountry"
                                  item={item}
                                  index={index}
                                  value={item.nationalityCountry}
                                  list={countrylist}
                                  label="Select nationalityCountry"
                                  placeholder="Select nationalityCountry"
                                  handleOnChange={handleOnChange}
                                  handleDateClose={handleDateClose}
                                  formik={formik}
                                  error={
                                    formik?.errors?.child?.[index]
                                      ?.nationalityCountry || ''
                                  }
                                  touched={
                                    formik.touched.child?.[index]
                                      ?.nationalityCountry || ''
                                  }
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <label>
                                  Frequent flyer airline code with number (
                                  Optional )
                                </label>
                                <Grid container spacing={0.5}>
                                  <Grid item xs={2.5}>
                                    <NameInput
                                      name="frequentFlyer"
                                      item={item}
                                      index={index}
                                      maxlength={2}
                                      value={item.frequentFlyer}
                                      placeholder="Ex: BG"
                                      handleOnChange={handleOnChange}
                                      handleDateClose={handleDateClose}
                                      formik={formik}
                                    />
                                  </Grid>
                                  <Grid item xs={9.5}>
                                    <NameInput
                                      name="frequentFlyerNumber"
                                      item={item}
                                      index={index}
                                      value={item.frequentFlyerNumber}
                                      placeholder="Ex: 703"
                                      handleOnChange={handleOnChange}
                                      handleDateClose={handleDateClose}
                                      formik={formik}
                                      maxlength={20}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              {locationType === 'INSIDE' ? null : (
                                <>
                                  <Grid item xs={12} sm={6}>
                                    <NameInput
                                      name="passportNo"
                                      item={item}
                                      index={index}
                                      value={item.passportNo}
                                      label="Passport Number"
                                      handleOnChange={handleOnChange}
                                      handleDateClose={handleDateClose}
                                      formik={formik}
                                      required
                                      error={
                                        formik?.errors?.child?.[index]
                                          ?.passportNo || ''
                                      }
                                      maxlength={9}
                                      touched={
                                        formik.touched.child?.[index]
                                          ?.passportNo || ''
                                      }
                                    />
                                  </Grid>
                                  {/* Passport Expiry Date */}
                                  <Grid item xs={12} sm={6}>
                                    <PassPortDate
                                      label="Passport Expiry Date"
                                      name="passportEx"
                                      type="child"
                                      index={index}
                                      item={item}
                                      open="openpassportExDate"
                                      placeholder="Passport Expiry Date"
                                      handleToggleDate={handleToggleDate}
                                      handleOnChange={handleOnChange}
                                      formik={formik}
                                      date={item.passportEx}
                                      selectDate={dateAfterSixMonths}
                                      minDate={new Date(dateAfterSixMonths)}
                                      collapse={item.openpassportExDate}
                                      error={
                                        formik?.errors?.child?.[index]
                                          ?.passportEx || ''
                                      }
                                      touched={
                                        formik.touched.child?.[index]
                                          ?.passportEx || ''
                                      }
                                    />
                                  </Grid>

                                  {/* -----------File passport copy  */}

                                  <Grid item xs={12} sm={6}>
                                    <FileUpload
                                      field="passport"
                                      formik={formik}
                                      type={'child'}
                                      pRef={`passportChild${index}`}
                                      index={index}
                                      values={item.passport}
                                      sizeError={item.passportError}
                                    />
                                  </Grid>
                                  {/* -----------File Visa copy  */}
                                  <Grid item xs={12} sm={6}>
                                    <FileUpload
                                      field="visa"
                                      formik={formik}
                                      type={'child'}
                                      pRef={`visaChild${index}`}
                                      index={index}
                                      values={item.visa}
                                      sizeError={item.visaError}
                                      error={formik.errors.visa}
                                    />
                                  </Grid>
                                </>
                              )}

                              {wheelChairCheck && (
                                <>
                                  <Grid item xs={12}>
                                    <Box
                                      className="dashed-top-line"
                                      mt={2}
                                    ></Box>
                                    <Typography
                                      sx={{
                                        color: 'var(--secondary)',
                                        fontSize: { xs: 10, md: 12 },
                                        textAlign: 'center',
                                        mt: '-10px',
                                        bgcolor: 'var(--white)',
                                        width: 'fit-content',
                                        marginX: 'auto',
                                        px: 1,
                                      }}
                                    >
                                      SSR (optional)
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <label>Need a wheelchair ?</label>
                                    <RedioButton
                                      name="wheelChair"
                                      item={item}
                                      index={index}
                                      list={wheelChearList}
                                      value={item.wheelChair}
                                      handleOnChange={handleOnChange}
                                      handleDateClose={handleDateClose}
                                    />
                                  </Grid>
                                </>
                              )}
                              {vipCheck && (
                                <Grid item xs={12} sm={6} container>
                                  <Grid item xs={12} sm={12}>
                                    <label>Special Service Request</label>
                                    <RedioButton
                                      name="vip"
                                      item={item}
                                      index={index}
                                      list={vipList}
                                      value={item.vip}
                                      handleOnChange={handleOnChange}
                                      handleDateClose={handleDateClose}
                                    />
                                    {item.vip && (
                                      <label>
                                        If selected, {item.vip || ''} ID
                                        required for boarding pass.
                                      </label>
                                    )}
                                  </Grid>
                                </Grid>
                              )}
                            </Grid>
                            <Grid container justifyContent={'space-between'}>
                              <Grid item>
                                <Passengeraddnote />
                              </Grid>
                              {/* {baggage?.length > 0 && (
                                <Grid item>
                                  <AddBaggageMeal
                                    formik={formik}
                                    bagData={baggage}
                                    mealData={meals}
                                    baggageValue={item?.baggage}
                                    passengerIndex={index}
                                    passengerType="child"
                                    firstName={item?.firstName}
                                    lastName={item?.lastName}
                                  />
                                </Grid>
                              )} */}
                            </Grid>
                          </Box>
                        </Collapse>
                      </Box>
                    );
                  })}
                </Box>
                {/* Infant  */}
                <Box>
                  {formik.values.infant.map((item, index) => {
                    const required = isTravelerRequired(item);
                    return (
                      <Box
                        key={index}
                        sx={{
                          bgcolor: 'var(--white)',
                          px: { xs: 2, md: 3 },
                          py: { xs: 0.5, md: 1 },
                          mb: { xs: 1.5, md: 2 },
                          borderRadius: '5px',
                        }}
                      >
                        <AccordianHeader
                          handleExpand={handleExpand}
                          type="infant"
                          index={index}
                          required={required}
                          expandedState={expandedState.infant[index]}
                          traveler={adultCount + childCount + index + 1}
                        />

                        <Collapse in={expandedState.infant[index]}>
                          <Box
                            key={index}
                            sx={{
                              bgcolor: 'var(--white)',
                              py: 2,
                              borderRadius: '16px',
                            }}
                          >
                            <Grid container spacing={2} mb={2}>
                              <Grid item xs={12} md={6}>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                >
                                  <Box sx={{ width: '100%' }}>
                                    <label>
                                      Select Traveller From Your List
                                    </label>
                                    <SearchableDropDown
                                      index={index}
                                      loading={fetchTravelers?.isLoading}
                                      handler={handleAutoFill}
                                      options={optionInfant}
                                    />
                                  </Box>
                                  {required && (
                                    <Box
                                      onClick={() =>
                                        handleFillupRemove(
                                          item.passengerType,
                                          index
                                        )
                                      }
                                      sx={{
                                        fontSize: 12,
                                        color: 'var(--crimson)',
                                        textTransform: 'capitalize',
                                        cursor: 'pointer',
                                        width: '10%',
                                        pt: 3,
                                      }}
                                    >
                                      Clear
                                    </Box>
                                  )}
                                </Stack>
                              </Grid>
                              <Grid item xs={12}>
                                <Box className="dashed-top-line" mt={2}></Box>
                                <Typography
                                  sx={{
                                    color: 'var(--secondary)',
                                    fontSize: { xs: 10, md: 12 },
                                    textAlign: 'center',
                                    mt: '-10px',
                                    bgcolor: 'var(--white)',
                                    width: 'fit-content',
                                    marginX: 'auto',
                                    px: 1,
                                  }}
                                >
                                  or, Enter Traveller Details
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <NameInput
                                  name="firstName"
                                  item={item}
                                  index={index}
                                  value={item.firstName}
                                  label="Given Name / First name"
                                  handleOnChange={handleOnChange}
                                  handleDateClose={handleDateClose}
                                  formik={formik}
                                  tooltip
                                  required
                                  error={
                                    formik?.errors?.infant?.[index]
                                      ?.firstName || ''
                                  }
                                  touched={
                                    formik.touched.infant?.[index]?.firstName ||
                                    ''
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <NameInput
                                  name="lastName"
                                  item={item}
                                  index={index}
                                  value={item.lastName}
                                  label="Surname / Last name"
                                  handleOnChange={handleOnChange}
                                  handleDateClose={handleDateClose}
                                  formik={formik}
                                  tooltip
                                  required
                                  error={
                                    formik?.errors?.infant?.[index]?.lastName ||
                                    ''
                                  }
                                  touched={
                                    formik.touched.infant?.[index]?.lastName ||
                                    ''
                                  }
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <SelectInput
                                  name="gender"
                                  item={item}
                                  index={index}
                                  value={item.gender}
                                  list={genderListInfant}
                                  label="Select Gender"
                                  placeholder="Select Gender"
                                  handleOnChange={handleOnChange}
                                  handleDateClose={handleDateClose}
                                  formik={formik}
                                  error={
                                    formik?.errors?.infant?.[index]?.gender ||
                                    ''
                                  }
                                  touched={
                                    formik.touched.infant?.[index]?.gender || ''
                                  }
                                />
                              </Grid>

                              {/* Date of Birth */}
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                sx={{
                                  label: {
                                    fontSize: { xs: 12 },
                                  },
                                }}
                              >
                                <PassPortDate
                                  label="Date of Birth ( Maximum allowed age is 2
                                years )"
                                  name="dateOfBirth"
                                  type="infant"
                                  open="openDate"
                                  placeholder="Date of Birth"
                                  index={index}
                                  item={item}
                                  handleToggleDate={handleToggleDate}
                                  handleOnChange={handleOnChange}
                                  formik={formik}
                                  date={item.dateOfBirth}
                                  selectDate={dateBeforeTwoYears}
                                  minDate={new Date(dateBeforeTwoYears)}
                                  maxDate={new Date()}
                                  collapse={item.openDate}
                                  error={
                                    formik?.errors?.infant?.[index]
                                      ?.dateOfBirth || ''
                                  }
                                  touched={
                                    formik.touched.infant?.[index]
                                      ?.dateOfBirth || ''
                                  }
                                />
                              </Grid>

                              {/* Select nationalityCountry */}
                              <Grid item xs={12} sm={6}>
                                <SelectInput
                                  name="nationalityCountry"
                                  item={item}
                                  index={index}
                                  value={item.nationalityCountry}
                                  list={countrylist}
                                  label="Select nationalityCountry"
                                  placeholder="Select nationalityCountry"
                                  handleOnChange={handleOnChange}
                                  handleDateClose={handleDateClose}
                                  formik={formik}
                                  error={
                                    formik?.errors?.infant?.[index]
                                      ?.nationalityCountry || ''
                                  }
                                  touched={
                                    formik.touched.infant?.[index]
                                      ?.nationalityCountry || ''
                                  }
                                />
                              </Grid>

                              {locationType === 'INSIDE' ? null : (
                                <>
                                  <Grid item xs={12} sm={6}>
                                    <NameInput
                                      name="passportNo"
                                      item={item}
                                      index={index}
                                      value={item.passportNo}
                                      label="Passport Number"
                                      handleOnChange={handleOnChange}
                                      handleDateClose={handleDateClose}
                                      formik={formik}
                                      required
                                      error={
                                        formik?.errors?.infant?.[index]
                                          ?.passportNo || ''
                                      }
                                      maxlength={9}
                                      touched={
                                        formik.touched.infant?.[index]
                                          ?.passportNo || ''
                                      }
                                    />
                                  </Grid>
                                  {/* Passport Expiry Date */}
                                  <Grid item xs={12} sm={6}>
                                    <PassPortDate
                                      label="Passport Expiry Date"
                                      name="passportEx"
                                      type="infant"
                                      index={index}
                                      item={item}
                                      open="openpassportExDate"
                                      placeholder="Passport Expiry Date"
                                      handleToggleDate={handleToggleDate}
                                      handleOnChange={handleOnChange}
                                      formik={formik}
                                      date={item.passportEx}
                                      selectDate={dateAfterSixMonths}
                                      minDate={new Date(dateAfterSixMonths)}
                                      collapse={item.openpassportExDate}
                                      error={
                                        formik?.errors?.infant?.[index]
                                          ?.passportEx || ''
                                      }
                                      touched={
                                        formik.touched.infant?.[index]
                                          ?.passportEx || ''
                                      }
                                    />
                                  </Grid>

                                  {/* -----------File passport copy  */}

                                  <Grid item xs={12} sm={6}>
                                    <FileUpload
                                      field="passport"
                                      formik={formik}
                                      type={'infant'}
                                      pRef={`passportInfant${index}`}
                                      index={index}
                                      values={item.passport}
                                      sizeError={item.passportError}
                                      error={formik.errors.passport}
                                    />
                                  </Grid>
                                  {/* -----------File Visa copy  */}
                                  <Grid item xs={12} sm={6}>
                                    <FileUpload
                                      field="visa"
                                      formik={formik}
                                      type={'infant'}
                                      pRef={`visaInfant${index}`}
                                      index={index}
                                      values={item.visa}
                                      sizeError={item.visaError}
                                      error={formik.errors.visa}
                                    />
                                  </Grid>
                                </>
                              )}
                            </Grid>
                          </Box>
                          <Box>
                            <Passengeraddnote />
                          </Box>
                        </Collapse>
                      </Box>
                    );
                  })}
                </Box>
                <Box
                  sx={{
                    bgcolor: 'var(--white)',
                    p: { xs: 2, md: 3 },
                    mb: { xs: 1, md: 3 },
                    borderRadius: '5px',
                  }}
                >
                  <Typography
                    sx={{
                      color: 'var(--black)',
                      fontSize: { xs: 14, md: 16 },
                      fontWeight: 500,
                    }}
                  >
                    Contact Details
                  </Typography>
                  <Typography
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: { xs: 12 },
                      fontWeight: 400,
                      mb: 2,
                    }}
                  >
                    Airlines will send updates on this contact
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      sx={{
                        input: {
                          width: '100%',
                          p: '10px 15px',
                          textTransform: 'lowercase',
                          border: '1px solid var(--stroke)',
                        },
                      }}
                    >
                      <label htmlFor="email">Passenger Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email address"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        style={{ textTransform: 'lowercase' }}
                      />
                      {formik.touched.email && formik?.errors?.email ? (
                        <div>
                          <ValidIcon
                            msg={formik?.errors?.email}
                            fontColor="var(--red)"
                          />
                        </div>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          '.special-label': {
                            display: 'none',
                          },
                          input: {
                            p: '10px 15px',
                            border: '1px solid var(--stroke) !important',
                          },
                        }}
                      >
                        <label htmlFor="phone">Passenger Phone Number</label>

                        <PhoneInput
                          required
                          country={'bd'}
                          name="phone"
                          id="phone"
                          value={formik.values.phone || ''}
                          enableSearch={true}
                          countryCodeEditable={false}
                          onChange={(phoneNumber, countryData) => {
                            const countryCode = countryData?.dialCode;
                            formik.setFieldValue(
                              'phoneCountryCode',
                              `+${countryCode}`
                            );
                            formik.setFieldValue('phone', `+${phoneNumber}`);
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                          containerClass="custom-phone-input"
                          dropdownClass="custom-dropdown"
                        />
                      </Box>
                      {/* {formik.values.phone.length} */}
                      {formik.touched.phone && formik.errors.phone ? (
                        <div>
                          <ValidIcon
                            msg={formik.errors.phone}
                            fontColor="var(--red)"
                          />
                        </div>
                      ) : null}
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>

            {/* for md to up device  */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: { xs: 'none', md: 'block' },
                  bgcolor: 'var(--white)',
                  mb: 3,
                  borderRadius: '5px',
                  py: 1,
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    display: { xs: 'column', lg: 'flex' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ color: 'var(--secondary)', fontSize: 14 }}>
                    Session Timeout in
                  </Typography>
                  <CountdownFormatted padding="5px 10px" />
                </Box>
              </Box>
              <Box
                sx={{
                  display: { xs: 'none', md: 'block' },
                  mb: 2,
                }}
              >
                {data.segments.map((item, i) => (
                  <FlightInfoDetails
                    key={i}
                    index={i}
                    allData={data}
                    data={item}
                    adultCount={adultCount}
                    childCount={childCount}
                    infantCount={infantCount}
                  />
                ))}
              </Box>
              {/* <Box
                sx={{
                  display: { xs: 'none', md: 'block' },
                }}
              >
                <PartialPaymentInfo
                  data={data}
                  adultCount={adultCount}
                  childCount={childCount}
                  infantCount={infantCount}
                />
              </Box> */}
              <Box
                sx={{
                  display: { xs: 'none', md: 'block' },
                }}
              >
                <PriceSummary
                  data={data}
                  adultCount={adultCount}
                  childCount={childCount}
                  infantCount={infantCount}
                  baggagePrice={formik.values}
                  // totalSumofBaggage={totalSumOfBaggage || 0}
                />
              </Box>

              <Box
                sx={{
                  mb: 10,
                  label: {
                    color: 'var(--primary)',
                  },
                }}
              >
                <div className="custom-checkbox">
                  <input
                    type="checkbox"
                    name="termandcondition"
                    id="termandcondition"
                    value={formik.values.termandcondition}
                    onChange={formik.handleChange}
                    checked={formik.values.termandcondition}
                  />
                  <label htmlFor="termandcondition">
                    By Booking/Issuing this Ticket I agree to{' '}
                    {companyInfo.companyName} Terms & Conditions
                  </label>
                </div>
                {formik.touched.termandcondition &&
                formik.errors.termandcondition ? (
                  <div>
                    <ValidIcon
                      msg={formik.errors.termandcondition}
                      fontColor="var(--red)"
                    />
                  </div>
                ) : null}

                <Box
                  sx={{
                    mt: 2,
                    // position: { xs: '', md: 'fixed' },
                    // bottom: { xs: '', md: 20 },
                  }}
                >
                  {!isDone ? (
                    <CustomButton
                      type="submit"
                      value={checkButton ? 'Review & Issue' : 'Review & Hold'}
                      textcolor="var(--white)"
                      bgcolor="var(--primary)"
                      hovercolor="var(--primary)"
                      padding="5px 20px"
                      width={{ xs: '100%' }}
                    />
                  ) : (
                    <Box
                      sx={{
                        padding: '10px 20px 25px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'var(--bgcolor)',
                        borderRadius: '5px',
                      }}
                    >
                      <CustomCircularProgress size={16} />
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Modal open={open}>
        <Box sx={{ ...style, width: { xs: '80%', sm: '50%', md: '40%' } }}>
          <CustomModal
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
                  {checkButton
                    ? 'Thank you so much for Issuing a flight ticket.'
                    : `Thank you so much for booking a flight ticket with Please issue your booking ticket within the time limit
                          specified, otherwise your booking request will be
                          automatically cancelled.`}
                  For any query. Please contact us at{' '}
                  <strong>{companyInfo.email}</strong> or Call{' '}
                  <strong>{companyInfo.phone}</strong>
                </>
              ) : (
                <>
                  {/* We regret to inform you that your recent flight booking
                  request with {companyInfo.companyName} could not be processed
                  successfully. */}
                  For any query. Please contact us at{' '}
                  <strong>{companyInfo.email}</strong> or Call{' '}
                  <strong>{companyInfo.phone}</strong>
                </>
              )
            }
            status={
              bookingId
                ? checkButton
                  ? `${
                      bookingId?.status === 'ISSUE_REQUEST' ||
                      bookingId?.status === 'ISSUE_REQUEST_SENT'
                        ? 'Issue Request Sent'
                        : 'Ticketed Successfully'
                    }`
                  : 'Booking success'
                : `${errorRes?.message || 'Fare unavailable'} ${
                    errorRes?.message ===
                    'Insufficient Balance! Please deposit money and try again.'
                      ? ''
                      : '! Please try to book another flight.'
                  } `
            }
          />
        </Box>
      </Modal>
      {isModal && (
        <Box>
          <ConfirmationModal
            isModal={isModal}
            handleCloseModal={handleCloseModal}
            handleConfirm={handleConfirm}
            data={data}
            adultCount={adultCount}
            childCount={childCount}
            infantCount={infantCount}
            passenger={formik.values}
            locationType={locationType}
            checkButton={checkButton}
          />
        </Box>
      )}

      {isDone && (
        <Processoing
          content={'We are processing your request please wait...'}
          content1={'Traveler details are being saved to your list...'}
          content2={'A request is being sent to the airline...'}
          content3={'Verifying the fare with the airline...'}
        />
      )}
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

export default PassengerInformation;
