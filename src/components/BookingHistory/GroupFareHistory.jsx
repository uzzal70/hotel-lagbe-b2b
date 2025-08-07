import { Box, Button, Grid, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import CustomSearchInput from '../Common/CustomSearchInput';
import BackButton from '../Common/BackButton';
import Token from '../Common/Token';
import TableLoader from '../Common/Table/TableLoader';
import moment from 'moment';
import ApiCustomTable from '../Common/Table/ApiCustomTable';
import axios from 'axios';
import getAuthToken from '../Common/getAuthToken';
import CustomPagination from '../Common/Table/CustomPagination';
import GroupFareHistoryPhone from './GroupFareHistoryPhone';
import { baseUrl } from '../../../baseurl';
import companyInfo from '../../common/companyInfo';
import HeaderTitle from '../../common/HeaderTitle';

const GroupFareHistory = () => {
  const agentId = Token();
  const token = getAuthToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [searchWord, setSearchWord] = useState({
    bookingId: '',
  });
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      Header: 'Booking Id',
      accessor: 'groupBookingRef',

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
          >
            {row?.value || 'N/A'}
          </Button>
        );
      },
    },

    {
      Header: 'Group Fare Ref',
      accessor: 'groupRef',
      Cell: (row) => {
        return <Box>{row?.value || 'N/A'}</Box>;
      },
    },
    {
      Header: 'Airline',
      accessor: 'airline',
      Cell: (row) => {
        return <Box>{row?.value || 'Airline'}</Box>;
      },
    },

    {
      Header: 'Airline',
      accessor: 'code',
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
      Header: 'Route',
      accessor: 'route',
    },

    {
      Header: 'Booking Time',
      accessor: 'groupFareSaleHistoryUpdatedAt',
      Cell: (row) => {
        return (
          <Box>{moment(row?.value?.split('Z')[0]).format('DD MMM YYYY')}</Box>
        );
      },
    },

    {
      Header: 'Agent Price',
      accessor: 'fare',
      Cell: (row) => {
        return (
          <Box>
            {row.value || 0} {companyInfo.currencyType}
          </Box>
        );
      },
    },
    {
      Header: 'Seat',
      accessor: 'seat',
      Cell: (row) => {
        return <Box>{row.value || 0}</Box>;
      },
    },

    {
      Header: 'Flight Date',
      accessor: 'date',
      Cell: (row) => {
        return (
          <Box>
            {row?.row?.original?.date}
            {', '}
            {row?.row?.original?.feature}
          </Box>
        );
      },
    },
    {
      Header: 'Baggage',
      accessor: 'baggage',
    },
    {
      Header: 'Food',
      accessor: 'food',
      Cell: (row) => {
        return <Box>{row?.row?.original?.food ? 'Yes' : 'No'}</Box>;
      },
    },
  ];

  const url = `${baseUrl}/core/group-fare/getAllGroupFareSaleHistoryByAgentId/${agentId}?page=${
    searchWord?.bookingId ? 1 : currentPage
  }&pageSize=15&searchWord=${searchWord?.bookingId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedData = response?.data;
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refetch, searchWord?.bookingId]);
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
        headerTitle={`Group Fare History`}
        loading={loading}
        setRefetch={setRefetch}
        setLoading={setLoading}
        showCustomButtons={false}
      />

      <Box
        sx={{
          m: 2,
          p: { md: 2, xs: 0 },
          bgcolor: { xs: 'var(--body)', md: 'var(--white)' },
          borderRadius: '10px',
        }}
      >
        <Box
          sx={{
            mb: 1.5,
            p: { xs: 1.5, md: 0 },
            bgcolor: { xs: 'var(--white)', md: 'transparent' },
            borderRadius: '10px',
          }}
        >
          <Grid container spacing={{ xs: 1, md: 4 }}>
            <Grid item>
              <Typography
                sx={{
                  color: 'var(--black)',
                  fontSize: { xs: 16, sm: 20 },
                  fontWeight: 500,
                }}
              >
                Group Fare Management{' '}
                <span style={{ color: 'var(--primary)', fontSize: 12 }}>
                  Total: {totalLength}
                </span>
              </Typography>
            </Grid>
            <Grid item>
              <CustomSearchInput
                width={{ xs: '300px', md: '100%' }}
                name="bookingId"
                value={searchWord?.bookingId}
                placeholder="Enter Search word..."
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>

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
              <GroupFareHistoryPhone data={booking || initiat} />
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
export default GroupFareHistory;
