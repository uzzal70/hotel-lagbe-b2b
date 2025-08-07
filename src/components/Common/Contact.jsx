import { Box, Grid, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

const Contact = () => {
  return (
    <Box>
      <Typography
        sx={{
          color: 'var(--black)',
          fontSize: 16,
          fontWeight: 400,
          mb: 2,
        }}
      >
        Support Contact
      </Typography>
      <Grid container direction={{ xs: 'row', md: 'column' }}>
        <Grid item xs={6}>
          <Typography
            sx={{ color: 'var(--secondary)', fontSize: 14, display: 'flex' }}
          >
            <PhoneIcon sx={{ fontSize: 18, color: 'var(--icon-color)' }} />{' '}
            +58805655564
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{ color: 'var(--secondary)', fontSize: 14, display: 'flex' }}
          >
            <PhoneIcon sx={{ fontSize: 18, color: 'var(--icon-color)' }} />{' '}
            +58805655564
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
