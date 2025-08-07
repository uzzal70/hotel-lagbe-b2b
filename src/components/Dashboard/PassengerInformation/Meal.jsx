/* eslint-disable react/prop-types */
import { Box, Grid, Radio, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import companyInfo from '../../../common/companyInfo';

const Meal = ({
  mealData,
  selectedOptions,
  handleSelect,
  firstName,
  lastName,
  passengerIndex,
}) => {
  return (
    <Box>
      <Box sx={{ fontSize: 16, mb: 1, color: 'var(--primary)' }}>Add Meal</Box>
      {mealData?.map((item, groupIndex) => (
        <Box
          key={groupIndex}
          sx={{
            p: { xs: 1, md: 2 },
            border: '1px solid var(--stroke)',
            mb: 1,
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              bgcolor: 'var(--bgcolor)',
              p: 1,
              mb: 1,
              borderRadius: 1,
            }}
          >
            <Stack direction="row" spacing={1} sx={{ color: 'var(--primary)' }}>
              <FlightTakeoffIcon
                sx={{ fontSize: 18, color: 'var(--disable)' }}
              />
              <Box sx={{ fontWeight: 500, fontSize: 14 }}>
                {item?.[groupIndex]?.Origin}-{item?.[groupIndex]?.Destination}
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ color: 'var(--primary)' }}>
              <PersonIcon sx={{ fontSize: 18, color: 'var(--disable)' }} />
              <Box sx={{ fontWeight: 400, fontSize: 12 }}>
                {firstName || 'Passenger'} {lastName || passengerIndex + 1}
              </Box>
            </Stack>
            {selectedOptions?.[groupIndex]?.AirlineDescription ? (
              <Stack
                direction="row"
                spacing={2}
                sx={{ color: 'var(--secondary)', mt: 0.5 }}
              >
                <LocalDiningIcon sx={{ fontSize: 20 }} />
                <Box>
                  {selectedOptions?.[groupIndex]?.AirlineDescription || null}
                </Box>
              </Stack>
            ) : null}
          </Box>
          <Grid container spacing={{ xs: 1.5, md: 2 }}>
            {item.map((option, i) => (
              <Grid
                item
                key={i}
                sx={{ input: { visibility: 'hidden' } }}
                xs={12}
                sm={4}
                md={3}
              >
                <Box
                  sx={{
                    borderRadius: 1,
                    pb: 1,
                    px: { xs: 1 },
                    border:
                      selectedOptions[groupIndex]?.AirlineDescription ===
                      option?.AirlineDescription
                        ? '1px solid var(--dark-green)'
                        : '1px solid var(--disable)',
                    fontSize: { xs: 12, md: 14 },
                    color: 'var(--secondary)',
                    display: 'flex',
                    alignItems: 'baseline',
                    minHeight: '85px',
                  }}
                  onClick={() => handleSelect(option, groupIndex, 'meal')}
                >
                  <Box>
                    <Radio
                      checked={
                        selectedOptions[groupIndex]?.AirlineDescription ===
                        option?.AirlineDescription
                      }
                      size="small"
                      sx={{
                        color: 'var(--primary)',
                        '&.Mui-checked': {
                          color: 'var(--dark-green)',
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Box mb={0.5} fontSize={{ xs: 12, md: 12 }}>
                      {option?.AirlineDescription || 'No Meals'}{' '}
                    </Box>
                    <Box
                      sx={{
                        fontSize: 16,
                        color: 'var(--primary)',
                        fontWeight: 400,
                      }}
                    >
                      Price: {option?.Price} {companyInfo.currencyType}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default Meal;
