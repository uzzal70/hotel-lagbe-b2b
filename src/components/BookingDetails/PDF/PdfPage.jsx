/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import EditIcon from '@mui/icons-material/Edit';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useFormik } from 'formik';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: { xs: 2, md: 4 },
  borderRadius: '15px',
  outline: 'none !important',
};
import PDFpageDesign from './PdfPageDesign';
import CustomButton from '../../Common/CustomButton';
import FlightItinerary from '../FlightItinerary';
import FareDetails from '../FareDetails';
import PassengerDetails from '../PassengerDetails';
import getAuthToken from '../../Common/getAuthToken';
import {
  useCreateItemMutation,
  useGetItemsQuery,
} from '../../../redux/slices/apiSlice';
import Swal from 'sweetalert2';
import Processoing from '../../Common/Processoing';
import CustomerFare from './CustomerFare';
import CustomerFares from './CustomerFares';
import BackButton from '../../Common/BackButton';
import Token from '../../Common/Token';
import axios from 'axios';
import TokenToName from '../../Common/TokenToName';
import RefundReissueVoidSummary from '../RefundReissueVoidSummary';
import { baseUrl } from '../../../../baseurl';
import companyInfo from '../../../common/companyInfo';
import HeaderTitle from '../../../common/HeaderTitle';
// import RefundSummary from '../RefundSummary';
// import CustomerFare from './CustomerFare';

const PdfPage = ({ allData, data, result, tickteText }) => {
  const tokenise = TokenToName();
  const token = getAuthToken();
  const agentId = Token();
  const [open, setOpen] = useState(false);
  const [checkImage, setCheckImage] = useState(null);

  // const [fromCurrency, setFromCurrency] = useState('BDT');
  const [toCurrency, setToCurrency] = useState('BDT');

  const exchangeRates = {
    [companyInfo.currencyType]: 1, // 1 BDT = 1 BDT
    USD: 0.0091, // 1 USD = 84 BDT (Assuming 1 USD = 84 BDT)
    EUR: 0.0085, // 1 EUR = 95 BDT (Assuming 1 EUR = 95 BDT)
    AED: 0.0333, // 1 AED = 22.7 BDT (Assuming 1 AED = 22.7 BDT)
  };
  const convertCurrency = (amount) => {
    const amountValue = parseFloat(amount);
    if (!isNaN(amountValue)) {
      const result =
        (amountValue * exchangeRates[toCurrency]) / exchangeRates['BDT'];
      return result?.toFixed(2); // Round to 2 decimal places
    } else {
      return 0; // or handle error as needed
    }
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };
  const bookingId = data?.id || '';
  const status = data?.status || '';
  // this api is called
  const agentUrl = `/booking/getCustomerFareByBookingId/${bookingId}`;
  const {
    data: customerData,
    isLoading,
    refetch,
  } = useGetItemsQuery({
    url: agentUrl,
  });
  const customerFare = customerData?.[0]?.customerFare ?? 'default';
  const ADT = parseInt(data?.adultCount);
  const CNN = parseInt(data?.childCount || 0);
  const INF = parseInt(data?.infantCount || 0);
  let totalDiscount = 0;
  const initialValues = {
    ADT: {
      passengerType: 'ADT',
      basePrice: '',
      tax: '0',
      otherCharges: '0',
      discount: '0',
    },
    ...(CNN
      ? {
          CNN: {
            passengerType: 'CNN',
            basePrice: '',
            tax: '0',
            otherCharges: '0',
            discount: '0',
          },
        }
      : null),

    ...(INF
      ? {
          INF: {
            passengerType: 'INF',
            basePrice: '',
            tax: '0',
            otherCharges: '0',
            discount: '0',
          },
        }
      : null),
  };

  useEffect(() => {
    result.forEach(({ passengerType, basePrice, tax, otherCharges }) => {
      if (initialValues[passengerType]) {
        initialValues[passengerType] = {
          ...initialValues[passengerType],
          basePrice: basePrice || 0,
          tax: tax || 0,
          discount: 0,
          otherCharges: otherCharges || 0,
        };
      }
    });
  }, [result, toCurrency]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/core/agent/getCompanyLogoFilebyId/${tokenise?.userId}`
        );
        setCheckImage(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [tokenise?.userId]);

  let totalSum = 0;
  const [createItem, { isLoading: isDone }] = useCreateItemMutation();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async () => {
      try {
        const payLoadData = [
          formik.values.ADT,
          CNN ? formik.values.CNN : null,
          INF ? formik.values.INF : null,
        ]?.filter(Boolean);

        const convertedData = payLoadData?.map((item) => {
          return {
            ...item,
            basePrice: convertCurrency(item.basePrice),
            tax: convertCurrency(item.tax),
            otherCharges: convertCurrency(item.otherCharges),
            discount: convertCurrency(item.discount),
          };
        });
        const payload = {
          bookingId: bookingId,
          totalPrice: convertCurrency(totalSum) || '',
          customerFareEdits: convertedData,
          currency: toCurrency || 'BDT',
          ait: convertCurrency(data?.ait || 0),
          discount: convertCurrency(totalDiscount),
        };

        const url = '/booking/createCustomerFare';
        const method = 'POST';
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
        }).unwrap();
        Swal.fire(
          {
            position: 'center',
            icon: 'success',
            title: `Your customer fare has been updated`,
            showConfirmButton: false,
            timer: 5000,
          },
          refetch(),
          setOpen(false)
        );
      } catch (error) {
        setOpen(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: error?.data?.message,
        });
      }
    },
  });

  // const payLoadData = [
  //   formik.values.ADT,
  //   CNN ? formik.values.CNN : null,
  //   INF ? formik.values.INF : null,
  // ]?.filter(Boolean);
  // const payload = {
  //   bookingId: bookingId,
  //   totalPrice: totalSum || '',
  //   customerFareEdits: payLoadData,
  // };

  // const convertedData = payLoadData?.map((item) => {
  //   return {
  //     ...item,
  //     basePrice: convertCurrency(item.basePrice),
  //     tax: convertCurrency(item.tax),
  //     otherCharges: convertCurrency(item.otherCharges),
  //     discount: convertCurrency(item.discount),
  //   };
  // });

  const handleChange = (e, category, field) => {
    const { value } = e.target;
    formik.setFieldValue(`${category}.${field}`, value);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const paxDefined = (code) => {
    const paxMap = {
      ADT: 'Adult',
      CNN: 'Child',
      INF: 'Infant',
    };
    return paxMap[code] || 'unknown';
  };

  const calculateTotal = (count, category, formikValues) => {
    const basePrice = parseInt(formikValues[category]?.basePrice) || 0;
    const tax = parseInt(formikValues[category]?.tax) || 0;
    const otherCharges = parseInt(formikValues[category]?.otherCharges) || 0;
    const discount = parseInt(formikValues[category]?.discount) || 0;
    const total = count * (basePrice + tax + otherCharges - discount);
    return total;
  };

  const allValues = formik.values;

  const adultSum =
    ADT *
    (parseInt(allValues.ADT?.basePrice || 0) +
      parseInt(allValues.ADT?.tax || 0) +
      parseInt(allValues.ADT?.otherCharges || 0) -
      parseInt(allValues.ADT?.discount || 0));
  const childSum =
    CNN *
    (parseInt(allValues.CNN?.basePrice || 0) +
      parseInt(allValues.CNN?.tax || 0) +
      parseInt(allValues.CNN?.otherCharges || 0) -
      parseInt(allValues.CNN?.discount || 0));
  const infantSum =
    INF *
    (parseInt(allValues.INF?.basePrice || 0) +
      parseInt(allValues.INF?.tax || 0) +
      parseInt(allValues.INF?.otherCharges || 0) -
      parseInt(allValues.INF?.discount || 0));
  totalSum = adultSum + childSum + infantSum;
  const adultDiscount = ADT * parseInt(allValues.ADT.discount || 0);
  const childDiscount = CNN * parseInt(CNN ? allValues.CNN.discount : 0);
  const infantDiscount = INF * parseInt(INF ? allValues.INF.discount : 0);
  totalDiscount = adultDiscount + childDiscount + infantDiscount;

  const urlProfile = `/agent/findAgentByUserId/${agentId}`;
  const { data: profileData } = useGetItemsQuery({
    url: urlProfile,
  });

  return (
    <Box sx={{ minHeight: '100vh' }} mb={{ xs: 10, md: 2 }}>
      <HeaderTitle headerTitle={`Invoice Download`} backButtonText={-1} />
      <Container sx={{ mt: 3 }}>
        <Box>
          <Grid
            container
            spacing={{ xs: 1, md: 1.5 }}
            justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
          >
            <Grid item>
              <PDFDownloadLink
                document={
                  <PDFpageDesign
                    segments={data?.segments}
                    passengers={data?.passengers}
                    allData={allData}
                    bookingData={data}
                    customerFare={customerFare}
                    price={true}
                    tickteText={tickteText}
                    data={customerData ? customerData?.[0]?.customerFare : []}
                    totalPrice={
                      customerData ? customerData?.[0]?.totalPrice : 0
                    }
                    ait={customerData ? customerData?.[0]?.ait : 0}
                    discount={customerData ? customerData?.[0]?.discount : 0}
                    currency={
                      customerData ? customerData?.[0]?.currency : 'BDT'
                    }
                    profileData={profileData}
                    checkImage={checkImage}
                    baseUrl={baseUrl}
                  />
                }
                fileName={`${data?.passengers?.[0]?.firstName} ${
                  data?.passengers?.[0]?.lastName || ''
                }-${data?.bookingRef}`}
                // fileName={`${0.passengers[0].firstName}-${data?.bookingRef}`}
              >
                {({ blob, fileName, loading, error }) => (
                  <Box
                    sx={{
                      color: 'var(--primary)',
                      bgcolor: 'var(--bgcolor)',
                      padding: '4px 10px',
                      border: '1px solid var(--primary)',
                      borderRadius: '5px',
                    }}
                  >
                    {loading ? (
                      <a
                        // href={fileName}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          color: 'var(--primary)',
                          fontWeight: 400,
                          fontSize: 15,
                        }}
                      >
                        <SimCardDownloadIcon
                          style={{
                            fontSize: '14px',
                            color: 'var(--primary)',
                          }}
                        />
                        &nbsp;Download with price
                      </a>
                    ) : (
                      <>
                        {blob && (
                          <a
                            href={fileName}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              color: 'var(--primary)',
                              fontWeight: 400,
                              fontSize: 15,
                            }}
                          >
                            <SimCardDownloadIcon
                              style={{
                                fontSize: '14px',
                                color: 'var(--primary)',
                              }}
                            />
                            &nbsp;Download with price
                          </a>
                        )}
                      </>
                    )}
                    {error && `Error occurred: ${error.message}`}
                  </Box>
                )}
              </PDFDownloadLink>
            </Grid>
            <Grid item>
              <PDFDownloadLink
                document={
                  <PDFpageDesign
                    segments={data?.segments}
                    passengers={data?.passengers}
                    allData={allData}
                    bookingData={data}
                    customerFare={customerFare}
                    // text={'E-Ticket'}
                    tickteText={tickteText}
                    data={customerData ? customerData?.[0]?.customerFare : []}
                    totalPrice={
                      customerData ? customerData?.[0]?.totalPrice : 0
                    }
                    ait={customerData ? customerData?.[0]?.ait : 0}
                    discount={customerData ? customerData?.[0]?.discount : 0}
                    currency={
                      customerData ? customerData?.[0]?.currency : 'BDT'
                    }
                    profileData={profileData}
                    checkImage={checkImage}
                    baseUrl={baseUrl}
                  />
                }
                // fileName={`Customer invoice without price-${data?.bookingRef}`}
                fileName={`${data?.passengers?.[0]?.firstName} ${
                  data?.passengers?.[0]?.lastName || ''
                }-${data?.bookingRef}`}
              >
                {({ blob, fileName, loading, error }) => (
                  <Box
                    sx={{
                      color: 'var(--primary)',
                      bgcolor: 'var(--bgcolor)',
                      padding: '4px 10px',
                      border: '1px solid var(--primary)',
                      borderRadius: '5px',
                    }}
                  >
                    {loading ? (
                      <a
                        // href={fileName}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          color: 'var(--primary)',
                          fontWeight: 400,
                          fontSize: 15,
                        }}
                      >
                        <SimCardDownloadIcon
                          style={{
                            fontSize: '14px',
                            color: 'var(--primary)',
                          }}
                        />
                        &nbsp;Download without price
                      </a>
                    ) : (
                      <>
                        {blob && (
                          <a
                            href={fileName}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              color: 'var(--primary)',
                              fontWeight: 400,
                              fontSize: 15,
                            }}
                          >
                            <SimCardDownloadIcon
                              style={{
                                fontSize: '14px',
                                color: 'var(--primary)',
                              }}
                            />
                            &nbsp;Download without price
                          </a>
                        )}
                      </>
                    )}

                    {error && `Error occurred: ${error.message}`}
                  </Box>
                )}
              </PDFDownloadLink>
            </Grid>
            {tickteText !== 'Agent Invoice' &&
            (status === 'BOOKING_HOLD' ||
              status === 'MANUAL_TICKETED' ||
              status === 'TICKETED') ? (
              <Grid item>
                <CustomButton
                  fontSize={{ xs: 12, md: 14 }}
                  value="Edit Customer Fare"
                  textcolor="var(--white)"
                  bgcolor="var(--pest)"
                  hovercolor="var(--pest)"
                  padding={{ xs: '3px 25px', sm: '3px 10px', md: '1px 15px' }}
                  borderRadius="5px"
                  startIcon={<EditIcon style={{ fontSize: '14px' }} />}
                  border="1px solid var(--pest)"
                  handleClick={handleOpen}
                />
              </Grid>
            ) : null}
          </Grid>
        </Box>

        <Box
          sx={{
            bgcolor: 'var(--white)',
            p: { xs: 1, md: 2 },
            mt: 2,
            borderRadius: '5px',
          }}
        >
          <Box>
            <Typography
              sx={{
                color: 'var(--black)',
                fontSize: { xs: 14, md: 16 },
                pb: 1,
              }}
            >
              Flight Information
            </Typography>
            <Box>
              <FlightItinerary data={data?.segments} />
            </Box>
          </Box>

          <Box>
            {data?.status === 'REISSUE_COMPLETED' && (
              <Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    bgcolor: 'var(--body)',
                    px: 2,
                    py: 0.8,
                    my: 1,
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  <Typography
                    sx={{
                      color: 'var(--black)',
                      fontSize: { xs: 14, md: 16 },
                    }}
                  >
                    Reissue Flight Information
                  </Typography>
                </Stack>
                <FlightItinerary data={allData?.reissuedSegments} />
              </Box>
            )}
            <Box mb={3}>
              {(data?.status === 'REFUND_COMPLETED' ||
                data?.status === 'REFUND_QUOTED' ||
                data?.status === 'REFUND_QUOTE_APPROVED') && (
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      bgcolor: 'var(--body)',
                      px: 2,
                      py: 0.8,
                      my: 1,
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: { xs: 14, md: 16 },
                      }}
                    >
                      Refund Summary
                    </Typography>
                  </Stack>

                  <RefundReissueVoidSummary
                    sign={'-'}
                    text={'Total Refundable Amount'}
                    amount={data?.refundedAmount}
                    penalty={data?.refundAirlinePenaltyAmount}
                    service={data?.refundServiceFee}
                    useAmount={data?.useAmount}
                    textDiff={data?.refundNonRefundableTax || 0}
                  />
                </Box>
              )}
              {data?.status === 'REISSUE_COMPLETED' && (
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      bgcolor: 'var(--body)',
                      px: 2,
                      py: 0.8,
                      my: 1,
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: { xs: 14, md: 16 },
                      }}
                    >
                      Reissued Summary
                    </Typography>
                  </Stack>

                  <RefundReissueVoidSummary
                    text={'Total Reissued Amount'}
                    amount={data?.reissuedAmount}
                    penalty={data?.reissuAirlinePenaltyAmount}
                    service={data?.reissuServiceFee}
                    reissuedFareDiff={data?.reissuedFareDifference || 0}
                    textDiff={data?.reissueTaxDifference || 0}
                  />
                </Box>
              )}
              {data?.status === 'TICKET_VOIDED' && (
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      bgcolor: 'var(--body)',
                      px: 2,
                      py: 0.8,
                      my: 1,
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: { xs: 14, md: 16 },
                      }}
                    >
                      Voided Summary
                    </Typography>
                  </Stack>

                  <RefundReissueVoidSummary
                    sign={'-'}
                    text={'Total Voided Amount'}
                    amount={data?.voidedAmount}
                    penalty={data?.voidAirlinePenaltyAmount}
                    service={data?.voidServiceFee}
                  />
                </Box>
              )}
            </Box>
          </Box>
          <Box>
            <Typography
              sx={{
                color: 'var(--black)',
                fontSize: { xs: 14, md: 16 },
                pt: 3,
                pb: 1,
              }}
            >
              Agent Fare Summary
            </Typography>
            <Box>
              <FareDetails
                data={data?.passengers}
                allData={data}
                agent="agent"
              />
            </Box>
          </Box>
          {customerFare === 'default' ? (
            <Box>
              <Typography
                sx={{
                  color: 'var(--black)',
                  fontSize: { xs: 14, md: 16 },
                  pt: 3,
                  pb: 1,
                }}
              >
                Customer Fare Summary
              </Typography>
              <Box>
                {isLoading ? (
                  'Loading'
                ) : (
                  <CustomerFares bookingId={bookingId} allData={data} />
                )}
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography
                sx={{
                  color: 'var(--black)',
                  fontSize: { xs: 14, md: 16 },
                  pt: 3,
                  pb: 1,
                }}
              >
                Customer Fare Summary
              </Typography>
              <Box>
                {isLoading ? (
                  'Loading'
                ) : (
                  <CustomerFare
                    data={customerData ? customerData?.[0]?.customerFare : []}
                    totalPrice={
                      customerData ? customerData?.[0]?.totalPrice : 0
                    }
                    ait={customerData ? customerData?.[0]?.ait : 0}
                    discount={customerData ? customerData?.[0]?.discount : 0}
                    currency={
                      customerData ? customerData?.[0]?.currency : 'BDT'
                    }
                    allData={data}
                  />
                )}
              </Box>
            </Box>
          )}

          <Box>
            <Typography
              sx={{
                color: 'var(--black)',
                fontSize: { xs: 14, md: 16 },
                pt: 3,
                pb: 1,
              }}
            >
              Passenger Information
            </Typography>
            <Box>
              <PassengerDetails data={data?.passengers} allData={data} />
            </Box>
          </Box>

          {(allData?.reissuedPassengers?.length > 0 ||
            allData?.refundedPassengers?.length > 0 ||
            allData?.voidedPassengers?.length > 0) && (
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  bgcolor: 'var(--body)',
                  px: 2,
                  py: 0.8,
                  my: 1,
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                <Typography
                  sx={{
                    color: 'var(--black)',
                    fontSize: { xs: 14, md: 16 },
                  }}
                >
                  {allData?.reissuedPassengers?.length > 0
                    ? 'Reissued'
                    : allData?.refundedPassengers?.length > 0
                    ? 'Refunded'
                    : 'Voided'}{' '}
                  Passenger Information
                </Typography>
              </Stack>
              <PassengerDetails
                data={
                  allData?.reissuedPassengers?.length > 0
                    ? allData?.reissuedPassengers
                    : allData?.refundedPassengers?.length > 0
                    ? allData?.refundedPassengers
                    : allData?.voidedPassengers
                }
                allData={data}
              />
            </Box>
          )}
        </Box>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              ...style,
              width: { xs: '90vw', sm: '80vw', md: '70vw', lg: '50vw' },
              height: { xs: '60vh', sm: '60vh', md: '60vh', lg: 'auto' },
              overflow: 'scroll',
            }}
          >
            <Typography
              sx={{
                color: 'var(--secondary)',
                fontSize: { xs: 16, md: 20 },
                textAlign: 'center',
                mb: 3,
                py: 0.5,
                borderRadius: '5px',
                bgcolor: 'var(--bgcolor)',
              }}
            >
              Edit customer fare
            </Typography>
            <Stack direction="row" justifyContent={'end'} spacing={1} mb={1}>
              <Box>Currency Change:</Box>
              <Box
                // className="custom-select"
                sx={{
                  select: {
                    width: '130px',
                    border: '1px solid var(--stroke)',
                    py: 0.5,
                    borderRadius: '5px',
                    outline: 'none',
                  },
                }}
              >
                <select value={toCurrency} onChange={handleToCurrencyChange}>
                  <option value="BDT">BDT</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="AED">AED</option>
                </select>
              </Box>
            </Stack>
            <form onSubmit={formik.handleSubmit}>
              <Box>
                <Box
                  sx={{
                    '.table-header': {
                      bgcolor: 'var(--bgcolor)',
                    },
                    // tbody: {
                    //   border: '',
                    //   borderColor: 'var(--stroke)',
                    // },
                    'tbody tr': {
                      border: '',
                      borderColor: 'var(--bgcolor)',
                    },
                    'table th': {
                      textAlign: 'start',
                      fontWeight: 400,
                      fontSize: '13px',
                      p: '8px 5px',
                      margin: '5px',
                    },
                    'table td': {
                      p: '5px',
                      fontSize: '13px',
                      width: { sm: '100%', md: '100px' },
                    },
                    '.table-cell': {
                      textAlign: 'start',
                    },
                    '.table-cell:first-of-type': {
                      textAlign: 'start',
                    },
                    input: {
                      width: { xs: '60%', md: '80%' },
                      outline: 'none',
                      padding: '5px ',
                      border: '1px solid var(--stroke)',
                      borderRadius: '3px',
                    },
                  }}
                >
                  <div className="customer-fare">
                    <table className="custom-tabledd">
                      <thead>
                        <tr>
                          <th scope="col">Pax Type</th>
                          <th scope="col">Base Price</th>
                          <th scope="col">Tax</th>
                          <th scope="col">Discount</th>
                          <th scope="col">Pax Count</th>
                          <th scope="col">Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(initialValues).map(
                          ([category], index) => {
                            return (
                              <tr key={index}>
                                <td
                                  data-label="Pax Type"
                                  style={{ paddingTop: index === 0 && '7px' }}
                                >
                                  {paxDefined(category)}
                                </td>
                                <td
                                  data-label="Base Price"
                                  style={{ paddingTop: index === 0 && '7px' }}
                                >
                                  <input
                                    id={`${category}-basePrice`}
                                    name={`${category}.basePrice`}
                                    type="text"
                                    value={
                                      toCurrency === 'BDT'
                                        ? formik.values[category]?.basePrice
                                        : convertCurrency(
                                            formik.values[category]?.basePrice
                                          )
                                    }
                                    disabled={
                                      toCurrency === 'BDT' ? false : true
                                    }
                                    onChange={(e) =>
                                      handleChange(e, category, 'basePrice')
                                    }
                                  />
                                </td>
                                <td
                                  data-label="Tax"
                                  style={{ paddingTop: index === 0 && '7px' }}
                                >
                                  <input
                                    id={`${category}-tax`}
                                    name={`${category}.tax`}
                                    type="number"
                                    value={
                                      toCurrency === 'BDT'
                                        ? formik.values[category]?.tax
                                        : convertCurrency(
                                            formik.values[category]?.tax
                                          )
                                    }
                                    disabled={
                                      toCurrency === 'BDT' ? false : true
                                    }
                                    onChange={(e) =>
                                      handleChange(e, category, 'tax')
                                    }
                                  />
                                </td>
                                {/* <td
                                  style={{ paddingTop: index === 0 && '7px' }}
                                >
                                  <input
                                    id={`${category}-other`}
                                    name={`${category}.other`}
                                    type="number"
                                    value={formik.values[category]?.other || ''}
                                    onChange={(e) =>
                                      handleChange(e, category, 'other')
                                    }
                                  />
                                </td> */}
                                <td
                                  data-label="Discount"
                                  style={{ paddingTop: index === 0 && '7px' }}
                                >
                                  <input
                                    id={`${category}-discount`}
                                    name={`${category}.discount`}
                                    type="number"
                                    value={
                                      toCurrency === 'BDT'
                                        ? formik.values[category]?.discount
                                        : convertCurrency(
                                            formik.values[category]?.discount
                                          )
                                    }
                                    disabled={
                                      toCurrency === 'BDT' ? false : true
                                    }
                                    onChange={(e) =>
                                      handleChange(e, category, 'discount')
                                    }
                                  />
                                </td>

                                <td
                                  data-label="Pax Count"
                                  style={{
                                    paddingTop: index === 0 && '7px',
                                  }}
                                >
                                  <Box>
                                    &nbsp;&nbsp;
                                    {category === 'ADT'
                                      ? data?.adultCount
                                      : category === 'INF'
                                      ? data?.infantCount
                                      : data?.childCount}
                                  </Box>
                                </td>

                                <td
                                  data-label="Total Price"
                                  style={{ paddingTop: index === 0 && '7px' }}
                                >
                                  {category === 'ADT'
                                    ? convertCurrency(
                                        calculateTotal(
                                          ADT,
                                          category,
                                          formik.values
                                        )
                                      )
                                    : category === 'INF'
                                    ? convertCurrency(
                                        calculateTotal(
                                          INF,
                                          category,
                                          formik.values
                                        )
                                      )
                                    : convertCurrency(
                                        calculateTotal(
                                          CNN,
                                          category,
                                          formik.values
                                        )
                                      )}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </Box>
                <Grid container justifyContent="flex-end">
                  <Grid item xs={12} sm={6} md={4} lg={3.8}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ mt: 2 }}
                    >
                      <Box
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          color: 'var(--secondary)',
                        }}
                      >
                        <Box sx={{ fontWeight: 500 }}>Traveler</Box>
                        <Box>Total Discount</Box>
                        <Box>Total AIT VAT</Box>
                      </Box>
                      <Box
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          textAlign: 'end',
                          color: 'var(--secondary)',
                        }}
                      >
                        <Box sx={{ fontWeight: 500 }}>
                          {data?.adultCount +
                            data?.childCount +
                            data?.infantCount}{' '}
                          Pax
                        </Box>
                        <Box>
                          {totalDiscount > 0 ? '—' : ''}&nbsp;
                          {convertCurrency(totalDiscount || 0)}
                        </Box>
                        <Box>{convertCurrency(data?.ait || 0)}</Box>
                      </Box>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{
                        borderTop: '1px solid var(--bgcolor)',
                        mt: 1,
                        pt: 0.4,
                        fontWeight: 500,
                        fontSize: { xs: 12, md: 14 },
                        color: 'var(--secondary)',
                      }}
                    >
                      <Box>Total Customer Payable</Box>
                      <Box>
                        {/* {toCurrency
                          ? `${toCurrency} ${convertCurrency(
                              totalSum + parseInt(data?.ait || 0)
                            )}`
                          : `BDT ${totalSum + parseInt(data?.ait || 0)}`} */}
                        {toCurrency}{' '}
                        {convertCurrency(totalSum + parseInt(data?.ait || 0))}
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>

              <Box
                mt={5}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Button
                  sx={{
                    bgcolor: 'var(--red)',
                    color: 'var(--white)',
                    textTransform: 'capitalize',
                    ml: 2,
                    px: 4,
                    '&:hover': {
                      bgcolor: 'var(--red)',
                    },
                  }}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  sx={{
                    bgcolor: 'var(--secondary)',
                    color: 'var(--white)',
                    textTransform: 'capitalize',
                    px: 4,
                    '&:hover': {
                      bgcolor: 'var(--secondary)',
                    },
                  }}
                  // disabled={formik.values.password === '' ? true : false}
                  // onClick={() => handleUpdate()}
                >
                  Update
                </Button>
              </Box>
            </form>
            <Box sx={{ textAlign: 'center', fontSize: 12 }}>
              Only change the fare when the currency is BDT; otherwise, do not
              edit it.
            </Box>
          </Box>
        </Modal>
      </Container>
      {isDone || isLoading ? (
        <Processoing content={'We are processing your request please wait'} />
      ) : (
        ''
      )}
    </Box>
  );
};

export default PdfPage;
