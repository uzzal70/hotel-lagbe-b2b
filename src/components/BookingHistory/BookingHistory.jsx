import { Box, Button, Collapse, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomSearchInput from '../Common/CustomSearchInput';
import { statusData } from '../Utils/statusData';
import BackButton from '../Common/BackButton';
import Token from '../Common/Token';
import TableLoader from '../Common/Table/TableLoader';
import moment from 'moment';
import ApiCustomTable from '../Common/Table/ApiCustomTable';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';
import FilterSelect from '../Common/FilterSelect';
import getAuthToken from '../Common/getAuthToken';
import BookingHistoryPhone from './BookingHistoryPhone';
import CustomPagination from '../Common/Table/CustomPagination';
import { baseUrl } from '../../../baseurl';
import companyInfo from '../../common/companyInfo';
import RefreshButton from '../Common/RefreshButton';
import MiniCard from '../Common/MiniCard';
import HeaderTitle from '../../common/HeaderTitle';

const BookingHistory = () => {
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
      Header: 'Customer',
      accessor: 'contactName',
      Cell: (row) => {
        return <Box>{row?.value?.toUpperCase() || 'Cutomer Name'}</Box>;
      },
    },
    // {
    //   Header: 'Created By',
    //   accessor: 'contactNamed',
    //   Cell: (row) => {
    //     return <Box>{row?.value?.toUpperCase() || 'Cutomer Name'}</Box>;
    //   },
    // },

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
      Header: 'Booking Time',
      accessor: 'createdAt',
      Cell: (row) => {
        return (
          <Box>{moment(row?.value?.split('Z')[0]).format('DD MMM YYYY')}</Box>
        );
      },
    },
    {
      Header: 'Due Amount',
      accessor: 'amount.dueAmount',
      Cell: (row) => {
        return (
          <Box>
            {row.value || 0} {companyInfo.currencyType}
          </Box>
        );
      },
    },
    {
      Header: 'Customer Price',
      accessor: 'grossTotalPrice',
      Cell: (row) => {
        return (
          <Box>
            {row.value || 0} {companyInfo.currencyType}
          </Box>
        );
      },
    },
    {
      Header: 'Agent Price',
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
    // {
    //   Header: 'Time Limit',
    //   accessor: 'ticketingTimeLimit',
    //   Cell: (row) => {
    //     return <Box>{moment(row?.value).format('DD MMM hh:mm a')}</Box>;
    //   },
    // },

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

  const url = `${baseUrl}/core/agent/findAllPaginatedAndFilteredBookingByAgentId?agentId=${agentId}&pageNumber=${currentPage}&pageSize=15&bookingRef=${searchWord?.bookingId}&pnr=${searchWord?.pnr}&platingCareer=${searchWord?.airline}&status=${searchWord?.status}`;

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

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setSearchWord((prevSearchWord) => ({
        ...prevSearchWord,
        [name]: value,
      }));
    },
    [setSearchWord]
  );
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
  // const handleSearch = async () => {
  //   setLoading(true);
  //   setRefetch(!refetch);
  //   setCurrentPage(1);
  //   setLoading(false);
  // };
  const handleSearch = async () => {
    setLoading(true);

    // Your search logic
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
        headerTitle={`Booking History`}
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
        <Grid item container spacing={1} justifyContent={'flex-end'} mb={2}>
          <Grid item xs={6} md={4} lg={2}>
            <MiniCard
              width={{ xs: '100%', md: '100%' }}
              title={'Ticketed'}
              value={`${companyInfo.currencyCode} ${data?.totalSale || 0}`}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MiniCard
              width={{ xs: '100%', md: '100%' }}
              title={'Refund'}
              value={`${companyInfo.currencyCode} ${data?.totalRefund || 0}`}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MiniCard
              width={{ xs: '100%', md: '100%' }}
              title={'Reissue'}
              value={`${companyInfo.currencyCode} ${data?.totalReissue || 0}`}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <MiniCard
              width={{ xs: '100%', md: '100%' }}
              title={'Void'}
              value={`${companyInfo.currencyCode} ${data?.totalVoid || 0}`}
            />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography
            sx={{
              color: 'var(--black)',
              fontSize: { xs: 16, sm: 20 },
              fontWeight: 500,
            }}
          >
            Booking Management{' '}
            <span style={{ color: 'var(--primary)', fontSize: 12 }}>
              Total: {totalLength || 0}
            </span>
          </Typography>
          <Stack direction="row">
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Box
                sx={{
                  select: {
                    border: '1px solid var(--bgcolor)',
                    p: '5px',
                    fontSize: 14,
                    width: { xs: '160px', sm: '160px', md: '200px' },
                    bgcolor: 'var(--gray)',
                    borderRadius: '5px',
                    textTransform: 'capitalize',
                  },
                  option: {
                    fontSize: 14,
                    fontWeight: 400,
                  },
                  position: 'relative',
                }}
              >
                <Box>
                  <FilterSelect
                    data={statusData}
                    value={searchWord?.status}
                    handleChange={handleChange}
                  />
                </Box>
              </Box>
            </Box>
            &nbsp;&nbsp;
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
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSearch();
              }}
            >
              <Grid container spacing={{ xs: 1, md: 2 }} alignItems="center">
                <Grid item xs={6} md={2}>
                  <CustomSearchInput
                    name="bookingId"
                    value={searchWord?.bookingId}
                    placeholder="Enter Booking Id"
                    onChange={handleChange}
                    width="100%"
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <CustomSearchInput
                    name="pnr"
                    value={searchWord?.pnr}
                    placeholder="Enter PNR"
                    onChange={handleChange}
                    width="100%"
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <CustomSearchInput
                    name="airline"
                    value={searchWord?.airline}
                    placeholder="Enter Airline"
                    onChange={handleChange}
                    width="100%"
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={2}
                  sx={{ display: { xs: 'block', md: 'none' } }}
                >
                  <Box
                    sx={{
                      select: {
                        border: '1px solid var(--bgcolor)',
                        p: '8px',
                        fontSize: 14,
                        width: '100%',
                        bgcolor: 'var(--gray)',
                        borderRadius: '5px',
                        textTransform: 'capitalize',
                      },
                      option: {
                        fontSize: 14,
                        fontWeight: 400,
                      },
                      position: 'relative',
                    }}
                  >
                    <FilterSelect
                      name="status"
                      data={statusData}
                      value={searchWord?.status}
                      handleChange={handleChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
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
                    type="submit" // The "Enter" key will trigger this button
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
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </form>
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
          </>
        )}
      </Box>
    </Box>
  );
};
export default BookingHistory;
