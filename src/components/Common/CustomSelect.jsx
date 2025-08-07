/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import Select from 'react-select';

// eslint-disable-next-line no-unused-vars
const CustomSelect = ({ handler, index, options, value, type, isDisabled }) => {
  return (
    <Box
      sx={{
        span: {
          display: 'none',
        },
        svg: {
          fill: 'var(--fontcolor)',
        },
      }}
    >
      <Select
        placeholder="Select Gender"
        onChange={(e) => {
          handler(e, type, index);
        }}
        options={options}
        value={value}
        styles={{
          control: (provided, state) => ({
            ...provided,
            borderRadius: '5px',
            borderColor: state.isFocused
              ? 'var(--primary)'
              : provided.borderColor,
            padding: '2px',
            textTransform: 'uppercase',
            outline: 'none',
            border: '1px solid var(--bgcolor)', // Replace with an actual color
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? 'var(--primary)'
              : provided.backgroundColor,
            color: state.isSelected ? '#ffffff' : provided.color,
          }),
        }}
      />
    </Box>
  );
};

export default CustomSelect;

// onChange={(newValue) => setValue(newValue)}
