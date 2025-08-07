/* eslint-disable react/prop-types */
import { Box, Typography, IconButton, CardMedia, Modal } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import moment from 'moment';
import BoltIcon from '@mui/icons-material/Bolt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import Facilities from '../Facilities';
import RoomHotelModal from '../../modal/RoomHotelModal';
import hotel from '../../../../assets/images/hotel';
import { ToastContainer } from 'react-toastify';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import FeeCancellation from '../table/FeeCancellation';
import companyInfo from '../../../../common/companyInfo';

const SmallRoomSelectionItemList = ({ item, onClick, isSelected }) => {
  const initialState = useSelector((state) => state.hotel);
  const startDate = moment(initialState?.dateRange?.[0]?.startDate);
  const endDate = moment(initialState?.dateRange?.[0]?.endDate);
  const nights = endDate.diff(startDate, 'days') || 1;

  const rules = item?.policy?.cancellationPolicies?.[0]?.rules || [];
  const firstRule = rules[0]?.end;
  const lastRule = rules[rules.length - 1]?.end;
  const rulesText = item?.policy?.cancellationPolicies?.[0]?.text || '';
  const price = Number((item?.fare?.finalRate || 0).toFixed(2));

  const [modalOpen, setModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = item?.image || [];

  const beds = item?.roomDetails?.beds || [];
  const bedData =
    beds
      .filter((bed) => bed.count > 0)
      .map((bed) => `${bed.type} ${bed.count}`)
      .join(', ') || '*Bed type is subject to availability';
  const handleImageChange = (direction) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      return newIndex < 0 ? images.length - 1 : newIndex % images.length;
    });
  };

  const standardImage = images[currentIndex]?.links?.find(
    (link) => link.size === 'Standard'
  );

  const getMealLabel = (type) =>
    type?.toLowerCase().includes('breakfast')
      ? 'Breakfast Included'
      : 'Breakfast Not Included';

  return (
    <Box
      bgcolor="white"
      mb={2}
      sx={{ borderRadius: 2, border: '1px solid #E0E0E0' }}
    >
      <Box sx={{ borderRadius: 2, overflow: 'hidden', p: 1 }}>
        {/* Image and Basic Info */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ position: 'relative', width: 120, height: 120 }}>
            <IconButton
              onClick={() => handleImageChange(-1)}
              disabled={!images.length}
              sx={{
                position: 'absolute',
                top: '50%',
                left: -5,
                transform: 'translateY(-50%)',
              }}
            >
              <ArrowBack sx={{ width: 10, height: 10 }} />
            </IconButton>

            <CardMedia
              component="img"
              sx={{
                width: 120,
                height: 120,
                borderRadius: 1,
                border: standardImage?.url ? '' : '1px solid #E0E0E0',
              }}
              src={standardImage?.url || hotel.no_image}
              alt={images[currentIndex]?.caption || 'Room Image'}
              onClick={() => setModalOpen(true)}
              onError={(e) => {
                e.target.src = hotel.no_image;
              }}
            />

            <IconButton
              onClick={() => handleImageChange(1)}
              disabled={!images.length}
              sx={{
                position: 'absolute',
                top: '50%',
                right: -5,
                transform: 'translateY(-50%)',
              }}
            >
              <ArrowForward sx={{ width: 10, height: 10 }} />
            </IconButton>
          </Box>

          <Box>
            <Typography
              variant="h5"
              sx={{
                fontSize: 15,
                mb: 1,
                color: '#102C60',
                textTransform: 'capitalize',
              }}
              onClick={() => setModalOpen(true)}
            >
              {item?.roomName?.toLowerCase()}
            </Typography>

            {/* Refundability */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 1,
                cursor: 'pointer',
              }}
              onClick={() => setCancelModalOpen(true)} // open Cancellation modal
            >
              {item?.refundable ? (
                <CheckCircleIcon sx={{ color: '#03939F', fontSize: 15 }} />
              ) : (
                <HighlightOffIcon
                  sx={{ color: 'var(--crimson)', fontSize: 15 }}
                />
              )}
              <Typography
                variant="body2"
                sx={{
                  fontSize: 10,
                  color: item?.refundable ? '#03939F' : 'var(--crimson)',
                }}
              >
                {item?.refundable
                  ? `Free Cancellation Till ${moment(rules[0]?.end).format(
                      'DD MMM YYYY'
                    )}`
                  : 'Non Refundable'}
              </Typography>
            </Box>

            {/* Extra Refundability Text */}
            {item?.refundable && item?.refundability && (
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
              >
                <SwapVerticalCircleIcon
                  sx={{ fontSize: 15, color: 'var(--black-hover)' }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontSize: 10, color: 'var(--black-hover)' }}
                >
                  {item?.refundability}
                </Typography>
              </Box>
            )}

            {/* Instant Confirmation */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <BoltIcon sx={{ color: '#03939F', fontSize: 15 }} />
              <Typography
                variant="body2"
                sx={{ fontSize: 10, color: '#03939F' }}
              >
                Instant Confirmation
              </Typography>
            </Box>

            {/* Meal Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <RestaurantMenuIcon
                sx={{
                  color:
                    item?.boardBasis?.type === 'RoomOnly'
                      ? 'var(--crimson)'
                      : '#334F7D',
                  fontSize: 15,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontSize: 10,
                  color:
                    item?.boardBasis?.type === 'RoomOnly'
                      ? 'var(--crimson)'
                      : '#334F7D',
                }}
              >
                {getMealLabel(item?.boardBasis?.type)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Bed Info & Facilities */}

        <Typography
          variant="body2"
          sx={{ color: '#6A7A90', fontSize: 13, mt: 1 }}
        >
          {bedData}
        </Typography>

        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, mt: 0.5 }}
        >
          {item?.roomDetails?.smokingAllowed ? (
            <SmokingRoomsIcon sx={{ color: '#03939F', fontSize: 13 }} />
          ) : (
            <SmokeFreeIcon sx={{ color: 'var(--crimson)', fontSize: 13 }} />
          )}
          <Typography
            variant="body2"
            sx={{
              color: item?.roomDetails?.smokingAllowed
                ? '#03939F'
                : 'var(--crimson)',
              fontSize: 10,
            }}
          >
            {item?.roomDetails?.smokingAllowed
              ? 'Smoking Allowed'
              : 'Non Smoking'}
          </Typography>
        </Box>
        {/* {matchedStandardRoom?.items?.[0]?.type && (
                    <Typography variant="caption" sx={{ fontSize: 10, color: '#6A7A90', mt: 0.5 }}>
                        Type: {matchedStandardRoom?.items[0]?.type}
                    </Typography>
                )} */}

        <Box sx={{ pb: 1 }}>
          <Facilities item={item} />
        </Box>
      </Box>

      {/* Price and Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 0.5,
          px: 1.5,
          borderRadius: '0px 0px 5px 5px',
          backgroundColor: '#F7F9FC',
          height: 60,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: '#102C60',
              fontWeight: 'bold',
              fontSize: { xs: 14, lg: 17 },
            }}
          >
            {companyInfo?.currencyCode} {price}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: '#6A7A90', fontSize: { xs: 9, lg: 10 } }}
          >
            Price for {1} room x {nights} nights, incl. all taxes
          </Typography>
        </Box>

        <Box
          onClick={onClick}
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
          {isSelected ? (
            <CheckCircleIcon sx={{ color: 'white', fontSize: 15 }} />
          ) : (
            <RadioButtonUncheckedIcon
              sx={{ color: 'var(--primary)', fontSize: 15 }}
            />
          )}
          {/* Text */}
          <Box
            sx={{
              fontSize: 10,
              color: isSelected ? 'white' : 'var(--primary)',
            }}
          >
            {isSelected ? 'Selected' : 'Select'}
          </Box>
        </Box>
      </Box>

      {/* Room Image Modal */}
      <RoomHotelModal
        modalIsOpen={modalOpen}
        item={item}
        closeModal={() => setModalOpen(false)}
      />

      {/* Cancellation Info Modal */}
      <Modal open={cancelModalOpen} onClose={() => setCancelModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '95%',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          <FeeCancellation
            rules={rules}
            item={item}
            startDate={startDate}
            endDate={endDate}
            lastRule={lastRule}
            firstRule={firstRule}
            rulesText={rulesText}
          />
        </Box>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default SmallRoomSelectionItemList;
