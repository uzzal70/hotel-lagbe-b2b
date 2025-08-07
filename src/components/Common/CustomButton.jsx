/* eslint-disable react/prop-types */
import { Button } from '@mui/material';

const CustomButton = ({
  fontSize,
  value,
  textcolor,
  bgcolor,
  hovercolor,
  padding,
  border,
  handleClick,
  endIcon,
  startIcon,
  type,
  width,
  borderRadius,
  justify,
  disabled,
  display,
  fontWeight,
}) => {
  return (
    <Button
      type={type}
      sx={{
        fontSize: fontSize || 14,
        justifyContent: justify || '',
        width: width || 'fit-content',
        textTransform: 'capitalize',
        color: textcolor,
        bgcolor: bgcolor,
        p: padding,
        border: border || 'none',
        borderRadius: borderRadius || undefined,
        '&:hover': {
          bgcolor: hovercolor,
        },
        fontWeight: fontWeight || 400,
      }}
      onClick={handleClick ? () => handleClick() : undefined}
      endIcon={endIcon || undefined}
      startIcon={startIcon || undefined}
      disabled={disabled || undefined}
      display={display}
    >
      {value}
    </Button>
  );
};

export default CustomButton;
