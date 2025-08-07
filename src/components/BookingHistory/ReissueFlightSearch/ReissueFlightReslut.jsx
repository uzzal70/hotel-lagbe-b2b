import { Box, Collapse, Grid, Stack, Typography } from '@mui/material';
import CustomTypography from '../../Common/CustomTypography';
import FlightLayout from '../../Dashboard/FlightResults/FlightLayout';
import { ExpandMore } from '@mui/icons-material';
import AirlineSeatReclineNormalOutlinedIcon from '@mui/icons-material/AirlineSeatReclineNormalOutlined';
import LuggageIcon from '@mui/icons-material/Luggage';
import ReissuePriceSection from './ReissuePriceSection';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FlightDetails from '../../Dashboard/FlightResults/FlightDetails';
import CustomButton from '../../Common/CustomButton';

const ReissueFlightReslut = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState({
    flightDetails: false,
    priceBreakdown: false,
  });
  const handleChange = (property) => {
    setOpen((prevState) => ({
      ...prevState,
      [property]: !prevState[property],
    }));
  };

  const handleClose = () => {
    setOpen({
      flightDetails: false,
      priceBreakdown: false,
    });
  };

  const handleBooking = () => {
    navigate('/dashboard/quotationprocess', {
      state: {
        data: '',
        old: 'Old',
        new: 'New',
        from: 'reissueflightsearch',
      },
    });
  };
  const MemoizedFlightDetails = React.memo(FlightDetails);

  return (
    <Box
      sx={{
        bgcolor: 'var(--white)',
        borderRadius: '10px',
        my: 1,
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={9}
          sx={{
            pl: { xs: 1, md: 2 },
            pt: { xs: 1, md: 2 },
            pb: { xs: 1, md: 2 },
            pr: { xs: 1, md: 0 },
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'column' }}
            justifyContent="space-between"
            sx={{ height: '100%' }}
          >
            {/* 1st Section  */}
            {/* for only mobile  */}
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <CustomTypography
                fontcolor="var(--dark-green)"
                bgcolor="var(--green)"
                value="Cheapest"
                title="Cheapest"
                radius="5px"
              />
              <CustomTypography
                fontcolor="var(--black)"
                bgcolor="var(--body)"
                value="Sabre"
              />
              <CustomTypography
                fontcolor="var(--dark-sky)"
                bgcolor="var(--sky)"
                value="Refundable"
                title="Refundable"
                radius="5px"
              />
            </Stack>

            <Stack
              direction="row"
              spacing={{ xs: 0, md: 1 }}
              alignItems="start"
              order={{ xs: 2, sm: 2, md: 1 }}
            >
              <Box
                sx={{
                  display: {
                    xs: 'none',
                    md: 'flex',
                  },
                }}
              >
                <div className="custom-checkbox">
                  <input
                    type="checkbox"
                    id="quotation"
                    name="quotation"
                    // onChange={() => handleCheckboxChange(provider.name)}
                  />
                </div>
              </Box>

              <Typography
                sx={{
                  color: 'var(--black)',
                  fontWeight: 400,
                  fontSize: { xs: 10, md: 13 },
                }}
                noWrap
              >
                Biman Bangladesh Air
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0}>
                <CustomTypography
                  fsize={{ xs: 10, md: 12 }}
                  px={0.3}
                  fontcolor="var(--black)"
                  value={'BG-123'}
                />
                <Box display={{ xs: 'none', md: 'block' }}>
                  <CustomTypography
                    fontcolor="var(--black)"
                    bgcolor="var(--body)"
                    value={'Sabre'}
                  />
                </Box>
              </Stack>
            </Stack>

            {/* 2nd Section  */}
            <Grid order={{ xs: 1, sm: 1, md: 2 }}>
              {[...new Array(1)].map((d, i) => (
                <Box key={i}>
                  <FlightLayout />
                </Box>
              ))}
            </Grid>

            {/* 3rd Section  */}
            <Grid
              container
              justifyContent="space-between"
              order={{ xs: 3 }}
              sx={{
                pl: { xs: 0, md: 7 },
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <Grid item>
                <Stack direction="row" spacing={0.5}>
                  <CustomTypography
                    fontcolor="var(--dark-sky)"
                    bgcolor="var(--price-color)"
                    fontWeight={300}
                    value={'7kg'}
                    title="Cabin baggage"
                    icon={<LuggageIcon sx={{ fontSize: 14 }} />}
                  />
                  <CustomTypography
                    fontcolor="var(--dark-sky)"
                    bgcolor="var(--price-color)"
                    value={'30kg'}
                    title="Par passenger baggage"
                    icon={<LuggageIcon sx={{ fontSize: 14 }} />}
                    fontWeight={300}
                  />

                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <CustomTypography
                      fontcolor="var(--dark-sky)"
                      bgcolor="var(--price-color)"
                      value={'3 Left'}
                      title="3 Seat left"
                      icon={
                        <AirlineSeatReclineNormalOutlinedIcon
                          sx={{ fontSize: 14 }}
                        />
                      }
                      fontWeight={300}
                    />
                  </Box>
                  {window.innerWidth > 1025 && (
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                      <CustomTypography
                        px={0.5}
                        title="Restaurant"
                        // icon={
                        //   <img
                        //     src={ImageImport.spoon}
                        //     style={{ width: 20 }}
                        //     alt="spoon"
                        //   />
                        // }
                      />
                    </Box>
                  )}

                  {window.innerWidth > 1025 && (
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                      <CustomTypography
                        px={0.5}
                        title="Wifi available "
                        // icon={
                        //   <img
                        //     src={ImageImport.wifi}
                        //     style={{ width: 18 }}
                        //     alt="wifi"
                        //   />
                        // }
                      />
                    </Box>
                  )}
                </Stack>
              </Grid>
              <Grid item display="flex">
                <CustomTypography
                  fontcolor="var(--dark-green)"
                  bgcolor="var(--green)"
                  value={'Refundable'}
                  title="Refundable"
                />
                <CustomTypography
                  fontcolor="var(--primary)"
                  value={
                    <>
                      Flight Details&nbsp;
                      <ExpandMore
                        sx={{
                          fontSize: 20,
                          transition: 'transform 0.3s ease-in-out',
                          transform: `rotate(${
                            open.flightDetails ? 180 : 0
                          }deg)`,
                        }}
                      />
                    </>
                  }
                  click={() => handleChange('flightDetails')}
                />
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        {/* Price Section  mobile and dexktop both */}
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          sx={{
            height: 'auto',

            p: { xs: 1, md: 1 },
            py: { xs: 0, md: 1 },
          }}
          // className={window.innerWidth < 500 ?"dashed-left-line":""}
        >
          <ReissuePriceSection
            open={open}
            handleChange={handleChange}
            handleClose={handleClose}
            handleClick={handleBooking}
          />
        </Grid>

        {/* only mobile  bottom button and baggage*/}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%', my: 0, p: 1, display: { md: 'none' } }}
        >
          <Stack direction="row" spacing={0.5}>
            <CustomTypography
              fontcolor="var(--dark-sky)"
              bgcolor="var(--price-color)"
              fontWeight={300}
              value={'7kg'}
              title="Cabin baggage"
              icon={<LuggageIcon sx={{ fontSize: 14 }} />}
            />
            <CustomTypography
              fontcolor="var(--dark-sky)"
              bgcolor="var(--price-color)"
              fontWeight={300}
              value={'30kg'}
              title="Par passenger baggage"
              icon={<LuggageIcon sx={{ fontSize: 14 }} />}
            />
          </Stack>
          <Box>
            <Stack direction="row" spacing={1}>
              <CustomTypography
                display={{ xs: 'none', sm: 'flex', md: 'none' }}
                fontcolor="var(--primary)"
                value={
                  <>
                    Flight Details&nbsp;
                    <ExpandMore
                      sx={{
                        fontSize: 20,
                        transition: 'transform 0.3s ease-in-out',
                        transform: `rotate(${open.flightDetails ? 180 : 0}deg)`,
                      }}
                    />
                  </>
                }
                click={() => handleChange('flightDetails')}
              />
              <CustomButton
                textcolor="var(--white)"
                bgcolor="var(--primary)"
                hovercolor="var(--primary-rgb)"
                padding="1px 15px"
                value="Re-Issue"
                handleClick={() => handleBooking()}
              />
            </Stack>
          </Box>
        </Stack>
      </Grid>
      <Collapse in={open.flightDetails}>
        <MemoizedFlightDetails />
      </Collapse>
    </Box>
  );
};

export default ReissueFlightReslut;
