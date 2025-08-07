/* eslint-disable react/prop-types */
import { Box } from '@mui/material';

const PaxCount = ({ reissuedPassengers = [] }) => {
  // Calculate counts for each passenger type
  const adultCount = reissuedPassengers.filter(
    (p) => p.passengerType === 'ADT' && p.status === 'PENDING_REISSUE'
  ).length;

  const infantCount = reissuedPassengers.filter(
    (p) => p.passengerType === 'INF' && p.status === 'PENDING_REISSUE'
  ).length;

  const childCount = reissuedPassengers.filter(
    (p) => p.passengerType.startsWith('C') && p.status === 'PENDING_REISSUE'
  ).length;

  return (
    <Box>
      Reissue Passenger:
      {` Adult: ${adultCount}`}
      {childCount > 0 && `, Child: ${childCount}`}
      {infantCount > 0 && `, Infant: ${infantCount}`}
    </Box>
  );
};

export default PaxCount;
