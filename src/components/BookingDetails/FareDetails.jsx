/* eslint-disable react/prop-types */
import { Box, Grid, Stack } from '@mui/material';
import CustomTable from '../Common/Table/CustomTable';
import commaNumber from 'comma-number';
import FareDetailsPhone from './FareDetailsPhone';
import { useState, useEffect } from 'react';
import companyInfo from '../../common/companyInfo';

const costFields = [
  'otherCost',
  'extraMealCost',
  'fareDifference',
  'extraBaggageCost',
];

const FareDetails = ({ data, allData, agent }) => {
  const columns = [
    {
      Header: 'Pax Type',
      accessor: 'passengerType',
      Cell: (row) => {
        return <Box>{paxDefined(row.value[0])}</Box>;
      },
    },
    {
      Header: 'Base Fare',
      accessor: 'basePrice',
      Cell: (row) => {
        return <Box>{commaNumber(row?.value || 0)}</Box>;
      },
    },
    {
      Header: 'Tax',
      accessor: 'tax',
      Cell: (row) => {
        return <Box>{commaNumber(row.value || 0)}</Box>;
      },
    },
    {
      Header: 'Service Fee',
      accessor: 'otherCharges',
      Cell: (row) => {
        return <Box>{commaNumber(row.value || 0)}</Box>;
      },
    },
    {
      Header: 'Discount',
      accessor: 'discount',
      Cell: (row) => {
        return (
          <Box>
            {agent
              ? `${row.value > 0 ? '— ' : ''}
            ${commaNumber(row.value || 0)}`
              : 0}
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
        // const totalPrice = row?.row?.original?.totalPrice;
        const discount = row?.row?.original?.discount;
        return (
          <Box>
            {agent ? (
              <>
                {row?.row?.original?.passengerType === 'ADT'
                  ? commaNumber(
                      allData?.adultCount * parseInt(row.value || 0) -
                        allData?.adultCount * parseInt(discount || 0)
                    )
                  : row?.row?.original?.passengerType === 'INF'
                  ? commaNumber(
                      allData?.infantCount * parseInt(row.value) -
                        allData?.infantCount * parseInt(discount || 0)
                    )
                  : commaNumber(
                      allData?.childCount * parseInt(row.value) -
                        allData?.childCount * parseInt(discount || 0)
                    )}
              </>
            ) : (
              <>
                {row?.row?.original?.passengerType === 'ADT'
                  ? commaNumber(allData?.adultCount * parseInt(row.value || 0))
                  : row?.row?.original?.passengerType === 'INF'
                  ? commaNumber(allData?.infantCount * parseInt(row.value))
                  : commaNumber(allData?.childCount * parseInt(row.value))}
              </>
            )}
          </Box>
        );
      },
    },
  ];

  const adtObject =
    data?.find((item) => item?.passengerType[0] === 'A') || null;
  const cnnObject =
    data?.find((item) => item?.passengerType[0] === 'C') || null;
  const infObject =
    data?.find((item) => item?.passengerType[0] === 'I') || null;
  const result = [adtObject, cnnObject, infObject]?.filter(Boolean);

  const paxDefined = (code) => {
    const paxMap = {
      A: 'Adult',
      C: 'Child',
      I: 'Infant',
    };
    return paxMap[code] || 'unknown';
  };

  const paxCount =
    allData?.adultCount + allData?.childCount + allData?.infantCount || 1;

  const adultDiscount =
    parseInt(allData?.adultCount) * parseInt(adtObject?.discount);
  const childDiscount =
    parseInt(allData?.childCount || 0) * parseInt(cnnObject?.discount || 0);
  const infantDiscount =
    parseInt(allData?.infantCount || 0) * parseInt(infObject?.discount || 0);
  const totalDiscount = adultDiscount + childDiscount + infantDiscount;
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const total = data?.reduce((acc, passenger) => {
      let passengerTotal = 0;

      costFields.forEach((field) => {
        passengerTotal += parseFloat(passenger[field]) || 0;
      });

      return acc + passengerTotal;
    }, 0);

    setTotalCost(total);
  }, [data, costFields]);
  return (
    <Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <CustomTable
          columns={columns}
          data={result}
          display="none"
          bgcolor="var(--bgcolor)"
          border="1px solid"
        />
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <FareDetailsPhone data={result} allData={allData} agent={agent} />
      </Box>
      <Grid container justifyContent="flex-end">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              mt: { xs: 1, md: 2 },
              boxShadow: {
                xs: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                md: 'none',
              },
              p: { xs: 2, md: 0 },
              borderRadius: 1,
            }}
          >
            <Box
              sx={{ fontSize: 12, fontWeight: 400, color: 'var(--secondary)' }}
            >
              <Box sx={{ fontWeight: 500 }}>Traveler</Box>
              <Box>Total Discount</Box>
              <Box>Total AIT & VAT</Box>
              <Box>Extra Baggage / Meal </Box>
            </Box>
            <Box
              sx={{
                fontSize: 12,
                fontWeight: 400,
                textAlign: 'end',
                color: 'var(--secondary)',
              }}
            >
              <Box sx={{ fontWeight: 500 }}>{paxCount} Pax</Box>
              <Box>
                {agent
                  ? `${totalDiscount > 0 ? '— ' : ''}
                ${commaNumber(totalDiscount || 0)}`
                  : 0}
              </Box>
              <Box>{commaNumber(allData?.ait || 0)}</Box>
              <Box> {commaNumber(totalCost)}</Box> {/* Extra total cost */}
            </Box>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              borderTop: { xs: 'none', md: '1px solid var(--bgcolor)' },
              boxShadow: {
                xs: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                md: 'none',
              },
              mt: 1,
              mb: 1,
              pt: 1,
              pb: 1,
              px: { xs: 2, md: 1 },
              fontWeight: 500,
              borderRadius: 1,
              fontSize: 14,
              color: 'var(--secondary)',
            }}
          >
            <Box>
              {agent ? 'Total Agent Payable' : 'Total Customer Payable'}
            </Box>
            <Box>
              {companyInfo.currencyType}{' '}
              {commaNumber(
                agent
                  ? parseInt(allData?.totalClientPrice) + totalCost
                  : parseInt(allData?.grossTotalPrice || 0) +
                      parseInt(allData?.ait || 0) +
                      totalCost || 0
              )}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FareDetails;
