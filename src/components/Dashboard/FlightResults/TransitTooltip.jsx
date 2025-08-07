/* eslint-disable react/prop-types */
import { Box, Grid, Stack } from '@mui/material';
import { TransitTimeCalculate } from '../../Common/TimeAndDistanceCalculation/totalTimeDifference';

const TransitTooltip = ({ data }) => {
  return (
    <Box
      sx={{
        bgcolor: 'var(--primary)',
        p: 1.5,
        fontWeight: 300,
        borderRadius: '5px',
      }}
    >
      <Box sx={{ mb: 1, fontWeight: 400, fontSize: 13 }}>
        Transit (Plane Change)
      </Box>
      <Grid container spacing={1.5}>
        {data?.map((item, i, arr) => (
          <Grid
            item
            xs={12}
            key={i}
            sx={{
              display: i === arr.length - 1 ? 'none' : '',
            }}
          >
            <Stack
              direction={'row'}
              spacing={1}
              justifyContent={'space-between'}
            >
              <Box>
                <Box>{i === 0 && '1st Transit'}</Box>
                {i === 0 && (
                  <Box sx={{ mt: -1, color: 'var(--disable)' }}>
                    -----------
                  </Box>
                )}
                <Box>{i === 1 && '2nd Transit'}</Box>
                {i === 1 && (
                  <Box sx={{ mt: -1, color: 'var(--disable)' }}>
                    -----------
                  </Box>
                )}
                <Box>
                  {item.arrivalLocation?.split(',')[0]} (
                  {item?.arrivalAirportCode})
                </Box>
                <Box>{item?.arrivalAirportName}</Box>
                <Box
                  sx={{
                    color: 'var(--tarnsit)',
                    fontWeight: 500,
                    fontSize: 13,
                  }}
                >
                  Layover Time{': '}
                  {TransitTimeCalculate(
                    data[i + 1]?.departureDateTime?.split('+')[0],
                    data[i]?.arrivalDateTime?.split('+')[0]
                  )}
                </Box>
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TransitTooltip;
