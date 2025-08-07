/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import hotel from '../../assets/images/hotel';
import { Box, Grid, Stack, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HotelPolicyModal from './modal/HotelPolicyModal';

const HotelPolicy = ({ item }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setdata] = useState(false);

  const openModal = (item) => {
    setdata(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        px: { xs: 1, md: 2 },
        py: { xs: 0.5, md: 1 },
        backgroundColor: '#f5f7fa',
        borderRadius: 1,
      }}
    >
      <Typography
        sx={{
          color: '#09296B',
          fontWeight: 500,
          pb: { xs: 0.5, md: 1 },
          fontSize: { xs: 12, md: 16 },
        }}
      >
        Hotel Policy
      </Typography>
      <Grid container spacing={0.6} sx={{ mt: -1, px: { xs: 0.5, md: 1 } }}>
        {/* Hotel Policy list */}
        {[
          {
            icon: hotel.arrod,
            label: 'Check-in',
            time: item?.checkinInfo?.beginTime,
          },
          {
            icon: hotel.arrou,
            label: 'Check-out',
            time: item?.checkoutInfo?.time,
          },
        ].map((amenity, index) => (
          <Grid item xs={6} md={6} key={index}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              my={1}
              bgcolor="white"
              p={1}
              px={2}
              borderRadius={2}
            >
              <img
                src={amenity.icon}
                alt={amenity.label}
                style={{
                  width: '15px',
                  height: '15px',
                  objectFit: 'contain',
                }}
              />
              <Box>
                <Typography
                  sx={{ fontSize: { xs: 10, md: 13 }, fontWeight: 500 }}
                >
                  {amenity.label}
                </Typography>
                <Typography
                  sx={{ fontSize: { xs: 10, md: 13 }, color: '#5A6573' }}
                >
                  {amenity.time}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        ))}

        {/* Show more Hotel Policy */}
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Typography
              onClick={() => openModal(item)}
              sx={{
                color: '#2E4FF5',
                fontSize: { xs: 8, md: 12 },
                cursor: 'pointer',
                '&:hover': {
                  color: '#1A3BB5',
                  textDecoration: 'underline',
                },
              }}
            >
              Show All &nbsp;
              <ArrowForwardIosIcon sx={{ fontSize: 9 }} />
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      <HotelPolicyModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        data={data}
      />
    </Box>
  );
};

export default HotelPolicy;
