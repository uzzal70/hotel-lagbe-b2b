/* eslint-disable react/prop-types */
import { Box, Modal, Typography, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { List, ListItem, ListItemText } from '@mui/material';
import { useRef, useState } from 'react';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import hotel from '../../../assets/images/hotel';


const RoomHotelModal = ({ modalIsOpen, closeModal, item }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const sliderRef = useRef(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Disable default arrows
    afterChange: (index) => setCurrentSlide(index + 1),
  };


  const images = item?.image || [];
  const standardImage = images[currentSlide]?.links?.find(
    (link) => link.size === 'Standard'
  );
  const handleImageChange = (direction) => {
    if (!sliderRef.current) return;
    if (direction === -1) {
      sliderRef.current.slickPrev();
    } else {
      sliderRef.current.slickNext();
    }
  };
  const buttonStyle = {
    color: 'var(--white)',
    bgcolor: 'var(--secondary)',
    borderRadius: '50%',
  };

  return (
    <Modal open={modalIsOpen} onClose={closeModal} closeAfterTransition>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          border: 'none',
          borderRadius: 2,
          boxShadow: 24,
          px: { xs: 1, sm: 2 },
          pt: 4,
          pb: 2,
          width: { xs: '90%', sm: '80%', md: '60%' },
          height: 'calc(80vh - 100px)',
          overflow: 'auto',
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={closeModal}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
            color: 'grey.700',
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Modal Content */}
        <Grid container sx={{ height: '100%' }}>
          {/* Left Content */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              p: { xs: 2, md: 3 },
              borderRight: { md: '1px solid #ccc' },
              overflowY: 'auto', // Ensures vertical scrolling
              maxHeight: 'calc(70vh - 100px)', // Adjust height according to your layout
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontSize: { xs: 16, md: 20 } }}
            >
              Facilities
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: 14, md: 16 } }}
            >
              {item?.roomName}
            </Typography>
            <Box
              sx={{
                mt: 2,
                color: 'text.primary',
                fontSize: { xs: 12, md: 14 },
              }}
              dangerouslySetInnerHTML={{ __html: item?.roomDetails?.description }}
            />

            {item?.roomDetails?.beds?.map((bed, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                gap={1}
                mb={1}
              >
                {bed?.type === 'QueenBed' ? (
                  <BedroomChildOutlinedIcon fontSize="small" />
                ) : (
                  <BedroomParentIcon fontSize="small" />
                )}
                <Typography variant="body2">
                  {bed.count} {bed.type}
                </Typography>
              </Box>
            ))}

            {/* Room Facilities */}
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: 16, md: 20 }, mt: 2 }}
            >
              Room Facilities
            </Typography>
            <List dense>
              {item?.roomDetails?.facilities?.map((facility, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemText primary={`• ${facility?.name}`} />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Right Content - Image Slider */}
          <Grid
            item
            xs={12}
            md={7}
            sx={{ p: { xs: 1, md: 3 }, position: 'relative' }}
          >
            {item?.image?.length > 0 ? (
              <Box position="relative">
                <IconButton
                  sx={{
                    ...buttonStyle,
                    position: 'absolute',
                    top: '50%',
                    left: 1,
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                  }}
                  onClick={() => handleImageChange(-1)}
                  disabled={item?.image?.length === 0}
                >
                  <ArrowBack sx={{ fontSize: 15 }} />
                </IconButton>

                <Slider ref={sliderRef} {...settings}>
                  {item?.image?.map((img, index) => (
                    <Box key={index}>
                      <Box
                        component="img"
                        src={standardImage?.url || hotel.no_image}
                        alt={`Slide ${index}`}
                        sx={{
                          width: '100%',
                          height: { xs: 250, md: 450 },
                          objectFit: 'cover',
                          borderRadius: 2,
                        }}
                      />
                    </Box>
                  ))}
                </Slider>

                <IconButton
                  sx={{
                    ...buttonStyle,
                    position: 'absolute',
                    top: '50%',
                    right: 1,
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                  }}
                  onClick={() => handleImageChange(1)}
                  disabled={item?.image?.length === 0}
                >
                  <ArrowForward sx={{ fontSize: 15 }} />
                </IconButton>
              </Box>
            ) : (
              <Box
                sx={{
                  textAlign: 'center',
                }}
              >
                No room pictures available.
              </Box>
            )}

            {item?.image?.length > 0 ? (
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 16,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                {currentSlide} / {item?.image?.length}`
              </Typography>
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default RoomHotelModal;
