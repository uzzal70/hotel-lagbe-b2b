import { Box, Button, Container, Grid, Stack } from '@mui/material';
import Banner from '../Dashboard/Banner';
// import RecentSearch from '../Dashboard/RecentSearch';
import OfferCard from '../Dashboard/OfferCard';
import MainSearchBox from '../Dashboard/FlightSearchBox/MainSearchBox';
import MobileHeader from '../Common/MobileHeader';
import { useEffect, useState } from 'react';
import webpImport from '../../assets/webpImport';
import PNRImportSearchBox from '../Dashboard/PNRImport/PNRImportSearchBox';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import Token from '../Common/Token';
import { ToastContainer, toast } from 'react-toastify';
import HandshakeIcon from '@mui/icons-material/Handshake';
// import NotificationModal from '../Common/NotificationModal';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import KingBedOutlinedIcon from '@mui/icons-material/KingBedOutlined';
import InsuranceForm from '../Insurance/InsuranceForm';
import SimSearchBox from '../Sim/SimSearchBox';
import SimCardOutlinedIcon from '@mui/icons-material/SimCardOutlined';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import HotelSearchBox from '../Hotel/HotelSearchBox/HotelSearchBox';
import companyInfo from '../../common/companyInfo';
import NotificationModal from '../Common/NotificationModal';
const Dashboard = () => {
  const agentId = Token();
  const supporturl = `/agent/getSupportTableByAgentId/${agentId}?site=${companyInfo.platform}`;
  const { data, isLoading } = useGetItemsQuery({
    url: supporturl,
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || 'Hotel';

  const [alignment, setAlignment] = useState(initialQuery);
  useEffect(() => {
    if (alignment) {
      navigate(`?query=${encodeURIComponent(alignment)}`, { replace: true });
    } else {
      navigate('?', { replace: true }); // Clears query if input is empty
    }
  }, [alignment, navigate]);

  const handleChange = (newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleImport = () => {
    toast.info(
      <Box sx={{ fontSize: 13, color: 'var(--info)' }}>Under Development</Box>
    );
    // navigate('/dashboard/pnrimportdetails', {
    //   state: {
    //     title: 'PNR Import for ',
    //   },
    // });
  };

  const options = [
    // {
    //   label: `PNR Import`,
    //   value: 'PNR Import',
    //   icon: <img src={webpImport.pnrimport} height="16px" alt="PNR Icon" />,
    // },
    // {
    //   label: 'Group Fare',
    //   value: 'Group Fare',
    //   icon: <GroupsIcon />,
    //   link: '/groupfare',
    // },
    {
      label: 'Hotel',
      value: 'Hotel',
      icon: <KingBedOutlinedIcon />,
      condition: true,
    },
    {
      label: 'Flights',
      value: 'Flight',
      icon: <img src={webpImport.flights} height="18px" alt="Flights Icon" />,
    },
    {
      label: 'e-Sim',
      value: 'Sim',
      icon: <SimCardOutlinedIcon />,
      condition: false,
    },
    // {
    //   label: 'Insurance',
    //   value: 'Insurance',
    //   icon: <HandshakeIcon />,
    // },
  ];

  return (
    <div>
      <Box
        sx={{
          minWidth: { md: '600px' },
          minHeight: { xs: '105vh', sm: '100vh', md: '90vh' },
        }}
      >
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Banner support={data} loading={isLoading} />
        </Box>
        {/*  Responsive for mobile devices  */}
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            pb: 2,
          }}
        >
          <MobileHeader support={data} loading={isLoading} />
        </Box>

        <Container
          sx={{
            marginTop: { xs: -14, sm: -14, md: -12 },
            px: { xs: 1, sm: 2, md: '' },
          }}
        >
          <Box
            sx={{
              width: 'fit-content',
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              position: 'relative',
              top: 15,
              left: '50%',
              transform: 'translateX(-50%)',
              borderRadius: '5px',
              bgcolor: 'var(--white)',
              height: '40px',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: -15,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                display: { xs: 'flex', sm: 'none' },
              }}
            >
              <Button
                onClick={() =>
                  (document.getElementById(
                    'scrollable-stack'
                  ).scrollLeft -= 100)
                }
                sx={{
                  minWidth: '30px',
                  minHeight: '30px',
                }}
              >
                <ArrowLeft sx={{ color: 'var(--primary)' }} />
              </Button>
            </Box>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                py: 0.4,
                borderRadius: '5px',
                // mx: { xs: 1, md: 1 },
                alignItems: 'center',
                overflowX: 'auto',
                width: { xs: 320, sm: 'auto' },
              }}
            >
              {/* Scrollable content */}
              <Box
                id="scrollable-stack"
                sx={{
                  display: 'flex',
                  overflowX: 'auto',
                  paddingX: 1,
                  '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar
                }}
              >
                {options.map(
                  ({ label, value, icon, link, condition }, index) => (
                    <Box
                      key={value}
                      sx={{
                        position: 'relative',
                        px: 1,
                        minWidth: 100,
                        textAlign: 'center',
                      }}
                    >
                      <Button
                        onClick={() => handleChange(value)}
                        component={link ? Link : 'button'}
                        to={link}
                        sx={{
                          borderBottom:
                            alignment === value
                              ? '2px solid var(--primary)'
                              : 'var(--bgcolor)',
                          color:
                            alignment === value
                              ? 'var(--primary)'
                              : 'var(--secondary)',
                          borderRadius: 0,
                          fontSize: { xs: 10, md: 12 },
                          textTransform: 'capitalize',
                          whiteSpace: 'nowrap',
                        }}
                        startIcon={icon}
                      >
                        {label}
                      </Button>
                      {index < options.length - 1 && (
                        <Box
                          sx={{
                            borderRight: '1px solid var(--light-stroke)',
                            height: { xs: '16px', md: '20px' },
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            left: '100%',
                            backgroundColor: 'var(--primary)',
                          }}
                        />
                      )}
                      {/* {condition && (
                        <span
                          style={{
                            position: 'absolute',
                            top: -5,
                            right: 1,
                            transform: 'translateY(-50%)',
                            color: 'var(--orengel)',
                            fontSize: 9,
                            padding: '2px 5px',
                          }}
                          className="blink"
                        >
                          new
                        </span>
                      )} */}
                    </Box>
                  )
                )}
              </Box>

              {/* Right Arrow Button */}
            </Stack>
            <Box
              sx={{
                position: 'absolute',
                right: -15,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                display: { xs: 'flex', sm: 'none' },
              }}
            >
              <Button
                onClick={() =>
                  (document.getElementById(
                    'scrollable-stack'
                  ).scrollLeft += 100)
                }
                sx={{
                  minWidth: '30px',
                  minHeight: '30px',
                }}
              >
                <ArrowRight sx={{ color: 'var(--primary)' }} />
              </Button>
            </Box>
          </Box>
          <Box>
            {alignment === 'Flight' && <MainSearchBox />}
            {alignment === 'PNR Import' && <PNRImportSearchBox />}
            {/* {alignment === 'Insurance' && <InsuranceForm />} */}
            {alignment === 'Sim' && <SimSearchBox />}
            {alignment === 'Hotel' && <HotelSearchBox />}
          </Box>
          <Box>
            <Grid
              container
              spacing={2}
              sx={{
                mt: { xs: 2, sm: 6 },
                mb: 15,
              }}
              justifyContent={'center'}
            >
              <Grid item xs={11} sm={12} md={12}>
                <OfferCard font={25} />
              </Grid>

              {/* <Grid
                item
                xs={12}
                sm={12}
                md={12}
                sx={{ display: { xs: 'none', md: 'block' }, mt: 3 }}
              >
                <RecentSearch />
              </Grid> */}
            </Grid>
          </Box>
        </Container>
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <NotificationModal afterlogin={true} />
    </div>
  );
};

export default Dashboard;
