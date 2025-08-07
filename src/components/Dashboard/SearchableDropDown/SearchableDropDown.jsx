/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import Select, { components } from 'react-select';
const CustomInput = (props) => (
  <components.Input {...props} autoComplete="nope" />
);
const SearchableDropDown = ({ handler, options, index, loading }) => {
  return (
    <Box
      sx={{
        span: {
          display: 'none',
        },
        input: {
          width: '100%',
          fontSize: '10px',
          display: 'flex',
          minWidth: '200px !important',
        },
        svg: {
          fill: 'var(--icon-color)',
        },
      }}
    >
      <Select
        className="custom-react-select"
        placeholder="Select Traveller..."
        onChange={(item) => {
          handler(item.value, index);
        }}
        components={{ Input: CustomInput }}
        options={options}
        isLoading={loading}
        loadingMessage={() => 'Loading...'}
        noOptionsMessage={() => 'No Travelers'}
        // styles={{
        //   control: (provided) => ({
        //     ...provided,
        //     backgroundColor: 'var(--gray)',
        //     outline: 'none',
        //     boxSizing: 'border-box',
        //     boxShadow: 'none',
        //     border: 'none',
        //     minHeight: '0px ',
        //     fontSize: '16px',
        //   }),
        // }}
      />
    </Box>
  );
};

export default SearchableDropDown;
