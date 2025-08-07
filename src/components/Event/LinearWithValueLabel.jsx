import { Box, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
const LinearWithValueLabel = ({ targetValue, bookingSum }) => {
  const [value, setValue] = useState(0); // Start from 0

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      if (progress >= targetValue) {
        clearInterval(interval); // Stop animation at the target value
        setValue(targetValue);
      } else {
        setValue(progress);
      }
    }, 100); // Adjust speed of the animation

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [targetValue]);
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        borderRadius: '8px',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '-25px',
          left: `${value}%`,
          transform: 'translateX(-50%)',
          backgroundColor: '#D50000',
          color: '#fff',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          transition: 'left 0.3s ease, transform 0.3s ease',
        }}
      >
        {`${bookingSum}`}
      </Box>

      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 7,
          backgroundColor: '#ccc',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#FFB300',
          },
        }}
      />
    </Box>
  );
};

export default LinearWithValueLabel;
