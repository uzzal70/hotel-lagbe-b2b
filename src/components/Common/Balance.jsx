/* eslint-disable react/prop-types */
import { Box, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import ImageImport from '../../assets/ImageImport';
import commaNumber from 'comma-number';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useState } from 'react';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import Token from './Token';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useNavigate } from 'react-router-dom';
import companyInfo from '../../common/companyInfo';

const Balance = ({
  bgcolors,
  colorp,
  size1,
  size2,
  balance,
  name,
  display,
  partial,
  // isLoading,
  // refetch,
}) => {
  const [loading, setLoading] = useState(false);
  const agentId = Token();
  const url = `/agent/findAgentById/${agentId}`;
  const { data, isLoading, refetch } = useGetItemsQuery({ url });
  const navigate = useNavigate();

  const refreshFunction = async () => {
    try {
      setLoading(true);

      await refetch();

      await new Promise((resolve) => setTimeout(resolve, 3000));

      setLoading(false);
    } catch (error) {
      console.error('Error occurred during refresh:', error);
      setLoading(false);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        border: '1px solid var(--stroke)',
        borderRadius: 1,
        px: 1,
        pt: 0.6,
        bgcolor: bgcolors,
        position: 'relative',
      }}
      // justifyContent={"space-between"}
    >
      <Box
        sx={{ width: { xs: '30px', sm: '35px' }, display: display || 'block' }}
      >
        <img src={ImageImport?.balance} style={{ width: '100%' }} alt="" />
      </Box>
      <Box>
        <Typography
          sx={{
            color: colorp,
            fontSize: size1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: { xs: '80px', md: '90px' },
          }}
        >
          <span>{name || 'Balance'}&nbsp;&nbsp;&nbsp;</span>
          <Tooltip title="Refresh">
            <AutorenewIcon
              sx={{
                cursor: 'pointer',
                fontSize: 15,
                p: 0,
                position: 'absolute',
                right: { xs: 12, md: 8 },
                top: { xs: 2, md: 5 },
              }}
              className={loading ? 'custom-spin' : ''}
              onClick={() => refreshFunction()}
            />
          </Tooltip>
        </Typography>

        <Tooltip title="Balance">
          <Box
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => navigate('/dashboard/depositreq')}
          >
            <Typography
              sx={{
                color: colorp,
                fontSize: balance?.length < 6 ? size2 : 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              noWrap
            >
              {isLoading ? (
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  sx={{ width: 100, height: 15, bgcolor: 'var(--skeleton)' }}
                />
              ) : (
                `${commaNumber(parseInt(data?.mywallet || 0))} ${
                  companyInfo.currencyType
                }`
              )}
              <AddOutlinedIcon
                sx={{
                  fontSize: 20,
                  position: 'absolute',
                  right: { xs: 10, md: 5 },
                  bottom: 2,
                  color: { xs: 'var(--white)', md: 'var(--dark-green)' },
                }}
              />
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    </Stack>
  );
};

export default Balance;
