import Select from 'react-select';
/* eslint-disable react/prop-types */
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import StarIcon from '@mui/icons-material/Star';
import { setFilters } from '../../../redux/slices/hotelFiltersSlice';
// import { setFilters } from '../../../redux/slices/hotelSearchSlice';
const HotelFormFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleBooleanFilterChange = (e) => {
    const { name, checked } = e.target;
    dispatch(
      setFilters({
        ...filters,
        [name]: checked,
      })
    );
  };
  const getRatingOptions = (filters) =>
    ['2', '3', '4', '5'].map((item) => ({
      label: (
        <Stack
          alignItems="center"
          direction="row"
          sx={{
            bgcolor: filters.ratings?.includes(item) ? '#FFB400' : '#EBF0F5',
            px: 1,
            py: 0,
            borderRadius: 1,
            transition: '0.3s ease',
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              color: filters.ratings?.includes(item) ? '#fff' : '#000',
            }}
          >
            {item}&nbsp;
          </Typography>
          <StarIcon
            sx={{
              fontSize: 10,
              color: filters.ratings?.includes(item) ? '#fff' : '#FFB400',
            }}
          />
        </Stack>
      ),
      value: item,
    }));
  const ratingOptions = getRatingOptions(filters); // Call the function with current filters

  //   const CustomClearIndicator = (props) => (
  //     <components.ClearIndicator {...props}>
  //       <ClearIcon style={{ color: 'red', fontSize: 18, p: 0 }} />
  //     </components.ClearIndicator>
  //   );

  //   // Custom "x" on selected item
  //   const CustomMultiValueRemove = (props) => (
  //     <components.MultiValueRemove {...props}>
  //       <CancelIcon style={{ color: '#FFB400', fontSize: 12, p: 0 }} />
  //     </components.MultiValueRemove>
  //   );

  // const handleAutoFill = (selected, field) => {
  //   const values = selected.map((item) => item.value); // extract numeric values
  //   dispatch(
  //     setFilters({
  //       ...filters,
  //       [field]: values,
  //     })
  //   );
  // };

  const handleRatingFilter = (selectedOptions, name) => {
    const updatedRatings = selectedOptions.map((option) => option.value);

    dispatch(
      setFilters({
        ...filters,
        [name]: updatedRatings,
      })
    );
  };

  return (
    <Box
      sx={{
        pt: 1,
      }}
    >
      <Grid
        container
        spacing={1}
        justifyContent={'flex-end'}
        alignItems={'center'}
      >
        <Grid item xs={6} sm={6} md={3} lg={2}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              border: '1px solid var(--light-stroke)',
              borderRadius: 1,
              py: 0.4,
            }}
          >
            <div className="ho-checkbox-air">
              <input
                type="checkbox"
                id="isRefundable"
                name="isRefundable"
                checked={filters.isRefundable}
                onChange={handleBooleanFilterChange}
                style={{
                  width: 16,
                  height: 16,
                  outline: 'none',
                  cursor: 'pointer',
                  transition: '0.3s ease',
                }}
              />
              <label htmlFor={`isRefundable`}>Free cancelation</label>
            </div>
          </Stack>
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={2}>
          <Box
            sx={{
              span: {
                display: 'none',
              },
              svg: {
                height: '12px',
              },
              '.css-art2ul-ValueContainer2': {
                p: 0,
              },
              '.MultiValueRemove': {
                p: 0,
              },
              border: '1px solid var(--light-stroke)',
              borderRadius: 1,
              button: {
                p: '0px !important',
              },
            }}
          >
            <Select
              isMulti
              options={ratingOptions}
              value={
                filters.ratings
                  ? ratingOptions.filter((opt) =>
                      filters.ratings.includes(opt.value)
                    )
                  : 'All'
              }
              onChange={(item) => handleRatingFilter(item, 'ratings')}
              placeholder="Hotel Star Rating"
              noOptionsMessage={() => 'No Source'}
              //   components={{
              //     ClearIndicator: CustomClearIndicator,
              //     MultiValueRemove: CustomMultiValueRemove,
              //   }}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: 'var(--transparent)',
                  outline: 'none',
                  boxSizing: 'border-box',
                  boxShadow: 'none',
                  border: 'none',
                  minHeight: '15px',
                  padding: '0 2px',
                  margin: 0,
                  // minWidth: '200px',
                  // maxWidth: '200px',
                  overflowX: 'auto',
                  display: 'flex',
                  fontSize: 14,
                  fontWeight: 400,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }),
                valueContainer: (provided) => ({
                  ...provided,
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                  flexWrap: 'nowrap',
                  maxWidth: '100%',
                  padding: '0px, 2px',
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected
                    ? 'var(--primary)'
                    : state.isFocused
                    ? 'var(--bgcolor)'
                    : 'var(--white)',
                  color: state.isSelected ? 'var(--white)' : 'var(--primary)',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: 'var(--primary)',
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: 'var(--disable)',
                  fontWeight: 300,
                  fontSize: 12,
                  paddingLeft: 5,
                }),

                clearIndicator: (provided) => ({
                  ...provided,
                  display: 'none',
                }),
              }}
            />
          </Box>
        </Grid>
        <Grid item md={1.5}></Grid>
      </Grid>
    </Box>
  );
};

export default HotelFormFilter;
