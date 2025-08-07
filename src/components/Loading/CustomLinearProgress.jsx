import { Box, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';

const CustomLinearProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 8;
        return Math.min(oldProgress + diff, 95);
      });
    }, 400);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box
      sx={{
        '.MuiLinearProgress-root': {
          bgcolor: 'var(--bgcolor)',
        },
        '.MuiLinearProgress-bar': {
          bgcolor: 'var(--primary)',
        },
      }}
    >
      <LinearProgress
        variant="determinate"
        sx={{ borderRadius: '5px', py: 0.3 }}
        value={progress}
      />
    </Box>
  );
};

export default CustomLinearProgress;
