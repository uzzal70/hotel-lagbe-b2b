import { Box, LinearProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const LinearProgressDott = () => {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  const progressRef = useRef(() => {});

  useEffect(() => {
    progressRef.current = () => {
      if (progress === 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        setProgress(progress + 1);
        if (buffer < 100 && progress % 5 === 0) {
          const newBuffer = buffer + 1 + Math.random() * 10;
          setBuffer(newBuffer > 100 ? 100 : newBuffer);
        }
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box sx={{ width: '100%', mt: 0.1 }}>
      <LinearProgress
        variant="buffer"
        value={progress}
        valueBuffer={buffer}
        sx={{
          height: 4,
          borderRadius: 5,
          backgroundColor: 'var(--orange)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'var(--primary)',
          },
          '& .MuiLinearProgress-barBuffer': {
            backgroundColor: 'var(--orengel)',
          },
        }}
      />
    </Box>
  );
};

export default LinearProgressDott;
