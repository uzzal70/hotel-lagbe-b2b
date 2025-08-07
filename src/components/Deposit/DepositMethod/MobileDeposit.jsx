/* eslint-disable no-unused-vars */
import { Box, Collapse, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Swal from 'sweetalert2';
import axios from 'axios';
import Token from '../../Common/Token';
import CustomInput from '../../Common/CustomInput';
import Select from '../../Common/Select';
import CustomCircularProgress from '../../Common/CustomCircularProgress';
import CustomButton from '../../Common/CustomButton';
import ValidIcon from '../../Common/validIcon';
import ImageImport from '../../../assets/ImageImport';
import { IsImageFile } from './IsImageFile';
import getAuthToken from '../../Common/getAuthToken';
import PhoneInput from 'react-phone-input-2';
import { useGetItemsQuery } from '../../../redux/slices/apiSlice';
import { baseUrl } from '../../../../baseurl';
import companyInfo from '../../../common/companyInfo';
const percentage = (percent, total) => {
  const parcent = (percent / 100) * total;
  const percentageValue = parcent;
  const result = total - percentageValue;
  return result?.toFixed(2);

  // return total.toFixed(2);
};

const MobileDeposit = () => {
  const token = getAuthToken();
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(true);
  const fileInputRef = useRef(null);
  const agentId = Token();
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const url = `${baseUrl}/core/agent/findAllMobileBankingByAgent`;
  const { data, isLoading, refetch } = useGetItemsQuery({ url });

  const mobileBank =
    data &&
    data.mobileBanking
      .filter((item) => item.instantAvailability !== true) // Filter items where instantAvailability is true
      .map((item) => ({
        name: `${item.bankingName} ${item.accountNo}`,
        value: item.bankingName,
      }));

  const validationSchema = Yup.object().shape({
    // depositAmount: Yup.string().required('Amount is required'),
    depositAmount: Yup.string()
      .required('Amount is required')
      .matches(/^[0-9]+$/, 'Amount must be a valid number')
      .test('minimum-value', 'Minimum value for amount is 100', (value) => {
        if (!value) return false; // Return false if value is empty or null
        return parseInt(value, 10) >= 100;
      })
      .min(3, 'Minimum 3 digits')
      .max(9, 'Maximum 9 digits'),
    transactionId: Yup.string().required('transection Id is required'),
    depositFrom: Yup.string()
      .required('Phone is required')
      .min(10, 'Phone number must be at least 10 digits long'),
    depositTo: Yup.string().required('Required'),
    document: Yup.string().required('Payment slip is required'),
  });
  const formik = useFormik({
    initialValues: {
      userId: agentId,
      agencyName: companyInfo.companyName,
      paymentType: 'Mobile Banking',
      depositAmount: '',
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
      service: '',
      fileSize: '',
      paySlipFile: null, // file Upload
      document: null, // file Upload
      open: false,
    },
    onSubmit: async () => {
      try {
        setIsDone(false);
        const {
          paymentType,
          amount,
          depositAmount,
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
          bankOrMfsId,
        } = formik.values;
        const data = {
          userId: agentId || '',
          paymentType: paymentType || '',
          amount: depositAmount || '',
          transactionId: transactionId || '',
          chequeIssueDate: chequeIssueDate || '',
          ref: ref || '',
          depositFrom: depositFrom || '',
          depositTo: depositTo || '',
          bankOrMfsId: bankOrMfsId || '',
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
            title: `Your deposit request successfully submitted.`,
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
    } else if (e.target.name === 'depositAmount') {
      if (regexNumber.test(e.target.value) && e.target.value <= 999999999) {
        formik.setFieldValue('depositAmount', e.target.value);
      }
    } else {
      if (regex.test(e.target.value)) {
        formik.handleChange(e);
      }
    }
  };
  const handleChange = (e) => {
    const { value } = e.target;
    formik.setFieldValue(
      'depositTo',
      value === 'Select Mobile Banking' ? '' : value
    );
    const selectedBanking = data?.mobileBanking.find(
      (item) => item.bankingName === value
    );
    formik.setFieldValue('service', selectedBanking?.transactionCharge || '0');
    formik.setFieldValue('bankOrMfsId', selectedBanking?.id || '');
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

  useEffect(() => {
    formik.setFieldValue(
      'amount',
      percentage(
        formik.values.service || 0,
        Number.parseInt(formik.values.depositAmount)
      )
    );
  }, [formik.values.depositAmount, formik.values.service]);

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

  return (
    <Box sx={{ my: 2 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography
                sx={{
                  color: 'var(--disable)',
                  fontSize: 12,
                  mb: 0.3,
                }}
              >
                Phone Number
              </Typography>
              <PhoneInput
                required
                country={'bd'}
                name="depositFrom"
                id="depositFrom"
                value={formik.values.depositFrom || ''}
                placeholder="Deposite Phone Number"
                touched={formik.touched.phone || ''}
                onChange={(e) => {
                  const value = {
                    target: {
                      name: 'depositFrom',
                      value: e,
                    },
                  };
                  handleOnChange(value, 'depositFrom');
                }}
                style={{
                  height: '40px',
                  fontSize: '16px',
                  borderRadius: '5px',
                }}
              />
              {formik.touched.depositFrom && formik.errors.depositFrom ? (
                <div>
                  <ValidIcon
                    msg={formik.errors.depositFrom}
                    fontColor="var(--red)"
                  />
                </div>
              ) : (
                ''
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            {isLoading ? (
              'Loading ...'
            ) : (
              <Select
                label="Deposited to mobile banking"
                name="depositTo"
                placeholder="Select Mobile Banking"
                formik={formik.errors.depositTo}
                value={formik.values.depositTo}
                touched={formik.touched.depositTo}
                onChange={handleChange}
                data={mobileBank || []}
                display="block"
                padding="10px"
                fontSize="16px"
                border="1px solid var(--stroke)"
              />
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomInput
              label="Transection Id"
              name="transactionId"
              placeholder="Transection Id"
              type="text"
              formik={formik.errors.transactionId}
              value={formik.values.transactionId}
              touched={formik.touched.transactionId}
              handleOnChange={handleOnChange}
              padding="10px 15px"
              fontSize="16px"
              border="1px solid var(--stroke)"
            />
          </Grid>
          <Grid item xs={12} display={{ xs: 'none', sm: 'block' }}>
            {/* for Design */}
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomInput
              label={<span>Amount</span>}
              name="depositAmount"
              placeholder="Amount"
              type="text"
              formik={formik.errors.depositAmount}
              value={formik.values.depositAmount}
              touched={formik.touched.depositAmount}
              handleOnChange={handleOnChange}
              padding="10px 15px"
              fontSize="16px"
              border="1px solid var(--stroke)"
            />
            <span style={{ color: 'var(--red)', fontSize: 12 }}>
              *(1% transaction charge applicable)
            </span>
          </Grid>

          <Grid item xs={4} sm={2}>
            <CustomInput
              label="Getaway Fee (%)"
              name="service"
              placeholder="Getaway Fee"
              value={formik.values.service || 0}
              padding="10px 15px"
              fontSize="16px"
              border="1px solid var(--stroke)"
            />
          </Grid>
          <Grid item xs={8} sm={6}>
            {/* <CustomInput
              label={`Topup Amount`}
              name="amount"
              placeholder="0 BDT"
              value={
                isNaN(formik.values.amount) ? 0 : formik.values.amount ?? 0
              }
              padding="10px 15px"
              fontSize="16px"
              border="1px solid var(--stroke)"
            /> */}
            <lable style={{ fontSize: 12, color: 'var(--icon-color)' }}>
              Topup Amount
            </lable>
            <Box
              sx={{
                bgcolor: 'var(--bgcolor)',
                p: '7px 15px',
                borderRadius: '5px',
              }}
            >
              {isNaN(formik.values.amount) ? 0 : formik.values.amount ?? 0}
            </Box>
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
                Document of Proof or Screenshot <br />
                <span style={{ fontSize: 12 }}>(Max 5MB, JPG/PNG/JFIF)</span>
              </Typography>
              <Collapse in={formik.values.document ? true : false}>
                <>
                  {formik.values.paySlipFile &&
                  IsImageFile(formik.values.paySlipFile) ? (
                    <Box
                      sx={{
                        // height: '200px',
                        // width: '300px',
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
                onClick={handleButtonClick}
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
                  Choose File
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
          <Grid xs={12}>{/* for Design  */}</Grid>

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

export default MobileDeposit;
