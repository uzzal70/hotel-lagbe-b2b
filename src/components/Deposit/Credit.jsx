/* eslint-disable no-unused-vars */
import {
  Box,
  Container,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../Common/CustomInput';
import CustomButton from '../Common/CustomButton';
import ImageImport from '../../assets/ImageImport';
import CustomTable from '../Common/Table/CustomTable';
import InputDatePicker from '../Common/InputDatePicker';
import BackButton from '../Common/BackButton';
import Swal from 'sweetalert2';
import Token from '../Common/Token';
import {
  useCreateItemMutation,
  useGetItemsQuery,
} from '../../redux/slices/apiSlice';
import CustomCircularProgress from '../Common/CustomCircularProgress';
import commaNumber from 'comma-number';
import moment from 'moment';
import getAuthToken from '../Common/getAuthToken';
import HeaderTitle from '../../common/HeaderTitle';

const Credit = () => {
  const agentId = Token();
  const token = getAuthToken();
  const navigate = useNavigate();

  const columns = [
    {
      Header: 'Id',
      accessor: 'id',
      Cell: (row) => {
        return <Box>{row.index}</Box>;
      },
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: (row) => {
        return <Box>{row.value || ''}</Box>;
      },
    },
    {
      Header: 'Balance',
      accessor: 'creditAmount',
      Cell: (row) => {
        return <Box>{commaNumber(row.value || 0)}</Box>;
      },
    },
    {
      Header: 'Request Date',
      accessor: 'createdAt',
      Cell: (row) => {
        return <Box>{moment(row.value).format('DD MMM YYYY')}</Box>;
      },
    },
    {
      Header: 'Return Date',
      accessor: 'returnDate',
      Cell: (row) => {
        return <Box>{moment(row.value).format('DD MMM YYYY')}</Box>;
      },
    },
  ];

  const validationSchema = Yup.object().shape({
    amount: Yup.string().required('Amount is required'),
    reference: Yup.string().required('reference is required'),
    returnDate: Yup.string().required('reference is required'),
  });
  const [createItem, { isLoading: isDone, isError }] = useCreateItemMutation();

  const formik = useFormik({
    initialValues: {
      amount: '0',
      returnDate: '',
      reference: '',
      open: false,
    },
    onSubmit: async () => {
      try {
        const method = 'post';
        const { amount, returnDate, reference } = formik.values;
        const payload = {
          userId: agentId,
          creditAmount: amount,
          returnDate: returnDate,
          reference: reference,
        };
        const url = `/creditRequest/createCreditRequest`;
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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Your credit request has been sent`,
          showConfirmButton: false,
          timer: 5000,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: error?.data?.message,
        });
      }
    },
    validationSchema: validationSchema,
  });

  const handleOnChange = async (e) => {
    formik.handleChange(e);
  };

  const handleInstant = () => {
    navigate('/dashboard/depositreq');
  };

  const handleOpen = () => {
    formik.setFieldValue('open', true);
  };

  const handleClose = () => {
    formik.setFieldValue('open', false);
  };

  const handleDateSelect = (selectedDate, picker) => {
    formik.setFieldValue('returnDate', selectedDate);
    handleClose();
  };

  const handleDateReset = (picker) => {
    formik.setFieldValue('returnDate', '');
    handleClose();
  };

  const url = `creditRequest/findAllCreditRequestByAgentId/${agentId}`;
  const { data, error, isLoading, refetch } = useGetItemsQuery({ url });
  const dreditData = data?.data || [];
  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        pb: { xs: 10, md: 1 },
      }}
    >
      <HeaderTitle headerTitle={'Credit Details'} />
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
              color: 'var(--black)',
              fontSize: { xs: 16, md: 20 },
              fontWeight: 500,
            }}
          >
            Credit Request
          </Typography>
          <Grid container spacing={2} my={2}>
            <Grid item xs={12} md={6}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CustomInput
                      label="Agency Name (For Company)"
                      name="agencyName"
                      placeholder="Agency Name"
                      formik={formik.errors.agencyName}
                      value={formik.values.agencyName}
                      handleOnChange={handleOnChange}
                      padding="10px 15px"
                      fontSize="16px"
                      border="none"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <CustomInput
                      label="Amount"
                      name="amount"
                      placeholder="Amount"
                      type="number"
                      formik={formik.errors.amount}
                      value={formik.values.amount}
                      handleOnChange={handleOnChange}
                      touched={formik.touched.amount}
                      padding="10px 15px"
                      fontSize="16px"
                      border="none"
                    />
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <CustomInput
                      label="Booking ID"
                      name="reference"
                      placeholder="Enter booking ID"
                      value={formik.values.reference}
                      formik={formik.errors.reference}
                      handleOnChange={handleOnChange}
                      touched={formik.touched.reference}
                      padding="10px 15px"
                      fontSize="16px"
                      border="none"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Tooltip title="Ensure that the return date is either at least 24 hours prior to the travel date or a maximum of 5 days earlier.">
                      <Typography
                        sx={{
                          color: 'var(--secondary)',
                          fontSize: 13,
                          pb: '3px',
                        }}
                        noWrap
                      >
                        Ensure that the return date is either at least 24 hours
                        prior to the travel date or a maximum of 5 days earlier.
                      </Typography>
                    </Tooltip>
                    <InputDatePicker
                      label="Return date must be at least 24 hours before the travel date"
                      name="date"
                      placeholder="Due Return Date"
                      date={formik.values.returnDate}
                      open={formik.values.open}
                      handleDateSelect={handleDateSelect}
                      handleOpen={handleOpen}
                      handleClose={handleClose}
                      handleDateReset={handleDateReset}
                      formik={formik.errors.returnDate}
                      touched={formik.touched.returnDate}
                      // maxDate={new Date()}
                      minDate={new Date()}
                      padding="10px 15px"
                      fontSize="16px"
                      width="100%"
                      bgcolor="var(--gray)"
                      display="none"
                      border="none"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {isDone ? (
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
                          value={`Submit`}
                          bgcolor="var(--primary)"
                          hovercolor="var(--primary-rgb)"
                          textcolor="var(--white)"
                          width="100%"
                          justify="center"
                          padding={'8px 20px'}
                          disabled={isDone ? true : false}
                        />
                      </Box>
                    )}

                    {/* <CustomButton
                      type="submit"
                      value={`Submit`}
                      bgcolor="var(--primary)"
                      hovercolor="var(--primary-rgb)"
                      textcolor="var(--white)"
                      width="100%"
                      justify="center"
                      padding={'8px 20px'}
                    /> */}
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12} sm={12} md={6} mt={3}>
              <CustomTable
                columns={columns}
                data={dreditData}
                pageList={5}
                textAlign="left"
                border={'1px solid var(--bgcolor)'}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Credit;
