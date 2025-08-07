/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
const GetSupportButton = ({
    fontSize,
    value,
    textcolor,
    bgcolor,
    hovercolor,
    padding,
    border,
    onClick,
    onClick1,
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


    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
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
            onClick={isMdUp ? onClick : onClick1}
            endIcon={endIcon || undefined}
            startIcon={startIcon || undefined}
            disabled={disabled || undefined}
            display={display}
        >
            {value}
        </Button>
    );
};

export default GetSupportButton;
