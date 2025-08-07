import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { ConfirmationNumber } from '@mui/icons-material';
import TwoWheelerRoundedIcon from '@mui/icons-material/TwoWheelerRounded';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import companyInfo from '../../common/companyInfo';

const ParticipationStep = ({ icon, title, description }) => (
  <Box textAlign="center">
    <Box
      sx={{
        backgroundColor: '#e0e0e0',
        borderRadius: '50%',
        width: { xs: 60, md: 80 },
        height: { xs: 60, md: 80 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
      }}
    >
      {icon}
    </Box>
    <Typography
      sx={{
        fontSize: { xs: 14, md: 16 },
        fontWeight: 500,
        mt: 1,
      }}
    >
      {title}
    </Typography>
    <Typography
      sx={{
        fontSize: 12,
        fontWeight: 400,
        color: 'var(--secondary)',
        lineHeight: 1.2,
      }}
    >
      {description}
    </Typography>
  </Box>
);

const HowToParticipate = () => {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          textAlign="center"
          gutterBottom
          py={2}
        >
          How Participate ?
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          justifyContent="center"
          mt={2}
          position={'relative'}
        >
          <Box
            sx={{
              width: '70%',
              height: '2px',
              bgcolor: '#e0e0e0',
              position: 'absolute',
              top: { sm: '30%', md: '30%', lg: '40%' },
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
          ></Box>
          <Grid item xs={12} sm={4} zIndex={2}>
            <ParticipationStep
              icon={
                <ConfirmationNumber sx={{ fontSize: { xs: 30, md: 40 } }} />
              }
              title="Issue Ticket"
              description="Issue Ticket for participate the Program"
            />
          </Grid>
          <Grid item xs={12} sm={4} zIndex={2}>
            <ParticipationStep
              icon={<FactCheckIcon sx={{ fontSize: { xs: 30, md: 40 } }} />}
              title="Meet criteria"
              description="Make sure the ticketing amount meets all criteria to be eligible for winning the Royal Enfield."
            />
          </Grid>
          <Grid item xs={12} sm={4} zIndex={2}>
            <ParticipationStep
              icon={
                <TwoWheelerRoundedIcon sx={{ fontSize: { xs: 30, md: 40 } }} />
              }
              title="Win Prize"
              description="Grab your Royal Enfield and go for a ride."
            />
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="subtitle1">
            Eligible total ticket amount with in campaign period
          </Typography>
          <Typography variant="h5" color="success.main" fontWeight="bold">
          {companyInfo.currencyType} 4 Crore
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HowToParticipate;
