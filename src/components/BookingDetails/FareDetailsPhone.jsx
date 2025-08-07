/* eslint-disable react/prop-types */
import { Grid, Box, Stack } from '@mui/material';
import commaNumber from 'comma-number';

const FareDetailsPhone = ({ data, allData, agent }) => {
  return (
    <Box>
      <Grid container spacing={0.5}>
        {data?.map((item, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                mt: 1,
                boxShadow:
                  'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                p: 2,
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: 'var(--secondary)',
                }}
              >
                <Box sx={{ fontWeight: 500 }}>Pax Type </Box>
                <Box>Base Fare </Box>
                <Box>Tax </Box>
                <Box>Service Fee </Box>
                <Box>Discount </Box>
                <Box>Pax Count</Box>
                <Box>Amount</Box>
              </Box>
              <Box
                sx={{
                  fontSize: 12,
                  fontWeight: 400,
                  textAlign: 'end',
                  color: 'var(--secondary)',
                }}
              >
                <Box sx={{ fontWeight: 500 }}>
                  {item?.passengerType === 'ADT'
                    ? 'Adult'
                    : item?.passengerType === 'INF'
                    ? 'Infant'
                    : 'Child'}
                </Box>
                <Box>{commaNumber(item?.basePrice || 0)}</Box>
                <Box>{commaNumber(item?.tax || 0)}</Box>
                <Box>{commaNumber(item?.otherCharges || 0)}</Box>
                <Box>{commaNumber(item?.discount || 0)}</Box>
                <Box>
                  {item?.passengerType === 'ADT'
                    ? allData?.adultCount
                    : item?.passengerType === 'INF'
                    ? allData?.infantCount
                    : allData?.childCount}
                </Box>
                <Box>
                  {agent ? (
                    <>
                      {item?.passengerType === 'ADT'
                        ? commaNumber(
                            allData?.adultCount *
                              parseInt(item?.totalPrice || 0) -
                              allData?.adultCount *
                                parseInt(item?.discount || 0)
                          )
                        : item?.passengerType === 'INF'
                        ? commaNumber(
                            allData?.infantCount * parseInt(item?.totalPrice) -
                              allData?.infantCount *
                                parseInt(item?.discount || 0)
                          )
                        : commaNumber(
                            allData?.childCount * parseInt(item?.totalPrice) -
                              allData?.childCount *
                                parseInt(item?.discount || 0)
                          )}
                    </>
                  ) : (
                    <>
                      {item?.passengerType === 'ADT'
                        ? commaNumber(
                            allData?.adultCount *
                              parseInt(item?.totalPrice || 0)
                          )
                        : item?.passengerType === 'INF'
                        ? commaNumber(
                            allData?.infantCount * parseInt(item?.totalPrice)
                          )
                        : commaNumber(
                            allData?.childCount * parseInt(item?.totalPrice)
                          )}
                    </>
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

export default FareDetailsPhone;
