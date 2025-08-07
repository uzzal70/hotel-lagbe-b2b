import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import { baseUrl } from '../../../baseurl';
import Token from '../Common/Token';
import CustomPagination from '../Common/Table/CustomPagination';
import moment from 'moment';
import FilterSelect from '../Common/FilterSelect';
import CustomSearchInput from '../Common/CustomSearchInput';
import InsuCardSkeleton from '../Loading/InsuCardSkeleton';
import { Link, useNavigate } from 'react-router-dom';
const formatFieldName = (fieldName) => {
  return fieldName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
const statusData = [
  { value: 'ORDER_CREATED', name: 'ORDER CREATED' },
  { value: 'ORDER_APPROVED', name: 'ORDER APPROVED' },
  { value: 'ORDER_PENDING', name: 'ORDER PENDING' },
];

const InsuranceList = () => {
  const navigate = useNavigate();
  const agentId = Token();
  const [searchWord, setSearchWord] = useState({
    word: '',
    status: '', // Assuming you intend to use a status filter as well
  });
  const [currentPage, setCurrentPage] = useState(1);

  const url = `${baseUrl}/core/insurance/agentGetAllBimafyOrdersByAgentId?agentId=${agentId}&page=${
    searchWord.status ? 1 : currentPage
  }&pageSize=12&${
    searchWord.status ? `status=${searchWord.status}` : ''
  }&searchWord=${searchWord.word || ''}`;

  // Assuming you're using a query library like React Query
  const { data, isLoading, refetch, isError } = useGetItemsQuery({ url });

  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure event.target for clarity
    setSearchWord((prevSearchWord) => ({
      ...prevSearchWord,
      [name]: value, // Update the appropriate property based on event.target.name
    }));
  };

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage + 1);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    refetch({
      agentId,
      page: searchWord.status ? 1 : currentPage,
      status: searchWord.status || '',
      searchWord: searchWord.word || '',
    });
  }, [refetch, searchWord, currentPage]);
  const insuData = data?.data;

  const handleDetails = (id) => {
    navigate(`/dashboard/insurancebookingdetails/${id}`, {});
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        mb: { xs: 10, md: 2 },
      }}
    >
      <Box mt={{ xs: 2, md: 3 }}>
        <Box
          sx={{
            bgcolor: 'var(--bgcolor)',
            p: 1,
            display: { xs: 'block', sm: 'flex' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            borderRadius: 1,
            mb: 2,
          }}
        >
          <Box
            sx={{
              fontSize: { xs: 18, md: 20 },
              color: 'var(--primary)',
              textAlign: 'center',
              mb: { xs: 1, md: 0 },
            }}
          >
            Purchased Insurence Lists
          </Box>
          <Box>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item xs={12} md={3}>
                <Box
                  sx={{
                    border: '1px solid var(--stroke)',
                    textAlign: 'center',
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  <Link to="/dashboard?query=Insurance"> Search Now</Link>
                </Box>
              </Grid>
              <Grid item xs={6} md={5}>
                <CustomSearchInput
                  name="word"
                  value={searchWord?.word}
                  placeholder="Enter Search word."
                  onChange={handleChange}
                  width={'100%'}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <Box
                  sx={{
                    select: {
                      border: '1px solid var(--bgcolor)',
                      p: '8px',
                      fontSize: 14,
                      width: '100%',
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
                  <FilterSelect
                    data={statusData}
                    value={searchWord?.status}
                    handleChange={handleChange}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {isLoading ? (
          <InsuCardSkeleton list />
        ) : isError || insuData?.length <= 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'var(--bgcolor)',
              py: 2,
              px: 1,
              color: 'var(--primary)',
              mb: 4,
            }}
          >
            No Data Found
          </Box>
        ) : (
          <Grid container spacing={{ xs: 1, md: 2 }} mb={2}>
            {insuData?.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <Grid container spacing={0.5}>
                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          color: 'var(--secondary)',
                          bgcolor: 'var(--bgcolor)',
                          fontSize: { xs: 12, md: 14 },
                          p: 0.6,
                          textAlign: 'center',
                        }}
                      >
                        ID: {item?.orderRef || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          color: 'var(--secondary)',
                          fontSize: { xs: 12, md: 14 },
                          p: 0.6,
                          textTransform: 'capitalize',
                          textAlign: 'center',
                          bgcolor:
                            item?.orderStatus === 'ORDER_CREATED'
                              ? 'var(--ORDER_CREATED)'
                              : item?.orderStatus === 'ORDER_APPROVED'
                              ? 'var(--ORDER_APPROVED)'
                              : 'var(--ORDER_PENDING)',
                        }}
                      >
                        {formatFieldName(item?.orderStatus || 'N/A')}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{ p: { xs: 1, md: 2 } }}>
                    <Typography
                      sx={{
                        color: 'var(--secondary)',
                        fontSize: { xs: 12, md: 14 },
                      }}
                    >
                      Travel Purpose:{' '}
                      {formatFieldName(item?.travelPurpose || 'N/A')}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--secondary)',
                        fontSize: { xs: 12, md: 14 },
                      }}
                    >
                      Countries: {item?.countries || 'N/A'}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--secondary)',
                        fontSize: { xs: 12, md: 14 },
                      }}
                    >
                      Days: {item?.days || 'N/A'}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--secondary)',
                        fontSize: { xs: 12, md: 14 },
                      }}
                    >
                      Created At:{' '}
                      {moment(item?.bimafyOrderDetailsCreatedAt).format(
                        'DD MMM YYYY'
                      )}
                    </Typography>
                    <Box
                      sx={{
                        mt: -4,
                        textAlign: 'end',
                      }}
                    >
                      <Button
                        size="small"
                        sx={{
                          color: 'var(--primary)',
                          border: '1px solid var(--stroke)',
                          px: 1,
                          py: 0.3,
                          '&:hover': {
                            bgcolor: 'var(--white)',
                          },
                          textTransform: 'capitalize',
                        }}
                        startIcon={<RemoveRedEyeOutlinedIcon />}
                        onClick={() =>
                          handleDetails(item?.bimafyOrderDetailsId)
                        }
                      >
                        View
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        <CustomPagination
          pageIndex={currentPage - 1}
          pageCount={Math.ceil(data?.totalLength / 12)}
          gotoPage={handlePageChange}
          canPreviousPage={currentPage > 1}
          canNextPage={currentPage}
        />
      </Box>
    </Container>
  );
};

export default InsuranceList;
