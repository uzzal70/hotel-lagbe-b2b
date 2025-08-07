/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';

import hotel from '../../assets/images/hotel';
import pdf from '../../assets/pdf';
import HotelAmenitiesModal from './modal/HotelAmenitiesModal';
import { facilityIcons } from '../Utils/facilityIcons';

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Amenities = ({ item, no }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const iconMap = {
    Laundry: pdf.basg,
    Luggage: pdf.bag,
    Wheelchair: hotel.wheelchair,
    Wifi: hotel.wifi,
    Coffee: hotel.coffee,
    Health: hotel.hclub,
    Pool: hotel.spool,
    Restaurant: hotel.dining,
    Breakfast: hotel.breakfast,
    Minibar: hotel.minibar,
    Water: hotel.water,
  };

  const getIcon = useMemo(
    () => (amenityName) => {
      if (!amenityName) return hotel.minibar;

      const lowerName = amenityName.toLowerCase();

      if (lowerName.includes('laundry')) return iconMap.Laundry;
      if (lowerName.includes('luggage')) return iconMap.Luggage;
      if (lowerName.includes('wheelchair')) return iconMap.Wheelchair;
      if (lowerName.includes('wifi')) return iconMap.Wifi;
      if (lowerName.includes('coffee')) return iconMap.Coffee;
      if (lowerName.includes('health') || lowerName.includes('food')) return iconMap.Health;
      if (lowerName.includes('breakfast')) return iconMap.Breakfast;
      if (lowerName.includes('water')) return iconMap.Water;

      return hotel.air;
    },
    [iconMap]
  );

  const boxStyles = useMemo(
    () => ({
      width: '100%',
      px: no ? 0 : { xs: 1, md: 2 },
      py: no ? 0 : { xs: 0.5, md: 1 },
      border: no ? 'none' : 1,
      borderColor: 'grey.100',
    }),
    [no]
  );

  const count = item?.length > 6 ? item.length - 6 : 0;

  return (
    <Box sx={boxStyles}>
      <Typography
        sx={{
          color: '#09296B',
          fontWeight: 500,
          pb: { xs: 1.5, md: 1 },
          fontSize: { xs: 12, md: 16 },
        }}
      >
        Most popular Facilities/Amenities
      </Typography>

      <Grid container spacing={0.6} sx={{ mt: 0, px: { xs: 0.5, md: 1 } }}>
        <Grid container spacing={0.6} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {item?.slice(0, 6).map((item, index) => {
            const matchingIcon = Object.keys(facilityIcons).find(key =>
              item.name.toLowerCase().includes(key.toLowerCase())
            );

            return (
              <Grid
                item
                xs={6}
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {matchingIcon ? facilityIcons[matchingIcon] : (
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

        {count > 0 && (
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <Typography
                onClick={() => openModal(item)}
                sx={{
                  color: '#2E4FF5',
                  fontSize: { xs: 9, md: 12 },
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#1A3BB5',
                    textDecoration: 'underline',
                  },
                }}
              >
                + {count} more
              </Typography>
            </Stack>
          </Grid>
        )}
      </Grid>

      <HotelAmenitiesModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        item={item}
      />
    </Box>
  );
};

export default Amenities;
