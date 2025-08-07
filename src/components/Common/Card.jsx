/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';

const Card = ({
  title,
  value,
  p,
  valuefontSize,
  textTransform,
  bgcolor,
  radius,
  valueColor,
  idcolor,
}) => {
  return (
    <Box
      sx={{
        bgcolor: bgcolor || 'var(--gray)',
        borderRadius: radius || '5px',
        p: p || { xs: 1, md: 1, lg: 1.5 },
      }}
    >
      <Typography
        sx={{
          color: 'var(--secondary)',
          fontSize: 10,
          textTransform: 'capitalize',
        }}
      >
        {title || ''}
      </Typography>
      <Typography
        sx={{
          color: valueColor || 'var(--dark-sky)',
          fontSize: valuefontSize || { xs: 11, sm: 12, md: 16 },
          fontWeight: 500,
          textTransform: textTransform || 'capitalize',
          bgcolor: idcolor ? 'var(--primary)' : 'none',
          p: idcolor ? '1px 5px' : '0',
          borderRadius: idcolor ? '4px' : '0',
        }}
      >
        {value || ''}
      </Typography>
    </Box>
  );
};

export default Card;
