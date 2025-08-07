/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import ValidIcon from './validIcon';

const Select = ({
  width,
  value,
  name,
  placeholder,
  formik,
  label,
  handleBlur,
  display,
  onChange,
  data,
  padding,
  fontSize,
  border,
  touched,
}) => {
  return (
    <Box className="custom-input custom-select">
      <Box
        sx={{
          display: display || 'none',
        }}
      >
        <label htmlFor={name}>{label}</label>
      </Box>
      <Box
        sx={{
          select: {
            border: border || '1px solid var(--bgcolor)',
            p: padding || '8px',
            fontSize: fontSize || 14,
            width: width || '100%',
            bgcolor: 'var(--gray)',
            borderRadius: '5px',
          },
          option: {
            fontSize: 14,
            fontWeight: 400,
          },
          position: 'relative',
        }}
      >
        <Box>
          <select
            required
            onBlur={handleBlur}
            name={name}
            value={value}
            onChange={(e) => onChange(e)}
            placeholder={placeholder}
          >
            {placeholder === 'Select payment type' ? (
              ''
            ) : (
              <option style={{ fontSize: '12px', color: 'var(--red)' }}>
                {placeholder || 'Select'}
              </option>
            )}
            {data.map((status, i) => (
              <option
                key={i}
                value={status?.value || status?.name || status?.bankName}
              >
                {status?.bankName
                  ? `${status.bankName} ${status.accountNo}`
                  : status.name}
              </option>
            ))}
          </select>
        </Box>
      </Box>
      {touched && formik ? (
        <Box
          sx={{
            display: display || 'none',
          }}
        >
          <ValidIcon msg={formik} fontColor="var(--red)" />
        </Box>
      ) : null}
    </Box>
  );
};
export default Select;
