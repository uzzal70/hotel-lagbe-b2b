/* eslint-disable react/prop-types */
import { Box, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import ImageImport from '../../assets/ImageImport';
import commaNumber from 'comma-number';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useState } from 'react';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import Token from './Token';
import companyInfo from '../../common/companyInfo';

const PartialBalance = ({
  bgcolors,
  colorp,
  size1,
  size2,
  balance,
  name,
  display,
}) => {
  const [loading, setLoading] = useState(false);
  const agentId = Token();
  // console.log('hit it');
  const url = `/agent/findTotalPartialDueByAgentId/${agentId}`;

  const { data, isLoading, refetch } = useGetItemsQuery({ url });

  // console.log(data);
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
                top: 5,
              }}
              className={loading ? 'custom-spin' : ''}
              onClick={() => refreshFunction()}
            />
          </Tooltip>
        </Typography>

        <Tooltip title="Balance">
          <Box>
            <Typography
              sx={{
                color: colorp,
                fontSize: balance?.length < 6 ? size2 : 13,
                fontWeight: 600,
              }}
              noWrap
            >
              {isLoading ? (
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  sx={{ width: 80, height: 15, bgcolor: 'var(--skeleton)' }}
                />
              ) : (
                `${commaNumber(data?.partialDueAmount || 0)} ${
                  companyInfo?.currencyType
                }`
              )}
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    </Stack>
  );
};

export default PartialBalance;
