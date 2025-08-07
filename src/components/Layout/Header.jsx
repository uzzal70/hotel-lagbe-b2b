import {
  Box,
  Grid,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import ImageImport from '../../assets/ImageImport';
import { useState, useEffect } from 'react';
import Profile from '../Common/Profile';
import Balance from '../Common/Balance';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
import Token from '../Common/Token';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import Logout from '../Login/Logout';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import TokenToName from '../Common/TokenToName';
import PartialBalance from '../Common/PartialBalance';
import Rewards from '../Common/Rewards';
import CreditRequest from '../Common/CreditRequest';
import companyInfo from '../../common/companyInfo';
import { useMediaQuery } from '@mui/material';

const Header = () => {
  const navigate = useNavigate();
  const agentId = Token();
  const tokenise = TokenToName();
  const agentRole = tokenise?.role === 'AGENT' ? true : false;
  const tokenData = {
    iat: tokenise?.iat,
    exp: tokenise?.exp,
  };
  const isSmallDevice = useMediaQuery('(max-width:600px)');
  const isTokenExpired = () => {
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= tokenData?.exp;
  };

  const handleLogout = () => {
    localStorage.removeItem('agentInfo');
    sessionStorage.removeItem('modalShownTime');
    sessionStorage.removeItem('modalShown');
    navigate('/');
  };

  const url = `/agent/findAgentById/${agentId}`;
  const supporturl = `/agent/getSupportTableByAgentId/${agentId}?site=${companyInfo.platform}`;
  const {
    data,
    isLoading,
    error: agentError,
  } = useGetItemsQuery({ url }, { pollingInterval: 900000 });

  const { data: support, error } = useGetItemsQuery({ url: supporturl });

  const contactInfo = [
    {
      name: 'Support & Reservation',
      phone: support?.supportTable?.reservationPhone || 'Phone',
      email: support?.supportTable?.reservationEmail || 'Email',
    },
    // {
    //   name: 'Accounts & Finance',
    //   phone: support?.supportTable?.accountsFinancePhone || 'Phone',
    //   email: support?.supportTable?.accountsFinanceEmail || 'Email',
    // },
    {
      name: `KAM (${support?.kam?.firstName || '...'})`,
      phone: support?.kam?.phone || 'Phone',
      email: support?.kam?.email || 'Email',
    },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (isTokenExpired()) {
        handleLogout();
      }
    };
    checkTokenExpiration();
    const timer = setInterval(checkTokenExpiration, 1000); // Check every second
    return () => clearInterval(timer);
  }, []);

  if (agentError) {
    const titleMsg = isSmallDevice
      ? `<div style="font-size: 18px; color: var(--primary); text-align: center;">
        If you are using the mobile app </br> Please Re-install the App
       </div>`
      : `<div style="font-size: 20px; color: var(--primary);">
        Please Try Again
       </div>`;

    Swal.fire({
      icon: 'error',
      title: titleMsg,
      text: 'Something went wrong!',
      footer: error?.data?.message,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
        window.location.reload();
      }
    });
  }

  return (
    <Box py={1.3} width="100%">
      <Grid container alignItems="center">
        <Grid item sm={9} md={7} lg={5}>
          <Grid container columnSpacing={{ xs: 1, lg: 2 }}>
            {contactInfo.map((data, i, arr) => (
              <Grid item sm={4} md={4} key={i}>
                <Box
                  sx={{
                    borderRight:
                      arr.length - 1 !== i ? '1px solid var(--stroke)' : '',
                    pr: 0.5,
                  }}
                >
                  <Tooltip title={data.name}>
                    <Typography
                      sx={{ color: 'var(--secondary)', fontSize: 11 }}
                      noWrap
                    >
                      {data.name}
                    </Typography>
                  </Tooltip>
                  <Box>
                    {isLoading ? (
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        sx={{
                          mt: 1,
                          width: 100,
                          height: 14,
                          bgcolor: 'var(--skeleton)',
                        }}
                      />
                    ) : (
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <img src={ImageImport.phone} alt="" />
                        <Tooltip title={data.phone}>
                          <Typography
                            sx={{
                              color: 'var(--primary)',
                              fontSize: { xs: 12, lg: 14 },
                              fontWeight: 400,
                            }}
                            noWrap
                          >
                            {isLoading ? (
                              <Skeleton
                                animation="wave"
                                variant="rounded"
                                sx={{
                                  width: 100,
                                  height: 10,
                                  bgcolor: 'var(--skeleton)',
                                }}
                              />
                            ) : (
                              `${data.phone}`
                            )}
                          </Typography>
                        </Tooltip>
                      </Stack>
                    )}

                    {isLoading ? (
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        sx={{
                          mt: 0.5,
                          width: 100,
                          height: 14,
                          bgcolor: 'var(--skeleton)',
                        }}
                      />
                    ) : (
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <img src={ImageImport.gmail} alt="" />
                        <Tooltip title={data.email}>
                          <Typography
                            sx={{
                              color: 'var(--primary)',
                              fontSize: { xs: 12, md: 11, lg: 12 },
                              fontWeight: 400,
                              pb: { ms: 0.4, lg: 0.5 },
                            }}
                            noWrap
                          >
                            {data.email}
                          </Typography>
                        </Tooltip>
                      </Stack>
                    )}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item sm={3} md={5} lg={7}>
          {/* for large and mediam Device  */}
          <Stack
            direction="row"
            justifyContent="end"
            spacing={{ xs: 1, md: 1, lg: 1 }}
            sx={{ display: { xs: 'none', md: 'flex' } }}
            alignItems="center"
          >
            {window.innerWidth > 1400 && (
              <>
                <Box sx={{ display: { md: 'none', lg: 'flex' } }}>
                  <Rewards
                    data={data}
                    width={{ xs: '80px', md: '90px' }}
                    size1={11}
                    size2={16}
                    isLoading={isLoading}
                  />
                </Box>
                <Box sx={{ display: { md: 'none', lg: 'flex' } }}>
                  <PartialBalance
                    name="Partial Due"
                    bgcolors="var(--bgcolor)"
                    colorp="var(--primary)"
                    size1={11}
                    size2={16}
                    route={'/partial'}
                  />
                </Box>
              </>
            )}

            <Box sx={{ display: { md: 'none', lg: 'flex' } }}>
              <CreditRequest
                name="Credit"
                bgcolors="var(--bgcolor)"
                colorp="var(--primary)"
                size1={11}
                size2={16}
                // route={'/partial'}
              />
            </Box>
            <Balance
              name="Balance"
              bgcolors="var(--bgcolor)"
              colorp="var(--primary)"
              size1={11}
              size2={16}
            />
            <Box
              // onClick={handleOpen}
              sx={{
                position: 'relative',
                cursor: 'pointer',
                border: '1px solid var(--stroke)',
                p: 0.5,
                borderRadius: '5px',
                '&:hover': {
                  backgroundColor: 'var(--bgcolor)',
                },
              }}
            >
              <Profile
                isLoading={isLoading}
                name={data?.existingAgent?.companyName || ''}
                colors="var(--secondary)"
                colorp="var(--primary)"
                size1={{ md: 10, lg: 11 }}
                size2={{ md: 14, lg: 16 }}
                profileHandleOpen={handleOpen}
              />
            </Box>

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
              onClose={handleOpen}
            >
              <Box>
                {agentRole && (
                  <MenuItem>
                    <Box
                      sx={{
                        border: '1px solid var(--stroke)',
                        borderRadius: '5px',
                        width: '100%',
                        p: 1,
                      }}
                    >
                      <NavLink
                        to="/dashboard/myprofile"
                        className={({ isActive }) =>
                          isActive ? 'active-link' : 'link'
                        }
                      >
                        <Stack direction="row" spacing={2} pl={0}>
                          <Tooltip title="My Profile" followCursor>
                            <AccountBoxTwoToneIcon
                              sx={{ color: '#b6b5b5', fontSize: 22 }}
                            />
                          </Tooltip>
                          <Typography
                            sx={{ opacity: open ? 1 : 0, fontSize: '90%' }}
                            className="content"
                          >
                            My Profile
                          </Typography>
                        </Stack>
                      </NavLink>
                    </Box>
                  </MenuItem>
                )}
                <MenuItem>
                  <Box
                    sx={{
                      border: '1px solid var(--stroke)',
                      borderRadius: '5px',
                      width: '100%',
                      p: 1,
                    }}
                  >
                    <Logout pl={0} />
                  </Box>
                </MenuItem>
                <MenuItem sx={{ display: { md: 'flex', lg: 'none' } }}>
                  <Box>
                    <PartialBalance
                      name="Partial Due"
                      bgcolors="var(--bgcolor)"
                      colorp="var(--primary)"
                      size1={11}
                      size2={16}
                      route={'/partial'}
                    />
                  </Box>
                </MenuItem>
                <MenuItem sx={{ display: { md: 'flex', lg: 'none' } }}>
                  <Box>
                    <Rewards
                      data={data}
                      width={{ xs: '80px', md: '90px' }}
                      size1={11}
                      size2={16}
                      isLoading={isLoading}
                    />
                  </Box>
                </MenuItem>
              </Box>
            </Menu>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
