/* eslint-disable react/prop-types */
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/slices/hotelFiltersSlice';
// import { setFilters } from '../../redux/slices/hotelSearchSlice';

const HotelHeaderFilter = ({ resetFilters, totalHotel, filterLoading }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const isFilterActive = (filters) => {
    return (
      filters.hotelName !== '' ||
      filters.ratings.length > 0 ||
      filters.finalRate !== '' ||
      filters.relevance !== false ||
      filters.freeBreakfast !== false ||
      filters.isRefundable !== false ||
      filters.facilities.length > 0 ||
      filters.type.length > 0 ||
      filters.reviewRatings.length > 0 ||
      typeof filters.userMaxRating === 'number'
    );
  };

  const handleRatingFilter = (rating, name) => {
    const currentRatings = filters[name] || [];
    const isSelected = currentRatings.includes(rating);

    const updatedRatings = isSelected
      ? currentRatings.filter((r) => r !== rating)
      : [...currentRatings, rating];

    dispatch(
      setFilters({
        ...filters,
        [name]: updatedRatings,
      })
    );
  };

  // const handleFilterFinalRate = (value, name) => {
  //   dispatch(
  //     setFilters({
  //       ...filters,
  //       [name]: value === 'asc' ? 'dsc' : 'asc',
  //     })
  //   );
  // };
  const handleFilterFinalRate = (value) => {
    dispatch(
      setFilters({
        ...filters,
        finalRate: value,
        relevance: false,
      })
    );
  };

  const cardStyle = {
    border: '1px solid var(--light-stroke)',
    color: 'var(--dark-sky)',
    fontSize: 12,
    px: { xs: 1, md: 2 },
    py: { xs: 0.5, md: 1 },
    borderRadius: 1,
    bgcolor: 'var(--white)',
    cursor: 'pointer',
  };

  const activeCardStyle = {
    ...cardStyle,
    bgcolor: 'var(--primary)', // Set your active bg color here
    color: 'var(--white)',
  };
  // const isReviewFilterActive =
  //   filters.reviewRatings &&
  //   filters.reviewRatings.includes(filters?.userMaxRating);
  return (
    <Box>
      <Grid container spacing={{ xs: 0.5, md: 1 }}>
        <Grid item>
          <Box sx={cardStyle}>{totalHotel || 0} Hotels Found</Box>
        </Grid>
        {/* <Grid item>
          <Box
            onClick={() => {
              if (!filterLoading) {
                resetFilters();
              }
            }}
            sx={{
              ...(!isFilterActive(filters) ? activeCardStyle : cardStyle),
              cursor: filterLoading ? 'not-allowed' : 'pointer',
              opacity: filterLoading ? 0.6 : 1,
              display: { xs: 'none', md: 'block' },
            }}
          >
            Most Popular
          </Box>
        </Grid> */}

        <Grid item>
          <Box
            onClick={() => {
              if (!filterLoading) {
                resetFilters();
                // dispatch(
                //   setFilters({ ...filters, relevance: !filters.relevance })
                // );
              }
            }}
            sx={{
              ...(filters?.finalRate === 'dsc' || filters?.finalRate === 'asc'
                ? cardStyle
                : filters?.relevance
                ? activeCardStyle
                : cardStyle),
              cursor: filterLoading ? 'not-allowed' : 'pointer',
              opacity: filterLoading ? 0.6 : 1,
            }}
          >
            Most Popular
          </Box>
        </Grid>

        <Grid item>
          <Box
            onClick={() => {
              if (!filterLoading) {
                handleFilterFinalRate('dsc'); // Highest Price
              }
            }}
            sx={{
              ...(filters?.finalRate === 'dsc' ? activeCardStyle : cardStyle),
              cursor: filterLoading ? 'not-allowed' : 'pointer',
              opacity: filterLoading ? 0.6 : 1,
            }}
          >
            Highest Price
          </Box>
        </Grid>

        <Grid item>
          <Box
            onClick={() => {
              if (!filterLoading) {
                handleFilterFinalRate('asc'); // Lowest Price
              }
            }}
            sx={{
              ...(filters?.finalRate === 'asc' ? activeCardStyle : cardStyle),
              cursor: filterLoading ? 'not-allowed' : 'pointer',
              opacity: filterLoading ? 0.6 : 1,
            }}
          >
            Lowest Price
          </Box>
        </Grid>
        {/* <Grid item>
          <Box
            onClick={() => {
              if (!filterLoading) {
                handleRatingFilter(filters?.userMaxRating, 'reviewRatings');
              }
            }}
            sx={{
              ...(isReviewFilterActive ? activeCardStyle : cardStyle),
              cursor: filterLoading ? 'not-allowed' : 'pointer',
              opacity: filterLoading ? 0.6 : 1,
            }}
          >
            Highest Guest Rating
          </Box>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default HotelHeaderFilter;
