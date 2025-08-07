/* eslint-disable react/prop-types */
import { Stack } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';

const ValidIcon = ({ success, msg, fontColor }) => {
  return (
    <Stack
      direction="row"
      sx={{
        color: fontColor,
        fontSize: 11,
        fontWeight: 400,
        alignItems: 'center',
      }}
    >
      {success ? (
        <CheckCircleOutlined sx={{ fontWeight: 400, fontSize: 14 }} />
      ) : (
        <InfoOutlined sx={{ fontWeight: 400, fontSize: 14 }} />
      )}
      &nbsp;{msg}
    </Stack>
  );
};

export default ValidIcon;
