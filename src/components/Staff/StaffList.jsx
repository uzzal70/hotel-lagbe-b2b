import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../Common/CustomButton';
import CustomTable from '../Common/Table/CustomTable';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import moment from 'moment';
import BackButton from '../Common/BackButton';
import {
  useDeleteItemMutation,
  useGetItemsQuery,
} from '../../redux/slices/apiSlice';
import Token from '../Common/Token';
import CustomCircularProgress from './../Common/CustomCircularProgress';
import TableLoader from '../Common/Table/TableLoader';
import Swal from 'sweetalert2';
import FilterSearchInput from '../Common/FilterSearchInput';
import StaffListPhone from './StaffListPhone';
import HeaderTitle from '../../common/HeaderTitle';

const StaffList = () => {
  const navigate = useNavigate();
  // const [loadingRows, setLoadingRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDone, setIsDone] = useState(null);
  const columns = [
    {
      Header: 'First Name',
      accessor: 'user.firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'user.lastName',
    },
    {
      Header: 'Role',
      accessor: 'designation',
    },

    {
      Header: 'Created Date',
      accessor: 'createdAt',
      Cell: (row) => {
        return <Box> {moment(row.value).format('DD MMM YYYY')}</Box>;
      },
    },

    {
      Header: 'Email',
      accessor: 'user.email',
    },

    {
      Header: 'Action',
      accessor: '',
      // eslint-disable-next-line no-unused-vars
      Cell: (row) => {
        // const isRowLoading = loadingRows.includes(row.row.original.userId);
        return (
          <Stack direction="row" spacing={2} justifyContent="center">
            <Tooltip title="Edit Staff">
              <EditTwoToneIcon
                sx={{ color: 'var(--primary)', cursor: 'pointer' }}
                onClick={() =>
                  navigate('/dashboard/addstaff', {
                    state: {
                      data: row?.row?.original?.user,
                      role: row?.row?.original?.designation,
                      id: row?.row?.original?.id,
                      userId: row?.row?.original?.userId,
                      update: 'PATCH',
                    },
                  })
                }
              />
            </Tooltip>
            {isDone === row?.row?.original?.id ? (
              <CustomCircularProgress />
            ) : (
              // {isRowLoading ? (
              //   <CustomCircularProgress />
              // ) : (
              <Tooltip title="Delete Staff">
                <DeleteForeverTwoToneIcon
                  onClick={() => handleDelete(row.row.original.userId)}
                  sx={{ color: 'var(--red)', cursor: 'pointer' }}
                />
              </Tooltip>
            )}
          </Stack>
        );
      },
    },
  ];
  const agentId = Token();
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const url = `/agent/findAgentStaffbyAgentId/${agentId}?page=1&pageSize=30`;
  const {
    data: staffData,
    error,
    isLoading,
    refetch,
  } = useGetItemsQuery({ url });

  useEffect(() => {
    if (staffData) {
      setData(staffData);
      setFilterData(staffData);
    }

    refetch();
  }, [staffData]);

  const [deleteItem, { isLoading: deleteLoading, isError }] =
    useDeleteItemMutation();

  const handleDelete = async (itemId) => {
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
        setIsDone(itemId);
        const url = `agent/deleteAgentStaff/${itemId}`;
        const result = await deleteItem(url).unwrap();
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
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

  const searchFilter = (array, searchTerm) => {
    return array.filter((item) => {
      return Object.entries(item).some(([key, value]) => {
        if (typeof value === 'object') {
          return searchFilter([value], searchTerm).length > 0;
        } else if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm);
        }
        return false;
      });
    });
  };

  const handleChange = ({ target: { value } }) => {
    const searchKey = value.toLowerCase();
    const result = searchFilter(data, searchKey);
    setFilterData(result);
  };

  const handleAddTravellar = () => {
    navigate('/dashboard/addstaff');
  };

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
        headerTitle={`Staff Details`}
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
              fontSize: { xs: 14, sm: 16, md: 20 },
              fontWeight: 500,
            }}
          >
            Staff List
          </Typography>
          <Box>
            <FilterSearchInput
              name="name"
              placeholder="Search..."
              onChange={handleChange}
              width={{ xs: 200, sm: 200, md: 250 }}
            />
          </Box>
        </Stack>
        {isLoading ? (
          <Box>
            <TableLoader row={10} cell={6} />
          </Box>
        ) : (
          <Box>
            {error ? (
              'There is no staff list'
            ) : (
              <>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <CustomTable
                    columns={columns}
                    data={filterData}
                    pageList={10}
                    textAlign="center"
                  />
                </Box>

                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  <StaffListPhone
                    data={filterData}
                    handleDelete={handleDelete}
                    isDone={isDone}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </Box>
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default StaffList;
