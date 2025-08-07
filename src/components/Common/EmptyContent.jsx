import { Box, Button, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { useNavigate } from 'react-router-dom';

const EmptyContent = ({ message = 'No data found.', link, desc }) => {
  const navigate = useNavigate();
  const handleReloadBack = () => {
    link ? navigate('/dashboard?query=Hotel') : navigate(-1);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      sx={{
        height: '300px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: { xs: '90%', md: '500px' },
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          color: 'text.secondary',
          backgroundColor: '#f9f9f9',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        }}
      >
        <InboxIcon sx={{ fontSize: 60, mb: 2, color: 'var(--primary)' }} />
        <Typography variant="h6" gutterBottom>
          {message}
        </Typography>
        <Typography variant="body2">
          {desc ? desc : 'Please check back later or try different filters.'}
        </Typography>
        <Button
          variant="outlined"
          sx={{
            mt: 3,
            bgcolor: 'var(--white)',
            textTransform: 'capitalize',
            '&:hover': {
              bgcolor: 'var(--white)',
            },
            color: 'var(--primary)',
            border: '1px solid var(--primary)',
          }}
          onClick={() => window.location.reload()}
        >
          Reload Page
        </Button>
        <Button
          variant="outlined"
          sx={{
            mt: 3,
            ml: 1,
            bgcolor: 'var(--white)',
            textTransform: 'capitalize',
            '&:hover': {
              bgcolor: 'var(--white)',
            },
            color: 'var(--primary)',
            border: '1px solid var(--primary)',
          }}
          onClick={handleReloadBack}
        >
          Back To previous
        </Button>
      </Box>
    </Box>
  );
};

export default EmptyContent;
