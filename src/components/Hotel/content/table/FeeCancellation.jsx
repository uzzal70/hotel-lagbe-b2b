/* eslint-disable react/prop-types */
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';
import React from 'react';
import hotel from '../../../../assets/images/hotel';
import companyInfo from '../../../../common/companyInfo';

const formatDateTime = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.toLocaleString('en-GB', { day: '2-digit' });
  const month = date.toLocaleString('en-GB', { month: 'short' });
  const time = date.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return `${day} ${month}, ${time}`;
};

const formatFullDateTime = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.toLocaleString('en-GB', { day: '2-digit' });
  const month = date.toLocaleString('en-GB', { month: 'short' });
  const year = String(date.getFullYear()).slice(-2);
  const time = date.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return `${day} ${month} ${year}, ${time}`;
};

const FeeCancellation = ({ rules, item, lastRule, firstRule, rulesText }) => {

    const renderProgressBar = () => (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 30,
        backgroundColor: '#F98A17',
        borderRadius: '18px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        p: 1,
      }}
    >
      {item?.refundable === true ? (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '65%',
            height: '100%',
            backgroundColor: '#00A19D',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ color: '#fff', fontSize: { xs: 9, md: 12 } }}>
            100% Refund
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ color: '#fff', fontSize: { xs: 9, md: 12 } }}>
            Non Refundable
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          position: 'absolute',
          left: '80%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontSize: { xs: 9, md: 12 },
          display: item?.refundable === true ? 'block' : 'none',
        }}
      >
        Non Refundable
      </Box>

      <Box sx={{ position: 'absolute', left: 7, top: 5 }}>
        <img src={hotel.circle} alt="" width={20} />
      </Box>
      <Box sx={{ position: 'absolute', right: 7, top: 5 }}>
        <img src={hotel.circle} alt="" width={20} />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ width: { xs: '100%', sm: '80%', md: '500px' }, mx: 'auto' }}>
      <Typography
        sx={{ fontSize: { xs: 12, md: 18 }, color: 'var(--primary)', mb: 1 }}
      >
        Cancellation Policy
      </Typography>

      {renderProgressBar()}

      {/* Timeline */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
        <Box
          sx={{
            width: '65%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{ fontSize: { xs: 9, md: 11 }, color: 'var(--green-light)' }}
          >
            Now
          </Typography>
          {item?.refundable === true && (
            <Typography
              sx={{ fontSize: { xs: 9, md: 11 }, color: 'var(--green-light)' }}
            >
              {formatDateTime(firstRule)}
            </Typography>
          )}
        </Box>
        <Typography
          sx={{ fontSize: { xs: 9, md: 11 }, color: 'var(--green-light)' }}
        >
          {formatDateTime(lastRule)}
        </Typography>
      </Box>

      {/* Notes */}
      {item?.refundable === true && (
        <Typography
          sx={{
            color: 'var(--green-light)',
            fontSize: { xs: 11, md: 13 },
            mt: 2,
          }}
        >
          Free Cancellation, if you cancel this booking before{' '}
          {formatFullDateTime(firstRule)}.
        </Typography>
      )}
      <Typography
        sx={{ fontSize: { xs: 11, md: 13 }, color: 'var(--black)', mt: 1 }}
      >
        Cancellations post that will be subject to a fee as follows:
      </Typography>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 1.5, mb: 2 }}>
        <Table size="small" sx={{ border: '1px solid #ccc' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'var(--table-header)' }}>
              <TableCell
                sx={{ border: '1px solid #ccc', fontSize: 11, p: '6px' }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{ border: '1px solid #ccc', fontSize: 11, p: '6px' }}
              >
                Cancellation Charge
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rules.map((rule, idx) => (
              <TableRow key={idx}>
                <TableCell
                  sx={{ fontSize: 11, p: '6px', border: '1px solid #ccc' }}
                >
                  {formatDateTime(rule.start)} - {formatDateTime(rule.end)}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 11, p: '6px', border: '1px solid #ccc' }}
                >
                  {rule.estimatedValue
                    ? `${companyInfo.currencyCode} ${rule.estimatedValue}`
                    : 'Free'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer Notes */}
      {/* <Typography
        sx={{ fontSize: { xs: 11, md: 13 }, color: 'var(--black)', mb: 0.5 }}
      >
        Cancellations are only allowed before the check-in time and date. All
        time mentioned above is in Destination Time.
      </Typography> */}
      <Typography
        sx={{ fontSize: { xs: 11, md: 13 }, color: 'var(--orengel)' }}
      >
        {rulesText === undefined ? '' : rulesText}
      </Typography>
    </Box>
  );
};

export default FeeCancellation;
