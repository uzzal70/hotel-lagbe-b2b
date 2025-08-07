import { Box, Button, Collapse, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomSearchInput from '../../Common/CustomSearchInput';
import BackButton from '../../Common/BackButton';
import TableLoader from '../../Common/Table/TableLoader';
import moment from 'moment';
import ApiCustomTable from '../../Common/Table/ApiCustomTable';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';
import Token from '../../Common/Token';
import getAuthToken from '../../Common/getAuthToken';
import commaNumber from 'comma-number';
import CustomPagination from '../../Common/Table/CustomPagination';
import BookingHistoryPhone from '../BookingHistoryPhone';
import CustomTab from '../../Common/CustomTab';
import { baseUrl } from '../../../../baseurl';
import companyInfo from '../../../common/companyInfo';
import RefreshButton from '../../Common/RefreshButton';
import HeaderTitle from '../../../common/HeaderTitle';

const PartialPayment = () => {
  const agentId = Token();
  const token = getAuthToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [searchWord, setSearchWord] = useState({
    bookingId: '',
    searchWord: '',
    airline: '',
    status: '',
    mobileStatus: '',
  });
  const [tabsData, setTabsData] = useState('All');

  const tabButton = [
    { label: 'All', value: 'All' },
    { label: 'Paid', value: 'FULLY_PAID' },
    { label: 'Due', value: 'PARTIALLY_PAID' },
    { label: 'Refund', value: 'PARTIAL_REFUND_INITIATED' },
    { label: 'Payment Failed', value: 'PARTIAL_PAYMENT_FAILED' },
  ];

  const handleChangeTab = useCallback((newValue) => {
    setTabsData(newValue);
  }, []);

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  // const [booking, setBooking] = useState([]);
  const navigate = useNavigate();
  const handleDetails = (id, items) => {
    navigate(`/dashboard/bookingdetails/${id}`, {
      state: {
        id: id,
        data: items,
        path: 'partial',
      },
    });
  };
  const columns = [
    {
      Header: 'Booking Id',
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
            }}
            onClick={() =>
              handleDetails(row?.row?.original?.id, row?.row?.original)
            }
          >
            {row?.value || 'Booking ref'}
          </Button>
        );
      },
    },

    {
      Header: 'Customer Name',
      accessor: 'contactName',
      Cell: (row) => {
        return <Box>{row?.value?.toUpperCase() || 'Cutomer Name'}</Box>;
      },
    },

    {
      Header: 'Route',
      accessor: 'route',
    },
    // {
    //   Header: 'Type',
    //   accessor: 'tripType',
    //   Cell: (row) => {
    //     return (
    //       <Box textTransform={'capitalize'}>
    //         {row.value?.replace(/_/g, '').toLowerCase()}
    //       </Box>
    //     );
    //   },
    // },
    {
      Header: 'Payment Status',
      accessor: 'paymentStatus',
      Cell: (row) => {
        return (
          <Box
            textTransform={'capitalize'}
            className={`${row?.value?.toLowerCase()}-btn`}
          >
            {row.value?.replace(/_/g, ' ').toLowerCase()}
          </Box>
        );
      },
    },
    {
      Header: 'Paid Amount',
      accessor: 'paidAmount',
      Cell: (row) => {
        return (
          <Box>
            {commaNumber(row.value || 0)} {companyInfo.currencyType}
          </Box>
        );
      },
    },
    {
      Header: 'Due Amount',
      accessor: 'dueAmount',
      Cell: (row) => {
        return (
          <Box sx={{ color: row?.value > 0 ? 'var(--orengel)' : '' }}>
            {commaNumber(row.value || 0)} {companyInfo.currencyType}
          </Box>
        );
      },
    },

    {
      Header: 'Total Amount',
      accessor: 'totalClientPrice',
      Cell: (row) => {
        return (
          <Box>
            {row.value || 0} {companyInfo.currencyType}
          </Box>
        );
      },
    },

    {
      Header: 'Due Date',
      accessor: 'dueDate',
      Cell: (row) => {
        return (
          <Box>
            {moment(row?.value?.split('Z')[0]).format('DD MMM YYYY hh:mm A')}
          </Box>
        );
      },
    },

    {
      Header: 'PAX',
      accessor: 'adultCount',
      Cell: (row) => {
        return (
          <Box>
            {parseInt(row?.row?.original?.adultCount) +
              parseInt(row?.row?.original?.childCount) +
              parseInt(row?.row?.original?.infantCount) || '0'}
          </Box>
        );
      },
    },
    {
      Header: 'Airline',
      accessor: 'platingCareer',
      Cell: (row) => {
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={`https://tripfindy-logos.s3.ap-southeast-1.amazonaws.com/airlines/${row.value}.png`}
              style={{ width: '20px' }}
            />
            &nbsp;{row.value}
          </Box>
        );
      },
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: (row) => {
        return (
          <Box
            py={0.2}
            sx={{
              textTransform: 'capitalize',
              width: '90%',
              marginX: 'auto',
            }}
            className={`${row?.value?.toLowerCase()}`}
          >
            {row.value === 'BOOKING_HOLD'
              ? 'Hold'
              : row.value === 'MANUAL_TICKETED'
              ? 'Ticketed'
              : row?.value === 'PARTIAL_REFUND_INITIATED'
              ? 'Refund Initiated'
              : row.value?.replace(/_/g, ' ').toLowerCase()}
          </Box>
        );
      },
    },
  ];

  const url = `${baseUrl}/core/booking/findPaginatedPartialPayByAgentId/${agentId}?pageNumber=${
    searchWord?.status ? 1 : currentPage
  }&pageSize=15&status=${tabsData === 'All' ? '' : tabsData}&searchWord=${
    searchWord?.searchWord
  }`;

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
  }, [refetch, tabsData]);

  const totalLength = data?.totalLength;
  const totalDue = data?.totalDueAmount;
  const booking = data?.partialPays;

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage + 1);
    setLoading(true);
    setRefetch(!refetch);
    setLoading(false);
    window.scrollTo(0, 0);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchWord((prevSearchWord) => ({
      ...prevSearchWord,
      [name]: value,
    }));
  };
  const handleReset = () => {
    setRefetch(!refetch);
    setSearchWord({
      bookingId: '',
      searchWord: '',
      airline: '',
      status: '',
      mobileStatus: '',
    });
  };
  const handleSearch = async () => {
    setLoading(true);
    setRefetch(!refetch);
    setCurrentPage(1);
    setLoading(false);
  };
  const hadleOpen = () => {
    setOpen(!open);
  };
  const initiat = [];

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
      <HeaderTitle
        headerTitle={`Partial History`}
        loading={loading}
        setRefetch={setRefetch}
        setLoading={setLoading}
        showCustomButtons={false}
      />

      <Stack
        sx={{ px: { md: 2, xs: 2 }, pt: 2 }}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'left', md: 'center' }}
      >
        <CustomTab
          handleChange={handleChangeTab}
          data={tabsData}
          buttons={tabButton}
        />
        <Stack direction={'row'}>
          <Box
            sx={{
              fontSize: {
                xs: 10,
                sm: 12,
                md: 14,
                lg: 16,
              },
              color: 'var(--primary)',
              bgcolor: 'var(--orenge-light)',
              px: 1,
              py: 0.5,
              borderRadius: '5px',
              width: 'fit-content',
              mt: { xs: 1.5, md: 0 },
              ml: { xs: 0, md: 5 },
            }}
          >
            Partial Due: <strong>{totalDue || 0}</strong>{' '}
            {companyInfo.currencyCode}
          </Box>
          <Box
            sx={{
              fontSize: {
                xs: 10,
                sm: 12,
                md: 14,
                lg: 16,
              },
              color: 'var(--primary)',
              bgcolor: 'var(--sky)',
              px: 1,
              py: 0.5,
              borderRadius: '5px',
              width: 'fit-content',
              mt: { xs: 1.5, md: 0 },
              ml: { xs: 1, md: 1 },
            }}
          >
            Today Due: <strong> {data?.todayDue || 0}</strong>{' '}
            {companyInfo.currencyCode}{' '}
          </Box>
          <Box
            sx={{
              fontSize: {
                xs: 10,
                sm: 12,
                md: 14,
                lg: 16,
              },
              color: 'var(--white)',
              bgcolor: 'var(--red)',
              px: 1,
              py: 0.5,
              borderRadius: '5px',
              width: 'fit-content',
              mt: { xs: 1.5, md: 0 },
              ml: { xs: 1, md: 1 },
            }}
          >
            Over Due: <strong>{data?.overDueAmount || 0}</strong>{' '}
            {companyInfo.currencyCode}{' '}
          </Box>
        </Stack>
      </Stack>
      <Box
        sx={{
          m: 2,
          p: { md: 3, xs: 0 },
          bgcolor: { xs: 'var(--body)', md: 'var(--white)' },
          borderRadius: '10px',
        }}
      >
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography
            sx={{
              color: 'var(--black)',
              fontSize: { xs: 16, sm: 20 },
              fontWeight: 500,
            }}
          >
            Partial Issue Management{' '}
            <span style={{ color: 'var(--primary)', fontSize: 12 }}>
              Total: {totalLength}
            </span>
          </Typography>{' '}
          <Stack direction="row">
            <Button
              size="small"
              sx={{
                bgcolor: 'var(--primary)',
                color: 'var(--white)',
                textTransform: 'capitalize',
                ':hover': {
                  bgcolor: 'var(--primary)',
                },
              }}
              onClick={hadleOpen}
              startIcon={<FilterListIcon />}
            >
              More Filter
            </Button>
          </Stack>
        </Stack>
        <Collapse in={open}>
          <Box
            sx={{
              pb: 2,
            }}
          >
            <Grid
              container
              spacing={{ xs: 1, md: 2 }}
              alignItems="center"
              // justifyContent="end"
            >
              <Grid item>
                <CustomSearchInput
                  name="searchWord"
                  value={searchWord?.searchWord}
                  placeholder="Enter search word"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item>
                <Button
                  size="small"
                  sx={{
                    bgcolor: 'var(--primary)',
                    color: 'var(--white)',
                    textTransform: 'capitalize',
                    ':hover': {
                      bgcolor: 'var(--primary)',
                    },
                  }}
                  onClick={() => handleSearch()}
                >
                  Search
                </Button>
                &nbsp;&nbsp;
                <Button
                  size="small"
                  type="reset"
                  sx={{
                    bgcolor: 'var(--crimson)',
                    color: 'var(--white)',
                    textTransform: 'capitalize',
                    ':hover': {
                      bgcolor: 'var(--crimson)',
                    },
                  }}
                  onClick={handleReset}
                >
                  reset
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Collapse>

        {loading ? (
          <TableLoader row={13} cell={8} />
        ) : (
          <>
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
              <BookingHistoryPhone
                data={booking || initiat}
                handleDetails={handleDetails}
                name="Due Amount"
                name2="Paid Amount"
              />
              <Box mt={3}>
                <CustomPagination
                  pageIndex={currentPage - 1}
                  pageCount={Math.ceil(totalLength / 15)}
                  gotoPage={handlePageChange}
                  canPreviousPage={currentPage > 1}
                  canNextPage={currentPage}
                />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
export default PartialPayment;
