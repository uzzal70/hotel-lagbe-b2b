import {
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import ImageImport from '../../assets/ImageImport';
import CustomInput from '../Common/CustomInput';
import CustomButton from '../Common/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import ValidIcon from '../Common/validIcon';
import Card from '../Common/Card';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PhoneInput from 'react-phone-input-2';
import axios from 'axios';
import FileUpload from './FileUpload';
import CustomCircularProgress from '../Common/CustomCircularProgress';
import Processoing from '../Common/Processoing';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import responseimg from '../../assets/responseimg';
import companyInfo from '../../common/companyInfo';
import LandingHeader from './../../Landing/LandingHeader';
import Footer from './../../Landing/Footer';
import { baseUrl } from '../../../baseurl';
import { bdDistrict } from '../Utils/bddistrict';
import countrylist from '../Utils/countrylists';
import OTPModal from './OTPModal';

const Registration = () => {
  const navigate = useNavigate();

  const expandValue = [
    {
      name: 'company',
      title: 'Company / Agent Information',
      required: 'As mentioned on your NID or government approved IDs',
    },

    {
      name: 'document',
      title: 'Upload Documents',
      required: 'Must be upload valid and updated Trade License  ',
    },
    {
      name: 'preview',
      title: 'Final Check and Submission',
      required: 'You must submit before preview',
    },
  ];
  const [isDone, setIsDone] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0); // 2 minutes (120 seconds)
  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState('');
  const [expandedState, setExpandedState] = useState({
    company: true,
    document: false,
    preview: false,
  });

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required('Company Name is required'),
    companyAddress: Yup.string().required('Company Address is required'),
    country: Yup.string().required('City is required'),
    companyCity: Yup.string().required('country is required'),

    fName: Yup.string().required('Full Name is required'),
    phone: Yup.string()
      .required('Phone is required')
      .min(10, 'Phone number must be at least 10 digits long'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),

    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least minimum 6 characters'),

    nid: Yup.mixed().required('NID is required'),
    tradeLicense: Yup.mixed().required('Trade License is required'),
  });

  const handleExpand = (value) => {
    setExpandedState((prevExpandedState) => ({
      [value]: !prevExpandedState[value],
    }));
  };

  const handleDirection = (currentIndex, direction) => {
    const index =
      (currentIndex + (direction === 'next' ? 1 : -1) + expandValue.length) %
      expandValue.length;
    const item = expandValue[index].name;
    handleExpand(item);
  };

  const formik = useFormik({
    initialValues: {
      companyName: '',
      companyAddress: '',
      companyEmail: '',
      companyPhone: '',
      companyCity: '',
      country: 'Bangladesh',
      //   -----personal
      fName: '',
      lName: '-',
      phone: '',
      email: '',
      password: '',
      showPassword: false,
      //   -----file
      nid: null,
      tradeLicense: null,
      logo: null,
      caab: null,

      sizenid: '',
      sizetradeLicense: '',
      sizelogo: '',
      sizecaab: '',

      tradeValue: false,
      logoValue: false,
      caabValue: false,
    },
    onSubmit: async () => {
      // try {
      setIsDone(false);
      handleOnSubmitEmailOtpSend(formik.values.email?.toLowerCase());
    },

    validationSchema: validationSchema,
  });

  const handleOnSubmitEmailOtpSend = async (email) => {
    setEmailForOtp(email);
    const otpendpoint = `${baseUrl}/core/agent/agentSignupEmailVerificationOTP?email=${email}`;
    try {
      setIsDone(false);
      const response = await axios.patch(otpendpoint, {
        headers: { accept: '*/*', 'Content-Type': 'application/json' },
      });

      if (response.data?.status === 'success') {
        // Swal.fire({
        //   title: response.data.title || 'Success',
        //   html: `<span>${response.data.message}</span>`,
        //   confirmButtonText: response.data.button || 'Ok',
        // });
        setTimeLeft(120);
        setShowOtpModal(true);
      } else {
        setShowOtpModal(false);
        Swal.fire({
          title: response.data.title || 'Success',
          html: `<span>${response.data.message}</span>`,
          confirmButtonText: 'Ok',
        });
      }
    } catch (error) {
      setShowOtpModal(false);
      Swal.fire({
        title: 'Oops...',
        text: error?.response?.data?.message || 'Something went wrong!',
      });
    } finally {
      setIsDone(true);
    }
  };

  const handleRegister = async () => {
    try {
      setIsDone(false);
      const user = {
        firstName: formik.values.fName,
        lastName: formik.values.lName,
        phone: formik.values.phone,
        email: formik.values.email?.toLowerCase() || '',
        password: formik.values.password,
        city: formik.values.companyCity || '',
        dob: '',
        country: formik.values.country || '',
      };
      const jsonUser = JSON.stringify(user);
      const formData = new FormData();
      formData.append('companyName', formik.values.companyName);
      formData.append('companyAddress', formik.values.companyAddress);
      formData.append('companyEmail', formik.values.email?.toLowerCase() || '');
      formData.append('companyPhone', formik.values.phone || '');
      formData.append('companyCity', formik.values.companyCity);
      formData.append('nidFile', formik.values.nid);
      formData.append('tradeLicenseFile', formik.values.tradeLicense);
      formData.append('companyLogoFile', formik.values.logo);
      formData.append('caabFile', formik.values.caab);
      formData.append('platform', companyInfo.platform);
      formData.append('user', jsonUser);

      const commonHeaders = {
        accept: '*/*',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${baseUrl}`,
      };
      const endpoint = `${baseUrl}/core/agent/createAgent`;

      const response = await axios({
        method: 'post',
        url: endpoint,
        data: formData,
        headers: commonHeaders,
      });

      if (response.data) {
        setIsDone(true);
        Swal.fire({
          position: 'center',
          title: 'Congratulations!',
          html: `<span style="color: var(--primary); font-size: 13px; line-height: 0px">Your registration has been successfully submitted. Thank you for joining ${companyInfo.companyName} ${companyInfo.responsetext}</span>`,
          showConfirmButton: true,
          imageUrl: `${responseimg.registrationdone}`,
          imageWidth: 200,
          imageHeight: 180,
          customClass: {
            popup: 'custom-swal-popup',
          },
        }).then(() => {
          navigate('/');
        });
      }
    } catch (error) {
      setIsDone(false);
      Swal.fire({
        title: 'Oops...',
        html: `<span style="color: var(--primary); font-size: 13px; line-height: 0px">${
          error?.response?.data?.message || 'Something went wrong!'
        }</span> `,
        footer: `${companyInfo.responsetext}`,
        imageUrl: `${responseimg.bookingfailed}`,
        imageWidth: 200,
        imageHeight: 180,
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
    } finally {
      setIsDone(true);
    }
  };

  const handleShowPassword = () => {
    formik.setFieldValue('showPassword', !formik.values.showPassword);
  };
  const handleOnChange = async (e) => {
    formik.handleChange(e);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);
  return (
    <Box sx={{ bgcolor: 'var(--white)' }}>
      <Container sx={{ display: { xs: 'none', md: 'block' } }}>
        <LandingHeader />
      </Container>
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            marginTop: 3,
            minHeight: { xs: '60vh', md: '72vh' },
          }}
        >
          <Box
            sx={{
              width: { xs: '150px', md: '200px' },
              marginX: 'auto',
              display: { xs: 'flex', md: 'none' },
            }}
            onClick={() => navigate('/')}
          >
            <img
              src={ImageImport.logo}
              alt=""
              style={{ width: '100%', margin: 'auto' }}
            />
          </Box>
          <Box
            sx={{
              textAlign: 'center',
              my: { xs: 2, md: 4 },
              px: { xs: 1, md: 2 },
            }}
          >
            <Typography
              sx={{
                color: 'var(--primary)',
                fontSize: { xs: 15, md: 22, lg: 28 },
                fontWeight: 500,
              }}
            >
              {companyInfo.companyName} Agent Registration
            </Typography>
            <Typography sx={{ color: 'var(--secondary)', fontSize: 10 }}>
              Registration With {companyInfo.companyName} As An Agent Please
              Make Sure That <br /> You Enter The Correct Information.
            </Typography>
          </Box>
          <Container sx={{ px: { xs: 1, sm: 2, md: '' } }}>
            <Box
              sx={{
                my: { xs: 2, md: 3 },
                width: { xs: '100%', sm: '80%', lg: '70%' },
                marginX: 'auto',
              }}
            >
              <form onSubmit={formik.handleSubmit} autoComplete="off">
                <Box>
                  {expandValue.map((item, index) => {
                    const compnayRequired =
                      formik.values.companyName &&
                      formik.values.companyAddress &&
                      formik.values.fName &&
                      formik.values.phone &&
                      formik.values.email &&
                      formik.values.password &&
                      formik.values.companyCity;

                    const documents =
                      formik.values.nid && formik.values.tradeLicense;

                    return (
                      <Box
                        sx={{
                          border: '1px solid var(--stroke)',
                          borderRadius: '5px',
                          py: 1,
                          px: { xs: 1, md: 2 },
                          my: 0.5,
                        }}
                        key={index}
                      >
                        <Grid
                          container
                          spacing={1}
                          justifyContent="space-between"
                          onClick={() => handleDirection(index - 1, 'next')}
                        >
                          <Grid item>
                            <Stack direction="row" spacing={1}>
                              <Box>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="center"
                                  sx={{
                                    color: 'var(--white)',
                                    bgcolor:
                                      (index === 0 && !compnayRequired) ||
                                      (index === 1 && !documents) ||
                                      index === 2
                                        ? 'var(--primary)'
                                        : 'var(--dark-green)',
                                    fontSize: { xs: 10 },
                                    fontWeight: 500,
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    mt: 0.5,
                                  }}
                                >
                                  <Box>{index + 1}</Box>
                                </Stack>
                              </Box>
                              <Box>
                                <Typography
                                  sx={{
                                    color: 'var(--secondary)',
                                    fontSize: { xs: 13, md: 16 },
                                    fontWeight: 500,
                                  }}
                                >
                                  {item.title}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: 'var(--secondary)',
                                    fontSize: { xs: 9, md: 10 },
                                    display: expandedState[item.name]
                                      ? 'flex'
                                      : 'none',
                                  }}
                                  noWrap
                                >
                                  <ErrorOutlineIcon
                                    sx={{
                                      fontSize: 12,
                                      color: 'var(--icon-color)',
                                    }}
                                  />
                                  &nbsp;{item.required}
                                </Typography>
                              </Box>
                            </Stack>
                          </Grid>
                          <Grid item>
                            {(index === 0 &&
                              formik.values.phone?.length < 10) ||
                            (index === 0 && !compnayRequired) ||
                            (index === 1 && !documents) ? (
                              <span style={{ color: 'red', fontSize: 10 }}>
                                Required
                              </span>
                            ) : (
                              <CheckCircleRoundedIcon
                                sx={{
                                  color: 'var(--dark-green)',
                                  fontSize: 18,
                                  display: index === 2 ? 'none' : 'unset',
                                }}
                              />
                            )}
                          </Grid>
                        </Grid>

                        <Collapse in={expandedState[item.name]}>
                          <Box p={{ xs: 0.2, md: 2 }}>
                            {item.name === 'company' && (
                              <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={6}>
                                  <CustomInput
                                    label="Company Name"
                                    name="companyName"
                                    placeholder="Company Name"
                                    formik={formik.errors.companyName}
                                    value={formik.values.companyName}
                                    handleOnChange={handleOnChange}
                                    touched={formik.touched.companyName || ''}
                                    fontSize="16px"
                                    border="1px solid var(--stroke)"
                                    padding="10px 0px 10px 10px"
                                    width={{
                                      xs: '97.2%',
                                      sm: '98%',
                                      md: '98%',
                                    }}
                                    autoFocus="true"
                                    labelColor="var(--secondary)"
                                  />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <CustomInput
                                    label="Owner Full Name"
                                    name="fName"
                                    placeholder="Full Name"
                                    formik={formik.errors.fName}
                                    value={formik.values.fName}
                                    handleOnChange={handleOnChange}
                                    touched={formik.touched.fName || ''}
                                    fontSize="16px"
                                    border="1px solid var(--stroke)"
                                    padding="10px 0px 10px 10px"
                                    width={{
                                      xs: '97.2%',
                                      sm: '98%',
                                      md: '97%',
                                    }}
                                    labelColor="var(--secondary)"
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                  <CustomInput
                                    label="Company Address"
                                    name="companyAddress"
                                    type="text"
                                    placeholder="Company Address"
                                    formik={formik.errors.companyAddress}
                                    value={formik.values.companyAddress}
                                    handleOnChange={handleOnChange}
                                    touched={
                                      formik.touched.companyAddress || ''
                                    }
                                    fontSize="16px"
                                    border="1px solid var(--stroke)"
                                    padding="10px 0px 10px 10px"
                                    width={{
                                      xs: '97.2%',
                                      sm: '98%',
                                      md: '98%',
                                    }}
                                    labelColor="var(--secondary)"
                                  />
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                  <Box
                                    sx={{
                                      width: {
                                        xs: '100%',
                                      },
                                    }}
                                  >
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
                                      name="phone"
                                      id="phone"
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
                                        height: '42px',
                                        fontSize: '16px',
                                      }}
                                    />
                                    {formik.touched.phone &&
                                    formik.errors.phone ? (
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

                                <Grid item xs={12} sm={6} md={6}>
                                  <Box
                                    sx={{
                                      mt: -0.1,
                                      select: {
                                        width: '100%',
                                        height: '41px',
                                        outline: 'none',
                                        border: '1px solid var(--stroke)',
                                        borderRadius: 1,
                                        color: 'var(--secondary)',
                                        fontSize: 14,
                                        maxHeight: '200px',
                                        px: 1,
                                      },
                                      label: {
                                        color: 'var(--secondary)',
                                        fontSize: 11,
                                      },
                                      option: {
                                        color: 'var(--primary)',
                                        fontSize: 14,
                                      },
                                    }}
                                  >
                                    <label>Select Country</label>
                                    <select
                                      required
                                      name="country"
                                      value={formik.values.country}
                                      onChange={(e) => handleOnChange(e)}
                                      placeholder={'Select Country'}
                                    >
                                      <option value={''}>
                                        {'Select Country'}
                                      </option>

                                      {countrylist.map((status, i) => (
                                        <option key={i} value={status?.name}>
                                          {status?.name}
                                        </option>
                                      ))}
                                    </select>
                                    {formik.touched.country &&
                                    formik.errors.country ? (
                                      <div>
                                        <ValidIcon
                                          msg={formik.errors.country}
                                          fontColor="var(--red)"
                                        />
                                      </div>
                                    ) : (
                                      ''
                                    )}
                                  </Box>
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                  {formik.values.country === 'Bangladesh' ? (
                                    <Box
                                      sx={{
                                        mt: -0.1,
                                        select: {
                                          width: '100%',
                                          height: '41px',
                                          outline: 'none',
                                          border: '1px solid var(--stroke)',
                                          borderRadius: 1,
                                          color: 'var(--secondary)',
                                          fontSize: 14,
                                          maxHeight: '200px',
                                          px: 1,
                                        },
                                        label: {
                                          color: 'var(--secondary)',
                                          fontSize: 11,
                                        },
                                        option: {
                                          color: 'var(--primary)',
                                          fontSize: 14,
                                        },
                                      }}
                                    >
                                      <label>Select City / Area</label>
                                      <select
                                        required
                                        name="companyCity"
                                        value={formik.values.companyCity}
                                        onChange={(e) => handleOnChange(e)}
                                        placeholder={'Select City'}
                                      >
                                        <option value={''}>
                                          {'Select City'}
                                        </option>

                                        {bdDistrict.map((status, i) => (
                                          <option key={i} value={status?.name}>
                                            {status?.name}
                                          </option>
                                        ))}
                                      </select>
                                      {formik.touched.companyCity &&
                                      formik.errors.companyCity ? (
                                        <div>
                                          <ValidIcon
                                            msg={formik.errors.companyCity}
                                            fontColor="var(--red)"
                                          />
                                        </div>
                                      ) : (
                                        ''
                                      )}
                                    </Box>
                                  ) : (
                                    <CustomInput
                                      label="Company City"
                                      name="companyCity"
                                      type="text"
                                      placeholder="Company City"
                                      formik={formik.errors.companyCity}
                                      value={formik.values.companyCity}
                                      handleOnChange={handleOnChange}
                                      touched={formik.touched.companyCity || ''}
                                      fontSize="16px"
                                      border="1px solid var(--stroke)"
                                      padding="10px 0px 10px 10px"
                                      width={{
                                        xs: '97.2%',
                                        sm: '98%',
                                        md: '98%',
                                      }}
                                      labelColor="var(--secondary)"
                                    />
                                  )}
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <CustomInput
                                    label="Company Email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    formik={formik.errors.email}
                                    value={formik.values.email}
                                    handleOnChange={handleOnChange}
                                    touched={formik.touched.email || ''}
                                    fontSize="16px"
                                    border="1px solid var(--stroke)"
                                    padding="10px 0px 10px 10px"
                                    width={{
                                      xs: '97.2%',
                                      sm: '98%',
                                      md: '98%',
                                    }}
                                    labelColor="var(--secondary)"
                                  />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <CustomInput
                                    label="Password (minimum length is 6 characters)"
                                    name="password"
                                    type={
                                      formik.values.showPassword
                                        ? 'text'
                                        : 'password'
                                    }
                                    minLength={6}
                                    placeholder="Enter your Password"
                                    formik={formik.errors.password}
                                    value={formik.values.password}
                                    handleOnChange={handleOnChange}
                                    show={formik.values.showPassword}
                                    touched={formik.touched.password || ''}
                                    handleShow={handleShowPassword}
                                    fontSize="16px"
                                    border="1px solid var(--stroke)"
                                    padding="10px 0px 10px 10px"
                                    width={{
                                      xs: '97.2%',
                                      sm: '98%',
                                      md: '97%',
                                    }}
                                    labelColor="var(--secondary)"
                                  />
                                </Grid>
                              </Grid>
                            )}

                            {item.name === 'document' && (
                              <Grid container spacing={{ xs: 1.5, md: 2 }}>
                                <Grid item xs={12} md={6}>
                                  <Box>
                                    <Typography
                                      sx={{
                                        color: 'var(--icon-color)',
                                        fontSize: 12,
                                      }}
                                    >
                                      Upload NID
                                      <span style={{ color: 'var(--red)' }}>
                                        *
                                      </span>
                                    </Typography>
                                    <Grid container>
                                      <FileUpload
                                        field="nid"
                                        formik={formik}
                                        pRef={`nid`}
                                        values={formik.values.nid}
                                        sizeError={formik.values.sizenid}
                                        error={formik.errors.nid}
                                        labelColor="var(--secondary)"
                                      />
                                    </Grid>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Box>
                                    <Typography
                                      sx={{
                                        color: 'var(--icon-color)',
                                        fontSize: 12,
                                      }}
                                    >
                                      Upload Trade License
                                      <span style={{ color: 'var(--red)' }}>
                                        *
                                      </span>
                                    </Typography>
                                    <Grid container>
                                      <FileUpload
                                        field="tradeLicense"
                                        formik={formik}
                                        pRef={`tradeLicense`}
                                        values={formik.values.tradeLicense}
                                        sizeError={
                                          formik.values.sizetradeLicense
                                        }
                                        error={formik.errors.tradeLicense}
                                        // later="true"
                                        labelColor="var(--secondary)"
                                      />
                                    </Grid>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Box>
                                    <Typography
                                      sx={{
                                        color: 'var(--icon-color)',
                                        fontSize: 12,
                                      }}
                                    >
                                      Upload Company Logo (optional)
                                    </Typography>
                                    <Grid container>
                                      <FileUpload
                                        field="logo"
                                        formik={formik}
                                        pRef={`logo`}
                                        values={formik.values.logo}
                                        sizeError={formik.values.sizelogo}
                                        error={formik.errors.logo}
                                        later="true"
                                        labelColor="var(--secondary)"
                                      />
                                    </Grid>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Box>
                                    <Typography
                                      sx={{
                                        color: 'var(--icon-color)',
                                        fontSize: 12,
                                      }}
                                    >
                                      Upload CAAB Certificate (optional)
                                    </Typography>
                                    <Grid container>
                                      <FileUpload
                                        field="caab"
                                        formik={formik}
                                        pRef={`caab`}
                                        values={formik.values.caab}
                                        sizeError={formik.values.sizecaab}
                                        error={formik.errors.caab}
                                        later="true"
                                        labelColor="var(--secondary)"
                                      />
                                    </Grid>
                                  </Box>
                                </Grid>
                              </Grid>
                            )}

                            {item.name === 'preview' && (
                              <Box>
                                <Typography
                                  sx={{
                                    color: 'var(--icon-color)',
                                    fontSize: 16,
                                  }}
                                >
                                  Company Details
                                </Typography>
                                <Grid container spacing={{ xs: 1 }}>
                                  <Grid item>
                                    <Card
                                      title={'Company Name'}
                                      value={formik.values.companyName}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Card
                                      title={'Company Address'}
                                      value={formik.values.companyAddress}
                                    />
                                  </Grid>

                                  <Grid item>
                                    <Card
                                      title={'Company Email'}
                                      value={
                                        formik.values.companyEmail ||
                                        formik.values.email
                                      }
                                      textTransform={'lowercase'}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Card
                                      title={'Company Phone Number'}
                                      value={
                                        formik.values.companyPhone ||
                                        formik.values.phone
                                      }
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Card
                                      title={'City/Area '}
                                      value={formik.values.companyCity}
                                    />
                                  </Grid>
                                </Grid>
                                <Typography
                                  sx={{
                                    color: 'var(--icon-color)',
                                    fontSize: 16,
                                    mt: 2,
                                  }}
                                >
                                  Personal Information
                                </Typography>
                                <Grid container spacing={{ xs: 1 }}>
                                  <Grid item>
                                    <Card
                                      title={'Full Name'}
                                      value={`${formik.values.fName}`}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Card
                                      title={'Email'}
                                      value={formik.values.email}
                                      textTransform={'lowercase'}
                                    />
                                  </Grid>

                                  <Grid item>
                                    <Card
                                      title={'Phone Number'}
                                      value={formik.values.phone}
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                            )}

                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              mt={2}
                            >
                              {index === expandValue.length - 1 ? (
                                <Box>
                                  {isDone ? (
                                    <CustomButton
                                      type="submit"
                                      value="Submit"
                                      bgcolor="var(--primary)"
                                      hovercolor="var(--primary-rgb)"
                                      textcolor="var(--white)"
                                      justify="space-between"
                                      padding={'3px 20px'}
                                      disabled={!isDone ? true : false}
                                    />
                                  ) : (
                                    <Box
                                      sx={{
                                        padding: '5px 25px 20px 13px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bgcolor: 'var(--bgcolor)',
                                        borderRadius: '5px',
                                        width: '100%',
                                      }}
                                    >
                                      <CustomCircularProgress size={16} />
                                    </Box>
                                  )}
                                </Box>
                              ) : (
                                <CustomButton
                                  value="Next"
                                  bgcolor="var(--secondary)"
                                  hovercolor="var(--primary-rgb)"
                                  textcolor="var(--white)"
                                  justify="space-between"
                                  padding={'3px 20px'}
                                  handleClick={() =>
                                    handleDirection(index, 'next')
                                  }
                                  disabled={index === expandValue.length - 1}
                                />
                              )}

                              {index !== 0 && (
                                <CustomButton
                                  value="Back"
                                  bgcolor="var(--bgcolor)"
                                  hovercolor="var(--icon-color)"
                                  textcolor="var(--secondary)"
                                  justify="space-between"
                                  padding={'3px 20px'}
                                  handleClick={() =>
                                    handleDirection(index, 'previous')
                                  }
                                  disabled={index === 0}
                                />
                              )}
                            </Stack>
                          </Box>
                        </Collapse>
                      </Box>
                    );
                  })}
                </Box>
              </form>
            </Box>
            <Box
              sx={{
                fontSize: 14,
                color: 'var(--disable)',
                textAlign: 'center',
                pb: 3,
              }}
            >
              Already have an account?
              <Button
                component={Link}
                to="/"
                style={{
                  color: 'var(--black)',
                  textTransform: 'capitalize',
                  fontSize: 13.5,
                }}
              >
                Sign in Now!
              </Button>
            </Box>
          </Container>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Footer />
        </Box>
      </Stack>
      {showOtpModal && (
        <OTPModal
          timeLeft={timeLeft}
          handleSubmit={formik.handleSubmit}
          showOtpModal={showOtpModal}
          handleRegister={handleRegister}
          setShowOtpModal={setShowOtpModal}
          setOtp={setOtp}
          otp={otp}
          emailForOtp={emailForOtp}
        />
      )}
      {!isDone && <Processoing />}
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
    </Box>
  );
};

export default Registration;
