/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import Select from 'react-select';

const CustomSelect = ({ handler, options, loading, border }) => {
  const filterOption = (option, inputValue) => {
    return option.value.bankName
      .toLowerCase()
      .includes(inputValue.toLowerCase());
  };
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
        border: border || '',
        borderRadius: '5px',
        svg: {
          fill: 'var(--icon-color)',
        },
      }}
    >
      <Select
        className="custom-react-select"
        placeholder="Select ..."
        onChange={(item) => {
          handler(item.value);
        }}
        isLoading={loading}
        loadingMessage={() => 'Loading...'}
        options={options}
        noOptionsMessage={() => 'No Bank'}
        filterOption={filterOption}
        styles={{
          option: (provided, state) => ({
            ...provided,
            padding: 0,
            margin: 0,
          }),
        }}
      />
    </Box>
  );
};

export default CustomSelect;
