import { Box, Container, Grid, Tooltip, Typography } from '@mui/material';
import LandingHeader from './LandingHeader';
import Login from '../components/Login/Login';
import icon from '../assets/images/icon.svg';
import { Link } from 'react-router-dom';
import OfferCard from '../components/Dashboard/OfferCard';
import Footer from './Footer';
import companyInfo from '../common/companyInfo';
import MobileLogin from './MobileLogin';
const LandingPage = () => {
  const lgImage =
    'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/event/landigpagebannarlg.webp';
  const first =
    'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/event/1th.webp';
  const second =
    'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/event/2th.webp';
  const third =
    'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/event/3th.webp';
  const fourth =
    'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/event/4th.webp';
  return (
    <Box sx={{ bgcolor: 'var(--white)' }}>
      <Box display={{ xs: 'none', md: 'block' }}>
        <Container>
          <Box>
            <LandingHeader showbtn />
            <Box
              py={{ xs: 3, md: 1 }}
              sx={{
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  img: {
                    maxWidth: '100%',
                    objectFit: 'cover',
                    minHeight: '500px',
                  },
                }}
              >
                <img src={lgImage} alt="ticketlagbe" />
              </Box>
              <Grid
                container
                justifyContent={'center'}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Grid item xs={12} md={7} lg={6.5} sx={{ margin: 'auto 0' }}>
                  <Box>
                    <Box
                      sx={{
                        color: 'var(--black)',
                        fontSize: { xs: 35, sm: 40, md: 45 },
                        fontWeight: 400,
                        width: 'fit-content',
                        position: 'relative',
                      }}
                    >
                      Dedicated{' '}
                      <strong style={{ color: 'var(--primary-btn)' }}>B2B</strong>{' '}
                      Hotel
                      {/* <Box
                        sx={{
                          maxWidth: '200px',
                          height: '40px',
                          position: 'absolute',
                          top: '-25px',
                          right: '-60px',
                        }}
                      >
                        <img
                          src={icon}
                          alt="icon"
                          style={{
                            width: 'auto',
                            height: '100%',
                            display: 'block',
                          }}
                          loading="lazy"
                        />
                      </Box> */}
                    </Box>
                    <Box
                      sx={{
                        color: 'var(--black)',
                        fontSize: { xs: 35, sm: 40, md: 45 },
                      }}
                    >
                      Portal in
                    </Box>
                    <Box
                      sx={{
                        color: 'var(--black)',
                        fontSize: { xs: 35, sm: 40, md: 45 },
                        fontWeight: 500,
                      }}
                    >
                      Bangladesh
                    </Box>
                    <Typography
                      sx={{
                        color: 'var(--black)',
                        fontSize: 16,
                        py: 3,
                      }}
                    >
                      Grow Your Travel Agency Business with{' '}
                      {companyInfo.companyName}
                    </Typography>
                    <Box mt={2}>
                      <Link
                        to="registration"
                        style={{
                          color: 'var(--white)',
                          background: 'var(--primary-btn)',
                          padding: '10px 20px',
                          fontWeight: 300,
                          borderRadius: '5px',
                        }}
                      >
                        Sign up now
                      </Link>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4} lg={3.3}>
                  <Login />
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box pt={9} pb={6}>
            <OfferCard font={15} />
          </Box>
        </Container>
        <Box sx={{ bgcolor: 'var(--white)', pt: 5 }}>
          <Container>
            <Grid container justifyContent={'center'}>
              <Grid item xs={12} md={7} lg={6.5} sx={{ margin: 'auto 0' }}>
                <Box>
                  <Typography
                    sx={{
                      color: 'var(--black)',
                      fontSize: 25,
                      fontWeight: 500,
                      py: 1,
                    }}
                  >
                    Why Choose us
                  </Typography>
                  <Typography
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: 14,
                    }}
                  >
                    We guarantee unparalleled support for your business, <br />{' '}
                    empowering you to outpace your competitors with our
                    <br /> assistance.
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                lg={3.3}
                mt={{ xs: 3, md: 0 }}
                sx={{
                  img: {
                    width: '100%',
                    height: '100%',
                    display: 'block',
                  },
                }}
              >
                <Grid
                  container
                  rowSpacing={4}
                  columnSpacing={6}
                  justifyContent={'center'}
                >
                  <Grid item xs={3} md={6}>
                    <Box>
                      <img src={first} alt="icon" loading="lazy" />
                    </Box>
                    <Box
                      sx={{
                        color: 'var(--black)',
                        fontSize: 12,
                        textAlign: 'center',
                      }}
                    >
                      700+ Airlines
                    </Box>
                  </Grid>
                  <Grid item xs={3} md={6}>
                    <Box>
                      <img src={second} alt="icon" loading="lazy" />
                    </Box>
                    <Box
                      sx={{
                        color: 'var(--black)',
                        fontSize: 12,
                        textAlign: 'center',
                      }}
                    >
                      Highest Commission
                    </Box>
                  </Grid>
                  <Grid item xs={3} md={6}>
                    <Box>
                      <img src={third} alt="icon" loading="lazy" />
                    </Box>
                    <Box
                      sx={{
                        color: 'var(--black)',
                        fontSize: 12,
                        textAlign: 'center',
                      }}
                    >
                      Target Bonus
                    </Box>
                  </Grid>
                  <Grid item xs={3} md={6}>
                    <Box>
                      <img src={fourth} alt="icon" loading="lazy" />
                    </Box>
                    <Box
                      sx={{
                        color: 'var(--black)',
                        fontSize: 12,
                        textAlign: 'center',
                      }}
                    >
                      24/7 Support
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
          <Box mt={12}>
            <Footer />
          </Box>
        </Box>
      </Box>
      {/* mobile devices */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <MobileLogin />
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 100, md: 20 },
          right: 20,
          cursor: 'pointer',
          zIndex: 100,
        }}
      >
        <Tooltip title="Live Whatsapp Support" arrow followCursor>
          <a
            href="https://wa.me/8801332564528"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="39"
              height="39"
              viewBox="0 0 39 39"
            >
              <path
                fill="#00E676"
                d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"
              ></path>
              <path
                fill="#FFF"
                d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"
              ></path>
            </svg>
          </a>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default LandingPage;
