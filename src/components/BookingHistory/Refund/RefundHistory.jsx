import { Box, Button, Collapse, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
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
import BookingHistoryPhone from '../BookingHistoryPhone';
import CustomPagination from '../../Common/Table/CustomPagination';
import { baseUrl } from '../../../../baseurl';
import companyInfo from '../../../common/companyInfo';
import HeaderTitle from '../../../common/HeaderTitle';

const RefundHistory = () => {
  const agentId = Token();
  const token = getAuthToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [searchWord, setSearchWord] = useState({
    bookingId: '',
    pnr: '',
    airline: '',
    status: '',
    mobileStatus: '',
  });
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  // const [booking, setBooking] = useState([]);
  const navigate = useNavigate();
  const handleDetails = (id, items) => {
    navigate(`/dashboard/bookingdetails/${id}`, {
      state: {
        id: id,
        data: items,
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
    {
      Header: 'Type',
      accessor: 'tripType',
      Cell: (row) => {
        return (
          <Box textTransform={'capitalize'}>
            {row.value?.replace(/_/g, '').toLowerCase()}
          </Box>
        );
      },
    },
    {
      Header: 'PNR',
      accessor: 'pnr',
    },
    {
      Header: 'Paid Amount',
      accessor: 'amount.paidAmount',
      Cell: (row) => {
        return (
          <Box>
            {commaNumber(row.value || 0)} {companyInfo.currencyType}
          </Box>
        );
      },
    },
    {
      Header: 'Refunded Amount',
      accessor: 'refund.amountRefunded',
      Cell: (row) => {
        return (
          <Box>
            {commaNumber(row.value || 0)} {companyInfo.currencyType}
          </Box>
        );
      },
    },
    {
      Header: 'Passenger',
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
      Header: 'Time Limit',
      accessor: 'ticketingTimeLimit',
      Cell: (row) => {
        return (
          <Box>{moment(row?.value?.split('Z')[0]).format('DD MMM YYYY')}</Box>
        );
      },
    },

    {
      Header: 'Flight Date',
      accessor: 'travelDate',
      Cell: (row) => {
        return (
          <Box>{moment(row?.value?.split('Z')[0]).format('DD MMM YYYY')}</Box>
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
  const url = `${baseUrl}/core/agent/findAllPaginatedAndFilteredRefundByAgentId?agentId=${agentId}&pageNumber=${
    searchWord?.status ? 1 : currentPage
  }&pageSize=15&bookingRef=${searchWord?.bookingId}&pnr=${
    searchWord?.pnr
  }&platingCareer=${searchWord?.airline}&status=${searchWord?.status}`;

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
  }, [refetch, searchWord?.status]);

  const totalLength = data?.totalLength;
  const booking = data?.data;

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
      pnr: '',
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
        // overflowY: 'auto',
      }}
    >
      <HeaderTitle
        headerTitle={`Refund History`}
        loading={loading}
        setRefetch={setRefetch}
        setLoading={setLoading}
        showCustomButtons={false}
      />

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
            Refund Management{' '}
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
              mb: 1.5,
              p: { xs: 1.5, md: 0 },
              bgcolor: 'var(--white)',
              borderRadius: '10px',
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
                  name="bookingId"
                  value={searchWord?.bookingId}
                  placeholder="Enter Booking Id"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <CustomSearchInput
                  name="pnr"
                  value={searchWord?.pnr}
                  placeholder="Enter PNR"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <CustomSearchInput
                  name="airline"
                  value={searchWord?.airline}
                  placeholder="Enter Airline"
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
                name="Refunded Amount"
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
export default RefundHistory;
