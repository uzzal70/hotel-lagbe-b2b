/* eslint-disable no-unused-vars */
import { Box, Button, Collapse, Grid, Grow, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
// import CustomSearchInput from '../Common/CustomSearchInput';
import BackButton from '../Common/BackButton';
import Token from '../Common/Token';
import getAuthToken from '../Common/getAuthToken';
import axios from 'axios';
import TableLoader from '../Common/Table/TableLoader';
import ApiCustomTable from '../Common/Table/ApiCustomTable';
import FilterListIcon from '@mui/icons-material/FilterList';
import moment from 'moment';
// import CustomButton from '../Common/CustomButton';
import { useNavigate } from 'react-router-dom';
// import TransactionHistoryPhone from './TransactionHistoryPhone';
import CustomPagination from '../Common/Table/CustomPagination';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import { Calendar } from 'react-date-range';
import BookingHistoryPhone from '../BookingHistory/BookingHistoryPhone';
import FilterSelect from '../Common/FilterSelect';
import { baseUrl } from '../../../baseurl';
import companyInfo from '../../common/companyInfo';
import RefreshButton from '../Common/RefreshButton';
import DownloadCSV from '../Common/DownloadCSV';
import HeaderTitle from '../../common/HeaderTitle';
// import DownloadCSV from '../Common/DownloadCSV';

const SalesReport = () => {
  const statusData = [
    {
      name: 'Ticketed  ',
      value: 'TICKETED',
    },
    {
      name: 'Reissue Completed ',
      value: 'REISSUE_COMPLETED',
    },
    {
      name: 'Refund Completed ',
      value: 'REFUND_COMPLETED',
    },
    {
      name: 'Ticket Voided ',
      value: 'TICKET_VOIDED',
    },
  ];

  const handleDetails = (id, items) => {
    navigate(`/dashboard/bookingdetails/${id}`, {
      state: {
        id: id,
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
      Header: 'Route',
      accessor: 'route',
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
  const navigate = useNavigate();
  const agentId = Token();
  const token = getAuthToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState({
    filter: false,
    startDate: false,
    endDate: false,
  });
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });

  const handleOpen = (picker) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [picker]: !prevOpen[picker],
    }));
  };

  const handleClose = useCallback((picker) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [picker]: false,
    }));
  }, []);

  const handleDateSelect = (selectedDate, picker) => {
    setDate((prevDate) => ({
      ...prevDate,
      [picker]: selectedDate,
    }));
    handleClose(picker);
  };

  const handleDateReset = (picker) => {
    setDate((prevDate) => ({
      ...prevDate,
      [picker]: null,
    }));
  };

  const url = `${baseUrl}/core/agent/agentsSalesReportByAgentId/${agentId}?page=${
    searchWord ? 1 : currentPage
  }&pageSize=50&startDate=${
    date?.startDate ? moment(date?.startDate).format('YYYY-MM-DD') : ''
  }&endDate=${
    date?.endDate ? moment(date?.endDate).format('YYYY-MM-DD') : ''
  }&status=${searchWord || ''}`;
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
  const transactionData = data?.bookings;

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage + 1);
    setLoading(true);
    setRefetch(!refetch);
    setLoading(false);
    window.scrollTo(0, 0);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchWord(value);
  };

  const handleReset = () => {
    handleDateReset('startDate');
    handleDateReset('endDate');
    setRefetch(!refetch);
    setSearchWord('');
  };
  const handleSearch = async () => {
    setLoading(true);
    setRefetch(!refetch);
    setCurrentPage(1);
    setLoading(false);
  };

  const initiat = [];

  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        paddingBottom: {
          xs: 8,
          md: 1,
        },
      }}
    >
      <HeaderTitle
        loading={loading}
        setRefetch={setRefetch}
        setLoading={setLoading}
        headerTitle={`Sales Report`}
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
          <Stack
            direction={'row'}
            spacing={2}
            alignItems={'center'}
            sx={{
              color: 'var(--black)',
              fontSize: { xs: 16, sm: 20 },
              fontWeight: 500,
              '.style-card': {
                bgcolor: 'var(--orenge)',
                px: 1,
                py: 0.3,
                fontSize: 14,
                borderRadius: '5px',
              },
            }}
          >
            Sales Report{' '}
            <Box>
              <span style={{ color: 'var(--primary)', fontSize: 12 }}>
                &nbsp;Total: {totalLength}
              </span>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Box
              sx={{
                select: {
                  border: '1px solid var(--bgcolor)',
                  p: '8px ',
                  fontSize: 14,
                  width: '200px',
                  bgcolor: 'var(--gray)',
                  borderRadius: '5px',
                  textTransform: 'capitalize',
                },
                option: {
                  fontSize: 14,
                  fontWeight: 400,
                },
                position: 'relative',

                display: { xs: 'none', md: 'block' },
              }}
            >
              <FilterSelect
                data={statusData}
                value={searchWord?.status}
                handleChange={handleChange}
              />
            </Box>
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
              onClick={() => handleOpen('filter')}
              startIcon={<FilterListIcon />}
            >
              More Filter
            </Button>
          </Stack>
        </Stack>
        <Collapse in={open?.filter}>
          <Box pb={2}>
            <Grid container spacing={{ xs: 1, md: 2 }} alignItems="center">
              <Grid item>
                <Box
                  className="custom-input"
                  sx={{
                    input: {
                      border: '1px solid var(--bgcolor)',
                      outline: 'none',
                      p: '8px',
                      fontSize: 14,
                      borderRadius: '5px',
                      width: { xs: '160px', sm: '160px', md: '200px' },
                      bgcolor: '',
                    },
                    position: 'relative',
                  }}
                >
                  <Box>
                    <input
                      type="text"
                      name={'startDate'}
                      id={'startDate'}
                      placeholder={'Start Date'}
                      value={
                        date.startDate
                          ? moment(date.startDate).format('DD MMM YYYY')
                          : ''
                      }
                      onClick={() => {
                        handleOpen('startDate');
                        handleClose('endDate');
                      }}
                      readOnly
                      autoComplete="off"
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        right: '2%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        height: '65%',
                      }}
                    >
                      <CalendarMonthTwoToneIcon
                        sx={{ color: 'var(--disable)', fontSize: 20, mt: 0.2 }}
                        onClick={() => handleOpen('startDate')}
                      />
                    </Box>
                  </Box>
                  {date.startDate && (
                    <Box
                      sx={{
                        position: 'absolute',
                        right: '20%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        height: '60%',
                        zIndex: 1,
                        display: '',
                      }}
                    >
                      <CancelOutlinedIcon
                        sx={{ color: 'var(--disable)', fontSize: 14 }}
                        onClick={() => {
                          handleDateReset('startDate');
                          handleClose('startDate');
                        }}
                      />
                    </Box>
                  )}

                  <Grow in={open.startDate}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '100%%',
                        left: { xs: '0', md: '0' },
                        transform: 'translateX(10%)',
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px ',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        zIndex: 1,
                      }}
                    >
                      <Calendar
                        color="var(--primary)"
                        months={1}
                        maxDate={new Date()}
                        onChange={(selectedDate) =>
                          handleDateSelect(selectedDate, 'startDate')
                        }
                      />
                    </Box>
                  </Grow>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  className="custom-input"
                  sx={{
                    input: {
                      border: '1px solid var(--bgcolor)',
                      outline: 'none',
                      p: '8px',
                      fontSize: 14,
                      borderRadius: '5px',
                      width: { xs: '160px', sm: '160px', md: '200px' },
                      bgcolor: '',
                    },
                    position: 'relative',
                  }}
                >
                  <Box>
                    <input
                      type="text"
                      name={'endDate'}
                      id={'endDate'}
                      placeholder={'End Date'}
                      value={
                        date.endDate
                          ? moment(date.endDate).format('DD MMM YYYY')
                          : ''
                      }
                      onClick={() => {
                        handleOpen('endDate');
                        handleClose('startDate');
                      }}
                      readOnly
                      autoComplete="off"
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        right: '2%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        height: '65%',
                      }}
                    >
                      <CalendarMonthTwoToneIcon
                        sx={{ color: 'var(--disable)', fontSize: 20, mt: 0.2 }}
                        onClick={() => handleOpen('endDate')}
                      />
                    </Box>
                  </Box>
                  {date.endDate && (
                    <Box
                      sx={{
                        position: 'absolute',
                        right: '20%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        height: '60%',
                        zIndex: 1,
                        display: '',
                      }}
                    >
                      <CancelOutlinedIcon
                        sx={{ color: 'var(--disable)', fontSize: 14 }}
                        onClick={() => {
                          handleDateReset('endDate');
                          handleClose('endDate');
                        }}
                      />
                    </Box>
                  )}

                  <Grow in={open.endDate}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '100%%',
                        right: { xs: 'unset', md: '0' },
                        left: { xs: '0', md: 'unset' },
                        transform: 'translateX(10%)',
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px ',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        zIndex: 1,
                      }}
                    >
                      <Calendar
                        color="var(--primary)"
                        months={1}
                        maxDate={new Date()}
                        onChange={(selectedDate) =>
                          handleDateSelect(selectedDate, 'endDate')
                        }
                      />
                    </Box>
                  </Grow>
                </Box>
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
            <Grid
              container
              spacing={2}
              sx={{
                color: 'var(--black)',
                fontSize: { xs: 16, sm: 20 },
                fontWeight: 500,
                mb: 2,
                '.style-card': {
                  bgcolor: 'var(--orenge)',
                  px: 1,
                  py: 0.3,
                  fontSize: 14,
                  borderRadius: '5px',
                },
              }}
            >
              <Grid item>
                <Box className="style-card manual_ticketed">
                  Total Paid: {data?.paid || 0} {companyInfo?.currencyCode}{' '}
                </Box>
              </Grid>
              <Grid item>
                <Box className="style-card ">
                  Total Due: {data?.due || 0} {companyInfo?.currencyCode}
                </Box>
              </Grid>
              <Grid item>
                <Box className="style-card refund_completed">
                  Total refund: {data?.refund || 0} {companyInfo?.currencyCode}
                </Box>
              </Grid>
              <Grid item>
                <Box className="style-card reissue_completed">
                  Total reissue: {data?.reissue || 0}{' '}
                  {companyInfo?.currencyCode}
                </Box>
              </Grid>
              <Grid item>
                <Box className="style-card ticket_voided">
                  Total void: {data?.void || 0} {companyInfo?.currencyCode}
                </Box>
              </Grid>
              <Grid item>
                <DownloadCSV url={url} data={data} />
              </Grid>
            </Grid>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
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
                pageList={50}
                textAlign="center"
              />
            </Box>

            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <BookingHistoryPhone
                data={transactionData || initiat}
                handleDetails={handleDetails}
                name="Customer Price"
                name2="Agent Price"
              />
              <Box mt={3}>
                <CustomPagination
                  pageIndex={currentPage - 1}
                  pageCount={Math.ceil(totalLength / 50)}
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

export default SalesReport;
