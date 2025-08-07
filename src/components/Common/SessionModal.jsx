import { Box, Skeleton, Stack, Typography } from '@mui/material';
// import CustomButton from './CustomButton';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const SessionModal = ({ handleClick }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box>
          <Stack direction="row">
            <Box sx={{ position: 'relative' }}>
              <Skeleton
                animation="wave"
                variant="rounded"
                sx={{ width: 210, height: 40, bgcolor: 'var(--skeleton)' }}
              />
              <Stack
                direction="row"
                spacing={1}
                sx={{ position: 'absolute', right: 10, top: 10 }}
              >
                <Skeleton
                  animation="wave"
                  variant="circular"
                  sx={{ width: 20, height: 20, bgcolor: '#D7DEED' }}
                />
                <Skeleton
                  animation="wave"
                  variant="circular"
                  sx={{ width: 20, height: 20, bgcolor: '#A6DCF6' }}
                />
              </Stack>
            </Box>
            <Stack
              direction="row"
              sx={{
                bgcolor: 'var(--primary)',
                p: 1,
                ml: '-1px',
                borderTopRightRadius: '5px',
                borderBottomRightRadius: '5px',
                zIndex: 1,
              }}
            >
              <SearchIcon sx={{ color: 'var(--white)' }} />
            </Stack>
          </Stack>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            sx={{
              bgcolor: 'var(--skeleton)',
              width: 'fit-content',
              padding: '6px 30px 6px 6px',
              borderRadius: '5px',
              mt: 1,
            }}
          >
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: 30, height: 30, bgcolor: '#C3B4FA' }}
            />
            <Box>
              <Skeleton
                animation="wave"
                variant="text"
                sx={{
                  fontSize: '0.6rem',
                  width: 110,
                  bgcolor: '#28BEFF',
                }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ fontSize: '0.6rem', width: 180, bgcolor: '#C7CFE2' }}
              />
            </Box>
          </Stack>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            sx={{
              bgcolor: 'var(--skeleton)',
              width: 'fit-content',
              padding: '6px 30px 6px 6px',
              borderRadius: '5px',
              mt: 1,
            }}
          >
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: 30, height: 30, bgcolor: '#00A99D' }}
            />
            <Box>
              <Skeleton
                animation="wave"
                variant="text"
                sx={{
                  fontSize: '0.6rem',
                  width: 110,
                  bgcolor: '#28BEFF',
                }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ fontSize: '0.6rem', width: 180, bgcolor: '#C7CFE2' }}
              />
            </Box>
          </Stack>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            sx={{
              bgcolor: 'var(--skeleton)',
              width: 'fit-content',
              padding: '6px 30px 6px 6px',
              borderRadius: '5px',
              mt: 1,
            }}
          >
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: 30, height: 30, bgcolor: '#FFE182' }}
            />
            <Box>
              <Skeleton
                animation="wave"
                variant="text"
                sx={{
                  fontSize: '0.6rem',
                  width: 110,
                  bgcolor: '#28BEFF',
                }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ fontSize: '0.6rem', width: 180, bgcolor: '#C7CFE2' }}
              />
            </Box>
          </Stack>
        </Box>
      </Box>
      <Typography
        sx={{
          color: 'var(--black)',
          fontSize: { xs: 18 },
          fontWeight: 500,
          mt: 2,
        }}
      >
        Your Results are outdated
      </Typography>
      <Typography
        sx={{
          color: 'var(--secondary)',
          fontSize: { xs: 12 },
          fontWeight: 400,
          mb: 3,
        }}
      >
        To see the latest availability and prices, please refresh results
      </Typography>
      {/* <CustomButton
        value="Refresh"
        bgcolor="var(--primary)"
        textcolor="var(--white)"
        padding="5px 30px"
        hovercolor="var(--primary-rgb)"
        handleClick={handleClick}
      /> */}
      {/* <Typography
        sx={{
          color: 'var(--secondary)',
          fontSize: { xs: 14 },
          fontWeight: 400,
        }}
      >
        or
      </Typography> */}
      <Typography
        sx={{
          color: 'var(--primary)',
          fontSize: { xs: 14 },
          fontWeight: 400,
          cursor: 'pointer',
        }}
        onClick={() => navigate('/dashboard')}
      >
        Start a new Search
      </Typography>
    </Box>
  );
};

export default SessionModal;
