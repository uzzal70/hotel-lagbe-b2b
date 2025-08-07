/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Collapse,
  Grid,
  Grow,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import { Calendar } from 'react-date-range';
import CustomSearchInput from '../../Common/CustomSearchInput';
import BackButton from '../../Common/BackButton';
import RefreshButton from '../../Common/RefreshButton';
import Token from '../../Common/Token';
import getAuthToken from '../../Common/getAuthToken';
import { baseUrlHotel } from '../../../../baseurl';
// import CustomButton from '../../Common/CustomButton';
import MiniCard from '../../Common/MiniCard';
import companyInfo from '../../../common/companyInfo';
import TableLoader from '../../Common/Table/TableLoader';
import ApiCustomTable from '../../Common/Table/ApiCustomTable';
import commaNumber from 'comma-number';
import HotelBookingListPhone from './HotelBookingListPhone';
import CustomPagination from '../../Common/Table/CustomPagination';
import HeaderTitle from '../../../common/HeaderTitle';

const HotelBookingList = () => {
  const handleDetails = (id, hotelId) => {
    const path = `/dashboard/hotel/confirm-hotel/${id}/${hotelId}`;
    navigate(`${path}`);
  };

  const columns = [
    {
      Header: 'Reference',
      accessor: 'bookingRef',
      Cell: ({ row }) => {
        const { bookingId, hotelId } = row.original;
        const isDisabled = !bookingId;

        return (
          <Button
            size="small"
            sx={{
              fontWeight: 400,
              bgcolor: bookingId ? 'var(--bgcolor)' : 'inherit',
              color: 'var(--primary)',
            }}
            onClick={() => handleDetails(bookingId, hotelId)}
            disabled={isDisabled}
          >
            {row?.original?.bookingRef || 'N/A'}
          </Button>
        );
      },
    },
    // {
    //   Header: 'PNR',
    //   accessor: 'pnr',
    //   Cell: (row) => {
    //     return <Box>{row.value || 'N/A'}</Box>;
    //   },
    // },
    {
      Header: 'Hotel Name',
      accessor: 'hotelName',
      Cell: (row) => {
        return <Box>{row.value || 'Hotel Name'}</Box>;
      },
    },
    {
      Header: 'Lead Pax Name',
      accessor: 'paxName',
      Cell: (row) => {
        return <Box>{row.value || 'N/A'}</Box>;
      },
    },
    {
      Header: 'Check IN Date',
      accessor: 'checkIn',
      Cell: (row) => {
        return <Box>{moment(row?.value).format('DD MMM YYYY')}</Box>;
      },
    },
    {
      Header: 'Booking Time',
      accessor: 'createdAt',
      Cell: (row) => {
        return <Box>{moment(row?.value).format('DD MMM YYYY hh:mm a')}</Box>;
      },
    },
    {
      Header: `Amount (${companyInfo?.currencyType})`,
      accessor: 'finalFare',
      Cell: (row) => {
        return <Box>{commaNumber(row.value || 0)}</Box>;
      },
    },

    {
      Header: 'Booking Status',
      accessor: 'tfStatus',
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

  const url = `${baseUrlHotel}/agent-hotel/agentAllHotelBookings/${agentId}?page=${currentPage}&pageSize=15&status=${''}&searchWord=${searchWord}&startDate=${
    date?.startDate ? moment(date?.startDate).format('YYYY-MM-DD') : ''
  }&endDate=${
    date?.endDate ? moment(date?.endDate).format('YYYY-MM-DD') : ''
  }&platform=${companyInfo.platform}`;
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
  }, [refetch]);

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

  const show = innerWidth > 600 ? true : false;

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
        headerTitle={`Hotel Booking ${show ? 'History' : ''}`}
        show={true}
        loading={loading}
        setRefetch={setRefetch}
        setLoading={setLoading}
        LinkTo="/dashboard?query=Hotel"
        LinkToText="Search Hotel Now"
        showCustomButtons={false}
        // onDepositRequest={() => console.log('Deposit requested')}
        // onInstantDeposit={() => console.log('Instant deposit clicked')}
      />

      <Box
        sx={{
          m: 2,
          p: { md: 3, xs: 0 },
          bgcolor: { xs: 'var(--body)', md: 'var(--white)' },
          borderRadius: '10px',
        }}
      >
        <Grid container spacing={2} justifyContent={'space-between'}>
          <Grid item xs={12} md={4}>
            <Typography
              sx={{
                color: 'var(--black)',
                fontSize: { xs: 16, sm: 20 },
                fontWeight: 500,
              }}
            >
              Hotel Booking{' '}
              <span style={{ color: 'var(--primary)', fontSize: 12 }}>
                Total: {totalLength}
              </span>
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={8}
            lg={6}
            justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
            spacing={1}
          >
            <Grid item xs={6} md={4} lg={2.7}>
              <MiniCard
                width={'100%'}
                title={'credits'}
                value={`${companyInfo.currencyCode} ${data?.credits || 0}`}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={2.7}>
              <MiniCard
                width={'100%'}
                title={'debits'}
                value={`${companyInfo.currencyCode} ${data?.debits || 0}`}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* </Stack> */}
        <Collapse in={true}>
          <Box py={2}>
            <Grid container spacing={{ xs: 1, md: 2 }} alignItems="center">
              <Grid item>
                <CustomSearchInput
                  name="searchWord"
                  value={searchWord || ''}
                  placeholder="Enter search word"
                  onChange={handleChange}
                />
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
                        right: '0',
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
                pageList={15}
                textAlign="center"
              />
            </Box>

            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <HotelBookingListPhone
                data={transactionData || initiat}
                handleDetails={handleDetails}
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

export default HotelBookingList;
