/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import hotel from '../../../assets/images/hotel';
import AllImageLinks from './AllImageLinks';
import Amenities from '../Amenities';
import HotelPolicy from '../HotelPolicy';
import Attractions from '../Attractions';
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../../redux/slices/hotelHeaderSlice';
import companyInfo from '../../../common/companyInfo';

const HotelHeaderDetails = ({
  item,
  address,
  city,
  roomLoading,
  handleScrollToDiv,
  roomDiv,
}) => {
  const dispatch = useDispatch();
  const { minFinalRate } = useSelector((state) => state.roomFilter);

  const { modalIsOpen, modalState, overviewData } = useSelector(
    (state) => state.hotelHeader
  );

  const handleOpenModal = (item, modal) => {
    dispatch(openModal({ item, modal }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2 },
        bgcolor: 'var(--white)',
        my: 2,
        pt: 1,
        borderRadius: 1.5,
        pb: 1,
      }}
    >
      {/* Header Section */}

      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Grid item xs={9} sm={8} md={7.5}>
          <Box display="flex" alignItems="center">
            <Typography
              sx={{
                color: '#10294D',
                fontWeight: 500,
                fontSize: { xs: 13, md: 20 },
                mr: 1,
              }}
            >
              {item?.name}
            </Typography>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <Rating rating={item?.starRating} />
            </Box>
          </Box>

          {/* Address */}
          <Stack direction="row" spacing={1} alignItems="center">
            <img src={hotel.loc} alt="Location" width={12} height={12} />
            <Typography
              sx={{
                color: '#79859A',
                fontWeight: 300,
                fontSize: { xs: 10, md: 12 },
              }}
              noWrap
            >
              {address?.line1}
              {address?.line2 ? `, ${address.line2}` : ''}
              {city ? `, ${city}` : ''} {address?.state?.name}
            </Typography>
            <Typography
              onClick={() => handleOpenModal(item, 'Show Map')}
              sx={{
                color: '#3164FF',
                fontWeight: 300,
                fontSize: { xs: 10, md: 12 },
                cursor: 'pointer',
              }}
              noWrap
            >
              Show map
            </Typography>
          </Stack>

          {/* Contact */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocalPhoneIcon sx={{ fontSize: 12, color: '#79859A' }} />
            <Typography
              sx={{
                color: '#79859A',
                fontWeight: 300,
                fontSize: { xs: 10, md: 12 },
              }}
              noWrap
            >
              {item?.contact?.phones}{' '}
              {address?.country?.name &&
                `, ${address.country.name} (${address.country.code})`}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={3} sm={4} md={4} textAlign={'end'}>
          <Box>
            <Button
              onClick={() => handleScrollToDiv(roomDiv)}
              sx={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                textTransform: 'capitalize',
                '&:hover': {
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                },
                px: { xs: 1, md: 2 },
              }}
              size="small"
            >
              Select Room
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Image Grid */}
      <Grid container spacing={0.6} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: '100%',
              height: { lg: 338, xs: 250 },
              borderRadius: 1,
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              '& img': {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
              },
              '&:hover img': { transform: 'scale(1.1)' },
            }}
          >
            <img
              src={item?.heroImage}
              alt="Main"
              onClick={() => handleOpenModal(item, 'Overview')}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <AllImageLinks
            item={item}
            modalIsOpen={modalIsOpen}
            onClick={() => handleOpenModal(item, 'ALL IMAGES')}
            closeModal={handleCloseModal}
            data={overviewData}
            modalState={modalState}
          />
        </Grid>
      </Grid>

      {/* Amenities, Hotel Policy, Attractions */}
      <Paper elevation={0} sx={{ my: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Amenities item={item?.facilities} />
          </Grid>
          <Grid item xs={12} md={4}>
            <HotelPolicy item={item} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Attractions item={item?.nearByAttractions} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default HotelHeaderDetails;
