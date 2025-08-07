import { Box, Button, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Token from '../Common/Token';
import getAuthToken from '../Common/getAuthToken';
import axios from 'axios';
import BackButton from '../Common/BackButton';
import TableLoader from '../Common/Table/TableLoader';
import ApiCustomTable from '../Common/Table/ApiCustomTable';
import RewardHistoryPhone from './RewardHistoryPhone';
import CustomPagination from '../Common/Table/CustomPagination';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useCreateItemMutation } from '../../redux/slices/apiSlice';
import Processoing from '../Common/Processoing';
import CustomSearchInput from '../Common/CustomSearchInput';
import { baseUrl } from '../../../baseurl';
import companyInfo from '../../common/companyInfo';
import HeaderTitle from '../../common/HeaderTitle';

const Reward = () => {
  const agentId = Token();
  const token = getAuthToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [isDone, setIsDone] = useState(true);
  const [searchWord, setSearchWord] = useState('');

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleDetails = (id, route) => {
    navigate(`${route}${id}`, {
      state: {
        id: id,
      },
    });
  };
  const columns = [
    {
      Header: 'Reference Id',
      accessor: 'bookingRef',

      Cell: (row) => {
        return (
          <Button
            variant="contained"
            size="small"
            sx={{
              boxShadow: 'none',
              bgcolor: 'var(--bgcolor)',
              color: 'var(--primary)',
              py: 0.2,
              fontSize: 12,
              ':hover': {
                bgcolor: 'var(--bgcolor)',
              },
              disabled: { bgcolor: 'red' },
            }}
            disabled={
              row?.row?.original?.id || row?.row?.original?.dataSimSaleId
                ? false
                : true
            }
            onClick={() => {
              const { id, dataSimSaleId } = row?.row?.original || {};
              const path = id
                ? '/dashboard/bookingdetails/'
                : '/dashboard/sim/order/';
              handleDetails(id || dataSimSaleId, path);
            }}
          >
            {row?.value ||
              row?.row?.original?.dataSimSaleRef ||
              row?.row?.original?.myAgentId ||
              '—'}
          </Button>
        );
      },
    },

    {
      Header: 'Paid Amount',
      accessor: 'clientPrice',
      Cell: (row) => {
        return (
          <Box>
            {row?.value ? `${row?.value} ${companyInfo.currencyType}` : '0'}
          </Box>
        );
      },
    },

    {
      Header: 'Reward Credit',
      accessor: 'rewardPointCredit',
      Cell: (row) => {
        return <Box>{row?.value ? `${row?.value} P` : '0'}</Box>;
      },
    },
    {
      Header: 'Reward Debit',
      accessor: 'rewardPointDebit',
      Cell: (row) => {
        return <Box>{row?.value ? `${row?.value} P` : '0'}</Box>;
      },
    },
    {
      Header: 'Credited amount',
      accessor: 'rewardValue',
      Cell: (row) => {
        return (
          <Box>
            {row?.value ? `${row?.value} ${companyInfo.currencyType}` : '0'}
          </Box>
        );
      },
    },
    {
      Header: 'Created At',
      accessor: 'rewardCreatedAt',
      Cell: (row) => {
        return (
          <Box>
            {moment(row?.value?.split('Z')[0]).format('DD MMM YYYY hh:mm A')}
          </Box>
        );
      },
    },
    // {
    //   Header: 'Type',
    //   accessor: 'tripType',
    //   Cell: (row) => {
    //     return (
    //       <Box textTransform={'capitalize'}>
    //         {row.value?.replace(/_/g, '').toLowerCase() || '—'}
    //       </Box>
    //     );
    //   },
    // },

    // {
    //   Header: 'PNR',
    //   accessor: 'pnr',
    //   Cell: (row) => {
    //     return <Box>{row?.value || '—'}</Box>;
    //   },
    // },
  ];

  const url = `${baseUrl}/core/agent/rewardHistory/${agentId}?page=${
    currentPage || 1
  }&PageSize=15&searchWord=${searchWord}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedData = response.data;
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refetch, searchWord]);

  const totalLength = data?.totalLength;
  const booking = data?.rewardHistory;

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage + 1);
    setLoading(true);
    setRefetch(!refetch);
    setLoading(false);
    window.scrollTo(0, 0);
  };

  const initiat = [];
  const [createItem] = useCreateItemMutation();
  const handleRewardToCredit = async () => {
    try {
      const isConfirmed = await Swal.fire({
        text:
          data?.totalReward >= 10000
            ? 'Are you sure you want to Redeem Rewards points?'
            : 'You can withdraw once you have a minimum of 10,000 reward points',
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: data?.totalReward >= 10000 ? true : false,
        confirmButtonColor: 'var(--primary)',
        cancelButtonColor: 'var(--crimson)',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Not Now',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });

      if (isConfirmed.value) {
        setIsDone(false);

        const method = 'PATCH';
        const url = `/agent/addCoinToBalance/${agentId}?coins=${
          data?.totalReward || 0
        }`;
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

        if (result?.data) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title:
              'Your reward points have been successfully converted and added to your account balance.',
            showConfirmButton: true,
            confirmButtonColor: 'var(--primary)',
            customClass: {
              popup: 'custom-swal-popup',
            },
          });
          setRefetch(!refetch);
        } else {
          throw new Error(
            result?.data?.message || result?.error?.data?.message
          );
        }
        setRefetch(!refetch);
      }
    } catch (error) {
      setIsDone(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error || 'Something went wrong!',
        confirmButtonColor: 'var(--primary)',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
    } finally {
      setIsDone(true);
    }
  };

  const handleChange = useCallback((event) => {
    setSearchWord(event.target.value);
  }, []);

  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        paddingBottom: {
          xs: 7,
          md: 1,
        },
      }}
    >
      <HeaderTitle headerTitle={'Reward History'} />
      <Box
        sx={{
          m: 2,
          p: { md: 3, xs: 0 },
          bgcolor: { xs: 'var(--body)', md: 'var(--white)' },
          borderRadius: '10px',
        }}
      >
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Box>
            <Typography
              sx={{
                color: 'var(--black)',
                fontSize: { xs: 16, sm: 20 },
                fontWeight: 500,
              }}
            >
              Recent Reward History{' '}
              {/* <span style={{ color: 'var(--primary)', fontSize: 12 }}>
                Total: {totalLength}
              </span> */}
            </Typography>
            <Box mt={1}>
              <CustomSearchInput
                width={{ xs: '200px', sm: '300px', md: '300px' }}
                name="bookingId"
                value={searchWord}
                placeholder="Enter Booking Id"
                onChange={handleChange}
              />
            </Box>
          </Box>

          <Box>
            <Box sx={{ fontSize: 12 }}>Total Points: {data?.totalReward}</Box>
            <Box
              sx={{
                background:
                  'linear-gradient(to right, #ec991d9c, #f1e06b, #e4c70f)',
                fontSize: 13,
                color: 'var(--primary)',
                px: 1,
                py: 0.2,
                borderRadius: '5px',
              }}
              onClick={handleRewardToCredit}
            >
              Redeem Rewards
            </Box>
          </Box>
        </Stack>

        {loading ? (
          <TableLoader row={13} cell={8} />
        ) : (
          <Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <ApiCustomTable
                columns={columns}
                data={booking || initiat}
                totalLength={totalLength}
                loading={loading}
                pageIndex={currentPage - 1}
                gotoPage={handlePageChange}
                canPreviousPage={currentPage > 1}
                previousPage={() => handlePageChange(currentPage - 1)}
                canNextPage={currentPage}
                nextPage={() => handlePageChange(currentPage)}
                pageList={15}
                textAlign="center"
              />
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <RewardHistoryPhone
                data={booking || initiat}
                handleDetails={handleDetails}
                name="Customer Price"
                name2="Agent Price"
              />
              <Box py={2}>
                <CustomPagination
                  pageIndex={currentPage - 1}
                  pageCount={Math.ceil(totalLength / 15)}
                  gotoPage={handlePageChange}
                  canPreviousPage={currentPage > 1}
                  canNextPage={currentPage}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      {!isDone && <Processoing content={'Processing your request...'} />}
    </Box>
  );
};
export default Reward;
