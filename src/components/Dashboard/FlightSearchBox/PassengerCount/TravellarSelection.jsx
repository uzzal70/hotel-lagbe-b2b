/* eslint-disable react/prop-types */
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
  Box,
  Button,
  Collapse,
  Drawer,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import ImageImport from '../../../../assets/ImageImport';
import {
  decrementAdult,
  decrementChild,
  decrementInfant,
  flightClass,
  incrementAdult,
  incrementChild,
  incrementInfant,
  updateSelectedAges,
} from '../../../../redux/slices/passengerCountSlice';
// import { useState } from 'react';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto #003566',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark'
        ? 'rgba(57,75,89,.5)'
        : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: 'var(--black)',
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: 'var(--secondary)',
  },
});

function BpRadio(props) {
  return (
    <Radio
      sx={{
        '&:hover': {
          bgcolor: 'transparent',
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const TravellarSelection = ({
  travelarOpen,
  handleTravelarOpen,
  classOpen,
  handleClassOpen,

  // for multicity use
  index,
  searchData,
  setSearchData,
}) => {
  const dispatch = useDispatch();
  const { adultCount, childCount, infantCount, classNames, childAge } =
    useSelector((state) => state.passengerCount);

  const ageList = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const handleFlightClassName = (e) => {
    const value = e.target.value;
    dispatch(flightClass(value));
  };

  const handleIncrementAdult = () => {
    dispatch(incrementAdult());
  };

  const handleDecrementAdult = () => {
    dispatch(decrementAdult());
  };
  const handleIncrementChild = () => {
    dispatch(incrementChild());
    dispatch(updateSelectedAges([...childAge, 11]));
  };
  const handleDecrementChild = () => {
    dispatch(decrementChild());
    dispatch(updateSelectedAges(childAge.slice(0, -1)));
  };
  const handleIncrementInfant = () => {
    dispatch(incrementInfant());
  };
  const handleDecrementInfant = () => {
    dispatch(decrementInfant());
  };

  const handleChange = (event, index) => {
    const newSelectedAges = [...childAge];
    newSelectedAges[index] = Number(event.target.value);
    dispatch(updateSelectedAges(newSelectedAges));
  };
  return (
    <Box sx={{ position: 'relative' }}>
      <Stack
        direction={{ xs: 'row', sm: 'column' }}
        spacing={{ xs: 2, sm: 0 }}
        sx={{
          position: 'relative',
          cursor: 'pointer',
          justifyContent: 'space-between',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            border: { xs: '1px solid var(--flight-stroke)', sm: 0 },
            borderBottom: { sm: '1px solid var(--flight-stroke)' },
            borderRadius: { xs: '8px', sm: 0 },
            alignItems: 'center',
            px: 2,
            py: 1.2,
            width: '100%',
          }}
          onClick={() => {
            handleClassOpen('classOpen');
            const tempSegment = [...searchData.segments];
            tempSegment[index] = {
              ...tempSegment[index],
              openArrival: false,
              openDepart: false,
              openDate: false,
            };
            setSearchData({
              ...searchData,
              segments: tempSegment,
            });
          }}
        >
          <img src={ImageImport.seat} />{' '}
          <Typography sx={{ fontSize: 14, color: 'var(--black)' }}>
            {classNames === 'Y'
              ? 'Economy'
              : classNames === 'S'
              ? 'Premium Economy'
              : classNames === 'C'
              ? 'Business'
              : 'First Class'}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
            border: { xs: '1px solid var(--flight-stroke)', sm: 0 },
            borderRadius: { xs: '8px', sm: 0 },
            px: 2,
            py: 1.2,
            width: '100%',
          }}
          onClick={() => {
            handleTravelarOpen();
            const tempSegment = [...searchData.segments];
            tempSegment[index] = {
              ...tempSegment[index],
              openArrival: false,
              openDepart: false,
              openDate: false,
            };
            setSearchData({
              ...searchData,
              segments: tempSegment,
            });
          }}
        >
          <img src={ImageImport.passenger} />{' '}
          <Typography sx={{ fontSize: 14, color: 'var(--black)' }}>
            {adultCount + childCount + infantCount} Traveler
          </Typography>
        </Stack>
      </Stack>
      {/* Class Modal */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Collapse in={classOpen} timeout="auto" unmountOnExit>
          <Box
            sx={{
              position: 'absolute',
              top: { xs: '105%' },
              right: '0px',
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: 'var(--primary)',
                padding: '15px',
                overflow: 'hidden',
                width: { xs: '100%', sm: '300px' },
                border: '1px solid var(--gray)',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'start',
                '.MuiSvgIcon-root': {
                  color: 'var(--white)',
                  cursor: 'pointer',
                },
              }}
            >
              <Box>
                <Box
                  sx={{
                    span: {
                      fontSize: 12,
                    },
                  }}
                >
                  <FormControl>
                    <RadioGroup
                      value={classNames}
                      row
                      onChange={handleFlightClassName}
                    >
                      <FormControlLabel
                        value="Y"
                        control={<BpRadio />}
                        label="Economy"
                        sx={{
                          color: 'var(--white)',
                        }}
                      />
                      <FormControlLabel
                        value="S"
                        control={<BpRadio />}
                        label="Premium Economy"
                        sx={{
                          color: 'var(--white)',
                        }}
                      />
                      <FormControlLabel
                        value="C"
                        control={<BpRadio />}
                        label="Business"
                        sx={{
                          mr: 2.5,
                          color: 'var(--white)',
                        }}
                      />

                      <FormControlLabel
                        value="P"
                        control={<BpRadio />}
                        label="First Class"
                        sx={{
                          color: 'var(--white)',
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Box mt={2} sx={{ textAlign: 'right' }}>
                  <Button
                    size="small"
                    onClick={() => {
                      handleClassOpen();
                      handleTravelarOpen();
                    }}
                    className="shine-effect"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--white)',
                    }}
                  >
                    DONE
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>
      {/* Passenger Modal */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Collapse in={travelarOpen} timeout="auto" unmountOnExit>
          <Box
            sx={{
              position: 'absolute',
              top: { xs: '105%' },
              right: '0px',
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: 'var(--primary)',
                padding: '15px',
                overflow: 'hidden',
                width: '300px',
                border: '1px solid var(--gray)',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'start',
                '.MuiSvgIcon-root': {
                  // color: 'var(--white)',
                  cursor: 'pointer',
                },
              }}
            >
              <Box width="100%">
                <Box>
                  <Typography
                    sx={{
                      color: 'var(--white)',
                      fontWeight: '500',
                      mb: 2,
                    }}
                  >
                    Passenger
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <RemoveCircleIcon
                        onClick={handleDecrementAdult}
                        sx={{
                          color:
                            adultCount > 1 ? 'var(--white)' : 'var(--disable)',
                        }}
                      />
                      <Typography sx={{ color: 'var(--white)', width: '10px' }}>
                        {adultCount}
                      </Typography>
                      <AddCircleIcon
                        onClick={handleIncrementAdult}
                        sx={{
                          color:
                            adultCount + childCount + infantCount === 9
                              ? 'var(--disable)'
                              : 'var(--white)',
                        }}
                      />
                    </Stack>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'start',

                        flexDirection: 'column',
                        color: 'var(--white)',
                      }}
                    >
                      <Typography
                        sx={{ color: 'var(--white)', fontSize: '13px' }}
                      >
                        Adult (12+ Years)
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <RemoveCircleIcon
                        onClick={handleDecrementChild}
                        sx={{
                          color:
                            childCount > 0 ? 'var(--white)' : 'var(--disable)',
                        }}
                      />
                      <Typography sx={{ color: 'var(--white)', width: '10px' }}>
                        {childCount}
                      </Typography>

                      <AddCircleIcon
                        onClick={handleIncrementChild}
                        sx={{
                          color:
                            adultCount + childCount + infantCount === 9
                              ? 'var(--disable)'
                              : 'var(--white)',
                        }}
                      />
                    </Stack>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'start',
                        flexDirection: 'column',
                        color: 'var(--white)',
                      }}
                    >
                      <Typography
                        sx={{ color: 'var(--white)', fontSize: '13px' }}
                      >
                        Children (2 - 11 years)
                      </Typography>
                    </Box>
                  </Stack>
                  {childCount > 0 && (
                    <Box>
                      <Typography
                        sx={{ color: 'var(--orengel)', fontSize: 12 }}
                      >
                        Select Age of Children
                      </Typography>
                      <Typography
                        sx={{ mt: -0.6, color: 'var(--orengel)', fontSize: 12 }}
                      >
                        Must be accurate when booking
                      </Typography>

                      <Grid container spacing={1} pb={1}>
                        {Array.from({ length: childCount }, (_, index) => (
                          <Grid item key={index}>
                            <Box sx={{ fontSize: 10, color: 'var(--white)' }}>
                              Child {index + 1}
                            </Box>
                            <select
                              key={index}
                              value={childAge[index] || 11}
                              onChange={(e) => handleChange(e, index)}
                              style={{
                                fontSize: 14,
                                outline: 'none',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            >
                              {ageList.map((item) => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <RemoveCircleIcon
                        onClick={handleDecrementInfant}
                        sx={{
                          color:
                            infantCount > 0 ? 'var(--white)' : 'var(--disable)',
                        }}
                      />
                      <Typography sx={{ color: 'var(--white)', width: '10px' }}>
                        {infantCount}
                      </Typography>
                      <AddCircleIcon
                        onClick={handleIncrementInfant}
                        sx={{
                          color:
                            adultCount + childCount + infantCount === 9
                              ? 'var(--disable)'
                              : 'var(--white)',
                        }}
                      />
                    </Stack>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'start',
                        flexDirection: 'column',
                        color: 'var(--white)',
                      }}
                    >
                      <Typography
                        sx={{ fontSize: '13px', color: 'var(--white)' }}
                      >
                        Infant (Under 2 years)
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                <Box mt={2} sx={{ textAlign: 'right' }}>
                  <Button
                    size="small"
                    onClick={handleTravelarOpen}
                    className="shine-effect"
                    sx={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--white)',
                      textAlign: 'right',
                    }}
                  >
                    DONE
                  </Button>
                </Box>{' '}
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>
      <Drawer
        anchor="bottom"
        open={travelarOpen || classOpen}
        sx={{
          '.MuiPaper-root': {
            height: '100% !important',
          },
          display: { xs: 'block', sm: 'none' },
        }}
        SlideProps={{
          timeout: { enter: 500, exit: 300 },
        }}
      >
        <ClearIcon
          sx={{
            color: 'var(--white)',
            bgcolor: 'var(--disable)',
            borderRadius: '50%',
            fontSize: 20,
            p: 0.5,
            position: 'absolute',
            top: 10,
            right: 25,
          }}
          onClick={travelarOpen ? handleTravelarOpen : handleClassOpen}
        />
        <Typography
          sx={{
            textAlign: 'center',
            color: 'var(--secondary)',
            fontWeight: 500,
            py: 1,
            mb: { xs: 2, sm: 0 },
            bgcolor: 'var(--bgcolor)',
          }}
        >
          Select Passenger and Class
        </Typography>

        <Box
          sx={{
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px ',
            borderRadius: '8px',
            overflow: 'hidden',
            width: '95%',
            zIndex: 1,
            marginX: 'auto',
            bgcolor: 'var(--primary)',
          }}
        >
          <Grid container p={2}>
            <Grid item xs={12} order={travelarOpen ? 2 : 1}>
              <Typography
                sx={{
                  color: 'var(--white)',
                  fontWeight: '500',
                  mt: 2,
                  mb: 1,
                }}
              >
                Select Class
              </Typography>
              <Box
                sx={{
                  span: {
                    fontSize: 13,
                  },
                }}
              >
                <FormControl>
                  <RadioGroup
                    value={classNames}
                    row
                    onChange={handleFlightClassName}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <FormControlLabel
                      value="Y"
                      control={<BpRadio />}
                      label="Economy"
                      sx={{
                        color: 'var(--white)',
                        display: 'block',
                      }}
                    />
                    <FormControlLabel
                      value="S"
                      control={<BpRadio />}
                      label="Premium Economy"
                      sx={{
                        color: 'var(--white)',
                      }}
                    />
                    <FormControlLabel
                      value="C"
                      control={<BpRadio />}
                      label="Business"
                      sx={{
                        mr: 2.5,
                        color: 'var(--white)',
                      }}
                    />

                    <FormControlLabel
                      value="P"
                      control={<BpRadio />}
                      label="First Class"
                      sx={{
                        color: 'var(--white)',
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={12} width="100%" order={travelarOpen ? 1 : 2}>
              <Box mb={1}>
                <Typography
                  sx={{
                    color: 'var(--white)',
                    fontWeight: '500',
                    py: 2,
                  }}
                >
                  Select Passenger
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <RemoveCircleIcon
                      onClick={handleDecrementAdult}
                      sx={{
                        color:
                          adultCount > 1 ? 'var(--white)' : 'var(--disable)',
                      }}
                    />
                    <Typography sx={{ color: 'var(--white)', width: '10px' }}>
                      {adultCount}
                    </Typography>
                    <AddCircleIcon
                      onClick={handleIncrementAdult}
                      sx={{
                        color:
                          adultCount + childCount + infantCount === 9
                            ? 'var(--disable)'
                            : 'var(--white)',
                      }}
                    />
                  </Stack>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'start',

                      flexDirection: 'column',
                      color: 'var(--white)',
                    }}
                  >
                    <Typography
                      sx={{ color: 'var(--white)', fontSize: '13px' }}
                    >
                      Adult (12+ Years)
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <RemoveCircleIcon
                      onClick={handleDecrementChild}
                      sx={{
                        color:
                          childCount > 0 ? 'var(--white)' : 'var(--disable)',
                      }}
                    />
                    <Typography sx={{ color: 'var(--white)', width: '10px' }}>
                      {childCount}
                    </Typography>
                    <AddCircleIcon
                      onClick={handleIncrementChild}
                      sx={{
                        color:
                          adultCount + childCount + infantCount === 9
                            ? 'var(--disable)'
                            : 'var(--white)',
                      }}
                    />
                  </Stack>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'start',
                      flexDirection: 'column',
                      color: 'var(--white)',
                    }}
                  >
                    <Typography
                      sx={{ color: 'var(--white)', fontSize: '13px' }}
                    >
                      Children (2 - 11 years)
                    </Typography>
                  </Box>
                </Stack>
                {childCount > 0 && (
                  <Box>
                    <Typography sx={{ color: 'var(--orengel)', fontSize: 12 }}>
                      Select Age of Children
                    </Typography>

                    <Grid container spacing={1} pb={1}>
                      {Array.from({ length: childCount }, (_, index) => (
                        <Grid item key={index}>
                          <Box sx={{ fontSize: 10, color: 'var(--white)' }}>
                            Child {index + 1}
                          </Box>
                          <select
                            key={index}
                            value={childAge[index] || 11}
                            onChange={(e) => handleChange(e, index)}
                            style={{
                              fontSize: 14,
                              outline: 'none',
                              border: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            {ageList.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                <Stack direction="row" spacing={1} alignItems="center">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <RemoveCircleIcon
                      onClick={handleDecrementInfant}
                      sx={{
                        color:
                          infantCount > 0 ? 'var(--white)' : 'var(--disable)',
                      }}
                    />
                    <Typography sx={{ color: 'var(--white)', width: '10px' }}>
                      {infantCount}
                    </Typography>
                    <AddCircleIcon
                      onClick={handleIncrementInfant}
                      sx={{
                        color:
                          adultCount + childCount + infantCount === 9
                            ? 'var(--disable)'
                            : 'var(--white)',
                      }}
                    />
                  </Stack>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'start',
                      flexDirection: 'column',
                      color: 'var(--white)',
                    }}
                  >
                    <Typography
                      sx={{ fontSize: '13px', color: 'var(--white)' }}
                    >
                      Infant (Under 2 years)
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Box m={2} sx={{ textAlign: 'right' }}>
            <Button
              size="small"
              onClick={travelarOpen ? handleTravelarOpen : handleClassOpen}
              className="shine-effect"
              sx={{
                backgroundColor: 'var(--primary)',
                color: 'var(--white)',
                textAlign: 'right',
              }}
            >
              DONE
            </Button>
          </Box>{' '}
        </Box>
      </Drawer>
    </Box>
  );
};

export default TravellarSelection;
