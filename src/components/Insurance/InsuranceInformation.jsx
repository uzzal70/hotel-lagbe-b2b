import { useState } from 'react';
import {
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Button,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import InsuranceResultCard from './InsuranceResultCard';
import InsurancePriceDetails from './InsurancePriceDetails';
import Swal from 'sweetalert2';
import Token from '../Common/Token';
import getAuthToken from '../Common/getAuthToken';
import { baseUrl } from '../../../baseurl';
import Processoing from '../Common/Processoing';
import { FileInput } from './FileInput';

const InsuranceInformation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const agentIds = Token();
  const token = getAuthToken();

  const [formData, setFormData] = useState({
    fullName: '',
    passportNumber: '',
    permanentAddress: '',
    receiverName: '',
    contactNumber: '',
    profession: '',
    email: '',
    deliveryAddress: '',
    remark: '',
    agreedToTerms: false,
    passportFile: null,
  });
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        passportFile: file,
      }));
    }
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const data = location.state.data;
  const locBody = location.state.body;
  const body = {
    agentId: agentIds || '',
    travel_purpose: locBody?.travel_purpose || 'string',
    countries: locBody?.countries || 'string',
    date_of_birth: locBody?.date_of_birth || '',
    date_of_travel: locBody?.date_of_travel || '',
    days: locBody?.days || '0',
    plan_variation_id: data?.plan_variation_id || '',
    planName: data?.plan_name || '',
    coverageText: data?.coverage_text || '',
    insuranceCompanyName: data?.insurance_company.name || '',
    displayName: data?.insurance_company.display_name || '',
    imageUrl: data?.insurance_company?.image?.[0]?.media?.[0]?.url || '',
    countryType: data?.country_type || '',
    detailsContent: data?.details_content || '',
    coveragesContent: data?.coverages_content || '',
    name_in_passport: formData?.fullName || '',
    occupation: formData?.profession || '',
    passport_no: formData?.passportNumber || '',
    permanent_address: formData?.permanentAddress || '',
    delivery_name: formData?.receiverName || '',
    delivery_address: formData?.deliveryAddress || '',
    mobile: formData?.contactNumber || '',
    email: formData?.email || '',
    deliveryCharge: data?.delivery_charge || '0',
    grandTotal: data?.grand_total || '0',
    grossPremium: data?.gross_premium || '0',
    netPremium: data?.net_premium || '0',
    remarks: formData?.remark || '',
    passport_copy: '',
    passport_copy_single_1: '',
    passport_copy_single_2: '',
    passportFile: formData?.passportFile,
  };

  const url = `${baseUrl}/core/insurance/placeOrder`;
  const handleConfirmation = async (event) => {
    event?.preventDefault();
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to submit this insurance request?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--primary)',
        cancelButtonColor: 'var(--crimson)',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });

      if (result.isConfirmed) {
        await handleSubmit();
      }
    } catch (error) {
      console.error('Confirmation error:', error);
    }
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();

    const formData = new FormData();

    // Append body fields to FormData
    Object.entries(body).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value); // Append files
      } else if (value !== undefined && value !== null) {
        formData.append(key, value); // Append non-file values
      } else {
        formData.append(key, ''); // Handle undefined or null values
      }
    });

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          accept: 'application/json', // Specify expected response type
          Authorization: `Bearer ${token}`, // Authorization header
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      const data = await response.json();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Insurance has been Submitted',
        showConfirmButton: true,
        confirmButtonColor: 'var(--primary)',
        customClass: {
          popup: 'custom-swal-popup',
        },
        allowOutsideClick: false, // Disable closing by clicking outside
        allowEscapeKey: false, // Disable closing with the escape key
        allowEnterKey: false, // Disable closing with the Enter key
      }).then((result) => {
        if (result.isConfirmed) {
          redirect(data?.bimafyOrderDetailsId);
        }
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'Close',
        confirmButtonColor: 'var(--primary)',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
    }
  };

  const handleCheckboxChange = (event) => {
    if (event.target.name === 'agreedToTerms') {
      setFormData((prevData) => ({
        ...prevData,
        agreedToTerms: event.target.checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        deliveryAddress: event.target.checked ? prevData.permanentAddress : '',
      }));
    }
  };
  const redirect = (id) => {
    navigate(`/dashboard/insurancebookingdetails/${id}`, {});
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        mb: { xs: 10, md: 2 },
      }}
    >
      <Box
        mt={{ xs: 2, md: 3 }}
        sx={{
          '& .MuiInputLabel-root': {
            color: 'var(--placeholder)',
          },

          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: '1px solid',
              borderColor: 'var(--stroke)',
            },
            '&:hover fieldset': {
              border: '1px solid',
              borderColor: 'var(--stroke)',
            },
            '&.Mui-focused fieldset': {
              border: '1px solid',
              borderColor: 'var(--secondary)',
            },
          },
        }}
      >
        <Grid container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
            <Box>
              <InsuranceResultCard item={location?.state.data} />
              <Box
                sx={{
                  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                  borderRadius: 1,
                  mt: 2,
                  p: { xs: 1, md: 2 },
                }}
              >
                <Box component="form" onSubmit={handleConfirmation}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Enter Full Name as per Passport"
                        name="fullName"
                        fullWidth
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        InputLabelProps={{
                          style: {
                            color: 'var(--placeholder)',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Enter Passport Number"
                        name="passportNumber"
                        fullWidth
                        value={formData.passportNumber}
                        onChange={handleChange}
                        InputLabelProps={{
                          style: {
                            color: 'var(--placeholder)',
                          },
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Enter Your Permanent Address"
                        name="permanentAddress"
                        fullWidth
                        multiline
                        rows={2}
                        value={formData.permanentAddress}
                        onChange={handleChange}
                        InputLabelProps={{
                          style: {
                            color: 'var(--placeholder)',
                          },
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Delivery Receiver's Name"
                        name="receiverName"
                        fullWidth
                        value={formData.receiverName}
                        onChange={handleChange}
                        InputLabelProps={{
                          style: {
                            color: 'var(--placeholder)',
                          },
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Contact Number"
                        name="contactNumber"
                        fullWidth
                        value={formData.contactNumber}
                        onChange={handleChange}
                        InputLabelProps={{
                          style: {
                            color: 'var(--placeholder)',
                          },
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Enter Profession"
                        name="profession"
                        fullWidth
                        value={formData.profession}
                        onChange={handleChange}
                        InputLabelProps={{
                          style: {
                            color: 'var(--placeholder)',
                          },
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email Address (Policy Scan Copy will be sent here)"
                        name="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        InputLabelProps={{
                          style: {
                            color: 'var(--placeholder)',
                          },
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <FileInput
                          label="Upload Passport Copy"
                          name="passportFile"
                          onChange={handleFileChange}
                          accept=".png,.jpg,.jpeg,.pdf" // Specify allowed file types
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              formData.deliveryAddress ===
                              formData.permanentAddress
                            }
                            onChange={handleCheckboxChange}
                            name="sameAsPermanentAddress"
                            sx={{
                              '&.MuiCheckbox-root': {
                                color: 'var(--primary)', // Set the checkbox color to secondary
                              },
                              '&.MuiCheckbox-label': {
                                color: 'var(--primary)', // Set the label color to secondary
                              },
                            }}
                          />
                        }
                        label="Same as permanent address"
                      />
                      <TextField
                        label="Delivery Address"
                        name="deliveryAddress"
                        fullWidth
                        multiline
                        rows={2}
                        value={formData.deliveryAddress}
                        onChange={handleChange}
                        InputLabelProps={{
                          style: {
                            color: 'var(--placeholder)',
                          },
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Remark"
                        name="remark"
                        fullWidth
                        multiline
                        rows={2}
                        value={formData.remark}
                        onChange={handleChange}
                        InputLabelProps={{
                          style: {
                            color: 'var(--placeholder)',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.agreedToTerms}
                            onChange={handleCheckboxChange}
                            name="agreedToTerms"
                            sx={{
                              '&.MuiCheckbox-root': {
                                color: 'var(--primary)', // Set the checkbox color to secondary
                              },
                              '&.MuiCheckbox-label': {
                                color: 'var(--primary)', // Set the label color to secondary
                              },
                            }}
                          />
                        }
                        label="By continuing, you agree to the Privacy & Policy"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        size="medium"
                        type="submit"
                        sx={{
                          mt: 2,
                          color: 'var(--white)',
                          bgcolor: 'var(--primary)',
                          '&:hover': {
                            bgcolor: 'var(--primary)',
                            color: 'var(--white)', // Keep color consistent on hover
                          },
                        }}
                        fullWidth
                        disabled={loading || !formData.agreedToTerms}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
            <InsurancePriceDetails
              body={location?.state.body}
              data={location?.state.data}
              //   handleInformation={handleInformation}
            />
          </Grid>
        </Grid>

        {loading && (
          <Processoing
            content={'We are processing your request please wait...'}
          />
        )}
      </Box>
    </Container>
  );
};

export default InsuranceInformation;
