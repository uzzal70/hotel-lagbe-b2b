import { useCallback, useState } from 'react';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import AirplanemodeActiveOutlinedIcon from '@mui/icons-material/AirplanemodeActiveOutlined';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import { useNavigate } from 'react-router-dom';
import EventTableList from './EventTableList';

/* eslint-disable react/prop-types */

const CustomTab = ({ handleChange, data, buttons }) => {
  return (
    <div>
      <Box
        sx={{
          button: {
            textTransform: 'capitalize',
            fontWeight: 400,
            fontSize: { xs: 10, sm: 12 },
            px: { xs: 1, sm: 2 },
            py: 0.3,
            borderRadius: '5px',
            color: 'var(--white)',
            border: '1px solid #3C3C3C',
          },
          '.btn-active-event': {
            backgroundColor: 'var(--white) !important',
            color: 'var(--secondary) !important',
            borderRadius: '5px',
            px: { xs: 1, sm: 2 },
            textTransform: 'capitalize',
          },
        }}
      >
        <Grid container spacing={{ xs: 1 }}>
          {buttons.map((button) => (
            <Grid item key={button.value}>
              <Button
                className={data !== button.value ? '' : 'btn-active-event'}
                onClick={() => handleChange(button.value)}
              >
                {button.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

const EventTable = ({ data }) => {
  const navigate = useNavigate();
  const list = [
    {
      label: 'All',
      icon: (
        <AirplanemodeActiveOutlinedIcon
          sx={{
            fontSize: 18,
          }}
        />
      ),
      value: data?.allDetails?.allBookingCount || '0',
    },
    {
      label: 'Completed',
      icon: (
        <BeenhereOutlinedIcon
          sx={{
            fontSize: 18,
          }}
        />
      ),
      value: data?.completedBookingDetails?.completeCounts || '0',
    },
    {
      label: 'Upcomming',
      icon: (
        <HourglassBottomOutlinedIcon
          sx={{
            fontSize: 18,
          }}
        />
      ),
      value: data?.upcomingBookingDetails?.upcomingCounts || 0,
    },
  ];
  const [tabsData, setTabsData] = useState('All');

  const tabButton = [
    { label: 'All', value: 'All' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Upcomming', value: 'Upcomming' },
  ];

  const handleChangeTab = useCallback((newValue) => {
    setTabsData(newValue);
  }, []);
  const handleDetails = (id) => {
    navigate(`/dashboard/bookingdetails/${id}`, {
      state: {
        id: id,
      },
    });
  };
  return (
    <Box
      sx={{
        bgcolor: '#000',
        p: 2,
      }}
    >
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Typography
              sx={{
                fontSize: { xs: 18, md: 24 },
                color: 'var(--yellow)',
                mb: 0.5,
              }}
            >
              Your Activity
            </Typography>
            <Box
              sx={{
                borderRadius: 1,
                p: 1,
                color: 'var(--white)',
                fontSize: 12,
                border: '1px solid #3C3C3C',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 16 },
                  color: 'var(--white)',
                  mb: 1,
                }}
              >
                Trip Overview{' '}
              </Typography>

              {list.map((item, i) => (
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  key={i}
                  borderTop="1px solid #3C3C3C"
                  p={0.7}
                  py={1}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: '5px',
                      px: 1,
                      fontSize: 14,
                      gap: 1,
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </Box>
                  <Box>{item.value}</Box>
                </Stack>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                borderRadius: 1,
                border: '1px solid #3C3C3C',
              }}
            >
              <Box
                sx={{
                  bgcolor: '#3C3C3C',
                  overflow: 'hidden',
                  px: 1,
                  py: 0.5,
                }}
              >
                <CustomTab
                  handleChange={handleChangeTab}
                  data={tabsData}
                  buttons={tabButton}
                  bgcolor="white"
                  color="#000"
                />
              </Box>
              <Box>
                {tabsData === 'All' && (
                  <>
                    {data?.allDetails?.allBookings?.length > 0 ? (
                      <EventTableList
                        data={data?.allDetails?.allBookings}
                        handleDetails={handleDetails}
                      />
                    ) : (
                      <Box
                        sx={{
                          textAlign: 'center',
                          color: 'white',
                          py: 2,
                        }}
                      >
                        No Data Available
                      </Box>
                    )}
                  </>
                )}
                {tabsData === 'Completed' && (
                  <>
                    {data?.completedBookingDetails?.completedBookings?.length >
                    0 ? (
                      <EventTableList
                        data={data?.completedBookingDetails?.completedBookings}
                        handleDetails={handleDetails}
                      />
                    ) : (
                      <Box
                        sx={{
                          textAlign: 'center',
                          color: 'white',
                          py: 2,
                        }}
                      >
                        No Data Available
                      </Box>
                    )}
                  </>
                )}
                {tabsData === 'Upcomming' && (
                  <>
                    {data?.upcomingBookingDetails?.upcomingBookings?.length >
                    0 ? (
                      <EventTableList
                        data={data?.upcomingBookingDetails?.upcomingBookings}
                        handleDetails={handleDetails}
                      />
                    ) : (
                      <Box
                        sx={{
                          textAlign: 'center',
                          color: 'white',
                          py: 2,
                        }}
                      >
                        No Data Available
                      </Box>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EventTable;
