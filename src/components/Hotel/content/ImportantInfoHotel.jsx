import { Box, Button, Stack, Typography } from '@mui/material';
import hotel from '../../../assets/images/hotel';

const ImportantInfoHotel = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mb: 2,
        padding: 2.5,
        py: 1,
        rounded: 1,
        borderColor: '#DADFE6',
        bgcolor: 'var(--white)',
        borderRadius: '10px',
        mx: { xs: 0.5, md: 'unset' },
        position: 'relative',
      }}
    >
      {/* Important information */}
      <Box sx={{ mb: 1 }}>
        <Typography
          sx={{
            color: 'var(--black)',
            fontWeight: 500,
            fontSize: { xs: 12, md: 16 },
            mb: 1,
          }}
        >
          Important information
        </Typography>

        {[
          'Passport and Govt. ID are accepted as ID proof(s)',
          'Mandatory : Deposit: THB 1000.00 per accommodation, per night',
          'The property  requires a refundable security deposit of THB 1,000 per night upon  check-in. As the property prepares to welcome the New Year, please be  advised that the swimming pool will be closed from December 31, 2024,  until 10 AM of January 1, 2025, for necessary preparations related to  the celebrations. The property provides a drop-off service to hotel to  MRT and shop area.',
        ].map((item, index) => (
          <Box sx={{ display: 'flex' }} key={index}>
            <Box>
              {' '}
              <img
                src={hotel.radio}
                alt=""
                style={{ paddingRight: '10px', paddingBottom: '3px' }}
              />
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: 'var(--black)',
                fontSize: { xs: 11, md: 13 },
              }}
            >
              {item}
            </Typography>
          </Box>
        ))}

        <Stack direction="row" spacing={1} alignItems="center" mt={2}>
          <Box>
            <Button
              sx={{
                border: 1,
                fontSize: { xs: 10, md: 12 },
                py: 0.5,
                textTransform: 'capitalize',
                color: 'var(--primary)',
              }}
            >
              Cribs and Extra beds
            </Button>
          </Box>
          <Box>
            <Button
              sx={{
                border: 1,
                fontSize: { xs: 10, md: 12 },
                py: 0.5,
                textTransform: 'capitalize',
                color: 'var(--primary)',
              }}
            >
              Cribs and Extra beds
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ImportantInfoHotel;
