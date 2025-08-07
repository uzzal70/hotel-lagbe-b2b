import { Box, Container, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import InsuranceResultCard from './InsuranceResultCard';
import InsurancePriceDetails from './InsurancePriceDetails';

const InsurancDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleInformation = (items) => {
    navigate(`/dashboard/insuranceinformation`, {
      state: {
        data: location?.state.data,
        body: location?.state.body,
      },
    });
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        mb: { xs: 10, md: 2 },
      }}
    >
      <Box mt={{ xs: 2, md: 3 }}>
        <Grid container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={12} md={8}>
            <Box>
              <InsuranceResultCard item={location?.state.data} />
              <Box
                sx={{
                  p: {
                    fontSize: 14,
                  },
                  ul: {
                    fontSize: 13,
                  },
                  pt: 3,
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: location?.state.data?.details_content,
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <InsurancePriceDetails
              body={location?.state.body}
              data={location?.state.data}
              handleInformation={handleInformation}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default InsurancDetails;
