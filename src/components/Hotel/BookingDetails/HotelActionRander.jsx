/* eslint-disable react/prop-types */
import { Alert, Box, Button, Grid } from '@mui/material';
import { handlHotelReqBody } from '../../Helper/handlHotelReqBody';
import { useHotelActionPostMutation } from '../../../redux/slices/hotel/hotelApiSlice';
import CommonBackdrop from '../../../common/CommonBackdrop';
import Token from '../../Common/Token';
import {
  BOOKING_CONFIRMED,
  REFUND_IN_PROGRESS,
  REFUND_QUOTE_APPROVED,
  REFUND_REQUESTED,
} from '../../Utils/hotel/hotel';
import { useParams } from 'react-router-dom';

const HotelActionRander = ({ refetch, refetch1, data }) => {
  const agentId = Token();
  const { id } = useParams();
  const [hotelActionPost, { isLoading, error }] = useHotelActionPostMutation();

  const status = data?.tfStatus;
  const bookingId = data?.id;
  const refundId = data?.refundId;
  const dateChangeId = data?.dateChangeId;
  const finalFare = data?.guestRoomAllocations?.finalFare;
  const refunded = data?.guestRoomAllocations?.refundable === true;

  const param = `agent-hotel/refundRequest`;

  const bodyData = {
    bookingId: id,
    userId: agentId,
    hotelFare: finalFare,
    remarks: '',
  };
  const hanldeRefund = () => {
    handlHotelReqBody({
      param,
      bodyData,
      hotelActionPost,
      refetch,
      refetch1,
      error,
      actionType: 'YES',
    });
  };

  const renderRefundButtons = () => {
    if (status !== BOOKING_CONFIRMED) return null;
    return (
      <Grid container spacing={1}>
        <Grid item>
          <Button
            sx={{
              py: 0.5,
              px: 2,
              fontSize: { xs: 10, md: 12 },
              backgroundColor: 'var(--orengel)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'var(--orengel)', // same as default
              },
            }}
            onClick={hanldeRefund}
          >
            Refund Request
          </Button>
        </Grid>
      </Grid>
    );
  };

  // const renderDateChangeButtons = () => {
  //   if (status === "Agnet") return null;
  //   return (
  //     <Grid container spacing={1}>
  //       <Grid item>
  //         <Button
  //           sx={{
  //             py: 0.5,
  //             px: 2,
  //             fontSize: { xs: 10, md: 12 },
  //             backgroundColor: 'var(--orengel)',
  //             color: 'white',
  //           }}
  //           onClick={hanldeRefund}
  //         >
  //           Refund Request
  //         </Button>
  //       </Grid>

  //       <Grid item>
  //         <Button
  //           sx={{
  //             py: 0.5,
  //             px: 2,
  //             fontSize: { xs: 10, md: 12 },
  //             backgroundColor: 'var(--orengel)',
  //             color: 'white',
  //           }}
  //           onClick={hanldeRefund}
  //         >
  //           Date Change
  //         </Button>
  //       </Grid>
  //     </Grid>
  //   );
  // };

  const renderAgentNotice = (fontSize = 10) =>
    (status === REFUND_REQUESTED ||
      status === REFUND_IN_PROGRESS ||
      status === REFUND_QUOTE_APPROVED ||
      status === REFUND_IN_PROGRESS) && (
      <Alert
        severity="warning"
        className="primary"
        sx={{
          fontSize,
          mb: { xs: 0, md: 1 },
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          py: 0,
        }}
      >
        Pending Approval from Admin
      </Alert>
    );

  const renderButtons = () => <>{renderRefundButtons()}</>;

  return (
    <Box mb={1.5} width={'100%'}>
      {refunded ? 'refunded' : 'non-refunded'}
      {` :-: `}
      {status}
      {/* Desktop View */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Grid container width={'100%'}>
          <Grid item mb={1} bgcolor="white">
            {renderButtons()}
          </Grid>

          <Grid item mb={1}>
            {renderAgentNotice(12)}
          </Grid>
        </Grid>
      </Box>

      {/* Mobile View */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          bgcolor: 'var(--gray)',
          borderTop: '1px solid black',
          color: 'white',
          fontSize: 12,
          py: 1,
          px: 1,
          zIndex: 1300,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box className="primary">Modification</Box>
          <Box>{renderButtons()}</Box>
        </Box>
        {renderAgentNotice(10)}
      </Box>
      <CommonBackdrop handleClose={!isLoading} open={isLoading} />
    </Box>
  );
};

export default HotelActionRander;
