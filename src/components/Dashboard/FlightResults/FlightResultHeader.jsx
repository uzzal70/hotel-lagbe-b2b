/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Box, Button, Stack, SwipeableDrawer } from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import React, { memo, useState } from 'react';
import CountdownFormatted from './Fliter/CountdownFormatted ';
import AirlinesFilter from './Fliter/AirlinesFilter';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setStoreDepDate } from '../../../redux/slices/searchDatepicker';
import moment from 'moment';

const FlightResultHeader = memo(
  ({
    flightData,
    tripType,
    uniqueLayover,
    handleResetData,
    handleRefundable,
    handleProvider,
    selectedProvider,
    handleAirLine,
    handleStops,
    selectedStops,
    handleLayover,
    handleDepartTime,
    selectedDepartTime,
    selectedArrivalTime,
    selectedBackDepartTime,
    selectedBackArrivalTime,
    selectedAirlins,
    selectedRefundable,
    selectedLayover,
    uniqueCarriers,
    segments,
    value,
    childAge,
    handleBaggage,
    uniqueBaggage,
    selectedBag,
  }) => {
    // for mobile device start
    const [state, setState] = useState({
      right: false,
    });
    const toggleDrawer = (anchor, open) => () => {
      setState({ ...state, [anchor]: open });
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectDepDate } = useSelector((state) => state.datePicker);
    // const selectDepDate = new Date();
    const { adultCount, childCount, infantCount, classNames } = useSelector(
      (state) => state.passengerCount
    );
    const handleNextDay = (text) => {
      let tomorrow = new Date(selectDepDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      let yesterday = new Date(selectDepDate);
      yesterday.setDate(yesterday.getDate() - 1);
      const selectDay = text === 'next' ? tomorrow : yesterday;
      dispatch(setStoreDepDate(selectDay));
      sessionStorage.setItem('depDate', JSON.stringify(selectDay));
      const oneandround = [
        {
          ...segments[0], // Copy the first segment object
          depDate: moment(selectDay).format('YYYY-MM-DD'), // Update the depDate
        },
        ...segments.slice(1), // Copy the remaining segments as they are
      ];

      const urlparams = {
        segments: oneandround,
        tripType: value,
        adultCount: adultCount,
        childCount: childCount,
        childAge: childAge || [],
        infantCount: infantCount,
        connection: '2',
        cabinCode: classNames || 'Y',
      };
      const encodedQuery = encodeURIComponent(JSON.stringify(urlparams));
      navigate(`/dashboard/search?query=${encodedQuery}`);
    };

    return (
      <Box>
        <Box
          sx={{
            mt: 1.5,
            display: { xs: 'block', md: 'none' },
            bgcolor: 'var(--white)',
            borderRadius: '5px',
            py: 1,
            px: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <CountdownFormatted
              padding="3px 1px"
              fontSize="16px"
              fontWeight="500"
              width="135px"
            />
            <Box>
              {(tripType === 'oneway' || tripType === 'roundway') && (
                <Box my={1}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: 'var(--secondary)',
                      fontSize: 12,
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={0.5}
                      sx={{
                        borderRight: '1px solid var(--disable)',
                        width: '50%',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleNextDay('prev')}
                    >
                      <ArrowBackIosRoundedIcon
                        sx={{ color: 'var(--disable)', fontSize: 14 }}
                      />
                      <span>Prev&nbsp;Day&nbsp;&nbsp;</span>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      onClick={() => {
                        handleNextDay('next');
                      }}
                      sx={{ cursor: 'pointer' }}
                    >
                      <span>&nbsp;&nbsp;Next&nbsp;Day</span>
                      <ArrowForwardIosRoundedIcon
                        sx={{ color: 'var(--disable)', fontSize: 14 }}
                      />
                    </Stack>
                  </Stack>
                </Box>
              )}
            </Box>
            <Box>
              {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                  <Button
                    size="small"
                    onClick={toggleDrawer(anchor, true)}
                    style={{
                      backgroundColor: 'var(--bgcolor)',
                      color: 'var(--primary)',
                    }}
                  >
                    Filter
                  </Button>

                  <SwipeableDrawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    onOpen={toggleDrawer(anchor, true)}
                    sx={{
                      '.MuiPaper-root': {
                        width: '60%',
                        p: 2,
                      },
                    }}
                  >
                    <Box sx={{ width: '100%' }}>
                      <AirlinesFilter
                        toggleDrawer={toggleDrawer}
                        flightData={flightData}
                        tripType={tripType}
                        selectedProvider={selectedProvider}
                        handleProvider={handleProvider}
                        handleRefundable={handleRefundable}
                        handleAirLine={handleAirLine}
                        selectedAirlins={selectedAirlins}
                        handleStops={handleStops}
                        selectedStops={selectedStops}
                        handleBaggage={handleBaggage}
                        uniqueBaggage={uniqueBaggage}
                        selectedBag={selectedBag}
                        selectedRefundable={selectedRefundable}
                        selectedLayover={selectedLayover}
                        handleDepartTime={handleDepartTime}
                        selectedDepartTime={selectedDepartTime}
                        selectedArrivalTime={selectedArrivalTime}
                        selectedBackDepartTime={selectedBackDepartTime}
                        selectedBackArrivalTime={selectedBackArrivalTime}
                        handleLayover={handleLayover}
                        uniqueLayover={uniqueLayover}
                        handleResetData={handleResetData}
                        uniqueCarriers={uniqueCarriers}
                      />
                    </Box>
                  </SwipeableDrawer>
                </React.Fragment>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
);

export default FlightResultHeader;
