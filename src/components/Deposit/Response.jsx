import { Box, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CustomButton from '../Common/CustomButton';
import companyInfo from '../../common/companyInfo';
import ErrorIcon from '@mui/icons-material/Error';
const Response = () => {
  const { message } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const amount = params.get('amount');

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: -10,
      }}
    >
      {message?.toLowerCase() === 'success' ? (
        <Box
          sx={{
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            width: { xs: '80%', sm: '70%', md: '70%', lg: '40%' },
            padding: { xs: 1, md: 2 },
            borderRadius: '10px',
            marginBottom: '20px',
            color: 'green',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <CheckCircleOutlineIcon
              sx={{
                fontSize: { xs: 70, sm: 80, md: 80, lg: 90 },
                mt: -8,
                bgcolor: 'var(--white)',
                borderRadius: '50%',
              }}
            />
          </Box>
          <Box>
            <Typography fontSize={{ xs: 18, md: 25 }}>
              {/* Deposit Request Submitted !Deposit Sent Successful ! */}
              Payment Successful
            </Typography>
            {amount ? (
              <Typography sx={{ color: 'var(--black)', fontSize: 13 }}>
                Thank you! Your Deposit of {companyInfo.currencyType}{' '}
                {amount || 0} has been received.
              </Typography>
            ) : (
              <Typography sx={{ color: 'var(--black)', fontSize: 13 }}>
                {`Thank You! We've received your deposit and it's currently under
                review.`}
                {/* <br /> */}
                {/* Kindly provide your account details within 15 minutes to proceed with verification. */}
                {/* Thank you! Your deposit has been received and is currently under
                review. <br /> If you haven't added your account details within
                the next 15 minutes */}
              </Typography>
            )}

            <Typography sx={{ color: 'var(--disable)', fontSize: 13, my: 2 }}>
              If any query contact us at {companyInfo.email} or{' '}
              {companyInfo.phone}{' '}
            </Typography>
            <Box sx={{ textAlign: 'end', mt: 4 }}>
              <CustomButton
                value="Done"
                bgcolor="var(--primary)"
                hovercolor="var(--primary-rgb)"
                textcolor="var(--white)"
                width="150px"
                justify="center"
                padding={'5px 20px'}
                handleClick={() => navigate('/dashboard/deposithistory')}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            width: { xs: '80%', sm: '70%', md: '70%', lg: '40%' },
            padding: { xs: 1, md: 2 },
            borderRadius: '10px',
            marginBottom: '20px',
            color: 'green',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <ErrorIcon
              sx={{
                fontSize: { xs: 70, sm: 80, md: 80, lg: 90 },
                mt: -8,
                bgcolor: 'var(--white)',
                borderRadius: '50%',
                color: 'var(--red)',
              }}
            />
          </Box>
          <Box>
            <Typography
              sx={{ color: 'var(--red)', fontSize: { xs: 18, md: 25 } }}
            >
              Transaction {message || 'Failed'}
            </Typography>
            <Typography sx={{ color: 'var(--black)', fontSize: 14 }}>
              Please check your payment details and try again.
            </Typography>
            <Typography sx={{ color: 'var(--disable)', fontSize: 13, my: 2 }}>
              If any query contact us at {companyInfo.email} or{' '}
              {companyInfo.phone}{' '}
            </Typography>
            <Box sx={{ textAlign: 'end', mt: 4 }}>
              <CustomButton
                value="Close"
                bgcolor="var(--primary)"
                hovercolor="var(--primary-rgb)"
                textcolor="var(--white)"
                width="150px"
                justify="center"
                padding={'5px 20px'}
                handleClick={() => navigate('/dashboard/depositreq')}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Response;
