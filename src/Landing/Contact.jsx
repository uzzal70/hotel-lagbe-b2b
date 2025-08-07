import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import LandingHeader from './LandingHeader';
import ImageImport from '../assets/ImageImport';
import Footer from './Footer';
import CustomInput from '../components/Common/CustomInput';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useCreateItemMutation } from '../redux/slices/apiSlice';
import { useFormik } from 'formik';
import CustomCircularProgress from '../components/Common/CustomCircularProgress';
import CustomButton from '../components/Common/CustomButton';
import ValidIcon from '../components/Common/validIcon';
import PhoneInput from 'react-phone-input-2';
import companyInfo from '../common/companyInfo';

const Contact = () => {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    message: Yup.string().required('Message is required'),
  });
  const [createItem, { isLoading: isDone, isError }] = useCreateItemMutation();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      phone: '',
      email: '',
      country: '',
      city: '',
      companyName: '',
      message: '',
    },
    onSubmit: async (values, { resetForm }) => {
      // Added resetForm parameter
      try {
        const method = 'post';
        const payload = values;
        const url = `/agent/b2bFeedBack`;
        const headers = {
          accept: '*/*',
          'Content-Type': 'application/json',
        };
        const result = await createItem({
          url,
          method,
          headers,
          payload,
        }).unwrap();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Your message has been submitted!`,
          showConfirmButton: true,
          customClass: {
            popup: 'custom-swal-popup',
          },
        });
        resetForm(); // Reset the form values to their initial state
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: error?.data?.message,
          customClass: {
            popup: 'custom-swal-popup',
          },
        });
      }
    },
    validationSchema: validationSchema,
  });
  const handleOnChange = async (e) => {
    formik.handleChange(e);
  };

  const officeList = [
    {
      country: 'Bangladesh (Dhaka)',
      companyName: companyInfo.companyName,
      phone: '+8809613001005',
      address: '4th Floor, Meem Tower, 104 Sukrabad Rd, Dhaka 1207',
      flag: ImageImport.BD,
      iata: 'IATA Code: 42343755',
    },
    {
      country: 'Bangladesh (Chattogram)',
      companyName: companyInfo.companyName,
      phone: '+8809613001005',
      address: '17th Floor Joy Bangla Tower Agrabad, Chattogram',
      flag: ImageImport.BD,
      iata: 'IATA Code: 42343755',
    },
    {
      country: 'Singapore',
      companyName: companyInfo.sinCompanyName,
      // regNo: ' ',
      phone: 'Reg: 202507933D',
      address: '10 Anson Road, #11-20, International Plaza, Singapore-079903',
      flag: ImageImport.SIN,
    },
    {
      country: 'United Arab Emirates (Dubai)',
      companyName: companyInfo.dubaiCompanyName,
      phone: '+971-566183656',
      address:
        'Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates',
      flag: ImageImport.UAE,
    },
  ];

  return (
    <Box sx={{ bgcolor: 'var(--white)' }}>
      <Box display={{ xs: 'block', sm: 'block', md: 'block' }}>
        <Container>
          <LandingHeader showbtn />
          <Typography
            sx={{
              bgcolor: 'var(--bgcolor)',
              color: 'var(--primary)',
              py: 1,
              px: 2,
              mt: 3,
              borderRadius: 1,
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            Contact with us
          </Typography>
          <Box minHeight="70vh" mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {officeList.map((office, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Box
                        sx={{
                          p: 2,
                          border: '1px solid var(--stroke)',
                          borderRadius: 1,
                          fontSize: 16,
                          padding: '10px 15px',
                        }}
                      >
                        <Box
                          sx={{
                            color: 'var(--primary)',
                            fontSize: 14,
                            mb: 1,
                          }}
                        >
                          {office.country}
                          <Box
                            sx={{
                              color: 'var(--primary)',
                              mt: 0,
                              fontSize: 16,
                              textTransform: 'uppercase',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            {office.companyName}
                            {office.regNo && (
                              <Box fontSize={12}>({office.regNo})</Box>
                            )}
                          </Box>
                        </Box>

                        <Stack direction="row" spacing={2}>
                          <Box>
                            <img
                              src={office.flag}
                              alt={office.country}
                              width="32px"
                            />
                          </Box>
                          <Box color="var(--primary)">{office.phone}</Box>
                        </Stack>

                        <Box
                          sx={{
                            color: 'var(--secondary)',
                            mt: 0.3,
                            fontSize: 14,
                          }}
                        >
                          Address: {office.address}
                        </Box>
                        <Box
                          sx={{
                            color: 'var(--primary)',
                            mt: 1,
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          {office?.iata}
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    color: 'var(--black)',
                    mt: 2,
                    fontSize: { xs: 20, sm: 25, md: 27 },
                  }}
                >
                  We would love to <br /> receive your query
                </Box>

                <p>
                  For a prompt reply, please submit your <br /> request or
                  inquiry using this form.
                </p>

                <Box sx={{ color: 'var(--disable)', mt: 2 }}>
                  Don't hesitate to reach out to us.
                  <br />
                  Connect with us at:
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={8}
                sx={{ display: 'flex', justifyContent: 'end' }}
              >
                <Box my={3}>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          label="Full Name"
                          name="fullName"
                          type="text"
                          placeholder="Full Name"
                          formik={formik.errors.fullName}
                          value={formik.values.fullName}
                          touched={formik.touched.fullName}
                          handleOnChange={handleOnChange}
                          padding="10px 15px"
                          width={{ xs: '90%', sm: '95%', md: '90%' }}
                          fontSize="16px"
                          border="1px solid var(--stroke)"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box width={{ xs: '100%' }}>
                          <Typography
                            sx={{
                              color: 'var(--secondary)',
                              fontSize: 12,
                            }}
                          >
                            Phone Number
                          </Typography>
                          <PhoneInput
                            required
                            country={'bd'}
                            // name="phone"
                            // id="phone"
                            value={formik.values.phone || ''}
                            placeholder="Phone Number"
                            touched={formik.touched.phone || ''}
                            onChange={(e) => {
                              const value = {
                                target: {
                                  name: 'phone',
                                  value: e,
                                },
                              };
                              handleOnChange(value, 'phone');
                            }}
                            style={{
                              height: '40px',
                              fontSize: '16px',
                              border: 'none',
                              borderRadius: '5px',
                              overflow: 'hidden',
                            }}
                          />
                          {formik.touched.phone && formik.errors.phone ? (
                            <div>
                              <ValidIcon
                                msg={formik.errors.phone}
                                fontColor="var(--red)"
                              />
                            </div>
                          ) : (
                            ''
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          label="Company Name (optional)"
                          name="companyName"
                          type="text"
                          placeholder="Company Name"
                          // formik={formik.errors.phone}
                          value={formik.values.companyName}
                          // touched={formik.touched.phone}
                          handleOnChange={handleOnChange}
                          padding="10px 15px"
                          width={{ xs: '90%', sm: '95%', md: '90%' }}
                          fontSize="16px"
                          border="1px solid var(--stroke)"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          label="Email"
                          name="email"
                          type="email"
                          placeholder="Email"
                          formik={formik.errors.email}
                          value={formik.values.email}
                          touched={formik.touched.email}
                          handleOnChange={handleOnChange}
                          padding="10px 15px"
                          width={{ xs: '90%', sm: '95%', md: '90%' }}
                          fontSize="16px"
                          border="1px solid var(--stroke)"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          label="Country"
                          name="country"
                          type="text"
                          placeholder="Country"
                          formik={formik.errors.country}
                          value={formik.values.country}
                          touched={formik.touched.country}
                          handleOnChange={handleOnChange}
                          padding="10px 15px"
                          width={{ xs: '90%', sm: '95%', md: '90%' }}
                          fontSize="16px"
                          border="1px solid var(--stroke)"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <CustomInput
                          label="City"
                          name="city"
                          type="text"
                          placeholder="City"
                          formik={formik.errors.city}
                          value={formik.values.city}
                          touched={formik.touched.city}
                          handleOnChange={handleOnChange}
                          padding="10px 15px"
                          width={{ xs: '90%', sm: '95%', md: '90%' }}
                          fontSize="16px"
                          border="1px solid var(--stroke)"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          textarea: {
                            width: { xs: '100%' },
                            boxSizing: 'border-box',
                          },
                        }}
                      >
                        <textarea
                          label="Message"
                          name="message"
                          placeholder="Message"
                          rows="4"
                          cols="50"
                          value={formik.values.message}
                          onChange={handleOnChange}
                          style={{
                            padding: '10px 15px',
                            fontSize: '16px',
                            outline: 'none',
                            border: '1px solid var(--bgcolor)',
                            background: 'var(--gray)',
                            borderRadius: '5px',
                            resize: 'none',
                            color: 'var(--black)',
                          }}
                        />
                        {formik.touched.message && formik.errors.message && (
                          <ValidIcon
                            msg={formik.errors.message}
                            fontColor="var(--red)"
                          />
                        )}
                      </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} mt={3}>
                      {isDone ? (
                        <Box
                          sx={{
                            pt: 1.4,
                            pb: 3.4,
                            bgcolor: 'var(--bgcolor)',
                            borderRadius: '5px',
                            width: '90%',
                          }}
                        >
                          <CustomCircularProgress size={16} />
                        </Box>
                      ) : (
                        <Box>
                          <CustomButton
                            type="submit"
                            value={`Submit`}
                            bgcolor="var(--primary)"
                            hovercolor="var(--primary-rgb)"
                            textcolor="var(--white)"
                            width="95%"
                            justify="center"
                            padding={'8px 20px'}
                            disabled={isDone ? true : false}
                          />
                        </Box>
                      )}
                    </Grid>
                  </form>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Footer value="true" />
      </Box>
    </Box>
  );
};

export default Contact;
