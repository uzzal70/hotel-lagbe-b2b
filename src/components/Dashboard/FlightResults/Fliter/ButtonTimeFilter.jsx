/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Button, Grid } from '@mui/material';
import { memo } from 'react';

const ButtonTimeFilter = memo(
  ({ type, button, handleTimeFilter, selected }) => {
    return (
      <Grid item>
        <Button
          onClick={() =>
            handleTimeFilter(
              type,
              button.value,
              button.startDate,
              button.endDate
            )
          }
          size="small"
          sx={{
            p: '0px',
            border: '1px solid var(--stroke)',
            bgcolor: selected === button.value ? 'var(--primary)' : 'unset',
            color: selected === button.value ? 'var(--white)' : 'var(--black)',
            '&:hover': {
              bgcolor: selected === button.value ? 'var(--primary)' : 'unset',
            },
          }}
        >
          {button.label}
        </Button>
      </Grid>
    );
  }
);

export default ButtonTimeFilter;
