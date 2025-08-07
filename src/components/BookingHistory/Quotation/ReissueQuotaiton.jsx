import { Box, Stack, Typography } from '@mui/material';
import CustomButton from '../../Common/CustomButton';

const ReissueQuotaiton = () => {
  return (
    <Box>
      <Box
        sx={{
          fontSize: 12,
          color: 'var(--white)',
          bgcolor: 'var(--primary)',
          borderRadius: '6px',
          pb: 2,
        }}
      >
        <Typography sx={{ color: 'var(--white)', fontSize: 16, p: 2 }}>
          Payment Information
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            fontSize: 12,
            color: 'var(--white)',
            p: 2,
            pt: 0,
          }}
        >
          <Box>
            <Box fontWeight={300}>Old Ticket Price</Box>
            <Box fontWeight={300}>New Ticket Price</Box>
            <Box sx={{ fontWeight: 300, pt: 1 }}>Airfare Differance</Box>
          </Box>
          <Box>
            <Box fontWeight={400}>45454 BDT</Box>
            <Box fontWeight={400}>45454 BDT</Box>
            <Box sx={{ fontWeight: 400, pt: 1 }}>-5656 BDT</Box>
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" p={2}>
          <Box>
            <Box fontWeight={300}>Airlines Fee</Box>
            <Box fontWeight={300}>Service Charge</Box>
          </Box>
          <Box>
            <Box fontWeight={400}>45454 BDT</Box>
            <Box fontWeight={400}>45454 BDT</Box>
          </Box>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            bgcolor: 'var(--white)',
            color: 'var(--primary)',
            p: 1.5,
            m: 2,
            borderRadius: '5px',
          }}
        >
          <Box>
            <Box fontWeight={400}>Agent Payable</Box>
          </Box>
          <Box>
            <Box fontWeight={400}>45454 BDT</Box>
          </Box>
        </Stack>
      </Box>
      <Box my={2} textAlign="center">
        <CustomButton
          fontSize={{ xs: 12, md: 14 }}
          value="Issue Now"
          textcolor="var(--white)"
          bgcolor="var(--primary)"
          hovercolor="var(--primary)"
          padding="5px 25px"
          borderRadius="5px"
          width="80%"
          // handleClick={handleRefund}
        />
      </Box>
    </Box>
  );
};

export default ReissueQuotaiton;
