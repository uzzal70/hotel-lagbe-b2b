/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Divider,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import getAuthToken from './getAuthToken';
import moment from 'moment';
import { useState } from 'react';
import {
  useCreateItemMutation,
  useGetItemsQuery,
} from '../../redux/slices/apiSlice';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import Token from './Token';
import { useDispatch } from 'react-redux';
import { closeCreditModal } from '../../redux/slices/modalOpen';
import companyInfo from '../../common/companyInfo';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '6px',
  outline: 'none !important',
};

const CreditRequestModal = ({ creditModal, totalDueData, creditRefetch }) => {
  const [isDone, setIsDone] = useState(false);
  const [amount, setAmount] = useState('');
  const token = getAuthToken();
  const dispatch = useDispatch();
  const agentId = Token();
  const url = `/agent/creditRequestAvailability?agentId=${agentId}`;

  const {
    data: creditData,
    isLoading,
    error,
    refetch,
  } = useGetItemsQuery({ url: url });

  const handleCloseCreditModal = () => {
    dispatch(closeCreditModal({ modalName: 'creditModal' }));
    refetch();
    creditRefetch();
  };

  const currentTime = new Date();
  const time24hours = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000);
  const [createItem] = useCreateItemMutation();
  const handleRequest = async (e, type) => {
    e.preventDefault();
    try {
      setIsDone(true);
      const method = 'PATCH';
      let url = '';
      let successTitle = '';

      if (type === 'payCreditDue') {
        url = `/agent/payCreditDue?creditRequestId=${totalDueData?.creditRequestId}&agentId=${agentId}`;
        successTitle = 'Your pay credit due.';
      } else {
        url = `agent/creditRequest?agentId=${agentId}&amount=${
          amount || 0
        }&remarks=check credit`;
        successTitle = `Your request for emergency credit has been sent to the credit team. You will receive a response shortly.`;
      }

      const headers = {
        accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const result = await createItem({
        url,
        method,
        headers,
      });

      if (result?.data?.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: successTitle,
          showConfirmButton: true,
          confirmButtonColor: 'var(--primary)',
          customClass: {
            popup: 'custom-swal-popup',
          },
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result?.error?.data?.message || 'Something went wrong!', // improved error handling
          confirmButtonColor: 'var(--primary)',
          customClass: {
            popup: 'custom-swal-popup',
          },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong!',
        confirmButtonColor: 'var(--primary)',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
    } finally {
      setIsDone(false);
      handleCloseCreditModal();
      refetch();
      creditRefetch();
    }
  };

  return (
    <div>
      <Modal open={creditModal} onClose={() => handleCloseCreditModal()}>
        <Box
          sx={{
            ...style,
            width: { xs: '90%', sm: '60%', md: '400px' },
          }}
        >
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            sx={{
              bgcolor: 'var(--bgcolor)',
              px: 1,
              py: 1,
            }}
          >
            <Box
              sx={{
                color: 'var(--primary)',
                fontWeight: 400,
                fontSize: { xs: 14, md: 18 },
                display: 'flex',
                gap: 1,
                alignItems: 'center',
              }}
            >
              <AddCardOutlinedIcon
                sx={{
                  color: 'var(--disable)',
                }}
              />
              Emergency Credit Request
            </Box>
            <CloseIcon onClick={() => handleCloseCreditModal()} />
          </Stack>
          <Box
            sx={{
              p: 2,
            }}
          >
            {error?.data?.message ? (
              <Typography
                sx={{
                  fontSize: { xs: 12, md: 14 },
                  fontWeight: 400,
                  p: 2,
                }}
              >
                {error?.data?.message}
              </Typography>
            ) : (
              <>
                {totalDueData?.creditRequestStatus === 'DUE' ||
                totalDueData?.creditRequestStatus === 'OVER_DUE' ? (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: { xs: 14, md: 16 },
                        fontWeight: 400,
                        color: 'var(--primary)',
                      }}
                    >
                      Credit Amount:{' '}
                      <strong>{totalDueData?.creditDueAmount}</strong>
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: 12, md: 13 },
                        fontWeight: 400,
                        color: 'var(--primary)',
                        pt: 0.2,
                      }}
                    >
                      Due Date:{' '}
                      <strong>
                        {totalDueData?.creditRequestDueDate &&
                          moment(totalDueData?.creditRequestDueDate).format(
                            'ddd DD MMM YYYY hh:mm A'
                          )}
                      </strong>
                    </Typography>
                    <Box textAlign={'end'} mt={3}>
                      <Button
                        disabled={isDone}
                        sx={{
                          bgcolor: 'var(--yellow)',
                          color: 'var(--primary)',
                          textTransform: 'capitalize',
                          px: 5,
                          '&:hover': {
                            bgcolor: 'var(--yellow)',
                            color: 'var(--primary)',
                          },
                        }}
                        onClick={(e) => handleRequest(e, 'payCreditDue')}
                      >
                        {isDone ? 'Loading...' : 'Pay Due'}
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <>
                    <form onSubmit={handleRequest}>
                      <Typography
                        sx={{
                          fontSize: { xs: 14, md: 16 },
                          fontWeight: 400,
                          color: 'var(--primary)',
                        }}
                      >
                        Your eligible amount:{' '}
                        <strong style={{ color: 'var(--dark-green)' }}>
                          {creditData?.totalCreditAvailability}{' '}
                          {companyInfo?.currencyType}
                        </strong>
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: 12, md: 13 },
                          fontWeight: 400,
                          color: 'var(--primary)',
                          pb: 2,
                          pt: 0.2,
                        }}
                      >
                        Due Date:{' '}
                        <strong>
                          {time24hours &&
                            moment(time24hours).format(
                              'ddd DD MMM YYYY hh:mm A'
                            )}
                        </strong>
                      </Typography>

                      <Box mb={1}>
                        <TextField
                          label="Enter Required Credit amount"
                          name="amount"
                          fullWidth
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                          InputLabelProps={{
                            style: {
                              color: 'var(--placeholder)',
                            },
                          }}
                          size="small"
                        />
                      </Box>

                      <Box textAlign={'end'}>
                        <Button
                          type="submit"
                          disabled={isDone}
                          sx={{
                            bgcolor: 'var(--primary)',
                            color: 'var(--white)',
                            textTransform: 'capitalize',
                            px: 5,
                            '&:hover': {
                              bgcolor: 'var(--primary)',
                              color: 'var(--white)',
                            },
                          }}
                        >
                          {isDone ? 'Loading...' : 'Request'}
                        </Button>
                      </Box>
                    </form>
                  </>
                )}
              </>
            )}
          </Box>
          <Box
            sx={{
              px: 1,
              color: 'var(--red)',
              fontSize: 12,
              fontWeight: 300,
              pb: 1,
              textAlign: 'center',
            }}
          >
            <Divider />
            *If credit isn’t paid on time, future tickets will be auto-refunded
            to cover the balance.
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CreditRequestModal;
