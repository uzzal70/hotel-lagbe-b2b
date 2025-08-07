import { useEffect, useRef, useState, useCallback } from 'react';
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

import {
  setActiveMessageIds,
  setUnseenCount,
  setUnseenCountHotle,
} from '../../redux/slices/globalSlice';

import Token from '../Common/Token';
import { formatTimeDifference } from './formatTimeDifference';
import { useSeenMessageByAgentFlightMutation } from '../../redux/slices/hotel/hotelApiSlice';
import {
  useGetAllFlightThreadsQuery,
  useGetAllHotelThreadsQuery,
} from '../../redux/slices/apiSlice';

export const FlightContent = ({ width, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const agentId = Token();
  const pageSize = 10;

  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const lastPageRef = useRef(1);
  const scrollRef = useRef(null);
  const loaderRef = useRef(null);
  const isFetchingRef = useRef(false);

  const { unseenCount, activeMessageIds } = useSelector(
    (state) => state.global
  );
  // console.log(unseenCount);
  const { data, isLoading, refetch } = useGetAllFlightThreadsQuery(
    { agentId, page, pageSize, searchWord: '' },
    { refetchOnMountOrArgChange: true }
  );
  const { data: hotleData } = useGetAllHotelThreadsQuery(
    { agentId, page, pageSize, searchWord: '' },
    { refetchOnMountOrArgChange: true }
  );
  const [seenMessageByAgent] = useSeenMessageByAgentFlightMutation();

  // Truncate helper
  const truncate = (str, maxLength) =>
    str?.length > maxLength ? `${str.slice(0, maxLength)}...` : str;

  // Handle clicking a message
  const handleMessageClick = useCallback(
    async (chatId, bookingId, msgStatus) => {
      try {
        if (msgStatus === 'AGENT_UNSEEN') {
          await seenMessageByAgent(`chatId=${chatId}&agentId=${agentId}`);
          dispatch(setUnseenCount(Math.max(unseenCount - 1, 0)));
        }
        dispatch(setActiveMessageIds(chatId));
        setPage(1);
        // setItems([]);
        refetch();
        handleClose();
        navigate(`/dashboard/bookingdetails/${bookingId}`);
      } catch (err) {
        console.error('Seen/Refetch Error:', err);
      }
    },
    [agentId, dispatch, unseenCount, navigate, refetch, seenMessageByAgent]
  );

  // Append new data
  useEffect(() => {
    const isDataArray = Array.isArray(data?.data);
    const isHotelArray = Array.isArray(hotleData?.data);

    if (isDataArray || isHotelArray) {
      if (page === 1) {
        setItems(data?.data || []);
        lastPageRef.current = 1;
      } else if (page !== lastPageRef.current && isDataArray) {
        setItems((prev) => [...prev, ...data.data]);
        lastPageRef.current = page;
      }

      setHasMore((data?.data?.length || 0) >= (pageSize || 10));

      dispatch(setUnseenCount(data?.unseenMessages || 0));
      dispatch(setUnseenCountHotle(hotleData?.unseenMessages || 0));
    } else {
      setHasMore(false);
    }

    isFetchingRef.current = false;
  }, [data, hotleData]);

  // Infinite scroll observer
  useEffect(() => {
    if (!scrollRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasMore &&
          !isFetchingRef.current &&
          !isLoading
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

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, isLoading]);

  // Smooth scroll when new page loads
  useEffect(() => {
    if (page > 1 && scrollRef.current) {
      scrollRef.current.scrollBy({ top: 300, behavior: 'smooth' });
    }
  }, [page]);

  // Render Messages
  const renderMessages = () =>
    items.map((itemData, index) => {
      const item = itemData?.messages?.[0];
      const { bookingId, chatId } = itemData;

      const isUnseen = item?.msgStatus === 'AGENT_UNSEEN';
      const isActive = activeMessageIds?.includes(chatId);
      const senderName =
        item?.adminFirstName || item?.adminLastName || item?.agentCompanyName;

      return (
        <Paper
          key={index}
          elevation={isActive ? 0 : 2}
          sx={{
            p: 1,
            mb: 0.5,
            mx: 1,
            borderLeft:
              !isActive && isUnseen ? '4px solid var(--primary)' : 'none',
            bgcolor: !isActive && isUnseen ? 'var(--dash)' : 'none',
            cursor: 'pointer',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          }}
          onClick={() => handleMessageClick(chatId, bookingId, item?.msgStatus)}
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
                  {senderName}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontSize={10}
                >
                  {formatTimeDifference(item?.messageCreatedAt)}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" fontSize={10}>
                {truncate(item?.content || '', 80)}
              </Typography>
            </Box>
          </Box>
        </Paper>
      );
    });

  // Skeleton UI
  const renderSkeletons = () => (
    <Box px={2}>
      {[...Array(5)].map((_, i) => (
        <Box key={i} display="flex" alignItems="center" py={1}>
          <Skeleton variant="circular" width={30} height={30} sx={{ mr: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={35} />
        </Box>
      ))}
    </Box>
  );

  // No message state
  const renderEmpty = () => (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: 200 }}
    >
      <Typography variant="body2" color="text.secondary">
        No Messages
      </Typography>
    </Box>
  );

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
        {/* Main content */}
        {isLoading && page === 1
          ? renderSkeletons()
          : items.length === 0
          ? renderEmpty()
          : renderMessages()}

        {/* Bottom loading indicator */}
        {isLoading && page > 1 && (
          <Box display="flex" justifyContent="center" py={2}>
            <CircularProgress size={20} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              Loading...
            </Typography>
          </Box>
        )}

        {/* End of list message */}
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

        {/* Loader trigger */}
        <Box ref={loaderRef} />
      </Box>
    </Box>
  );
};
