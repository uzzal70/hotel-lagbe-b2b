import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import TextsmsIcon from '@mui/icons-material/Textsms';
import { useState } from 'react';
import { baseUrl } from '../../../baseurl';
import axios from 'axios';
import Swal from 'sweetalert2';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: '10px',
  outline: 'none !important',
};
const OTPModal = ({
  timeLeft,
  handleSubmit,
  showOtpModal,
  handleRegister,
  setShowOtpModal,
  setOtp,
  otp,
  emailForOtp,
}) => {
  const [isDone, setIsDone] = useState(true);
  const handleVerifyOtp = async () => {
    const verifyOtpEndpoint = `${baseUrl}/core/agent/verifySignupAgentEmail?email=${emailForOtp}&otp=${otp}`;
    try {
      setIsDone(false);
      const response = await axios.patch(verifyOtpEndpoint, {
        email: emailForOtp,
        otp,
      });
      if (response.data.status === 'verified') {
        setShowOtpModal(false);
        handleRegister();
      } else {
        setOtp('');
        setIsDone(true);
        setShowOtpModal(false);
        Swal.fire({
          title: 'Invalid OTP',
          text: response?.data?.message || 'Please enter the correct OTP.',
        });
      }
    } catch (error) {
      setOtp('');
      setIsDone(true);
      setShowOtpModal(false);
      Swal.fire({ title: 'Error', text: 'OTP verification failed.' });
    }
  };
  return (
    <div>
      <Modal open={showOtpModal}>
        <Box
          sx={{
            ...style,
            width: { xs: '90%', sm: '60%', md: '500px' },

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
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleVerifyOtp();
            }}
            autoComplete="off"
          >
            <Box
              sx={{
                color: 'var(--primary)',
                fontSize: 16,
                bgcolor: 'var(--bgcolor)',
                p: 1,
                display: 'flex',
                gap: '8px',
                mb: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TextsmsIcon />
                <Typography variant="body2">
                  Sent to your email. Verify Your OTP
                </Typography>
              </Box>
              <ClearRoundedIcon
                sx={{ cursor: 'pointer', fontSize: 20 }}
                onClick={() => setShowOtpModal(false)}
              />
            </Box>

            <Box
              sx={{
                px: 2,
                fontSize: 14,
                color: 'var(--primary)',
                mb: 0.5,
              }}
            >
              Please enter the OTP
            </Box>
            <Box
              sx={{
                px: { xs: 2, md: 2 },
                pb: 1,
                display: 'flex',
                input: {
                  outline: 'none',
                  width: '100%',
                  border: '1px solid var(--stroke)',
                  borderBottomLeftRadius: '5px',
                  borderTopLeftRadius: '5px',
                  px: { xs: 1, md: 1.5 },
                  fontSize: 16,
                },
              }}
            >
              <input
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <Box>
                {isDone ? (
                  <Button
                    type="submit"
                    sx={{
                      color: 'var(--white)',
                      textTransform: 'capitalize',
                      backgroundColor: 'var(--primary)',
                      borderRadius: '0px',
                      borderBottomRightRadius: '5px',
                      borderTopRightRadius: '5px',
                      '&:hover': {
                        backgroundColor: 'var(--primary-rgb)',
                      },
                      width: '120px',
                      cursor: 'pointer',
                      p: '8px 14px',
                    }}
                    disabled={!isDone ? true : false}
                  >
                    Verify OTP
                  </Button>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: '80px',
                        bgcolor: 'var(--bgcolor)',
                        fontSize: '12px',
                        p: '12px 14px',
                        borderEndEndRadius: '5px',
                        borderTopRightRadius: '5px',
                      }}
                    >
                      Processing...
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
            <Stack
              direction={'row'}
              alignItems={'center'}
              px={2}
              pb={2}
              color={'var(--primary)'}
              spacing={2}
            >
              {timeLeft > 0 ? (
                <Box
                  sx={{
                    color: timeLeft ? 'var(--primary)' : 'var(--red)',
                    fontSize: 14,
                    fontWeight: 300,
                  }}
                >
                  OTP Resend in: {Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, '0')} minutes
                </Box>
              ) : (
                'Didn’t get a OTP?'
              )}
              <Button
                type="button"
                disabled={timeLeft}
                onClick={handleSubmit}
                style={{
                  backgroundColor: 'transparent',
                  color: timeLeft ? 'var(--disable)' : 'var(--orengel)',
                  textTransform: 'capitalize',
                  fontSize: 14,
                  cursor: 'pointer',
                  padding: '0px 10px',
                  borderRadius: '5px',
                  textDecoration: 'underline',
                  fontWeight: 300,
                }}
              >
                Resend OTP
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default OTPModal;
