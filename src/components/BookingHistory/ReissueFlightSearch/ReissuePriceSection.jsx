/* eslint-disable react/prop-types */
import { Box, Collapse, Stack } from '@mui/material';
import { ExpandLess } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import CustomButton from '../../Common/CustomButton';

const ReissuePriceSection = ({
  open,
  handleChange,
  handleClose,
  handleClick: handleBooking,
}) => {
  const location = useLocation();

  return (
    <>
      <Stack
        direction={{ xs: 'column', md: 'column' }}
        justifyContent="space-between"
        sx={{
          height: '100%',
          bgcolor: 'var(--price-color)',
          p: { xs: 0.5, md: 1 },
          borderTopRightRadius: '5px',
          borderBottomRightRadius: '5px',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Stack
            direction={{ xs: 'column', md: 'column' }}
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                color: 'var(--secondary)',
                fontSize: { xs: 12, md: 13 },
              }}
            >
              <span>Fare &nbsp;Difference&nbsp;&nbsp;</span>
              <span>BDT&nbsp;4,000</span>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: 'var(--primary)', fontSize: { xs: 12 } }}
            >
              <span>TF&nbsp;Service&nbsp;Fee&nbsp;&nbsp;</span>
              <span style={{ fontWeight: 600 }}>BDT&nbsp;3,000</span>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: 'var(--primary)', fontSize: { xs: 12 } }}
            >
              <span>Airline&nbsp;Fee&nbsp;&nbsp;</span>
              <span style={{ fontWeight: 600 }}>BDT&nbsp;3,000</span>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ borderTop: '1px solid var(--stroke)' }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              color: 'var(--primary)',
              fontSize: { xs: 12 },
            }}
          >
            <span>Amount&nbsp;to&nbsp;be&nbsp;paid&nbsp;&nbsp;</span>
            <span style={{ fontWeight: 600 }}>BDT&nbsp;3,000</span>
          </Stack>
        </Box>
        <Box
          sx={{
            textAlign: 'end',
            display: {
              xs: 'none',
              md:
                location?.pathname === '/dashboard/passengerinformation'
                  ? 'none'
                  : 'unset',
            },
          }}
        >
          <CustomButton
            textcolor="var(--white)"
            bgcolor="var(--primary)"
            hovercolor="var(--primary-rgb)"
            padding="2px 15px"
            value="Select Flight"
            handleClick={() => handleBooking()}
          />
        </Box>
      </Stack>
    </>
  );
};

export default ReissuePriceSection;
