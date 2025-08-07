import { Box, Container } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ReissueFlightReslut from './ReissueFlightReslut';
import ReissueFilter from './ReissueFilter';
import BackButton from '../../Common/BackButton';
import HeaderTitle from '../../../common/HeaderTitle';

const ReissueFlightSearchLoad = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); //

  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        pb: { xs: 7, md: 1 },
      }}
    >
      <HeaderTitle headerTitle={`Flight Search`} />
      <Container sx={{ px: { xs: 1, sm: 2, md: '' } }}>
        <Box
          sx={{
            p: { xs: 0, md: 2 },
            borderRadius: '6px',
          }}
        >
          <Box>
            <Box
              sx={{
                mt: 2,
                p: 1,
                fontSize: { xs: 12, md: 13 },
                fontWeight: 300,
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
                borderRadius: '5px',
                bgcolor: 'var(--light-crimson)',
                color: 'var(--crimson)',
              }}
            >
              <InfoOutlined
                sx={{ color: 'var(--crimson)', fontSize: 16, mr: 1 }}
              />{' '}
              For Reissue Tickets additional charges will apply. Below shows
              only fare difference with old flight fare. Airline date change
              charge will apply with the price difference.
            </Box>{' '}
            <Box sx={{ mt: 1 }}>
              <ReissueFilter />
            </Box>
            <Box>
              {[...new Array(5)].map((d, i) => (
                <Box key={i}>
                  <ReissueFlightReslut />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ReissueFlightSearchLoad;
