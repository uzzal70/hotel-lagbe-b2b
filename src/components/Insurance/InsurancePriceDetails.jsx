/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
const formatFieldName = (fieldName) => {
  return fieldName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
const DetailRow = ({ label, value, isBold = false }) => (
  <Grid container spacing={1}>
    <Grid item xs={6}>
      <Typography
        fontWeight={isBold ? 'bold' : 'normal'}
        sx={{
          color: 'var(--primary)',
          fontSize: 14,
        }}
      >
        {label}
      </Typography>
    </Grid>
    <Grid item xs={6} textAlign="right">
      <Typography
        fontWeight={isBold ? 'bold' : 'normal'}
        sx={{
          color: 'var(--primary)',
          fontSize: 14,
        }}
      >
        {value}
      </Typography>
    </Grid>
  </Grid>
);
const InsurancePriceDetails = ({ body, data, handleInformation }) => {
  const items = {
    sumInsured: { label: 'Sum Insured', value: 'US$50,000' },
    premium: {
      label: 'Premium',
      value: data?.gross_premium,
      isBold: true,
    },
    policyDetails: [
      { label: 'Policy Duration (Days)', value: body?.days },
      { label: 'Date Of Birth', value: body?.date_of_birth },
      { label: 'Date Of Travel', value: body?.date_of_travel },
      {
        label: 'Calculated Age',
        value: data?.breakdown?.[8]?.detail,
      },
      {
        label: 'OMC Type',
        value: formatFieldName(body?.travel_purpose),
      },
      {
        label: 'Countries',
        value: body?.countries,
      },
    ],
    netPremium: {
      label: 'Net Premium',
      value: data?.net_premium,
    },
    grandTotal: {
      label: 'Grand Total',
      value: parseFloat(data?.priceAfterDiscount).toFixed(2),
      isBold: true,
    },
    discount: {
      label: 'Discount',
      value: `- ${parseFloat(data?.discount).toFixed(2)}`,
      isBold: true,
    },
  };

  return (
    <Box
      sx={{
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        borderRadius: 1,
      }}
    >
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom>
          Price Details
        </Typography>

        <Divider sx={{ my: 1 }} />

        {items.policyDetails.map((detail, index) => (
          <DetailRow key={index} label={detail.label} value={detail.value} />
        ))}

        <Divider sx={{ my: 1 }} />

        <DetailRow
          label={items.premium.label}
          value={items.premium.value}
          isBold={items.premium.isBold}
        />

        <DetailRow
          label={items.discount.label}
          value={items.discount.value}
          isBold={items.grandTotal.isBold}
        />
        <Divider sx={{ my: 0.5 }} />
        <DetailRow
          label={items.grandTotal.label}
          value={items.grandTotal.value}
          isBold={items.grandTotal.isBold}
        />
        {handleInformation && (
          <Button
            size="small"
            sx={{
              mt: 2,
              color: 'var(--white)',
              bgcolor: 'var(--primary)',
              '&:hover': {
                bgcolor: 'var(--primary)',
              },
            }}
            fullWidth
            onClick={() => handleInformation()}
          >
            Next
          </Button>
        )}
      </CardContent>
    </Box>
  );
};

export default InsurancePriceDetails;
