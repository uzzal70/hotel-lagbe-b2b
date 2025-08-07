import { Box, Button, Drawer, Grid, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ImageImport from '../../assets/ImageImport';
import { useState } from 'react';
import SidebarContent from './SidebarContent';

const BottonNavigatioin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Box>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          a: {
            fontSize: 9,
            fontWeight: 400,
          },
          '.MuiBottomNavigationAction-root': {
            minWidth: '70px',
          },
          '.active': {
            color: 'var(--primary)',
          },
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <Grid container sx={{ alignItems: 'center', py: 1 }}>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                fontSize: 10,
                textAlign: 'center',
                color: 'var(--secondary)',
              }}
              component={Button}
              onClick={() => handleNavigate('/dashboard')}
            >
              <Box>
                <Box>
                  <img
                    src={
                      location.pathname === '/dashboard'
                        ? ImageImport.bHomeA
                        : ImageImport.bHome
                    }
                    alt="Home"
                    style={{ width: 18 }}
                  />
                </Box>
                <Box>Home</Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                fontSize: 10,
                textAlign: 'center',
                color: 'var(--secondary)',
              }}
              component={Button}
              onClick={() => handleNavigate('/dashboard/bookinghistory')}
            >
              <Box>
                <Box>
                  <img
                    src={
                      location.pathname === '/dashboard/bookinghistory'
                        ? ImageImport.bBookingA
                        : ImageImport.bBooking
                    }
                    alt="Home"
                    style={{ width: 18 }}
                  />
                </Box>
                <Box>Booking</Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                fontSize: 10,
                textAlign: 'center',
                color: 'var(--secondary)',
              }}
              component={Button}
              onClick={() => handleNavigate('/dashboard/transactionhistory')}
            >
              <Box>
                <Box>
                  <img
                    src={
                      location.pathname === '/dashboard/transactionhistory'
                        ? ImageImport.bAccountA
                        : ImageImport.bAccount
                    }
                    alt="Account"
                    style={{ width: 18 }}
                  />
                </Box>
                <Box>Account</Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
            onClick={() => setOpen(true)}
            component={Button}
          >
            <Box
              sx={{
                fontSize: 10,
                textAlign: 'center',
                color: 'var(--secondary)',
                fontWeight: 300,
              }}
            >
              <Box>
                <img src={ImageImport.bMore} alt="More" style={{ width: 18 }} />
              </Box>
              More
            </Box>
          </Grid>
        </Grid>

        <Drawer
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            '.MuiPaper-root': {
              width: '60% !important',
            },
          }}
        >
          <Box
            sx={{
              bgcolor: 'var(--white)',
              borderRadius: '16px',
              width: '100%',
              p: 0,
            }}
          >
            <SidebarContent open={open} setOpen={setOpen} />
          </Box>
        </Drawer>
      </Paper>
    </Box>
  );
};

export default BottonNavigatioin;
