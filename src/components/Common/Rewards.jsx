/* eslint-disable react/prop-types */
import { Box, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import ImageImport from '../../assets/ImageImport';
import { useNavigate } from 'react-router-dom';

const Rewards = ({ data, width, size2, size1, isLoading }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard/reward')}>
      <Tooltip title="You will get reward points for every ticket">
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            border: '1px solid var(--yellow)',
            borderRadius: 1,
            px: 1,
            pt: 0.6,
            background:
              'linear-gradient(to right, #ec991d9c, #f1e06b, #e4c70f)',
          }}
        >
          <Box
            sx={{
              width: { xs: '30px', sm: '37px' },
              display: 'block',
            }}
          >
            <img
              src={ImageImport?.rewards}
              style={{ width: '100%', borderRadius: '50%' }}
              alt=""
            />
          </Box>
          <Box>
            <Typography
              sx={{
                color: 'var(--primary)',
                fontSize: size1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: width,
              }}
            >
              <span>Reward Points</span>
            </Typography>
            <Typography
              sx={{
                color: 'var(--primary)',
                fontSize: data?.totalCoins?.length < 6 ? size2 : 13,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: width,
              }}
            >
              <span>
                {/* {conConvertToNumberFormat(data?.totalCoins || 0)} */}
                {isLoading ? (
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    sx={{ width: 60, height: 14, bgcolor: 'var(--skeleton)' }}
                  />
                ) : (
                  data?.totalCoins || 0
                )}
              </span>
            </Typography>
          </Box>
        </Stack>
      </Tooltip>
    </Box>
  );
};

export default Rewards;
