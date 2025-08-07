/* eslint-disable react/prop-types */
import { Alert, Box, Grid, Typography, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Token from '../../Common/Token';
import {
  useHotelActionPatchMutation,
  useHotelActionPostMutation,
} from '../../../redux/slices/hotel/hotelApiSlice';
import {
  BOOKING_CONFIRMED,
  DATE_CHANGED,
  REFUND_QUOTED,
  REFUND_COMPLETED,
  NAME_CHANGED,
  REFUND_REJECTED,
  REFUND_QUOTE_REJECTED,
  DATE_CHANGE_REJECTED,
  NAME_CHANGE_REQUEST_REJECTED,
  DATE_CHANGE_QUOTED,
} from '../../Utils/hotel/hotel';
import { handlHotelReqBody } from '../../Helper/handlHotelReqBody';
import { hanldeHotelAction } from '../../Helper/hanldeHotelAction';
import CommonBackdrop from '../../../common/CommonBackdrop';
import HotelDCRequest from '../BookingDetails/HotelDCRequest';
import { toast } from 'react-toastify';
import ThreadsModal from '../modal/ThreadsModal';
import { orange } from '@mui/material/colors';
import { useMediaQuery, useTheme } from '@mui/material';

const NeedModification = ({
  refetch,
  refetch1,
  refetch2,
  data,
  nights,
  onClick,
  onClick1,
}) => {
  const navigate = useNavigate();
  const agentId = Token();
  const { id } = useParams();
  const [hotelActionPost, { isLoading }] = useHotelActionPostMutation();
  const [hotelActionPatch, { isLoading: isPatch }] =
    useHotelActionPatchMutation();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [openRefQuote, setOpenRefQuote] = useState(false);
  const [openThreads, setOpenThreads] = useState(false);
  const status = data?.tfStatus;
  const refundId = data?.refundId;
  const dateChangeId = data?.dateChangeId;
  const finalFare = data?.guestRoomAllocations?.finalFare;
  const refunded = data?.guestRoomAllocations?.refundable;
  const checkinTime = new Date(data?.guestRoomAllocations?.checkIn).getTime();
  const isMoreThan36Hours = checkinTime - Date.now() >= 36 * 60 * 60 * 1000;

  const bodyData = {
    bookingId: id,
    userId: agentId,
    hotelFare: finalFare,
    remarks: '',
  };

  const actions = {
    refundRequest: () =>
      handlHotelReqBody({
        label: 'Refund Request',
        param: `agent-hotel/refundRequest`,
        bodyData,
        hotelActionPost,
        refetch,
        refetch1,
        refetch2,
      }),
    refundApprove: () =>
      hanldeHotelAction({
        param: `agent-hotel/refundQuotationApproval/${refundId}?bookingId=${id}&agentId=${agentId}&status=APPROVED`,
        hotelActionPatch,
        refetch,
        refetch1,
        refetch2,
        actionType: 'APPROVED',
      }),
    refundDecline: () =>
      hanldeHotelAction({
        param: `agent-hotel/refundQuotationApproval/${refundId}?bookingId=${id}&agentId=${agentId}&status=DECLINED`,
        hotelActionPatch,
        refetch,
        refetch1,
        refetch2,
        actionType: 'DECLINED',
      }),
    dateApprove: () =>
      hanldeHotelAction({
        param: `agent-hotel/hotelDateChangeQuotationApproval/${dateChangeId}?bookingId=${id}&agentId=${agentId}&status=APPROVED`,
        hotelActionPatch,
        refetch,
        refetch1,
        refetch2,
        actionType: 'APPROVED',
      }),
    dateDecline: () =>
      hanldeHotelAction({
        param: `agent-hotel/hotelDateChangeQuotationApproval/${dateChangeId}?bookingId=${id}&agentId=${agentId}&status=DECLINED`,
        hotelActionPatch,
        refetch,
        refetch1,
        refetch2,
        actionType: 'DECLINED',
      }),
  };

  const commonBtnStyles = {
    py: 0.5,
    px: 2,
    fontSize: { xs: 8, md: 10 },
    border: '1px solid',
  };

  const renderActions = () => {
    const actionButtons = [];

    if (
      [
        BOOKING_CONFIRMED,
        REFUND_REJECTED,
        REFUND_QUOTE_REJECTED,
        DATE_CHANGED,
        DATE_CHANGE_REJECTED,
        NAME_CHANGE_REQUEST_REJECTED,
        NAME_CHANGED,
      ].includes(status)
    ) {
      if (refunded) {
        actionButtons.push(
          <Grid item xs={6} key="refund">
            <Button
              fullWidth
              sx={{
                ...commonBtnStyles,
                backgroundColor: 'var(--primary)',
                '&:hover': {
                  backgroundColor: 'var(--primary)',
                },
                color: 'white',
              }}
              onClick={actions.refundRequest}
            >
              Refund Request
            </Button>
          </Grid>
        );
      }

      actionButtons.push(
        <Grid item xs={6} key="date">
          <Button
            fullWidth
            sx={{
              ...commonBtnStyles,
              backgroundColor: isMoreThan36Hours
                ? 'var(--orengel)'
                : orange[200],
              color: isMoreThan36Hours ? 'white' : orange[900],
              '&:hover': {
                backgroundColor: 'var(--orengel)',
              },
            }}
            onClick={() =>
              isMoreThan36Hours
                ? setOpenRefQuote(true)
                : toast.warning('Change allowed only 36+ hrs before check-in.')
            }
          >
            Date Change
          </Button>
        </Grid>
      );

      actionButtons.push(
        <Grid item xs={6} key="name">
          <Button
            fullWidth
            sx={{
              ...commonBtnStyles,
              backgroundColor: 'var(--green-light)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'var(--green-light)',
              },
            }}
            onClick={() => navigate('guest-name-change')}
          >
            Guest Name Change
          </Button>
        </Grid>
      );
    }

    if (status === REFUND_QUOTED) {
      actionButtons.push(
        <Grid item key="approve-quote">
          <Button
            sx={{
              ...commonBtnStyles,
              backgroundColor: 'green',
              color: 'white',
              '&:hover': {
                backgroundColor: 'var(--green)',
              },
            }}
            onClick={actions.refundApprove}
          >
            Approve Refund Quotation
          </Button>
        </Grid>,
        <Grid item key="decline-quote">
          <Button
            sx={{
              ...commonBtnStyles,
              backgroundColor: 'var(--red)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'var(--red)',
              },
            }}
            onClick={actions.refundDecline}
          >
            Reject
          </Button>
        </Grid>
      );
    }

    if (status === DATE_CHANGE_QUOTED) {
      actionButtons.push(
        <Grid item key="approve-date">
          <Button
            sx={{
              ...commonBtnStyles,
              backgroundColor: 'green',
              color: 'white',
              '&:hover': {
                backgroundColor: 'var(--green)',
              },
            }}
            onClick={actions.dateApprove}
          >
            Approve Quotation
          </Button>
        </Grid>,
        <Grid item key="decline-date">
          <Button
            sx={{
              ...commonBtnStyles,
              backgroundColor: 'var(--red)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'var(--red)',
              },
            }}
            onClick={actions.dateDecline}
          >
            Reject
          </Button>
        </Grid>
      );
    }

    return actionButtons;
  };

  const renderStatusNotice = () => {
    const processing = {
      REFUND_REQUESTED: 'Your refund is currently being processed.',
      REFUND_IN_PROGRESS: 'Your refund is currently being processed.',
      REFUND_QUOTED: 'Your refund is currently being processed.',
      REFUND_QUOTE_APPROVED: 'Your refund is currently being processed.',
      REFUND_PRELIMINARY_COMPLETED: 'Your refund is currently being processed.',
      DATE_CHANGE_REQUESTED: 'Your date change is currently being processed.',
      DATE_CHANGE_IN_PROGRESS: 'Your date change is currently being processed.',
      DATE_CHANGE_QUOTED: 'Your date change is currently being processed.',
      DATE_CHANGE_QUOTE_APPROVED:
        'Your date change is currently being processed.',
      NAME_CHANGE_REQUEST: 'Your name change is currently being processed.',
      NAME_CHANGE_IN_PROGRESS: 'Your name change is currently being processed.',
      DATE_CHANGE_REJECTED: 'Your date change has been rejected.',
      REFUND_REJECTED: 'Your refund has been rejected.',
      NAME_CHANGE_REQUEST_REJECTED: 'Your name change has been rejected.',
    };

    const msg = processing[status];
    if (!msg || status === BOOKING_CONFIRMED) return null;

    const severity = status.includes('REJECTED')
      ? 'error'
      : [REFUND_COMPLETED, DATE_CHANGED, NAME_CHANGED].includes(status)
      ? 'success'
      : 'warning';

    return (
      <Alert severity={severity} sx={{ fontSize: 12, my: 1 }}>
        {msg}
      </Alert>
    );
  };

  const renderCompleted = () => {
    if ([REFUND_COMPLETED, DATE_CHANGED, NAME_CHANGED].includes(status)) {
      const msg = {
        [REFUND_COMPLETED]: 'Refund is Completed',
        [DATE_CHANGED]: 'Date Change is Completed',
        [NAME_CHANGED]: 'Guest name change is Completed',
      };
      return (
        <Alert severity="success" sx={{ fontSize: 12, fontWeight: 600 }}>
          {msg[status]}
        </Alert>
      );
    }
    return null;
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          border: '1px solid #EAEAEB',
          mb: 2,
        }}
      >
        <Typography
          sx={{
            mb: 1,
            px: 2,
            py: 1,
            fontSize: { xs: 10, md: 13 },
            borderBottom: '1px solid var(--gray)',
            color: 'var(--primary)',
            borderRadius: '7px 7px 0px 0px',
          }}
          bgcolor="rgb(232, 230, 235)"
        >
          Modification
        </Typography>
        <Grid container spacing={0.5} px={2}>
          {renderActions()}
        </Grid>
        {renderStatusNotice()}
        {renderCompleted()}

        <Box
          sx={{
            mb: 1,
            px: 2,
            pb: 1,
            fontSize: { xs: 10, md: 13 },
            fontWeight: 600,
            borderBottom: '1px solid var(--gray)',
            color: 'var(--primary)',
            borderRadius: '7px 7px 0px 0px',
            mt: 0.7,
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Typography
            fontSize={13}
            fontWeight={400}
            color="var(--primary)"
            mb={0.5}
          >
            Support Request
          </Typography>
          <Button
            fullWidth
            sx={{
              ...commonBtnStyles,
              backgroundColor: 'var(--gray)',
              color: 'var(--primary)',
            }}
            onClick={isMdUp ? onClick : onClick1}
          >
            Get Chat Support
          </Button>
        </Box>
      </Box>

      <HotelDCRequest
        open={openRefQuote}
        close={() => setOpenRefQuote(false)}
        refetch={refetch}
        refetch1={refetch1}
        data={data}
        nights={nights}
      />
      <ThreadsModal
        open={openThreads}
        close={() => setOpenThreads(false)}
        data={data}
        refetch={[refetch, refetch1]}
      />
      <CommonBackdrop
        handleClose={!isLoading || !isPatch}
        open={isLoading || isPatch}
      />
    </>
  );
};

export default NeedModification;
