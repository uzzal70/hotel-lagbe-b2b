/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import companyInfo from '../../common/companyInfo';

const Banner = ({ loading, support }) => {
  const bannerUrl = `/agent-dynamics/allAgentDynamics?platform=${companyInfo.platform}`;
  const { data } = useGetItemsQuery({
    url: bannerUrl,
  });
  return (
    <Box
      sx={{
        background: '#36629b',
        backgroundImage: `url(${data?.webBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: '100px', sm: '200px', md: '250px' },
      }}
    >
      <Box
        sx={{
          bgcolor: 'var(--light-bgcolor)',
          width: '100%',
        }}
      >
        <marquee
          className="marquee"
          style={{ paddingTop: '5px' }}
          direction="left"
        >
          <Typography
            sx={{
              fontSize: 12,
              color: 'var(--white)',
            }}
          >
            {!loading ? support?.supportTable?.marqueeTag : ''}
          </Typography>
        </marquee>
      </Box>
      {/* <Typography
        sx={{
          color: 'white',
          fontSize: { xs: '1em', sm: '2em', md: '3em' },
          textAlign: 'center',
          pt: { xs: 3, md: 4 },
        }}
      >
        <span
          style={{
            fontWeight: 180,
          }}
        >
          Cheers to
        </span>
        <strong
          style={{
            fontWeight: 700,
            backgroundImage:
              'linear-gradient(to right, #ec991d9c, #f1e06b, #e4c70f)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {' '}
          2025!
        </strong>
      </Typography> */}
    </Box>
  );
};

export default Banner;
