/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Box, Typography, IconButton, CardMedia, Modal
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import BoltIcon from '@mui/icons-material/Bolt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import Facilities from '../Facilities';
import RoomHotelModal from '../../modal/RoomHotelModal';
import CancellationTillDate from '../CancellationTillDate';
import hotel from '../../../../assets/images/hotel';
import { useParams } from 'react-router-dom';
import { addRoom, removeRoom, setRecId } from '../../../../redux/slices/roomFilterSlice';
import { toast, ToastContainer } from 'react-toastify';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import companyInfo from '../../../../common/companyInfo';

const SmallRoomCard = ({ key, matchedStandardRoom, mainRoom, item, recomIndex, occupancy, rateUuid, rec, roomLength }) => {
  const dispatch = useDispatch();
  const { roomsNumber = 1, traceId } = useParams();
  const initialState = useSelector((state) => state.hotel);
  const startDate = moment(initialState?.dateRange?.[0]?.startDate);
  const endDate = moment(initialState?.dateRange?.[0]?.endDate);
  const nights = endDate.diff(startDate, 'days') || 1;

  const items = useSelector((state) => state.roomFilter.items);
  const itinerary = useSelector((state) => state.roomFilter.itinerary);
  const selectedRooms = useSelector((state) => state.roomFilter.selectedRooms);
  const selectedIndexes = useSelector((state) => state.roomFilter.recomIndex) || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [cancelModalOpen, setCancelModalOpen] = useState(false); // New State for Cancellation Modal

  const images = matchedStandardRoom?.images || [];
  const beds = matchedStandardRoom?.beds || [];
  const rules = mainRoom?.cancellationPolicies?.[0]?.rules || [];
  const bedInfo = beds.filter(b => b.count > 0)
    .map(b => `${b.type} ${b.count}`).join(', ') || "*Bed type is subject to availability";
  const standardImage = images[currentImage]?.links?.find(link => link.size === "Standard");

  const handleImageChange = (dir) => {
    setCurrentImage((prev) => (prev + dir + images.length) % images.length);
  };

  const getMealLabel = (type) =>
    type?.toLowerCase().includes('breakfast') ? 'Breakfast Included' : 'Breakfast Not Included';


  const isSelected = selectedIndexes.includes(recomIndex);

  const handleSelectRoom = () => {
    if (!occupancy || !rateUuid) return;

    const roomInfo = {
      rateId: rateUuid,
      roomId: occupancy.roomId,
      numberOfAdults: occupancy.numOfAdults,
    };

    if (isSelected) {
      dispatch(removeRoom({ recomIndex }));
      toast.warning('Room deselected.');
    } else {
      if (selectedIndexes.length >= Number(roomsNumber)) {
        toast.error(`You can only select ${roomsNumber} room${roomsNumber > 1 ? 's' : ''}.`);
        return;
      }
      dispatch(setRecId(rec?.id || ''));
      dispatch(addRoom({ roomInfo, recomIndex }));
      toast.success('Room selected.');
    }
  };


  useEffect(() => {
    if (selectedIndexes.length === 0) {
      dispatch(setRecId(''));
    }
  }, [selectedIndexes]);

  useEffect(() => {
    if (selectedIndexes.length > 0) {
      const submitSelectedRoom = {
        itineraryCode: itinerary,
        traceId: traceId || '',
        recommendationId: rec?.id || '',
        roomAllocation: selectedRooms.slice(0, roomsNumber),
        items,
      };
      // console.log('Auto Submit Payload:', submitSelectedRoom);
    }
  }, [selectedIndexes, selectedRooms]);

  return (
    <Box bgcolor="white" key={key} mb={2} sx={{ borderRadius: 2, border: '1px solid #E0E0E0' }}>
      <Box sx={{ borderRadius: 2, overflow: 'hidden', p: 1 }}>
        {/* Image and Basic Info */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ position: 'relative', width: 120, height: 120 }}>
            <IconButton onClick={() => handleImageChange(-1)} disabled={!images.length}
              sx={{ position: 'absolute', top: '50%', left: -5, transform: 'translateY(-50%)' }}>
              <ArrowBack sx={{ width: 10, height: 10 }} />
            </IconButton>

            <CardMedia
              component="img"
              sx={{ width: 120, height: 120, borderRadius: 1, border: standardImage?.url ? '' : '1px solid #E0E0E0' }}
              image={standardImage?.url || hotel.no_image}
              alt="Room Image"
              onClick={() => setModalOpen(true)}
              onError={(e) => { e.target.src = hotel.no_image; }}
            />

            <IconButton onClick={() => handleImageChange(1)} disabled={!images.length}
              sx={{ position: 'absolute', top: '50%', right: -5, transform: 'translateY(-50%)' }}>
              <ArrowForward sx={{ width: 10, height: 10 }} />
            </IconButton>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontSize: 15, mb: 1, color: '#102C60', textTransform: 'capitalize' }}
              onClick={() => setModalOpen(true)}>
              {matchedStandardRoom?.name?.toLowerCase()}
            </Typography>

            {/* Refundability */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, cursor: 'pointer' }}
              onClick={() => setCancelModalOpen(true)} // open Cancellation modal
            >
              {mainRoom?.refundable
                ? <CheckCircleIcon sx={{ color: '#03939F', fontSize: 15 }} />
                : <HighlightOffIcon sx={{ color: 'var(--crimson)', fontSize: 15 }} />}
              <Typography variant="body2" sx={{ fontSize: 10, color: mainRoom?.refundable ? '#03939F' : 'var(--crimson)' }}>
                {mainRoom?.refundable ? `Free Cancellation Till ${moment(rules[0]?.end).format('DD MMM YYYY')}` : 'Non Refundable'}
              </Typography>
            </Box>

            {/* Extra Refundability Text */}
            {mainRoom?.refundable && mainRoom?.refundability && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <SwapVerticalCircleIcon sx={{ fontSize: 15, color: 'var(--black-hover)' }} />
                <Typography variant="body2" sx={{ fontSize: 10, color: 'var(--black-hover)' }}>
                  {mainRoom?.refundability}
                </Typography>
              </Box>
            )}

            {/* Instant Confirmation */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <BoltIcon sx={{ color: '#03939F', fontSize: 15 }} />
              <Typography variant="body2" sx={{ fontSize: 10, color: '#03939F' }}>
                Instant Confirmation
              </Typography>
            </Box>

            {/* Meal Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <RestaurantMenuIcon sx={{ color: mainRoom?.boardBasis?.type === 'RoomOnly' ? 'var(--crimson)' : '#334F7D', fontSize: 15 }} />
              <Typography variant="body2" sx={{ fontSize: 10, color: mainRoom?.boardBasis?.type === 'RoomOnly' ? 'var(--crimson)' : '#334F7D' }}>
                {getMealLabel(mainRoom?.boardBasis?.type)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Bed Info & Facilities */}

        <Typography variant="body2" sx={{ color: '#6A7A90', fontSize: 13, mt: 1 }}>
          {bedInfo}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, mt: 0.5 }}>
          {mainRoom?.smokingAllowed ? (
            <SmokingRoomsIcon sx={{ color: "#03939F", fontSize: 13 }} />
          ) : (
            <SmokeFreeIcon sx={{ color: "var(--crimson)", fontSize: 13 }} />
          )}
          <Typography variant="body2" sx={{ color: mainRoom?.smokingAllowed ? "#03939F" : "var(--crimson)", fontSize: 10 }}>
            {mainRoom?.smokingAllowed ? "Smoking Allowed" : "Non Smoking"}
          </Typography>
        </Box>
        {matchedStandardRoom?.items?.[0]?.type && (
          <Typography variant="caption" sx={{ fontSize: 10, color: '#6A7A90', mt: 0.5 }}>
            Type: {matchedStandardRoom?.items[0]?.type}
          </Typography>
        )}

        <Box sx={{ pb: 1 }}>
          <Facilities room={matchedStandardRoom} item={item} />
        </Box>
      </Box>

      {/* Price and Button */}
      <Box sx={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 0.5, px: 1.5, borderRadius: '0px 0px 5px 5px', backgroundColor: '#F7F9FC', height: 60,
      }}>
        <Box>
          <Typography variant="h5" sx={{ color: '#102C60', fontWeight: 'bold', fontSize: { xs: 14, lg: 17 } }}>
            {companyInfo.currencyCode} {Math.round((mainRoom?.finalRate / roomLength) || 0).toFixed()}
          </Typography>
          <Typography variant="caption" sx={{ color: '#6A7A90', fontSize: { xs: 9, lg: 10 } }}>
            Price for {1} room x {nights} nights, incl. all taxes
          </Typography>
        </Box>

        <Box
          onClick={handleSelectRoom}
          sx={{
            backgroundColor: isSelected ? 'var(--primary)' : 'white',
            border: '1px solid var(--primary)',
            color: isSelected ? 'white' : 'var(--primary)',
            px: 1,
            py: 0.5,
            fontSize: { xs: '10px', md: '12px' },
            fontWeight: 300,
            textTransform: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: 1,
            width: 75,
          }}
        >
          {isSelected ?
            <CheckCircleIcon sx={{ color: 'white', fontSize: 15 }} /> :
            <RadioButtonUncheckedIcon sx={{ color: 'var(--primary)', fontSize: 15 }} />}
          {/* Text */}
          <Box sx={{ fontSize: 10, color: isSelected ? 'white' : 'var(--primary)' }}>
            {isSelected ? 'Selected' : 'Select'}
          </Box>
        </Box>

      </Box>

      {/* Room Image Modal */}
      <RoomHotelModal modalIsOpen={modalOpen} item={matchedStandardRoom} closeModal={() => setModalOpen(false)} />

      {/* Cancellation Info Modal */}
      <Modal open={cancelModalOpen} onClose={() => setCancelModalOpen(false)}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '95%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 3,
        }}>
          <CancellationTillDate rules={rules} mainRoom={mainRoom} startDate={startDate} endDate={endDate} />
        </Box>
      </Modal>


      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default SmallRoomCard;
