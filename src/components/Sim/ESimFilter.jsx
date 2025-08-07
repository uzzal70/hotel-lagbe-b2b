import React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Grid,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, resetFilters } from '../../redux/slices/simFilterSlice';
import companyInfo from '../../common/companyInfo';

const ESimFilter = ({ data }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.simFilters);
  // const handleChange = (event) => {
  //   dispatch(setFilters({ [event.target.name]: event.target.value }));
  // };

  const handleSliderChange = (_, newValue) => {
    dispatch(setFilters({ priceRange: newValue }));
  };

  const handleCheckboxChange = (event) => {
    dispatch(setFilters({ voiceSms: event.target.checked }));
  };
  // const minPrice = Math.min(...data.map((item) => parseFloat(item.netPrice))); // Get the min price
  // const maxPrice = Math.max(...data.map((item) => parseFloat(item.netPrice))); // Get the max price

  const prices = data
    ?.map((item) => parseFloat(item.netPrice))
    .filter((price) => !isNaN(price) && price >= 0); // Remove invalid or negative prices

  const minPrice = prices.length > 0 ? Math.min(...prices) : 0; // Default to 0 if no valid prices
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 100; // Default max (adjust as needed)

  if (prices.length === 0) {
    console.warn('Warning: No valid prices found in the data.');
  }
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'white',
        borderRadius: 1,
        height: 'fit-content',
        width: '100%',
      }}
    >
      <InputLabel>Price</InputLabel>
      <Slider
        value={filters.priceRange}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={minPrice}
        max={maxPrice}
        size="small"
        aria-label="Price Range"
        sx={{ color: 'var(--primary)' }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: -1.5,
          mb: 1,
          color: 'var(--dark-gray)',
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        <span>{`${filters.priceRange[0]} ${companyInfo.currencyCode}`}</span>
        <span>{`${filters.priceRange[1]} ${companyInfo.currencyCode}`}</span>
      </Box>

      <Box py={1}>
        <InputLabel sx={{ bgcolor: 'var(--white)', mb: 1 }}>
          Plan Size
        </InputLabel>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Grid container spacing={1}>
            {filters?.uniquePlanSizes?.map((value) => (
              <Grid item xs={4} key={value}>
                <Box
                  sx={{
                    bgcolor:
                      filters.planSize === `${value} GB`
                        ? 'var(--primary)'
                        : 'var(--bgcolor)',
                    borderRadius: 1,
                    p: 1,
                    color:
                      filters.planSize === `${value} GB`
                        ? 'var(--white)'
                        : 'var(--primary)',
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'var(--primary)',
                      color: 'var(--white)',
                    },
                    textAlign: 'center',
                  }}
                  onClick={() => {
                    // Toggle the validity selection
                    if (filters.planSize === `${value} GB`) {
                      // If the same value is clicked, reset the filter (deselect)
                      dispatch(setFilters({ planSize: '' }));
                    } else {
                      // Otherwise, set the selected validity
                      dispatch(setFilters({ planSize: `${value} GB` }));
                    }
                  }}
                >
                  {`${value} `}
                </Box>
              </Grid>
            ))}
          </Grid>
        </FormControl>
      </Box>
      <Box py={1}>
        <InputLabel sx={{ bgcolor: 'var(--white)', mb: 1 }}>
          Validity (days)
        </InputLabel>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Grid container spacing={1}>
            {filters?.uniqueValidities?.map((value) => (
              <Grid item xs={4} key={value}>
                <Box
                  sx={{
                    bgcolor:
                      filters.validity === `${value} days`
                        ? 'var(--primary)'
                        : 'var(--bgcolor)',
                    borderRadius: 1,
                    p: 1,
                    color:
                      filters.validity === `${value} days`
                        ? 'var(--white)'
                        : 'var(--primary)',
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'var(--primary)',
                      color: 'var(--white)',
                    },
                    textAlign: 'center',
                  }}
                  onClick={() => {
                    if (filters.validity === `${value} days`) {
                      dispatch(setFilters({ validity: '' }));
                    } else {
                      dispatch(setFilters({ validity: `${value} days` }));
                    }
                  }}
                >
                  {`${value} days`}
                </Box>
              </Grid>
            ))}
          </Grid>
        </FormControl>
      </Box>

      {/* <FormControlLabel
        control={
          <Checkbox
            checked={filters.voiceSms}
            onChange={handleCheckboxChange}
          />
        }
        label={
          <Typography
            sx={{
              fontSize: 14,
            }}
          >
            Show plans with Voice/SMS
          </Typography>
        }
      /> */}

      <Button
        variant="outlined"
        sx={{
          color: 'var(--secondary)',
          '&:hover': {
            color: 'var(--secondary)',
            border: '1px solid var(--stroke)',
          },
          mt: 2,
          textTransform: 'capitalize',
          border: '1px solid var(--stroke)',
        }}
        fullWidth
        onClick={() => {
          dispatch(setFilters({ planSize: '' }));
          dispatch(setFilters({ validity: '' }));
          dispatch(setFilters({ priceRange: [minPrice, maxPrice] }));
        }}
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default ESimFilter;
