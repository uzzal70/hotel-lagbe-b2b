/* eslint-disable react/prop-types */
import { Box, Grid, Typography } from '@mui/material';
import Balance from './Balance';
import Token from './Token';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import PartialBalance from './PartialBalance';
import bannar from '../../assets/mobilebanner.webp';
import Rewards from './Rewards';
import CreditRequest from './CreditRequest';

const MobileHeader = ({ support, loading }) => {
  const agentId = Token();
  const url = `/agent/findAgentById/${agentId}`;
  const { data, isLoading } = useGetItemsQuery({ url });

  const bannerUrl = `/agent-dynamics/allAgentDynamics`;
  const { data: bannarData } = useGetItemsQuery({
    url: bannerUrl,
  });

  return (
    <Box
      sx={{
        py: 1,
        px: 0.5,
        backgroundImage: `url(${bannarData?.mobileBanner || bannar})`,
        backgroundSize: 'cover',
        height: '250px',
        borderBottomRightRadius: '20px',
        borderBottomLeftRadius: '20px',
      }}
    >
      <Grid container spacing={0.5} alignItems={'center'}>
        <Grid item xs={6}>
          <Box sx={{ display: { md: 'flex', lg: 'none' } }}>
            <Rewards
              data={data}
              width={{ xs: '80px', md: '90px' }}
              size1={9}
              size2={12}
              isLoading={isLoading}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <PartialBalance
              name="Partial Due"
              bgcolors="var(--light-bgcolor)"
              colorp="var(--white)"
              size1={9}
              size2={12}
              // display={{ xs: 'none', sm: 'block' }}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <CreditRequest
              name="Credit"
              bgcolors="var(--light-bgcolor)"
              colorp="var(--white)"
              size1={9}
              size2={12}
              p={{ xs: 0.3, sm: 0.6 }}
              // display={{ xs: 'none', sm: 'block' }}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box mt={0.3}>
            <Balance
              name="Balance"
              bgcolors="var(--light-bgcolor)"
              colorp="var(--white)"
              size1={9}
              size2={12}
              // display={{ xs: 'none', sm: 'block' }}
            />
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          bgcolor: 'var(--light-bgcolor)',
          my: 2,
          borderRadius: '5px',
          width: '100%',
        }}
      >
        <marquee style={{ paddingTop: '5px' }} direction="left">
          <Typography
            sx={{
              fontSize: 12,
              color: 'var(--primary)',
            }}
          >
            {!loading ? support?.supportTable?.marqueeTag : ''}
          </Typography>
        </marquee>
      </Box>
    </Box>
  );
};

export default MobileHeader;
