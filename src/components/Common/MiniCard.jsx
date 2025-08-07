import { Box, Typography } from '@mui/material';

const MiniCard = ({ title, value, width }) => {
  return (
    <Box
      sx={{
        mt: { xs: 1, md: 0 },
        border: '1px solid var(--bgcolor)',
        p: '12px 20px 4px 20px',
        fontSize: 12,
        width: width || { xs: '200px', sm: '200px', md: '200px' },
        borderRadius: '5px',
        textTransform: 'capitalize',
        color: 'var(--white)',
        background: 'var(--dark-sky)',
        textAlign: 'center',
        position: 'relative',
        fontWeight: 500,
      }}
    >
      <Typography
        sx={{
          top: -11,
          border: '1px solid var(--dark-sky)',
          fontSize: 12,
          fontWeight: 300,
          bgcolor: 'var(--white)',
          color: 'var(--dark-sky)',
          px: 1.5,
          borderRadius: 20,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        noWrap
      >
        {title || 'Title'}
      </Typography>
      {value || '0'}
    </Box>
  );
};

export default MiniCard;
