/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Modal,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { useRef, useState, useEffect } from 'react';
import CustomInput from '../Common/CustomInput';
import { useFormik } from 'formik';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import BackButton from '../Common/BackButton';
import {
  useGetItemsQuery,
  usePatchItemMutation,
} from '../../redux/slices/apiSlice';
import { InfoOutlined } from '@mui/icons-material';
import MyProfileLoader from './MyProfileLoader';
import * as Yup from 'yup';
import axios from 'axios';
import CustomCircularProgress from '../Common/CustomCircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import ValidIcon from '../Common/validIcon';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { viewImage } from '../Helper/viewImage';
import FileUpload from '../Registration/FileUpload';
import { baseUrl } from '../../../baseurl';
import HeaderTitle from '../../common/HeaderTitle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 0,
  borderRadius: '6px',
  outline: 'none !important',
};

const MyProfile = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState('');

  const agentInfo = localStorage.getItem('agentInfo');
  const parse = JSON.parse(agentInfo);
  const token = parse.accessToken;
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  const jwt = parseJwt(token);
  const userId = jwt.userId;
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState('');
  const [isDone, setIsDone] = useState(true);
  const [previewImg, setPreviewImg] = useState(null);
  const validationSchema = Yup.object().shape({
    companyPhone: Yup.string()
      .required('Phone is required')
      .min(10, 'Phone number must be at least 10 digits long'),
    password: Yup.string()
      .required('Phone is required')
      .min(5, 'Phone number must be at least 10 to 15 characters'),
  });

  const handleOpen = (value) => {
    setUpdate(value);
    setOpen(!open);
  };
  const url = `/agent/findAgentByUserId/${userId}`;
  const {
    data: items,
    error: error,
    isLoading: isLoading,
    refetch: refetch1,
  } = useGetItemsQuery({ url: url });

  const formik = useFormik({
    initialValues: {
      companyName: items?.companyName || '',
      companyAddress: items?.companyAddress || '',
      companyPhone: items?.companyPhone || '',
      companyCity: items?.companyCity || '',
      //   -----personal
      firstName: items?.user?.firstName || '',
      lastName: items?.user?.lastName || '',
      phone: items?.user?.phone || '',
      city: items?.user?.city || '',
      dob: items?.user?.dob || '',
      country: items?.user?.country || '',
      twoFactorSecurity: items?.user?.twoFactorSecurity || 'false',

      //   -----file
      nid: null,
      tradeLicense: null,
      logo: null,
      previewLogo: null,
      caab: null,
      //   -----file size
      sizelogo: '',
      password: '',
      cPassword: '',
      // document: null, // file Upload
      open: false,
      showPassword: false,
    },
    validationSchema: validationSchema,
  });

  useEffect(() => {
    if (items) {
      formik.setValues((prevValues) => ({
        ...prevValues,
        companyName: items?.companyName || '',
        companyAddress: items?.companyAddress || '',
        companyPhone: items?.companyPhone || '',
        companyCity: items?.companyCity || '',

        //   -----personal
        firstName: items?.user?.firstName || '',
        lastName: items?.user?.lastName || '',
        phone: items?.user?.phone || '',
        city: items?.user?.city || '',
        dob: items?.user?.dob || '',
        country: items?.user?.country || '',
        twoFactorSecurity: items?.user?.twoFactorSecurity || 'false',
      }));
    }
  }, [items]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/core/agent/getCompanyLogoFilebyId/${userId}`
        );
        setPreviewImg(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleShowPassword = () => {
    formik.setFieldValue('showPassword', !formik.values.showPassword);
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleOnChangeSwitch = (event) => {
    const value = event.target.checked ? 'true' : 'false'; // Convert to string
    formik.setFieldValue(event.target.name, value);
  };
  const handleOnChange = async (e) => {
    if (e.target.type === 'file') {
      const file = e.target.files[0];
      const maxSizeInBytes = 200 * 1024; // 200kb

      if (file) {
        if (!['image/png', 'image/jpeg'].includes(file.type)) {
          formik.setFieldValue('sizelogo', 'Please upload a PNG or JPEG file.');
          formik.setFieldValue('logo', null);
          return;
        }

        if (file.size > maxSizeInBytes) {
          formik.setFieldValue(
            'sizelogo',
            'The file size is too large (maximum limit 200kb).'
          );
          formik.setFieldValue('logo', null);
          return;
        }

        try {
          const dataUrl = await readDataUrl(file);
          formik.setFieldValue('previewLogo', dataUrl);
          formik.setFieldValue('logo', file);
          formik.setFieldValue('sizelogo', '');
        } catch (error) {
          console.error('Error reading file:', error);
        }
      }
    } else {
      formik.handleChange(e);
    }
  };
  const readDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  const handleUpdate = async (text) => {
    try {
      setIsDone(false);
      const user = {
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        phone: formik.values.companyPhone || formik.values.phone,
        email: formik.values.email,
        password: formik.values.password,
        city: formik.values.city || '',
        dob: formik.values.dob || '',
        country: formik.values.country || '',
      };
      const jsonUser = JSON.stringify(user);
      const formData = new FormData();
      formData.append('companyName', formik.values.companyName);
      formData.append('companyAddress', formik.values.companyAddress);
      formData.append('companyEmail', formik.values.companyEmail);
      formData.append('companyPhone', formik.values.companyPhone);
      formData.append('companyCity', formik.values.companyCity);
      formData.append('nidFile', formik.values.nid);
      formData.append('tradeLicenseFile', formik.values.tradeLicense);
      formData.append('companyLogoFile', formik.values.logo);
      formData.append('caabFile', formik.values.caab);
      formData.append('twoFactorSecurity', formik.values.twoFactorSecurity);

      formData.append('user', jsonUser);

      const commonHeaders = {
        accept: '*/*',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      };
      const endpoint = `${baseUrl}/core/agent/updatedByAgent/${userId}`;
      const updateTradeLicenseRequest = `${baseUrl}/core/agent/updateTradeLicenseRequest?agentId=${userId}&remarks=${
        remarks || 'Trade License'
      }`;

      const response = await axios({
        method: text === 'tradeLicense' ? 'post' : 'patch',
        url: text === 'tradeLicense' ? updateTradeLicenseRequest : endpoint,
        data: formData,
        headers: commonHeaders,
      });

      if (response.data) {
        setIsDone(true);
        toast.success(
          <Box sx={{ fontSize: 13, color: 'var(--primary)' }}>
            {text} Updated
          </Box>
        );
        setOpen(false);
        refetch1();
        handleLogout();
        navigate('/');
      }
    } catch (error) {
      setIsDone(false);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        `${text} upload failed`;
      toast.error(
        <Box sx={{ fontSize: 13, color: 'var(--primary)' }}>{errorMessage}</Box>
      );
    } finally {
      setIsDone(true);
    }
  };
  const [patchItem, { isLoading: deleteLoading, isError }] =
    usePatchItemMutation();
  const handleLogout = () => {
    localStorage.removeItem('agentInfo');
    sessionStorage.removeItem('modalShownTime');
    sessionStorage.removeItem('modalShown');
    navigate('/');
  };
  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });

      if (result.isConfirmed) {
        const url = `/agent/agentHardDelete/${userId}`;
        const response = await patchItem(url);
        if (response?.data?.statusCode === 200) {
          Swal.fire({
            title: 'Deleted!',
            text: `Your Account has been deleted.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 5000,
            customClass: {
              popup: 'custom-swal-popup',
            },
          });
          handleLogout();
          navigate('/');
        } else {
          throw new Error(
            `${response?.error?.data?.message || 'Failed to delete'} `
          );
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: error.message,
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
    }
  };

  const imageUrl = `${baseUrl}/core/agent/getTradeLicenseFilebyId/${userId}`;
  const handleViewImage = () => {
    viewImage(
      imageUrl,
      setSelectedImage,
      setIsModalOpen,
      setLoading,
      token,
      userId
    );
  };

  const handleViewPDFClick = async () => {
    try {
      const response = await fetch(imageUrl, {
        headers: {
          accept: '/',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Ensure token is valid and available
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF. Status: ${response.statusText}`);
      }
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      window.open(objectURL, '_blank');
      setTimeout(() => {
        URL.revokeObjectURL(objectURL);
      }, 1000);
    } catch (error) {
      // setErrors(`Error fetching PDF: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkFile =
    items?.tradeLicense?.split('.')?.pop()?.toLowerCase() || null;

  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        pb: { xs: 10, md: 1 },
      }}
    >
      <HeaderTitle headerTitle={`My Profile`} showCustomButtons={false} />

      <Grid container spacing={1} justifyContent={'center'}>
        <Grid item>
          <Box
            sx={{
              px: { xs: 2, md: 8 },
              bgcolor: 'var(--white)',
              borderRadius: '10px',
              width: { xs: '320px', sm: '300px', md: '400px' },
              margin: 'auto',
              mt: 5,
              pt: 2,
              pb: { xs: 7, md: 8 },
            }}
          >
            {isLoading ? (
              <>
                <MyProfileLoader />
              </>
            ) : (
              <>
                <Typography
                  sx={{
                    color: 'var(--secondary)',
                    fontSize: { xs: 16, md: 20 },
                    fontWeight: 500,
                  }}
                >
                  My Profile
                </Typography>
                <Box>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: '5px',
                      display: 'flex',
                      justifyContent: 'left',
                      cursor: 'pointer',
                      position: 'relative',
                      width: 'fit-content',
                    }}
                    onClick={handleButtonClick}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        position: 'relative',
                      }}
                    >
                      {formik.values.previewLogo === null &&
                      (previewImg === null ||
                        Object?.keys(previewImg)?.length) > 0 ? (
                        <Box
                          sx={{
                            bgcolor: 'var(--gray)',
                            width: '250px',
                            height: '100px',
                            borderRadius: '5px',
                            p: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <img
                            src={`${baseUrl}/core/agent/getCompanyLogoFilebyId/${userId}`}
                            alt="File Preview"
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                            }}
                          />
                        </Box>
                      ) : formik.values.previewLogo !== null ? (
                        <Box
                          sx={{
                            bgcolor: 'var(--gray)',
                            width: '250px',
                            height: '100px',
                            borderRadius: '5px',
                            p: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <img
                            src={formik.values.previewLogo}
                            alt="File Preview"
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                            }}
                          />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            bgcolor: 'var(--gray)',
                            width: '250px',
                            height: '100px',
                            borderRadius: '5px',
                            textAlign: 'center',
                          }}
                        >
                          <PhotoSizeSelectActualIcon
                            sx={{
                              fontSize: '6rem',
                              color: 'var(--secondary)',
                              pt: 0.5,
                            }}
                          />
                        </Box>
                      )}
                    </Box>
                    <Box>
                      <div className="custom-file-input-container">
                        <input
                          id="fileInput"
                          type="file"
                          required
                          ref={fileInputRef}
                          onChange={handleOnChange}
                          accept="image/*"
                        />
                      </div>
                      <CameraAltIcon
                        sx={{
                          position: 'absolute',
                          bottom: 12,
                          left: '230px',
                          border: '1px solid var(--icon-color)',
                          borderRadius: '50%',
                          p: 0.5,
                          zIndex: 1,
                          bgcolor: 'var(--gray)',
                          color: 'var(--icon-color)',
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 12,
                      mb: 1,
                    }}
                  >
                    <Box sx={{ color: 'var(--red)', fontSize: 11 }}>
                      {formik.values.sizelogo || ''}
                    </Box>
                    Upload a 250x100px logo, JPG/PNG, max 200kb
                  </Box>

                  <Box mt={2} mb={5} textAlign={'center'}>
                    {isDone ? (
                      <>
                        {formik.values.logo ? (
                          <Button
                            sx={{
                              bgcolor: 'var(--primary)',
                              color: 'var(--white)',
                              textTransform: 'capitalize',
                              px: 5,
                              '&:hover': {
                                bgcolor: 'var(--primary)',
                                color: 'var(--white)',
                              },
                            }}
                            onClick={() => handleUpdate('logo')}
                          >
                            Update Logo
                          </Button>
                        ) : (
                          <Tooltip
                            followCursor
                            title="Please replace the logo !"
                          >
                            <Button
                              sx={{
                                bgcolor: 'var(--gray)',
                                color: 'var(--secondary)',
                                textTransform: 'capitalize',
                                px: 5,
                              }}
                            >
                              Update Logo
                            </Button>
                          </Tooltip>
                        )}
                      </>
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
                </Box>
                <Box
                  sx={{
                    position: 'relative',
                    my: 2,
                    color: 'var(--secondary)',
                    fontSize: 13,
                    span: {
                      fontWeight: 400,
                      fontSize: 14,
                    },
                  }}
                >
                  <Box>
                    <span>Company :</span> {items?.companyName}
                  </Box>
                  <Box>
                    <span>Agent Id :</span> {items?.agentId}
                  </Box>
                  <Box>
                    <span>Name :</span> {items?.user?.firstName}
                  </Box>
                  <Box>
                    <span>Email :</span> {items?.user?.email}
                  </Box>
                  <Box>
                    <span>Phone :</span>
                    {items?.user?.phone}
                  </Box>

                  <Box>
                    <span>Address :</span> {items?.companyAddress}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <span>Trade License :</span>&nbsp;{' '}
                    <Box
                      sx={{
                        color: 'var(--secondary)',
                        fontSize: 12,
                        border: '1px solid var(--stroke)',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        px: 1,
                        py: 0.4,
                      }}
                      onClick={
                        checkFile === 'pdf'
                          ? handleViewPDFClick
                          : handleViewImage
                      }
                    >
                      View{' '}
                      <ReceiptIcon
                        sx={{
                          fontSize: '1rem',
                        }}
                      />
                    </Box>
                    &nbsp;&nbsp;
                    <Button
                      sx={{
                        bgcolor: 'var(--bgcolor)',
                        color: 'var(--secondary)',
                        textTransform: 'capitalize',
                        fontSize: 12,
                        py: 0.4,
                        px: { xs: 2, md: 4 },
                      }}
                      onClick={() => handleOpen('tradeLicense')}
                    >
                      {items?.tradeLicense ? 'Update' : 'ADD'}
                    </Button>
                  </Box>
                  <Box mt={2}>
                    <Button
                      sx={{
                        bgcolor: 'var(--bgcolor)',
                        color: 'var(--secondary)',
                        textTransform: 'capitalize',
                        fontSize: 12,
                        py: 0.5,
                        mb: 1,
                      }}
                      fullWidth
                      onClick={() => handleOpen('update')}
                    >
                      Update Information
                    </Button>
                    <Button
                      sx={{
                        bgcolor: 'var(--bgcolor)',
                        color: 'var(--secondary)',
                        textTransform: 'capitalize',
                        fontSize: 12,
                        py: 0.5,
                        px: 2,
                        mb: 1,
                      }}
                      fullWidth
                      onClick={() => handleOpen('password')}
                    >
                      Change Password
                    </Button>{' '}
                    <Button
                      sx={{
                        bgcolor: 'var(--bgcolor)',
                        color: 'var(--secondary)',
                        textTransform: 'capitalize',
                        fontSize: 12,
                        py: 0.5,
                        px: 2,
                      }}
                      fullWidth
                      onClick={() => handleOpen('towFactor')}
                    >
                      Two Factor Security
                    </Button>{' '}
                    <Button
                      sx={{
                        position: 'absolute',
                        my: 5,
                        bgcolor: 'var(--gray)',
                        color: 'var(--secondary)',
                        textTransform: 'capitalize',
                        border: '1px solid var(--light-stroke)',
                        fontSize: 12,
                        py: 0.5,
                        '&:hover': {
                          bgcolor: 'var(--disable)',
                        },
                        right: 0,
                      }}
                      onClick={handleDelete}
                      disabled={deleteLoading ? true : false}
                    >
                      Delete My Account
                    </Button>
                  </Box>

                  <Modal open={open} onClose={() => setOpen(false)}>
                    <Box
                      sx={{
                        ...style,
                        width: {
                          xs: '90%',
                          sm: '60%',
                          md: '400px',
                        },
                        overflow: 'hidden',
                      }}
                    >
                      <Typography
                        sx={{
                          color: 'var(--secondary)',
                          fontSize: { xs: 16, md: 16 },
                          textAlign: 'center',
                          // mb: 2,
                          py: 1,
                          borderRadius: '5px',
                          bgcolor: 'var(--bgcolor)',
                          overflow: 'hidden',
                        }}
                      >
                        {update === 'tradeLicense'
                          ? 'Company Trade License Update'
                          : update === 'update'
                          ? 'Company Information Update'
                          : update === 'towFactor'
                          ? 'Two Factor Security'
                          : 'Change Password'}
                      </Typography>
                      <Box
                        sx={{
                          p: { xs: 2 },
                        }}
                      >
                        <Grid container spacing={2}>
                          {update === 'tradeLicense' ? (
                            <Box
                              sx={{
                                margin: 'auto',
                                width: '300px',
                                border: '1px solid var(--stroke)',
                                borderRadius: '5px',
                                p: 2,
                                mt: 2,
                                label: {
                                  color: 'var(--secondary)',
                                  fontSize: 12,
                                },
                              }}
                            >
                              <label>Trade License</label>
                              <FileUpload
                                field="tradeLicense"
                                formik={formik}
                                pRef={`tradeLicense`}
                                values={formik.values.tradeLicense}
                                error={formik.errors.tradeLicense}
                                labelColor="var(--secondary)"
                              />
                              <Box mt={2}>
                                <CustomInput
                                  label="Remarks"
                                  name="Remarks"
                                  placeholder="remarks"
                                  value={remarks}
                                  handleOnChange={(e) =>
                                    setRemarks(e.target.value)
                                  }
                                  padding="10px 15px"
                                  fontSize="16px"
                                  border="1px solid var(--stroke)"
                                  width="98%"
                                />
                              </Box>
                            </Box>
                          ) : update === 'update' ? (
                            <>
                              <Grid
                                item
                                xs={12}
                                md={12}
                                className="custom-input"
                              >
                                <label>Company Phone</label>
                                <PhoneInput
                                  required
                                  country={'bd'}
                                  name="companyPhone"
                                  label="Company Phone"
                                  id="companyPhone"
                                  value={formik.values.phone || ''}
                                  placeholder="Phone Number"
                                  touched={formik.touched.phone || ''}
                                  onChange={(e) => {
                                    const value = {
                                      target: {
                                        name: 'companyPhone',
                                        value: e,
                                      },
                                    };
                                    handleOnChange(value, 'companyPhone');
                                  }}
                                  style={{
                                    height: '40px',
                                    fontSize: '16px',
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
                              </Grid>

                              <Grid item xs={12} md={12}>
                                <CustomInput
                                  label="Company Address"
                                  name="companyAddress"
                                  placeholder="Address"
                                  value={formik.values.companyAddress}
                                  handleOnChange={handleOnChange}
                                  padding="10px 15px"
                                  fontSize="16px"
                                  border="1px solid var(--stroke)"
                                />
                              </Grid>
                              <Grid item xs={12} md={12}>
                                <CustomInput
                                  label="User Name"
                                  name="firstName"
                                  placeholder="Full Name"
                                  value={formik.values.firstName}
                                  handleOnChange={handleOnChange}
                                  padding="10px 15px"
                                  fontSize="16px"
                                  border="1px solid var(--stroke)"
                                />
                              </Grid>
                            </>
                          ) : update === 'towFactor' ? (
                            <>
                              <Grid
                                item
                                xs={12}
                                md={12}
                                className="custom-input"
                              >
                                <label style={{ visibility: 'hidden' }}>
                                  for design{' '}
                                </label>
                                <Box
                                  sx={{
                                    border: '1px solid var(--stroke)',
                                    borderRadius: 1,
                                    px: 1,
                                  }}
                                >
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        name="twoFactorSecurity"
                                        color="primary"
                                        checked={
                                          formik.values.twoFactorSecurity ===
                                          'true'
                                        }
                                        onChange={handleOnChangeSwitch}
                                      />
                                    }
                                    label="Enable Two Factor Security"
                                    labelPlacement="end"
                                  />
                                </Box>
                              </Grid>
                            </>
                          ) : (
                            <>
                              <Grid item xs={12} md={12}>
                                <CustomInput
                                  type={
                                    formik.values.showPassword
                                      ? 'text'
                                      : 'password'
                                  }
                                  label="Change password minimum 6 characters"
                                  name="cPassword"
                                  placeholder="Enter Password"
                                  formik={formik.errors.password}
                                  value={formik.values.cPassword}
                                  handleOnChange={handleOnChange}
                                  show={formik.values.showPassword}
                                  handleShow={handleShowPassword}
                                  minLength={6}
                                  padding="10px 15px"
                                  fontSize="16px"
                                  border="1px solid var(--stroke)"
                                />
                              </Grid>
                              <Grid item xs={12} md={12}>
                                <CustomInput
                                  type={
                                    formik.values.showPassword
                                      ? 'text'
                                      : 'password'
                                  }
                                  label="Confirm password*"
                                  name="password"
                                  placeholder="Enter Confirm Password"
                                  formik={formik.errors.password}
                                  value={formik.values.password}
                                  handleOnChange={handleOnChange}
                                  show={formik.values.showPassword}
                                  handleShow={handleShowPassword}
                                  minLength={6}
                                  padding="10px 15px"
                                  fontSize="16px"
                                  border="1px solid var(--stroke)"
                                />
                              </Grid>
                              {formik.values.password &&
                                formik.values.password !==
                                  formik.values.cPassword && (
                                  <Box
                                    sx={{
                                      fontSize: 12,
                                      color: 'var(--red)',
                                      pt: 1,
                                      pl: 2,
                                    }}
                                  >
                                    <InfoOutlined
                                      sx={{ fontSize: 15, mb: -0.4 }}
                                    />{' '}
                                    Passwords do not match
                                  </Box>
                                )}
                            </>
                          )}
                        </Grid>

                        <Box
                          mt={5}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          {isDone ? (
                            <Tooltip
                              title={
                                update === 'update' ||
                                update === 'tradeLicense' ||
                                update === 'towFactor'
                                  ? ''
                                  : formik.values.password?.length < 5
                                  ? 'After enabling, set the password.'
                                  : 'After enabling, set the password.'
                              }
                            >
                              <div>
                                <Button
                                  type="submit"
                                  sx={{
                                    bgcolor: 'var(--secondary)',
                                    color: 'var(--white)',
                                    textTransform: 'capitalize',
                                    px: 4,
                                    '&:hover': {
                                      bgcolor: 'var(--secondary)',
                                    },
                                    py: 0.5,
                                  }}
                                  disabled={
                                    update === 'update' ||
                                    update === 'tradeLicense' ||
                                    update === 'towFactor'
                                      ? false
                                      : formik.values.password?.length < 5 ||
                                        formik.values.password !==
                                          formik.values.cPassword
                                  }
                                  onClick={() =>
                                    handleUpdate(
                                      update === 'tradeLicense'
                                        ? 'tradeLicense'
                                        : 'Information'
                                    )
                                  }
                                >
                                  Update
                                </Button>
                              </div>
                            </Tooltip>
                          ) : (
                            <Box
                              sx={{
                                padding: '5px 25px 20px 13px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'var(--bgcolor)',
                                borderRadius: '5px',
                                width: '100px',
                              }}
                            >
                              <CustomCircularProgress size={16} />
                            </Box>
                          )}

                          <Button
                            sx={{
                              bgcolor: 'var(--red)',
                              color: 'var(--white)',
                              textTransform: 'capitalize',
                              ml: 2,
                              px: 4,
                              '&:hover': {
                                bgcolor: 'var(--red)',
                              },
                              py: 0.5,
                            }}
                            onClick={() => setOpen(false)}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Modal>

                  <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                  >
                    <Box
                      sx={{
                        ...style,
                        width: { xs: '90%', sm: '60%', md: '400px' },
                      }}
                    >
                      <Box
                        sx={{
                          img: {
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                            borderRadius: '5px',
                          },
                          p: 1,
                        }}
                      >
                        {loading ? (
                          'Loading...'
                        ) : (
                          <>
                            {selectedImage ? (
                              <img src={selectedImage} alt="" />
                            ) : (
                              'Not Found'
                            )}
                          </>
                        )}
                      </Box>
                    </Box>
                  </Modal>
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
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

export default MyProfile;
