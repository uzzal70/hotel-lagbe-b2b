import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import LandingHeader from '../../Landing/LandingHeader';
import ImageImport from '../../assets/ImageImport';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../Landing/Footer';
import Processoing from '../Common/Processoing';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

import React, { useState } from 'react';
import CustomButton from '../Common/CustomButton';
import CustomCircularProgress from '../Common/CustomCircularProgress';
import axios from 'axios';
import Expiring from './Expiring';
import { baseUrl } from '../../../baseurl';

const Reset = () => {
  const navigate = useNavigate();
  const MemoizedExpiring = React.memo(Expiring);
  const [isDone, setIsDone] = useState(true);
  const initialState = {
    email: '',
    otp: '',
    response: '',
    id: '',
    password: '',
    showPassword: false,
  };
  const [state, setState] = useState(initialState);
  const handleReset = () => {
    setState(initialState);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsDone(false);
      const commonHeaders = {
        accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${baseUrl}`,
      };
      const endpoint = `${baseUrl}/core/agent/${
        state.otp ? 'verifyEmail' : 'generateOTP'
      }?email=${state.email}&otp=${state.otp}`;
      const changePassword = `${baseUrl}/core/agent/changePassword/${
        state.id
      }?New Password=${encodeURIComponent(state.password)}`;

      const response = await axios({
        method: 'patch',
        url: state?.id ? changePassword : endpoint,
        headers: commonHeaders,
      });

      if (response.data) {
        setState((prevState) => ({
          ...prevState,
          response: 'success',
          id: response?.data?.userId || '',
        }));
        setIsDone(true);
        Swal.fire({
          position: 'center',
          title: response?.data?.title || 'Success',
          html: `<span style="color: var(--primary); font-size: 13px; line-height: 0px">${response?.data?.message}</span>`,
          showConfirmButton: true,
          confirmButtonText: response?.data?.button || 'Ok',
          customClass: {
            popup: 'custom-swal-popup',
          },
        }).then(() => {
          if (state.id) {
            navigate('/');
          }
        });
      }
    } catch (error) {
      setIsDone(false);
      handleReset();
      Swal.fire({
        title: 'Oops...',
        html: `<span style="color: var(--primary); font-size: 13px; line-height: 0px">${
          error?.response?.data?.message || 'Something went wrong!'
        }</span> `,
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
    } finally {
      setIsDone(true);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
            marginTop: { xs: 5, md: 3 },
            minHeight: { xs: '70vh', md: '72vh' },
          }}
        >
          <Box
            sx={{
              width: { xs: '150px', md: '200px' },
              marginX: 'auto',
              display: { xs: 'flex', md: 'none' },
            }}
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
                fontSize: { xs: 20, md: 25, lg: 28 },
                fontWeight: 500,
              }}
            >
              Forgot Your Password!
            </Typography>
            {/* <Typography sx={{ color: 'var(--secondary)', fontSize: 10 }}>
              Registration With {companyInfo.companyName} As An Agent Please
              Make Sure That <br /> You Enter The Correct Information.
            </Typography> */}
          </Box>
          <Container sx={{ px: { xs: 1, sm: 2, md: '' } }}>
            <Box
              sx={{
                my: { xs: 2, md: 3 },
                width: { xs: '90%', sm: '60%', lg: '40%' },
                marginX: 'auto',
                bgcolor: '#ffffff91',
                pt: 4,
                px: 2,
                borderRadius: '5px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              }}
            >
              <form onSubmit={handleOnSubmit} autoComplete="off">
                <Box>
                  <Grid
                    container
                    justifyContent={'center'}
                    alignItems="end"
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          input: {
                            width: {
                              xs: '93%',
                              md: '95%',
                            },
                            p: 1.4,
                            outline: 'none',
                            bgcolor: 'var(--gray)',
                            borderRadius: '5px',
                            fontSize: 14,
                            color: 'var(--black)',
                            border: '1px solid var(--input-border)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: 14,
                            color: 'var(--disable)',
                            textAlign: 'left',
                            pb: 0.5,
                          }}
                        >
                          Enter you email address and we&apos;ll send you a OTP
                          code.
                        </Box>
                        <input
                          name="email"
                          value={state.email || ''}
                          onChange={handleOnChange}
                          required
                          placeholder="Enter your email"
                          disabled={state.response ? true : false}
                        />
                      </Box>
                      {state.response && !state.id && (
                        <Box
                          sx={{
                            mt: 2,
                            input: {
                              width: {
                                xs: '93%',
                                md: '95%',
                              },
                              p: 1.4,
                              outline: 'none',
                              bgcolor: 'var(--gray)',
                              borderRadius: '5px',
                              fontSize: 14,
                              color: 'var(--black)',
                              border: '1px solid var(--input-border)',
                            },
                          }}
                        >
                          <Stack
                            direction="row"
                            justifyContent={'space-between'}
                            alignItems="baseline"
                            pb={0.5}
                          >
                            <Box
                              sx={{
                                fontSize: 14,
                                color: 'var(--disable)',
                                textAlign: 'left',
                              }}
                            >
                              Enter your OTP code.
                            </Box>
                            {/* <MemoizedExpiring handleReset={handleReset} /> */}
                          </Stack>
                          <input
                            name="otp"
                            value={state.otp || ''}
                            onChange={handleOnChange}
                            required
                            placeholder="Enter your OTP code"
                            disabled={state.id ? true : false}
                          />
                        </Box>
                      )}
                      {state.id && (
                        <Box
                          sx={{
                            mt: 2,
                            input: {
                              width: {
                                xs: '93%',
                                md: '95%',
                              },
                              p: 1.4,
                              outline: 'none',
                              bgcolor: 'var(--gray)',
                              borderRadius: '5px',
                              fontSize: 14,
                              color: 'var(--black)',
                              border: '1px solid var(--input-border)',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              fontSize: 14,
                              color: 'var(--disable)',
                              textAlign: 'left',
                              pb: 0.5,
                            }}
                          >
                            Enter new password.
                          </Box>
                          <input
                            name="password"
                            value={state.password || ''}
                            onChange={handleOnChange}
                            required
                            placeholder="Enter new password"
                          />
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                      <Box>
                        {isDone ? (
                          <CustomButton
                            type="submit"
                            value={
                              state.id
                                ? 'Submit'
                                : state.response
                                ? 'Verify OTP'
                                : 'Send OTP'
                            }
                            bgcolor="var(--primary)"
                            hovercolor="var(--primary-rgb)"
                            textcolor="var(--white)"
                            justify="center"
                            padding={'7px 20px'}
                            disabled={!isDone ? true : false}
                            width="120px"
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
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      fontSize: 14,
                      color: 'var(--disable)',
                      textAlign: 'center',
                      py: 3,
                    }}
                  >
                    Remembered your password?
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
                </Box>
              </form>
            </Box>
          </Container>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Footer />
        </Box>
      </Stack>
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

export default Reset;
