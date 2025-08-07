import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { Box, Typography, Grid, IconButton, Collapse } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PhoneInput from 'react-phone-input-2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../../redux/slices/simCardSlice';

const SimCardForm = () => {
  const dispatch = useDispatch();
  const simCards = useSelector((state) => state.simCards.count);

  const [expanded, setExpanded] = useState({ 0: false, 1: false });

  const handleToggle = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const validationSchema = Yup.object({
    userDetails: Yup.array().of(
      Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .email('Invalid email format')
          .required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
      })
    ),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      userDetails: [{ name: '', email: '', phone: '' }],
    },
    validationSchema,
  });

  const handleAddSimCard = () => {
    if (simCards < 9) {
      dispatch(increment());
      formik.setFieldValue('userDetails', [
        ...formik.values.userDetails,
        { name: '', email: '', phone: '' },
      ]);
    }
  };

  const handleRemoveSimCard = () => {
    if (simCards > 1) {
      dispatch(decrement());
      formik.setFieldValue(
        'userDetails',
        formik.values.userDetails.slice(0, -1)
      );
    }
  };

  const renderUserDetails = () => {
    return formik.values.userDetails.map((user, i) => (
      <Box key={i} sx={{ marginBottom: 2 }}>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 0.8,
            color: 'var(--primary)',
            fontSize: { xs: 12, lg: 15 },
          }}
        >
          User Details Pax-{i + 1}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                input: {
                  padding: '10px 10px',
                  fontSize: 14,
                  border: '1px solid var(--stroke)',
                  fontWeight: 400,
                  width: '100%',
                  boxSizing: 'border-box',
                  outline: 'none',
                },
              }}
              className="custom-input"
            >
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={user.name}
                onChange={(e) =>
                  formik.setFieldValue(`userDetails[${i}].name`, e.target.value)
                }
                style={{ width: '100%', padding: '10px', fontSize: '14px' }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                input: {
                  padding: '10px 10px',
                  fontSize: 14,
                  border: '1px solid var(--stroke)',
                  fontWeight: 400,
                  width: '100%',
                  boxSizing: 'border-box',
                  outline: 'none',
                },
              }}
              className="custom-input"
            >
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={user.email}
                onChange={(e) =>
                  formik.setFieldValue(
                    `userDetails[${i}].email`,
                    e.target.value
                  )
                }
                style={{ width: '100%', padding: '10px', fontSize: '14px' }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                '.special-label': { display: 'none' },
                input: {
                  p: '10px 15px',
                  border: '1px solid var(--stroke) !important',
                },
              }}
              className="custom-input"
            >
              <label htmlFor="phone">Passenger Phone Number</label>
              <PhoneInput
                required
                country={'bd'}
                name="phone"
                id="phone"
                value={user.phone}
                enableSearch={true}
                countryCodeEditable={false}
                onChange={(phoneNumber) =>
                  formik.setFieldValue(`userDetails[${i}].phone`, phoneNumber)
                }
                style={{ width: '100%', height: '100%' }}
                containerClass="custom-phone-input"
                dropdownClass="custom-dropdown"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    ));
  };

  return (
    <Box
      sx={{
        bgcolor: 'var(--white)',
        borderRadius: '10px',
        px: 2,
        py: 1,
        mt: 1.5,
      }}
    >
      <Box>
        <Typography
          sx={{
            color: 'var(--black)',
            fontWeight: 500,
            fontSize: { xs: 13, md: 17 },
            mb: 0.8,
          }}
        >
          Number of Sim Cards
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} sx={{ position: 'relative' }}>
            <Box>
              <Typography
                sx={{
                  backgroundColor: 'var(--gray)',
                  fontSize: { xs: 12, md: 13 },
                  border: 1,
                  borderColor: 'var(--bgcolor)',
                  px: 1.5,
                  py: { xs: 0.7, lg: 0.8 },
                  borderRadius: '5px',
                }}
              >
                {simCards}
              </Typography>
            </Box>

            <Box
              sx={{ position: 'absolute', top: { xs: 17.5, md: 18 }, right: 5 }}
            >
              <IconButton
                color="error"
                onClick={handleRemoveSimCard}
                disabled={simCards === 1}
              >
                <RemoveIcon
                  sx={{ width: { xs: 10, md: 13 }, height: { xs: 10, md: 13 } }}
                />
              </IconButton>

              <IconButton
                color="primary"
                onClick={handleAddSimCard}
                disabled={simCards === 9}
              >
                <AddIcon
                  sx={{ width: { xs: 10, md: 13 }, height: { xs: 10, md: 13 } }}
                />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {renderUserDetails()}

      {/* FAQ Section */}
      <Box sx={{ marginTop: 2.5, mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            color: 'primary',
            fontSize: { xs: 13, md: 17 },
          }}
        >
          Frequently asked questions
        </Typography>
        {[
          {
            question: 'What is Tripfindy Wallet?',
            answer:
              'Tripfindy Wallet is a payment system that allows you to pay using points.',
          },
          {
            question: 'Can I pay for my booking in full with Wallet points?',
            answer:
              'Yes, bookings can be paid in full with Wallet points. Conditions apply.',
          },
        ].map((faq, i) => (
          <Box key={i} sx={{ marginBottom: 1 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: 'var(--gray)',
                px: 1.5,
              }}
              onClick={() => handleToggle(i)}
            >
              <Typography sx={{ fontSize: { xs: 11, lg: 13 }, color: 'black' }}>
                {faq.question}
              </Typography>
              <IconButton>
                <ExpandMoreIcon
                  sx={{
                    transform: expanded[i] ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    fontSize: { xs: 15, md: 20 },
                  }}
                />
              </IconButton>
            </Box>
            <Collapse in={expanded[i]}>
              <Typography
                sx={{
                  fontSize: { xs: 10, lg: 12 },
                  px: 1.5,
                  py: 1,
                  color: 'black',
                }}
              >
                {faq.answer}
              </Typography>
            </Collapse>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SimCardForm;
