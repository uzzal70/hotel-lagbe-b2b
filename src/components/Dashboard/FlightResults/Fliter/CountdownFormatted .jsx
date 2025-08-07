/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Box, Modal, Typography } from '@mui/material';
import Countdown from 'react-countdown';
import SessionModal from '../../../Common/SessionModal';
import { memo } from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: { xs: 2, md: 4 },
  borderRadius: '10px',
  outline: 'none !important',
};

const CountdownFormatted = memo(({ width, padding, fontSize, fontWeight }) => {
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return (
        <Modal open={true} onClose={() => false}>
          <Box sx={{ ...style, width: 'fit-content' }}>
            <SessionModal
              handleClick={() => {
                window.location.reload();
              }}
            />
          </Box>
        </Modal>
      );
    } else {
      return (
        <Typography
          sx={{
            bgcolor: 'var(--bgcolor)',
            color: 'var(--primary)',
            fontSize: fontSize || 20,
            p: padding || 0.5,
            borderRadius: '5px',
            fontWeight: fontWeight || 700,
            width: width || '200px',
            textAlign:"center",
          }}
        >
          <span>
            {minutes}
            <span style={{ fontSize: '14px' }}> min</span>
          </span>
          <span style={{ padding: '0 10px' }}>:</span>

          <span>
            {seconds}
            <span style={{ fontSize: '14px' }}> sec</span>
          </span>
        </Typography>
      );
    }
  };
  return (
    <div>
      <Countdown date={Date.now() + 1200000} renderer={renderer} />
    </div>
  );
});

export default CountdownFormatted;
