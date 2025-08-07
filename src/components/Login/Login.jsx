import { Box, Button, Typography } from '@mui/material';
import CustomButton from '../Common/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLoginItemMutation } from '../../redux/slices/apiSlice';
import CustomCircularProgress from '../Common/CustomCircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TokenToName from '../Common/TokenToName';
import companyInfo from '../../common/companyInfo';
import responseimg from '../../assets/responseimg';
import { InfoOutlined } from '@mui/icons-material';
// import NotificationModal from '../Common/NotificationModal';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const tokenise = TokenToName();
  const tokenData = {
    iat: tokenise?.iat,
    exp: tokenise?.exp,
  };

  const isTokenExpired = () => Math.floor(Date.now() / 1000) >= tokenData?.exp;

  const handleLogout = () => {
    localStorage.removeItem('agentInfo');
    sessionStorage.removeItem('modalShownTime');
    sessionStorage.removeItem('modalShown');
    navigate('/');
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (isTokenExpired()) handleLogout();
    };

    checkTokenExpiration(); // Initial check
    const timer = setInterval(checkTokenExpiration, 10000); // Check every 10 seconds

    return () => clearInterval(timer); // Cleanup timer
  }, []);
  const loginData = {
    email: formData.email?.toLowerCase() || '',
    password: formData.password || '',
  };
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(null);
  const [login, { isLoading }] = useLoginItemMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(loginData).unwrap();
      localStorage.setItem('agentInfo', JSON.stringify(result));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      if (error?.data?.message === 'Agent not approved') {
        toast(
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                height: '235px',
                py: 2,
              }}
            >
              <Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={responseimg.agentNotApprove}
                    alt=""
                    style={{ height: '140px', paddingLeft: '10px' }}
                  />
                </Box>

                <Box
                  sx={{
                    fontSize: 14,
                    color: 'var(--red)',
                    fontWeight: 500,
                  }}
                >
                  {error?.data?.message ||
                    'Something went wrong! Please try again'}
                </Box>
                <Box
                  sx={{ fontSize: 12, color: 'var(--primary-rgb)', pt: 0.5 }}
                >
                  Please contact to this email address for account approval
                  <strong style={{ fontWeight: 500, color: 'var(--primary)' }}>
                    {' '}
                    {companyInfo.email} or call {companyInfo.phone}
                  </strong>
                </Box>
                <Box
                  sx={{
                    fontWeight: 400,
                    color: 'var(--orengel)',
                    fontSize: 14,
                    my: 1,
                  }}
                >
                  <InfoOutlined sx={{ fontSize: 15, mb: -0.4 }} /> To review
                  your account it may take up to 48 hours.
                  {/* <Box>It may take up to 48 hours.</Box> */}
                </Box>
              </Box>
            </Box>
          </Box>
        );
      } else {
        setErrors(
          error?.data?.message || 'Something went wrong! Please try again'
        );
      }
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        bgcolor: '#ffffff91',
        boxShadow: {
          xs: 'none',
          sm: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
        },

        borderRadius: '5px',
        mt: 5,
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            textAlign: 'left',
            mb: 3,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Typography sx={{ color: 'var(--black)', fontSize: 18 }}>
            Welcome to
          </Typography>
          <Typography
            sx={{
              color: 'var(--black)',
              fontSize: 30,
              fontWeight: 500,
              mt: -0.5,
            }}
          >
            {companyInfo.companyName}
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'left', mb: 1 }}>
          <Typography sx={{ color: 'var(--black)', fontSize: 20 }}>
            Sign in
          </Typography>
          <Typography sx={{ color: 'var(--secondary)', fontSize: 13, mb: 2 }}>
            Sign In To Continue To The Dashboard
          </Typography>
        </Box>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Box
            className="custom-input"
            sx={{
              input: {
                bgcolor: '#dfdfe8de',
                boxSizing: 'border-box',
                // border: '1px solid var(--stroke)',
                padding: '10px 30px 10px 10px',
                fontSize: '16px',
                width: '100%',
              },
              position: 'relative',
              zIndex: '1000 !important',
            }}
          >
            <Box>
              <label htmlFor="email">Email</label>
              <Box
                sx={{
                  bgcolor: 'var(--gray)',
                  borderRadius: '5px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <input
                  style={{
                    textTransform: 'lowercase',
                    cursor: 'text',
                  }}
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={handleChange}
                  autoFocus
                />
                <Box
                  sx={{
                    position: 'absolute',
                    right: '0.5%',
                    top: '55%',
                    pr: 1,
                    transform: 'translateY(-50%)',
                    color: 'var(--icon-color)',
                    cursor: 'pointer',
                  }}
                >
                  <MailOutlineIcon sx={{ fontSize: 20 }} />
                </Box>
              </Box>
            </Box>
            <Box mt={2}>
              <label htmlFor="email">Password</label>
              <Box
                sx={{
                  bgcolor: 'var(--gray)',
                  borderRadius: '5px',
                  position: 'relative',
                }}
              >
                <input
                  required
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  // defaultValue="" // Initial value set here
                  onChange={handleChange}
                  // autoComplete="new-password"
                  // aria-hidden="false"
                />
                <Box
                  sx={{
                    position: 'absolute',
                    right: '0.5%',
                    top: '55%',
                    pr: 1,
                    transform: 'translateY(-50%)',
                    color: 'var(--icon-color)',
                    cursor: 'pointer',
                  }}
                >
                  {showPassword ? (
                    <VisibilityIcon
                      onClick={handleShowPassword}
                      sx={{ fontSize: 21 }}
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={handleShowPassword}
                      sx={{ fontSize: 21 }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
            {errors && (
              <Box sx={{ fontSize: 12, color: 'var(--red)', pt: 1 }}>
                <InfoOutlined sx={{ fontSize: 15, mb: -0.4 }} /> {errors || ''}
              </Box>
            )}
            <Box
              sx={{
                fontSize: 14,
                color: 'var(--disable)',
                textAlign: 'end',
                mt: 0.5,
              }}
            >
              <Button
                component={Link}
                to="/resetpassword"
                style={{
                  color: 'var(--black)',
                  textTransform: 'capitalize',
                  fontSize: 13.5,
                  fontWeight: 500,
                }}
              >
                Forgot password?
              </Button>
            </Box>

            <Box mt={0.5}>
              {isLoading ? (
                <Box
                  sx={{
                    pt: 1.4,
                    pb: 3.4,
                    bgcolor: 'var(--bgcolor)',
                    borderRadius: '5px',
                    width: '100%',
                  }}
                >
                  <CustomCircularProgress size={16} />
                </Box>
              ) : (
                <Box>
                  <CustomButton
                    type="submit"
                    value="Login"
                    bgcolor="var(--primary-btn)"
                    hovercolor="var(--primary-btn)"
                    textcolor="var(--white)"
                    width="100%"
                    justify="center"
                    padding={'6px 20px'}
                    disabled={isLoading ? true : false}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </form>
        <Box
          sx={{
            fontSize: 14,
            color: 'var(--disable)',
            textAlign: 'center',
            mt: 1,
          }}
        >
          New here?
          <Button
            component={Link}
            to="/registration"
            style={{
              color: 'var(--black)',
              textTransform: 'capitalize',
              fontSize: 13.5,
            }}
          >
            Sign up Now!
          </Button>
        </Box>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={15000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* <NotificationModal /> */}
    </Box>
  );
};

export default Login;
