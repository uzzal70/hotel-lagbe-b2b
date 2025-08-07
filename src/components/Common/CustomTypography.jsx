/* eslint-disable react/prop-types */
import { Tooltip, Typography } from '@mui/material';

const CustomTypography = ({
  px,
  py,
  fontcolor,
  bgcolor,
  value,
  icon,
  click,
  title,
  radius,
  fsize,
  display,
  fontWeight,
  border,
  t,
}) => {
  return (
    <Tooltip title={title || ''} followCursor>
      <Typography
        sx={{
          color: fontcolor || '',
          fontSize: fsize || 12,
          bgcolor: bgcolor || '',
          px: px || 1,
          py: py || 0.2,
          border: border || '',
          borderRadius: radius || 2,
          display: display || 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          fontWeight: fontWeight || '300',
          textTransform: t || 'capitalize',
        }}
        onClick={click}
      >
        {icon ? <>{icon}&nbsp;</> : null}
        {value || ''}
      </Typography>
    </Tooltip>
  );
};

export default CustomTypography;
