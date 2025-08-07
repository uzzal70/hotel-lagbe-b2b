/* eslint-disable react/prop-types */
import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const CheckBox = ({ option, handleChangeOptions, label, name, color, mx }) => {
  return (
    <Box>
      <FormGroup
        row
        sx={{
          fontSize: '10px',
          '& .MuiCheckbox-root.Mui-checked,.MuiCheckbox-root.Mui-checked > .MuiSvgIcon-root':
            {
              color: color,
            },
          '.MuiSvgIcon-root': {
            color: color,
          },
          span: {
            p: 0,
            mx: mx,
          },
          color: color,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={option}
              onChange={handleChangeOptions}
              name={name || ''}
            />
          }
          label={label || null}
        />
      </FormGroup>
    </Box>
  );
};

export default CheckBox;
