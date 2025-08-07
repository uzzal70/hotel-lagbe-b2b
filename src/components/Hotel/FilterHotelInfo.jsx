/* eslint-disable react/prop-types */
import Select from 'react-select';
import hotel from '../../assets/images/hotel';
import { Box, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedRoomOption } from '../../redux/slices/roomFilterSlice';

const FilterItem = ({ icon, text, count }) => (
  <Box>
    <Stack
      direction="row"
      alignItems="center"
      bgcolor="#F5F7FA"
      spacing={1}
      px={1.5}
      py={1.2}
      borderRadius={1}
    >
      <img src={icon} alt="" width={12} height={12} />
      <Typography
        sx={{
          color: '#79859A',
          fontWeight: 300,
          fontSize: { xs: 10, md: 12 },
        }}
      >
        {text} ({count})
      </Typography>
    </Stack>
  </Box>
);

const FilterHotelInfo = ({ total, filter }) => {
  const dispatch = useDispatch();
  const selectedOption = useSelector(
    (state) => state.roomFilter.selectedRoomOption
  );
  const roomNameOptions = useSelector(
    (state) => state.roomData.roomNameOptions
  );

  const uniqueByValue = Array.from(
    new Map(roomNameOptions.map((iData) => [iData.value, iData])).values()
  );

  const handleChange = (selected) => {
    dispatch(setSelectedRoomOption(selected || []));
  };

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2, md: 1.5 },
        bgcolor: 'var(--white)',
        my: 2,
        mb: { xs: 0, md: 2 },
        py: 1,
        borderRadius: 1.5,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            minWidth: { xs: '100%', md: 250 },
            maxWidth: { xs: '100%', md: 300 },
            flex: 1,
            border: '1px solid var(--light-stroke)',
            borderRadius: 1,
            backgroundColor: 'white',
            '.css-art2ul-ValueContainer2': { p: 0 },
            '.MultiValueRemove': { p: 0 },
            button: { p: '0px !important' },
          }}
        >
          <Select
            isMulti
            options={uniqueByValue.map((opt) => ({
              value: opt.value,
              label: opt.label,
            }))}
            value={selectedOption}
            onChange={handleChange}
            placeholder="Filter by Room Type"
            noOptionsMessage={() => 'No Source'}
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                minHeight: '20px',
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
                padding: '1px 4px',
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

        <FilterItem
          icon={hotel.breakfast}
          text="Free Cancellation"
          count={12}
        />
        <FilterItem icon={hotel.right} text="Free Cancellation" count={80} />
      </Box>

      <Box
        sx={{
          color: '#79859A',
          fontWeight: 300,
          fontSize: { xs: 10, md: 12 },
        }}
      >
        {' '}
        Total {filter}/{total}
      </Box>
    </Box>
  );
};

export default FilterHotelInfo;
