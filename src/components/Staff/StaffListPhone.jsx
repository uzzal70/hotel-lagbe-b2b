/* eslint-disable react/prop-types */
import { Box, Grid, Stack, Typography } from '@mui/material';
import edit from '../../assets/icon/edit.png';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import CustomPagination from '../Common/Table/CustomPagination';

const StaffListPhone = ({
  data,
  isDone,
  handleDelete,
  currentPage,
  setCurrentPage,
}) => {
  const navigate = useNavigate();

  const pageLength = 15;
  const pageCount = Math.ceil(data?.length / pageLength);
  const pageData = (data || []).slice(
    currentPage * pageLength,
    currentPage * pageLength + pageLength
  );

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  const canPreviousPage = (() => currentPage > 0, [currentPage]);
  const canNextPage =
    (() => currentPage < pageCount - 1, [currentPage, pageCount]);
  return (
    <div>
      <Grid container spacing={{ xs: 1.5, md: 2 }} mb={2}>
        {pageData?.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={i}>
            <Box
              sx={{
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
                p: 2,
                fontWeight: 300,
                span: {
                  color: 'var(--disable)',
                },
                color: 'var(--secondary)',
                borderRadius: 1,
                bgcolor: 'var(--white)',
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  noWrap
                  sx={{ fontSize: 13, color: 'var(--primary)' }}
                >
                  {item?.user?.firstName?.toUpperCase() +
                    '' +
                    item?.user?.lastName?.toUpperCase()}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Box
                    onClick={() =>
                      navigate('/dashboard/addstaff', {
                        state: {
                          data: item?.user,
                          role: item?.designation,
                          id: item?.id,
                          userId: item?.userId,
                          update: 'PATCH',
                        },
                      })
                    }
                  >
                    <img
                      src={edit}
                      alt=""
                      style={{
                        height: '18px',
                        maxWidth: '100px',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                  {isDone === item?.userId ? (
                    <span style={{ fontSize: 10 }}>Deleting...</span>
                  ) : (
                    <DeleteForeverTwoToneIcon
                      onClick={() => handleDelete(item?.userId)}
                      sx={{
                        color: 'var(--red)',
                        cursor: 'pointer',
                        fontSize: 21,
                      }}
                    />
                  )}
                </Stack>
              </Stack>
              <Grid container columnSpacing={2} pt={2}>
                <Grid item xs={6}>
                  <Box>
                    <Typography
                      sx={{
                        color: 'var(--primary-rgb)',
                        fontSize: 12,
                        span: {
                          color: 'var(--secondary)',
                        },
                      }}
                    >
                      <span>Role: </span>
                      {item?.designation}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <Typography
                      sx={{
                        color: 'var(--primary-rgb)',
                        fontSize: 12,
                        span: {
                          color: 'var(--secondary)',
                        },
                      }}
                    >
                      <span>Created Date: </span>
                      {moment(item.createdAt).format('DD MMM YYYY')}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography
                      sx={{
                        color: 'var(--primary-rgb)',
                        fontSize: 12,
                        span: {
                          color: 'var(--secondary)',
                        },
                      }}
                    >
                      <span>Email: </span>
                      {item?.user?.email}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
      <CustomPagination
        pageIndex={currentPage}
        pageCount={pageCount}
        gotoPage={handlePageChange}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
      />
    </div>
  );
};

export default StaffListPhone;
