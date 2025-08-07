/* eslint-disable react/prop-types */
import { Box, Typography, Button, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import hotel from '../../../assets/images/hotel';
import RoomHotelModal from '../modal/RoomHotelModal';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';

const RoomCard = ({ room, matchedStandardRoom, occupancy, item }) => {
  // console.log('room Data:>> ', room);
  const [modalData, setModalData] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (item) => {
    setModalData(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // console.log('room :>> ', room);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = matchedStandardRoom?.images || [];

  const beds = room?.beds || [];
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

  // console.log('matchedStandardRoom :>> ', matchedStandardRoom);

  const standardImage = images[currentIndex]?.links?.find(
    (link) => link.size === 'Standard'
  );

  const RoomDescription = ({ room }) => (
    <Box>
      <div
        dangerouslySetInnerHTML={{
          __html: room,
        }}
      />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {/* Image Slider */}
      <Box sx={{ position: 'relative', width: 120, height: 120 }}>
        <IconButton
          sx={{
            position: 'absolute',
            top: '50%',
            left: -5,
            transform: 'translateY(-50%)',
            zIndex: 1,
          }}
          onClick={() => handleImageChange(-1)}
          disabled={images.length === 0}
        >
          <ArrowBack sx={{ width: 10, height: 10 }} />
        </IconButton>
        <img
          src={standardImage?.url || hotel.no_image}
          alt={images[currentIndex]?.caption || 'Room Image'}
          onError={(e) => {
            e.target.onerror = null; // prevent infinite loop
            e.target.src = hotel.no_image;
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
            transition: 'opacity 0.5s ease-in-out',
            border: standardImage?.url ? '' : '1px solid #E0E0E0',
          }}
        />

        <IconButton
          sx={{
            position: 'absolute',
            top: '50%',
            right: -5,
            transform: 'translateY(-50%)',
            zIndex: 1,
          }}
          onClick={() => handleImageChange(1)}
          disabled={images.length === 0}
        >
          <ArrowForward sx={{ width: 10, height: 10 }} />
        </IconButton>
      </Box>

      {/* Room Details */}
      <Box sx={{ flex: 1 }}>
        <Tooltip
          title={room?.name}
          placement="top"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: 'var(--primary)',
                color: 'white',
                fontSize: '12px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                p: 2,
                maxWidth: 600,
              },
              className: 'custom-tooltip',
            },
            arrow: {
              sx: {
                color: 'var(--primary)',
              },
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              color: '#102C60',
              mb: 0.5,
              fontSize: 15,
              textTransform: 'capitalize',
              display: 'block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: '25px',
              maxWidth: '200px',
            }}
          >
            {room?.name?.toLowerCase()}
          </Typography>
        </Tooltip>
        <Typography
          variant="body2"
          sx={{ color: '#6A7A90', fontSize: 10, lineHeight: 1.5 }}
        >
          {bedData}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1,
              mt: 0.5,
            }}
          >
            {room?.smokingAllowed ? (
              <SmokingRoomsIcon sx={{ color: '#03939F', fontSize: 13 }} />
            ) : (
              <SmokeFreeIcon sx={{ color: 'var(--crimson)', fontSize: 13 }} />
            )}
            <Typography
              variant="body2"
              sx={{
                color: room?.smokingAllowed ? '#03939F' : 'var(--crimson)',
                fontSize: 10,
              }}
            >
              {room?.smokingAllowed ? 'Smoking Allowed' : 'Non Smoking'}
            </Typography>
          </Box>

          <Typography sx={{ fontSize: 10, color: '#6A7A90', mt: 1 }}>
            <Tooltip
              title={<RoomDescription room={room?.description} />}
              placement="top"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    fontSize: '12px',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    p: 2,
                    maxWidth: 600,
                  },
                  className: 'custom-tooltip',
                },
                arrow: {
                  sx: {
                    color: '#ccc',
                  },
                },
              }}
            >
              <div
                style={{
                  display: 'block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  height: '25px',
                  maxWidth: '200px', // optional, restricts to container
                }}
                dangerouslySetInnerHTML={{
                  __html: room?.description,
                }}
              />
            </Tooltip>
          </Typography>
        </Typography>

        <Button
          onClick={() => openModal(room)}
          variant="text"
          sx={{
            color: '#3F79E5',
            textTransform: 'none',
            padding: 0,
            fontSize: '0.8rem',
            fontWeight: 400,
            mt: 1,
          }}
        >
          Room Info
        </Button>
      </Box>

      <RoomHotelModal
        modalIsOpen={modalIsOpen}
        item={modalData}
        closeModal={closeModal}
      />
    </Box>
  );
};

export default RoomCard;
