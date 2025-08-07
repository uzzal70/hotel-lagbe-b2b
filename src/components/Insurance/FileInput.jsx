import { TextField } from '@mui/material';

export const FileInput = ({ label, name, onChange, accept }) => {
  return (
    <TextField
      type="file"
      label={label}
      InputLabelProps={{ shrink: true }}
      inputProps={{ accept }} // Specify the file types allowed
      name={name}
      onChange={onChange}
      fullWidth
      required
    />
  );
};
