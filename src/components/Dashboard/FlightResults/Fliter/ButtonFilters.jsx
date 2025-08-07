/* eslint-disable react/prop-types */
import { Box, Grid } from '@mui/material';

const ButtonFilters = ({
  data,
  handleChange,
  buttonState,
  border,
  bgcolor,
  px,
}) => {
  return (
    <Box>
      <Grid container justifyContent={'space-between'} rowSpacing={1}>
        {data.map((button) => (
          <Grid item key={button.value}>
            <Box
              onClick={() => handleChange(button.value)}
              sx={{
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontWeight: 400,
                fontSize: 12,
                borderRadius: '5px',
                py: 0.4,
                px: px || 1,
                border: border || 'unset',
                bgcolor:
                  buttonState === button.value ? 'var(--primary)' : bgcolor,
                color:
                  buttonState === button.value
                    ? 'var(--white)'
                    : 'var(--black)',
                '&:hover': {
                  bgcolor:
                    buttonState === button.value ? 'var(--primary)' : bgcolor,
                },
              }}
            >
              {button.label}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ButtonFilters;
