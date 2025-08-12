/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import './PriceBreakdown.css';
import CloseIcon from '@mui/icons-material/Close';
import commaNumber from 'comma-number';
import companyInfo from '../../../../common/companyInfo';

const formatPrice = (value, quantity = 1, decimals = 1) => {
  const num = parseFloat(value || 0) * parseFloat(quantity || 1);
  const rounded = parseFloat(num.toFixed(decimals)); // removes trailing .0
  return `${commaNumber(rounded)} ${companyInfo?.currencyCode}`;
};

const PriceBreakdown = ({
  data,
  handleClose,
  totalClientPrice,
  grossTotalPrice,
  ait,
  extraCommission,
}) => {
  const totalDiffGross = totalClientPrice < grossTotalPrice;
  // console.log(gds);
  return (
    <Box>
      <Box>
        <Typography
          sx={{
            color: 'var(--black)',
            fontWeight: 400,
            fontSize: 16,
            textAlign: 'left',
            p: '7px 15px',
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'space-between',
            bgcolor: 'var(--bgcolor)',
            overflow: 'hidden',
          }}
        >
          <span>Price Breakdown</span>{' '}
          <CloseIcon
            sx={{ color: 'var(--stroke)', cursor: 'pointer' }}
            onClick={() => handleClose()}
          />
        </Typography>
        {totalDiffGross && (
          <Box>
            <Typography
              sx={{
                color: 'var(--secondary)',
                fontWeight: 400,
                fontSize: 14,
                textAlign: 'left',
                pt: { xs: 0, md: 2 },
                px: 2,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              Total Payable (Client){' '}
              <span>
                {companyInfo.currencyType}&nbsp;{commaNumber(grossTotalPrice)}
              </span>
            </Typography>
            <Box
              className="table-container-price"
              sx={{
                padding: '8px 16px 16px 16px',
                tr: {
                  textAlign: 'center',
                },
                th: {
                  color: 'var(--black)',
                  fontWeight: 300,
                  fontSize: { xs: 11, md: 13 },
                  p: 0.7,
                },
                td: {
                  color: 'var(--secondary)',
                  fontWeight: 300,
                  fontSize: { xs: 11, md: 13 },
                  p: 0.7,
                },
              }}
            >
              <table className="custom-table-price">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Base</th>
                    <th>Taxes</th>
                    <th>Total Fare</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.passengerType === 'ADT'
                          ? 'Adult '
                          : item.passengerType === 'INF'
                          ? 'Infant '
                          : 'Child '}
                        ( {item.passengerCount} )
                      </td>
                      <td>
                        {formatPrice(item.basePrice, item.passengerCount)}{' '}
                      </td>
                      <td>{formatPrice(item.tax, item.passengerCount)} </td>
                      <td>
                        {formatPrice(item.totalPrice, item.passengerCount)}{' '}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Box>
        )}

        <Typography
          sx={{
            color: 'var(--secondary)',
            fontWeight: 400,
            fontSize: 14,
            textAlign: 'left',
            pt: { xs: 0, md: 1 },
            px: 2,
          }}
        >
          Total Payable (Agent)
        </Typography>
        <Box
          className="table-container-price"
          sx={{
            padding: '8px 16px 16px 16px',
            tr: {
              textAlign: 'center',
            },
            th: {
              color: 'var(--black)',
              fontWeight: 300,
              fontSize: { xs: 11, md: 13 },
              p: 0.7,
            },
            td: {
              color: 'var(--secondary)',
              fontWeight: 300,
              fontSize: { xs: 11, md: 13 },
              p: 0.7,
            },
          }}
        >
          <table className="custom-table-price">
            <thead>
              <tr>
                <th>Type</th>
                <th>Base</th>
                <th>Taxes</th>
                <th>Total Fare</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.passengerType === 'ADT'
                      ? 'Adult '
                      : item.passengerType === 'INF'
                      ? 'Infant '
                      : 'Child '}
                    ( {item.passengerCount} )
                  </td>

                  <td>
                    {formatPrice(
                      item.clientBasePrice || item.basePrice,
                      item.passengerCount
                    )}{' '}
                  </td>
                  <td>{formatPrice(item.tax, item.passengerCount)} </td>
                  <td>{formatPrice(item.clientPrice, item.passengerCount)} </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Box sx={{ color: 'var(--secondary)', mt: 1, fontSize: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              Commision&nbsp;
              <span style={{ fontWeight: 500 }}>
                {extraCommission > 0 ? (
                  <>
                    - {companyInfo.currencyType}&nbsp;
                    {commaNumber(extraCommission || 0)}
                  </>
                ) : (
                  0
                )}
              </span>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              Total AIT & VAT&nbsp;
              <span style={{ fontWeight: 500 }}>
                {companyInfo.currencyType}&nbsp;{commaNumber(ait || 0)}
              </span>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              Total agent payable &nbsp;
              <span style={{ fontWeight: 500 }}>
                {companyInfo.currencyType}&nbsp;{commaNumber(totalClientPrice)}
              </span>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PriceBreakdown;
