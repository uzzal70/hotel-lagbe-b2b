/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  ClickAwayListener,
  Grid,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import ImageImport from '../../../../assets/ImageImport';
import TravellarSelection from '../PassengerCount/TravellarSelection';
import LocationSearch from './LocationSearch';
import DatePicker from '../../../Common/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import {
  setStoreArrDate,
  setStoreDepDate,
} from '../../../../redux/slices/searchDatepicker';

const OneAndRoundway = ({
  value,
  setValue,
  open,
  setopen,
  departDate,
  setDepartDate,
  arrDate,
  setArrDate,
  searchData,
  setSearchData,
  // -----from to search data-----
  departureData,
  setDepartureData,
  setArrivalData,
  arrivalData,
  handleSearch,
  changeState,
  setChangeState,
  handleClose,
}) => {
  const {
    departOpen,
    arrivalOpen,
    depDateOpen,
    arrDateOpen,
    travelarOpen,
    classOpen,
  } = open;

  const { selectDepDate } = useSelector((state) => state.datePicker);
  // const selectDepDate = new Date();
  const dispatch = useDispatch();

  // const handleClickselectDepDate = (date) => {
  //   dispatch(setStoreDepDate(date));
  // };
  // const handleClickselectArrDate = (date) => {
  //   dispatch(setStoreArrDate(date));
  // };

  const handleDepartOpen = () => {
    setopen({
      departOpen: !departOpen,
    });
  };

  const handleArrivalOpen = () => {
    setopen({
      arrivalOpen: !arrivalOpen,
    });
  };

  const handleDepartDateOpen = () => {
    setopen({
      depDateOpen: !depDateOpen,
    });
  };

  const handleArrivalDateOpen = () => {
    setopen({
      arrDateOpen: !arrDateOpen,
    });
    setValue('roundway');
  };

  // use Redux date picker

  const handleDepartDate = (date) => {
    dispatch(setStoreDepDate(date));
    setDepartDate(date);
    handleDepartDateOpen();
    // if (date && value === 'roundway') {
    //   setopen({
    //     arrDateOpen: !arrDateOpen,
    //   });
    // } else {
    //   setopen({
    //     classOpen: !classOpen,
    //   });
    // }
  };

  const handleReturnDate = (date) => {
    dispatch(setStoreArrDate(date));
    setArrDate(date);
    handleArrivalDateOpen();
    // if (date) {
    //   setopen({
    //     arrDateOpen: !arrDateOpen,
    //     classOpen: !classOpen,
    //   });
    // }
  };

  const handleClassOpen = () => {
    setopen({
      classOpen: !classOpen,
    });
  };

  const handleTravelarOpen = () => {
    setopen({
      travelarOpen: !travelarOpen,
    });
  };

  const handleChange = () => {
    setValue(value === 'oneway' ? 'roundway' : 'oneway');
  };
  const handleStateChange = () => {
    setChangeState(!changeState);
  };
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box>
        <Grid
          container
          columnSpacing={{ xs: 0, sm: 1, md: 2 }}
          rowSpacing={{ xs: 1.5, sm: 1 }}
          sx={{ alignItems: 'center', justifyContent: 'center' }}
        >
          {/* Search for airport locations for from and to */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box
              sx={{
                border: '1px solid var(--flight-stroke)',
                borderRadius: '8px',
              }}
            >
              <LocationSearch
                handleClose={handleClose}
                departOpen={departOpen}
                handleDepartOpen={handleDepartOpen}
                arrivalOpen={arrivalOpen}
                handleArrivalOpen={handleArrivalOpen}
                departureData={departureData}
                setDepartureData={setDepartureData}
                setArrivalData={setArrivalData}
                arrivalData={arrivalData}
                handleDepartDateOpen={handleDepartDateOpen}
              />
            </Box>
          </Grid>
          {/* Date Section */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
                border: { xs: 'none', sm: '1px solid var(--flight-stroke)' },
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/*For screens ranging from small to large devices*/}
              <Grid container>
                {/* Departure Date Pick */}
                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={6}
                  sx={{
                    border: {
                      xs: '1px solid var(--flight-stroke)',
                      sm: 'none',
                    },
                    borderRight: {
                      sm: '1px solid var(--flight-stroke)',
                    },
                    borderRadius: {
                      xs: '8px',
                      sm: 0,
                    },
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <Box>
                    <DatePicker
                      name="Journey Date"
                      handleDateOpen={handleDepartDateOpen}
                      open={depDateOpen}
                      handleSelectDate={handleDepartDate}
                      date={selectDepDate}
                      minDate={new Date()}
                      handleClose={handleClose}
                    />
                  </Box>
                </Grid>
                {/* Return Date Pick */}
                <Grid
                  item
                  xs={4}
                  sx={{
                    display: { xs: 'block', sm: 'none' },
                  }}
                >
                  {/* Toggle button to select for roundway date pick */}
                  <Box
                    textAlign="center"
                    sx={{
                      '.MuiSwitch-switchBase.Mui-checked': {
                        color: 'var(--primary)',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':
                        {
                          backgroundColor: 'var(--bgcolor)',
                        },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 10,
                        color: 'var(--secondary)',
                        visibility: value === 'roundway' ? 'hidden' : '',
                      }}
                    >
                      Add Return ?
                    </Typography>
                    <Switch
                      checked={value === 'roundway' ? true : false}
                      onChange={handleChange}
                      // color={
                      //   value === 'roundway' ? 'var(--primary)' : 'default'
                      // }
                      sx={{ mt: -1.4 }}
                    />
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{
                    mt: { xs: 1.5, sm: 0 },
                    position: 'relative',
                    cursor: 'pointer',
                    border: {
                      xs: '1px solid var(--flight-stroke)',
                      sm: 'none',
                    },
                    borderRadius: {
                      xs: '8px',
                      sm: 0,
                    },
                    display: {
                      xs: value === 'oneway' ? 'none' : 'block',
                      sm: 'block',
                    },
                  }}
                >
                  {/* <Grow in={value === 'roundway'}> */}
                  <Box>
                    <DatePicker
                      value={value}
                      name="Return Date"
                      handleDateOpen={handleArrivalDateOpen}
                      open={arrDateOpen}
                      handleSelectDate={handleReturnDate}
                      date={
                        new Date(arrDate) > new Date(departDate)
                          ? arrDate
                          : departDate
                      }
                      minDate={departDate ? departDate : new Date()}
                      handleClose={handleClose}
                      setValue={setValue}
                    />
                  </Box>
                  {/* </Grow> */}
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Class and Passenger selection   */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
                border: { sm: '1px solid var(--flight-stroke)' },
                borderRadius: '8px',
              }}
            >
              <TravellarSelection
                searchData={searchData}
                setSearchData={setSearchData}
                travelarOpen={travelarOpen}
                handleTravelarOpen={handleTravelarOpen}
                classOpen={classOpen}
                handleClassOpen={handleClassOpen}
                handleClose={handleClose}
              />
            </Box>
          </Grid>
          {/* Search Button Click */}
          {/* <Grid item xs={12} display={{ xs: 'block', sm: 'none' }}>
          <Box
            sx={{
              ml: 0.5,
            }}
          >
            <CheckBox
              option={option.directFlightOnly}
              handleChangeOptions={handleChangeOptions}
              name="directFlightOnly"
              label="Direct FLights"
              color="var(--fontcolor)"
              mx={0.5}
            />
          </Box>
        </Grid> */}
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Button
              sx={{ width: '100%' }}
              disabled={departureData?.departure === arrivalData?.arrival}
              onClick={async () => {
                try {
                  await handleSearch();
                  handleStateChange();
                } catch (error) {
                  // Handle errors here
                }
              }}
            >
              <Stack
                direction={{ xs: 'row', sm: 'column' }}
                justifyContent={{ xs: 'center', sm: 'space-between' }}
                alignItems={{ xs: 'center', sm: 'unset' }}
                spacing={{ xs: 1, sm: 0 }}
                sx={{
                  px: 1.5,
                  py: { xs: 0.8, sm: 1 },
                  width: '100%',
                  bgcolor: 'var(--primary-btn)',
                  color: 'var(--white)',
                  borderRadius: '5px',
                }}
                // className="custom-btn"
              >
                <Box textAlign="left">Search</Box>
                <Box textAlign="right" sx={{ height: '20px' }}>
                  <img
                    src={ImageImport.flightsearch}
                    style={{ height: '100%' }}
                  />
                </Box>
              </Stack>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ClickAwayListener>
  );
};

export default OneAndRoundway;
