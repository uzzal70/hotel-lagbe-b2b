import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../Common/Table/CustomTable';
import CopyToClipboardButton from '../Common/CopyToClipboardButton';
import TableLoader from '../Common/Table/TableLoader';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import FilterSearchInput from '../Common/FilterSearchInput';
import MFSListPhone from './MFSListPhone';
import BackButton from '../Common/BackButton';
import CustomButton from '../Common/CustomButton';
import { baseUrl } from '../../../baseurl';
import HeaderTitle from '../../common/HeaderTitle';

const MFSList = () => {
  const navigate = useNavigate();
  const columns = [
    {
      Header: 'Sl',
      accessor: 'id',
      Cell: (row) => {
        return <>{row.row.index + 1}</>;
      },
    },
    {
      Header: 'Bank Logo',
      accessor: 'logo',
      Cell: (row) => {
        return <img src={row.value} alt="" style={{ height: '20px' }} />;
      },
    },
    {
      Header: 'Name of MFS',
      accessor: 'bankingName',
    },

    {
      Header: 'Account number',
      accessor: 'accountNo',
      Cell: (row) => {
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {row.value}&nbsp;&nbsp;
            <CopyToClipboardButton textToCopy={row.value} />
          </Box>
        );
      },
    },
    {
      Header: 'Account Name',
      accessor: 'accountName',
      Cell: (row) => {
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {row.value}&nbsp;&nbsp;
            <CopyToClipboardButton textToCopy={row.value} />
          </Box>
        );
      },
    },

    {
      Header: 'Payment Charges',
      accessor: 'transactionCharge',
    },
    // {
    //   Header: 'Action',
    //   accessor: 'action',
    //   Cell: (row) => {
    //     return (
    //       <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    //         <CustomButton
    //           padding="2px 10px"
    //           value="Instant Deposit"
    //           bgcolor="var(--bgcolor)"
    //           textcolor="var(--primary)"
    //           hovercolor="var(--bgcolor)"
    //           handleClick={handleInstant}
    //         />
    //       </Box>
    //     );
    //   },
    // },
  ];
  const [data, setData] = useState([]);
  const [bankData, setBankData] = useState([]);
  const url = `${baseUrl}/core/agent/findAllMobileBankingByAgent`;
  const {
    data: bankList,
    error,
    isLoading,
    refetch,
  } = useGetItemsQuery({ url });

  useEffect(() => {
    if (bankList) {
      setData(bankList?.mobileBanking);
      setBankData(bankList?.mobileBanking);
    }

    refetch();
  }, [bankList]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const filteredResults = data?.filter((item) => {
      return Object.values(item).some((value) => {
        if (typeof value === 'boolean') {
          return String(value).toLowerCase() === inputValue.toLowerCase();
        }
        return String(value).toLowerCase().includes(inputValue.toLowerCase());
      });
    });
    setBankData(filteredResults);
  };

  const handlePayment = () => {
    navigate('/dashboard/depositreq');
  };
  const handleInstant = () => {
    navigate('/dashboard/deposit');
  };
  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        pb: { xs: 8, md: 1 },
      }}
    >
      <HeaderTitle
        headerTitle={'Mobile Banking Details'}
        onDepositRequest={handlePayment}
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
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pb={2}
        >
          <Typography
            sx={{
              color: 'var(--black)',
              fontSize: { xs: 14, sm: 16, md: 20 },
              fontWeight: 500,
            }}
          >
            Mobile Banking List
          </Typography>

          <Box>
            <FilterSearchInput
              name="bankname"
              placeholder="Search..."
              onChange={handleChange}
              width={{ xs: 200, sm: 200, md: 250 }}
            />
          </Box>
        </Stack>
        {isLoading ? (
          <TableLoader row={4} cell={6} />
        ) : (
          <>
            {error ? (
              'There is no Mobile list'
            ) : (
              <>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <CustomTable
                    columns={columns}
                    data={bankData}
                    pageList={20}
                    textAlign="center"
                  />
                </Box>

                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  <MFSListPhone data={bankData} />
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default MFSList;
