/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import ImageImport from '../../assets/ImageImport';

const FilterSearchInput = ({ name, placeholder, onChange, width }) => {
  return (
    <Box
      sx={{
        input: {
          border: '1px solid var(--bgcolor)',
          outline: 'none',
          p: '8px 8px 8px 40px',
          fontSize: 14,
          borderRadius: '5px',
          width: width || { xs: '160px', sm: '160px', md: '200px' },
        },
        position: 'relative',
      }}
      className="custom-input"
    >
      <img
        src={ImageImport.fsearch}
        alt=""
        style={{ position: 'absolute', top: '30%', left: '5%' }}
      />
      <input
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </Box>
  );
};

export default FilterSearchInput;
