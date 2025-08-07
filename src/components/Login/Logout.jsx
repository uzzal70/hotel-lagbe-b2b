/* eslint-disable react/prop-types */
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Logout = ({ pl }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('agentInfo');
    sessionStorage.removeItem('modalShownTime');
    sessionStorage.removeItem('modalShown');
    navigate('/');
  };

  return (
    <Box onClick={handleLogout} sx={{ cursor: 'pointer' }}>
      <Stack direction="row" spacing={2} pl={pl}>
        <Tooltip title="Log out" followCursor>
          <ExitToAppIcon sx={{ color: '#b6b5b5', fontSize: 22 }} />
        </Tooltip>
        <Typography
          sx={{
            opacity: open ? 1 : 0,
            fontSize: '90%',
            color: 'var(--secondary)',
          }}
          className="content"
        >
          Logout
        </Typography>
      </Stack>
    </Box>
  );
};

export default Logout;
