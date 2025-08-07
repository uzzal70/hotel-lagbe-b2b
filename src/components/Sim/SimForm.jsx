/* eslint-disable react/prop-types */
import { Box, Collapse, Grid, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ImageImport from '../../assets/ImageImport';
import MyLocationSharpIcon from '@mui/icons-material/MyLocationSharp';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { decrement, increment } from '../../redux/slices/simCardSlice';
import { Calendar } from 'react-date-range';
import moment from 'moment';
import Select from 'react-select';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
const commonBoxStyle = {
  border: '1px solid var(--stroke)',
  borderRadius: '5px',
  px: 1,
  py: { xs: 0.6, md: 0.4 },
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  //   alignItems: 'center',
};
const iconColor = {
  color: 'var(--disable)',
  fontSize: 18,
};

const selectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'var(--transparent)',
    outline: 'none',
    boxSizing: 'border-box',
    boxShadow: 'none',
    border: 'none',
    minHeight: '25px',
    padding: '0',
    margin: 0,
    minWidth: '100%',
    maxWidth: '200px',
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
    padding: '0',
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? 'var(--primary)'
      : state.isFocused
      ? 'var(--bgcolor)'
      : 'var(--white)',
    color: state.isSelected ? 'var(--white)' : 'var(--primary)',
    fontSize: '14px',
    padding: '10px',
    cursor: 'pointer',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--primary)', // Set color for the selected value
    fontWeight: 500, // Optional: Make the selected value text bold
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--disable)', // Customize placeholder color
    fontStyle: 'italic', // Optional: Style the placeholder text
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'var(--primary)',
    color: 'var(--white)',
    borderRadius: '10px',
    padding: '0',
    fontSize: '12px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'var(--white)',
    fontWeight: 600,
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'var(--white)',
    ':hover': {
      backgroundColor: 'red', // Custom hover color for the remove button
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'var(--disable)',
  }),
};

const isValidDate = (date) => {
  const parsedDate = new Date(date);
  return date && !isNaN(parsedDate.getTime());
};

const SimForm = ({
  simCardDetails,
  setSimCardDetails,
  totalSimCards,
  handleSearch,
}) => {
  const dispatch = useDispatch();
  const url = `/mobileDataSim/getEsimCountryList`;
  const { data, isLoading, isError } = useGetItemsQuery({ url });

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [typeMenuIsOpen, setTypeMenuIsOpen] = useState(false);

  let options = [];
  let typeOptions = [
    { label: 'Global eSIMs', value: 'GLOBAL' },
    { label: 'Regional eSIMs', value: 'REGIONAL' },
    { label: 'Local eSIMs', value: 'LOCAL' },
  ];
  let regionOptions = [
    { label: 'Asia', value: 'asia' },
    { label: 'Africa', value: 'africa' },
    { label: 'World', value: 'world' },
    { label: 'Caribbean Islands', value: 'caribbean-islands' },
    {
      label: 'Middle East and North Africa',
      value: 'middle-east-and-north-africa',
    },
  ];

  // Check for loading state or error state
  if (isLoading) {
    options = [];
  } else if (isError) {
    options = [];
  } else {
    options =
      data?.map((x) => ({
        value: x?.code,
        label:
          x?.name
            ?.split(' ')
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ') || '',
      })) || [];
  }

  // Handle add SIM card
  const handleAddSimCard = () => {
    if (totalSimCards < 9) {
      dispatch(increment());
      setSimCardDetails((prev) => ({ ...prev, count: totalSimCards + 1 })); // Update local state count
    }
  };

  // Handle remove SIM card
  const handleRemoveSimCard = () => {
    if (totalSimCards > 1) {
      dispatch(decrement());
      setSimCardDetails((prev) => ({ ...prev, count: totalSimCards - 1 })); // Update local state count
    }
  };

  const handleAutoFill = (selectedOption, fieldName) => {
    setSimCardDetails((prev) => ({
      ...prev,
      [fieldName]: selectedOption ? selectedOption.value : '',
    }));
  };
  // Open or close the menu
  const openSelectMenu = () => {
    setMenuIsOpen((prevState) => !prevState);
    setSimCardDetails((prev) => ({
      ...prev,
      isDatePickerOpen: false, // Close date picker when the menu opens
    }));
  };
  const openSelectTypeMenu = () => {
    setTypeMenuIsOpen((prevState) => !prevState);
    setSimCardDetails((prev) => ({
      ...prev,
      isDatePickerOpen: false, // Close date picker when the menu opens
    }));
  };
  // console.log(simCardDetails);
  return (
    <Box mt={2}>
      <Grid container rowSpacing={1} columnSpacing={1} alignItems="stretch">
        <Grid item xs={12} md={3.5}>
          <Box sx={commonBoxStyle}>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
              }}
            >
              <MyLocationSharpIcon
                sx={iconColor}
                onClick={() => openSelectTypeMenu()}
              />
              <Box
                sx={{
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    fontSize: 14,
                    color: 'var(--secondary)',
                    mb: -0.5,
                  }}
                  onClick={() => openSelectTypeMenu()}
                >
                  Type
                </Box>
                <Box
                  sx={{
                    fontSize: 14,
                    color: 'var(--primary)',
                    span: {
                      display: 'none',
                    },
                    svg: {
                      height: '15px',
                    },
                    '.css-art2ul-ValueContainer2': {
                      p: 0,
                    },
                  }}
                >
                  <Select
                    name="type"
                    placeholder="Select a Type"
                    onChange={(selectedOption) =>
                      handleAutoFill(selectedOption, 'type')
                    }
                    value={typeOptions.filter((option) =>
                      simCardDetails.type.includes(option.value)
                    )}
                    options={typeOptions}
                    isClearable={false}
                    menuIsOpen={typeMenuIsOpen}
                    onMenuOpen={() => {
                      setTypeMenuIsOpen(true);
                      // setSimCardDetails((prev) => ({
                      //   ...prev,
                      //   isDatePickerOpen: false,
                      // }));
                    }}
                    onMenuClose={() => setTypeMenuIsOpen(false)}
                    noOptionsMessage={() => 'No Source'}
                    styles={selectStyles}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3.5}>
          <Box sx={commonBoxStyle}>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
              }}
            >
              <MyLocationSharpIcon
                sx={iconColor}
                onClick={() => openSelectMenu()}
              />
              <Box
                sx={{
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    fontSize: 14,
                    color: 'var(--secondary)',
                    mb: -0.5,
                  }}
                  onClick={() => openSelectMenu()}
                >
                  {simCardDetails.type === 'GLOBAL' ? '' : 'Destination'}
                </Box>
                <Box
                  sx={{
                    fontSize: 14,
                    color: 'var(--primary)',
                    span: {
                      display: 'none',
                    },
                    svg: {
                      height: '15px',
                    },
                    '.css-art2ul-ValueContainer2': {
                      p: 0,
                    },
                  }}
                >
                  {simCardDetails.type === 'GLOBAL' ? (
                    <Box py={{ xs: 1.2, md: 0 }}>
                      <Typography fontSize={11}>
                        {'✓'} Covers 92 countries.
                      </Typography>
                      <Typography fontSize={10} noWrap>
                        {'✓'} 12 Available Top-up Packages.
                      </Typography>
                    </Box>
                  ) : simCardDetails.type === 'REGIONAL' ? (
                    <Select
                      name="region"
                      placeholder="Select a Region"
                      onChange={(selectedOption) =>
                        handleAutoFill(selectedOption, 'region')
                      }
                      value={regionOptions.filter((option) =>
                        simCardDetails.region.includes(option.value)
                      )}
                      options={regionOptions}
                      isClearable={false}
                      menuIsOpen={menuIsOpen}
                      onMenuOpen={() => {
                        setMenuIsOpen(true);
                        setSimCardDetails((prev) => ({
                          ...prev,
                          isDatePickerOpen: false,
                        }));
                      }}
                      onMenuClose={() => setMenuIsOpen(false)}
                      noOptionsMessage={() => 'No Source'}
                      styles={selectStyles}
                    />
                  ) : (
                    <Select
                      name="country"
                      placeholder="Select a Country"
                      onChange={(selectedOption) =>
                        handleAutoFill(selectedOption, 'country')
                      }
                      value={options.filter((option) =>
                        simCardDetails.country.includes(option.value)
                      )}
                      options={options}
                      isClearable={false}
                      menuIsOpen={menuIsOpen}
                      onMenuOpen={() => {
                        setMenuIsOpen(true);
                        setSimCardDetails((prev) => ({
                          ...prev,
                          isDatePickerOpen: false,
                        }));
                      }}
                      onMenuClose={() => setMenuIsOpen(false)}
                      noOptionsMessage={() => 'No Source'}
                      styles={selectStyles}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={6}
          md={2.5}
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box sx={{ ...commonBoxStyle, position: 'relative' }}>
            <Box
              sx={{
                fontSize: 14,
                color: 'var(--secondary)',
              }}
            >
              Number of Sim
            </Box>
            <Box
              sx={{
                fontSize: 14,
                color: 'var(--primary)',
              }}
            >
              Count&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <strong>{simCardDetails.count}</strong>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                right: 6,
                top: '53%',
                transform: 'translateY(-50%)',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                onClick={() => {
                  if (totalSimCards < 9) handleAddSimCard();
                }}
                sx={{
                  cursor: totalSimCards >= 9 ? 'not-allowed' : 'pointer',
                  '&:hover': {
                    color: totalSimCards < 9 ? 'var(--hover)' : 'inherit',
                  },
                }}
                aria-disabled={totalSimCards >= 9}
              >
                <AddRoundedIcon
                  sx={{
                    color: totalSimCards >= 9 ? 'var(--disable)' : 'inherit',
                    border: '1px solid',
                    borderRadius: '50%',
                    fontSize: 18,
                  }}
                />
              </Box>

              <Box
                onClick={() => {
                  if (totalSimCards > 1) handleRemoveSimCard();
                }}
                sx={{
                  cursor: totalSimCards <= 1 ? 'not-allowed' : 'pointer',
                  '&:hover': {
                    color: totalSimCards > 1 ? 'var(--hover)' : 'inherit',
                  },
                }}
                aria-disabled={totalSimCards <= 1}
              >
                <RemoveRoundedIcon
                  sx={{
                    color: totalSimCards <= 1 ? 'var(--disable)' : 'inherit',
                    border: '1px solid',
                    borderRadius: '50%',
                    fontSize: 18,
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
        {/* <Grid
          item
          xs={6}
          md={2}
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box sx={commonBoxStyle}>
            <Box
              sx={{
                fontSize: 14,
                color: 'var(--secondary)',
              }}
            >
              Nationality
            </Box>
            <Box
              sx={{
                span: {
                  display: 'none',
                },
                svg: {
                  height: '15px',
                },
                '.css-art2ul-ValueContainer2': {
                  p: 0,
                },
              }}
            >
              <Select
                name="nationality"
                placeholder="Select Nationality"
                onChange={(selectedOption) =>
                  handleAutoFill(selectedOption, 'nationality')
                }
                value={
                  options.find(
                    (option) => option.label === simCardDetails.nationality
                  ) || null
                }
                options={options}
                noOptionsMessage={() => 'No Source'}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: 'var(--transparent)',
                    outline: 'none',
                    boxSizing: 'border-box',
                    boxShadow: 'none',
                    border: 'none',
                    fontSize: 14,
                    fontWeight: 400,
                    minHeight: '25px',
                    padding: '0',
                    margin: 0,
                    cursor: 'pointer',
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
                    color: 'var(--disable)', // Change to your desired color
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    flexWrap: 'nowrap',
                    maxWidth: '100%',
                    padding: '0',
                  }),
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    color: 'var(--disable)',
                    display: 'none',
                  }),
                }}
              />
            </Box>
          </Box>
        </Grid> */}
        <Grid item xs={12} md={2.5}>
          <Box
            sx={{
              bgcolor: 'var(--primary-btn)',
              border: '1px solid gray',
              borderRadius: '5px',
              px: 1,
              py: 0.5,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              color: 'var(--white)',
              fontSize: 16,
            }}
            onClick={handleSearch}
          >
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <SearchRoundedIcon />
              <span>Search</span>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SimForm;
