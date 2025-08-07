/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, Modal, Stack, Tooltip, Typography } from '@mui/material';
import CustomButton from '../Common/CustomButton';
import companyInfo from '../../common/companyInfo';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LuggageIcon from '@mui/icons-material/Luggage';
import FastfoodIcon from '@mui/icons-material/Fastfood';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none !important',
  boxShadow: 24,
  borderRadius: '10px',
  outline: 'none !important',
};

const GroupFlight = ({ data }) => {
  const [open, setOpen] = useState({
    flightDetails: false,
    priceBreakdown: false,
    booking: false,
  });

  const handleClose = () => {
    setOpen({
      flightDetails: false,
      priceBreakdown: false,
      booking: false,
    });
  };

  const handleBooking = (property) => {
    setOpen((prevState) => ({
      ...prevState,
      [property]: !prevState[property],
    }));
  };

  return (
    <Box
      sx={{
        bgcolor: 'var(--body)',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        '&:hover': {
          boxShadow: 'rgba(99, 99, 99, 0.4) 0px 4px 12px 0px',
          transform: 'translateY(-1px)',
          transition: 'all 0.3s ease',
        },
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 1,
            py: 0.5,
          }}
        >
          <Stack direction={'row'} alignItems="center" spacing={1}>
            <Box
              sx={{
                width: { xs: '30px', sm: '30px', md: '30px' },
                height: { xs: '30px', sm: '30px', md: '30px' },
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
              <img
                src={`https://tripfindy-logos.s3.ap-southeast-1.amazonaws.com/airlines/${data?.code}.png`}
                alt="flight logo"
                width="100%"
              />
            </Box>
            <Typography
              noWrap
              sx={{
                fontSize: { xs: 12, md: 14 },
                color: 'var(--secondary)',
              }}
            >
              {data?.airline}
            </Typography>
          </Stack>
          <Typography
            noWrap
            sx={{
              fontSize: { xs: 12, md: 14 },
              color: 'var(--secondary)',
            }}
          >
            {data?.ref}
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: 'var(--white)',
            p: { xs: 1, md: 1.2 },
          }}
        >
          <Stack
            direction={'row'}
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Typography
              noWrap
              sx={{
                fontSize: { xs: 12, md: 16 },
                color: 'var(--secondary)',
                pt: 0.3,
              }}
            >
              Route:{' '}
              <strong
                style={{
                  background: 'var(--body)',
                  padding: '1px 10px ',
                  borderRadius: '20px',
                  border: '1px solid var(--stroke)',
                }}
              >
                {data?.route}
              </strong>
            </Typography>
            <Typography
              noWrap
              sx={{
                fontSize: { xs: 12, md: 14 },
                color: 'var(--secondary)',
              }}
            >
              Fare: <strong>{data?.fare}</strong> {companyInfo.currencyType}
            </Typography>
          </Stack>
          <Typography
            noWrap
            sx={{
              fontSize: { xs: 12, md: 14 },
              color: 'var(--secondary)',
              pt: 1,
            }}
          >
            Available Date: {data?.date}
          </Typography>
          <Typography
            noWrap
            sx={{
              fontSize: { xs: 12, md: 14 },
              color: 'var(--secondary)',
            }}
          >
            Flight Time: {data?.feature || 'N/A'}
          </Typography>

          <Typography
            noWrap
            sx={{
              fontSize: { xs: 12, md: 14 },
              color: 'var(--secondary)',
            }}
          >
            Transit: {data?.transitTime}
          </Typography>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Tooltip title="Baggage" followCursor placement="top">
              <Typography
                noWrap
                sx={{
                  fontSize: { xs: 12, md: 14 },
                  color: 'var(--secondary)',
                  display: 'flex',
                  gap: 0.3,
                }}
              >
                <LuggageIcon
                  sx={{
                    fontSize: 18,
                    mt: 0.2,
                    borderRadius: '20%',
                    color: 'var(--primary)',
                  }}
                />
                {data?.baggage}
              </Typography>
            </Tooltip>

            <Tooltip title="Meal" followCursor placement="top">
              <Typography
                noWrap
                sx={{
                  fontSize: { xs: 12, md: 14 },
                  color: 'var(--secondary)',
                  display: 'flex',
                  gap: 0.3,
                }}
              >
                <FastfoodIcon
                  sx={{
                    fontSize: 18,
                    mt: 0.2,
                    borderRadius: '20%',
                    color: data?.food ? 'var(--orengel)' : 'var(--disable)',
                  }}
                />{' '}
                Meal: {data?.food ? 'Yes' : 'No'}
              </Typography>
            </Tooltip>
          </Stack>
        </Box>
        <Box>
          <Stack
            direction={'row'}
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            sx={{
              bgcolor: 'var(--group-bgcolor)',
              px: 1,
              py: 0.8,
            }}
          >
            <Typography
              noWrap
              sx={{
                fontSize: { xs: 12, md: 14 },
                color:
                  data?.seat === 0 || data?.seat === '0'
                    ? 'var(--red)'
                    : 'var(--dark-green)',
                fontWeight: 500,
              }}
            >
              {data?.seat === 0 || data?.seat === '0'
                ? 'Sold Out'
                : `Seat Available: ${data?.seat}`}
            </Typography>
            <CustomButton
              textcolor="var(--white)"
              bgcolor="var(--primary)"
              hovercolor="var(--primary-rgb)"
              padding="2px 15px"
              value="Book Now"
              handleClick={() => handleBooking('booking')}
            />
          </Stack>
        </Box>
      </Box>

      <Modal open={open.booking} onClose={handleClose}>
        <Box sx={{ ...style, width: { xs: '90%', sm: '50%', md: '30%' } }}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            sx={{
              bgcolor: 'var(--bgcolor)',
              color: 'var(--black)',
              fontWeight: 500,
              fontSize: { xs: 14, md: 16 },
              px: 1,
              pt: 1,
              pb: 0.5,
              cursor: 'pointer',
            }}
          >
            <Box>Group Flight Booking</Box>
            <Box
              sx={{
                fontWeight: 300,
              }}
              onClick={handleClose}
            >
              <HighlightOffIcon />
            </Box>
          </Stack>

          <Box
            sx={{
              p: 2,
            }}
          >
            <Stack
              direction={'row'}
              spacing={1}
              justifyContent={'space-between'}
              pr={{ xs: 0, md: 2 }}
            >
              <Box display={'flex'}>
                <Box
                  sx={{
                    width: { xs: '20px', md: '30px' },
                  }}
                >
                  <img
                    src={`https://tripfindy-logos.s3.ap-southeast-1.amazonaws.com/airlines/${data?.code}.png`}
                    alt="air logo"
                    style={{ width: '100%' }}
                  />
                </Box>{' '}
                <Typography
                  sx={{
                    color: 'var(--secondary)',
                    fontWeight: 400,
                    fontSize: { xs: 12, md: 16 },
                    pl: 1,
                  }}
                  noWrap
                >
                  {data?.airline || 'Flight name'}
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: 'var(--dark-green)',
                  fontWeight: 400,
                  fontSize: { xs: 12, md: 16 },
                }}
                noWrap
              >
                Seat Available {data?.seat || 'No Seat'}
              </Typography>
            </Stack>

            <Typography
              sx={{
                color: 'var(--black)',
                fontWeight: 400,
                fontSize: { xs: 12, md: 14 },
                my: 2,
                textAlign: 'center',
              }}
            >
              If you wish to purchase this group fare, please contact our
              support team at <strong>+8801332564514 </strong>
              {' or '}
              <strong>{companyInfo.phone}</strong> or via at{' '}
              <strong>{companyInfo.email}</strong>
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default GroupFlight;
