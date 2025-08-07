import { Box } from '@mui/material';
import loader from '../../assets/loader.gif';
import companyInfo from '../../common/companyInfo';

const RootLoader = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        img: {
          height: { xs: '150px', md: '200px' },
          //   animation: 'spin 2s linear infinite',
        },
      }}
    >
      <img src={loader} alt={companyInfo.companyName} />
    </Box>
  );
};

export default RootLoader;
