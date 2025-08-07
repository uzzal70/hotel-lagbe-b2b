import { Box, Button, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import CustomSearchInput from '../Common/CustomSearchInput';
import { statusData } from '../Utils/statusData';
import BackButton from '../Common/BackButton';
import Token from '../Common/Token';
import TableLoader from '../Common/Table/TableLoader';
import moment from 'moment';
import ApiCustomTable from '../Common/Table/ApiCustomTable';
import axios from 'axios';
import FilterSelect from '../Common/FilterSelect';
import getAuthToken from '../Common/getAuthToken';
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';
import CustomPagination from '../Common/Table/CustomPagination';
import { baseUrl } from '../../../baseurl';
import companyInfo from '../../common/companyInfo';
import RefreshButton from '../Common/RefreshButton';
import ManualBookingListPhone from './ManualBookingListPhone';
import HeaderTitle from '../../common/HeaderTitle';

const ManualBookingList = () => {
  const agentId = Token();
  const token = getAuthToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [searchWord, setSearchWord] = useState({
    searchText: '',
    pnr: '',
    airline: '',
    status: '',
    mobileStatus: '',
  });
  const [loading, setLoading] = useState(true);
  const [downloadingRows, setDownloadingRows] = useState({});

  const handleOpenPdfFile = (id, pdfUrl) => {
    setDownloadingRows((prev) => ({ ...prev, [id]: true }));

    fetch(pdfUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // Ensure token is available
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.blob();
      })
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        window.open(objectURL, '_blank'); // Open in a new tab
      })
      .catch((error) => {
        console.error('Error fetching PDF:', error);
      })
      .finally(() => {
        setDownloadingRows((prev) => ({ ...prev, [id]: false }));
      });
  };
  const columns = [
    {
      Header: 'Booking Id',
      accessor: 'manualBookingRef',

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
            {row?.value || 'Booking ref'}
          </Button>
        );
      },
    },

    {
      Header: 'Customer',
      accessor: 'contactName',
      Cell: (row) => {
        return (
          <Box>
            {row?.row?.original?.passengers?.[0]?.paxName || 'Cutomer Name'}
          </Box>
        );
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
      Header: 'Booking Time',
      accessor: 'ticketTime',
      Cell: (row) => {
        return (
          <Box>{moment(row?.value?.split('Z')[0]).format('DD MMM YYYY')}</Box>
        );
      },
    },

    {
      Header: 'Agent Price',
      accessor: 'agentFare',
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
        return <Box>{row?.row?.original?.passengers?.length || 0}</Box>;
      },
    },

    {
      Header: 'Ticket Copy',
      accessor: 'actions',
      Cell: ({ row }) => {
        const manualBookingId = row.original?.manualBookingId;
        const isDownloading = downloadingRows?.[manualBookingId] || false;

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
              textTransform: 'capitalize',
              fontWeight: 300,
              cursor: isDownloading ? 'not-allowed' : 'pointer',
              opacity: isDownloading ? 0.6 : 1,
            }}
            endIcon={<SaveAltRoundedIcon />}
            onClick={() =>
              handleOpenPdfFile(
                manualBookingId,
                `${baseUrl}/core/agent/getTicketFilebyManualBookingId/${manualBookingId}`
              )
            }
            disabled={isDownloading}
          >
            {isDownloading ? 'Downloading...' : 'Download'}
          </Button>
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
              : row.value === 'MANUAL_TICKETED' ||
                row.value === 'MANUALLY_TICKETED_VENDOR'
              ? 'Ticketed'
              : row?.value === 'PARTIAL_REFUND_INITIATED'
              ? 'Refund Initiated'
              : row.value?.replace(/_/g, ' ').toLowerCase()}
          </Box>
        );
      },
    },
  ];

  const url = `${baseUrl}/core/agent/getAllManualBookingsByAgentId/${agentId}?page=${currentPage}&pageSize=15&status=${searchWord?.status}&searchWord=${searchWord?.searchText}&startDate=2025-02-18&endDate=2025-02-22`;

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
  }, [refetch, searchWord?.status, searchWord?.searchText]);

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
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          mb={2}
          spacing={1}
        >
          <Typography
            sx={{
              color: 'var(--black)',
              fontSize: { xs: 16, sm: 20 },
              fontWeight: 500,
            }}
          >
            Manual Booking{' '}
            <span style={{ color: 'var(--primary)', fontSize: 12 }}>
              Total: {totalLength}
            </span>
          </Typography>
          <Stack direction="row">
            <CustomSearchInput
              name="searchText"
              value={searchWord?.searchText}
              placeholder="Enter Search Words..."
              onChange={handleChange}
              width="100%"
            />
            &nbsp;&nbsp;{' '}
            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
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
                    p="8px"
                  />
                </Box>
              </Box>
            </Box>
          </Stack>
        </Stack>

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
              <ManualBookingListPhone
                data={booking || initiat}
                name2="Agent Price"
                downloadingRows={downloadingRows}
                handleOpenPdfFile={handleOpenPdfFile}
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
export default ManualBookingList;
