import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';

const TimeCountDown = ({ eventEndDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCampaign, setIsCampaign] = useState(false);

  useEffect(() => {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    const targetDate = eventEndDate; // Format: MM/DD/YYYY
    let giftday = new Date(targetDate);

    const countDownTime = giftday.getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownTime - now;

      if (distance < 0) {
        clearInterval(interval);
        setIsCampaign(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / day),
          hours: Math.floor((distance % day) / hour),
          minutes: Math.floor((distance % hour) / minute),
          seconds: Math.floor((distance % minute) / second),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box mt={3}>
      {isCampaign ? (
        <h1 className="gift-message"> Campaign Over! 🎉 </h1>
      ) : (
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={3} textAlign={'center'}>
              <Box
                sx={{
                  border: '1px solid gray',
                  p: 1,
                  borderRadius: 1,
                  bgcolor: '#3c3c3c9d',
                }}
              >
                <Box>{timeLeft.days}</Box>
                <Box fontSize={10}>Days</Box>
              </Box>
            </Grid>
            <Grid item xs={3} textAlign={'center'}>
              <Box
                sx={{
                  border: '1px solid gray',
                  p: 1,
                  borderRadius: 1,
                  bgcolor: '#3c3c3c9d',
                }}
              >
                <Box>{timeLeft.hours}</Box>
                <Box fontSize={10}>Hours</Box>
              </Box>
            </Grid>
            <Grid item xs={3} textAlign={'center'}>
              <Box
                sx={{
                  border: '1px solid gray',
                  pl: 0.5,
                  pr: 1,
                  py: 1,
                  borderRadius: 1,
                  bgcolor: '#3c3c3c9d',
                }}
              >
                <Box>{timeLeft.minutes}</Box>
                <Box fontSize={10}>Minutes </Box>
              </Box>
            </Grid>
            <Grid item xs={3} textAlign={'center'}>
              <Box
                sx={{
                  border: '1px solid gray',
                  pl: 0.5,
                  pr: 1,
                  py: 1,
                  borderRadius: 1,
                  bgcolor: '#3c3c3c9d',
                }}
              >
                <Box>{timeLeft.seconds}</Box>
                <Box fontSize={10}>Seconds</Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default TimeCountDown;
