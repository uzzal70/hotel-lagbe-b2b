import { useEffect, useRef, useState } from 'react';
import {
  CircularProgress,
  Skeleton,
  Avatar,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllHotelThreadsQuery } from '../../redux/slices/apiSlice';
import Token from '../Common/Token';
import { formatTimeDifference } from './formatTimeDifference';
import { useSeenMessageByAgentHotelMutation } from '../../redux/slices/hotel/hotelApiSlice';
import {
  setActiveMessageIds,
  setUnseenCount,
  setUnseenCountHotle,
} from '../../redux/slices/globalSlice';
export const HotelContent = ({ width, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const agentId = Token(); // Replace this with actual agent ID
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const lastPageRef = useRef(1);
  const isFetchingRef = useRef(false);
  const loaderRef = useRef(null);
  const scrollRef = useRef(null);

  const { unseenCount, activeMessageIds } = useSelector(
    (state) => state.global
  );

  const {
    data,
    isLoading: isBookingLoading,
    refetch: bookingRefetch,
  } = useGetAllHotelThreadsQuery(
    { agentId, page, pageSize, searchWord: '' },
    { refetchOnMountOrArgChange: true }
  );

  const [seenMessageByAgent] = useSeenMessageByAgentHotelMutation();

  const truncate = (str, maxLength) =>
    str.length > maxLength ? str.slice(0, maxLength) + '...' : str;

  useEffect(() => {
    if (data?.data?.length) {
      dispatch(setUnseenCountHotle(data?.unseenMessages || 0));
      if (page === 1) {
        setItems(data.data);
        lastPageRef.current = 1;
      } else if (page !== lastPageRef.current) {
        setItems((prev) => [...prev, ...data.data]);
        lastPageRef.current = page;
      }

      setHasMore(data.data.length >= pageSize);
    } else {
      setHasMore(false);
    }
    isFetchingRef.current = false;
  }, [data]);

  useEffect(() => {
    if (!scrollRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !isFetchingRef.current &&
          !isBookingLoading
        ) {
          isFetchingRef.current = true;
          setPage((prev) => prev + 1);
        }
      },
      {
        root: scrollRef.current,
        rootMargin: '100px',
        threshold: 1.0,
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, items, isBookingLoading]);

  useEffect(() => {
    if (page > 1 && scrollRef.current) {
      scrollRef.current.scrollBy({ top: 300, behavior: 'smooth' });
    }
  }, [page]);

  const renderMessages = () =>
    items.map((itemData, index) => {
      const item = itemData?.messages?.[0];
      const { bookingId, hotelBookingId, service, chatId, hotelId } = itemData;
      let to;
      if (service === 'HOTEL')
        to = `/dashboard/hotel/confirm-hotel/${hotelBookingId}/${hotelId}`;
      else to = `/dashboard/bookingdetails/${bookingId}`;

      const admin = item?.adminFirstName || item?.adminLastName || '';

      return (
        <Paper
          key={index}
          elevation={activeMessageIds?.includes(chatId) ? 0 : 2}
          sx={{
            p: 1,
            mb: 1,
            mx: 1,
            borderLeft:
              !activeMessageIds?.includes(chatId) &&
              item?.msgStatus === 'AGENT_UNSEEN'
                ? '4px solid var(--primary)'
                : 'none',
            bgcolor:
              !activeMessageIds?.includes(chatId) &&
              item?.msgStatus === 'AGENT_UNSEEN'
                ? 'var(--dash)'
                : 'none',
            cursor: 'pointer',
          }}
          onClick={async () => {
            try {
              if (item?.msgStatus === 'AGENT_UNSEEN') {
                await seenMessageByAgent(`chatId=${chatId}&agentId=${agentId}`);
                dispatch(setUnseenCount(Math.max(unseenCount - 1, 0)));
              }
              dispatch(setActiveMessageIds(chatId));
              setPage(1);
              // setItems([]);
              bookingRefetch();
              navigate(to);
              handleClose();
            } catch (err) {
              console.error('Seen/Refetch Error:', err);
            }
          }}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              src={item?.senderCompanyLogoUrl}
              sx={{ width: 25, height: 25, mr: 1 }}
            />
            <Box flexGrow={1}>
              <Box display="flex" justifyContent="space-between">
                <Typography
                  variant="subtitle2"
                  fontSize={12}
                  textTransform="capitalize"
                >
                  {admin || item?.agentCompanyName}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontSize: 10,
                  }}
                >
                  {formatTimeDifference(item?.messageCreatedAt)}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 10 }}
              >
                {truncate(item?.content || '', 80)}
              </Typography>
            </Box>
          </Box>
        </Paper>
      );
    });

  const renderSkeletons = () => (
    <Box>
      {Array.from({ length: 5 }).map((_, i) => (
        <Box key={i} display="flex" alignItems="center" py={1}>
          <Skeleton variant="circular" width={30} height={30} sx={{ mr: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={35} />
        </Box>
      ))}
    </Box>
  );

  const renderEmpty = () => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ height: 200 }}
    >
      <Typography variant="body2" color="text.secondary">
        No Messages
      </Typography>
    </Box>
  );

  let content;
  if (isBookingLoading && page === 1) content = renderSkeletons();
  else if (items.length === 0) content = renderEmpty();
  else content = renderMessages();

  return (
    <Box>
      <Box
        ref={scrollRef}
        sx={{
          height: 500,
          overflowY: 'auto',
          fontWeight: 300,
          fontSize: '0.875rem',
          width: width || '300px',
        }}
      >
        {content}

        {isBookingLoading && page > 1 && (
          <Box display="flex" justifyContent="center" py={2}>
            <CircularProgress size={20} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              Loading...
            </Typography>
          </Box>
        )}

        {!hasMore && items.length > 0 && (
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ py: 1 }}
          >
            ------ No more messages ------
          </Typography>
        )}

        <Box ref={loaderRef} />
      </Box>
    </Box>
  );
};
