import { Box, Button, Typography } from '@mui/material';
import CustomTable from '../Common/Table/CustomTable';
import SearchIcon from '@mui/icons-material/Search';
import Token from '../Common/Token';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import TableLoader from '../Common/Table/TableLoader';
import moment from 'moment';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const RecentSearch = () => {
  const agentId = Token();
  const currentDate = new Date();
  const previousDay = new Date(currentDate);
  previousDay.setDate(currentDate.getDate() - 1);

  const navigate = useNavigate();
  const columns = [
    {
      Header: 'From',
      accessor: 'locationFrom',
    },
    {
      Header: 'To',
      accessor: 'locationTo',
    },
    {
      Header: 'Type',
      accessor: 'journeyType',
      Cell: (row) => {
        return <Box>{row.value?.replace(/_/g, ' ')}</Box>;
      },
    },
    {
      Header: 'Journy Date',
      accessor: 'depDate',
      Cell: (row) => {
        return <Box>{moment(row.value).format('DD MMM YYYY')}</Box>;
      },
    },
    {
      Header: 'Return date',
      accessor: 'returnDate',
      Cell: (row) => {
        return (
          <Box>
            {row.value ? moment(row.value).format('DD MMM YYYY') : 'N/A'}
          </Box>
        );
      },
    },
    {
      Header: 'Class',
      accessor: 'cabinClass',
      Cell: (row) => {
        return (
          <Box>
            {row.value === 'Y'
              ? 'Economy'
              : row.value === 'S'
              ? 'Premium Economy'
              : row.value === 'C'
              ? 'Business'
              : 'First Class'}
          </Box>
        );
      },
    },
    {
      Header: 'Traveler',
      accessor: 'adultCount',
      Cell: (row) => {
        return (
          <Box>
            {row?.row?.original?.adultCount +
              row?.row?.original?.childCount +
              row?.row?.original?.infantCount}
          </Box>
        );
      },
    },
    {
      Header: 'Action',
      accessor: 'action',

      Cell: (row) => {
        const depDate = row?.row?.original?.depDate
          ? new Date(row?.row?.original?.depDate)
          : '';
        const isDatePassed =
          row?.row?.original?.journeyType === 'MULTI_CITY' ||
          previousDay > depDate;
        return (
          <Button
            component="label"
            variant="contained"
            size="small"
            sx={{
              boxShadow: 'none',
              bgcolor: 'var(--bgcolor)',
              color: 'var(--primary)',
              ':hover': {
                bgcolor: 'var(--bgcolor)',
              },
            }}
            startIcon={<SearchIcon />}
            disabled={isDatePassed}
            onClick={() => handleSearch(row?.row?.original)}
          >
            Search
          </Button>
        );
      },
    },
  ];
  // const handleSearch = {};

  const handleSearch = useCallback(
    (item) => {
      sessionStorage.removeItem('commonState');
      const oneandround = [
        {
          locationFrom: item?.locationFrom || 'DAC',
          locationTo: item?.locationTo || 'CXB',
          depDate:
            moment(item?.depDate).format('YYYY-MM-DD') ||
            moment(new Date()).format('YYYY-MM-DD'),
        },
        ...(item?.journeyType === 'ROUND_WAY'
          ? [
              {
                locationFrom: item?.locationTo || 'CXB',
                locationTo: item?.locationFrom || 'DAC',
                depDate:
                  moment(item?.depDate).format('YYYY-MM-DD') ||
                  moment(new Date()).format('YYYY-MM-DD'),
              },
            ]
          : []),
      ];

      const urlparams = {
        segments: oneandround,
        tripType: 'oneway',
        adultCount: item?.adultCount,
        childCount: item?.childCount,
        infantCount: item?.infantCount,
        connection: '2',
        cabinCode: item?.cabinClass || 'Y',
      };

      const encodedQuery = encodeURIComponent(JSON.stringify(urlparams));
      const value = item?.journeyType === 'ONE_WAY' ? 'oneway' : 'roundway';
      if (value) {
        navigate(`/dashboard/search?query=${encodedQuery}`);
      } else {
        throw new Error('Something went wrong!');
      }
    },
    [navigate]
  );

  const url = `/agent/findSearchHistoryByUserId/${agentId}?page=1&pageSize=100&searchWord=`;
  const { data, error, isLoading } = useGetItemsQuery({ url });
  const initialData = data?.searchHistorys || [];
  return (
    <Box
      sx={{
        bgcolor: 'var(--white)',
        p: { xs: 1.5, md: 2 },
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 16, sm: 20 },
          color: 'var(--black)',
          mb: 2,
        }}
      >
        Recent Search
      </Typography>
      {isLoading ? (
        <Box>
          <TableLoader row={10} cell={6} />
        </Box>
      ) : (
        <Box>
          {error ? (
            'There is no search list'
          ) : (
            <CustomTable
              columns={columns}
              data={initialData}
              pageList={10}
              textAlign="center"
            />
          )}
        </Box>
      )}
      {/* <CustomTable columns={columns} data={data} /> */}
    </Box>
  );
};

export default RecentSearch;
