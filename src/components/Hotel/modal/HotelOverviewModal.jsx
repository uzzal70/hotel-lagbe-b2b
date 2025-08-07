/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Box,
  Modal,
  Typography,
  Tabs,
  Tab,
  Grid,
  IconButton,
} from '@mui/material';
import { useState, useEffect } from 'react';
import Rating from '../content/Rating';
import HotelSlideImage from '../content/HotelSlideImage';
import HotelLocation from '../MapComponent/HotelLocation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { facilityIcons } from '../../Utils/facilityIcons';
import CloseIcon from '@mui/icons-material/Close';
import ReviewSummary from '../ReviewSummary/ReviewSummary';
const HotelOverviewModal = ({
  modalIsOpen,
  closeModal,
  item,
  modalState,
  nearByAttractions,
  withoutmodal,
}) => {
  const getTabIndex = (modalState) => {
    switch (modalState) {
      case 'Overview':
        return 0;
      case 'ALL IMAGES':
        return 1;
      case 'Reviews':
        return 2;
      case 'Facilities':
        return 3;
      case 'Attributes':
        return 4;
      case 'Show Map':
        return 5;
      case 'Nearby Attractions':
        return 6;
      default:
        return 0;
    }
  };

  const [selectedTab, setSelectedTab] = useState(getTabIndex(modalState));
  const [filteredImages, setFilteredImages] = useState('ALL IMAGES');
  const [label, setLabel] = useState([]);
  const [onClickImg, setOnClickImg] = useState();

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  // console.log(item.id);
  const hotelId = item.id;
  const lat = item?.geoCode?.lat || 0;
  const lng = item?.geoCode?.long || 0;
  const handleTabChange = (event, newValue) => setSelectedTab(newValue);
  const handleFilter = (category) => setFilteredImages(category);

  const imageLink =
    item?.images?.flatMap((img) =>
      img.links
        .filter((link) => link.size === 'Xxl')
        .map((link) => ({ url: link.url, size: link.size }))
    ) || [];
  const imageLink2 = item?.imagesAndCaptions || {};

  useEffect(() => {
    setSelectedTab(getTabIndex(modalState));
  }, [modalState]);

  useEffect(() => {
    if (imageLink2) {
      const captionLabels = Object.keys(imageLink2).map(
        (key) => imageLink2[key].captionLabel
      );
      if (JSON.stringify(label) !== JSON.stringify(captionLabels)) {
        setLabel(captionLabels);
      }
    }
  }, [JSON.stringify(imageLink2)]);

  // console.log('allReviews', allReviews);
  const selectedImages =
    filteredImages === 'ALL IMAGES'
      ? Object.values(imageLink2)?.flatMap((category) => category?.images)
      : imageLink2[filteredImages]?.images || [];

  const renderImages =
    selectedImages?.flatMap((img) =>
      img.links
        .filter((link) => link.size === 'Xxl')
        .map((link) => ({ url: link.url, size: link.size }))
    ) || [];

  const AddressDetails = ({ data }) => {
    const {
      address: {
        line1,
        city: { name: cityName },
        state: { name: stateName },
        country: { name: countryName },
      },
    } = data;

    // Combine all into one line like: line1, state, city, country
    const fullAddress = `${line1 === undefined ? '' : line1 + ','} ${
      stateName === undefined ? '' : stateName + ','
    } ${cityName === undefined ? '' : cityName + ','} ${
      countryName == undefined ? '' : countryName
    }`;

    return (
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" sx={{ fontSize: { xs: 12, md: 15 } }}>
          📍 {fullAddress}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'var(--primary)',
            fontSize: { xs: 12, md: 15 },
            my: 1,
            fontWeight: 500,
          }}
        >
          Facilities
        </Typography>
        <Grid container spacing={1} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {item?.facilities?.slice(0, 16).map((item, index) => {
            const matchingIcon = Object.keys(facilityIcons).find((key) =>
              item.name.toLowerCase().includes(key.toLowerCase())
            );

            return (
              <Grid
                item
                xs={12}
                sm={6}
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.2,
                }}
              >
                {matchingIcon ? (
                  facilityIcons[matchingIcon]
                ) : (
                  <CheckCircleIcon sx={{ color: '#CDD0D3', fontSize: 15 }} />
                )}
                <Typography
                  variant="body2"
                  color="#344258"
                  sx={{
                    fontSize: { xs: 10, md: 11, lg: 13 },
                  }}
                  noWrap
                >
                  {item.name}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  };

  const content = (
    <Box>
      {/* Close button */}
      <IconButton
        onClick={closeModal}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: 'gray',
        }}
      >
        <CloseIcon />
      </IconButton>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 1,
          bgcolor: '',
          color: 'var(--primary)',
          p: 1,
          borderRadius: 1,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={600}
          sx={{ fontSize: { xs: 15, sm: 20, md: 22 } }}
        >
          {item.name}
        </Typography>
        <Rating rating={item?.starRating} />
      </Box>

      <Box sx={{ width: { xs: '90vw', md: '100%' } }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="scrollable tabs"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          TabScrollButtonProps={{
            sx: {
              '&.Mui-disabled': { opacity: 0.3 },
            },
          }}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {[
            'Overview',
            'Images',
            'Reviews',
            'Facilities',
            'Attributes',
            'Show Map',
            nearByAttractions && 'Nearby Attractions',
          ]
            .filter(Boolean)
            .map((label, index) => (
              <Tab
                key={index}
                label={label}
                {...a11yProps(index)}
                sx={{
                  textTransform: 'capitalize',
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: {
                    xs: '10px',
                    sm: '12px',
                    md: '14px',
                  },
                  width: { xs: '80px', md: 'auto' },
                  pa: { xs: 0.5, md: 1 },
                  whiteSpace: 'nowrap',
                }}
              />
            ))}
        </Tabs>
      </Box>

      <Grid container spacing={2} width={'100%'} sx={{ mb: 3 }}>
        <Grid
          item
          xs={12}
          md={withoutmodal ? 12 : 12}
          sx={{
            borderRight: { sx: 'none', md: '2px solid var(--gray)' },
            height: '65vh',
          }}
        >
          {selectedTab === 0 && (
            <>
              <Box
                sx={{
                  maxWidth: 1200,
                  mx: 'auto',
                  p: 2,
                  overflowY: 'auto',
                  maxHeight: '62vh',
                }}
              >
                {/* Map & Address */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid item xs={12} md={6}>
                    <iframe
                      src={`https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`}
                      title="map"
                      width="100%"
                      height="300"
                      style={{ border: 0, borderRadius: 8 }}
                      loading="lazy"
                    ></iframe>
                  </Grid>
                  <AddressDetails data={item?.contact} />{' '}
                  {/* Pass the item prop to AddressDetails*/}
                </Grid>

                {/* Descriptions */}
                <Box variant="outlined" sx={{ mb: 4 }}>
                  {item?.descriptions?.map((facility, index) => (
                    <Box key={index}>
                      <Typography
                        variant="body1"
                        color="var(--primary)"
                        sx={{
                          textTransform: 'capitalize',
                          fontSize: { xs: 13, md: 15 },
                        }}
                      >
                        {facility?.type}{' '}
                      </Typography>
                      <Box display={'flex'} gap={1} sx={{ mb: 2 }}>
                        <Box>-</Box>
                        <Box>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                              fontSize: { xs: 12, md: 15 },
                              fontWeight: 400,
                            }}
                            dangerouslySetInnerHTML={{
                              __html: facility?.text,
                            }}
                          />{' '}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {selectedTab === 1 && (
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  mt: 2,
                  px: 2,
                }}
              >
                {['ALL IMAGES', ...label].map((category) => (
                  <Box
                    key={category}
                    onClick={() => handleFilter(category)}
                    sx={{
                      cursor: 'pointer',
                      px: 2,
                      py: 0.5,
                      border: '1px solid red',
                      backgroundColor:
                        filteredImages === category
                          ? 'var(--primary)'
                          : 'var(--white)',
                      color:
                        filteredImages === category
                          ? 'var(--white)'
                          : 'var(--black)',
                      borderColor:
                        filteredImages === category
                          ? 'var(--primary)'
                          : 'var(--black)',
                      fontSize: { xs: 7.5, md: 10 },
                      borderRadius: 1,
                    }}
                  >
                    {category}
                  </Box>
                ))}
              </Box>
              {onClickImg ? (
                <Grid container spacing={2} sx={{ m: 1, mb: 10 }}>
                  <HotelSlideImage
                    data={
                      filteredImages === 'ALL IMAGES' ? imageLink : renderImages
                    }
                    setOnClickImg={setOnClickImg}
                    onClickImg={onClickImg - 1}
                  />
                </Grid>
              ) : (
                <>
                  <Grid
                    container
                    spacing={0.5}
                    sx={{
                      overflowY: 'auto',
                      maxHeight: { xs: '52vh', md: '57vh' },
                      my: 1,
                      mb: 10,
                      px: 2,
                    }}
                  >
                    {(filteredImages === 'ALL IMAGES'
                      ? imageLink
                      : renderImages
                    )?.map((img, idx) => (
                      <Grid item xs={4} key={idx} sx={{ position: 'relative' }}>
                        <Box
                          sx={{
                            width: '100%',
                            height: { xs: 100, sm: 180, lg: 200 },
                            borderRadius: 1,
                            overflow: 'hidden',
                            '& img': {
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.3s ease',
                            },
                            '&:hover img': { transform: 'scale(1.1)' },
                            cursor: 'pointer',
                          }}
                          onClick={() => setOnClickImg(idx + 1)}
                        >
                          <img
                            src={img.url}
                            alt={filteredImages + '-' + idx}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              cursor: 'pointer',
                            }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Box>
          )}

          {selectedTab === 2 && (
            <Box sx={{ mb: 3, mt: 1, px: 2 }}>
              <Box
                sx={{
                  flexGrow: 1,
                  overflowY: 'auto',
                  maxHeight: '57vh',
                }}
              >
                <Box>
                  <ReviewSummary hotelId={hotelId} />
                </Box>
              </Box>
            </Box>
          )}

          {selectedTab === 3 && (
            <Box sx={{ mb: 3, mt: 1, px: 2 }}>
              <Typography
                sx={{
                  color: '#09296B',
                  fontWeight: 500,
                  pb: { xs: 1.5, md: 1 },
                  fontSize: { xs: 12, md: 18 },
                }}
              >
                Facilities/Amenities
              </Typography>

              <Grid
                container
                spacing={1}
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  overflowY: 'auto',
                  maxHeight: '57vh',
                }}
              >
                {item?.facilities?.slice(0, 16).map((item, index) => {
                  const matchingIcon = Object.keys(facilityIcons).find((key) =>
                    item.name.toLowerCase().includes(key.toLowerCase())
                  );

                  return (
                    <Grid
                      item
                      xs={6}
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.2,
                      }}
                    >
                      {matchingIcon ? (
                        facilityIcons[matchingIcon]
                      ) : (
                        <CheckCircleIcon
                          sx={{ color: '#CDD0D3', fontSize: 15 }}
                        />
                      )}
                      <Typography
                        variant="body2"
                        color="#344258"
                        sx={{
                          fontSize: { xs: 10, md: 11, lg: 13 },
                        }}
                        noWrap
                      >
                        {item.name}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}

          {selectedTab === 4 && (
            <Box sx={{ mb: 3, mt: 1, px: 2 }}>
              <Typography
                sx={{
                  color: '#09296B',
                  fontWeight: 500,
                  pb: { xs: 1.5, md: 1 },
                  fontSize: { xs: 12, md: 18 },
                }}
              >
                Attributes
              </Typography>

              <Grid
                container
                spacing={1}
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  overflowY: 'auto',
                  maxHeight: '57vh',
                }}
              >
                {item?.attributes?.map((el, idx) => {
                  const name = el.value;
                  const matchingIcon = Object.keys(facilityIcons).find((key) =>
                    name?.toLowerCase().includes(key?.toLowerCase())
                  );

                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      key={idx}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.2,
                      }}
                    >
                      {matchingIcon ? (
                        facilityIcons[matchingIcon]
                      ) : (
                        <CheckCircleIcon
                          sx={{ color: '#CDD0D3', fontSize: 15 }}
                        />
                      )}
                      <Typography
                        variant="body2"
                        color="#344258"
                        sx={{
                          fontSize: { xs: 10, md: 11, lg: 13 },
                        }}
                        noWrap
                      >
                        <Box sx={{ width: { xs: '80vw', sm: 'auto' } }}>
                          {el.key.toUpperCase()} : {el.value}
                        </Box>
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}
          {selectedTab === 5 && (
            <Box sx={{ mb: 3, mt: 1 }}>
              <HotelLocation lat={lat} lng={lng} name={item.name} />
            </Box>
          )}
          {selectedTab === 6 && nearByAttractions && (
            <Box sx={{ mb: 3, mt: 1, px: 2 }}>
              <Typography
                sx={{
                  color: '#09296B',
                  fontWeight: 500,
                  pb: { xs: 1.5, md: 1 },
                  fontSize: { xs: 12, md: 18 },
                }}
              >
                Attractions
              </Typography>

              <Grid
                container
                spacing={1}
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  overflowY: 'auto',
                  maxHeight: '57vh',
                }}
              >
                {item?.nearByAttractions?.map((item, index) => {
                  const matchingIcon = Object.keys(facilityIcons).find((key) =>
                    item.name.toLowerCase().includes(key.toLowerCase())
                  );

                  return (
                    <Grid
                      item
                      xs={6}
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.2,
                      }}
                    >
                      {matchingIcon ? (
                        facilityIcons[matchingIcon]
                      ) : (
                        <CheckCircleIcon
                          sx={{ color: '#CDD0D3', fontSize: 15 }}
                        />
                      )}
                      <Typography
                        variant="body2"
                        color="#344258"
                        sx={{
                          fontSize: { xs: 10, md: 11, lg: 13 },
                        }}
                        noWrap
                      >
                        {item.name}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}
        </Grid>
        {/* {withoutmodal ? null : (
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            {loading ? <RoomSelectSingleSkeleton /> : <SelectRoomModal />}
          </Grid>
        )} */}
      </Grid>
    </Box>
  );

  if (modalIsOpen) {
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
            boxShadow: 24,
            borderRadius: '6px',
            px: { xs: 0, md: 3 },
            py: 1,
            minWidth: { xs: '95%', sm: '90%', md: '70vw' },
            minHeight: { xs: '50%', sm: '50%', md: '80vh' },
            maxHeight: { xs: '80%', sm: '90%', md: '400px' },
            overflow: 'hidden',
            outline: 'none',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          {content}
        </Box>
      </Modal>
    );
  }

  return <Box>{content}</Box>;
};

export default HotelOverviewModal;
