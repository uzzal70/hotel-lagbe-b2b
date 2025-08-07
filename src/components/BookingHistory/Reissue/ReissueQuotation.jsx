import { Box, Button, Grid } from '@mui/material';
import CustomTable from '../../Common/Table/CustomTable';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomSearchInput from '../../Common/CustomSearchInput';
import CustomTab from '../../Common/CustomTab';
import { RefundData } from '../../Utils/RefundData';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BackButton from '../../Common/BackButton';
import companyInfo from '../../../common/companyInfo';
import HeaderTitle from '../../../common/HeaderTitle';

const ReissueQuotation = () => {
  const [tabsData, setTabsData] = useState('All');

  const tabButton = [
    { label: 'All', value: 'All' },
    { label: 'Generated', value: 'Generated' },
    { label: 'Approved by Agent', value: 'Approved by Agent' },
    { label: 'In-Progress', value: 'In-Progress' },
    { label: 'Settled', value: 'Settled' },
    { label: 'Cancelled', value: 'Cancelled' },
    { label: 'Expired', value: 'Expired' },
  ];

  const handleChange = useCallback((newValue) => {
    setTabsData(newValue);
  }, []);

  const columns = [
    {
      Header: 'SL',
      accessor: 'id',
      Cell: (row) => {
        return <Box>{row.value}</Box>;
      },
    },
    {
      Header: 'PNR',
      accessor: 'pnr',
      Cell: (row) => {
        return <Box>{row.value}</Box>;
      },
    },

    {
      Header: 'Adult',
      accessor: 'adult',
    },
    {
      Header: 'Child',
      accessor: 'child',
    },
    {
      Header: 'Infant',
      accessor: 'infant',
    },
    {
      Header: 'Class',
      accessor: 'class',
    },
    {
      Header: 'Booking Code',
      accessor: 'bookingId',
    },
    {
      Header: 'Re-Issue Charge',
      accessor: 'refundableAmount',
      Cell: (row) => {
        return (
          <Box>
            {row.value} {companyInfo.currencyType}
          </Box>
        );
      },
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: (row) => {
        return <Box>{row.value}</Box>;
      },
    },
    {
      Header: 'Expire At',
      accessor: 'refundableTimeLimit',
      Cell: (row) => {
        return <Box>{row.value}</Box>;
      },
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: (row) => {
        return (
          <Box
            py={0.3}
            className={`${row?.value?.toLowerCase()?.split(' ')?.join('-')}`}
          >
            {row.value}
          </Box>
        );
      },
    },

    {
      Header: 'Details',
      accessor: 'action',
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
            component={Link}
            to={{
              pathname: '/dashboard/bookingdetails',
              state: row.value,
            }}
            startIcon={<VisibilityIcon style={{ fontSize: '16px' }} />}
          >
            View
          </Button>
        );
      },
    },
  ];

  const [filteredData, setFilteredData] = useState(RefundData);

  const handleFilterChange = (e) => {
    const lowercasedValue = e.target.value.toLowerCase();

    const filteredResults = RefundData.filter((item) => {
      return Object.values(item).some((value) =>
        value.toLowerCase().includes(lowercasedValue)
      );
    });

    setFilteredData(filteredResults);
  };

  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        pb: { xs: 8, md: 1 },
      }}
    >
      <HeaderTitle headerTitle={`Flight Re-Issue Quotation`} />

      <Box
        sx={{
          m: 2,
          p: { xs: 1.5, md: 3 },
          bgcolor: 'var(--white)',
          borderRadius: '10px',
        }}
      >
        <Box>
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            justifyContent={'space-between'}
          >
            <Grid item>
              <CustomTab
                handleChange={handleChange}
                data={tabsData}
                buttons={tabButton}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={2}>
              <CustomSearchInput
                name="bookingId"
                placeholder="Enter Search..."
                onChange={handleFilterChange}
                width="100%"
              />
            </Grid>
          </Grid>
        </Box>
        <Box pt={3}>
          <CustomTable
            columns={columns}
            data={filteredData}
            pageList={10}
            textAlign="center"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default ReissueQuotation;
