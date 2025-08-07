/* eslint-disable react/prop-types */
import { Box, Grid, Radio, Stack } from '@mui/material';
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import NoLuggageOutlinedIcon from '@mui/icons-material/NoLuggageOutlined';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import PersonIcon from '@mui/icons-material/Person';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import companyInfo from '../../../common/companyInfo';

const Baggage = ({
  bagData,
  selectedOptions,
  handleSelect,
  passengerIndex,
  firstName,
  lastName,
}) => {
  return (
    <Box>
      <Box sx={{ fontSize: 16, mb: 1, color: 'var(--primary)' }}>
        Add Extra Baggage
      </Box>
      {bagData?.map((item, groupIndex) => (
        <Box
          key={groupIndex}
          sx={{
            p: { xs: 1, md: 2 },
            border: '1px solid var(--stroke)',
            mb: 1,
            borderRadius: 1,
          }}
        >
          <Grid container spacing={{ xs: 0, md: 2 }}>
            <Grid item xs={12} sm={12} md={3}>
              <Box
                sx={{
                  borderRadius: 1,
                  p: 1,
                  color: 'var(--secondary)',
                  fontSize: 12,
                  bgcolor: 'var(--bgcolor)',
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ color: 'var(--primary)' }}
                >
                  <FlightTakeoffIcon
                    sx={{ fontSize: 18, color: 'var(--disable)' }}
                  />
                  <Box sx={{ fontWeight: 500, fontSize: 14 }}>
                    {item?.[groupIndex]?.Origin}-
                    {item?.[groupIndex]?.Destination}
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ color: 'var(--primary)' }}
                >
                  <PersonIcon sx={{ fontSize: 18, color: 'var(--disable)' }} />
                  <Box sx={{ fontWeight: 400, fontSize: 12 }}>
                    {firstName || 'Passenger'} {lastName || passengerIndex + 1}
                  </Box>
                </Stack>
                <Box p={1.5}>
                  <Box
                    sx={{
                      borderRadius: 1,
                      p: 1,
                      bgcolor: 'var(--dark-bgcolor)',
                    }}
                  >
                    <Box
                      sx={{
                        pb: 1,
                      }}
                    >
                      Baggage allowance
                    </Box>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ color: 'var(--secondary)' }}
                    >
                      <BusinessCenterRoundedIcon sx={{ fontSize: 20 }} />
                      <Box>7 kg cabin baggage 1 piece</Box>
                    </Stack>

                    {selectedOptions?.[groupIndex]?.Weight ? (
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ color: 'var(--secondary)', mt: 0.5 }}
                      >
                        <LuggageOutlinedIcon sx={{ fontSize: 20 }} />
                        <Box>
                          {selectedOptions?.[groupIndex]?.Weight || null} Kg
                          cabin baggage
                        </Box>
                      </Stack>
                    ) : null}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={9} p={{ xs: 1, md: 0 }}>
              <Grid container spacing={{ xs: 1.5, md: 1.5 }}>
                {item.map((option, i) => (
                  <Grid
                    item
                    xs={4}
                    sm={4}
                    md={2.4}
                    key={i}
                    sx={{ input: { visibility: 'hidden' } }}
                  >
                    <Box
                      sx={{
                        borderRadius: 1,
                        pt: 1.5,
                        border:
                          selectedOptions[groupIndex]?.Price === option?.Price
                            ? '1px solid var(--dark-green)'
                            : '1px solid var(--disable)',
                        fontSize: { xs: 12, md: 14 },
                        color: 'var(--secondary)',
                        textAlign: 'center',
                      }}
                      onClick={() =>
                        handleSelect(option, groupIndex, 'baggage')
                      }
                    >
                      {option.Weight !== 0 ? (
                        <LuggageOutlinedIcon
                          sx={{
                            fontSize: 25,
                            color:
                              selectedOptions[groupIndex]?.Price ===
                              option?.Price
                                ? 'var(--dark-green)'
                                : 'var(--disable)',
                          }}
                        />
                      ) : (
                        <NoLuggageOutlinedIcon
                          sx={{
                            fontSize: 25,
                            color:
                              selectedOptions[groupIndex]?.Price ===
                              option?.Price
                                ? 'var(--red)'
                                : 'var(--disable)',
                          }}
                        />
                      )}

                      <Box mb={0.5}>{option?.Weight ? 1 : 0} piece only</Box>
                      <Box mb={0.5}>{option?.Weight} kg in total </Box>
                      <Box
                        sx={{
                          fontSize: 16,
                          color: 'var(--primary)',
                          fontWeight: 500,
                        }}
                      >
                        {option?.Price} {companyInfo.currencyType}
                      </Box>
                      <Box>
                        <Radio
                          checked={
                            selectedOptions[groupIndex]?.Price === option?.Price
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
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default Baggage;
