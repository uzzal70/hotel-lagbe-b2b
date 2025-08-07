/* eslint-disable react/prop-types */
import { Box, Grid, Stack } from '@mui/material';
import CustomTable from '../Common/Table/CustomTable';
import commaNumber from 'comma-number';

const RefundReissueVoidSummary = ({
  amount,
  penalty,
  service,
  text,
  useAmount,
  sign,
  reissuedFareDiff,
  textDiff,
}) => {
  const result = [
    {
      amount: amount || 0,
      penalty: penalty || 0,
      service: service || 0,
      useAmount: useAmount || 0,
      textDiff: textDiff || 0,
      reissuedFareDiff: reissuedFareDiff || 0,
    },
  ];
  const columns = [
    ...(reissuedFareDiff
      ? [
          {
            Header: 'Reissued Fare Difference Amount',
            accessor: 'reissuedFareDiff',
            Cell: (row) => {
              return (
                <Box>
                  {sign || ''} {commaNumber(row.value || 0)}{' '}
                  <span style={{ fontSize: 12 }}>BDT</span>
                </Box>
              );
            },
          },
        ]
      : []),
    ...(textDiff
      ? [
          {
            Header: 'Text Difference Amount',
            accessor: 'textDiff',
            Cell: (row) => {
              return (
                <Box>
                  {sign || ''} {commaNumber(row.value || 0)}{' '}
                  <span style={{ fontSize: 12 }}>BDT</span>
                </Box>
              );
            },
          },
        ]
      : []),
    ...(useAmount
      ? [
          {
            Header: 'Used Amount',
            accessor: 'useAmount',
            Cell: (row) => {
              return (
                <Box>
                  {sign || ''} {commaNumber(row.value || 0)}{' '}
                  <span style={{ fontSize: 12 }}>BDT</span>
                </Box>
              );
            },
          },
        ]
      : []),
    {
      Header: 'Service Charge',
      accessor: 'service',
      Cell: (row) => {
        return (
          <Box>
            {sign || ''} {commaNumber(row.value || 0)}{' '}
            <span style={{ fontSize: 12 }}>BDT</span>
          </Box>
        );
      },
    },
    {
      Header: 'Airlines Penalty',
      accessor: 'penalty',
      Cell: (row) => {
        return (
          <Box>
            {sign || ''} {commaNumber(row.value || 0)}{' '}
            <span style={{ fontSize: 12 }}>BDT</span>
          </Box>
        );
      },
    },
    {
      Header: `${text || 'Refund Amount'}`,
      accessor: 'amount',
      Cell: (row) => {
        return (
          <Box>
            {commaNumber(row.value || 0)}{' '}
            <span style={{ fontSize: 12 }}>BDT</span>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
      >
        <CustomTable
          columns={columns}
          data={result}
          display="none"
          bgcolor="var(--bgcolor)"
          border="1px solid"
        />
      </Box>
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <Grid container spacing={0.5}>
          {result?.map((item, i) => (
            <Grid item xs={12} sm={12} key={i}>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                  mt: 1,
                  boxShadow:
                    'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                  p: 2,
                  borderRadius: 1,
                }}
              >
                <Box
                  sx={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: 'var(--secondary)',
                  }}
                >
                  {useAmount ? <Box>Used Amount </Box> : null}
                  {reissuedFareDiff ? (
                    <Box>Reissued Fare Difference Amount </Box>
                  ) : null}
                  {textDiff ? <Box>Text Difference Amount </Box> : null}
                  <Box>Service Charge</Box>
                  <Box>Airlines Penalty</Box>
                  <Box>{text || 'Refund Amount'}</Box>
                </Box>
                <Box
                  sx={{
                    fontSize: 12,
                    fontWeight: 400,
                    textAlign: 'end',
                    color: 'var(--secondary)',
                  }}
                >
                  {useAmount ? (
                    <Box>
                      {sign || ''}
                      {commaNumber(item?.useAmount || 0)}
                    </Box>
                  ) : null}

                  {reissuedFareDiff ? (
                    <Box>
                      {sign || ''}
                      {commaNumber(item?.reissuedFareDiff || 0)}
                    </Box>
                  ) : null}

                  {textDiff ? (
                    <Box>
                      {sign || ''} {commaNumber(item?.textDiff || 0)}
                    </Box>
                  ) : null}

                  <Box>
                    {sign || ''}
                    {commaNumber(item?.service || 0)}
                  </Box>
                  <Box>
                    {sign || ''}
                    {commaNumber(item?.penalty || 0)}
                  </Box>
                  <Box>{commaNumber(item?.amount || 0)}</Box>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default RefundReissueVoidSummary;
