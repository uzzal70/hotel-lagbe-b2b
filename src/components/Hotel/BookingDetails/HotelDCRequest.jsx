/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Modal,
  Typography,
  ClickAwayListener,
} from '@mui/material';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDateChangeRequestMutation } from '../../../redux/slices/hotel/hotelApiSlice';
import Token from '../../Common/Token';
import { Calendar } from 'react-date-range';
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import { motion, AnimatePresence } from 'framer-motion';
import CommonBackdrop from '../../../common/CommonBackdrop';

const HotelDCRequest = ({ open, close, refetch, refetch1, data, nights }) => {
  const [dateChangeRequest, { isLoading }] = useDateChangeRequestMutation();
  const agentId = Token();

  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);

  const schema = yup.object().shape({
    checkInDate: yup
      .date()
      .required('Check In Date is required')
      .typeError('Invalid date'),
    checkOutDate: yup
      .date()
      .required('Check Out Date is required')
      .typeError('Invalid date'),
  });

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formik = useFormik({
    initialValues: {
      bookingId: data?.id,
      userId: agentId,
      hotelFare: data?.guestRoomAllocations?.finalFare || 0,
      checkInDate: '',
      checkOutDate: '',
      agentRemarks: '',
      remarks: '',
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      const body = {
        bookingId: values.bookingId,
        userId: values.userId,
        hotelFare: values.hotelFare,
        checkInDate: formatDate(values.checkInDate),
        checkOutDate: formatDate(values.checkOutDate),
        agentRemarks: values.agentRemarks,
        remarks: '',
      };

      try {
        const response = await dateChangeRequest(body);
        if (response?.error?.data?.message) {
          toast.error(response.error.data.message);
        } else {
          toast.success('Form submitted successfully');
          close();
          resetForm();
          refetch();
          refetch1();
        }
      } catch (error) {
        toast.error(error.message || 'An error occurred during form submission');
      }
    },
  });

  const handleCheckInChange = (date) => {
    const selected = formatDate(date);
    const current = formatDate(formik.values.checkInDate);

    if (selected === current) {
      formik.setFieldValue('checkInDate', '');
      formik.setFieldValue('checkOutDate', '');
    } else {
      formik.setFieldValue('checkInDate', date);

      const checkOut = new Date(date);
      checkOut.setDate(checkOut.getDate() + (nights || 1));
      formik.setFieldValue('checkOutDate', checkOut);
    }

    setShowCheckInCalendar(false);
  };

  const handleClose = () => {
    formik.resetForm();
    close();
    setShowCheckInCalendar(false);
  };

  useEffect(() => {
    if (!open) {
      formik.resetForm();
      setShowCheckInCalendar(false);
    }
  }, [open]);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <AnimatePresence>
          {open && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                maxWidth: 400,
                background: 'white',
                borderRadius: 12,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <form onSubmit={formik.handleSubmit}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  color="var(--primary)"
                  bgcolor="var(--room)"
                  sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, p: 2, py: 1 }}
                >
                  <Typography fontWeight={600}>Date Change Request</Typography>
                  <Typography
                    onClick={handleClose}
                    sx={{ cursor: 'pointer', color: 'var(--red)' }}
                  >
                    ✕
                  </Typography>
                </Box>

                <Grid container spacing={1.5} p={2} pt={1} color="var(--primary)">
                  {/* Check In */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" mb={0.5} sx={{ fontSize: { xs: 10, md: 13 }, color: '#5A6573' }}>
                      Check In Date <span style={{ color: 'var(--red)' }}>*</span>
                    </Typography>
                    <Box position="relative">
                      <input
                        type="text"
                        readOnly
                        className="form-control"
                        placeholder="Enter checkin date"
                        style={{
                          padding: '8px 36px 8px 10px',
                          border: '1px solid #ccc',
                          borderRadius: 6,
                          width: '100%',
                          outline: 'none',
                        }}
                        value={formik.values.checkInDate ? formatDate(formik.values.checkInDate) : ''}
                        onClick={() => setShowCheckInCalendar(true)}
                      />
                      <CalendarMonthTwoToneIcon
                        onClick={() => setShowCheckInCalendar(true)}
                        sx={{
                          position: 'absolute',
                          right: 10,
                          fontSize: 15,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#aaa',
                          cursor: 'pointer',
                        }}
                      />
                      {showCheckInCalendar && (
                        <ClickAwayListener onClickAway={() => setShowCheckInCalendar(false)}>
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{
                              position: 'absolute',
                              zIndex: 10,
                              top: '110%',
                              left: 0,
                            }}
                          >
                            <Calendar
                              date={formik.values.checkInDate || new Date()}
                              onChange={handleCheckInChange}
                              minDate={new Date()}
                            />
                          </motion.div>
                        </ClickAwayListener>
                      )}
                    </Box>
                    {formik.touched.checkInDate && formik.errors.checkInDate && (
                      <Typography color="error" variant="caption" sx={{ fontSize: 9 }}>
                        {formik.errors.checkInDate}
                      </Typography>
                    )}
                  </Grid>

                  {/* Check Out */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ fontSize: { xs: 10, md: 13 }, color: '#5A6573' }} mb={0.5}>
                      Check Out Date <span style={{ color: 'var(--red)' }}>*</span>
                    </Typography>
                    <Box position="relative">
                      <input
                        type="text"
                        readOnly
                        className="form-control"
                        placeholder="Enter check out date"
                        disabled
                        style={{
                          padding: '8px 36px 8px 10px',
                          border: '1px solid #ccc',
                          borderRadius: 6,
                          width: '100%',
                          outline: 'none',
                        }}
                        value={formik.values.checkOutDate ? formatDate(formik.values.checkOutDate) : ''}
                      />
                      <CalendarMonthTwoToneIcon
                        sx={{
                          position: 'absolute',
                          right: 10,
                          fontSize: 15,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#aaa',
                        }}
                      />
                    </Box>
                    {formik.touched.checkOutDate && formik.errors.checkOutDate && (
                      <Typography color="error" variant="caption" sx={{ fontSize: 9 }}>
                        {formik.errors.checkOutDate}
                      </Typography>
                    )}
                  </Grid>

                  {/* Remarks */}
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ fontSize: { xs: 10, md: 13 }, color: '#5A6573' }} mb={0.5}>
                      Remarks <span style={{ color: 'var(--danger)' }}>*</span>
                    </Typography>
                    <textarea
                      name="agentRemarks"
                      rows="4"
                      className="form-control"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: 6,
                        outline: 'none',
                      }}
                      placeholder="Write your remarks here..."
                      value={formik.values.agentRemarks}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>

                  {/* Submit */}
                  <Grid item xs={12} mb={1}>
                    <Button fullWidth variant="contained" type="submit" disabled={isLoading}>
                      {isLoading ? 'Submitting...' : 'Submit'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>

      <CommonBackdrop handleClose={!isLoading} open={isLoading} />
    </>
  );
};

export default HotelDCRequest;
