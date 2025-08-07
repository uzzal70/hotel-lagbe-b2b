/* eslint-disable react/prop-types */
import { Stack, Tooltip, Typography } from '@mui/material';
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
const SideCard = ({ value, matchValue, submenu, title, name, Icon }) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Tooltip title={title || ''} followCursor>
        <Icon
          sx={{
            fontSize: 8,
            color: value === matchValue ? submenu.color : 'null',
          }}
        />
      </Tooltip>
      <Typography
        sx={{
          fontSize: '100%',
          opacity: open ? 1 : 0,
          color: value === matchValue ? submenu.color : 'null',
        }}
      >
        {name || 'Title'}
      </Typography>
    </Stack>
  );
};

export default SideCard;
