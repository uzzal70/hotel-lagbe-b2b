/* eslint-disable react/prop-types */
import { Box, Button, Stack } from '@mui/material';
import { BaggageParse, MealParse } from './BaggageParse';

const BaggageComponent = ({ item, viewImage, segmentedData }) => {
  const baggageAllowances = BaggageParse(item.baggageRule); // Get all baggage allowances
  const extraBaggage = BaggageParse(item.extraBaggage); // Get all baggage allowances
  const extraMeal = MealParse(item.extraMeal); // Get all baggage allowances
  return (
    <div>
      {baggageAllowances.map((baggage, index) => (
        <Box
          key={index}
          sx={{
            mt: 0.6,
            boxShadow:
              'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              bgcolor: 'var(--bgcolor)',
              p: 0.2,
              textAlign: 'center',
              fontSize: 13,
              color: 'var(--primary)',
            }}
          >
            Route:{' '}
            {segmentedData[index] &&
              segmentedData[index][0]?.departureAirportCode}
            {' - '}
            {index >= 0 &&
            index < segmentedData.length &&
            segmentedData[index]?.length > 0
              ? segmentedData[index][segmentedData[index].length - 1]
                  ?.arrivalAirportCode
              : 'Same'}
          </Box>

          <Stack
            key={index}
            direction="row"
            justifyContent="space-between"
            sx={{
              p: 1,
            }}
          >
            <Box
              sx={{
                fontSize: 12,
                fontWeight: 400,
                color: 'var(--secondary)',
              }}
            >
              {/* <Box sx={{ fontWeight: 500 }}>Pax Type </Box> */}
              {item?.ticketNo && <Box>Ticket No</Box>}
              <Box>Baggage</Box>
              {extraBaggage?.length > 0 && <Box>Extra Baggage</Box>}
              {extraMeal?.length > 0 && <Box>Extra Meal Code </Box>}
              <Box>Cabin Baggage</Box>
              <Stack direction={'row'} spacing={5}>
                {item?.vip && <Box>SSR: {item?.vip || 'N/A'}</Box>}
                {item?.wheelChair && (
                  <Box>Wheel Chair: {item?.wheelChair || 'N/A'}</Box>
                )}
              </Stack>
              <Stack direction={'row'} spacing={5}>
                {item?.passport && (
                  <Button
                    size="small"
                    sx={{
                      color: 'var(--dark-sky)',
                      fontSize: { xs: 11, sm: 12 },
                      fontWeight: 500,
                      textTransform: 'capitalize',
                      border: '1px solid',
                      py: 0.2,
                    }}
                    onClick={() => viewImage('getPassport', item.id)}
                  >
                    View Passport
                  </Button>
                )}
                {item?.visa && (
                  <Button
                    size="small"
                    sx={{
                      color: 'var(--dark-sky)',
                      fontSize: { xs: 11, sm: 12 },
                      fontWeight: 500,
                      textTransform: 'capitalize',
                      border: '1px solid',
                      py: 0.2,
                    }}
                    onClick={() => viewImage('getVisa', item.id)}
                  >
                    View Visa
                  </Button>
                )}
              </Stack>
            </Box>

            <Box
              sx={{
                fontSize: 12,
                fontWeight: 400,
                textAlign: 'end',
                color: 'var(--secondary)',
              }}
            >
              {/* <Box sx={{ fontWeight: 500 }}>
                {paxDefined(item?.passengerType[0])}
              </Box> */}
              {item?.ticketNo && <Box>{item?.ticketNo}</Box>}
              <Box>
                {baggage?.Value} {baggage?.Unit}
              </Box>
              {extraBaggage?.length > 0 && (
                <Box>
                  {extraBaggage?.[index]?.Value} {extraBaggage?.[index]?.Unit}
                </Box>
              )}
              {extraMeal?.length > 0 && (
                <Box textTransform={'uppercase'}>
                  {extraMeal?.[index]?.Meal || 'N/A'}
                </Box>
              )}
              <Box>7 kg</Box>
            </Box>
          </Stack>
        </Box>
      ))}
    </div>
  );
};

export default BaggageComponent;
