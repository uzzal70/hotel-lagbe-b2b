/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import CustomTooltip from '../../Common/CustomTooltip';
import ValidIcon from '../../Common/validIcon';
import { memo } from 'react';
const NameInput = memo(
  ({
    name,
    label,
    index,
    item,
    value,
    placeholder,
    handleOnChange,
    formik,
    error,
    tooltip,
    touched,
    maxlength,
  }) => {
    return (
      <Box
        sx={{
          input: {
            width: '100%',
            p: '10px 15px',
            border: '1px solid var(--stroke)',
          },
        }}
      >
        {label && <label>{label}</label>}
        {tooltip ? (
          <CustomTooltip name={name} value={value}>
            <input
              type="text"
              name={name}
              id={name}
              autoComplete="new-password"
              maxLength={25}
              // required
              onChange={(e) => handleOnChange(e, item.passengerType, index)}
              onBlur={formik.handleBlur}
              // touched={touched}
              //   onFocus={() => handleDateClose()}
              value={value}
            />
          </CustomTooltip>
        ) : (
          <input
            type="text"
            name={name}
            id={name}
            placeholder={placeholder || ''}
            autoComplete="new-password"
            maxLength={maxlength || 20}
            // {...(required && { required: false })}
            onChange={(e) => handleOnChange(e, item.passengerType, index)}
            onBlur={formik.handleBlur}
            //   onFocus={() => handleDateClose()}
            value={value}
          />
        )}

        {touched && error ? (
          <div>
            <ValidIcon msg={error} fontColor="var(--red)" />
          </div>
        ) : null}
      </Box>
    );
  }
);

export default NameInput;
