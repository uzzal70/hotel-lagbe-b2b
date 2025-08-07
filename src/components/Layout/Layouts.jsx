/* eslint-disable no-unused-vars */
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import SidebarContent from './SidebarContent';
import ImageImport from '../../assets/ImageImport';
import { useState } from 'react';
import BottonNavigatioin from './BottonNavigatioin';
import { Tooltip } from '@mui/material';
import ErrorWrapper from '../Error';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  // whiteSpace: 'noWrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Layouts() {
  const theme = useTheme();
  let deviceWidth = window.innerWidth < 1025 ? false : true;
  const [open, setOpen] = useState(deviceWidth);

  const handleDrawerToggle = React.useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        '.MuiAppBar-root': {
          bgcolor: 'var(--white)',
          boxShadow: 'none',
        },
        '.MuiDrawer-paper': {
          '&::-webkit-scrollbar': {
            width: '5px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'var(--icon-color)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--btn-stroke)',
            borderRadius: '10px',
          },
        },
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon
              sx={{
                color: 'var(--primary)',
              }}
            />
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        <Box
          sx={{
            py: { sm: 0.5, lg: 1 },
            position: 'relative',
          }}
        >
          <DrawerHeader>
            {/* this condition for Small device  */}
            {open ? (
              <Box>
                <Box
                  onClick={() => navigate('/dashboard')}
                  sx={{
                    mt: 1,
                    ml: -2,
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={ImageImport.logo}
                    style={{ width: '170px' }}
                    alt=""
                  />
                </Box>
                <Box
                  onClick={handleDrawerToggle}
                  sx={{
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '-15px',
                    top: '20%',
                  }}
                >
                  <img src={ImageImport.leftarrow} alt="Close" />
                </Box>
              </Box>
            ) : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{
                  marginLeft: 0,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon
                  sx={{
                    color: 'var(--primary)',
                  }}
                />
              </IconButton>
            )}
          </DrawerHeader>
        </Box>

        <Divider />
        <List>
          <SidebarContent open={open} />
        </List>
      </Drawer>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <BottonNavigatioin />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          py: { xs: 0, md: 1, lg: 2 },
          bgcolor: 'var(--body)',
          width: 'calc(100% - 240px)',
        }}
      >
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <DrawerHeader />
        </Box>
        <Box
          sx={{
            position: 'fixed',
            bottom: { xs: 100, md: 20 },
            right: 20,
            cursor: 'pointer',
            zIndex: 100,
          }}
        >
          <Tooltip title="Live Whatsapp Support" arrow followCursor>
            <a
              href="https://wa.me/8801332564528"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="39"
                height="39"
                viewBox="0 0 39 39"
              >
                <path
                  fill="#00E676"
                  d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"
                ></path>
                <path
                  fill="#FFF"
                  d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"
                ></path>
              </svg>
            </a>
          </Tooltip>
        </Box>

        <ErrorWrapper>
          <Outlet />
        </ErrorWrapper>
      </Box>
    </Box>
  );
}
