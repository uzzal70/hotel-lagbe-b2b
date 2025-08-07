/* eslint-disable react/prop-types */
import { Box, Container, Grid, Stack } from '@mui/material';

import companyInfo from '../common/companyInfo';
import ImageImport from '../assets/ImageImport';

const Footer = ({ value }) => {
  const basis =
    'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/event/basis.svg';
  const dig =
    'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/event/dig.svg';
  const iata =
    'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/event/iata.svg';
  const openApp = (link) => {
    window.location.href = link;
  };

  const data = [
    {
      link: 'https://facebook.com/hotellagbe',
      imageurl:
        'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/EmailTemplateLogo/facebook.png',
    },
    // {
    //   link: 'https://www.instagram.com/ticketlagbe',
    //   imageurl:
    //     'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/EmailTemplateLogo/instagram.png',
    // },
    // {
    //   link: 'https://twitter.com/i/flow/login?redirect_after_login=%2Fticketlagbe',
    //   imageurl:
    //     'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/EmailTemplateLogo/tweeter.png',
    // },
    // {
    //   link: 'https://www.linkedin.com/company/ticketlagbe',
    //   imageurl:
    //     'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/EmailTemplateLogo/linkedIn.png',
    // },
    // {
    //   link: 'https://www.youtube.com/channel/UCY9sLUAm-d4_1j3vrliW0Ig',
    //   imageurl:
    //     'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/EmailTemplateLogo/youTube.png',
    // },
  ];
  const phoneData = [
    {
      link: 'fb://page/?id=hotellagbe', // Facebook app custom URL scheme
      imageurl:
        'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/EmailTemplateLogo/facebook.png',
    },
    // {
    //   link: 'https://www.instagram.com/ticketlagbe', // Instagram app custom URL scheme
    //   imageurl:
    //     'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/EmailTemplateLogo/instagram.png',
    // },
    // {
    //   link: 'https://twitter.com/i/flow/login?redirect_after_login=%2Fticketlagbe', // Twitter app custom URL scheme
    //   imageurl:
    //     'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/EmailTemplateLogo/tweeter.png',
    // },
    // {
    //   link: 'https://www.linkedin.com/company/ticketlagbe', // LinkedIn app custom URL scheme
    //   imageurl:
    //     'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/EmailTemplateLogo/linkedIn.png',
    // },
    // {
    //   link: 'https://m.youtube.com/channel/UCY9sLUAm-d4_1j3vrliW0Ig', // YouTube app custom URL scheme
    //   imageurl:
    //     'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/EmailTemplateLogo/youTube.png',
    // },
  ];
  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'var(--body)',
          pb: 4,
          display: value ? 'none' : 'block',
        }}
      >
        <Grid
          container
          rowSpacing={4}
          columnSpacing={6}
          justifyContent={'center'}
        >
          <Grid item>
            <Box>
              <Box
                sx={{
                  color: 'var(--black)',
                  fontSize: 12,
                  textAlign: 'center',
                  pb: 1,
                }}
              >
                Verified By
              </Box>
              <img
                src={dig}
                alt="icon"
                style={{
                  width: 'auto',
                  height: '40px',
                  display: 'block',
                }}
              />
            </Box>
          </Grid>
          <Grid item>
            <Box>
              <Box
                sx={{
                  color: 'var(--black)',
                  fontSize: 12,
                  textAlign: 'center',
                  pb: 1,
                }}
              >
                Authorised By
              </Box>
              <img
                src={iata}
                alt="icon"
                style={{
                  width: 'auto',
                  height: '40px',
                  display: 'block',
                }}
              />
            </Box>
          </Grid>
          <Grid item>
            <Box>
              <Box
                sx={{
                  color: 'var(--black)',
                  fontSize: 12,
                  textAlign: 'center',
                  pb: 1,
                }}
              >
                Member of
              </Box>
              <img
                src={basis}
                alt="icon"
                style={{
                  width: 'auto',
                  height: '40px',
                  display: 'block',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ bgcolor: 'var(--primary)', py: 2 }}>
        <Container>
          <Grid container spacing={1} alignItems="center">
            <Grid
              item
              xs={3}
              sm={3}
              md={2}
              sx={{ order: { xs: 1, sm: 1, md: 1 } }}
            >
              <Box
                sx={{
                  img: {
                    maxWidth: { xs: '150px', sm: '150px', md: '200px' },
                    height: { xs: '35px', sm: '50px', md: '50px', lg: '60px' },
                  },
                }}
              >
                <img
                  src={ImageImport?.iconFooter}
                  alt="Company Logo"
                  style={{ width: 'auto', display: 'block' }}
                />
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={9}
              md={7}
              sx={{ order: { xs: 3, sm: 2, md: 2 } }}
            >
              <Box
                sx={{
                  textAlign: { xs: 'center', sm: 'right', md: 'center' },
                  pb: 1,
                  a: {
                    color: 'var(--disable)',
                    fontSize: { xs: 9.5, sm: 12 },
                  },
                }}
              >
                <a href="/about-us" target="_blank" rel="noreferrer">
                  About&nbsp;Us&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                  {/*About&nbsp;Us&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; */}
                </a>
                <a href="/privacy-policy" target="_blank" rel="noreferrer">
                  Privacy&nbsp;Policy&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                  {/* Privacy Policy&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; */}
                </a>
                <a href="terms-condition" target="_blank" rel="noreferrer">
                  Terms&nbsp;&&nbsp;Conditions&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                  {/* Terms & Conditions&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; */}
                </a>
                <a href="/refund-policy" target="_blank" rel="noreferrer">
                  Refund&nbsp;Policy&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                  {/* Refund Policy&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; */}
                </a>
                <a href="/purchase-policy" target="_blank" rel="noreferrer">
                  Purchase&nbsp;&&nbsp;Sale&nbsp;Terms
                  {/* Purchase & Sale Terms */}
                </a>
              </Box>
            </Grid>
            <Grid
              item
              xs={9}
              sm={6}
              md={3}
              sx={{ order: { xs: 2, sm: 4, md: 3 } }}
            >
              <Stack
                display={{ xs: 'none', md: 'flex' }}
                direction="row"
                justifyContent={{ xs: 'right', sm: 'right', md: 'center' }}
                spacing={1}
                sx={{
                  color: 'var(--black)',
                  fontSize: 12,
                  pb: 1,
                  textDecoration: 'none',
                  img: {
                    maxWidth: '100px',
                    height: '18px',
                    padding: 0.6,
                    bgcolor: 'var(--disable)',
                    borderRadius: '50%',
                  },
                }}
              >
                {data?.map((item, i) => (
                  <a key={i} href={item.link} target="_blank" rel="noreferrer">
                    <img key={i} src={item.imageurl} alt={item.altText} />
                  </a>
                ))}
              </Stack>
              <Stack
                display={{ xs: 'flex', md: 'none' }}
                direction="row"
                justifyContent={{ xs: 'right', sm: 'right', md: 'center' }}
                spacing={1}
                sx={{
                  color: 'var(--black)',
                  fontSize: 12,
                  pb: 1,
                  textDecoration: 'none',
                  img: {
                    maxWidth: '100px',
                    height: '18px',
                    padding: 0.6,
                    bgcolor: 'var(--disable)',
                    borderRadius: '50%',
                  },
                }}
              >
                {phoneData.map((item, i) => (
                  <img
                    key={i}
                    src={item.imageurl}
                    alt={item.altText}
                    onClick={() => openApp(item.link)}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                order: { xs: 4, sm: 5, md: 4 },
              }}
            >
              {/* <Box
                sx={{
                  img: {
                    width: { xs: '100%', md: '60%' },
                    borderRadius: 2,
                  },
                  textAlign: 'center',
                }}
              >
                <img src={ImageImport.payment} alt="" />
              </Box> */}
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={12}
              sx={{ order: { xs: 5, sm: 3, md: 5 } }}
            >
              <Box
                sx={{
                  color: 'var(--disable)',
                  fontSize: 12,
                  textAlign: { xs: 'center', sm: 'left', md: 'center' },
                  pb: 1,
                }}
              >
                Copyright ©2024 {companyInfo.companyName}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
