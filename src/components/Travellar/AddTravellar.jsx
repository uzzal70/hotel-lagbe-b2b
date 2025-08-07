/* eslint-disable no-unused-vars */
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../Common/CustomInput';
import CustomButton from '../Common/CustomButton';
import ImageImport from '../../assets/ImageImport';
import Select from './../Common/Select';
import countrylist from '../Utils/countrylists';
import InputDatePicker from '../Common/InputDatePicker';
import BackButton from '../Common/BackButton';
import FileUpload from './../Common/FileUpload';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import CustomCircularProgress from '../Common/CustomCircularProgress';
import Token from '../Common/Token';
import Swal from 'sweetalert2';
import moment from 'moment';
import getAuthToken from './../Common/getAuthToken';
import { baseUrl } from '../../../baseurl';
import HeaderTitle from '../../common/HeaderTitle';
const AddTravellar = () => {
  const agentId = Token();
  const token = getAuthToken();
  const location = useLocation();
  const genderData = [
    {
      name: 'Male',
      value: 'M',
    },
    {
      name: 'Female',
      value: 'F',
    },
  ];
  const InfantGenderData = [
    {
      name: 'Male',
      value: 'MI',
    },
    {
      name: 'Female',
      value: 'FI',
    },
  ];
  const passengerTypes = [
    {
      name: 'Adult',
      value: 'ADT',
    },
    {
      name: 'Child',
      value: 'CNN',
    },
    {
      name: 'Infant',
      value: 'INF',
    },
  ];

  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    passengerType: Yup.string().required('Type  is required'),
    lastName: Yup.string().required('lastName / Last name is required'),
    firstName: Yup.string().required('Given Name / First name is required'),
    gender: Yup.string().required('Gender is required'),
    dateOfBirth: Yup.string().required('Date of birth is required'),
    nationalityCountry: Yup.string().required('Nationality is required'),
    passportNo: Yup.string().required('Passport number is required'),
    passportEx: Yup.string().required('Passport expiry date is required'),
  });
  const locationData = location?.state?.item || location?.state || '';
  const {
    id,
    firstName,
    lastName,
    gender,
    dateOfBirth,
    passengerType,
    passportNo,
    passportEx,
    nationalityCountry,
    update,
  } = locationData;

  const [isDone, setIsDone] = useState(true);
  const dateValidation = new Date();
  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }
  let dateAfterSixMonths = addMonths(new Date(dateValidation), 6);
  let dateBeforeTwelveYears = addMonths(new Date(dateValidation), -144);
  let dateBeforeTwoYears = addMonths(new Date(dateValidation), -24);
  const formik = useFormik({
    initialValues: {
      agentId: agentId || '',
      passengerType: passengerType || '',
      firstName: firstName || '',
      lastName: lastName || '',
      middleName: '',
      gender: gender || '',
      dateOfBirth: dateOfBirth || '',
      nationalityCountry: nationalityCountry || '',
      passportNo: passportNo || '',
      passportEx: passportEx || '',
      frequentFlyer: '',
      frequentFlyerNumber: '',
      passport: null,
      visa: null,
      visaError: '',
      passportError: '',
      openDate: false,
      openPassExDate: false,
      phone: '',
      email: '',
    },

    onSubmit: async () => {
      try {
        setIsDone(false);
        const formData = new FormData();
        const arrayOfData = [formik.values];
        const traveller = JSON.stringify(arrayOfData);
        formData.append('traveller[]', traveller);
        formData.append('passport0', formik.values.passport);
        formData.append('visa0', formik.values.visa);

        const commonHeaders = {
          accept: '*/*',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        };
        const endpoint = `${baseUrl}/core/traveller/createBulkTravellers`;

        const response = await axios({
          method: 'post',
          url: endpoint,
          data: formData,
          headers: commonHeaders,
        });

        Swal.fire(
          {
            position: 'center',
            icon: 'success',
            title: `Your traveller has been  ${update ? 'updated' : 'saved'}`,
            showConfirmButton: false,
            timer: 5000,
          },
          navigate('/dashboard/travellar')
        );
      } catch (error) {
        setIsDone(false);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: error?.data?.message,
        });
      } finally {
        setIsDone(true);
      }
    },

    validationSchema: validationSchema,
  });
  const handleOnChange = async (e) => {
    formik.handleChange(e);
  };

  const handleOpen = (name) => {
    if (name === 'dateOfBirth') {
      formik.setFieldValue('openDate', true);
    } else {
      formik.setFieldValue('openPassExDate', true);
    }
  };

  const handleClose = (name) => {
    if (name === 'dateOfBirth') {
      formik.setFieldValue('openDate', false);
    } else {
      formik.setFieldValue('openPassExDate', false);
    }
  };

  const handleDateSelect = (selectedDate, name) => {
    const date = moment(selectedDate).format('DD MMM YYYY');
    formik.setFieldValue(name, date);
    handleClose(name);
  };

  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        pb: { xs: 10, md: 1 },
      }}
    >
      <HeaderTitle headerTitle={`Traveller ${update || 'Add'}`} />

      <Container sx={{ px: { xs: 1, sm: 2, md: '' } }}>
        <Box
          sx={{
            mt: { xs: 3, md: 5 },
            p: { xs: 2, md: 3 },
            bgcolor: 'var(--white)',
            borderRadius: '10px',
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  label="Given Name / First name"
                  name="firstName"
                  placeholder="Given Name / First name"
                  formik={formik.errors.firstName}
                  value={formik.values.firstName}
                  touched={formik.touched.firstName}
                  handleOnChange={handleOnChange}
                  padding="10px 15px"
                  fontSize="16px"
                  border="none"
                  img={ImageImport.givenName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomInput
                  label="Surname / Last name"
                  name="lastName"
                  placeholder="Surname / Last name"
                  formik={formik.errors.lastName}
                  value={formik.values.lastName}
                  touched={formik.touched.lastName}
                  handleOnChange={handleOnChange}
                  padding="10px 15px"
                  fontSize="16px"
                  border="none"
                  img={ImageImport.lastName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Select
                  label="Select Type"
                  name="passengerType"
                  placeholder="Select Type"
                  formik={formik.errors.passengerType}
                  value={formik.values.passengerType}
                  touched={formik.touched.passengerType}
                  onChange={handleOnChange}
                  data={passengerTypes}
                  display="block"
                  padding="10.5px 15px"
                  fontSize="16px"
                  border="none"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  label="Select Gender"
                  name="gender"
                  placeholder="Select Gender"
                  formik={formik.errors.gender}
                  value={formik.values.gender}
                  touched={formik.touched.gender}
                  onChange={handleOnChange}
                  data={
                    formik?.values?.passengerType === 'INF'
                      ? InfantGenderData
                      : genderData
                  }
                  display="block"
                  padding="10.5px 15px"
                  fontSize="16px"
                  border="none"
                />
              </Grid>
              <Grid item xs={12} sm={6} className="custom-input">
                <label>Date of Birth</label>
                <InputDatePicker
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  formik={formik.errors.dateOfBirth}
                  date={formik.values.dateOfBirth}
                  touched={formik.touched.dateOfBirth}
                  open={formik.values.openDate}
                  handleDateSelect={handleDateSelect}
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                  maxDate={
                    formik.values.passengerType === 'INF'
                      ? new Date()
                      : formik.values.passengerType === 'CNN'
                      ? new Date(dateBeforeTwoYears)
                      : new Date(dateBeforeTwelveYears)
                  }
                  minDate={
                    formik.values.passengerType === 'INF'
                      ? new Date(dateBeforeTwoYears)
                      : formik.values.passengerType === 'CNN'
                      ? new Date(dateBeforeTwelveYears)
                      : ''
                  }
                  selectDate={
                    formik.values.passengerType === 'INF'
                      ? new Date()
                      : formik.values.passengerType === 'CNN'
                      ? new Date(dateBeforeTwoYears)
                      : new Date(dateBeforeTwelveYears)
                  }
                  padding="10px 15px"
                  fontSize="16px"
                  width="100%"
                  display="none"
                  bgcolor="var(--gray)"
                  border="none"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  label="Select Nationality"
                  name="nationalityCountry"
                  placeholder="Select Nationality"
                  formik={formik.errors.nationalityCountry}
                  value={formik.values.nationalityCountry}
                  touched={formik.touched.nationalityCountry}
                  onChange={handleOnChange}
                  data={countrylist}
                  display="block"
                  padding="10.5px 15px"
                  fontSize="16px"
                  border="none"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  label="Passport Number"
                  name="passportNo"
                  placeholder="Passport Number"
                  formik={formik.errors.passportNo}
                  value={formik.values.passportNo}
                  touched={formik.touched.passportNo}
                  handleOnChange={handleOnChange}
                  padding="10px 15px"
                  fontSize="16px"
                  border="none"
                />
              </Grid>
              <Grid item xs={12} sm={6} className="custom-input">
                <label>Passport Expiry Date</label>
                <InputDatePicker
                  name="passportEx"
                  placeholder="Passport Expiry Date"
                  formik={formik.errors.passportEx}
                  date={formik.values.passportEx}
                  touched={formik.touched.passportEx}
                  open={formik.values.openPassExDate}
                  handleDateSelect={handleDateSelect}
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                  selectDate={new Date(dateAfterSixMonths)}
                  minDate={new Date(dateAfterSixMonths)}
                  padding="10px 15px"
                  fontSize="16px"
                  width="100%"
                  display="none"
                  bgcolor="var(--gray)"
                  border="none"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FileUpload
                  label="Passport"
                  field="passport"
                  errorField="passportError"
                  formik={formik}
                  type={formik.values.passengerType}
                  pRef={`pass1`}
                  index={1}
                  values={formik.values.passport}
                  sizeError={formik.values.passportError}
                  error={formik.errors.passport}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FileUpload
                  label="Visa"
                  field="visa"
                  errorField="visaError"
                  formik={formik}
                  type={formik.values.passengerType}
                  pRef={`visa1`}
                  index={1}
                  values={formik.values.visa}
                  sizeError={formik.values.visaError}
                  error={formik.errors.visa}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} mt={4}>
                {isDone ? (
                  <CustomButton
                    type="submit"
                    value={`${update || 'Add'} Traveller`}
                    bgcolor="var(--primary)"
                    hovercolor="var(--primary-rgb)"
                    textcolor="var(--white)"
                    width="100%"
                    justify="center"
                    padding={'8px 20px'}
                  />
                ) : (
                  <Box
                    sx={{
                      padding: '10px 20px 25px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'var(--bgcolor)',
                      borderRadius: '5px',
                    }}
                  >
                    <CustomCircularProgress size={16} />
                  </Box>
                )}
              </Grid>
            </Grid>
          </form>
        </Box>
        <ToastContainer
          position="bottom-center"
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
      </Container>
    </Box>
  );
};
export default AddTravellar;
