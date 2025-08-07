/* eslint-disable no-unused-vars */
import { Box, Collapse, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRef, useState } from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Swal from 'sweetalert2';
import axios from 'axios';
import Token from '../../Common/Token';
import CustomInput from '../../Common/CustomInput';
import ImageImport from '../../../assets/ImageImport';
import ValidIcon from '../../Common/validIcon';
import CustomButton from '../../Common/CustomButton';
import CustomCircularProgress from '../../Common/CustomCircularProgress';
import { IsImageFile } from './IsImageFile';
import getAuthToken from '../../Common/getAuthToken';
import { baseUrl } from '../../../../baseurl';
import companyInfo from '../../../common/companyInfo';

const CashDeposit = () => {
  const token = getAuthToken();
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(true);
  const fileInputRef = useRef(null);
  const agentId = Token();
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const bankType = [
    { name: 'Bank' },
    { name: 'Cheque' },
    { name: 'Cash' },
    { name: 'Mobile Banking' },
  ];
  const transferType = [
    { name: 'NPSB' },
    { name: 'BFTN' },
    { name: 'RTGS' },
    { name: 'EFT' },
  ];
  const mobileBank = [
    { name: 'Bkash +880 1800000000', value: 'Bkash' },
    { name: 'Nagad +880 1800000000', value: 'Nagad' },
  ];

  const validationSchema = Yup.object().shape({
    // amount: Yup.string().required('Amount is required'),
    amount: Yup.string()
      .required('Amount is required')
      .matches(/^[0-9]+$/, 'Amount must be a valid number')
      .test('minimum-value', 'Minimum value for amount is 100', (value) => {
        if (!value) return false; // Return false if value is empty or null
        return parseInt(value, 10) >= 100;
      })
      .min(3, 'Minimum 3 digits')
      .max(9, 'Maximum 9 digits'),
    depositFrom: Yup.string().required('Required'),
    depositTo: Yup.string().required('Required'),
    document: Yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      userId: agentId,
      agencyName: companyInfo.companyName,
      paymentType: 'Cash',
      amount: '',
      transactionId: '',
      chequeIssueDate: '',
      ref: '',
      depositFrom: '',
      depositTo: '',
      depositDate: '',
      remarks: '',
      chequeNumber: '',
      branch: '',
      transferType: '',
      service: '0',
      paySlipFile: null, // file Upload
      fileSize: '', // file Upload
      document: null, // file Upload
      open: false,
    },
    onSubmit: async () => {
      try {
        setIsDone(false);
        const {
          paymentType,
          amount,
          transactionId,
          chequeIssueDate,
          ref,
          depositFrom,
          remarks,
          depositDate,
          depositTo,
          chequeNumber,
          branch,
          transferType,
          paySlipFile,
        } = formik.values;
        const data = {
          userId: agentId || '',
          paymentType: paymentType || '',
          amount: amount || '',
          transactionId: transactionId || '',
          chequeIssueDate: chequeIssueDate || '',
          ref: ref || '',
          depositFrom: depositFrom || '',
          depositTo: depositTo || '',
          bankOrMfsId: '',
          depositDate: depositDate || '',
          remarks: remarks || '',
          chequeNumber: chequeNumber || '',
          branchName: branch || '',
          transferType: transferType || '',
          paySlipFile: paySlipFile || '',
          platform: companyInfo.platform || '',
        };
        const payload = new FormData();
        Object.keys(data).forEach((key) => payload.append(key, data[key]));

        const headers = {
          accept: '*/*',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        };
        const url1 = `${baseUrl}/core/deposit-request/createDepositRequest`;

        const response = await axios({
          method: 'post',
          url: url1,
          data: payload,
          headers: headers,
        });

        Swal.fire(
          {
            position: 'center',
            icon: 'success',
            title: `Your deposit request successfully submitted`,
            showConfirmButton: false,
            timer: 5000,
          },
          navigate('/dashboard/deposithistory')
        );
      } catch (error) {
        setIsDone(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error?.response?.data?.message || 'Something went wrong!',
          footer: error?.data?.message,
        });
      } finally {
        setIsDone(true);
      }
    },
    validationSchema: validationSchema,
  });

  const handleOnChange = async (e) => {
    const regex = /^[a-zA-Z0-9]*$/;
    const regexNumber = /^[0-9]*$/;
    if (e.target.type === 'file') {
      const file = e.target.files[0];

      if (file) {
        const maxSizeInBytes = 5 * 1024 * 1024; // 1MB
        const dataUrl = await readDataUrl(file);
        if (file.size > maxSizeInBytes) {
          formik.setFieldValue('paySlipFile', null);
          formik.setFieldValue('document', null);
          formik.setFieldValue(
            'fileSize',
            'The file size is too large ( maximum limit 5MB).'
          );
        } else {
          formik.setFieldValue('paySlipFile', file);
          formik.setFieldValue('document', dataUrl);
          formik.setFieldValue(`fileSize`, '');
        }
      }
    } else if (e.target.name === 'amount') {
      if (regexNumber.test(e.target.value) && e.target.value <= 999999999) {
        formik.setFieldValue('amount', e.target.value);
      }
    } else {
      if (regex.test(e.target.value)) {
        formik.handleChange(e);
      }
    }
  };

  const handleFileRemove = () => {
    formik.setFieldValue('paySlipFile ', null);
    formik.setFieldValue('document', null);

    // Clear the input value to trigger the change event when the same file is selected again
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // preview image  function
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
    formik.setFieldValue(picker, selectedDate);
    handleClose();
  };

  const handleDateReset = (picker) => {
    formik.setFieldValue(picker, '');
    handleClose();
  };

  return (
    <Box sx={{ my: 2 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomInput
              label="Depositor Name"
              name="depositFrom"
              placeholder="Depositor Name"
              formik={formik.errors.depositFrom}
              value={formik.values.depositFrom}
              touched={formik.touched.depositFrom}
              handleOnChange={handleOnChange}
              padding="10px 15px"
              fontSize="16px"
              border="1px solid var(--stroke)"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInput
              label="Receiver Name"
              name="depositTo"
              placeholder="Receiver Name"
              formik={formik.errors.depositTo}
              value={formik.values.depositTo}
              touched={formik.touched.depositTo}
              handleOnChange={handleOnChange}
              padding="10px 15px"
              fontSize="16px"
              border="1px solid var(--stroke)"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomInput
              label="Amount"
              name="amount"
              placeholder="Amount"
              type="text"
              formik={formik.errors.amount}
              value={formik.values.amount}
              touched={formik.touched.amount}
              handleOnChange={handleOnChange}
              padding="10px 15px"
              fontSize="16px"
              border="1px solid var(--stroke)"
              minLength={1}
              maxLength={8}
            />
          </Grid>
          <Grid item xs={12}>
            {/* for Design */}
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <Typography
                sx={{
                  color: 'var(--secondary)',
                  fontSize: 14,
                  mt: 2,
                  mb: 1,
                }}
              >
                Document of Proof (Max 5MB,JPG/PNG/JFIF)
              </Typography>
              <Collapse in={formik.values.document ? true : false}>
                <>
                  {formik.values.paySlipFile &&
                  IsImageFile(formik.values.paySlipFile) ? (
                    <Box
                      sx={{
                        // height: '200px',
                        // maxWidth: '300px',
                        pb: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      <img
                        src={formik.values.document}
                        alt="File Preview"
                        style={{
                          maxHeight: '200px',
                          maxWidth: '300px',
                          // objectFit: 'cover',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          right: 0,
                          top: 0,
                        }}
                      >
                        <CancelOutlinedIcon
                          sx={{
                            color: 'var(--disable)',
                            bgcolor: 'var(--bgcolor)',
                            fontSize: 25,
                            cursor: 'pointer',
                            borderRadius: '50%',
                          }}
                          onClick={handleFileRemove}
                        />
                      </Box>
                    </Box>
                  ) : (
                    <Typography noWrap sx={{ py: 2, color: 'var(--primary)' }}>
                      {formik?.values?.paySlipFile?.name}
                    </Typography>
                  )}
                </>
              </Collapse>

              <Box
                sx={{
                  bgcolor: 'var(--bgcolor)',
                  p: 1,
                  borderRadius: '5px',
                  display: 'flex',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => handleButtonClick()}
              >
                <div className="custom-file-input-container">
                  <input
                    id="fileInput"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleOnChange}
                    accept="image/*"
                  />
                </div>
                <img src={ImageImport.file} alt="" height="25px" />
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: 'var(--primary)',
                    px: 3,
                  }}
                >
                  Choose File{' '}
                </Typography>
              </Box>
              <span style={{ fontSize: '12px', color: 'var(--red)' }}>
                {formik.values.fileSize || ''}
              </span>
              {formik.touched.document && formik.errors.document ? (
                <ValidIcon msg="file must be required" fontColor="var(--red)" />
              ) : (
                ''
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <CustomInput
              label="Reference (Reference No etc)"
              name="ref"
              placeholder="Reference"
              value={formik.values.ref}
              handleOnChange={handleOnChange}
              padding="10px 15px"
              fontSize="16px"
              border="1px solid var(--stroke)"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            {isDone ? (
              <CustomButton
                type="submit"
                value="Submit Deposit Request"
                bgcolor="var(--primary)"
                hovercolor="var(--primary-rgb)"
                textcolor="var(--white)"
                width="100%"
                justify="center"
                padding={'8px 20px'}
                disabled={isDone ? false : true}
              />
            ) : (
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
            )}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CashDeposit;
