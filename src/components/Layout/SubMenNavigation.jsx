/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { Box, Stack, Tooltip, Typography, Collapse } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const SubMenNavigation = ({
  location,
  value,
  handleChange,
  toggleSubMenu,
  open,
  submenuState,
  navItems,
  agentRole,
}) => {
  const currentPath = location.pathname;
  const lastSegment = currentPath?.split('/').filter(Boolean).pop();
  return (
    <>
      {navItems.map((item, index) => {
        if (item.condition && !agentRole) return null;
        const hasSubmenu = item.submenu;
        const isActive = item?.submenuItems.some((item) =>
          currentPath.includes(item.pathName)
        );

        // console.log(navItems);
        return (
          <Box key={index}>
            <Box
              className={isActive ? 'active-link' : 'link'}
              onClick={() => hasSubmenu && toggleSubMenu(item.path)}
              sx={{ cursor: hasSubmenu ? 'pointer' : 'default' }}
            >
              <Stack direction="row" spacing={2} pl={3}>
                <Tooltip title={item.tooltip} followCursor>
                  {typeof item.icon === 'function'
                    ? item.icon(isActive) // Pass isActive to the icon
                    : item.icon}
                </Tooltip>
                <Box
                  sx={{
                    opacity: open ? 1 : 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pr: 0.5,
                  }}
                  className="content"
                  width="100%"
                >
                  <Typography
                    sx={{
                      opacity: open ? 1 : 0,
                      fontSize: '90%',
                      whiteSpace: 'nowrap',
                    }}
                    className="content"
                  >
                    {item.label}
                  </Typography>
                  {hasSubmenu && (
                    <ExpandMore
                      sx={{
                        fontSize: 20,
                        transition: 'transform 0.3s ease-in-out',
                        transform: `rotate(${
                          submenuState[item.path] ? 180 : 0
                        }deg)`,
                      }}
                    />
                  )}
                </Box>
              </Stack>
            </Box>

            {hasSubmenu && (
              <Collapse in={submenuState[item.path]}>
                <Box sx={{ pl: 4.5, pt: 2 }}>
                  <Stack direction="column" spacing={1}>
                    {item.submenuItems.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.pathName}
                        onClick={() => handleChange(subItem.title)}
                        style={{ fontSize: '14px' }}
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Tooltip title={subItem.title} followCursor>
                            <FiberManualRecordIcon
                              sx={{
                                fontSize: 8,
                                color:
                                  value === subItem.title
                                    ? 'var(--primary)'
                                    : 'inherit',
                              }}
                            />
                          </Tooltip>
                          <Typography
                            sx={{
                              fontSize: '100%',
                              opacity: open ? 1 : 0,
                              color:
                                value === subItem.title
                                  ? 'var(--primary)'
                                  : 'inherit',
                            }}
                          >
                            {subItem.title}
                          </Typography>
                        </Stack>
                      </NavLink>
                    ))}
                  </Stack>
                </Box>
              </Collapse>
            )}
          </Box>
        );
      })}
    </>
  );
};

export default SubMenNavigation;
