/* eslint-disable react/display-name */
import { Typography } from '@mui/material';
import Countdown from 'react-countdown';

const Expiring = ({ handleReset }) => {
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return handleReset();
    } else {
      return (
        <Typography
          sx={{
            color: 'var(--red)',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <span style={{ color: 'var(--primary)' }}>Expiring in:&nbsp; </span>
          <span>
            0{minutes}
            <span style={{ fontSize: '14px' }}> min</span>
          </span>
          <span style={{ padding: '0 5px' }}>:</span>
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
      <Countdown date={Date.now() + 300000} renderer={renderer} />
    </div>
  );
};

export default Expiring;
