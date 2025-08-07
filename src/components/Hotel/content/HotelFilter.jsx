/* eslint-disable react/prop-types */

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import ImageImport from '../../../assets/ImageImport';
import StarIcon from '@mui/icons-material/Star';
import MapComponent from '../MapComponent/MapComponent';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../../redux/slices/hotelFiltersSlice';
import companyInfo from '../../../common/companyInfo';
import { setHotelFilterModal } from '../../../redux/slices/hotelSearchSlice';
const priceRanges = [
  {
    min: 0,
    max: 2000,
  },
  {
    min: 2000,
    max: 4000,
  },
  {
    min: 4000,
    max: 7000,
  },
  {
    min: 7000,
    max: 10000,
  },
  {
    min: 10000,
    max: 10000000,
  },
];

const HotelFilter = ({ filterData, filters, resetFilters, filterLoading }) => {
  const dispatch = useDispatch();
  const [hotelName, setHotelName] = useState('');
  const handleFilterChange = (e) => {
    e.preventDefault();
    dispatch(
      setFilters({
        ...filters,
        hotelName: hotelName,
      })
    );
  };
  const reviewRatings = filterData?.[0]?.facets.reviewRatings;
  const providers = filterData?.[0]?.availableTypes;
  const availableFacilities = filterData?.[0]?.availableFacilities;

  const handleCheckBoxFilter = (e, category) => {
    const value = e.target.name;
    const isChecked = e.target.checked;

    const prevValues = filters[category] || [];
    const updatedValues = isChecked
      ? [...prevValues, value]
      : prevValues.filter((item) => item !== value);

    dispatch(
      setFilters({
        ...filters,
        [category]: updatedValues,
      })
    );
    dispatch(setHotelFilterModal({ filtermodal: false }));
  };

  const [showAll, setShowAll] = useState({
    providers: false,
    facilities: false,
  });

  const toggleShowMore = (section) => {
    setShowAll((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const visibleProviders = showAll.providers
    ? providers
    : providers.slice(0, 8);
  const visibleFacilities = showAll.facilities
    ? availableFacilities
    : availableFacilities.slice(0, 8);

  const handleBooleanFilterChange = (e) => {
    const { name, checked } = e.target;

    dispatch(
      setFilters({
        ...filters,
        [name]: checked,
      })
    );
    dispatch(setHotelFilterModal({ filtermodal: false }));
  };

  const isFilterActive = (filters) => {
    return (
      filters.hotelName !== '' ||
      filters.ratings !== null ||
      filters.freeBreakfast !== false ||
      filters.isRefundable !== false ||
      (filters.subLocationIds && filters.subLocationIds.length > 0) ||
      filters.facilities.length > 0 ||
      filters.type.length > 0 ||
      (filters.tags && filters.tags.length > 0) ||
      filters.reviewRatings !== null
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
    dispatch(setHotelFilterModal({ filtermodal: false }));
  };

  const handleReviewRatingFilter = (rating) => {
    const currentRating = filters.reviewRatings;

    const updatedRating = currentRating === rating ? null : rating;
    dispatch(
      setFilters({
        ...filters,
        reviewRatings: updatedRating,
      })
    );

    dispatch(setHotelFilterModal({ filtermodal: false }));
  };

  const handleRange = (newValue) => {
    dispatch(
      setFilters({
        ...filters,
        priceRange: {
          min: newValue?.min,
          max: newValue?.max,
        },
      })
    );
    dispatch(setHotelFilterModal({ filtermodal: false }));
  };

  return (
    <Box>
      <Stack direction="column" sx={{ width: '100%' }}>
        <Box>{/* <MapComponent locationList={} /> */}</Box>
        <Box
          bgcolor="white"
          sx={{
            bgcolor: 'var(--white)',
            borderRadius: '6px',
            width: '100%',
            px: 2,
            mb: 1,
          }}
        >
          <Box
            sx={{
              pb: 2,
            }}
          >
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography
                sx={{
                  color: 'var(--black)',
                  fontSize: { xs: 15 },
                  fontWeight: 500,
                  py: 1,
                  width: '100%',
                }}
              >
                Search Hotel
              </Typography>
              <Button
                sx={{
                  textTransform: 'capitalize',
                  color: 'var(--red)',
                  py: 0,
                  px: 0.1,
                  border: isFilterActive(filters)
                    ? '1px solid #ed1c2341'
                    : '1px solid var(--light-stroke)',
                  borderRadius: 5,
                  fontSize: 13,
                  fontWeight: 300,
                }}
                onClick={() => {
                  if (!filterLoading) {
                    resetFilters();
                    setHotelName('');
                  }
                }}
                disabled={filterLoading || !isFilterActive(filters)}
              >
                Reset
              </Button>
            </Stack>
            <form
              onSubmit={(e) => {
                if (!filterLoading) {
                  handleFilterChange(e);
                }
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  input: {
                    border: '1px solid var(--bgcolor)',
                    outline: 'none',
                    p: '5px 35px 5px 10px',
                    fontSize: 14,
                    borderRadius: '5px',
                    width: '100%',
                  },
                  position: 'relative',
                }}
                className="custom-input"
              >
                <input
                  type="text"
                  name="hotelName"
                  value={hotelName}
                  placeholder="Property name"
                  onChange={(e) => {
                    if (!filterLoading) {
                      setHotelName(e.target.value);
                    }
                  }}
                  disabled={filterLoading}
                />

                <button
                  type="submit"
                  style={{
                    position: 'absolute',
                    top: '28%',
                    right: '5%',
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                    cursor: filterLoading ? 'not-allowed' : 'pointer',
                  }}
                  disabled={filterLoading}
                >
                  <img src={ImageImport.fsearch} alt="Search" />
                </button>
              </Box>
            </form>
          </Box>
        </Box>

        <Box
          bgcolor="white"
          sx={{
            bgcolor: 'var(--white)',
            borderRadius: '6px',
            px: 2,
            mb: 1,
          }}
        >
          <Typography
            sx={{
              color: 'var(--black)',
              fontSize: { xs: 15 },
              fontWeight: 500,
              py: 1,
              width: '100%',
            }}
          >
            Star Ratings
          </Typography>
          <Box
            sx={{
              width: '100%',
              pb: 2,
            }}
          >
            <Grid container rowSpacing={1} justifyContent="space-between">
              {['2', '3', '4', '5'].map((item) => (
                <Grid
                  item
                  key={item}
                  onClick={() => {
                    if (!filterLoading) {
                      handleRatingFilter(item, 'ratings');
                    }
                  }}
                  sx={{
                    cursor: filterLoading ? 'not-allowed' : 'pointer',
                    opacity: filterLoading ? 0.6 : 1,
                  }}
                >
                  <Stack
                    alignItems="center"
                    direction="row"
                    sx={{
                      bgcolor: filters.ratings?.includes(item)
                        ? '#FFB400'
                        : '#EBF0F5',
                      px: 1.8,
                      py: 0.5,
                      borderRadius: 1,
                      transition: '0.3s ease',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: filters.ratings?.includes(item)
                          ? '#fff'
                          : '#000',
                      }}
                    >
                      {item}&nbsp;
                    </Typography>
                    <StarIcon
                      sx={{
                        fontSize: 12,
                        color: filters.ratings?.includes(item)
                          ? '#fff'
                          : '#FFB400',
                      }}
                    />
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        <Box
          bgcolor="white"
          sx={{
            bgcolor: 'var(--white)',
            borderRadius: '6px',
            px: 2,
            mb: 1,
          }}
        >
          <Typography
            sx={{
              color: 'var(--black)',
              fontSize: { xs: 15 },
              fontWeight: 500,
              py: 1,
              width: '100%',
            }}
          >
            User Ratings
          </Typography>
          <Box
            sx={{
              width: '100%',
              pb: 2,
            }}
          >
            <Grid container spacing={1.2}>
              {Array.isArray(reviewRatings) &&
                [...reviewRatings].reverse().map((item) => (
                  <Grid
                    item
                    key={item?.rating ?? item}
                    onClick={() => {
                      if (!filterLoading) {
                        handleReviewRatingFilter(item?.rating); // simplified, name param removed
                      }
                    }}
                    sx={{
                      cursor: filterLoading ? 'not-allowed' : 'pointer',
                      opacity: filterLoading ? 0.6 : 1,
                    }}
                  >
                    <Stack
                      alignItems="center"
                      direction="row"
                      sx={{
                        bgcolor:
                          filters.reviewRatings === item?.rating
                            ? '#FFB400'
                            : '#EBF0F5',
                        px: 1.8,
                        py: 0.5,
                        borderRadius: 1,
                        transition: '0.3s ease',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 12,
                          color:
                            filters.reviewRatings === item?.rating
                              ? '#fff'
                              : '#000',
                        }}
                      >
                        {item?.rating}&nbsp;
                      </Typography>
                      <StarIcon
                        sx={{
                          fontSize: 12,
                          color:
                            filters.reviewRatings === item?.rating
                              ? '#fff'
                              : '#FFB400',
                        }}
                      />
                    </Stack>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
        <Box
          bgcolor="white"
          sx={{
            bgcolor: 'var(--white)',
            borderRadius: '6px',
            px: 2,
            mb: 1,
          }}
        >
          <Typography
            sx={{
              color: 'var(--black)',
              fontSize: { xs: 15 },
              fontWeight: 500,
              py: 1,
              width: '100%',
            }}
          >
            Price Range
          </Typography>
          <Box
            sx={{
              width: '100%',
              pb: 2,
            }}
          >
            <Grid container spacing={1}>
              {priceRanges.map((item, i) => {
                const isActive =
                  filters.priceRange?.min === item.min &&
                  filters.priceRange?.max === item.max;

                return (
                  <Grid
                    item
                    key={i}
                    onClick={() => {
                      if (!filterLoading) {
                        handleRange(item);
                      }
                    }}
                    sx={{
                      cursor: filterLoading ? 'not-allowed' : 'pointer',
                      opacity: filterLoading ? 0.6 : 1,
                    }}
                  >
                    <Stack
                      alignItems="center"
                      direction="row"
                      sx={{
                        bgcolor: isActive ? '#FFB400' : '#EBF0F5',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        transition: '0.3s ease',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 11,
                          color: isActive ? '#fff' : '#000',
                        }}
                      >
                        {item?.max === 10000000
                          ? 'More than 10000'
                          : `${item?.min} - ${item?.max}`}{' '}
                        {companyInfo.currencyCode}
                      </Typography>
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>

        <Box
          bgcolor="white"
          sx={{
            bgcolor: 'var(--white)',
            borderRadius: '6px',
            width: '100%',
            px: 2,
            mb: 1,
          }}
        >
          <Typography
            sx={{
              color: 'var(--black)',
              fontSize: { xs: 15 },
              fontWeight: 500,
              py: 1,
              width: '100%',
            }}
          >
            Property Type
          </Typography>
          <Box mb={1}>
            {visibleProviders.map((provider, i) => (
              <Stack direction="row" justifyContent="space-between" key={i}>
                <div className="ho-checkbox-air">
                  <input
                    type="checkbox"
                    id={`type-${provider}`}
                    name={provider}
                    checked={filters.type?.includes(provider)}
                    onChange={(e) => {
                      if (!filterLoading) {
                        handleCheckBoxFilter(e, 'type');
                      }
                    }}
                    style={{
                      width: 18,
                      height: 18,
                      outline: 'none',
                      cursor: filterLoading ? 'not-allowed' : 'pointer',
                      opacity: filterLoading ? 0.6 : 1,
                      transition: '0.3s ease',
                    }}
                  />
                  <label htmlFor={`type-${provider}`}>{provider}</label>
                </div>
              </Stack>
            ))}

            {providers.length > 5 && (
              <button
                onClick={() => {
                  if (!filterLoading) {
                    toggleShowMore('providers');
                  }
                }}
                style={{
                  cursor: filterLoading ? 'not-allowed' : 'pointer',
                  opacity: filterLoading ? 0.6 : 1,
                  color: 'var(--primary)',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                {showAll.providers ? 'See Less' : 'See More'}
              </button>
            )}
          </Box>
        </Box>
        <Box
          bgcolor="white"
          sx={{
            bgcolor: 'var(--white)',
            borderRadius: '6px',
            width: '100%',

            px: 2,
            mb: 1,
          }}
        >
          <Typography
            sx={{
              color: 'var(--black)',
              fontSize: { xs: 15 },
              fontWeight: 500,
              py: 1,
              width: '100%',
            }}
          >
            Property Facilities
          </Typography>
          <Box mb={1}>
            {visibleFacilities.map((provider, i) => (
              <Stack direction="row" justifyContent="space-between" key={i}>
                <div className="ho-checkbox-air">
                  <input
                    type="checkbox"
                    id={`facility-${provider}`}
                    name={provider}
                    checked={filters.facilities?.includes(provider)}
                    onChange={(e) => {
                      if (!filterLoading) {
                        handleCheckBoxFilter(e, 'facilities');
                      }
                    }}
                    style={{
                      width: 18,
                      height: 18,
                      outline: 'none',
                      cursor: filterLoading ? 'not-allowed' : 'pointer',
                      opacity: filterLoading ? 0.6 : 1,
                      transition: '0.3s ease',
                    }}
                  />
                  <label htmlFor={`facility-${provider}`}>{provider}</label>
                </div>
              </Stack>
            ))}

            {availableFacilities.length > 5 && (
              <button
                onClick={() => {
                  if (!filterLoading) {
                    toggleShowMore('facilities');
                  }
                }}
                style={{
                  cursor: filterLoading ? 'not-allowed' : 'pointer',
                  opacity: filterLoading ? 0.6 : 1,
                  color: 'var(--primary)',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                {showAll.facilities ? 'See Less' : 'See More'}
              </button>
            )}
          </Box>
        </Box>

        <Box
          bgcolor="white"
          sx={{
            bgcolor: 'var(--white)',
            borderRadius: '6px',
            width: '100%',

            px: 2,
            mb: 2,
          }}
        >
          <Typography
            sx={{
              color: 'var(--black)',
              fontSize: { xs: 15 },
              fontWeight: 500,
              py: 1,
              width: '100%',
            }}
          >
            Popular filters
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <div className="ho-checkbox-air">
              <input
                type="checkbox"
                id="isRefundable"
                name="isRefundable"
                checked={filters.isRefundable}
                onChange={(e) => {
                  if (!filterLoading) {
                    handleBooleanFilterChange(e);
                  }
                }}
                style={{
                  width: 18,
                  height: 18,
                  outline: 'none',
                  cursor: filterLoading ? 'not-allowed' : 'pointer',
                  opacity: filterLoading ? 0.6 : 1,
                  transition: '0.3s ease',
                }}
              />
              <label htmlFor={`isRefundable`}>Refundable</label>
            </div>
            <div className="ho-checkbox-air">
              <input
                type="checkbox"
                id="freeBreakfast"
                name="freeBreakfast"
                checked={filters.freeBreakfast}
                onChange={(e) => {
                  if (!filterLoading) {
                    handleBooleanFilterChange(e);
                  }
                }}
                style={{
                  width: 18,
                  height: 18,
                  outline: 'none',
                  cursor: filterLoading ? 'not-allowed' : 'pointer',
                  opacity: filterLoading ? 0.6 : 1,
                  transition: '0.3s ease',
                }}
              />
              <label htmlFor={`freeBreakfast`}>Breakfast</label>
            </div>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default HotelFilter;
