/* eslint-disable react/prop-types */
import { Modal, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none !important',
  boxShadow: 24,
  p: { xs: 2, sm: 2, md: 3, lg: 4 },
  borderRadius: '10px',
  outline: 'none !important',
};

const Processoing = ({ content, content1, content2, content3 }) => {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [currentContent, setCurrentContent] = useState(content1);
  const [contentIndex, setContentIndex] = useState(0);

  // Progress bar effect
  useEffect(() => {
    const progressRef = setInterval(() => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    }, 500);
    return () => clearInterval(progressRef);
  }, [progress]);

  // Show content sequentially with 1-second interval
  useEffect(() => {
    const timer = setInterval(() => {
      if (contentIndex < 3) {
        setContentIndex((prev) => prev + 1);
      } else {
        clearInterval(timer); // Stop after showing all content
      }
    }, 2000); // 1 second interval for each content change

    return () => clearInterval(timer);
  }, [contentIndex]);

  useEffect(() => {
    // Change current content based on the index
    switch (contentIndex) {
      case 0:
        setCurrentContent(content1);
        break;
      case 1:
        setCurrentContent(content2);
        break;
      case 2:
        setCurrentContent(content3);
        break;
      default:
        setCurrentContent(content); // default fallback
    }
  }, [contentIndex, content1, content2, content3]);
  const matchContent = 'Traveler details are being saved to your list...';
  return (
    <Box>
      <Modal open={true}>
        <Box sx={{ ...style, width: { xs: '80%', sm: '50%', md: '25%' } }}>
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{
                color:
                  contentIndex === 0 && matchContent === content1
                    ? 'var(--dark-green)'
                    : contentIndex === 1
                    ? 'var(--dark-sky)'
                    : contentIndex === 2
                    ? 'var(--orengel)'
                    : 'var(--primary)',
                mb: 1,
                fontSize: { xs: 13, md: 15 },
              }}
            >
              {currentContent ||
                'We are processing your request please wait...'}
            </Typography>
            <LinearProgress
              variant="buffer"
              sx={{
                backgroundColor: 'var(--light-bgcolor)', // Background color
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'var(--primary)', // Color of the progress bar
                },
                '& .MuiLinearProgress-bar2Buffer': {
                  backgroundColor: 'var(--fontcolor)', // Color of the buffer bar
                },
                borderRadius: '20px',
              }}
              value={progress}
              valueBuffer={buffer}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Processoing;
