/* eslint-disable no-unused-vars */
import { Box, Grid, Modal, Stack, Tooltip, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Select from '../Common/Select';
import CustomTable from '../Common/Table/CustomTable';
import BackButton from '../Common/BackButton';
import Token from '../Common/Token';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import moment from 'moment';
import TableLoader from '../Common/Table/TableLoader';
import commaNumber from 'comma-number';
import getAuthToken from '../Common/getAuthToken';
import FilterSearchInput from '../Common/FilterSearchInput';
import Processoing from '../Common/Processoing';
import TransactionPhone from './TransactionPhone';
import { baseUrl } from '../../../baseurl';
import RefreshButton from '../Common/RefreshButton';
import axios from 'axios';
import ApiCustomTable from '../Common/Table/ApiCustomTable';
import CustomPagination from '../Common/Table/CustomPagination';
import FilterSelect from '../Common/FilterSelect';
import CustomSearchInput from '../Common/CustomSearchInput';
import companyInfo from '../../common/companyInfo';
import MiniCard from '../Common/MiniCard';
import { Link } from 'react-router-dom';
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

const Transaction = () => {
  const token = getAuthToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const viewImage = (imageUrl) => {
    setSelectedImage(null);
    setIsModalOpen(true);
    setLoading(true);
    fetch(imageUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.blob();
      })
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        setSelectedImage(objectURL);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching image:', error);
        setLoading(false); // Set loading state to false in case of error
        // Handle error state if needed
      });
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const statusData = [
    {
      name: 'pending',
      value: 'PENDING',
    },
    {
      name: 'rejected',
      value: 'BLOCKED',
    },
    {
      name: 'approved',
      value: 'APPROVED',
    },
    {
      name: 'declined',
      value: 'DECLINED',
    },
  ];

  const columns = [
    {
      Header: `DepositId`,
      accessor: 'ref',
      Cell: (row) => {
        return <Box> {row.value || 'Reference'}</Box>;
      },
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: (row) => {
        return (
          <Box
            className={row.value?.toLowerCase()}
            sx={{
              px: 1,
              py: 0.2,
              fontSize: 11.5,
            }}
          >
            {row.value === 'BLOCKED' ? 'REJECTED' : row.value}
          </Box>
        );
      },
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      Cell: (row) => {
        return <Box textAlign="end"> {commaNumber(row?.value || 0)}</Box>;
      },
    },
    {
      Header: 'Sender',
      accessor: 'depositFrom',
      Cell: (row) => {
        return (
          <Box>{row?.value || row?.row?.original?.cardHolderName || 'N/A'}</Box>
        );
      },
    },
    {
      Header: 'Received',
      accessor: 'depositTo',
      Cell: (row) => {
        return <Box>{row?.value === 'MTB' ? 'Bank' : row?.value || 'N/A'}</Box>;
      },
    },
    {
      Header: 'Method',
      accessor: 'paymentType',
      Cell: (row) => {
        return (
          <Box>
            {row?.value === 'ONLINE_MTB'
              ? 'Online Payment'
              : row?.value || 'N/A'}
          </Box>
        );
      },
    },
    {
      Header: 'Transaction Date',
      accessor: 'depositDate',
      Cell: (row) => {
        return (
          <Box>
            {row?.value
              ? moment(row?.value, 'ddd MMM DD YYYY').format('DD MMM YYYY')
              : 'N/A'}
          </Box>
        );
      },
    },
    {
      Header: 'Deposit Date',
      accessor: 'createdAt',
      Cell: (row) => {
        return (
          <Box>
            {row?.value
              ? moment(row?.value).format('DD MMM YYYY hh:mm a')
              : 'N/A'}
          </Box>
        );
      },
    },
    {
      Header: 'Cheque Issue Date',
      accessor: 'chequeIssueDate',
      Cell: (row) => {
        return (
          <Box>
            {row?.value
              ? moment(row?.value, 'ddd MMM DD YYYY').format('DD MMM YYYY')
              : 'N/A'}
          </Box>
        );
      },
    },

    {
      Header: 'Transfer Type',
      accessor: 'transferType',
      Cell: (row) => {
        return <Box> {row?.value || 'N/A'}</Box>;
      },
    },
    {
      Header: 'Attachment',
      accessor: 'depositId',
      Cell: (row) => {
        return (
          <Box>
            {row?.row?.original?.paySlip ? (
              <Box
                sx={{
                  cursor: 'pointer',
                  bgcolor: 'var(--bgcolor)',
                  borderRadius: 10,
                  color: 'var(--primary)',
                }}
                onClick={() =>
                  viewImage(
                    `${baseUrl}/core/deposit-request/getPaySlipFilebyDepositId/${row?.value}`
                  )
                }
              >
                View
              </Box>
            ) : (
              'N/A'
            )}
          </Box>
        );
      },
    },
    {
      Header: 'Remarks',
      accessor: 'remarks',
      Cell: (row) => (
        <Tooltip title={row.value}>
          <Typography
            sx={{
              fontSize: 14,
              width: '150px', // Set the width to 100px
              textAlign: 'center', // Center the text
              margin: 'auto', // Center horizontally within the cell
            }}
            noWrap
          >
            {row.value || 'N/A'}
          </Typography>
        </Tooltip>
      ),
    },
  ];

  const agentId = Token();
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [searchWord, setSearchWord] = useState({
    bookingId: '',
    status: '',
  });
  const url = `${baseUrl}/core/deposit-request/findAllDipositsByAgentId/${agentId}?page=${currentPage}&pageSize=16&status=${searchWord?.status}&searchWord=${searchWord?.bookingId}&startDate=&endDate=`;

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
        setError(`Error fetching data ${error.message}`);
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refetch, searchWord?.status, searchWord?.bookingId]);

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
  const depositData = data?.data || [];
  const totalLength = data?.totalLength || [];
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
        headerTitle={'Deposit History'}
        loading={loading}
        setRefetch={setRefetch}
        setLoading={setLoading}
        backButtonText={'/dashboard/deposithistory'}
        miniCardValue={`${companyInfo.currencyCode} ${data?.totalApprovedDepositAmount}`}
      />

      <Box
        sx={{
          m: 2,
          p: { xs: 0, md: 3 },
          bgcolor: { xs: 'var(--body)', md: 'var(--white)' },
          borderRadius: '10px',
        }}
      >
        <Stack
          direction={'row'}
          spacing={2}
          mb={2}
          justifyContent={'space-between'}
        >
          <Typography
            sx={{
              color: 'var(--black)',
              fontSize: { xs: 16, sm: 20 },
              fontWeight: 500,
            }}
          >
            Transection Management{' '}
            <span style={{ color: 'var(--primary)', fontSize: 12 }}>
              Total: {totalLength}
            </span>
          </Typography>
          <Box
            component={Link}
            to="/dashboard/banklist"
            sx={{
              bgcolor: 'var(--primary)',
              color: 'var(--white)',
              borderRadius: '5px',
              padding: '5px 10px',
              fontSize: '12px',
            }}
          >
            Bank List
          </Box>
        </Stack>
        <Grid container spacing={2} mb={2}>
          <Grid item container xs={12} md={6} spacing={1}>
            <Grid item>
              <CustomSearchInput
                name="bookingId"
                value={searchWord?.bookingId}
                placeholder="Search..."
                onChange={handleChange}
                width="100%"
              />
            </Grid>
            <Grid item>
              <Box
                sx={{
                  select: {
                    border: '1px solid var(--bgcolor)',
                    p: '8px',
                    fontSize: 14,
                    width: { xs: '100%', sm: '160px', md: '200px' },
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
            </Grid>
          </Grid>
        </Grid>

        {loading ? (
          <Box>
            <TableLoader row={13} cell={8} />
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              {error ? (
                'There is no deposit list'
              ) : (
                <ApiCustomTable
                  columns={columns}
                  data={depositData}
                  totalLength={totalLength}
                  loading={loading}
                  pageIndex={currentPage - 1}
                  gotoPage={handlePageChange}
                  canPreviousPage={currentPage > 1}
                  previousPage={() => handlePageChange(currentPage - 1)}
                  canNextPage={currentPage}
                  nextPage={() => handlePageChange(currentPage)}
                  pageList={16}
                  textAlign="center"
                />
              )}
            </Box>

            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <TransactionPhone
                data={depositData}
                viewImage={viewImage}
                baseUrl={baseUrl}
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
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={{ ...style, width: 'auto', height: 'auto' }}>
          {loading ? (
            <Processoing
              content={'We are processing your request please wait...'}
            />
          ) : selectedImage === null ? (
            <>Attachment is not found !</>
          ) : (
            <Box
              sx={{
                img: {
                  maxWidth: { xs: '80vw', sm: '50vw', md: '40vw' },
                },
              }}
            >
              <img
                src={selectedImage}
                alt="Modal Image"
                // style={{ maxHeight: '40vh' }}
              />
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Transaction;
