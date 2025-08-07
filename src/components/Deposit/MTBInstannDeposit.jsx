/* eslint-disable no-unused-vars */
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../Common/CustomButton';
import CustomInput from '../Common/CustomInput';
import BackButton from '../Common/BackButton';
import { useEffect, useState } from 'react';
import Token from '../Common/Token';
import Swal from 'sweetalert2';
import CustomCircularProgress from '../Common/CustomCircularProgress';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import InstantLoading from './InstantLoading';
import { baseUrl } from '../../../baseurl';
import TokenToName from '../Common/TokenToName';
import getAuthToken from '../Common/getAuthToken';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import companyInfo from '../../common/companyInfo';
import HeaderTitle from '../../common/HeaderTitle';
const percentage = (percent, total) => {
  const parcent = (percent / 100) * total;
  const percentageValue = Math.floor(Number(parcent));
  const result = total + percentageValue;
  return result;
};

const MTBInstannDeposit = () => {
  const agentId = Token();
  const tokenise = TokenToName();
  const token = getAuthToken();
  const url = `${baseUrl}/core/agent/findAllMobileBankingByAgent`;
  const {
    data: mfsData,
    isLoading: bankIsLoading,
    refetch,
  } = useGetItemsQuery({ url });
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    paymentType: Yup.string().required('Payment type is required'),
    amount: Yup.string().required('Amount is required'),
  });
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      agencyName: '',
      paymentType: 'bKash',
      service: 0,
      amount: 0,
    },
    validationSchema: validationSchema,
  });

  const handleOnChange = async (e) => {
    formik.handleChange(e);
  };

  const bankData = [
    {
      id: '32f65102-fd29-48c6-b787-73ad0a78e7b1',
      bankingName: 'bKash',
      logo: 'https://tripfindy-logos.s3.ap-southeast-1.amazonaws.com/mbanking/bkash.png',
      provider: 'bkash',
      accountNo: '01332564500',
      accountName: companyInfo.companyName,
      transactionCharge: '1',
      instantAvailability: true,
      status: true,
      createdAt: '2024-05-02T20:21:18.439Z',
      updatedAt: '2024-06-25T06:05:00.261Z',
    },
    {
      id: 'f1fef289-b9eb-4d6a-9364-e49395b5159b',
      bankingName: 'Visa/Master',
      logo: 'https://tripfindy-logos.s3.ap-southeast-1.amazonaws.com/mbanking/mtbbank.png',
      provider: 'MTB Bank',
      accountNo: '1212122',
      accountName: 'MTB Bank',
      transactionCharge: '1.6',
      instantAvailability: true,
      status: true,
      createdAt: '2024-08-08T06:43:20.488Z',
      updatedAt: '2024-08-08T06:43:20.488Z',
    },
    {
      id: 'f1fef289-b9eb-4d6a-9364-e49395b5159b',
      bankingName: 'Amex',
      logo: 'https://tripfindy-logos.s3.ap-southeast-1.amazonaws.com/mbanking/ssl.png',
      provider: 'SSL Commerz',
      accountNo: '1212121',
      accountName: 'SSL Commerz',
      transactionCharge: '2.5',
      instantAvailability: true,
      status: true,
      createdAt: '2024-08-08T06:43:20.488Z',
      updatedAt: '2024-08-08T06:43:20.488Z',
    },
  ];

  useEffect(() => {
    const selectedBanking = bankData.find(
      (item) => item.bankingName === formik.values.paymentType
    );
    formik.setFieldValue('service', selectedBanking?.transactionCharge || 0);
  }, [formik.values.paymentType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const urlBkash = `${baseUrl}/core/deposit-request/instantMfsPayment?agentId=${agentId}&depositAmount=${
      formik.values.amount
    }&extraCharge=${Math.ceil(
      (formik.values.amount * formik?.values?.service) / 100
    )}&totalAmount=${percentage(
      formik?.values?.service,
      formik?.values?.amount || 0
    )}`;

    const urlSSL = `${baseUrl}/core/deposit-request/instantBankPayment?agentId=${agentId}&totalAmount=${percentage(
      formik?.values?.service,
      formik?.values?.amount || 0
    )}&depositAmount=${formik.values.amount}`;
    const mtbUrl = `${baseUrl}/core/deposit-request/intantMTBPayment?agentId=${agentId}&totalAmount=${percentage(
      formik?.values?.service,
      formik?.values?.amount || 0
    )}&depositAmount=${formik.values.amount}&phone=${tokenise?.phone}`;
    try {
      const response = await fetch(
        formik.values.paymentType === 'bKash'
          ? urlBkash
          : formik.values.paymentType === 'Amex'
          ? urlSSL
          : mtbUrl,
        {
          method: 'POST',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to make the payment');
      }

      const responseData = await response.json();
      if (responseData?.status === 'success') {
        window.location.href =
          responseData?.res?.bkashURL ||
          responseData?.res?.redirectUrl ||
          responseData?.res;
        formik.setFieldValue('amount', 0);
        setIsLoading(true);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = () => {
    navigate('/dashboard/depositreq');
  };

  const handleChange = (newAlignment) => {
    formik.setFieldValue('paymentType', newAlignment);
  };

  // const ssl = 'SSL';

  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        pb: { xs: 8, md: 1 },
      }}
    >
      <HeaderTitle
        headerTitle={'Online Payment'}
        onDepositRequest={handlePayment}
      />
      {bankIsLoading ? (
        <InstantLoading />
      ) : (
        <Container sx={{ px: { xs: 1, sm: 2, md: '' } }}>
          <Box
            sx={{ my: 2, p: 3, bgcolor: 'var(--white)', borderRadius: '10px' }}
          >
            <Typography
              sx={{
                color: 'var(--black)',
                fontSize: { xs: 16, md: 20 },
                fontWeight: 500,
              }}
            >
              Payment Information
            </Typography>
            <Typography sx={{ fontSize: 14, color: 'var(--secondary)', mb: 2 }}>
              Choose payment gateway below
            </Typography>
            <Box>
              <Grid container spacing={{ xs: 1, md: 1.5 }}>
                {bankData?.map((button, i, arr) => (
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    md={3}
                    lg={2}
                    key={button.bankingName}
                    sx={{
                      display:
                        button?.instantAvailability === false
                          ? 'none'
                          : 'block',
                    }}
                  >
                    <Button
                      onClick={() => handleChange(button.bankingName)}
                      sx={{
                        color:
                          formik.values.paymentType === button.bankingName
                            ? 'var(--primary)'
                            : 'var(--stroke)',
                        bgcolor:
                          formik.values.paymentType === button.bankingName
                            ? 'var(--white)'
                            : 'var(--white)',
                        '&:hover': {
                          bgcolor:
                            formik.values.paymentType === button.bankingName
                              ? 'var(--white)'
                              : 'var(--white)',
                        },

                        display: 'block',
                        position: 'relative',
                      }}
                    >
                      <Box
                        sx={{
                          border:
                            formik.values.paymentType === button.bankingName
                              ? '1px solid var(--dark-green)'
                              : '1px solid var(--stroke)',
                          borderRadius: '10px',
                          img: {
                            width: '145px',
                            maxHeight: '65px',
                            minHeight: '65px',
                            p: 0.5,
                            objectFit: 'contain',
                          },
                        }}
                      >
                        <img src={button?.logo} alt="logo" />
                      </Box>
                      <Box>{button.bankingName}</Box>
                      <CheckCircleIcon
                        sx={{
                          fontSize: 18,
                          color:
                            formik.values.paymentType === button.bankingName
                              ? 'var(--dark-green)'
                              : 'var(--white)',
                          fontWeight: 500,
                          position: 'absolute',
                          top: 8,
                          left: '82%',
                        }}
                      />
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ mt: 5, mb: 2 }}>
              {(formik.values.paymentType === 'Amex' ||
                formik.values.paymentType === 'Visa/Master') && (
                <Box
                  sx={{
                    color: 'var(--red)',
                    mb: 2,
                    fontWeight: 300,
                    // textAlign: 'center',
                    fontSize: { xs: 12, md: 14 },
                  }}
                >
                  *Verification document may be required for foreign card
                  payments..
                </Box>
              )}
              {formik.values.paymentType === 'bKash' ||
              formik.values.paymentType === 'Amex' ||
              formik.values.paymentType === 'Visa/Master' ? (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} md={4} lg={3.5}>
                      <CustomInput
                        label={
                          <span
                            style={{ color: 'var(--black)', fontSize: '14px' }}
                          >
                            Deposit Amount (BDT)
                          </span>
                        }
                        name="amount"
                        placeholder="Enter Amount"
                        type="number"
                        formik={formik.errors.amount}
                        value={formik.values.amount}
                        handleOnChange={handleOnChange}
                        padding="10px 15px"
                        fontSize="16px"
                        border="1px solid var(--bgcolor)"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={5} lg={3.5}>
                      <CustomInput
                        label={
                          <span
                            style={{ color: 'var(--black)', fontSize: '14px' }}
                          >
                            Charges{' '}
                            <span
                              style={{
                                color: '#FD7D36',
                                fontWeight: 300,
                                fontSize: '14px',
                              }}
                            >
                              ({formik.values.service}% transaction charge
                              applicable)
                            </span>
                          </span>
                        }
                        name="charges"
                        placeholder="Enter Amount"
                        type="number"
                        value={(
                          (formik.values.amount * formik?.values?.service) /
                          100
                        ).toFixed(2)}
                        padding="10px 15px"
                        fontSize="16px"
                        border="1px solid var(--bgcolor)"
                        disabled={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} md={3} lg={3}>
                      <CustomInput
                        label={
                          <span
                            style={{ color: 'var(--black)', fontSize: '14px' }}
                          >
                            Total Amount (BDT)
                          </span>
                        }
                        name="depositAmount"
                        placeholder="Enter Amount"
                        type="number"
                        value={percentage(
                          formik?.values?.service,
                          formik.values.amount || 0
                        )}
                        padding="10px 15px"
                        fontSize="16px"
                        border="1px solid var(--bgcolor)"
                        disabled={true}
                      />
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                      {!isLoading ? (
                        <CustomButton
                          type="submit"
                          value={`Pay Now `}
                          bgcolor="var(--primary)"
                          hovercolor="var(--primary-rgb)"
                          textcolor="var(--white)"
                          width={{ xs: '100%', md: '200px' }}
                          justify="center"
                          padding={'8px 20px'}
                        />
                      ) : (
                        <Box
                          sx={{
                            pt: 1.4,
                            pb: 3.4,
                            bgcolor: 'var(--bgcolor)',
                            borderRadius: '5px',
                            width: '200px',
                          }}
                        >
                          <CustomCircularProgress size={16} />
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </form>
              ) : formik.values.paymentType === 'no' ? (
                <Box
                  sx={{
                    bgcolor: 'var(--bgcolor)',
                    fontSize: 16,
                    color: 'var(--primary-color)',
                    borderRadius: 1,
                    textAlign: 'center',
                    p: 2,
                  }}
                >
                  Coming soon! Please make a deposit to our Nagad merchant
                  number from MFS list.
                </Box>
              ) : null}
            </Box>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default MTBInstannDeposit;
