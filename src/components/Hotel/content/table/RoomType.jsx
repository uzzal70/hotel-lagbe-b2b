/* eslint-disable react/prop-types */
import { useState } from 'react';
import RoomHotelModal from '../../modal/RoomHotelModal';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import hotel from '../../../../assets/images/hotel';
import companyInfo from '../../../../common/companyInfo';

const RoomType = ({ item, isSelected, onClick }) => {
  const [modalData, setModalData] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (item) => {
    setModalData(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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

  const price = Number((item?.fare?.finalRate || 0).toFixed(2));
  const rules = item?.policy?.cancellationPolicies?.[0]?.rules || [];
  const firstRule = rules[0]?.end;
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
      <Box
        sx={{
          position: 'relative',
          width: { xs: 80, md: 120 },
          height: { xs: 80, md: 120 },
        }}
      >
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
        <Box>
          <Grid container>
            <Grid item xs={8} md={12}>
              <Tooltip
                title={item?.roomName}
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
                  {item?.roomName?.toLowerCase()}
                </Typography>
                {item?.policy?.refundable && firstRule && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#03939F',
                      fontSize: { xs: 10, md: 10 },
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    Free Cancellation Till <br />
                    {new Date(firstRule).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Typography>
                )}
              </Tooltip>
            </Grid>
            <Grid
              item
              xs={4}
              md={0}
              textAlign={'end'}
              display={{ xs: 'block', md: 'none' }}
            >
              <Box>
                {companyInfo?.currencyCode} {(price || 0).toFixed(0)}
                <Typography
                  sx={{
                    color: item?.policy?.refundable
                      ? 'var(--dark-green)'
                      : 'var(--red)',
                    fontSize: { xs: 10, lg: 10 },
                  }}
                >
                  {item?.policy?.refundable ? 'Refundable' : 'Non Refundable'}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      item?.hasBreakfast ||
                      item?.policy?.boardBasis?.description
                        ? 'var(--dark-green)'
                        : 'var(--crimson)',
                    fontSize: 10,
                    display: { xs: 'block', md: 'none' },
                    textTransform: 'capitalize',
                  }}
                >
                  {item?.hasBreakfast || item?.policy?.boardBasis?.description
                    ? item?.policy?.boardBasis?.description ||
                      'Breakfast Included'
                    : 'Breakfast Not Included'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Typography
          variant="body2"
          sx={{ color: '#6A7A90', fontSize: 10, lineHeight: 1.5 }}
        >
          {/* {bedData} */}

          {/* <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1,
              mt: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color:
                  item?.hasBreakfast || item?.policy?.boardBasis?.description
                    ? 'var(--dark-green)'
                    : 'var(--crimson)',
                fontSize: 10,
                display: { xs: 'block', md: 'none' },
                textTransform: 'capitalize',
              }}
            >
              {item?.hasBreakfast || item?.policy?.boardBasis?.description
                ? item?.policy?.boardBasis?.description || 'Breakfast Included'
                : 'Breakfast Not Included'}
            </Typography>
          </Box> */}

          <Typography sx={{ fontSize: 10, color: '#6A7A90', mt: 1 }}>
            <Tooltip
              title={<RoomDescription room={item?.roomDetails?.description} />}
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
                  __html: item?.roomDetails?.description,
                }}
              />
            </Tooltip>
          </Typography>
        </Typography>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Button
            onClick={() => openModal(item)}
            variant="text"
            size="small"
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
          <Button
            onClick={onClick}
            size="small"
            sx={{
              display: { xs: 'block', md: 'none' },
              backgroundColor: isSelected ? 'var(--primary)' : 'white',
              border: '1px solid var(--primary)',
              color: isSelected ? 'white' : 'var(--primary)',
              fontWeight: 300,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'var(--primary)',
                color: 'white',
              },
              width: '90px',
              py: 0.2,
              cxo: {
                color: 'var(--primary)',
                '&:hover': {
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                },
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
              }}
            >
              {isSelected ? (
                <CheckCircleIcon
                  sx={{ fontSize: 16, color: 'white', mr: 0.5 }}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  sx={{ fontSize: 16, mr: 0.5 }}
                  className="cxo"
                />
              )}
              {isSelected ? 'Selected' : 'Select'}
            </Box>
          </Button>
        </Stack>
      </Box>

      <RoomHotelModal
        modalIsOpen={modalIsOpen}
        item={modalData}
        closeModal={closeModal}
      />
    </Box>
  );
};

export default RoomType;
