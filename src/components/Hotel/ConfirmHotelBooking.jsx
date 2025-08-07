import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import BackButton from '../Common/BackButton';
import ImportantInfoHotel from './content/ImportantInfoHotel';
import RoomList from './RoomCard';
import AmenityAttracttions from './content/AmenityAttracttions';
import CheckIn from './content/CheckIn';
import PriceBreakup from './content/PriceBreakup';
import NeedModification from './content/NeedModification';
import DownloadSection from './content/DownloadSection';
import { useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HotelIcon from '@mui/icons-material/Hotel';
import PaymentIcon from '@mui/icons-material/Payment';
import EventIcon from '@mui/icons-material/Event';
import HeaderTitle from '../../common/HeaderTitle';

const ConfirmHotelBooking = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedQuery = queryParams.get('query');
  const decodedQuery = encodedQuery
    ? JSON.parse(decodeURIComponent(encodedQuery))
    : null;
  const { bookingRef, status, pnr, roomConfirmation, price } = decodedQuery;

  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        pb: { xs: 10, md: 1 },
      }}
    >
      <HeaderTitle headerTitle={'Booking is Confirmed'} />

      <Container sx={{ px: { xs: 1, sm: 2, md: '' } }}>
        <Box mt={{ xs: 2, md: 4 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Paper
              elevation={6}
              sx={{
                padding: 4,
                borderRadius: 2,
                maxWidth: 600,
                width: '100%',
                backgroundColor: '#ffffff',
                boxShadow: 4,
              }}
            >
              <Typography
                variant="h4"
                align="center"
                sx={{ color: '#3f51b5', fontWeight: 'bold', marginBottom: 2 }}
              >
                <CheckCircleIcon
                  sx={{ verticalAlign: 'middle', marginRight: 1 }}
                />
                Booking Confirmed
              </Typography>

              <Divider sx={{ marginBottom: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: '#3f51b5' }}>
                    Booking Reference
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', color: '#333' }}
                  >
                    {bookingRef}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: '#3f51b5' }}>
                    Booking Status
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#4caf50' }}>
                    {status}{' '}
                    <CheckCircleIcon
                      sx={{ color: '#4caf50', verticalAlign: 'middle' }}
                    />
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: '#3f51b5' }}>
                    PNR
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333' }}>
                    {pnr}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: '#3f51b5' }}>
                    Room Confirmation
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333' }}>
                    {roomConfirmation.map((room, index) => (
                      <div key={index}>
                        <Typography variant="body2" sx={{ color: '#555' }}>
                          <HotelIcon
                            sx={{ verticalAlign: 'middle', marginRight: 1 }}
                          />
                          Hotel Confirmation Number:{' '}
                          {room.hotelConfirmationNumber}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#555' }}>
                          <EventIcon
                            sx={{ verticalAlign: 'middle', marginRight: 1 }}
                          />
                          Rate ID: {room.rateId} | Room ID: {room.roomId}
                        </Typography>
                        <Divider sx={{ margin: '10px 0' }} />
                      </div>
                    ))}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: '#3f51b5' }}>
                    Total Price
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', color: '#333' }}
                  >
                    <PaymentIcon
                      sx={{ verticalAlign: 'middle', marginRight: 1 }}
                    />
                    {price.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
          <Box></Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ConfirmHotelBooking;
