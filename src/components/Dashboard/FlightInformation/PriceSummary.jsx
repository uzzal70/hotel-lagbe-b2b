/* eslint-disable react/prop-types */
import { Box, Collapse, Stack, Typography } from '@mui/material';
import webpImport from '../../../assets/webpImport';
import { useState } from 'react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import commaNumber from 'comma-number';
import companyInfo from '../../../common/companyInfo';

const PriceSummary = ({
  data,
  adultCount,
  childCount,
  infantCount,
  totalSumofBaggage,
}) => {
  const priceBreakdown = data.priceBreakdown;
  const basePrcie = parseInt(data?.totalClientPrice || 0);
  const rewardPointCalculate = `+ ${parseInt(basePrcie * 0.01)}`;
  const [expand, setExpand] = useState({});
  const handleClick = (key) => {
    setExpand((prevExpand) => ({
      ...prevExpand,
      [key]: !prevExpand[key],
    }));
  };
  const totalPrice =
    parseFloat(totalSumofBaggage || 0) +
    parseFloat(data?.totalClientPrice || 0);

  const discount = parseFloat(Number(data?.commission) || 0).toFixed(2);
  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'var(--white)',
          mb: 2,
          borderRadius: '5px',
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            fontSize: { xs: 12, sm: 13 },
            color: 'var(--orengel)',
            bgcolor: 'var(--gray)',
            my: 1,
            py: 1,
            px: 2,
            fontWeight: 300,
          }}
        >
          <Box>Total Earned Reward Points</Box>
          <Box>{rewardPointCalculate}</Box>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            fontSize: { xs: 14, sm: 16 },
            color: 'var(--black)',
            bgcolor: 'var(--gray)',
            py: 1,
            px: 2,
            display: { xs: 'none', md: 'flex' },
          }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>Agent Price Summary</Box>
          <Stack direction="row" spacing={2}>
            <Stack direction="row" spacing={1}>
              <img src={webpImport.adult} alt="" style={{ height: 17 }} />
              <Typography sx={{ fontSize: 14, color: 'var(--secondary)' }}>
                {adultCount || 1}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <img
                src={webpImport.child}
                alt=""
                style={{ height: 15, marginTop: '1px' }}
              />
              <Typography sx={{ fontSize: 14, color: 'var(--secondary)' }}>
                {childCount || 0}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <img src={webpImport.infant} alt="" style={{ height: 10 }} />
              <Typography sx={{ fontSize: 14, color: 'var(--secondary)' }}>
                {infantCount || 0}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Box
          sx={{
            px: 2,
            pb: { xs: 1, md: 2 },
            pt: { md: 1 },
            bgcolor: 'var(--white)',
          }}
        >
          {priceBreakdown.map((item, index) => (
            <Box key={index}>
              <Stack
                direction="row"
                sx={{
                  fontSize: { xs: 12, md: 13 },
                  alignItems: 'center',
                  color: 'var(--primary)',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
                onClick={() => handleClick(item.passengerType)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Traveller {item.passengerCount} (
                  {item.passengerType === 'ADT'
                    ? 'Adult'
                    : item.passengerType === 'INF'
                    ? 'Infant'
                    : 'Child'}
                  )
                  <KeyboardArrowDownOutlinedIcon
                    sx={{
                      color: 'var(--primary)',
                      fontSize: 16,
                      transition: 'transform 0.3s ease-in-out',
                      transform: `rotate(${
                        expand[item.passengerType] ? 180 : 0
                      }deg)`,
                    }}
                  />
                </Box>
                <Box>
                  {commaNumber(Number(item.clientPrice).toFixed(2)) +
                    ` ${companyInfo.currencyType}`}{' '}
                </Box>
              </Stack>
              <Collapse in={expand[item.passengerType]}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{
                    fontSize: { xs: 12, md: 13 },
                    color: 'var(--secondary)',
                    py: 1,
                  }}
                >
                  <Box>
                    <Box>Base Price</Box>
                    <Box>Tax fee</Box>
                  </Box>
                  <Box>
                    <Box>
                      {commaNumber(
                        parseInt(item?.clientBasePrice || item?.basePrice)
                      )}{' '}
                      {companyInfo.currencyType}
                    </Box>
                    <Box>
                      {commaNumber(item.tax)} {companyInfo.currencyType}
                    </Box>
                  </Box>
                </Stack>
              </Collapse>
            </Box>
          ))}
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              fontSize: { xs: 12, md: 13 },
              color: 'var(--secondary)',
              pt: 1,
            }}
          >
            <Box>
              <Box>Discount</Box>
              <Box>Special Commision</Box>
              <Box>Service fee </Box>
              <Box>AIT & VAT</Box>
            </Box>
            <Box textAlign={'end'}>
              <Box>
                {discount || 0} {companyInfo.currencyType}
              </Box>
              <Box>
                {data?.extraCommission > 0 ? (
                  <>{commaNumber(data?.extraCommission || 0)}</>
                ) : (
                  0
                )}{' '}
                {companyInfo.currencyType}
              </Box>
              <Box>0.00 {companyInfo.currencyType}</Box>
              <Box>
                {parseFloat(data?.ait || 0)?.toFixed(2)}{' '}
                {companyInfo.currencyType}
              </Box>
            </Box>
          </Stack>
          {/* <Stack
            direction={'row'}
            sx={{
              bgcolor: 'var(--gray)',
              justifyContent: 'space-between',
              py: 0.2,
              fontSize: { xs: 12, md: 13 },
              color: 'var(--secondary)',
            }}
          >
            <Box>Baggage Fee</Box>
            <Box>{commaNumber(totalSumofBaggage || 0)} BDT</Box>
          </Stack> */}
        </Box>

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
          <Box>Total Payable (incl. All charges)</Box>
          <Box>
            {commaNumber(totalPrice?.toFixed(2))} {companyInfo.currencyType}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default PriceSummary;
