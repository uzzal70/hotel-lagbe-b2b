import { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { Box } from '@mui/material';
import { useGetItemsQuery } from '../../../redux/slices/apiSlice';
import { useDispatch } from 'react-redux';
import { setNationality } from '../../../redux/slices/hotelSearchSlice';

const Nationality = ({ selectedOption }) => {
  const dispatch = useDispatch();
  const url = `/mobileDataSim/getEsimCountryList`;
  const { data, isLoading, isError } = useGetItemsQuery({ url });

  const [options, setOptions] = useState([]);
  const selectRef = useRef(null);

  // Update options when API data is available
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const formattedOptions = data.map((country) => ({
        label: country.name, // Assuming 'name' holds the country name
        value: country.code, // Assuming 'code' holds the country code
      }));
      setOptions(formattedOptions);
    }
  }, [data]);

  // Custom option component with RoomOutlinedIcon
  const CustomOption = (props) => {
    const { data, innerRef, innerProps, isFocused, isSelected } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 12px',
          fontSize: '12px',
          backgroundColor: isSelected
            ? '#003366'
            : isFocused
            ? '#D6E4FF'
            : 'white',
          color: isSelected ? 'white' : '#333',
          cursor: 'pointer',
        }}
      >
        <span>{data.label}</span>
      </div>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ fontSize: 14, color: 'var(--primary)' }}>
        <label
          htmlFor="country-select"
          onClick={() => selectRef.current?.focus()}
          style={{
            cursor: 'pointer',
            display: 'block',
            color: 'var(--disable)',
            fontSize: 12,
            fontWeight: 300,
          }}
        >
          Nationality
        </label>

        <Select
          ref={selectRef}
          id="country-select"
          options={options}
          placeholder="Nationality..."
          isClearable
          isLoading={isLoading}
          loadingMessage={() => 'Loading...'}
          components={{ Option: CustomOption }}
          value={selectedOption}
          // onChange={setSelectedOption}
          onChange={(option) => dispatch(setNationality(option))}
          filterOption={(candidate, input) =>
            candidate.label.toLowerCase().includes(input.toLowerCase())
          }
          styles={{
            control: (styles) => ({
              ...styles,
              border: 'none',
              boxShadow: 'none',
              minHeight: 30,
              fontSize: 13,
              fontWeight: 500,
              padding: 0,
            }),
            valueContainer: (styles) => ({
              ...styles,
              padding: '0px',
            }),
            singleValue: (styles) => ({
              ...styles,
              color: 'var(--primary)',
            }),
            menu: (styles) => ({
              ...styles,
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
              background: '#EFF3FF',
              minWidth: '300px',
              padding: 0,
              left: -13,
            }),
            option: (styles) => ({
              ...styles,
              fontSize: '14px',
            }),
            dropdownIndicator: () => ({
              display: 'none',
            }),
            indicatorSeparator: () => ({
              display: 'none',
            }),
            clearIndicator: (styles) => ({
              ...styles,
              padding: '0px',
            }),
          }}
        />
      </Box>
    </Box>
  );
};

export default Nationality;
