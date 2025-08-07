/* eslint-disable react/prop-types */
import Select from 'react-select';
import { Box, Grid, Stack, Typography } from '@mui/material';
import hotel from '../../../assets/images/hotel';
const FilterItem = ({ text, count, onClick, color }) => (
  <Box>
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      px={1.5}
      py={1.2}
      borderRadius={1}
      sx={{
        cursor: 'pointer',
        backgroundColor: color ? 'var(--primary)' : 'var(--gray)',
        border: '1px solid var(--primary)',
      }}
      onClick={onClick}
    >
      <Typography
        sx={{
          color: color ? 'white' : 'var(--primary)',
          fontWeight: 300,
          fontSize: { xs: 10, md: 12 },
        }}
      >
        {text ? '✓' + ' ' : ''}
      </Typography>
      <Typography
        sx={{
          color: color ? 'white' : 'var(--primary)',
          fontWeight: 300,
          fontSize: { xs: 10, md: 12 },
        }}
      >
        {text} ({count})
      </Typography>
    </Stack>
  </Box>
);

const HotelRoomFilter = ({
  total,
  filter,
  selectedRoomNames,
  roomTypeOptions,
  handleRoomTypeChange,
  onClickRefund,
  // onClickFree,
  filterRefundable,
  // filterFreeCancel,
  refundableCount,
  // freeCancelCount,
  hasBreakfast,
  breakfastItemsCount,
  onClickBreakfast,
  selectedBoardBasis,
  handleBoardBasisChange,
}) => {
  const optionbasisboard = [
    {
      label: 'Room Only',
      value: 'RoomOnly',
    },
    {
      label: 'Breakfast',
      value: 'BedAndBreakfast',
    },
    {
      label: 'HalfBoard',
      value: 'HalfBoard',
    },
    {
      label: 'FullBoard',
      value: 'FullBoard',
    },
  ];
  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2, md: 1.5 },
        border: '1px solid var(--light-stroke)',
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
        }}
      >
        <Grid container spacing={1}>
          <Grid item>
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
                options={roomTypeOptions}
                onChange={handleRoomTypeChange}
                value={roomTypeOptions.filter((opt) =>
                  selectedRoomNames.includes(opt.value)
                )}
                isMulti
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
                    fontSize: 12,
                    fontWeight: 400,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    color: 'var(--secondary)',
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    flexWrap: 'nowrap',
                    maxWidth: '100%',
                    padding: '1px 4px',
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 1000, // set high z-index here
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? 'var(--primary)'
                      : state.isFocused
                      ? 'var(--bgcolor)'
                      : 'var(--white)',
                    color: state.isSelected ? 'var(--white)' : 'var(--primary)',
                    fontSize: 12,
                    zIndex: 1000,
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
          <Grid item>
            <Box
              sx={{
                minWidth: { xs: '100%', md: 200 },
                maxWidth: { xs: '100%', md: 200 },
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
                options={optionbasisboard}
                onChange={handleBoardBasisChange}
                value={optionbasisboard.filter((opt) =>
                  selectedBoardBasis.includes(opt.value)
                )}
                isMulti
                placeholder="Board Basis"
                noOptionsMessage={() => 'No Source'}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    minHeight: '20px',
                    display: 'flex',
                    fontSize: 12,
                    fontWeight: 400,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    color: 'var(--secondary)',
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    flexWrap: 'nowrap',
                    maxWidth: '100%',
                    padding: '1px 4px',
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 1000,
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? 'var(--primary)'
                      : state.isFocused
                      ? 'var(--bgcolor)'
                      : 'var(--white)',
                    color: state.isSelected ? 'var(--white)' : 'var(--primary)',
                    fontSize: 12,
                    zIndex: 1000,
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
          {/* <Grid item>
            <FilterItem
              icon={hotel.breakfast}
              text="Free Cancellation"
              color={filterFreeCancel}
              count={freeCancelCount}
              onClick={onClickFree}
            />
          </Grid>
          <Grid item>
            <FilterItem
              icon={hotel.breakfast}
              text="Breakfast"
              color={hasBreakfast}
              count={breakfastItemsCount || 0}
              onClick={onClickBreakfast}
            />
          </Grid> */}
          <Grid item>
            <FilterItem
              icon={hotel.breakfast}
              text="Free Breakfast"
              color={hasBreakfast}
              count={breakfastItemsCount || 0}
              onClick={onClickBreakfast}
            />
          </Grid>
          <Grid item>
            <FilterItem
              icon={hotel.right}
              text="Refundable"
              color={filterRefundable}
              count={refundableCount}
              onClick={onClickRefund}
            />
          </Grid>
        </Grid>
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

export default HotelRoomFilter;
