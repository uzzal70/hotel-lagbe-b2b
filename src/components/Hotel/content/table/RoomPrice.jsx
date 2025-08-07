/* eslint-disable react/prop-types */
import moment from 'moment';
import BoltIcon from '@mui/icons-material/Bolt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Box, Typography, Button, Tooltip, Grid } from '@mui/material';
import FeeCancellation from './FeeCancellation';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import companyInfo from '../../../../common/companyInfo';

const RoomPrice = ({ item, isSelected, onClick }) => {
  const initialState = useSelector((state) => state.hotel);
  const startDate = moment(initialState?.dateRange?.[0]?.startDate);
  const endDate = moment(initialState?.dateRange?.[0]?.endDate);
  const nights = endDate.diff(startDate, 'days') || 1;

  const rules = item?.policy?.cancellationPolicies?.[0]?.rules || [];
  const rulesText = item?.policy?.cancellationPolicies?.[0]?.text || '';
  const firstRule = rules[0]?.end;
  const lastRule = rules[rules.length - 1]?.end;

  const price = Number((item?.fare?.finalRate || 0).toFixed(2));
  return (
    <Box
      sx={{
        p: 0.5,
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          // alignItems: 'flex-center',
        }}
      >
        <Grid item xs={12} sm={7}>
          <Box sx={{ width: { sm: '100%' } }}>
            {/* Refundability Info */}
            {firstRule && (
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
              >
                {item?.refundable ? (
                  <CheckCircleIcon sx={{ color: '#03939F', fontSize: 15 }} />
                ) : (
                  <HighlightOffIcon
                    sx={{ color: 'var(--crimson)', fontSize: 15 }}
                  />
                )}

                <Tooltip
                  title={
                    <FeeCancellation
                      rules={rules}
                      item={item}
                      startDate={startDate}
                      endDate={endDate}
                      lastRule={lastRule}
                      firstRule={firstRule}
                      rulesText={rulesText}
                    />
                  }
                  placement="top"
                  arrow
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: '#fff',
                        color: '#000',
                        fontSize: '12px',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        p: 2,
                        maxWidth: 600,
                      },
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: item?.refundable ? '#03939F' : 'var(--crimson)',
                      fontSize: { xs: 10, md: 10 },
                    }}
                  >
                    {item?.policy?.refundable &&
                    item?.policy?.refundability !== 'NonRefundable' ? (
                      <>
                        Free Cancellation Till <br />
                        {new Date(firstRule).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </>
                    ) : (
                      'Non Refundable'
                    )}
                  </Typography>
                </Tooltip>
              </Box>
            )}

            {/* Refundability Text */}
            {item?.policy?.refundable &&
            item?.policy?.refundability !== 'NonRefundable' ? (
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
              >
                <SwapVerticalCircleIcon
                  sx={{ color: 'var(--black-hover)', fontSize: 15 }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: 'var(--black-hover)',
                    fontSize: { xs: 10, lg: 10 },
                  }}
                >
                  {item?.policy?.refundability}
                </Typography>
              </Box>
            ) : null}

            {/* Instant Confirmation */}
            {/* <Box
              sx={{
                alignItems: 'center',
                gap: 1,
                mb: 1,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <BoltIcon sx={{ color: '#03939F', fontSize: 15 }} />
              <Typography
                variant="body2"
                sx={{
                  color: '#03939F',
                  fontSize: { xs: 10, lg: 10 },
                }}
              >
                Instant Confirmation
              </Typography>
            </Box> */}

            {/* Meal Type */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              {item?.hasBreakfast ? (
                <RestaurantMenuIcon
                  sx={{
                    color: 'var(--dark-green)',
                    fontSize: 15,
                  }}
                />
              ) : (
                <BedroomParentOutlinedIcon
                  sx={{
                    color: 'var(--dark-sky)',
                    fontSize: 15,
                  }}
                />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: item?.hasBreakfast
                    ? 'var(--dark-green)'
                    : 'var(--dark-sky)',
                  fontSize: { xs: 10, lg: 10 },
                  textTransform: 'capitalize',
                }}
              >
                {item?.policy?.boardBasis?.description
                  ? item?.policy?.boardBasis?.description ||
                    'Breakfast Included'
                  : 'Breakfast Not Included'}
              </Typography>
            </Box>

            {/* Hold Allowed */}
            {/* {item?.isHoldAllowedForRecommendation && (
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
              >
                <PendingIcon sx={{ color: 'var(--tarnsit)', fontSize: 15 }} />
                <Typography
                  variant="body2"
                  sx={{ color: '#03939F', fontSize: { xs: 10, lg: 12 } }}
                >
                  Hold
                </Typography>
              </Box>
            )} */}
          </Box>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box
            sx={{
              textAlign: { xs: 'left', md: 'right' },
              width: { sm: '100%', md: 'auto' },
              mt: { xs: 1, md: 0 },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'var(--primary)',
                fontWeight: 'bold',
                mb: 0.5,
                fontSize: { xs: 15, lg: 16 },
              }}
            >
              {companyInfo?.currencyCode} {(price || 0).toFixed(0)}
            </Typography>

            <Button
              onClick={onClick}
              sx={{
                backgroundColor: isSelected ? 'var(--primary)' : 'white',
                border: '1px solid var(--primary)',
                color: isSelected ? 'white' : 'var(--primary)',
                fontWeight: 300,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                },
                width: '90px',
                py: 0.2,
                cxo: {
                  color: 'var(--primary)',
                  '&:hover': {
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                  },
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 0.5,
                }}
              >
                {isSelected ? (
                  <CheckCircleIcon
                    sx={{
                      fontSize: 16,
                      color: 'white',
                      mr: 0.5,
                    }}
                  />
                ) : (
                  <RadioButtonUncheckedIcon
                    sx={{ fontSize: 16, mr: 0.5 }}
                    className="cxo"
                  />
                )}
                {isSelected ? 'Selected' : 'Select'}
              </Box>
            </Button>
          </Box>
        </Grid>
      </Grid>
      {/* Left Section */}

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default RoomPrice;
