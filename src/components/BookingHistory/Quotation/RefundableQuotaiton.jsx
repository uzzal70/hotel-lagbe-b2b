import { Box, Stack, Typography } from '@mui/material';
import CustomButton from '../../Common/CustomButton';

const RefundableQuotaiton = () => {
  return (
    <Box sx={{ bgcolor: 'var(--white)', borderRadius: '6px' }}>
      <Typography sx={{ color: 'var(--black)', fontSize: 16, p: 2 }}>
        Quotation
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          fontSize: 12,
          color: 'var(--secondary)',
          p: 2,
          pt: 0,
        }}
      >
        <Box>
          <Box fontWeight={500}>Original Booking Price</Box>
          <Box fontWeight={400}>Used Base fare Amount</Box>
          <Box sx={{ fontWeight: 400, pt: 1 }}>Used Tax Amount</Box>
          <Box fontWeight={500}>Total Used Fare Amount</Box>
        </Box>
        <Box>
          <Box fontWeight={500}>45454 BDT</Box>
          <Box fontWeight={400}>45454 BDT</Box>
          <Box sx={{ fontWeight: 400, pt: 1 }}>-5656 BDT</Box>
          <Box fontWeight={500}>-45454 BDT</Box>
        </Box>
      </Stack>
      <Box
        sx={{
          fontSize: 12,
          color: 'var(--white)',
          bgcolor: 'var(--primary)',
          p: 2,
          borderRadius: '6px',
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Box fontWeight={400}>Refundable Ticket Price</Box>
            <Box fontWeight={300}>Airlines Penalty</Box>
            <Box fontWeight={300}>Service Charge</Box>
            <Box sx={{ fontWeight: 400, pt: 1 }}>Total Refund Charge</Box>
            <Box fontWeight={300}>Due as Partial Payment</Box>
          </Box>
          <Box>
            <Box fontWeight={400}>45454 BDT</Box>
            <Box fontWeight={300}>45454 BDT</Box>
            <Box fontWeight={300}>45454 BDT</Box>
            <Box sx={{ fontWeight: 400, pt: 1 }}>-5656 BDT</Box>
            <Box fontWeight={300}>-45454 BDT</Box>
          </Box>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            bgcolor: 'var(--white)',
            color: 'var(--primary)',
            p: 1.5,
            mt: 2,
            borderRadius: '5px',
          }}
        >
          <Box>
            <Box fontWeight={400}>Refundable Amount</Box>
          </Box>
          <Box>
            <Box fontWeight={400}>45454 BDT</Box>
          </Box>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
        <CustomButton
          fontSize={{ xs: 12, md: 14 }}
          value="Approve"
          textcolor="var(--white)"
          bgcolor="var(--dark-green)"
          hovercolor="var(--dark-green)"
          padding="4px 25px"
          borderRadius="5px"
          // handleClick={handleRefund}
        />
        <CustomButton
          fontSize={{ xs: 12, md: 14 }}
          value="Reject"
          textcolor="var(--white)"
          bgcolor="var(--yellow)"
          hovercolor="var(--yellow)"
          padding="4px 25px"
          borderRadius="5px"
          // handleClick={handleRefund}
        />
      </Stack>
    </Box>
  );
};

export default RefundableQuotaiton;
