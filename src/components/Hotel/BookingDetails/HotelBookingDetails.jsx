import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import BackButton from '../../Common/BackButton';
import NeedModification from '../content/NeedModification';
import CheckIn from '../content/CheckIn';
import RoomList from '../RoomCard';
import PriceBreakup from '../content/PriceBreakup';
import Token from '../../Common/Token';
import { useParams } from 'react-router-dom';
import { useGetItemsQuery } from '../../../redux/slices/apiSlice';
import { baseUrlHotel } from '../../../../baseurl';
import { useEffect, useState } from 'react';
import HotelPdf from './HotelPdf';
import moment from 'moment';
import HotelOverviewModal from '../modal/HotelOverviewModal';
import EmptyContent from '../../Common/EmptyContent';
import RefreshButton from '../../Common/RefreshButton';
import HotelDetailsSkeleton from '../HotelLoading/HotelDetailsSkeleton';
import HotelTimelineModal from '../modal/HotelTimelineModal';
import HotelCancellation from '../content/HotelCancellation';
import ImportantInfo from '../../Sim/content/ImportantInfo';
import commaNumber from 'comma-number';

import { HotelActionInfoCard } from '../content/HotelActionInfoCard';
import {
  DATE_CHANGE_IN_PROGRESS,
  DATE_CHANGE_QUOTE_APPROVED,
  DATE_CHANGE_QUOTE_EXPIRED,
  DATE_CHANGE_QUOTE_REJECTED,
  DATE_CHANGE_QUOTED,
  DATE_CHANGE_REQUESTED,
  DATE_CHANGED,
  NAME_CHANGE_IN_PROGRESS,
  NAME_CHANGE_REQUEST,
  NAME_CHANGE_REQUEST_REJECTED,
  NAME_CHANGED,
  REFUND_COMPLETED,
  REFUND_IN_PROGRESS,
  REFUND_PRELIMINARY_COMPLETED,
  REFUND_QUOTE_APPROVED,
  REFUND_QUOTE_EXPIRED,
  REFUND_QUOTE_REJECTED,
  REFUND_QUOTED,
  REFUND_REJECTED,
  REFUND_REQUESTED,
} from '../../Utils/hotel/hotel';
import ChatBot from '../../Chat/ChatBot';
import {
  useCreateMessageByAgentMutation,
  useGetChatDataQuery,
  useStartConversationMutation,
} from '../../../redux/slices/hotel/hotelApiSlice';
import { statusConstantsHotel } from '../../Utils/Flight/statusConstants';
import SmallChatBot from '../../Chat/SmallChatBot';
import { ChatBotButton } from '../../Common/ChatBotButton';
import { useDispatch, useSelector } from 'react-redux';
import { setShowChat, toggleShowChat } from '../../../redux/slices/globalSlice';
import HeaderTitle from '../../../common/HeaderTitle';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function calculateTotalGuests(roomAllocation = []) {
  return roomAllocation.reduce(
    (totals, room) => {
      totals.totalAdult += room.adultCount || 0;
      totals.totalChild += room.childCount || 0;
      return totals;
    },
    { totalAdult: 0, totalChild: 0 }
  );
}

const HotelBookingDetails = () => {
  const agentId = Token();
  const dispatch = useDispatch();
  const { id, hotelId } = useParams();
  const showChat = useSelector((state) => state.global.showChat);
  const [loading, setLoading] = useState(false);

  const url = `${baseUrlHotel}/agent-hotel/findOneBookingByAgentId?agentId=${agentId}&bookingId=${id}`;
  const urlHotelDetails = `${baseUrlHotel}/getHotelDetails/${hotelId}`;
  const urltimeline = `${baseUrlHotel}/agent-hotel/hotelBookingTimeLineByBookingId/${id}?agentId=${agentId}`;

  const {
    data: data,
    isLoading,
    refetch,
    error,
    isError,
  } = useGetItemsQuery({
    url,
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

  const {
    data: hotelDetailsData,
    isLoading: hotelIsLoading,
    refetch: hotelRefetch,
    error: hotelErro,
    isError: hotelIsError,
  } = useGetItemsQuery({
    url: urlHotelDetails,
  });

  const {
    data: timeLine,
    isLoading: tlIsLoading,
    refetch: tlRefetch,
    error: tlErro,
    isError: tlIsError,
  } = useGetItemsQuery({
    url: urltimeline,
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    // Fetch data only once when id or hotelId change
    refetch();
    tlRefetch();
    mesRefetch();
    // Don't include refetch, hotelRefetch, tlRefetch in dependencies
  }, [id]);

  // Properly await all refetch calls in handleRefresh
  const handleRefresh = async () => {
    setLoading(true);
    try {
      await Promise.all([refetch(), tlRefetch(), mesRefetch()]);
    } catch (error) {
      // handle error if needed
    } finally {
      setLoading(false);
    }
  };

  const bookingData = data?.booking;

  const freeCancellation =
    bookingData?.guestRoomAllocations?.roomAllocation[0]?.freeCancellation;
  const freeCancellationData = JSON.parse(freeCancellation || '[]')[0] || [];
  const rulesData = freeCancellationData?.rules || [];

  const checkIn = moment(
    bookingData?.guestRoomAllocations?.checkIn?.split('T')[0],
    'YYYY-MM-DD'
  );
  const checkOut = moment(
    bookingData?.guestRoomAllocations?.checkOut?.split('T')[0],
    'YYYY-MM-DD'
  );
  const nights = checkOut?.diff(checkIn, 'days');
  const checkInData = {
    hotelName: bookingData?.guestRoomAllocations?.hotelName,
    hotelRating: bookingData?.guestRoomAllocations?.hotelRating,
    coverImage: bookingData?.guestRoomAllocations?.coverImage,
    address: bookingData?.guestRoomAllocations?.address || 'N/A',
    checkIn,
    checkOut,
    nights,
    roomLength: bookingData?.guestRoomAllocations?.roomAllocation?.length,
  };

  const hotelName = data?.booking?.guestRoomAllocations?.hotelName;
  const checkIn1 = data?.booking?.guestRoomAllocations?.checkIn;
  const checkOut1 = data?.booking?.guestRoomAllocations?.checkOut;
  const roomAllocation =
    data?.booking?.guestRoomAllocations?.roomAllocation?.length;

  const result = calculateTotalGuests(
    data?.booking?.guestRoomAllocations?.roomAllocation
  );

  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        pb: { xs: 10, md: 1 },
      }}
    >
      {!showChat ? (
        <>
          <HeaderTitle
            headerTitle={`Booking Details`}
            show={false} // innerWidth for responsive header
            loading={loading}
            setRefetch={refetch || hotelRefetch || tlRefetch}
            setLoading={setLoading}
            showCustomButtons={false}
          />
          <Container
            sx={{
              px: { xs: 1 },
            }}
          >
            {loading || isLoading ? (
              <HotelDetailsSkeleton />
            ) : isError ? (
              <Box sx={{ p: { xs: 2, md: 5 } }}>
                <EmptyContent
                  message={
                    error?.data?.message ||
                    error?.error ||
                    'Something went wrong. Please try again.'
                  }
                />
              </Box>
            ) : data ? (
              <Box mt={{ xs: 2, md: 4 }}>
                <Grid container spacing={{ xs: 1, md: 2 }}>
                  <Grid item xs={12} md={8}>
                    <Box sx={{ mb: { xs: -1, md: 0 } }}>
                      <CheckIn
                        check
                        data={data}
                        checkInData={checkInData}
                        hotelId={hotelId}
                      />

                      <Grid container spacing={{ xs: 1, md: 2 }}>
                        {[
                          REFUND_REQUESTED,
                          REFUND_IN_PROGRESS,
                          REFUND_REJECTED,
                          REFUND_QUOTED,
                          REFUND_QUOTE_APPROVED,
                          REFUND_QUOTE_REJECTED,
                          REFUND_QUOTE_EXPIRED,
                          REFUND_PRELIMINARY_COMPLETED,
                          REFUND_COMPLETED,
                        ]?.includes(data?.booking?.tfStatus) && (
                          <Grid item xs={12} md={6}>
                            <HotelActionInfoCard
                              title="Refund Info"
                              penalty={commaNumber(
                                bookingData?.refundPenaltyAmount?.toString() ||
                                  0
                              )}
                              service={commaNumber(
                                bookingData?.refundServiceFee?.toString() || 0
                              )}
                              cost={commaNumber(
                                bookingData?.amountRefunded?.toString() || 0
                              )}
                              timeLimit={
                                bookingData?.refundQuotationTimeLimit || 'n/a'
                              }
                              operator={bookingData?.refundUpdatedBy || 'n/a'}
                              remarks={bookingData?.refundRemarks || 'n/a'}
                              agentRemarks={
                                bookingData?.refundAgentRemarks || 'n/a'
                              }
                            />
                          </Grid>
                        )}

                        {[
                          DATE_CHANGE_REQUESTED,
                          DATE_CHANGE_IN_PROGRESS,
                          DATE_CHANGE_QUOTED,
                          DATE_CHANGE_QUOTE_APPROVED,
                          DATE_CHANGE_QUOTE_REJECTED,
                          DATE_CHANGE_QUOTE_EXPIRED,
                          DATE_CHANGED,
                        ]?.includes(data?.booking?.tfStatus) && (
                          <Grid item xs={12} md={6}>
                            <HotelActionInfoCard
                              title="Date Change"
                              penalty={commaNumber(
                                bookingData?.dateCngPenaltyAmount?.toString() ||
                                  0
                              )}
                              service={commaNumber(
                                bookingData?.dateCngServiceFee?.toString() || 0
                              )}
                              cost={commaNumber(
                                bookingData?.dateChangeCost?.toString() || 0
                              )}
                              timeLimit={
                                bookingData?.dateChangeQuotationTimeLimit ||
                                'n/a'
                              }
                              yes={bookingData?.dateCngCheckInDate}
                              ceheckIn={moment(
                                bookingData?.dateCngCheckInDate
                              ).format('DD-MM-YYYY')}
                              checkOut={moment(
                                bookingData?.dateCngCheckOutDate
                              ).format('DD-MMM-YYYY')}
                              remarks={bookingData?.dateCngRemarks || 'n/a'}
                              agentRemarks={
                                bookingData?.dateCngAgentRemarks || 'n/a'
                              }
                            />
                          </Grid>
                        )}

                        {[
                          NAME_CHANGE_REQUEST,
                          NAME_CHANGE_IN_PROGRESS,
                          NAME_CHANGED,
                          NAME_CHANGE_REQUEST_REJECTED,
                        ]?.includes(data?.booking?.tfStatus) && (
                          <Grid item xs={12} md={12}>
                            <HotelActionInfoCard
                              title="Name Change"
                              service={commaNumber(
                                bookingData?.nameChangeFee?.toString() || 0
                              )}
                              remarks={bookingData?.nameChangeRemarks || 'n/a'}
                              agentRemarks={
                                bookingData?.nameChangeAgentRemarks || 'n/a'
                              }
                            />
                          </Grid>
                        )}
                      </Grid>

                      <RoomList data={data} />
                      <ImportantInfo />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <HotelPdf
                      data={data}
                      hotelData={hotelDetailsData?.results[0].data[0]}
                      numberOfRooms={
                        data?.booking?.guestRoomAllocations?.roomAllocation
                          ?.length
                      }
                      numberOfNight={nights}
                      totalRoomPrice={
                        data?.booking?.guestRoomAllocations?.finalFare
                      }
                    />
                    <NeedModification
                      data={data?.booking}
                      refetch={refetch}
                      refetch1={hotelRefetch}
                      refetch2={tlRefetch}
                      nights={nights}
                      timeData={timeLine}
                      onClick={() => setOpen(true)}
                      onClick1={() => setShowChat((prev) => !prev)}
                    />
                    {rulesData?.length > 0 && (
                      <HotelCancellation data={rulesData} />
                    )}
                    <PriceBreakup
                      numberOfRooms={
                        data?.booking?.guestRoomAllocations?.roomAllocation
                          ?.length
                      }
                      numberOfNight={nights}
                      totalRoomPrice={
                        data?.booking?.guestRoomAllocations?.finalFare
                      }
                    />

                    <Button
                      sx={{
                        width: '100%',
                        mt: 2,
                        mb: { xs: 0, sm: 2 },
                        p: 0.5,
                        px: 1.5,
                        fontSize: 13,
                        borderRadius: 2,
                        textTransform: 'capitalize',
                        textAlign: 'left',
                        backgroundColor: 'var(--white)',
                        color: 'var(--dark-sky)',
                        border: '1px solid var(--stroke)',
                        '&:hover': {
                          backgroundColor: '',
                          color: '#fff',
                        },
                      }}
                      onClick={() => openModal(true)}
                    >
                      View Hotel Booking Time Line
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <EmptyContent message="No hotel data available." />
            )}

            <Box
              sx={{
                bgcolor: 'var(--white)',
                borderRadius: 1,
                p: 2,
                mt: 2,
              }}
            >
              {loading || hotelIsLoading ? (
                <Skeleton
                  variant="re"
                  sx={{
                    height: 500,
                  }}
                  className=""
                ></Skeleton>
              ) : hotelIsError ? (
                <Box sx={{ py: 5 }}>
                  <Typography color="error">
                    Error:{' '}
                    {hotelErro?.data?.message ||
                      hotelErro?.error ||
                      'Internal Server Error'}
                  </Typography>
                </Box>
              ) : hotelDetailsData?.results?.[0]?.data?.length > 0 ? (
                <HotelOverviewModal
                  withoutmodal={true}
                  modalIsOpen={false}
                  item={hotelDetailsData?.results[0]?.data[0]}
                />
              ) : (
                <EmptyContent message="No hotel data available." />
              )}
            </Box>
          </Container>

          <HotelTimelineModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            data={timeLine}
          />

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
            statusConstants={statusConstantsHotel}
            bookingRef={data?.booking?.bookingRef}
            hotel
            title="Hotel Query"
            hotelName={hotelName}
            checkIn={checkIn1}
            checkOut={checkOut1}
            roomAllocation={roomAllocation}
            totalAdult={result.totalAdult}
            totalChild={result.totalChild}
            result={result}
            setOpen={setOpen}
            open={open}
          />

          <ChatBotButton onClick={() => dispatch(toggleShowChat())} />
        </>
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
            statusConstants={statusConstantsHotel}
            bookingRef={data?.booking?.bookingRef}
            hotel
            title="Hotel Query"
            hotelName={hotelName}
            checkIn={checkIn1}
            checkOut={checkOut1}
            roomAllocation={roomAllocation}
            totalAdult={result.totalAdult}
            totalChild={result.totalChild}
            result={result}
            onClick={() => dispatch(toggleShowChat())}
          />{' '}
        </Box>
      )}
    </Box>
  );
};

export default HotelBookingDetails;
