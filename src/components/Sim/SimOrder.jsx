import {
  Box,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import GBPackage from './content/GBPackage';
import ImportantNote from './content/ImportantNote';
import TravellerDetails from './content/TravellerDetails';
import InstallationGuide from './content/InstallationGuide';
import PriceSummaryCard from './content/PriceSummaryCard';
import { useLocation } from 'react-router-dom';
import BackButton from '../Common/BackButton';
import companyInfo from '../../common/companyInfo';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import Token from '../Common/Token';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../../baseurl';
import TokenToName from '../Common/TokenToName';
import axios from 'axios';
import HeaderTitle from '../../common/HeaderTitle';

const SimOrder = () => {
  const { state } = useLocation();
  const item = state || state?.item;
  const tokenise = TokenToName();
  const agentId = Token();
  const urlProfile = `/agent/findAgentByUserId/${agentId}`;

  const [checkImage, setCheckImage] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/core/agent/getCompanyLogoFilebyId/${tokenise?.userId}`
        );
        setCheckImage(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [tokenise?.userId]);

  const { data, isLoading } = useGetItemsQuery({
    url: urlProfile,
  });
  const updatedQrInstallation = item?.qrCodeInstallation
    .replace(
      /airalo\.com\/my-esims/g,
      `<a href="/dashboard?query=Sim" target="_blank">
      ${companyInfo.domainName}E-Sim
    </a>`
    )
    .replace(/my-esims/g, 'E-Sim')
    .replace(/My eSIMs/g, 'E-Sim')
    .replace(/Airalo/g, 'Ticketlagbe');
  const updatedManualInstallation = item?.manualInstallation
    .replace(
      /airalo\.com\/my-esims/g,
      `<a href="/dashboard?query=Sim" target="_blank">
      ${companyInfo.domainName}E-Sim
    </a>`
    )
    .replace(/my-esims/g, 'E-Sim')
    .replace(/My eSIMs/g, 'E-Sim')
    .replace(/Airalo/g, 'Ticketlagbe');
  return (
    <Box pb={{ xs: 14, md: 2 }}>
      <HeaderTitle headerTitle={'Order Details'} />

      <Container sx={{ px: { xs: 1, sm: 2, md: '' } }}>
        <Box>
          <Grid container spacing={{ xs: 1, md: 2 }}>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: { xs: 1, md: 3 } }}>
                {isLoading ? (
                  <Box mb={1.5}>
                    <Skeleton
                      variant="rectangular"
                      height={40}
                      animation="wave"
                      sx={{ borderRadius: 2 }}
                    />
                  </Box>
                ) : (
                  <Stack
                    direction="row"
                    spacing={1}
                    mb={1.5}
                    bgcolor="white"
                    padding={1}
                    justifyContent="space-between"
                    alignItems="center"
                    borderRadius={2}
                  >
                    <Typography
                      sx={{
                        color: 'var(--black-hover)',
                        fontSize: { xs: 10, md: 14 },
                      }}
                    >
                      Sale Ref : {item?.eSimOrderRef}
                    </Typography>

                    {/* <Typography
                      sx={{
                        color: 'var(--black-hover)',
                        fontSize: { xs: 10, md: 14 },
                      }}
                    >
                      Package Ref : {item?.dataSimRef}
                    </Typography> */}

                    <Typography
                      sx={{
                        color: 'white',
                        px: 1,
                        fontSize: { xs: 10, md: 12 },
                        backgroundColor: 'var(--dark-green)',
                        borderRadius: 1,
                        textTransform: 'capitalize',
                      }}
                    >
                      {item?.packageType}
                    </Typography>
                  </Stack>
                )}
                {isLoading ? (
                  <Box mb={1.5}>
                    <Skeleton
                      variant="rectangular"
                      height={180}
                      animation="wave"
                      sx={{ borderRadius: 2 }}
                    />
                  </Box>
                ) : (
                  <GBPackage item={item} />
                )}

                <ImportantNote />

                {/* Traveller Details */}
                {isLoading ? (
                  <Box my={1.5}>
                    <Skeleton
                      variant="rectangular"
                      height={140}
                      animation="wave"
                      sx={{ borderRadius: 2 }}
                    />
                  </Box>
                ) : (
                  <TravellerDetails item={item} data={data} />
                )}

                <InstallationGuide
                  data={updatedQrInstallation}
                  data1={updatedManualInstallation}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  height={240}
                  animation="wave"
                  sx={{ borderRadius: 2 }}
                />
              ) : (
                <PriceSummaryCard
                  item={item}
                  no
                  netPriceInBDT={item?.netPriceInBDT}
                  quantity={item?.quantity}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default SimOrder;
