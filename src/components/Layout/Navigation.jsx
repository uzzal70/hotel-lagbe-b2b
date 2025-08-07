/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { Box, Stack, Tooltip, Typography } from '@mui/material';

const Navigation = ({ location, handleChange, open, navItems, agentRole }) => {
  const currentPath = location.pathname;
  const lastSegment = currentPath?.split('/').filter(Boolean).pop();
  return (
    <>
      {navItems.map((item) => {
        if (item.condition && !agentRole) return null;
        const targetSegment = item.path.split('/').filter(Boolean).pop();
        const isActive = lastSegment === targetSegment;

        return (
          <Box key={item.path} className={isActive ? 'active-link' : 'link'}>
            <NavLink
              to={item.path}
              onClick={() => {
                handleChange(item.path);
                console.log(location?.pathname, item.path, isActive);
              }}
            >
              <Stack direction="row" spacing={1.5} pl={3}>
                <Tooltip title={item.tooltip} followCursor>
                  {typeof item.icon === 'function'
                    ? item.icon(isActive) // Pass isActive to the icon
                    : item.icon}
                </Tooltip>
                <Typography
                  sx={{
                    opacity: open ? 1 : 0,
                    fontSize: '90%',
                    color: isActive ? 'var(--primary)' : 'unset', // Use isActive for text color
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    span: {
                      color: 'var(--primary)',
                      bgcolor: 'var(--yellow)',
                      px: 0.8,
                      borderRadius: 4,
                      fontSize: 10,
                      right: 0,
                      top: -10,
                      pb: 0.1,
                    },
                  }}
                  className="content"
                >
                  {item.label}
                  {/* {item?.newItem && <span className="blink">new</span>} */}
                </Typography>
              </Stack>
            </NavLink>
          </Box>
        );
      })}
    </>
  );
};

export default Navigation;
