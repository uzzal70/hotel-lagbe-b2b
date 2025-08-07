/* eslint-disable react/prop-types */
import { Box, Button, ClickAwayListener, Grid, Stack } from '@mui/material';
import Select from 'react-select';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useState } from 'react';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import DateSelector from './DateSelector';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../redux/slices/modalOpen';
const formatFieldName = (fieldName) => {
  return fieldName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const InsuranceForm = ({
  p,
  pt,
  minHeight,
  travel_purpose,
  countries,
  date_of_birth,
  date_of_travel,
  days,
}) => {
  const dispatch = useDispatch();
  const modifyModal = useSelector((state) => state.modalValue.modifyModal);
  const handleToggle = () => {
    dispatch(toggleModal({ modalName: 'modifyModal' }));
  };

  const url = `/insurance/getCountryList`;
  const { data, isLoading, refetch, isError } = useGetItemsQuery({ url });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    travel_purpose: travel_purpose || '',
    countries: countries || '',
    date_of_birth: date_of_birth || '',
    date_of_travel: date_of_travel || '',
    days: days || '',
  });

  // console.log(formData);
  const [modal, setModal] = useState({
    date_of_birth: false,
    date_of_travel: false,
  });

  // const handleOnchange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === 'days' && value.length > 3) return;
  //   setFormData({
  //     ...formData,
  //   });
  // };

  const toggleModalDate = (field) => {
    setModal((prevModal) => ({
      date_of_birth:
        field === 'date_of_birth' ? !prevModal.date_of_birth : false,
      date_of_travel:
        field === 'date_of_travel' ? !prevModal.date_of_travel : false,
    }));
  };

  const handleAutoFill = (selectedOptions, fieldName) => {
    //  const { value } = selectedOption;
    if (fieldName === 'countries') {
      const values = selectedOptions.map((option) => option.value); // Extract values
      setFormData({
        ...formData,
        [fieldName]: values.join(', '), // Join values with a comma
      });
    } else {
      setFormData({
        ...formData,
        [fieldName]: selectedOptions.value, // Clear field if no selection
      });
    }
  };

  const travel_purposeData = [
    // { name: 'Purpose of Travel', value: '' },
    { name: 'Business/Holiday', value: 'business_and_holiday', dayCount: 180 },
    { name: 'Employment', value: 'employment', dayCount: 365 },
    { name: 'Study', value: 'study', dayCount: 365 },
    {
      name: 'Frequent Traveling',
      value: 'frequent_traveler',
      dayCount: 365,
      type: 'fixed',
    },
  ];
  const countryOption = [
    {
      value: 'BD',
      label: 'Bangladesh',
    },
    {
      value: 'IN',
      label: 'India',
    },
  ];
  const getDayLimit = (purpose) => {
    const purposeData = travel_purposeData.find(
      (item) => item.value === purpose
    );
    return purposeData?.dayCount || 0; // default to 0 if not found
  };
  // const handleOnchange = (e) => {
  //   const { name, value } = e.target;
  //   const getDayLimit = (purpose) => {
  //     const purposeData = travel_purposeData.find(
  //       (item) => item.value === purpose
  //     );
  //     return purposeData?.dayCount || 0; // default to 0 if not found
  //   };
  //   if (name === 'days') {
  //     const dayLimit = getDayLimit(formData.purpose);
  //     console.log(dayLimit);
  //     if (value.length > 3 || Number(value) > dayLimit) return;
  //   }

  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };
  // const getDayLimit = (purpose) => {
  //   const purposeData = travel_purposeData.find(
  //     (item) => item.value === purpose
  //   );
  //   return purposeData?.dayCount || 0;
  // };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    if (name === 'days' && value.length > 3) return;
    if (name === 'days') {
      if (value.length > 3) return;

      const maxLimit = getDayLimit(formData.travel_purpose);
      if (Number(value) > maxLimit) return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const travel_purposeOptions = travel_purposeData?.map((x) => ({
    value: x.value,
    label: ` ${x.name}`,
    dayCount: x.dayCount,
  }));

  let options = [];

  // Check for loading state or error state
  if (isLoading) {
    options = [];
  } else if (isError) {
    options = [];
  } else {
    options =
      data?.map((x) => ({
        value: x?.country_code,
        label:
          x?.country_name
            ?.split(' ')
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ') || '',
      })) || [];
  }

  const handleClose = () => {
    setModal({
      date_of_birth: false,
      date_of_travel: false,
    });
  };

  const handleSelectDate = (date, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: date,
    }));
    handleClose();
  };
  console.log(formData);
  const handleSearch = async () => {
    try {
      const dayValidation =
        formData.travel_purpose === 'frequent_traveler' && 365;
      const formDataCheck = { ...formData, days: dayValidation };
      const emptyFields = Object.entries(
        formData.travel_purpose === 'frequent_traveler'
          ? formDataCheck
          : formData
      ).filter(
        ([, value]) =>
          !value || (typeof value === 'string' && value.trim() === '')
      );

      if (emptyFields.length > 0) {
        const fieldNames = emptyFields
          .map(([key]) => formatFieldName(key))
          .join(', ');

        toast.warning(`Please fill in the following fields: ${fieldNames}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: 'var(--white)',
            color: 'var(--primary)',
          },
        });
        return;
      }

      const urlparams = {
        travel_purpose: formData?.travel_purpose || '',
        countries: formData?.countries || '',
        date_of_birth: moment(formData?.date_of_birth).isValid()
          ? moment(formData.date_of_birth).format('DD-MM-YYYY')
          : formData.date_of_birth,
        date_of_travel: moment(formData?.date_of_travel).isValid()
          ? moment(formData.date_of_travel).format('DD-MM-YYYY')
          : formData.date_of_travel,
        days:
          formData.travel_purpose === 'frequent_traveler'
            ? '365'
            : formData?.days?.toString() || '',
      };

      const encodedQuery = encodeURIComponent(JSON.stringify(urlparams));
      navigate(`/dashboard/insurance?query=${encodedQuery}`);
    } catch (error) {
      toast.error(
        <Box sx={{ fontSize: 13, color: 'var(--primary)' }}>
          An error occurred during upload.
        </Box>
      );
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'var(--white)',
        margin: 'auto',
        borderRadius: '8px',
        p: p || { xs: 1, sm: 2, md: 2.5, lg: 4 },
        py: { xs: 2, md: 0 },
        minHeight: minHeight || '170px',
      }}
    >
      <Grid
        container
        columnSpacing={{ xs: 0, sm: 1, md: 2 }}
        rowSpacing={{ xs: 1.5, sm: 1 }}
        sx={{ alignItems: 'center', justifyContent: 'center', pt: pt || 2 }}
      >
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box
            sx={{
              width: '100%',
              bgcolor: 'var(--gray)',
              color: 'var(--disable)',
              py: 0.5,
              border: '1px solid var(--light-stroke)',
              borderRadius: '8px',
            }}
          >
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
                name="travel_purpose"
                placeholder="Select Purpose of Travel"
                onChange={(selectedOption) =>
                  handleAutoFill(selectedOption, 'travel_purpose')
                }
                value={
                  travel_purposeOptions.find(
                    (option) => option.value === formData.travel_purpose
                  ) || null
                }
                options={travel_purposeOptions}
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
                    padding: '0 2px 0 10px',
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
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              mt: 1,
              width: '100%',
              bgcolor: 'var(--gray)',
              color: 'var(--disable)',
              py: 0.5,
              border: '1px solid var(--light-stroke)',
              borderRadius: '8px',
            }}
          >
            <Box
              sx={{
                span: {
                  display: 'none',
                },
                svg: {
                  // display: 'none',
                  height: '15px',
                },
                '.css-art2ul-ValueContainer2': {
                  p: 0,
                },
              }}
            >
              <Select
                name="countries"
                placeholder="Select Single or Multiple Country"
                onChange={(selectedOption) =>
                  handleAutoFill(selectedOption, 'countries')
                }
                value={options.filter((option) =>
                  formData.countries.includes(option.value)
                )}
                options={options}
                isMulti
                noOptionsMessage={() => 'No Source'}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: 'var(--transparent)',
                    outline: 'none',
                    boxSizing: 'border-box',
                    boxShadow: 'none',
                    border: 'none',
                    minHeight: '25px',
                    padding: '0 2px',
                    margin: 0,
                    minWidth: '300px',
                    overflowX: 'auto',
                    display: 'flex',
                    fontSize: 14,
                    fontWeight: 400,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    // display: 'flex',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    flexWrap: 'nowrap',
                    maxWidth: '100%',
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
                }}
              />
            </Box>
          </Box>
        </Grid>
        {/* Date Section */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ClickAwayListener onClickAway={handleClose}>
            <Box>
              <Box
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <DateSelector
                  date={formData.date_of_birth}
                  toggleModal={toggleModalDate}
                  modal={modal.date_of_birth}
                  name={'date_of_birth'}
                  title={'Date of Birth'}
                  handleClose={handleClose}
                  handleSelectDate={handleSelectDate}
                  maxDate={new Date()}
                />
              </Box>
              <Box
                sx={{
                  position: 'relative',
                  mt: 1,
                  cursor: 'pointer',
                }}
              >
                <DateSelector
                  date={formData.date_of_travel}
                  toggleModal={toggleModalDate}
                  modal={modal.date_of_travel}
                  name={'date_of_travel'}
                  title={'Date of Travel'}
                  handleClose={handleClose}
                  handleSelectDate={handleSelectDate}
                  minDate={new Date()}
                />
              </Box>
            </Box>
          </ClickAwayListener>
        </Grid>

        {/* Class and Passenger selection   */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            sx={{
              width: '100%',
              bgcolor: 'var(--gray)',
              color: 'var(--primary)',
              height: '42px',
              px: 1.5,
              border: '1px solid var(--light-stroke)',
              borderRadius: '8px',
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              input: {
                width: '60px',
                height: '30px',
                pl: 1,
                borderRadius: '5px',
                border: '1px solid var(--stroke)',
              },
            }}
          >
            <label htmlFor="days">Enter Days (Policy Duration)</label>

            <input
              name="days"
              id="days"
              type="number"
              value={
                formData.travel_purpose === 'frequent_traveler'
                  ? 365
                  : formData.days
              }
              min="0"
              max={getDayLimit(formData.travel_purpose)}
              onChange={handleOnchange}
              disabled={formData.travel_purpose === 'frequent_traveler'}
            />
          </Box>
          <Box
            sx={{
              mt: 1,
              width: '100%',
              bgcolor: 'var(--gray)',
              color: 'var(--disable)',
              py: 0.5,
              border: '1px solid var(--light-stroke)',
              borderRadius: '8px',
            }}
          >
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
                name="s-country"
                placeholder="Select Country (optional)"
                onChange={(selectedOption) =>
                  handleAutoFill(selectedOption, 's-country')
                }
                options={countryOption}
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
                    padding: '0 2px 0 10px',
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
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Button
            sx={{ width: '100%' }}
            // disabled={departureData?.departure === arrivalData?.arrival}
            onClick={handleSearch}
          >
            <Stack
              direction={{ xs: 'row', sm: 'column' }}
              justifyContent={{ xs: 'center', sm: 'space-between' }}
              alignItems={{ xs: 'center', sm: 'unset' }}
              spacing={{ xs: 1, sm: 0 }}
              sx={{
                px: 1.5,
                py: { xs: 0.8, sm: 1 },
                width: '100%',
                bgcolor: 'var(--primary)',
                color: 'var(--white)',
                borderRadius: '5px',
              }}
            >
              <Box textAlign="left">Search</Box>
              <Box textAlign="right" display={{ xs: 'none', md: 'block' }}>
                <TravelExploreIcon
                  sx={{
                    p: 0,
                    fontSize: 20,
                  }}
                />
              </Box>
            </Stack>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InsuranceForm;
