/* eslint-disable no-unused-vars */
import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import BackButton from '../Common/BackButton';
import Token from '../Common/Token';
import moment from 'moment';
import TableLoader from '../Common/Table/TableLoader';
import getAuthToken from '../Common/getAuthToken';
import FilterSearchInput from '../Common/FilterSearchInput';
import { baseUrl } from '../../../baseurl';
import axios from 'axios';
import ApiCustomTable from '../Common/Table/ApiCustomTable';
import FilterSelect from '../Common/FilterSelect';
import CustomPagination from '../Common/Table/CustomPagination';
import CreaditHistoryPhone from './CreaditHistoryPhone';
import commaNumber from 'comma-number';
import { useDispatch } from 'react-redux';
import { toggleCreditModal } from '../../redux/slices/modalOpen';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import companyInfo from '../../common/companyInfo';
import HeaderTitle from '../../common/HeaderTitle';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none !important',
  boxShadow: 24,
  p: { xs: 2, md: 4 },
  borderRadius: '10px',
  outline: 'none !important',
};

const CreditHistory = () => {
  const agentId = Token();
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(toggleCreditModal({ modalName: 'creditModal' }));
  };
  const getUrl = `/agent/findTotalPartialDueByAgentId/${agentId}`;

  const {
    data: totalDueData,
    isLoading: isTotalDueLoading,
    refetch: refetchTotalDue,
  } = useGetItemsQuery({ url: getUrl });

  const token = getAuthToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [searchWord, setSearchWord] = useState({
    status: '',
    text: '',
  });
  const [loading, setLoading] = useState(true);

  const statusData = [
    {
      name: 'CREATED',
      value: 'CREATED',
    },
    {
      name: 'DUE',
      value: 'DUE',
    },
    {
      name: 'OVER DUE',
      value: 'OVER_DUE',
    },
    {
      name: 'PAID',
      value: 'PAID',
    },
    {
      name: 'PAYMENT FAILED',
      value: 'PAYMENT_FAILED',
    },
    {
      name: 'REJECTED',
      value: 'REJECTED',
    },
  ];

  const columns = [
    {
      Header: 'Reference',
      accessor: 'bookingRef',
      Cell: (row) => {
        return (
          <Button
            size="small"
            sx={{
              color: 'var(--secondary)',
              fontWeight: 400,
              bgcolor:
                row?.row?.original?.creditRef !== null
                  ? 'var(--bgcolor)'
                  : 'inherit',
            }}
          >
            {row?.row?.original?.creditRef || 'N/A'}
          </Button>
        );
      },
    },

    {
      Header: 'Credit Request Amount',
      accessor: 'creditRequestAmount',
      Cell: (row) => {
        return (
          <Box>
            {commaNumber(row.value || 0)} {companyInfo.currencyType}
          </Box>
        );
      },
    },
    {
      Header: 'Credit Approved Amount',
      accessor: 'creditApprovedAmount',
      Cell: (row) => {
        return (
          <Box>
            {commaNumber(row.value || 0)} {companyInfo.currencyType}
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
            {row?.value ? moment(row?.value).format('DD MMM YYYY') : 'N/A'}
          </Box>
        );
      },
    },
    {
      Header: 'Status',
      accessor: 'creditRequestStatus',
      Cell: (row) => {
        return (
          <Box
            textTransform={'capitalize'}
            className={row.value?.toLowerCase()}
            sx={{
              py: 0.3,
              width: '200px',
              marginX: 'auto',
              bgcolor: 'var(--bgcolor)',
              borderRadius: '5px',
            }}
          >
            {row.value?.replace(/_/g, ' ').toLowerCase()}
          </Box>
        );
      },
    },
  ];

  const url = `${baseUrl}/core/agent/getAllCreditRequestsByAgentId/${agentId}?page=${
    searchWord?.status ? 1 : currentPage === 0 ? 1 : currentPage
  }&pageSize=15&status=${searchWord?.status}&searchWord=${searchWord?.text}`;
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
  }, [refetch, searchWord?.status, searchWord?.text]);

  const totalLength = data?.totalLength;
  const length = data?.filteredDataLength;
  const transactionData = data?.data;

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage + 1);
    setLoading(true);
    setRefetch(!refetch);
    setLoading(false);
    window.scrollTo(0, 0);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchWord((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const initiat = [];

  return (
    <Box
      sx={{
        minHeight: {
          xs: '100vh',
          md: '100vh',
          lg: 'calc(100vh - 50px)',
        },
        paddingBottom: {
          xs: 8,
          md: 1,
        },
      }}
    >
      <HeaderTitle
        headerTitle={'Credit History'}
        backButtonText={'/dashboard/deposithistory'}
      />

      <Box
        sx={{
          m: 2,
          p: { xs: 0, md: 3 },
          bgcolor: { xs: 'var(--body)', md: 'var(--white)' },
          borderRadius: '10px',
        }}
      >
        <Box
          sx={{
            display: { md: 'flex' },
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2,
          }}
        >
          <Typography
            sx={{
              color: 'var(--black)',
              fontSize: { xs: 16, sm: 20 },
              fontWeight: 500,
            }}
          >
            Credit History{' '}
            <span style={{ color: 'var(--primary)', fontSize: 12 }}>
              Total: {totalLength}
            </span>
          </Typography>
          <Box>
            <Grid
              container
              spacing={{ xs: 1, md: 2 }}
              justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
              alignItems={'center'}
            >
              {totalDueData?.creditRequestStatus === 'DUE' ||
              totalDueData?.creditRequestStatus === 'OVER_DUE' ? (
                <Grid item>
                  <Button
                    onClick={() => handleToggle()}
                    sx={{
                      bgcolor: 'var(--yellow)',
                      color: 'var(--white)',
                      textTransform: 'capitalize',
                      px: 5,
                      '&:hover': {
                        bgcolor: 'var(--yellow)',
                        color: 'var(--white)',
                      },
                    }}
                  >
                    Due Pay
                  </Button>
                </Grid>
              ) : (
                <Grid item>
                  <Button
                    onClick={() => handleToggle()}
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
                    Emergency Credit
                  </Button>
                </Grid>
              )}
              <Grid item>
                <FilterSearchInput
                  name="text"
                  placeholder="Search..."
                  onChange={handleChange}
                />
              </Grid>

              <Grid
                item
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
                }}
              >
                <FilterSelect
                  name="status"
                  data={statusData}
                  value={searchWord?.status}
                  handleChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        {loading ? (
          <Box>
            <TableLoader row={13} cell={8} />
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              {totalLength === 0 ? (
                <Box
                  sx={{
                    color: 'var(--white)',
                    fontSize: 16,
                    fontWeight: 500,
                    py: 2,
                    px: 3,
                    backgroundColor: 'var(--disable)',
                    borderRadius: '5px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  There is no Credit record available
                </Box>
              ) : (
                <ApiCustomTable
                  columns={columns}
                  data={transactionData || initiat}
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
              )}
            </Box>

            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <CreaditHistoryPhone
                data={transactionData || initiat}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
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
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CreditHistory;
