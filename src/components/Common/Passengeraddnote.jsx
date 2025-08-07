import { Box } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
const Passengeraddnote = () => {
  return (
    <Box
      sx={{
        fontSize: 10,
        color: 'var(--dark-green)',
        display: 'flex',
        mt: 1.5,
      }}
    >
      <InfoOutlined sx={{ fontWeight: 400, fontSize: 13 }} /> &nbsp;The
      passenger is automatically recorded for future reference.
    </Box>
  );
};

export default Passengeraddnote;
