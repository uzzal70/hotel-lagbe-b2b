/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import axios from 'axios';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import { Box, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOption } from '../../../redux/slices/hotelSearchSlice';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import { checkOutClose } from '../../../redux/slices/modalOpen';
import { baseUrlHotel } from '../../../../baseurl';
import getAuthToken from '../../Common/getAuthToken';

const LocationSearch = () => {
  const token = getAuthToken();
  const dispatch = useDispatch();
  const selectRef = useRef(null);
  const selectedOption = useSelector((state) => state.hotel.selectedOption);
  const handleCloseModal = () => {
    dispatch(checkOutClose());
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (searchTerm.length > 2) {
      setLoading(true); // Start loading when searchTerm length exceeds 2

      const fetchLocations = async () => {
        try {
          const response = await axios.get(
            `${baseUrlHotel}/locationSearch/${searchTerm}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.results) {
            const sortOrder = {
              City: 1,
              State: 2,
              Country: 2,
              Hotel: 3,
              PointOfInterest: 4,
              Airport: 5,
            };
            const filteredResults = response?.data?.results?.filter(
              (location) =>
                !(
                  location.id === 290312 &&
                  location.fullName === 'Dhaka, Bihar, India'
                )
            );

            const sortedOptions = filteredResults
              .slice()
              .sort((a, b) => {
                const orderA = sortOrder[a.type] || 99;
                const orderB = sortOrder[b.type] || 99;
                return orderA - orderB;
              })
              .map((location) => ({
                value: location.id,
                label: location.fullName,
                hotelId: location?.referenceId,
                details: location,
              }));

            setOptions(sortedOptions);
          }
        } catch (error) {
          console.error('Error fetching locations:', error);
        } finally {
          setLoading(false); // Stop loading once the API response is processed
        }
      };

      fetchLocations();
    } else {
      // setOptions([]); // Clear options if input is too short
      setLoading(false); // Ensure loading is false when input is less than 3 characters
    }
  }, [searchTerm]);

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
          fontSize: '11px',
          backgroundColor: isSelected
            ? '#003366' // Selected option background
            : isFocused
            ? '#D6E4FF' // Hover effect background
            : 'white',
          color: isSelected ? 'white' : '#333',
          cursor: 'pointer',
          gap: '20px',
          // border: '1px solid red',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Stack direction={'row'} alignItems="center">
            {data?.details?.type === 'Hotel' ? (
              <LocationCityRoundedIcon
                style={{
                  marginRight: '8px',
                  fontSize: 16,
                  color: isSelected ? 'white' : 'var(--disable)',
                }}
              />
            ) : (
              <RoomOutlinedIcon
                style={{
                  marginRight: '8px',
                  fontSize: 16,
                  color: isSelected ? 'white' : 'var(--disable)',
                }}
              />
            )}
            <span>{data.label}</span>
          </Stack>
        </Box>
        <Box>
          <Typography
            noWrap
            sx={{
              fontSize: 9,
              color: 'var(--disable)',
              textAlign: 'right',
              marginLeft: 'auto',
            }}
          >
            {data.details?.type}
          </Typography>
          <Typography
            noWrap
            sx={{
              fontSize: { xs: 9 },
              color: 'var(--secondary)',

              textAlign: 'right',
              marginLeft: 'auto',
            }}
          >
            {data.details?.city}
          </Typography>
        </Box>
      </div>
    );
  };
  // console.log(selectRef);
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          fontSize: 14,
          color: 'var(--primary)',
        }}
      >
        {/* Use onClick to focus the Select component */}
        <label
          htmlFor="destination-select"
          onClick={() => selectRef.current?.focus()}
          style={{
            cursor: 'pointer',
            display: 'block',
            color: 'var(--disable)',
            fontSize: 12,
          }}
        >
          Destination/Property Name
        </label>

        <Select
          ref={selectRef} // Attach ref to Select
          id="destination-select"
          options={options}
          onInputChange={(value) => {
            setSearchTerm(value);
          }}
          onChange={(selected) => {
            dispatch(setSelectedOption(selected));
          }}
          value={selectedOption}
          placeholder="Enter City or Hotel ..."
          isClearable
          filterOption={() => true}
          isLoading={loading}
          loadingMessage={() => 'Loading...'}
          components={{ Option: CustomOption }}
          noOptionsMessage={({ inputValue }) =>
            inputValue
              ? 'Enter correct city name'
              : 'Type to search properties...'
          }
          styles={{
            control: (styles) => ({
              ...styles,
              border: 'none',
              boxShadow: 'none',
              background: '#EFF3FF',
              minHeight: 30,
              fontSize: 14,
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
              minWidth: '320px',
              padding: 0,
              // border: '1px solid red',
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
          onFocus={() => {
            handleCloseModal(); // Call handleCloseModal when Select is focused
          }}
        />
      </Box>
    </Box>
  );
};

export default LocationSearch;
