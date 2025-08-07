/* eslint-disable react/prop-types */
import {
  Box,
  Modal,
  Typography,
  Fade,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Paper,
  Divider,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useFormik } from 'formik';
import * as yup from 'yup';


import { toast } from 'react-toastify';
import Token from '../../Common/Token';
import { useState } from 'react';
import moment from 'moment';
import CommonBackdrop from '../../../common/CommonBackdrop';
import { useActionHotelMutation } from '../../../redux/slices/hotel/hotelApiSlice';

function calculateTotalGuests(roomAllocation) {
  let totalAdult = 0;
  let totalChild = 0;
  for (const room of roomAllocation) {
    totalAdult += room.adultCount || 0;
    totalChild += room.childCount || 0;
  }

  return { totalAdult, totalChild };
}

const ThreadsModal = ({ open, close, data, refetch = [] }) => {
  const [actionHotel, { isLoading }] = useActionHotelMutation();
  const [error, setError] = useState('');
  const agentId = Token();
  const id = data?.id;
  const param = 'threads/startConversation';
  const method = 'POST';

  const hotelName = data?.guestRoomAllocations?.hotelName;
  const checkIn = data?.guestRoomAllocations?.checkIn;
  const checkOut = data?.guestRoomAllocations?.checkOut;
  const roomAllocation = data?.guestRoomAllocations?.roomAllocation?.length;

  const result = calculateTotalGuests(data.guestRoomAllocations.roomAllocation);

  const formik = useFormik({
    initialValues: {
      bookingId: id,
      agentId: agentId,
      reason: '',
    },
    validationSchema: yup.object({
      reason: yup.string().required('Please provide a reason'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const body = {
          bookingId: id,
          agentId: agentId,
          reason: values.reason,
        };
        const response = await actionHotel({ param, body, method }).unwrap();

        if (response?.error?.data?.message) {
          toast.error(response.error.data.message);
        } else {
          toast.success('Form submitted successfully');

          close();
          resetForm();

          if (Array.isArray(refetch)) {
            refetch.forEach((fn) => typeof fn === 'function' && fn());
          } else if (typeof refetch === 'function') {
            refetch();
          }
        }

        toast.success('Request submitted successfully');
        resetForm();
        close();
      } catch (err) {
        toast.error('Failed to submit request');
        setError(err);
      }
    },
  });

  return (
    <>

      <Modal open={open} onClose={close} closeAfterTransition>
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              borderRadius: 3,
              boxShadow: 24,
              width: { xs: '95%', sm: '60%', md: '40%' },
              height: { xs: '90%', md: '65vh' },
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 2,
                py: { xs: 0, md: 0.5 },
                bgcolor: '#2d3e70',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography sx={{ fontSize: { xs: 15, md: 18 } }}>
                Create Support Request
              </Typography>
              <IconButton onClick={close} sx={{ color: '#fff' }}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Content */}
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                px: 3,
                py: 2,
                flex: 1,
                overflowY: 'auto',
                backgroundColor: '#f9fafc',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#ccc',
                  borderRadius: '4px',
                },
              }}
            >
              {/* Select Input */}
              <FormControl fullWidth margin="normal" size="small">
                <InputLabel>Request Type</InputLabel>
                <Select
                  name="reason"
                  value={formik.values.reason}
                  onChange={formik.handleChange}
                  label="Request Type"
                  error={formik.touched.reason && Boolean(formik.errors.reason)}
                >
                  {[
                    'Full Cancellations',
                    'Partial Cancellations',
                    'Room Modifications',
                    'Date Modifications',
                    'Refund Modifications',
                    'Guest Information Modifications',
                    'Other Modifications',
                  ].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Hotel Summary */}
              <Box mt={2} mb={1}>
                <Typography fontWeight="bold" fontSize="1rem">
                  {hotelName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {moment(checkIn).format('DD MMM')} -
                  {moment(checkOut).format('DD MMM')}
                  {` | `} {roomAllocation} room,{' '}
                  {result?.totalAdult + result?.totalChild} guests
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Info Cards */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2, backgroundColor: '#e8f0ff' }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      display="flex"
                      alignItems="center"
                      gutterBottom
                    >
                      <HighlightOffIcon fontSize="small" sx={{ mr: 1 }} />
                      Full Cancellations
                    </Typography>
                    <Typography component="ul" variant="body2" sx={{ pl: 2 }}>
                      <li>Free cancellation requests are final.</li>
                      <li>Non-refundable? We’ll confirm before proceeding.</li>
                      <li>Wallet refund within 36 hours.</li>
                      <li>Waivers may take 48–72 hours.</li>
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2, backgroundColor: '#fff8e1' }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      display="flex"
                      alignItems="center"
                      gutterBottom
                    >
                      <InfoOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                      Know more about this!
                    </Typography>
                    <Typography component="ul" variant="body2" sx={{ pl: 2 }}>
                      <li>Subject to hotel confirmation.</li>
                      <li>Please allow 24–48 hours.</li>
                      <li>Delays may occur on weekends.</li>
                      <li>Handled in local hotel time.</li>
                      <li>No same-day check-in modifications.</li>
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {error && (
                <Alert severity="error" sx={{ mt: 3 }}>
                  {error?.data?.error && (
                    <Typography sx={{ fontSize: { xs: 9, md: 14 } }}>
                      {error.data.error}
                    </Typography>
                  )}
                  {error?.data?.message && (
                    <Typography sx={{ fontSize: { xs: 9, md: 12 } }}>
                      {error.data.message || 'An error occurred'}
                    </Typography>
                  )}
                  {error?.message && !error?.data?.message && (
                    <Typography sx={{ fontSize: { xs: 9, md: 12 } }}>
                      {error.message || 'An error occurred'}
                    </Typography>
                  )}
                </Alert>
              )}

              {/* Footer */}
              <Box
                sx={{
                  mt: 3,
                  borderTop: '1px solid #ddd',
                  bgcolor: '#fff',
                  textAlign: 'center',
                  pt: 2,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    bgcolor: '#2d3e70',
                    px: 4,
                    py: 1.2,
                    borderRadius: '8px',
                    textTransform: 'uppercase',
                  }}
                  fullWidth
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: 'block' }}
                >
                  *All modifications are subject to hotel discretion
                </Typography>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <CommonBackdrop
        handleClose={!isLoading}
        open={isLoading}
      />
    </>
  );
};

export default ThreadsModal;
