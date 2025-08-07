/* eslint-disable react/prop-types */
import { Box, CircularProgress } from '@mui/material';

const CustomCircularProgress = ({ pt, size }) => {
  return (
    <Box>
      <Box sx={{ position: 'relative', pt: pt || 0.5 }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === 'light' ? 300 : 800],
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          size={size || 14}
          thickness={4}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: (theme) =>
              theme.palette.mode === 'light'
                ? 'var(--primary)'
                : 'var(--primary)',
            animationDuration: '550ms',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          size={size || 14}
          thickness={4}
        />
      </Box>
    </Box>
  );
};

export default CustomCircularProgress;
