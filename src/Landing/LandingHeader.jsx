import { Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import ImageImport from '../assets/ImageImport';

const LandingHeader = ({ showbtn }) => {
  return (
    <Box py={4}>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Box
          component={Link}
          to="/"
          sx={{
            img: {
              width: { xs: '150px', sm: '150px', md: '200px' },
            },
          }}
        >
          <img
            src={ImageImport.logo}
            loading="lazy"
            alt="Company Logo"
            style={{ height: '100%', display: 'block' }}
          />
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 1, sm: 1, md: 2 }}
        >
          {showbtn && (
            <Box
              sx={{
                display: { xs: 'none', sm: 'block' },
              }}
            >
              <Link
                style={{
                  color: 'var(--white)',
                  fontSize: { xs: 13, sm: 15, md: 18 },
                  backgroundColor: 'var(--primary-btn)',
                  padding: '7px 20px',
                  borderRadius: '5px',
                  fontWeight: 400,
                }}
                to="/registration"
              >
                Partner Registration
              </Link>
            </Box>
          )}
          <Link
            style={{
              color: 'var(--white)',
              fontSize: { xs: 13, sm: 15, md: 18 },
              backgroundColor: 'var(--primary-btn)',
              padding: '7px 20px',
              borderRadius: '5px',
              fontWeight: 400,
            }}
            to="/contact"
          >
            Contact&nbsp;Us
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LandingHeader;
