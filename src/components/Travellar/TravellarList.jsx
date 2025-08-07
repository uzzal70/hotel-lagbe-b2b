import { Box, Stack, Tooltip, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../Common/CustomButton';
import CustomTable from '../Common/Table/CustomTable';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import BackButton from '../Common/BackButton';
import moment from 'moment';
import Token from '../Common/Token';
import {
  useDeleteItemMutation,
  useGetItemsQuery,
} from '../../redux/slices/apiSlice';
import TableLoader from '../Common/Table/TableLoader';
import Swal from 'sweetalert2';
import FilterSearchInput from '../Common/FilterSearchInput';
import TravellarListPhone from './TravellarListPhone';
import HeaderTitle from '../../common/HeaderTitle';

const TravellarList = () => {
  const agentId = Token();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [traveller, setTraveller] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  // const [loading, setLoading] = useState(true);
  const [isDone, setIsDone] = useState(null);
  // const [refetch, setRefetch] = useState(false);
  const columns = [
    // {
    //   Header: 'Sl',
    //   accessor: 'id',
    // },
    {
      Header: 'Given Name',
      accessor: 'firstName',
      Cell: (row) => {
        return <Box>{row.value?.toUpperCase()}</Box>;
      },
    },
    {
      Header: 'Surname',
      accessor: 'lastName',
      Cell: (row) => {
        return <Box>{row.value?.toUpperCase()}</Box>;
      },
    },
    {
      Header: 'Gender',
      accessor: 'gender',
    },
    {
      Header: 'Type',
      accessor: 'passengerType',
      Cell: (row) => {
        return (
          <Box>
            {row.value === 'ADT'
              ? 'Adult'
              : row.value === 'INF'
              ? 'Infant'
              : 'Child'}
          </Box>
        );
      },
    },
    {
      Header: 'Date of Birth',
      accessor: 'dateOfBirth',
      Cell: (row) => {
        return `${moment(row.value).format('DD MMM YYYY')}`;
      },
    },
    {
      Header: 'Nationality',
      accessor: 'nationalityCountry',
    },
    {
      Header: 'Passport No',
      accessor: 'passportNo',
    },
    {
      Header: 'Passport Expire',
      accessor: 'passportEx',
      Cell: (row) => {
        return `${moment(row.value).format('DD MMM YYYY')}`;
      },
    },
    {
      Header: 'Action',
      accessor: '',
      // eslint-disable-next-line no-unused-vars
      Cell: (row) => {
        return (
          <Stack direction="row" spacing={2} justifyContent="center">
            <Tooltip title="Edit Travellar">
              <EditTwoToneIcon
                sx={{ color: 'var(--primary)', cursor: 'pointer' }}
                onClick={() =>
                  navigate('/dashboard/addtravellar', {
                    state: { ...row.row.values, update: 'Update' },
                  })
                }
              />
            </Tooltip>
            <Tooltip title="Delete Travellar">
              {isDone === row?.row?.original?.id ? (
                'Deleting...'
              ) : (
                <DeleteForeverTwoToneIcon
                  onClick={() => handleDelete(row?.row?.original?.id)}
                  sx={{ color: 'var(--red)', cursor: 'pointer' }}
                />
              )}
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(
  //         `http://159.69.189.229/core/traveller/findTravellerbyAgentId/{id}/${agentId}`
  //       );
  //       setData(response.data);
  //       setTraveller(response.data);
  //     } catch (error) {
  //       setLoading(false);
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [refetch]);

  const url = `/traveller/findTravellerbyAgentId/${agentId}`;
  const {
    data: travellar,
    error,
    isLoading,
    refetch,
  } = useGetItemsQuery({ url });

  useEffect(() => {
    if (travellar) {
      setData(travellar);
      setTraveller(travellar);
    }

    refetch();
  }, [travellar]);

  const [deleteItem, { isLoading: deleteLoading, isError }] =
    useDeleteItemMutation();
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });

      if (result.isConfirmed) {
        setIsDone(id);
        const url = `traveller/removeTraveller/${id}`;
        const result = await deleteItem(url).unwrap();
        Swal.fire({
          title: 'Deleted!',
          text: 'Your Traveller has been deleted.',
          icon: 'success',
          customClass: {
            popup: 'custom-swal-popup',
          },
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: error?.data?.message,
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
    } finally {
      setIsDone(null);
    }
  };

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
    setTraveller(filteredResults);
  };

  const handleAddTravellar = () => {
    navigate('/dashboard/addtravellar');
  };

  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        pb: { xs: 10, md: 1 },
      }}
    >
      <HeaderTitle
        headerTitle={`Traveller Details`}
        handleAddTravellar={handleAddTravellar}
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
              fontSize: { xs: 16, md: 20 },
              fontWeight: 500,
            }}
          >
            Traveller List
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
          <TableLoader row={10} cell={9} />
        ) : (
          <>
            {error ? (
              'There is no traveller list'
            ) : (
              <>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <CustomTable
                    columns={columns}
                    data={traveller}
                    pageList={13}
                    textAlign="center"
                  />
                </Box>

                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  <TravellarListPhone
                    data={traveller}
                    handleDelete={handleDelete}
                    isDone={isDone}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
export default TravellarList;
