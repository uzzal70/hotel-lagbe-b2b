/* eslint-disable react/prop-types */
import { Alert } from '@mui/material';

const Remarks = ({ data }) => {
  return (
    <div>
      {data?.status === 'REISSUE_REJECTED' ? (
        <Alert
          sx={{
            width: 'fit-content',
            py: 0,
            mb: 1,
          }}
          severity="warning"
        >
          Remarks: {data?.reissueRemarks || ''}.
        </Alert>
      ) : data?.status === 'REFUND_REJECTED' ? (
        <Alert
          sx={{
            width: 'fit-content',
            py: 0,
            mb: 1,
          }}
          severity="warning"
        >
          Remarks: {data?.refundRemarks || ''}.
        </Alert>
      ) : data?.status === 'VOID_REJECTED' ? (
        <Alert
          sx={{
            width: 'fit-content',
            py: 0,
            mb: 1,
          }}
          severity="warning"
        >
          Remarks: {data?.voidRemarks || ''}.
        </Alert>
      ) : (
        ''
      )}
    </div>
  );
};

export default Remarks;
