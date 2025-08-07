/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FindMatchingRooms from '../table/FindMatchingRooms';
import SmallRoomSelectionItem from './SmallRoomSelectionItem';
import {
  incrementArticleNum,
  setLoadingMore,
} from '../../../../redux/slices/roomFilterSlice';
import { v4 as uuidv4 } from 'uuid';

const SmallRoomList = ({ roomDiv }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const observerRef = useRef(null);

  const selectedPax = { adults: '1', childs: '0' };

  const {
    selectedRoomNames,
    filterRefundable,
    filterFreeCancel,
    articleNum,
    loadingMore,
  } = useSelector((state) => state.roomFilter);

  const { roomData, activeRecommendationId, error, loading } = useSelector(
    (state) => state.roomSelection
  );

  const roomRate = roomData?.results?.[0]?.data?.[0]?.roomRate || [];
  const hotelName = roomData?.results[0].data[0].name;
  const providerHotelId = roomData?.results[0].data[0].providerHotelId;
  const hotelContact = roomData?.results[0].data[0].contact;
  const heroImage = roomData?.results[0].data[0].heroImage;
  const hotelId = roomData?.results[0].data[0].id;
  const type = roomData?.results[0].data[0].type;
  const starRating = roomData?.results[0].data[0].starRating;
  const hotelInfo = {
    hotelId,
    hotelName,
    type,
    hotelContact,
    heroImage,
    providerHotelId,
    starRating,
  };
  const matchedRoom = useMemo(
    () => FindMatchingRooms({ roomRate, hotelInfo }),
    [roomRate]
  );
  const matchedRooms = matchedRoom?.matchedRooms;

  const filteredRooms = useMemo(() => {
    if (!Array.isArray(matchedRooms)) return [];

    return matchedRooms
      .filter((room) => {
        if (!room) return false;

        const matchName =
          selectedRoomNames.length === 0 ||
          selectedRoomNames.includes(room.stdRoomName || '');

        const matchRefund = !filterRefundable || room.refundable === true;

        const matchFreeCancel =
          !filterFreeCancel || room.freeCancelation === true;

        const matchRecId =
          !activeRecommendationId ||
          room.recommendationId === activeRecommendationId;

        return matchName && matchRefund && matchFreeCancel && matchRecId;
      })
      .map((room) => ({
        ...room,
        uuid: uuidv4(), // Ensure new unique ID on each filter
      }));
  }, [
    matchedRooms,
    selectedRoomNames,
    filterRefundable,
    filterFreeCancel,
    activeRecommendationId,
  ]);

  const loadMore = useCallback(() => {
    if (filteredRooms.length > articleNum) {
      dispatch(setLoadingMore(true));
      setTimeout(() => {
        dispatch(incrementArticleNum());
        dispatch(setLoadingMore(false));
      }, 500);
    }
  }, [filteredRooms.length, articleNum, dispatch]);

  const lastRef = useCallback(
    (node) => {
      if (loadingMore || !node) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) loadMore();
      });
      observerRef.current.observe(node);
    },
    [loadMore, loadingMore]
  );

  const ErrorMsg = () => (
    <Box textAlign="center" p={2}>
      <Typography variant="body2" color="error" fontWeight={500}>
        ⚠️ {error}
      </Typography>
      <Button
        onClick={() => navigate(-1)}
        sx={{
          bgcolor: 'var(--primary)',
          px: 3,
          mt: 1,
          borderRadius: 5,
          color: '#fff',
          textTransform: 'none',
          '&:hover': { bgcolor: 'var(--primary)' },
        }}
      >
        Try Again
      </Button>
    </Box>
  );

  const NoData = () => (
    <Typography
      variant="body2"
      color="text.secondary"
      textAlign="center"
      mt={2}
    >
      No room data available.
    </Typography>
  );

  useEffect(() => {}, [roomData, filteredRooms]);

  return (
    <div ref={roomDiv}>
      <div ref={lastRef} style={{ background: 'transparent' }} />
      <SmallRoomSelectionItem roomData={filteredRooms.slice(0, articleNum)} />

      {loadingMore && 'Loading more....'}
      {error && <ErrorMsg />}
      {!loading && !error && filteredRooms.length === 0 && <NoData />}
    </div>
  );
};

export default SmallRoomList;
