import { Box, Stack } from '@mui/material';
import ImageImport from '../../../assets/ImageImport';
import companyInfo from '../../../common/companyInfo';

const PartialPaymentInfo = () => {
  return (
    <Box
      sx={{
        bgcolor: 'var(--white)',
        mb: 1,
        borderRadius: '5px',
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          fontSize: { xs: 14, sm: 16 },
          color: 'var(--black)',
          bgcolor: 'var(--gray)',
          py: 1,
          px: 2,
        }}
      >
        <img src={ImageImport.partiala} style={{ width: 25 }} />
        <Box>Partial Payment Available</Box>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          fontSize: { xs: 12, md: 13 },
          bgcolor: 'var(--white)',
          color: 'var(--secondary)',
          p: 2,
        }}
      >
        <Box>
          <Box>Minimum Payment</Box>
          <Box>Remaining Amount</Box>
        </Box>
        <Box>
          <Box>(add) {companyInfo.currencyType}</Box>
          <Box>(add) {companyInfo.currencyType}</Box>
        </Box>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          fontSize: { xs: 13, sm: 14 },
          color: 'var(--black)',
          bgcolor: 'var(--gray)',
          py: 1,
          px: 2,
        }}
      >
        <Box>Due Payment Date ---------</Box>
      </Stack>
    </Box>
  );
};

export default PartialPaymentInfo;
