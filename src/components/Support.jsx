import {
  Box,
  Container,
  Grid,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useGetItemsQuery } from '../redux/slices/apiSlice';
import Token from './Common/Token';
import ImageImport from '../assets/ImageImport';
import companyInfo from '../common/companyInfo';
import { useState } from 'react';
import { FlightContent } from '../components/Message/FlightMessageContent';
import { HotelContent } from '../components/Message/HotelMessageContent';
import HeaderTitle from '../common/HeaderTitle';

const Support = () => {
  const agentId = Token();
  const [activeLabel, setActiveLabel] = useState('Flight'); // Default is "Flight"
  const supporturl = `/agent/getSupportTableByAgentId/${agentId}?site=${companyInfo.platform}`;
  const { data, isLoading, refetch } = useGetItemsQuery({ url: supporturl });
  const contactInfo = [
    {
      name: 'Support & Reservation',
      phone: data?.supportTable?.reservationPhone || 'Phone',
      email: data?.supportTable?.reservationEmail || 'Email',
    },
    {
      name: 'Accounts & Finance',
      phone: data?.supportTable?.accountsFinancePhone || 'Phone',
      email: data?.supportTable?.accountsFinanceEmail || 'Email',
    },
    {
      name: `KAM (${data?.kam?.firstName})`,
      phone: data?.kam?.phone || 'Phone',
      email: data?.kam?.email || 'Email',
    },
  ];
  const handleChange = (label) => {
    setActiveLabel(label);
  };
  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        pb: { xs: 10, md: 1 },
      }}
    >
      <HeaderTitle
        headerTitle={`Support`}
        // loading={isLoading}
        // setRefetch={refetch}
        // setLoading={isLoading}
        showCustomButtons={false}
      />

      <Container sx={{ p: { xs: 2, md: 3 } }}>
        <Grid container spacing={{ xs: 2, lg: 2 }}>
          {contactInfo.map((data, i, arr) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box
                sx={{
                  border: '1px solid var(--stroke)',
                  p: 2,
                  borderRadius: 1,
                }}
              >
                <Tooltip title={data.name}>
                  <Typography
                    sx={{ color: 'var(--secondary)', fontSize: 13 }}
                    noWrap
                  >
                    {data.name}
                  </Typography>
                </Tooltip>
                <Box>
                  {isLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      sx={{
                        mt: 1,
                        width: 100,
                        height: 14,
                        bgcolor: 'var(--skeleton)',
                      }}
                    />
                  ) : (
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      pt={2}
                    >
                      <img src={ImageImport.phone} alt="" />
                      <Tooltip title={data.phone}>
                        <Typography
                          sx={{
                            color: 'var(--primary)',
                            fontSize: { xs: 13, lg: 15 },
                            fontWeight: 400,
                          }}
                          noWrap
                        >
                          {isLoading ? (
                            <Skeleton
                              animation="wave"
                              variant="rounded"
                              sx={{
                                width: 100,
                                height: 10,
                                bgcolor: 'var(--skeleton)',
                              }}
                            />
                          ) : (
                            `${data.phone}`
                          )}
                        </Typography>
                      </Tooltip>
                    </Stack>
                  )}

                  {isLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      sx={{
                        mt: 0.5,
                        width: 100,
                        height: 14,
                        bgcolor: 'var(--skeleton)',
                      }}
                    />
                  ) : (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <img src={ImageImport.gmail} alt="" />
                      <Tooltip title={data.email}>
                        <Typography
                          sx={{
                            color: 'var(--primary)',
                            fontSize: { xs: 14, lg: 16 },
                            fontWeight: 400,
                          }}
                          noWrap
                        >
                          {data.email}
                        </Typography>
                      </Tooltip>
                    </Stack>
                  )}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            pt: 2,
          }}
        >
          <Stack
            direction={'row'}
            spacing={2}
            px={2}
            alignItems={'center'}
            sx={{
              fontSize: 12,
              border: '1px solid var(--stroke )',
              mx: 1,
              mb: 1,
              py: 1,
            }}
          >
            <Typography>Message</Typography>
            <Box
              onClick={() => handleChange('Flight')}
              sx={{
                color:
                  activeLabel === 'Flight' ? 'var(--white)' : 'var(--primary)',
                cursor: 'pointer',
                bgcolor:
                  activeLabel === 'Flight'
                    ? 'var(--primary)'
                    : 'var(--disable)',
                px: 1.5,
              }}
            >
              Flight
            </Box>
            &nbsp;&nbsp;&nbsp;&nbsp;/
            <Box
              sx={{
                color:
                  activeLabel === 'Hotel' ? 'var(--white)' : 'var(--primary)',
                cursor: 'pointer',
                bgcolor:
                  activeLabel === 'Hotel' ? 'var(--primary)' : 'var(--disable)',
                px: 1.5,
              }}
              onClick={() => handleChange('Hotel')}
            >
              Hotel
            </Box>
          </Stack>
          <Box>
            {activeLabel === 'Flight' ? (
              <FlightContent width="100%" />
            ) : (
              <HotelContent width="100%" />
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Support;
