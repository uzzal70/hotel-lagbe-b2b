/* eslint-disable react/prop-types */
import { Box } from '@mui/material';

const FilterSelect = ({ name, data, value, handleChange, sx, p }) => {
  return (
    <Box className="custom-input custom-select" sx={sx}>
      <select
        // required
        name={name || 'status'}
        value={value}
        onChange={(e) => handleChange(e)}
        placeholder={'All'}
        style={{ padding: p || '' }}
      >
        <option value={''}>{'All'}</option>

        {data.map((status, i) => (
          <option key={i} value={status?.value}>
            {status?.bankName
              ? `${status.bankName} ${status.accountNo}`
              : status.name}
          </option>
        ))}
      </select>
    </Box>
  );
};

export default FilterSelect;
