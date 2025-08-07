/* eslint-disable no-unused-vars */
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../Common/CustomInput';
import CustomButton from '../Common/CustomButton';
import Select from '../Common/Select';
import { useCallback } from 'react';
import BackButton from '../Common/BackButton';
import Token from '../Common/Token';
import { ToastContainer } from 'react-toastify';
import { useCreateItemMutation } from '../../redux/slices/apiSlice';
import CustomCircularProgress from '../Common/CustomCircularProgress';
import Swal from 'sweetalert2';
import getAuthToken from '../Common/getAuthToken';
import HeaderTitle from '../../common/HeaderTitle';

const AddStaff = () => {
  const token = getAuthToken();
  const location = useLocation();
  const agentId = Token();
  const staffRoleData = [
    {
      name: 'Manager',
      value: 'Manager',
    },
    {
      name: 'Reservation Officer',
      value: 'Reservation Officer',
    },
    {
      name: 'Operation Executive',
      value: 'Operation Executive',
    },
    {
      name: 'Staff',
      value: 'Staff',
    },
  ];

  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    role: Yup.string().required('Role is required'),
    password: Yup.string().required('Password is required'),
  });
  const { firstName, lastName, email, phone } = location?.state?.data || '';
  const role = location?.state?.role;
  const method = location?.state?.update || 'post';

  const userId = location?.state?.userId;
  const formik = useFormik({
    initialValues: {
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      phone: phone || '',
      dob: '',
      city: '',
      role: role || '',
      country: '',
      password: '',
      showPassword: false,
    },
    onSubmit: async () => {
      try {
        const { firstName, lastName, email, phone, role, password } =
          formik.values;
        const payload = {
          agentId: agentId,
          designation: role || '',
          user: {
            firstName: firstName || '',
            lastName: lastName || '',
            email: email?.toLowerCase() || '',
            phone: phone || '',
            dob: '',
            city: '',
            country: '',
            password: password || '',
          },
        };
        const url =
          method === 'post'
            ? `/agent/addAgentStaff`
            : `/agent/updateAgentStaff/${userId}`;
        const headers = {
          accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        const result = await createItem({
          url,
          method,
          headers,
          payload,
        }).unwrap();
        Swal.fire(
          {
            position: 'center',
            icon: 'success',
            title: `Your staff has been  ${
              method === 'post' ? 'saved' : 'updated'
            }`,
            showConfirmButton: false,
            timer: 5000,
          },
          navigate('/dashboard/staff')
        );
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error?.data?.message || 'Something went wrong!',
          // footer: error?.data?.message,
        });
      }
    },
    validationSchema: validationSchema,
  });

  const [createItem, { isLoading, isError }] = useCreateItemMutation();

  const handleOnChange = useCallback(async (e) => {
    formik.handleChange(e);
  }, []);

  const handleShowPassword = () => {
    formik.setFieldValue('showPassword', !formik.values.showPassword);
  };

  const handleTravellarList = () => {
    navigate('/dashboard/travellar');
  };

  return (
    <Box
      sx={{
        minHeight: {
          xs: '100vh',
          md: '100vh',
          lg: 'calc(100vh - 50px)',
        },
        paddingBottom: {
          xs: 7,
          md: 1,
        },
      }}
    >
      <HeaderTitle
        headerTitle={`${location?.state?.update ? 'Update' : 'Add'} Staff`}
      />

      <Container sx={{ px: { xs: 1, sm: 2, md: '' } }}>
        <Box
          sx={{
            my: 2,
            p: { xs: 2, md: 3 },
            bgcolor: 'var(--white)',
            borderRadius: '10px',
          }}
        >
          <Typography
            sx={{
              color: 'var(--secondary)',
              fontSize: 20,
              fontWeight: 500,
              mb: 2,
            }}
          >
            Staff Contact Information
          </Typography>

          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  label="First Name"
                  name="firstName"
                  placeholder="First Name"
                  formik={formik.errors.firstName}
                  value={formik.values.firstName}
                  handleOnChange={handleOnChange}
                  padding="10px 15px"
                  fontSize="16px"
                  border="1px solid var(--stroke)"
                  touched={formik.touched.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  label="Last Name"
                  name="lastName"
                  placeholder="Last Name"
                  formik={formik.errors.lastName}
                  value={formik.values.lastName}
                  handleOnChange={handleOnChange}
                  padding="10px 15px"
                  fontSize="16px"
                  border="1px solid var(--stroke)"
                  touched={formik.touched.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  label="Phone Number"
                  name="phone"
                  placeholder="Phone Number"
                  formik={formik.errors.phone}
                  value={formik.values.phone}
                  handleOnChange={handleOnChange}
                  padding="10px 15px"
                  fontSize="16px"
                  border="1px solid var(--stroke)"
                  touched={formik.touched.phone}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Select
                  label="Select Role"
                  name="role"
                  placeholder="Select Role"
                  formik={formik.errors.role}
                  value={formik.values.role}
                  onChange={handleOnChange}
                  data={staffRoleData}
                  display="block"
                  padding="10px"
                  fontSize="16px"
                  border="1px solid var(--stroke)"
                  touched={formik.touched.role}
                />
              </Grid>
              <Grid item xs={12} mt={2}>
                <Typography
                  sx={{
                    color: 'var(--secondary)',
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                >
                  Staff Login Information
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomInput
                  type="email"
                  label="Email Address"
                  name="email"
                  placeholder="Email Address"
                  formik={formik.errors.email}
                  value={formik.values.email}
                  handleOnChange={handleOnChange}
                  padding="10px 15px"
                  fontSize="16px"
                  border="1px solid var(--stroke)"
                  disabled={location?.state?.update ? true : false}
                  touched={formik.touched.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  type={formik.values.showPassword ? 'text' : 'password'}
                  label="Password"
                  name="password"
                  placeholder="Password"
                  formik={formik.errors.password}
                  value={formik.values.password}
                  handleOnChange={handleOnChange}
                  show={formik.values.showPassword}
                  handleShow={handleShowPassword}
                  padding="10px 15px"
                  fontSize="16px"
                  border="1px solid var(--stroke)"
                  touched={formik.touched.password}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} mt={4}>
                {isLoading ? (
                  <Box
                    sx={{
                      pt: 1.4,
                      pb: 3.4,
                      bgcolor: 'var(--bgcolor)',
                      borderRadius: '5px',
                      width: '100%',
                    }}
                  >
                    <CustomCircularProgress size={16} />
                  </Box>
                ) : (
                  <Box>
                    <CustomButton
                      type="submit"
                      value={
                        location?.state?.update ? 'Update Staff' : 'Add Staff'
                      }
                      bgcolor="var(--primary)"
                      hovercolor="var(--primary-rgb)"
                      textcolor="var(--white)"
                      width="100%"
                      justify="center"
                      padding={'8px 20px'}
                      disabled={isLoading ? true : false}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
      <ToastContainer
        position="center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  );
};
export default AddStaff;
