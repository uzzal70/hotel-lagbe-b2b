/* eslint-disable no-unused-vars */
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from '../Common/Select';
import BackButton from '../Common/BackButton';
import CashDeposit from './DepositMethod/CashDeposit';
import BankDeposit from './DepositMethod/BankDeposit';
import ChequeDeposit from './DepositMethod/ChequeDeposit';
import MobileDeposit from './DepositMethod/MobileDeposit';
import TokenToName from '../Common/TokenToName';
import CustomButton from '../Common/CustomButton';
import HeaderTitle from '../../common/HeaderTitle';

const DepositRequest = () => {
  const tokenise = TokenToName();
  const navigate = useNavigate();
  const bankType = [
    { name: 'Bank' },
    { name: 'Cheque' },
    { name: 'Cash' },
    { name: 'Mobile Banking' },
  ];

  const validationSchema = Yup.object().shape({
    paymentType: Yup.string().required('Payment type is required'),
  });

  const formik = useFormik({
    initialValues: {
      agencyName: tokenise?.companyName || 'Company Name ',
      paymentType: 'Bank',
    },

    validationSchema: validationSchema,
  });
  const handleOnChange = async (e) => {
    formik.handleChange(e);
  };

  const handleInstant = () => {
    navigate('/dashboard/deposit');
  };

  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        pb: { xs: 8, md: 1 },
      }}
    >
      <HeaderTitle
        headerTitle={'Manual Deposit Request'}
        backButtonText={'/dashboard/deposithistory'}
      />
      <Container sx={{ px: { xs: 1, sm: 2, md: '' } }}>
        <Box
          sx={{
            my: 2,
            p: { xs: 1.5, md: 3 },
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
            Deposit Request
          </Typography>
          <Box sx={{ my: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography sx={{ color: 'var(--primary)', mt: 2, mb: 1 }}>
                  Payment Information
                </Typography>
                <Select
                  label="Payment Type"
                  name="paymentType"
                  placeholder="Select payment type"
                  formik={formik.errors.paymentType}
                  value={formik.values.paymentType}
                  touched={formik.touched.paymentType}
                  onChange={handleOnChange}
                  data={bankType}
                  display="block"
                  padding="10px"
                  fontSize="16px"
                  border="1px solid var(--stroke)"
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            {formik.values.paymentType === 'Cash' && <CashDeposit />}
            {formik.values.paymentType === 'Bank' && <BankDeposit />}
            {formik.values.paymentType === 'Cheque' && <ChequeDeposit />}
            {formik.values.paymentType === 'Mobile Banking' && (
              <MobileDeposit />
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default DepositRequest;
