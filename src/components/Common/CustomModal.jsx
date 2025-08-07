import { Box, Typography } from '@mui/material';
import CustomButton from './CustomButton';

// eslint-disable-next-line react/prop-types
const CustomModal = ({ handleClick, status, message, text, image, hotel }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ width: { xs: '70%', md: '40%' }, margin: 'auto' }}>
        <img src={image} alt="flight" style={{ width: '100%' }} />
      </Box>
      <Typography
        sx={{
          color: 'var(--primary)',
          fontSize: { xs: 18, md: 20 },
          fontWeight: 500,
          my: 2,
        }}
      >
        {status}
      </Typography>
      <Typography
        sx={{
          color: 'var(--secondary)',
          fontSize: { xs: 14 },
          fontWeight: 400,
          mb: 3,
        }}
      >
        {message}
      </Typography>
      <CustomButton
        value={text || 'Ok'}
        bgcolor="var(--primary)"
        textcolor="var(--white)"
        padding="5px 30px"
        hovercolor="var(--primary-rgb)"
        handleClick={hotel ? () => handleClick() : handleClick}
      />
    </Box>
  );
};

export default CustomModal;
