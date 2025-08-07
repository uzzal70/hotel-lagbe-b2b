/* eslint-disable react/prop-types */
import { Avatar, Box, Menu, Stack, Tooltip, Typography } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import { useState } from 'react';
import { FlightContent } from '../Message/FlightMessageContent';
import { HotelContent } from '../Message/HotelMessageContent';
import { useSelector } from 'react-redux';

const Profile = ({ profileHandleOpen, name }) => {
  const [open, setOpen] = useState(false);
  const [activeLabel, setActiveLabel] = useState('Flight'); // Default is "Flight"
  const { unseenCount, unseenCountHotel } = useSelector(
    (state) => state.global
  );
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleChange = (label) => {
    setActiveLabel(label);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Avatar
            sx={{
              height: { xs: 30, lg: 35 },
              width: { xs: 30, lg: 35 },
              bgcolor: 'var(--primary)',
              cursor: 'pointer',
            }}
            onClick={handleToggle}
          >
            <MessageIcon sx={{ fontSize: 18, color: '#fff' }} />
          </Avatar>

          <Box
            sx={{
              top: -5,
              right: 1,
              bgcolor: 'var(--red)',
              fontSize: 10,
              px: 0.5,
              position: 'absolute',
              borderRadius: 20,
            }}
          >
            {unseenCount + unseenCountHotel}
          </Box>
        </Box>
        <Tooltip title={name || ''}>
          <Avatar
            sx={{
              height: { xs: '30px', lg: '35px' },
              width: { xs: '30px', lg: '35px' },
              bgcolor: 'var(--primary)',
              cursor: 'pointer',
            }}
            onClick={profileHandleOpen}
          />
        </Tooltip>
      </Stack>

      <Menu
        sx={{ mt: '50px' }}
        id="menu-appbar"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleToggle}
      >
        <Stack
          direction={'row'}
          spacing={2}
          px={2}
          alignItems={'center'}
          sx={{
            fontSize: 12,
            border: '1px solid var(--stroke )',
            mx: 1,
            mb: 1,
          }}
        >
          <Typography>Message</Typography>
          <Box
            onClick={() => handleChange('Flight')}
            sx={{
              color:
                activeLabel === 'Flight' ? 'var(--white)' : 'var(--primary)',
              cursor: 'pointer',
              bgcolor:
                activeLabel === 'Flight' ? 'var(--primary)' : 'var(--disable)',
              px: 1.5,
            }}
          >
            Flight
          </Box>
          &nbsp;&nbsp;&nbsp;&nbsp;/
          <Box
            sx={{
              color:
                activeLabel === 'Hotel' ? 'var(--white)' : 'var(--primary)',
              cursor: 'pointer',
              bgcolor:
                activeLabel === 'Hotel' ? 'var(--primary)' : 'var(--disable)',
              px: 1.5,
            }}
            onClick={() => handleChange('Hotel')}
          >
            Hotel
          </Box>
        </Stack>

        <Box p={1}>
          {activeLabel === 'Flight' ? (
            <FlightContent handleClose={handleClose} />
          ) : (
            <HotelContent handleClose={handleClose} />
          )}
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
