/* eslint-disable react/prop-types */
import { Box, Grid, Typography } from '@mui/material';
import SimPDFButton from './SimPDFButton';

const TravellerDetails = ({ item, data }) => {
  const travellers = item?.simdetails;
  return (
    <Box
      bgcolor="white"
      sx={{
        borderRadius: '10px',
        padding: { xs: 2, sm: 3 },
        pt: 2,
        my: 2,
      }}
    >
      {travellers?.map((traveller, index) => (
        <Box key={index} mb={1} sx={{ display: {} }}>
          <Grid
            container
            alignItems="center"
            justifyContent={'space-between'}
            spacing={1}
          >
            <Grid item xs={9}>
              {index === 0 && (
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: 12, md: 16 },
                    fontWeight: 500,
                    color: 'var(--primary)',
                    mb: 1,
                  }}
                >
                  Traveller Details
                </Typography>
              )}
              <Typography
                sx={{
                  fontSize: { xs: 12, md: 16 },
                  color: 'var(--primary)',
                  span: {
                    fontSize: 10,
                    color: 'var(--dark-green)',
                  },
                  textTransform: 'capitalize',
                }}
                noWrap
              >
                {`${index + 1}. ${traveller.paxName}`} <span>{'(Active)'}</span>
              </Typography>
            </Grid>

            <Grid item xs={3} textAlign="center" justifyContent="center">
              {index === 0 && (
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: 12, md: 14 },
                    fontWeight: 500,
                    color: 'var(--primary)',
                    mb: 1,
                  }}
                >
                  Download eSIM
                </Typography>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {traveller?.qrCodeUrl ? (
                  <SimPDFButton
                    paxData={traveller}
                    data={item}
                    agentData={data}
                  />
                ) : (
                  <Box
                    sx={{
                      border: '1px solid var(--red)',
                      borderRadius: 1.5,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: { xs: 20, sm: 30 },
                      height: { xs: 20, sm: 30 },
                      fontSize: { xs: 9, sm: 12 },
                      p: 0.5,
                    }}
                  >
                    N/A
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default TravellerDetails;
