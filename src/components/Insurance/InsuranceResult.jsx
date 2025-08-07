import { useEffect, useState } from 'react';
import { baseUrl } from '../../../baseurl';
import getAuthToken from '../Common/getAuthToken';
import { Box, Button, Container, Stack } from '@mui/material';
import InsuranceForm from './InsuranceForm';
import InsuranceResultCard from './InsuranceResultCard';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../redux/slices/modalOpen';
import InsuranceCardSkeleton from './InsuranceCardSkeleton';
import { Link, useNavigate } from 'react-router-dom';

const InsuranceResult = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);
  const token = getAuthToken();

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modalValue.modifyModal);
  const handleToggle = () => {
    dispatch(toggleModal({ modalName: 'modifyModal' }));
  };
  // console.log(modal);
  // Parse the query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const encodedQuery = queryParams.get('query');
  const decodedQuery = encodedQuery
    ? JSON.parse(decodeURIComponent(encodedQuery))
    : null;

  // console.log('decodedQuery', decodedQuery);

  // Destructure decodedQuery safely
  const { travel_purpose, countries, date_of_birth, date_of_travel, days } =
    decodedQuery || {};
  // console.log(date_of_birth, date_of_travel);
  // Create the body object
  const body = {
    travel_purpose: travel_purpose,
    countries: countries,
    date_of_birth: date_of_birth,
    date_of_travel: date_of_travel,
    days: days,
  };

  // console.log('body,', body);

  const url = `${baseUrl}/core/insurance/getQuotes`;

  const fetchData = async () => {
    try {
      setIsLoaded(false);
      setError(null);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body), // Encode the body as JSON
      });

      if (!response.ok) {
        if (response.status === 504) {
          throw new Error(
            '504 Gateway Timeout: Server took too long to respond.'
          );
        } else {
          throw new Error('Network response was not ok');
        }
      }

      const responseData = await response.json();
      setData(responseData || []);
      setIsLoaded(true);
    } catch (error) {
      setError(error.message);
      setIsLoaded(true);
    }
  };

  // Fetch data whenever any value in the body object changes
  useEffect(() => {
    fetchData();
  }, [travel_purpose, countries, date_of_birth, date_of_travel, days]);

  const handleDetails = (items) => {
    navigate(`/dashboard/insurancedetails`, {
      state: {
        data: items,
        body: body,
      },
    });
  };

  return (
    <div>
      <Container
        sx={{
          minHeight: '100vh',
        }}
      >
        <Box mt={2}>
          <Stack
            direction={'row'}
            sx={{
              display: { xs: 'flex', md: 'none' },
              bgcolor: 'var(--bgcolor)',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1,
              borderRadius: 1,
              color: 'var(--primary)',
            }}
          >
            <Box>Insurance</Box>
            <Button
              size="small"
              sx={{
                color: 'var(--white)',
                bgcolor: 'var(--primary)',
                '&:hover': {
                  bgcolor: 'var(--primary)',
                },
              }}
              onClick={() => handleToggle(!modal)}
            >
              Modify
            </Button>
          </Stack>
          <Box
            sx={{
              display: { xs: modal ? 'block' : 'none', md: 'block' },
              height: { xs: modal ? 'auto' : 0, md: 'auto' },
              transition: 'height 1s ease',
              mt: { xs: modal ? 1.5 : 0, md: 0 },
            }}
          >
            <InsuranceForm
              p={{ xs: 1, sm: 2, md: 2, lg: 2 }}
              pb={2}
              pt={0.1}
              minHeight={0.1}
              travel_purpose={travel_purpose}
              countries={countries}
              date_of_birth={date_of_birth}
              date_of_travel={date_of_travel}
              days={days}
            />
          </Box>
        </Box>
        {!isLoaded ? (
          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <InsuranceCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <Box
            sx={{
              textAlign: 'center',
              p: 2,
              mt: 4,
              color: 'var(--white)',
              fontSize: { xs: 18, md: 20 },
              bgcolor: 'var(--disable)',
              borderRadius: 1,
            }}
          >
            Error: {error || ''}
            <Box mt={1}>
              <Button
                size="small"
                sx={{
                  color: 'var(--primary)',
                  bgcolor: 'var(--white)',
                  '&:hover': {
                    bgcolor: 'var(--white)',
                  },
                  textTransform: 'capitalize',
                }}
                component={Link}
                to="/dashboard"
              >
                Search Again
              </Button>
            </Box>
          </Box>
        ) : (
          <div>
            {data.length > 0 ? (
              <Box mt={2}>
                {data.map((quote, index) => (
                  <Box key={index} mb={2}>
                    <InsuranceResultCard
                      item={quote}
                      handleDetails={handleDetails}
                    />
                  </Box>
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  textAlign: 'center',
                  p: 2,
                  mt: 4,
                  color: 'var(--white)',
                  fontSize: { xs: 18, md: 20 },
                  bgcolor: 'var(--primary)',
                  borderRadius: 1,
                }}
              >
                No insurance quotes available !
                <Box mt={1}>
                  <Button
                    size="small"
                    sx={{
                      color: 'var(--primary)',
                      bgcolor: 'var(--white)',
                      '&:hover': {
                        bgcolor: 'var(--white)',
                      },
                      textTransform: 'capitalize',
                    }}
                    component={Link}
                    to="/dashboard"
                  >
                    Search Again
                  </Button>
                </Box>
              </Box>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default InsuranceResult;
