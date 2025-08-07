/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const SubChildContent = ({ item, value, submenu, handleChange }) => {
  const isSmallDevice = window.innerWidth < 900;
  return (
    <Box>
      <Box
        sx={{ ml: 3, pl: 2, pt: 1.8, height: '25px' }}
        className="subchild-element"
      >
        <NavLink
          to={`${item.pathName}`}
          style={{ fontSize: '13px' }}
          onClick={isSmallDevice ? () => handleChange(item.list1) : null}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              sx={{
                fontSize: '100%',
                opacity: open ? 1 : 0,
                color: value === item.title ? submenu.color : 'null',
                pl: 1,
              }}
            >
              {item.list1}
            </Typography>
          </Stack>
        </NavLink>
      </Box>
      <Box
        sx={{
          mt: -1,
          ml: 3,
          pl: 2,
          pt: 3,
          mb: 1.5,
          height: '35px',
        }}
        className="subchild-element"
      >
        <NavLink
          to={`${item.pathName2}`}
          style={{ fontSize: '13px' }}
          onClick={isSmallDevice ? () => handleChange(item.list2) : null}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              sx={{
                fontSize: '100%',
                opacity: open ? 1 : 0,
                color: value === item.title ? submenu.color : 'null',
                pl: 1,
              }}
            >
              {item.list2}
            </Typography>
          </Stack>
        </NavLink>
      </Box>
    </Box>
  );
};

export default SubChildContent;
