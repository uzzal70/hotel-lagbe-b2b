import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';

const ReissueFilter = () => {
  const [alignment, setAlignment] = useState('Itinerary');
  const buttons = [
    { label: 'Cheapest', value: 'Cheapest' },
    { label: 'Fastest', value: 'Fastest' },
    { label: 'Best', value: 'Best' },
    { label: 'Earliest', value: 'Earliest' },
  ];

  const handleChange = (newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box>
      <Stack direction="row" spacing={{ xs: 1, sm: 2 }}>
        {buttons.map((button, i, arr) => (
          <Button
            key={button.value}
            onClick={() => handleChange(button.value)}
            size="small"
            sx={{
              textTransform: 'capitalize',
              fontWeight: 400,

              bgcolor:
                alignment === button.value
                  ? 'var(--primary)'
                  : 'var(--bgcolor)',
              color:
                alignment === button.value ? 'var(--white)' : 'var(--primary)',
              '&:hover': {
                bgcolor:
                  alignment === button.value
                    ? 'var(--primary)'
                    : 'var(--bgcolor)',
              },
            }}
          >
            {button.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default ReissueFilter;
