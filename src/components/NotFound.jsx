import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        bgcolor: 'var(--primary)',
        height: '100Vh',
        direction: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={() => navigate('/dashboard')}
    >
      <Box textAlign="center">
        <Typography
          sx={{
            fontSize: { xs: '2.5em', sm: '4em' },
          }}
        >
          Page Not Found
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1.5em', sm: '2em' },
            color: 'var(--white)',
          }}
        >
          Back To Home
        </Typography>
      </Box>
    </Stack>
  );
};

export default NotFound;
