import { Box, Typography } from '@mui/material';
import Login from '../components/Login/Login';
import ImageImport from '../assets/ImageImport';

const MobileLogin = () => {
  const landigpagebannarsm =
    'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/event/landigpagebannarsm.webp';
  const landigpageiconsm =
    'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/event/landigpageiconsm.svg';
  return (
    <Box>
      <Box
        sx={{
          minHeight: '100vh',
          px: 2,
          display: 'flex',
        }}
      >
        <Box width={'100%'} pt={3} sx={{ position: 'relative' }}>
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                img: {
                  maxWidth: '100%',
                  height: '280px',
                  objectFit: 'cover',
                },
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img src={landigpagebannarsm} alt="Company Logo" />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                mt: '-30%',
              }}
              className="position-center"
            >
              <Box>
                <img
                  src={ImageImport.logotm}
                  style={{ width: '250px' }}
                  alt=""
                />
                <Typography
                  textAlign={'center'}
                  sx={{ color: 'var(--primary)', fontSize: 14, pt: 1 }}
                >
                  A sister concern of{' '}
                  <span style={{ fontSize: 16 }}>
                    <strong>trip</strong>findy
                  </span>
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
              mt: -5,
            }}
            className="position-center"
          >
            <Box>
              <img src={ImageImport.logotm} style={{ width: '250px' }} alt="" />
              <Typography
                textAlign={'center'}
                sx={{ color: 'var(--primary)', fontSize: 14, pt: 1 }}
              >
                A sister concern of <strong>trip</strong>findy
              </Typography>
            </Box>
          </Box> */}
          <Box sx={{ position: 'absolute', width: '100%', top: '200px' }}>
            <Login />
            <Box
              // border={'1px solid'}
              sx={{
                mt: -16,
                img: {
                  maxWidth: '280px',
                },
                display: 'flex',
                justifyContent: 'center',
                zIndex: -2,
              }}
            >
              <img src={landigpageiconsm} alt="Company Logo" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MobileLogin;
