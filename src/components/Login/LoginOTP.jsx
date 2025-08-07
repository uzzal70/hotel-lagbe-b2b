import { Box, Button, Stack } from '@mui/material';
import TextsmsIcon from '@mui/icons-material/Textsms';
import { useEffect } from 'react';
import { baseUrl } from '../../../baseurl';
import axios from 'axios';
import Swal from 'sweetalert2';

const LoginOTP = ({
  otp,
  setOtp,
  isDone,
  timeLeft,
  handleSubmit,
  emailForOtp,
  setTimeLeft,
  setOtpTab,
  handleChekingWithOtpSent,
  setIsDone,
}) => {
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleVerifyOtp = async () => {
    const verifyOtpEndpoint = `${baseUrl}/core/agent/verifyLoginAgentEmail?email=${emailForOtp}&otp=${otp}`;
    try {
      setIsDone(false);
      const response = await axios.patch(verifyOtpEndpoint, {
        email: emailForOtp,
        otp,
      });
      if (response.data.status === 'verified') {
        handleSubmit();
      } else {
        setOtp('');
        setIsDone(true);
        Swal.fire({
          title: response?.data?.title || 'Invalid OTP',
          text: response?.data?.message || 'Please enter the correct OTP.',
        });
      }
    } catch (error) {
      setOtp('');
      setIsDone(true);
      Swal.fire({ title: 'Error', text: 'OTP verification failed.' });
    }
  };
  return (
    <Box>
      <Box
        sx={{
          fontSize: 16,
          bgcolor: 'var(--green)',
          p: 1,
          gap: '8px',
          display: 'flex',
          borderRadius: 1,
        }}
      >
        <TextsmsIcon
          sx={{
            color: 'var(--dark-green)',
          }}
        />
        <Box
          sx={{
            fontSize: 18,
            color: 'var(--dark-sky)',
            mt: -0.2,
          }}
        >
          OTP Sent to your email.
          {/* <Box
            sx={{
              fontSize: 14,
              color: 'var(--dark-sky)',
              mt: -0.2,
            }}
          >
            Verify Your OTP
          </Box> */}
        </Box>
      </Box>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleVerifyOtp();
        }}
        autoComplete="off"
      >
        <Box>
          <Box
            sx={{
              mt: 2,
              input: {
                outline: 'none',
                width: '100%',
                border: '1px solid var(--secondary)',
                borderRadius: '5px',
                px: { xs: 1, md: 1.5 },
                py: 1.3,
                fontSize: 16,
                boxSizing: 'border-box',
                background: 'var(--white)',
              },
            }}
          >
            {/* <input
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="Please enter the OTP"
              autoFocus
            /> */}
            <input
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              onPaste={(e) => {
                e.preventDefault(); // Prevent default paste behavior
                const pastedText = e.clipboardData.getData('text').trim(); // Remove spaces
                setOtp(pastedText);
              }}
              required
              placeholder="Please enter the OTP"
            />
          </Box>
        </Box>

        <Stack
          direction={'row'}
          alignItems={'center'}
          color={'var(--primary)'}
          spacing={2}
          sx={{
            justifyContent: 'center',
            py: 2,
            fontSize: 14,
            fontWeight: 400,
          }}
        >
          {timeLeft > 0 ? (
            <Box
              sx={{
                color: timeLeft ? 'var(--primary)' : 'var(--red)',
                width: 170,
              }}
            >
              OTP Resend in? {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, '0')} m
            </Box>
          ) : (
            'Didn’t get a OTP?'
          )}
          <Button
            type="button"
            disabled={timeLeft}
            onClick={(e) => handleChekingWithOtpSent(e)}
            style={{
              backgroundColor: 'transparent',
              color: timeLeft ? 'var(--disable)' : 'var(--orengel)',
              textTransform: 'capitalize',
              fontSize: 14,
              cursor: 'pointer',
              padding: '0px 5px',
              borderRadius: '5px',
              fontWeight: 400,
            }}
          >
            {!isDone ? 'Processing...' : 'Resend'}
          </Button>
        </Stack>

        <Box
          sx={{
            mb: 2,
          }}
        >
          <Button
            fullWidth
            type="submit"
            sx={{
              mb: 2,
              color: 'var(--white)',
              //   textTransform: 'capitalize',
              backgroundColor: 'var(--primary)',
              borderRadius: '5px',
              '&:hover': {
                backgroundColor: 'var(--primary)',
              },
              cursor: 'pointer',
              p: '5px 10px',
            }}
            disabled={!isDone ? true : false}
          >
            {!isDone ? 'Processing...' : 'Verify OTP'}
          </Button>

          <Button
            type="button"
            fullWidth
            sx={{
              color: 'var(--primary)',
              textTransform: 'capitalize',
              backgroundColor: 'var(--white)',
              borderRadius: '5px',
              '&:hover': {
                backgroundColor: 'var(--white)',
              },
              cursor: 'pointer',
              p: '3px 10px',
              border: '1px solid var(--stroke)',
            }}
            onClick={() => setOtpTab('form')}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginOTP;
