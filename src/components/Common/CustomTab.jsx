/* eslint-disable react/prop-types */
import { Box, Button, Grid } from '@mui/material';

const CustomTab = ({ handleChange, data, buttons }) => {
  return (
    <div>
      <Box
        sx={{
          button: {
            textTransform: 'capitalize',
            fontWeight: 400,
            fontSize: { xs: 10, sm: 12 },
            px: { xs: 1, sm: 2 },
            borderRadius: '5px',
          },
        }}
      >
        <Grid container spacing={{ xs: 1 }}>
          {buttons.map((button) => (
            <Grid item key={button.value}>
              <Button
                className={
                  data !== button.value
                    ? button.value.toLowerCase()?.split(' ')?.join('-')
                    : 'btn-active'
                }
                onClick={() => handleChange(button.value)}
              >
                {button.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default CustomTab;
