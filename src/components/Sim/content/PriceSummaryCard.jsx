import { Box, Typography, Divider, Button, Stack } from '@mui/material';
import hotel from '../../../assets/images/hotel';
import { useSelector } from 'react-redux';
import CustomCircularProgress from '../../Common/CustomCircularProgress';
import companyInfo from '../../../common/companyInfo';

const PriceSummaryCard = ({
  item,
  isLoading,
  no,
  netPriceInBDT,
  quantity,
  simCards,
}) => {
  // const simCards = useSelector((state) => state.simCards.count);

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 2,
      }}
      bgcolor="white"
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box variant="h6">
            <img src={hotel.eSim} alt="" />
          </Box>
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: 12, lg: 17 },
              color: 'var(--primary)',
              lineHeight: 1.2,
            }}
          >
            {item?.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: { xs: 10, lg: 11 }, color: 'var(--info)' }}
          >
            Validity: {item?.operatorTitle} days
          </Typography>
        </Box>
      </Stack>

      {/* Price Summary */}
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 500,
          fontSize: { xs: 10, lg: 15 },
          color: 'var(--primary)',
        }}
        gutterBottom
      >
        eSIM Price Summary
      </Typography>
      <Stack direction="row" justifyContent="space-between" mb={1}>
        <Typography
          variant="body1"
          sx={{ fontSize: { xs: 10, lg: 13 }, color: 'var(--primary)' }}
        >
          Per eSIM
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: { xs: 10, lg: 13 }, color: 'var(--primary)' }}
        >
          {companyInfo.currencyType}{' '}
          {parseFloat(netPriceInBDT || item?.netPrice)?.toFixed(2)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="body1"
          sx={{ fontSize: { xs: 10, lg: 13 }, color: 'var(--primary)' }}
        >
          {simCards || quantity} x{' '}
          {parseFloat(netPriceInBDT || item?.netPrice)?.toFixed(2)}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: { xs: 10, lg: 13 }, color: 'var(--primary)' }}
        >
          {companyInfo.currencyType}{' '}
          {(
            parseFloat(netPriceInBDT || item?.netPrice) * (simCards || 1) ||
            quantity ||
            1
          ).toFixed(2)}
        </Typography>
      </Stack>
      <Divider sx={{ mt: 1, mb: 0.5 }} />
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: 10, lg: 13.5 }, color: 'var(--primary)' }}
        >
          Sub-Total
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: 10, lg: 13.5 }, color: 'var(--primary)' }}
        >
          {companyInfo.currencyType}{' '}
          {(
            parseFloat(netPriceInBDT || item?.netPrice) * (simCards || 1) ||
            quantity ||
            1
          ).toFixed(2)}
        </Typography>
      </Stack>

      {/* Pay Now Button */}
      {!no && (
        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            backgroundColor: '#4a00e0',
            fontSize: { xs: 10, lg: 13 },
            '&:hover': { backgroundColor: '#3700b3' },
            color: '#fff',
            textTransform: 'none',
          }}
          disabled={isLoading}
        >
          <Stack direction="row" spacing={1}>
            {' '}
            Pay Now &nbsp; {isLoading && <CustomCircularProgress size={16} />}
          </Stack>
        </Button>
      )}
    </Box>
  );
};

export default PriceSummaryCard;
