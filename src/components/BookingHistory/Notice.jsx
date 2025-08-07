/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

const Notice = ({ title, text1, text2, m }) => {
  return (
    <Box
      sx={{
        bgcolor: 'var(--yellow-light)',
        p: 0.5,
        fontSize: { xs: 12, md: 13 },
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
        borderRadius: '5px',
        m: m,
      }}
    >
      <InfoOutlined sx={{ color: 'var(--orengel)', fontSize: 16, mr: 1 }} />

      <Box>
        <span>You have the option to choose {text1 || ''} at once.&nbsp;</span>
        <span style={{ textTransform: 'capitalize' }}>{title || ''}</span>
        <span>
          &nbsp;this ticket will only impact the selected {text2 || ''} based on
          the airline&apos;s policy.
        </span>
      </Box>
    </Box>
  );
};

export default Notice;
