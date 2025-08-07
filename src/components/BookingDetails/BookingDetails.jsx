/* eslint-disable react/display-name */
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import {
  Box,
  Collapse,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Card from '../Common/Card';
import CustomButton from '../Common/CustomButton';
import FlightItinerary from './FlightItinerary';
import PassengerDetails from './PassengerDetails';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import BackButton from '../Common/BackButton';
import {
  useCreateItemMutation,
  useGetItemsQuery,
} from '../../redux/slices/apiSlice';
import moment from 'moment';
import FareDetails from './FareDetails';
import Swal from 'sweetalert2';
import Token from '../Common/Token';
import Processoing from '../Common/Processoing';
import getAuthToken from '../Common/getAuthToken';
import Download from './PDF/Download';
import RefundReissueVoidSummary from './RefundReissueVoidSummary';
import CustomerFares from './PDF/CustomerFares';
import BookingDetailsLoader from './BookingDetailsLoader';
import ImageImport from '../../assets/ImageImport';
import responseimg from '../../assets/responseimg';
import commaNumber from 'comma-number';
import Remarks from './Remarks';
import Countdown from 'react-countdown';
import Accordion from '../Common/Accordion';
import PaxCount from './PaxCount';
import companyInfo from '../../common/companyInfo';
import RefreshButton from '../Common/RefreshButton';
import ChatBot from '../Chat/ChatBot';
import {
  useCreateMessageByAgentMutation,
  useGetChatDataQuery,
  useStartConversationMutation,
} from '../../redux/slices/chat/chatApiSlice';
import { statusConstants } from '../Utils/Flight/statusConstants';
import SmallChatBot from '../Chat/SmallChatBot';
import GetSupportButton from '../Common/GetSupportButton';
import { ChatBotButton } from '../Common/ChatBotButton';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowChat } from '../../redux/slices/globalSlice';
import HeaderTitle from '../../common/HeaderTitle';
const formatFieldName = (fieldName) => {
  return fieldName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
const noticeText =
  'Processing your request may take up to 15 minutes; please contact support if delayed.';
const BookingDetails = () => {
  const isDesktop = useMediaQuery('(min-width:600px)');
  const token = getAuthToken();
  const dispatch = useDispatch();
  const agentId = Token();
  const { id } = useParams();
  const navigate = useNavigate();
  const showChat = useSelector((state) => state.global.showChat);
  const location = useLocation();
  const validID = location?.state?.id === id;
  const path = location?.state?.path;
  const [allData, setAllData] = useState(null);
  const [data, setData] = useState([]);
  const [processMessage, setProcessMessage] = useState('');
  const [isDone, setIsDone] = useState(true);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [expandedState, setExpandedState] = useState({
    flightInfo: true,
    baggage: isDesktop,
    agentFares: isDesktop,
    customerFare: isDesktop,
    passengers: isDesktop,
    refundSummary: isDesktop,
    reissuedSummary: isDesktop,
    voidedSummary: isDesktop,
    actionStatus: isDesktop,
  });
  useEffect(() => {
    setExpandedState((prevExpandedState) => ({
      ...prevExpandedState,
      flightInfo: isDesktop,
    }));
  }, [isDesktop]);
  const handleExpand = (name) => {
    setExpandedState((prevExpandedState) => {
      return {
        ...prevExpandedState,
        [name]: !prevExpandedState[name],
      };
    });
  };

  const url = `/booking/findOneByAgent/${id}`;
  const { data: bookData, isLoading, refetch } = useGetItemsQuery({ url });

  // this api is called from the issue request balance reload
  const agentUrl = `/agent/findAgentById/${agentId}`;
  const {
    data: agentData,
    // isLoading: aIsLoading,
    refetch: aRefetch,
  } = useGetItemsQuery({
    url: agentUrl,
  });

  const param = `threads/agentGetThreadsByBookingId/${id}`;
  const {
    data: message,
    error: mesError,
    refetch: mesRefetch,
    isLoading: mesIsLoading,
  } = useGetChatDataQuery(param, {
    refetchOnMountOrArgChange: true,
  });

  const [startConversation, { isLoading: startLoad }] =
    useStartConversationMutation();
  const [
    createMessageByAgent,
    { isLoading: createLoad, isError: createIsError },
  ] = useCreateMessageByAgentMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (!validID) {
    //   navigate(-1);
    // }

    if (bookData) {
      setData(bookData?.data?.[0] || bookData?.[0]);
      setAllData(bookData);
    }
    refetch();
  }, [bookData]);
  const [createItem] = useCreateItemMutation();

  const handleRequest = async (requestType) => {
    try {
      const isCancel = requestType === 'cancel';
      const actionText = isCancel
        ? 'cancel this booking'
        : 'request a partial payment';
      const processMessage = isCancel
        ? 'Cancel Booking...'
        : 'Processing Partial Payment Request...';
      const successMessage = isCancel
        ? 'Your booking has been canceled'
        : 'Partial payment request has been submitted';

      setProcessMessage(processMessage);

      const isConfirmed = await Swal.fire({
        text: `Are you sure you want to ${actionText}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--primary)',
        cancelButtonColor: 'var(--crimson)',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });

      if (isConfirmed.value) {
        setIsDone(false);

        // Set URL and payload based on request type
        const payload = {
          agentId: agentId,
          ...(isCancel ? { bookingId: id } : { remarks: 'partial check' }),
        };

        const method = 'PATCH';
        const url = isCancel
          ? `/booking/agentBookingCancel/${agentId}?bookingId=${id}`
          : `/agent/partialPaymentRequest/${id}?agentId=${agentId}&remarks=partial request`;

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

        if (result?.data?.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: successMessage,
            showConfirmButton: true,
            confirmButtonColor: 'var(--primary)',
            customClass: {
              popup: 'custom-swal-popup',
            },
          });
        } else {
          throw new Error(
            result?.data?.message || result?.error?.data?.message
          );
        }
      }
    } catch (error) {
      setIsDone(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.message || 'Something went wrong!',
        confirmButtonColor: 'var(--primary)',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
    } finally {
      setIsDone(true);
      refetch();
    }
  };
  const currency = companyInfo?.currencyType;
  const titles = [
    '<div style="font-size: 14px; color: var(--primary);">Issue with full payment</div>',
    `<div style="font-size: 12px; color: var(--primary-rgb); margin-bottom:20px; font-weight:400;">Your Balance: ${
      agentData?.mywallet || 0
    } ${currency}</div>`,
    '<div style="font-size: 14px; color: var(--primary);">Amount to Pay</div>',
    `<div style="font-size: 16px; color: var(--green-light); display: flex; align-items: center; justify-content: center;"><img src="${
      ImageImport.taka
    }" alt=""/>&nbsp;&nbsp;
    <span> ${data?.totalClientPrice || 0} ${currency}</span> </div>`,
  ];
  const partialTitles = [
    '<div style="font-size: 16px; color: var(--primary);">Issue with partial payment</div>',
    `<div style="font-size: 14px; color: var(--primary-rgb); margin:20px 0; font-weight:400;">Your Balance: <strong> ${agentData?.mywallet}</strong> ${currency}</div>`,
    '<div style="font-size: 14px; color: var(--primary);">Amount to Pay</div>',
    `<div style="font-size: 16px; color: var(--green-light); display: flex; align-items: center; justify-content: center;"><img src="${
      ImageImport.taka
    }" alt=""/>&nbsp;&nbsp;
    <span> ${data?.partialPayAmount || 0} ${currency}</span> </div>`,
    `<div style="font-size: 11px; color: var(--secondary);">Due Date: ${moment(
      data?.dueDate
    ).format('DD MMM YYYY hh:mm A')}</div>`,
  ];
  const dueTitles = [
    '<div style="font-size: 16px; color: var(--primary);">Pay partial due</div>',
    `<div style="font-size: 14px; color: var(--primary-rgb); margin:20px 0; font-weight:400;">Your Balance: <strong> ${agentData?.mywallet}</strong> ${currency}</div>`,
    '<div style="font-size: 14px; color: var(--primary);">Amount to Pay</div>',
    `<div style="font-size: 16px; color: var(--green-light); display: flex; align-items: center; justify-content: center;"><img src="${
      ImageImport.taka
    }" alt=""/>&nbsp;&nbsp;
    <span> ${data?.dueAmount || 0} ${currency}</span> </div>`,
  ];
  const handleIssueWithPartial = async (text) => {
    try {
      const titlesHTML =
        text === 'issue'
          ? titles.join('')
          : text === 'partial'
          ? partialTitles.join('')
          : dueTitles.join('');
      setProcessMessage('Processing your request...');
      const isConfirmed = await Swal.fire({
        title: titlesHTML,
        showCancelButton: true,
        confirmButtonColor: 'var(--primary)',
        cancelButtonColor: 'var(--crimson)',
        confirmButtonText:
          text === 'issue'
            ? 'Issue Now'
            : text === 'due'
            ? 'Pay Now'
            : 'Issue Now',
        cancelButtonText:
          '<span style="color: white; padding: 5px 5px; font-weight:400;">Not Now</span>',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });

      if (isConfirmed.value) {
        setIsDone(false);
        const payload = {
          agentId: agentId,
          bookingId: id,
          issueId: data?.issueId,
          paidAmount: data?.dueAmount || 0,
        };
        const method = text === 'issue' ? 'PATCH' : 'POST';

        const url =
          text === 'partial'
            ? `/agent/issueWithPartialPay/${id}?agentId=${agentId}`
            : text === 'due'
            ? `/agent/payParitalDueAmount`
            : `/agent/bookingIssueRequest/${id}?agentId=${agentId}`;

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
        if (result?.data?.status === 'success') {
          Swal.fire({
            position: 'center',
            title:
              text === 'issue'
                ? result?.data?.res?.status === 'TICKETED'
                  ? 'Ticketed Successfully'
                  : 'Issue request submitted'
                : text === 'due'
                ? 'Due amount paid successfully'
                : `${
                    result?.data?.res?.status === 'TICKETED'
                      ? 'Ticketed with partial payment'
                      : 'Issue request submitted with partial payment'
                  }`,

            html: `<span style="color: var(--primary); font-size: 12px;">${
              text === 'issue' && result?.data?.res?.status === 'TICKETED'
                ? 'Thank you so much for Issuing a flight ticket.'
                : 'We are actively processing your tickets and anticipate sending you the confirmation and invoice shortly after issuance.'
            }</span>`,
            showConfirmButton: true,
            confirmButtonColor: 'var(--primary)',
            customClass: {
              popup: 'custom-swal-popup',
            },
            imageUrl: `${responseimg.requestsuccess}`,
          });
          refetch();
          aRefetch();
        } else {
          throw new Error(
            result?.data?.message || result?.error?.data?.message
          );
        }
      }
    } catch (error) {
      setIsDone(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error || 'Something went wrong!',
        confirmButtonColor: 'var(--primary)',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
    } finally {
      setIsDone(true);
      refetch();
      aRefetch();
    }
  };

  const handleRefundRequest = async (status, name) => {
    try {
      setProcessMessage(`${status} ${name} this ticket...`);
      const isConfirmed = await Swal.fire({
        title: `<div style="font-size: 18px; color: var(--primary);">Are you sure you want to ${status} this ticket?</div>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--primary)',
        cancelButtonColor: 'var(--crimson)',
        confirmButtonText:
          '<span style="color: white; padding: 5px 20px;">OK</span>',
        cancelButtonText:
          '<span style="color: white; padding: 5px 20px;">Not Now</span>',

        customClass: {
          popup: 'custom-swal-popup',
        },
      });

      if (isConfirmed.value) {
        setIsDone(false);
        const method = 'PATCH';

        const refundUrl = `agent/quoteGenerationApproval/${id}?refundId=${data?.refundId}&agentId=${agentId}&status=${name}`;
        const reissueUrl = `agent/reissueQuoteGenerationApproval/${id}?reissueId=${data?.reissueId}&agentId=${agentId}&status=${name}`;
        const url = status === 'Refund' ? refundUrl : reissueUrl;
        const headers = {
          accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const result = await createItem({
          url,
          method,
          headers,
        });
        if (result?.data?.status === 'success') {
          Swal.fire({
            position: 'center',
            title: `${name} Request Submitted`,
            html:
              name === 'DECLINED'
                ? ''
                : '<span style="color: var(--primary); font-size: 12px;">We are actively processing your Refund and anticipate sending you the confirmation and invoice shortly after issuance.</span>',
            showConfirmButton: true,
            confirmButtonColor: 'var(--primary)',
            customClass: {
              popup: 'custom-swal-popup',
            },
            imageUrl: `${responseimg.requestsuccess}`,
          });

          aRefetch();
        } else {
          throw new Error(
            result?.data?.message || result?.error?.data?.message
          );
        }
      }
    } catch (error) {
      setIsDone(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error || 'Something went wrong!',
        confirmButtonColor: 'var(--primary)',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
    } finally {
      setIsDone(true);
      refetch();
    }
  };

  const handleExtendTime = async () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: 'Maximum time has already been provided!',
      showConfirmButton: true,
      timer: 5000,
      confirmButtonColor: 'var(--primary)',
      customClass: {
        popup: 'custom-swal-popup',
      },
    });
  };

  const handleReissue = () => {
    navigate(`/dashboard/request/reissue/${id}`);
  };
  const handleRefund = () => {
    navigate(`/dashboard/request/refund/${id}`);
  };
  const handleVoid = () => {
    navigate(`/dashboard/request/void/${id}`);
  };
  const travelDate = new Date(data?.travelDate);
  let today = new Date().toISOString();
  let todayFormat = moment(today).format('YYYY-MM-DDTHH:mm');
  let ticketDate = data?.lastUpdatedAt
    ? moment(data?.lastUpdatedAt).format('YYYY-MM-DD') + 'T23:00'
    : null;
  const isTravelWithin24Hours =
    new Date(travelDate) - new Date() <= 24 * 60 * 60 * 1000;
  const voidCheck =
    data?.gds !== 'SOTO_A' &&
    (data?.status === 'MANUAL_TICKETED' ||
      data?.status === 'TICKETED' ||
      data?.status === 'TICKET_VOIDED') &&
    ticketDate &&
    todayFormat <= ticketDate &&
    !isTravelWithin24Hours;

  const [hasRefetched, setHasRefetched] = useState(false);
  const createRenderer =
    (type) =>
    // eslint-disable-next-line react/prop-types
    ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        if (!hasRefetched) {
          refetch();
          setHasRefetched(true);
        }
        return null;
      } else {
        return (
          <Box>
            The {type || 'Booking'} will expire in {days} day(s), {hours}{' '}
            hour(s), {minutes} minute(s), and {seconds} second(s).
          </Box>
        );
      }
    };
  const agentTicketingTimeLimit = new Date(data?.agentTicketingTimeLimit);
  const reissueQuotationTimeLimit = new Date(data?.reissueQuotationTimeLimit);
  const refundQuotationTimeLimit = new Date(data?.refundQuotationTimeLimit);
  const todayForPartial = new Date();
  const differenceInTime = travelDate.getTime() - todayForPartial.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  const isOverFourDays = differenceInDays > 4;
  const isOverThreeDays = differenceInDays > 3;

  const requestforpartial =
    data?.status === 'BOOKING_HOLD' &&
    data?.partialAvailable === false &&
    data?.partialRequestStatus === null &&
    isOverFourDays;
  const partialAvailableCheck = data?.partialAvailable && isOverThreeDays;
  return (
    <>
      {!showChat ? (
        <Box minHeight="100vh" mb={{ xs: 9, md: 2 }}>
          <HeaderTitle
            headerTitle={`Booking Details`}
            loading={loading}
            setRefetch={refetch}
            setLoading={setLoading}
            showCustomButtons={false}
            backButtonText={
              path ? '/dashboard/partial' : '/dashboard/bookinghistory'
            }
          />

          {isLoading || loading ? (
            <Container sx={{ pt: 3 }}>
              <BookingDetailsLoader />
            </Container>
          ) : (
            <Container sx={{ px: { xs: 1, sm: 2, md: '' } }}>
              <Box my={3}>
                <Grid
                  container
                  spacing={{ xs: 3, md: 1 }}
                  justifyContent={'space-between'}
                >
                  <Grid item width={{ xs: '100%', sm: 'auto' }}>
                    <Box>
                      <Grid
                        container
                        spacing={{ xs: 1.5, md: 1.5 }}
                        justifyContent={{
                          xs: 'space-between',
                          md: 'flex-start',
                        }}
                      >
                        {(data?.status === 'MANUAL_TICKETED' ||
                          data?.status === 'TICKETED' ||
                          data?.status === 'VOID_REJECTED' ||
                          data?.status === 'TICKET_VOIDED' ||
                          data?.status === 'REISSUE_REJECTED' ||
                          data?.status === 'REFUND_COMPLETED' ||
                          data?.status === 'REISSUE_COMPLETED' ||
                          data?.status === 'REFUND_QUOTE_REJECTED' ||
                          data?.status === 'REISSUE_QUOTE_REJECTED' ||
                          data?.status === 'REFUND_REJECTED') && (
                          <>
                            <Grid item xs={6} sm="auto" md="auto">
                              <CustomButton
                                fontSize={{ xs: 12, md: 14 }}
                                value="Refund"
                                textcolor="var(--primary)"
                                bgcolor="var(--white)"
                                hovercolor="var(--white)"
                                width="100%"
                                padding={{ xs: '4px 20px', md: '4px 15px' }}
                                borderRadius="5px"
                                startIcon={
                                  <CurrencyExchangeOutlinedIcon
                                    style={{ fontSize: 14 }}
                                  />
                                }
                                border="1px solid var(--stroke)"
                                handleClick={handleRefund}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sm="auto"
                              md="auto"
                              sx={{
                                display:
                                  data?.paymentStatus === 'PARTIALLY_PAID' ||
                                  data?.paymentStatus ===
                                    'PARTIAL_PAY_INSTALLMENT'
                                    ? 'none'
                                    : 'block',
                              }}
                            >
                              <CustomButton
                                fontSize={{ xs: 12, md: 14 }}
                                value="Re-Issue"
                                textcolor="var(--primary)"
                                bgcolor="var(--white)"
                                width="100%"
                                hovercolor="var(--white)"
                                padding={{ xs: '4px 20px', md: '4px 15px' }}
                                borderRadius="5px"
                                startIcon={
                                  <CurrencyExchangeOutlinedIcon
                                    style={{ fontSize: 14 }}
                                  />
                                }
                                border="1px solid var(--stroke)"
                                handleClick={handleReissue}
                              />
                            </Grid>
                            {voidCheck && (
                              <Grid item xs={6} sm="auto" md="auto">
                                <CustomButton
                                  fontSize={{ xs: 12, md: 14 }}
                                  value="Void"
                                  textcolor="var(--primary)"
                                  bgcolor="var(--white)"
                                  hovercolor="var(--white)"
                                  width="100%"
                                  padding={{ xs: '4px 20px', md: '4px 15px' }}
                                  borderRadius="5px"
                                  startIcon={
                                    <CurrencyExchangeOutlinedIcon
                                      style={{ fontSize: 14 }}
                                    />
                                  }
                                  border="1px solid var(--stroke)"
                                  handleClick={handleVoid}
                                />
                              </Grid>
                            )}

                            {/* <Grid item xs={6} sm="auto" md="auto">
                        <Box display={{ xs: 'none', md: 'block' }}>
                          <CustomButton
                            fontSize={{ xs: 12, md: 14 }}
                            value="No Show"
                            textcolor="var(--white)"
                            bgcolor="var(--black)"
                            hovercolor="var(--black)"
                            width="100%"
                            padding={{ xs: '2px 10px', md: '4px 15px' }}
                            borderRadius="5px"
                            startIcon={
                              <VisibilityOffIcon style={{ fontSize: 14 }} />
                            }
                            border="1px solid var(--secondary)"
                            // handleClick
                          />
                        </Box>
                      </Grid> */}
                          </>
                        )}

                        {data?.status === 'REFUND_QUOTED' && (
                          <>
                            <Grid item xs={6} sm="auto" md="auto">
                              <CustomButton
                                value="Quotation Approve"
                                textcolor="var(--white)"
                                bgcolor="var(--dark-green)"
                                hovercolor="var(--dark-green)"
                                width="100%"
                                padding={{ xs: '4px 20px', md: '4px 15px' }}
                                fontSize={{ xs: 12, md: 14 }}
                                handleClick={() =>
                                  handleRefundRequest('Refund', 'APPROVED')
                                }
                              />
                            </Grid>
                            <Grid item xs={6} sm="auto" md="auto">
                              <CustomButton
                                value="Reject"
                                textcolor="var(--white)"
                                bgcolor="var(--red)"
                                width="100%"
                                hovercolor="var(--red)"
                                padding={{ xs: '4px 20px', md: '4px 15px' }}
                                fontSize={{ xs: 12, md: 14 }}
                                handleClick={() =>
                                  handleRefundRequest('Refund', 'DECLINED')
                                }
                              />
                            </Grid>
                          </>
                        )}
                        {data?.status === 'REISSUE_QUOTED' && (
                          <>
                            <Grid item xs={6} sm="auto" md="auto">
                              <CustomButton
                                value="Quotation Approve"
                                textcolor="var(--white)"
                                bgcolor="var(--dark-green)"
                                hovercolor="var(--dark-green)"
                                width="100%"
                                padding={{ xs: '4px 20px', md: '4px 15px' }}
                                fontSize={{ xs: 12, md: 14 }}
                                handleClick={() =>
                                  handleRefundRequest('Reissue', 'APPROVED')
                                }
                              />
                            </Grid>
                            <Grid item xs={6} sm="auto" md="auto">
                              <CustomButton
                                value="Reject"
                                textcolor="var(--white)"
                                bgcolor="var(--red)"
                                width="100%"
                                hovercolor="var(--red)"
                                padding={{ xs: '4px 20px', md: '4px 15px' }}
                                fontSize={{ xs: 12, md: 14 }}
                                handleClick={() =>
                                  handleRefundRequest('Reissue', 'DECLINED')
                                }
                              />
                            </Grid>
                          </>
                        )}
                        {data?.status === 'BOOKING_HOLD' && (
                          <>
                            <Grid item xs={6} sm="auto" md="auto">
                              <CustomButton
                                value="Issue With Balance"
                                textcolor="var(--white)"
                                bgcolor="var(--dark-green)"
                                hovercolor="var(--dark-green)"
                                width="100%"
                                padding={{ xs: '4px 20px', md: '4px 15px' }}
                                fontSize={{ xs: 12, md: 14 }}
                                handleClick={() =>
                                  handleIssueWithPartial('issue')
                                }
                              />
                            </Grid>
                            {partialAvailableCheck && (
                              <Grid item xs={6} sm="auto" md="auto">
                                <CustomButton
                                  value="Issue With Partial"
                                  textcolor="var(--white)"
                                  bgcolor="var(--orengel)"
                                  hovercolor="var(--orengel)"
                                  width="100%"
                                  padding={{ xs: '4px 20px', md: '4px 15px' }}
                                  fontSize={{ xs: 12, md: 14 }}
                                  handleClick={() =>
                                    handleIssueWithPartial('partial')
                                  }
                                />
                              </Grid>
                            )}
                          </>
                        )}

                        {/* <Grid item>
                <CustomButton
                  value="Issue With Card/MFS"
                  textcolor="var(--white)"
                  bgcolor="var(--pest)"
                  hovercolor="var(--pest)"
                  padding="3px 10px"
                  fontSize={{ xs: 12, md: 14 }}
                  // handleClick
                />
              </Grid> */}
                        {data?.status === 'BOOKING_HOLD' && (
                          <>
                            <Grid
                              item
                              xs={6}
                              sm="auto"
                              md="auto"
                              display={{ xs: 'none', md: 'block' }}
                            >
                              <CustomButton
                                value="Extend Time Limit"
                                textcolor="var(--white)"
                                bgcolor="var(--dark-sky)"
                                hovercolor="var(--dark-sky)"
                                width="100%"
                                padding={{ xs: '4px 20px', md: '4px 15px' }}
                                fontSize={{ xs: 12, md: 14 }}
                                handleClick={handleExtendTime}
                              />
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Box>
                  </Grid>

                  <Grid item width={{ xs: '100%', sm: 'auto' }}>
                    <Box>
                      <Grid
                        container
                        columnSpacing={1.5}
                        justifyContent={{ xs: 'space-between', md: 'flex-end' }}
                      >
                        {data?.status === 'BOOKING_HOLD' && (
                          <Grid item xs={6} sm="auto" md="auto">
                            <CustomButton
                              value="Cancel Booking"
                              textcolor="var(--white)"
                              bgcolor="var(--crimson)"
                              hovercolor="var(--yellow)"
                              width="100%"
                              padding={{ xs: '4px 20px', md: '4px 15px' }}
                              fontSize={{ xs: 12, md: 14 }}
                              disabled={!isDone ? true : false}
                              handleClick={() => handleRequest('cancel')}
                            />
                          </Grid>
                        )}
                        {requestforpartial && (
                          <Grid item xs={6} sm="auto" md="auto">
                            <CustomButton
                              value="Request for Partial "
                              textcolor="var(--white)"
                              bgcolor="var(--yellow)"
                              hovercolor="var(--yellow)"
                              width="100%"
                              padding={{ xs: '4px 20px', md: '4px 15px' }}
                              fontSize={{ xs: 12, md: 14 }}
                              disabled={!isDone ? true : false}
                              handleClick={() =>
                                handleRequest('partialPayment')
                              }
                            />
                          </Grid>
                        )}

                        {/* {(data?.paymentStatus === 'PARTIALLY_PAID' ||
                      data?.paymentStatus === 'PARTIAL_PAY_INSTALLMENT') &&
                      data?.status !== 'ISSUE_CANCELLED' &&
                      data?.status !== 'REFUND_COMPLETED' &&
                      data?.status !== 'TICKET_VOIDED' && (
                        <Grid item xs={6} sm="auto" md="auto">
                          <CustomButton
                            value="Due Date Extend"
                            textcolor="var(--white)"
                            bgcolor="var(--crimson)"
                            hovercolor="var(--crimson)"
                            width="100%"
                            padding={{ xs: '4px 20px', md: '4px 15px' }}
                            fontSize={{ xs: 12, md: 14 }}
                            handleClick={() => handleIssueWithPartial('due')}
                          />
                        </Grid>
                      )} */}
                        {(data?.paymentStatus === 'PARTIALLY_PAID' ||
                          data?.paymentStatus === 'PARTIAL_PAY_INSTALLMENT') &&
                          data?.status !== 'ISSUE_CANCELLED' &&
                          data?.status !== 'REFUND_COMPLETED' &&
                          data?.status !== 'TICKET_VOIDED' && (
                            <Grid item xs={6} sm="auto" md="auto">
                              <CustomButton
                                value="Pay Due"
                                textcolor="var(--white)"
                                bgcolor="var(--orengel)"
                                hovercolor="var(--orengel)"
                                width="100%"
                                padding={{ xs: '4px 20px', md: '4px 15px' }}
                                fontSize={{ xs: 12, md: 14 }}
                                handleClick={() =>
                                  handleIssueWithPartial('due')
                                }
                              />
                            </Grid>
                          )}

                        <Grid item xs={6} sm="auto" md="auto">
                          <GetSupportButton
                            fontSize={{ xs: 12, md: 14 }}
                            value="Get Chat Support"
                            textcolor="var(--primary)"
                            bgcolor="var(--gray)"
                            hovercolor="var(--gray)"
                            width="100%"
                            padding={{ xs: '3px 10px', md: '4px 15px' }}
                            borderRadius="5px"
                            border="1px solid var(--primary)"
                            onClick={() => setOpen(true)}
                            onClick1={() => dispatch(toggleShowChat())}
                          />
                        </Grid>

                        <Grid item xs={6} sm="auto" md="auto">
                          <Download data={data} agentData={agentData} />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {data?.status === 'ISSUE_REQUEST' && (
                <Box
                  sx={{
                    color: 'var(--crimson)',
                    fontSize: 14,
                    fontWeight: 400,
                    mb: 1,
                    border: '1px solid var(--crimson)',
                    borderRadius: '5px',
                    p: '2px 5px',
                    width: 'fit-content',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <HourglassTopIcon
                    sx={{
                      fontSize: 18,
                    }}
                  />
                  {noticeText}
                </Box>
              )}
              <Grid container columnSpacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={12}>
                  <Box
                    sx={{
                      bgcolor: 'var(--white)',
                      borderRadius: '5px',
                      p: { xs: 1.5, md: 2 },
                    }}
                  >
                    <Grid container spacing={2} alignItems="center" pb={2}>
                      <Grid item>
                        <Typography
                          sx={{
                            color: 'var(--black)',
                            fontSize: { xs: 14, md: 20 },
                            fontWeight: 500,
                          }}
                        >
                          {data?.route || ''}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          className={`${data?.status?.toLowerCase()}`}
                          sx={{
                            px: 1,
                            py: 0.2,
                            fontSize: 14,
                            textTransform: 'capitalize',
                            bgcolor: 'var(--yellow)',
                            borderRadius: 1,
                            color: 'var(--white)',
                          }}
                        >
                          {data?.status === 'BOOKING_HOLD'
                            ? 'Hold'
                            : data?.status === 'MANUAL_TICKETED'
                            ? 'Ticketed'
                            : data?.status === 'REFUND_PRELIMINARY_COMPLETED'
                            ? 'Accounts is processing the refund; it’ll be credited soon'
                            : data?.status === 'PARTIAL_REFUND_INITIATED'
                            ? 'Refund Initiated'
                            : data?.status?.replace(/_/g, ' ').toLowerCase()}
                        </Typography>
                      </Grid>

                      {(data?.paymentStatus === 'PARTIALLY_PAID' ||
                        data?.paymentStatus === 'PARTIAL_PAY_INSTALLMENT' ||
                        data?.paymentStatus === 'FULLY_PAID' ||
                        data?.paymentStatus === 'PARTIAL_REFUND_INITIATED' ||
                        data?.paymentStatus === 'PARTIAL_PAYMENT_FAILED') && (
                        <>
                          <Grid item>
                            <Typography
                              sx={{
                                px: 1,
                                py: 0.3,
                                fontSize: 13,
                                textTransform: 'capitalize',
                                bgcolor: 'var(--orengel)',
                                borderRadius: 1,
                                color: 'var(--white)',
                              }}
                            >
                              {data?.paymentStatus === 'FULLY_PAID'
                                ? 'Paid'
                                : data?.paymentStatus
                                    ?.replace(/_/g, ' ')
                                    .toLowerCase()}
                            </Typography>
                          </Grid>
                        </>
                      )}

                      {(data?.paymentStatus === 'PARTIALLY_PAID' ||
                        data?.paymentStatus === 'PARTIAL_PAY_INSTALLMENT') &&
                        data?.status !== 'REFUND_COMPLETED' &&
                        data?.status !== 'TICKET_VOIDED' && (
                          <>
                            <Grid item>
                              <Typography
                                sx={{
                                  px: 1,
                                  py: 0.3,
                                  fontSize: 13,
                                  textTransform: 'capitalize',
                                }}
                                className="due-amount"
                              >
                                Due Amount: {commaNumber(data?.dueAmount || 0)}{' '}
                                {currency}
                              </Typography>
                            </Grid>
                            {data?.status !== 'PARTIAL_REFUND_INITIATED' &&
                              data?.status !== 'ISSUE_CANCELLED' && (
                                <Grid item>
                                  <Typography
                                    sx={{
                                      px: 1,
                                      py: 0.3,
                                      fontSize: 13,
                                      textTransform: 'capitalize',
                                    }}
                                    className="due-date"
                                  >
                                    Due Date:{' '}
                                    {moment(data?.dueDate).format(
                                      'DD MMM YYYY hh:mm A'
                                    )}
                                  </Typography>
                                </Grid>
                              )}
                          </>
                        )}

                      {data?.status === 'BOOKING_HOLD' && (
                        <Grid item>
                          <Box
                            sx={{
                              bgcolor: 'var(--yellow-light)',
                              py: 0.3,
                              px: 1,
                              fontSize: { xs: 12, md: 13 },
                              display: 'flex',
                              alignItems: 'center',
                              width: 'fit-content',
                              borderRadius: '5px',
                              span: {
                                color: 'var(--secondary)',
                              },
                            }}
                          >
                            <InfoOutlined
                              sx={{ color: 'var(--red)', fontSize: 16, mr: 1 }}
                            />

                            <Box>
                              <Countdown
                                date={agentTicketingTimeLimit}
                                renderer={createRenderer('Booking')}
                              />
                            </Box>
                          </Box>
                        </Grid>
                      )}
                      {(data?.status === 'REISSUE_QUOTED' ||
                        data?.status === 'REFUND_QUOTED') && (
                        <Grid item>
                          <Box
                            sx={{
                              bgcolor: 'var(--yellow-light)',
                              py: 0.3,
                              px: 1,
                              fontSize: { xs: 12, md: 13 },
                              display: 'flex',
                              alignItems: 'center',
                              width: 'fit-content',
                              borderRadius: '5px',
                              span: {
                                color: 'var(--secondary)',
                              },
                            }}
                          >
                            <InfoOutlined
                              sx={{ color: 'var(--red)', fontSize: 16, mr: 1 }}
                            />

                            <Box>
                              <Countdown
                                date={
                                  data?.status === 'REISSUE_QUOTED'
                                    ? reissueQuotationTimeLimit
                                    : data?.status === 'REFUND_QUOTED'
                                    ? refundQuotationTimeLimit
                                    : null
                                }
                                renderer={createRenderer(
                                  formatFieldName(data?.status)
                                )}
                              />
                            </Box>
                          </Box>
                        </Grid>
                      )}
                      {(data?.status === 'BOOKING_HOLD' ||
                        data?.status === 'EXPIRED') && (
                        <Grid item>
                          <Typography
                            sx={{
                              px: 1,
                              py: 0.2,
                              fontSize: 14,
                              color: 'var(--red)',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              border: '1px solid red',
                              borderRadius: '5px',
                            }}
                          >
                            <InfoOutlined
                              sx={{ color: 'var(--red)', fontSize: 16, mr: 1 }}
                            />{' '}
                            Booking time is not guaranteed, airlines may cancel
                            at any time.
                          </Typography>
                        </Grid>
                      )}
                      {data?.status === 'REFUND_REQUESTED' && (
                        <Grid item xs={12}>
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
                            }}
                          >
                            <InfoOutlined
                              sx={{ color: 'var(--red)', fontSize: 16, mr: 1 }}
                            />{' '}
                            Please note that this is a no-show refund, and
                            processing times may be longer than usual as it
                            depends on the airline’s policy.
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                    <Remarks data={data} />

                    <Grid container spacing={{ xs: 1, md: 2 }}>
                      <Grid item>
                        <Card
                          title={'Booking Id'}
                          value={data?.bookingRef || 'N/A'}
                          valueColor={'var(--white)'}
                          idcolor
                        />
                      </Grid>
                      <Grid item>
                        <Card
                          title={'Booking Created'}
                          value={moment(data?.createdAt).format(
                            'DD MMM YYYY hh:mm A'
                          )}
                          textTransform="UpperCase"
                        />
                      </Grid>
                      {data?.status === 'BOOKING_HOLD' && (
                        <Grid item>
                          <Card
                            title={'Ticketing Time Limit'}
                            value={moment(data?.agentTicketingTimeLimit).format(
                              'DD MMM YYYY hh:mm A'
                            )}
                            textTransform="UpperCase"
                          />
                        </Grid>
                      )}

                      <Grid item>
                        <Card title={'PNR'} value={data?.pnr} />
                      </Grid>
                      <Grid item>
                        <Card
                          title={'Airline PNR'}
                          value={data?.airlinesPNR || 'N/A'}
                        />
                      </Grid>

                      <Grid item>
                        <Card
                          title={'Refundable'}
                          valueColor={data?.refundable ? '' : 'red'}
                          value={data?.refundable ? 'Yes' : 'No' || 'N/A'}
                        />
                      </Grid>

                      <Grid item>
                        <Stack
                          direction={'row'}
                          sx={{ borderRadius: '5px', overflow: 'hidden' }}
                        >
                          <Box minWidth="110px">
                            <Card
                              title={'Total amount'}
                              value={`${commaNumber(
                                data?.totalClientPrice || 0
                              )} ${currency}`}
                              bgcolor={'var(--green)'}
                              radius="0"
                            />
                          </Box>
                          {data?.partialAvailable ? (
                            <>
                              {(data?.paymentStatus === 'PARTIALLY_PAID' ||
                                data?.paymentStatus ===
                                  'PARTIAL_PAY_INSTALLMENT' ||
                                data?.paymentStatus === null) && (
                                <Card
                                  title={'Partial pay amount'}
                                  value={`${commaNumber(
                                    data?.partialPayAmount || 0
                                  )} ${currency}`}
                                  bgcolor={'var(--yellow-light)'}
                                  radius="0"
                                />
                              )}
                            </>
                          ) : (
                            ''
                          )}
                        </Stack>
                      </Grid>
                    </Grid>

                    <Box>
                      {(data?.status === 'REISSUE_QUOTED' ||
                        data?.status === 'REISSUE_REQUESTED') && (
                        <Box>
                          <Grid container spacing={1} mt={1}>
                            {data?.depDate !== null && (
                              <Grid item>
                                <Typography
                                  sx={{
                                    color: 'var(--primary)',
                                    fontSize: 14,
                                    bgcolor: 'var(--light-stroke)',
                                    width: 'fit-content',
                                    px: 2,
                                    borderRadius: 1,
                                    py: 0.3,
                                  }}
                                >
                                  Reissue Departure Date {data?.depDate}
                                </Typography>
                              </Grid>
                            )}
                            {data?.returnDate !== null && (
                              <Grid item>
                                <Typography
                                  sx={{
                                    color: 'var(--primary)',
                                    fontSize: 14,
                                    bgcolor: 'var(--light-stroke)',
                                    width: 'fit-content',
                                    px: 2,
                                    borderRadius: 1,
                                    py: 0.3,
                                  }}
                                >
                                  Reissue Return Date {data?.returnDate}
                                </Typography>
                              </Grid>
                            )}
                            <Grid item>
                              <Typography
                                sx={{
                                  color: 'var(--primary)',
                                  fontSize: 14,
                                  bgcolor: 'var(--light-stroke)',
                                  width: 'fit-content',
                                  px: 2,
                                  borderRadius: 1,
                                  py: 0.3,
                                }}
                              >
                                <PaxCount
                                  reissuedPassengers={
                                    allData?.data[0].passengers
                                  }
                                />
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      )}

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
                          Flight Information
                        </Typography>
                      </Stack>
                      <FlightItinerary data={data?.segments} />
                    </Box>
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
                          <Accordion
                            handleExpand={() => handleExpand('refundSummary')}
                            value={expandedState?.refundSummary}
                            content={'Refund Summary'}
                          />

                          <Collapse in={expandedState?.refundSummary}>
                            <RefundReissueVoidSummary
                              sign={'-'}
                              text={'Total Refundable Amount'}
                              amount={data?.refundedAmount}
                              penalty={data?.refundAirlinePenaltyAmount}
                              service={data?.refundServiceFee}
                              useAmount={data?.useAmount}
                              textDiff={data?.refundNonRefundableTax || 0}
                            />
                          </Collapse>
                        </Box>
                      )}
                      {(data?.status === 'REISSUE_COMPLETED' ||
                        data?.status === 'REISSUE_QUOTED' ||
                        data?.status === 'REISSUE_QUOTE_APPROVED') && (
                        <Box>
                          <Accordion
                            handleExpand={() => handleExpand('reissuedSummary')}
                            value={expandedState?.reissuedSummary}
                            content={'Reissued Summary'}
                          />

                          <Collapse in={expandedState?.reissuedSummary}>
                            <RefundReissueVoidSummary
                              text={'Total Reissued Amount'}
                              amount={data?.reissuedAmount}
                              penalty={data?.reissuAirlinePenaltyAmount}
                              service={data?.reissuServiceFee}
                              reissuedFareDiff={
                                data?.reissuedFareDifference || 0
                              }
                              textDiff={data?.reissueTaxDifference || 0}
                            />
                          </Collapse>
                        </Box>
                      )}
                      {data?.status === 'TICKET_VOIDED' && (
                        <Box>
                          <Accordion
                            handleExpand={() => handleExpand('voidedSummary')}
                            value={expandedState?.voidedSummary}
                            content={'Voided Summary'}
                          />

                          <Collapse in={expandedState?.voidedSummary}>
                            <RefundReissueVoidSummary
                              sign={'-'}
                              text={'Total Voided Amount'}
                              amount={data?.voidedAmount}
                              penalty={data?.voidAirlinePenaltyAmount}
                              service={data?.voidServiceFee}
                            />
                          </Collapse>
                        </Box>
                      )}
                    </Box>
                    <Box>
                      <Accordion
                        handleExpand={() => handleExpand('agentFares')}
                        value={expandedState?.agentFares}
                        content={'Agent Fare Summary'}
                      />

                      <Collapse in={expandedState?.agentFares}>
                        <FareDetails
                          data={data?.passengers}
                          allData={data}
                          agent={'agent'}
                        />
                      </Collapse>
                    </Box>

                    <Box>
                      <Accordion
                        handleExpand={() => handleExpand('customerFare')}
                        value={expandedState?.customerFare}
                        content={'Customer Fare Summary'}
                      />

                      <Collapse in={expandedState?.customerFare}>
                        <Box>
                          {isLoading ? (
                            'Loading'
                          ) : (
                            <CustomerFares bookingId={id} allData={data} />
                          )}
                        </Box>
                      </Collapse>
                    </Box>

                    <Box>
                      <Accordion
                        handleExpand={() => handleExpand('passengers')}
                        value={expandedState?.passengers}
                        content={'Passenger Information'}
                      />
                      <Collapse in={expandedState?.passengers}>
                        <PassengerDetails
                          data={data?.passengers}
                          allData={data}
                        />
                      </Collapse>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <ChatBotButton onClick={() => dispatch(toggleShowChat())} />
            </Container>
          )}
          {!isDone && <Processoing content={processMessage || ''} />}

          <ChatBot
            fData={data}
            data={message}
            mesError={mesError}
            mesRefetch={mesRefetch}
            mesIsLoading={mesIsLoading}
            startConversation={startConversation}
            createMessageByAgent={createMessageByAgent}
            createLoad={createLoad}
            createIsError={createIsError}
            startLoad={startLoad}
            bookingRef={data?.booking?.bookingRef}
            statusConstants={statusConstants}
            setOpen={setOpen}
            open={open}
          />
        </Box>
      ) : (
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <SmallChatBot
            fData={data}
            data={message}
            mesError={mesError}
            mesRefetch={mesRefetch}
            mesIsLoading={mesIsLoading}
            startConversation={startConversation}
            createMessageByAgent={createMessageByAgent}
            createLoad={createLoad}
            createIsError={createIsError}
            startLoad={startLoad}
            bookingRef={data?.booking?.bookingRef}
            statusConstants={statusConstants}
            onClick={() => dispatch(toggleShowChat())}
          />{' '}
        </Box>
      )}
    </>
  );
};

export default BookingDetails;
