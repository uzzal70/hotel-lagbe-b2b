/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { Box, Grid, Stack } from '@mui/material';
import CustomTable from '../../Common/Table/CustomTable';

const CustomerFare = ({
  data,
  totalPrice,
  ait,
  discount,
  currency,
  allData,
}) => {
  const result = data || [];
  const columns = [
    {
      Header: 'Pax Type',
      accessor: 'passengerType',
      Cell: (row) => {
        return <Box>{paxDefined(row.value)}</Box>;
      },
    },
    {
      Header: 'Base Fare',
      accessor: 'basePrice',
      Cell: (row) => {
        return <Box>{row.value}</Box>;
      },
    },
    {
      Header: 'Tax',
      accessor: 'tax',
      Cell: (row) => {
        return <Box>{row.value}</Box>;
      },
    },
    {
      Header: 'Service Fee',
      accessor: 'otherCharges',
      Cell: (row) => {
        return <Box>{row.value || 0}</Box>;
      },
    },
    {
      Header: 'Discount',
      accessor: 'discount',
      Cell: (row) => {
        return (
          <Box>
            {row.value > 0 ? '—' : ''}&nbsp;{row.value || 0}
          </Box>
        );
      },
    },
    {
      Header: 'Pax Count',
      accessor: 'count',
      Cell: (row) => {
        return (
          <Box>
            {row?.row?.original?.passengerType === 'ADT'
              ? allData?.adultCount
              : row?.row?.original?.passengerType === 'INF'
              ? allData?.infantCount
              : allData?.childCount}
          </Box>
        );
      },
    },
    {
      Header: 'Amount',
      accessor: 'totalPrice',
      Cell: (row) => {
        const { basePrice, discount, otherCharges, tax } = row?.row?.original;
        return (
          <Box>
            {row?.row?.original?.passengerType === 'ADT'
              ? calculatePaxTotal(
                  allData?.adultCount,
                  basePrice,
                  tax,
                  discount,
                  otherCharges
                )
              : row?.row?.original?.passengerType === 'INF'
              ? calculatePaxTotal(
                  allData?.infantCount,
                  basePrice,
                  tax,
                  discount,
                  otherCharges
                )
              : calculatePaxTotal(
                  allData?.childCount,
                  basePrice,
                  tax,
                  discount,
                  otherCharges
                )}
          </Box>
        );
      },
    },
  ];

  const paxDefined = (code) => {
    const paxMap = {
      ADT: 'Adult',
      CNN: 'Child',
      INF: 'Infant',
    };
    return paxMap[code] || 'unknown';
  };

  const calculatePaxTotal = (count, bPrice, tPrice, dPrice, oPrice) => {
    const basePrice = parseFloat(bPrice) || 0;
    const tax = parseFloat(tPrice) || 0;
    const other = parseFloat(oPrice) || 0;
    const discount = parseFloat(dPrice) || 0;
    const totalPrice = count * (basePrice + tax + other - discount);
    return totalPrice.toFixed(2);
  };

  // function calculateTotalDiscount(data) {
  //   let totalDiscount = 0;
  //   data.forEach((passenger) => {
  //     if (passenger?.passengerType === 'ADT') {
  //       totalDiscount +=
  //         parseFloat(passenger.discount || 0) * parseInt(allData?.adultCount);
  //     } else if (passenger?.passengerType === 'CNN') {
  //       totalDiscount +=
  //         parseFloat(passenger.discount || 0) * parseInt(allData?.childCount);
  //     } else if (passenger?.passengerType === 'INF') {
  //       totalDiscount +=
  //         parseFloat(passenger.discount || 0) * parseInt(allData?.infantCount);
  //     }
  //   });
  //   return totalDiscount.toFixed(2);
  // }

  return (
    <Box>
      <CustomTable
        columns={columns}
        data={result}
        display="none"
        bgcolor="var(--bgcolor)"
        border="1px solid"
      />
      <Grid container justifyContent="flex-end">
        <Grid item xs={12} sm={6} md={4} lg={3} px={1}>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
            <Box
              sx={{ fontSize: 12, fontWeight: 400, color: 'var(--secondary)' }}
            >
              <Box sx={{ fontWeight: 500 }}>Traveler</Box>
              <Box>Total Discount</Box>
              <Box>Total AIT VAT</Box>
            </Box>
            <Box
              sx={{
                fontSize: 12,
                fontWeight: 400,
                textAlign: 'end',
                color: 'var(--secondary)',
              }}
            >
              <Box sx={{ fontWeight: 500 }}>
                {allData?.adultCount +
                  allData?.childCount +
                  allData?.infantCount}{' '}
                Pax
              </Box>
              <Box>
                {'—'}&nbsp;
                {discount}
              </Box>
              <Box>{ait || 0.0}</Box>
            </Box>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              borderTop: '1px solid var(--bgcolor)',
              mt: 1,
              pt: 0.4,
              fontWeight: 500,
              fontSize: 14,
              color: 'var(--secondary)',
            }}
          >
            <Box>Total Customer Payable</Box>
            <Box>
              {currency}&nbsp;
              {`${(Number(totalPrice) + Number(ait || 0)).toFixed(2)}`}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerFare;
