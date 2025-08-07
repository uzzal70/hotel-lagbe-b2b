/* eslint-disable react/prop-types */
import { Box, Container, Grid, Modal, Stack, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import Meater from './Meater';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import EventTable from './EventTable';
import LinearWithValueLabel from './LinearWithValueLabel';
import RedeemOutlinedIcon from '@mui/icons-material/RedeemOutlined';
import HowToParticipate from './ParticipationStep';
import commaNumber from 'comma-number';
import TimeCountDown from './TimeCountDown';
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 0,
  borderRadius: '6px',
  outline: 'none !important',
  overflow: 'auto',
};
function formatNumber(value) {
  if (value >= 1e7) {
    return (value / 1e7).toFixed(2) + ' Cr'; // Crore
  } else if (value >= 1e5) {
    return (value / 1e5).toFixed(2) + ' L'; // Lakh
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(2) + ' K'; // Thousand
  } else {
    return value.toString(); // Raw value
  }
}

const bgImage =
  'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/event/eventbg.webp';
const eventbgsm =
  'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/event/eventbgsm.webp';
const clickSound =
  'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/event/royal_enfield.mp3';
const Event = ({ data }) => {
  const [value, setValue] = useState(-121); // Initial value set to -122
  const [isRunning, setIsRunning] = useState(false); // Track if the engine is running
  const clickAudio = useRef(new Audio(clickSound)); // Persist audio object with useRef
  const intervalRef = useRef(null); // Reference for the interval to clear it when stopping the engine
  const [open, setOpen] = useState(false);
  const startEngine = () => {
    if (clickAudio.current.paused) {
      clickAudio.current.play(); // Play the audio only if it's not playing
    }

    setIsRunning(true); // Mark the engine as running
    setValue(-121); // Reset the value back to -122 when the engine starts

    let incrementAmount = 0.1; // Start with a very small increment for smooth acceleration

    // Clear any previous intervals if engine is restarted
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start a new interval to increment the value
    intervalRef.current = setInterval(() => {
      setValue((prevValue) => {
        if (prevValue >= 150) {
          clearInterval(intervalRef.current); // Stop the interval when value reaches 150
          clickAudio.current.pause(); // Stop the audio once the value reaches 150
          clickAudio.current.currentTime = 0; // Reset audio to the beginning
          setIsRunning(false); // Mark the engine as stopped
          return 121; // Ensure the value reaches 150
        }
        incrementAmount = Math.min(incrementAmount + 0.1, 10); // Gradually increase the speed, max increment is 10
        return prevValue + incrementAmount;
      });
    }, 200); // Shorter interval for smoother transition
  };

  const enginStop = () => {
    if (!clickAudio.current.paused) {
      clickAudio.current.pause(); // Pause the audio only if it's currently playing
      clickAudio.current.currentTime = 0; // Reset the audio position
    }
    setValue(-121); // Reset the value back to -122 when stopping
    setIsRunning(false); // Mark the engine as stopped

    // Clear the interval when the engine is stopped
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const totalAmount = 40000000;
  const bookingSum = parseInt(data?.allDetails?.allBookingSum || 0);
  const percentage = parseFloat((bookingSum / totalAmount) * 120).toFixed(1);
  const prograssPercentage = parseFloat(
    (bookingSum / totalAmount) * 100
  ).toFixed(1);

  return (
    <Box
      sx={{
        bgcolor: '#000',
        pb: { xs: 85, sm: 70, md: 20 },
      }}
    >
      <Container>
        <Box
          sx={{
            backgroundImage: { xs: `url(${eventbgsm})`, md: `url(${bgImage})` },
            backgroundSize: { xs: 'contain', md: 'contain' },
            width: '100%',
            height: '100vh', // Full viewport height
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            bgcolor: '#0b0b0b',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              right: { xs: 10, md: 100 },
              top: { xs: 10, md: 90 },
              fontSize: 12,
              color: 'var(--yellow)',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => setOpen(!open)}
          >
            How to Participate?
          </Box>
          <Box
            sx={{
              position: 'absolute',
              right: { xs: 10, md: 100 },
              top: { xs: 20, md: 100 },
              fontSize: 12,
              color: 'var(--yellow)',
            }}
          >
            {data?.eventEndDate && (
              <TimeCountDown eventEndDate={data?.eventEndDate} />
            )}
          </Box>
          <Box
            sx={{
              top: { xs: 190, sm: 250, md: 310 },
              display: { xs: 'block', md: 'block' },
              justifyContent: 'flex-start',
              alignItems: { xs: 'center', md: 'center' },
              height: '90%',
              position: 'relative',
            }}
          >
            <Grid container alignItems={'center'}>
              <Grid
                order={{ xs: 2, md: 1 }}
                item
                xs={12}
                md={3}
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-end' },
                  mt: { xs: 4, md: 0 },
                }}
              >
                <Box mr={{ xs: 0, md: -3, zIndex: 1, position: 'relative' }}>
                  <Meater
                    degree={value}
                    percentage={percentage}
                    prograssPercentage={prograssPercentage}
                    isRunning={isRunning}
                  />
                  <Box
                    sx={{
                      zIndex: 100,
                      color: 'white',
                      position: 'absolute',
                      bottom: '5px',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                    }}
                  >
                    <Box>
                      <PowerSettingsNewIcon onClick={enginStop} />
                      <PlayCircleOutlineIcon
                        onClick={isRunning ? null : startEngine}
                        sx={{
                          color: isRunning ? 'green' : 'white', // Change color when engine is running
                          cursor: isRunning ? 'not-allowed' : 'pointer', // Disable the button while the engine is running
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        border: '1px solid var(--disable)',
                        zIndex: 100,
                        fontSize: 12,
                        px: 1,
                        py: 0.2,
                        bgcolor: '#222222',
                      }}
                    >
                      {commaNumber(bookingSum || 0)}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={9} order={{ xs: 1, md: 2 }}>
                <Box position={'relative'}>
                  <Typography
                    sx={{
                      color: 'var(--white)',

                      display: { xs: 'none', md: 'block' },
                      textAlign: 'end',
                      pb: 2,
                    }}
                  >
                    Royal Enfield Giveaway | Progress
                  </Typography>
                  <Box
                    sx={{
                      border: '1px solid var(--white)',
                      borderLeft: 'none',
                      py: { xs: 2, sm: 2, md: 5 },
                      color: 'white',
                    }}
                  >
                    <Stack
                      direction={'row'}
                      justifyContent={'center'}
                      alignItems={'center'}
                    >
                      <Box
                        sx={{
                          border: '1px solid var(--white)',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--white)',
                          transition: 'background-color 0.2s ease-in-out',
                          color: 'var(--secondary)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          p: 0.4,
                        }}
                      >
                        <Box
                          sx={{
                            border: '1px solid var(--secondary)',
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 0.5,
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          {prograssPercentage || 0}%
                        </Box>
                      </Box>
                      <Box width={'70%'}>
                        <LinearWithValueLabel
                          targetValue={prograssPercentage}
                          bookingSum={formatNumber(bookingSum)}
                        />
                      </Box>

                      <Box
                        sx={{
                          border: '1px solid var(--white)',
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--white)',
                          transition: 'background-color 0.2s ease-in-out',
                          color: 'var(--secondary)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: 14,
                          p: 0.1,
                          position: 'relative',
                        }}
                      >
                        <Box
                          sx={{
                            border: '1px solid var(--secondary)',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 0.1,
                          }}
                        >
                          <RedeemOutlinedIcon
                            sx={{
                              fontSize: 18,
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            position: 'absolute',
                            top: { xs: '-15px', md: '-25px' },
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            width: '100px',
                            color: 'var(--white)',
                            mx: 'auto',
                            fontSize: { xs: 12, md: 14 },
                            span: {
                              color: 'var(--yellow)',
                              fontSize: 12,
                            },
                          }}
                        >
                          {formatNumber(bookingSum)} / <span>4 Cr</span>
                        </Box>
                      </Box>
                    </Stack>
                    <Box
                      sx={{
                        textAlign: 'center',
                        fontSize: { xs: 10, md: 12 },
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        mt: { xs: -1.5, md: 0 },
                      }}
                    >
                      Valid from{' '}
                      {data?.eventStartDate &&
                        `${moment(
                          data?.eventStartDate?.split('T')[0],
                          'YYYY-MM-DD'
                        ).format('DD MMM YYYY')}
                      -
                      ${moment(
                        data?.eventEndDate?.split('T')[0],
                        'YYYY-MM-DD'
                      ).format('DD MMM YYYY')}`}
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      color: 'var(--white)',
                      fontSize: '10px',
                      pt: { xs: 1, md: 3 },
                      textAlign: 'center',
                    }}
                  >
                    Important: Progress bar will be updated once the booking has
                    been consumed
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                zIndex: 1,
                position: 'relative',
                top: { sm: 5, md: 50 },
                display: 'block',
              }}
            >
              <EventTable data={data} />
            </Box>
          </Box>
        </Box>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              ...style,
              width: { xs: '90%', sm: '60%', md: '35%' },
            }}
          >
            <HowToParticipate />
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default Event;
