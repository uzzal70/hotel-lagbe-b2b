/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import ValidIcon from '../../Common/validIcon';
import { memo } from 'react';

const SelectInput = memo(
  ({
    name,
    label,
    index,
    item,
    value,
    placeholder,
    handleOnChange,
    handleDateClose,
    formik,
    list,
    error,
    touched,
  }) => {
    return (
      <Box>
        <label>{label}</label>

        <Box
          sx={{
            mt: '-1px',
            bgcolor: 'var(--gray)',
            borderRadius: '5px',
            option: {
              textTransform: 'capitalize',
            },
          }}
          className="custom-select"
        >
          <select
            // required
            name={name}
            id={name}
            value={value}
            onChange={(e) => handleOnChange(e, item.passengerType, index)}
            //   onFocus={() => handleDateClose()}

            placeholder="Gender"
          >
            <option value="">{placeholder}</option>
            {list.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.name}
              </option>
            ))}
          </select>
        </Box>

        {touched && error ? (
          <div>
            <ValidIcon msg={error} fontColor="var(--red)" />
          </div>
        ) : null}
      </Box>
    );
  }
);

export default SelectInput;
