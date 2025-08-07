/* eslint-disable react/prop-types */
import { Box, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import commaNumber from 'comma-number';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import Token from './Token';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCreditModal } from '../../redux/slices/modalOpen';
import CreditRequestModal from './CreditRequestModal';
import companyInfo from '../../common/companyInfo';

const CreditRequest = ({
  bgcolors,
  colorp,
  size1,
  size2,
  balance,
  display,
}) => {
  const agentId = Token();
  const url = `/agent/findTotalPartialDueByAgentId/${agentId}`;
  const dispatch = useDispatch();

  const {
    data: totalDueData,
    isLoading: isTotalDueLoading,
    refetch,
  } = useGetItemsQuery({ url });

  const handleToggle = () => {
    dispatch(toggleCreditModal({ modalName: 'creditModal' }));
    refetch();
  };
  const creditModal = useSelector((state) => state.modalValue.creditModal);

  return (
    <div>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          border: '1px solid var(--stroke)',
          borderRadius: 1,
          px: 1,
          pt: 0.5,
          bgcolor: bgcolors,
          mt: { xs: 0.1, md: 0 },
          position: 'relative',
        }}
        onClick={handleToggle}
      >
        <Box sx={{ display: display || 'block' }}>
          <AddCardOutlinedIcon
            sx={{
              color: 'var(--disable)',
              bgcolor: 'var(--white)',
              borderRadius: '50%',
              p: 0.8,
              width: { xs: '30px', sm: '35px' },
              height: { xs: '30px', sm: '35px' },
            }}
          />
        </Box>
        <Box>
          <Typography
            sx={{
              color: colorp,
              fontSize: size1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Emergency&nbsp;Credit&nbsp;&nbsp;&nbsp;</span>
          </Typography>

          <Tooltip title="Emergency Credit">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              <Typography
                sx={{
                  color: {
                    xs: 'white',
                    md:
                      totalDueData?.creditDueAmount > 0
                        ? 'var(--red)'
                        : 'var(--primary)',
                  },
                  fontSize: balance?.length < 6 ? size2 : 13,
                  fontWeight: 600,
                }}
                noWrap
              >
                {isTotalDueLoading ? (
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    sx={{ width: 80, height: 15, bgcolor: 'var(--skeleton)' }}
                  />
                ) : (
                  `${
                    totalDueData?.creditDueAmount > 0 ? '-' : ''
                  } ${commaNumber(totalDueData?.creditDueAmount || 0)} ${
                    companyInfo?.currencyType
                  }`
                )}
              </Typography>
              <Tooltip title="Request">
                <AddOutlinedIcon
                  sx={{
                    fontSize: 20,
                    position: 'absolute',
                    right: { xs: 10, md: 5 },
                    bottom: 2,
                    color: { xs: 'var(--white)', md: 'var(--dark-green)' },
                  }}
                />
              </Tooltip>
            </Box>
          </Tooltip>
        </Box>
      </Stack>
      {creditModal && (
        <CreditRequestModal
          totalDueData={totalDueData}
          creditRefetch={refetch}
          creditModal={creditModal}
        />
      )}
    </div>
  );
};

export default CreditRequest;
