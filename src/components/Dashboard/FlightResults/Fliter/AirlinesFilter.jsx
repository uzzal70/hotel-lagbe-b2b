/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Grid, Stack, Typography } from '@mui/material';
import { memo, useState } from 'react';
import ButtonFilters from './ButtonFilters';
import CustomButton from '../../../Common/CustomButton';
import './AirlinesFilter.css';
import ButtonTimeFilter from './ButtonTimeFilter';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustomSwitch from '../../../Common/CustomSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOption } from '../../../../redux/slices/toggleSlice';
import TokenToName from '../../../Common/TokenToName';
import { validEmails } from '../../../Utils/validEmails';
const stops = [
  { label: 'Direct', value: 1 },
  { label: '1 Stop', value: 2 },
  { label: '1+ Stop', value: 3 },
];
const type = [
  { label: 'Departure', value: 1 },
  { label: 'Arrival', value: 2 },
];

const refundable = [
  { name: 'Non Refundable', value: 'false' },
  { name: 'Refundable', value: 'true' },
];
const providers = [
  { name: 'Sabre', value: 'Sabre' },
  { name: 'Sabre_v', value: 'SABRE_V' },
  { name: 'Galileo', value: 'Galileo' },
  { name: 'TL', value: 'TL' },
  { name: 'SOTO_A', value: 'SOTO_A' },
  { name: 'TRIPFINDY', value: 'TRIPFINDY' },
  { name: 'INDIGO', value: 'INDIGO' },
  { name: 'Verteil', value: 'NDC_V' },
  { name: 'Verteil_TF', value: 'NDC_TF' },
  { name: 'SG_IATA', value: 'SG_IATA' },
];
const departureTime = [
  {
    value: '1',
    label: '12 AM - 06 AM',
    startDate: '00:00:00',
    endDate: '06:00:00',
  },
  {
    value: '2',
    label: '06 AM - 12 PM',
    startDate: '06:00:00',
    endDate: '12:00:00',
  },
  {
    value: '3',
    label: '12 PM - 06 PM',
    startDate: '12:00:00',
    endDate: '18:00:00',
  },
  {
    value: '4',
    label: '06 PM - 12 AM',
    startDate: '18:00:00',
    endDate: '24:00:00',
  },
];

// eslint-disable-next-line react/display-name
const AirlinesFilter = memo(
  ({
    toggleDrawer,
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
    handleBaggage,
    uniqueBaggage,
    selectedBag,
  }) => {
    const tokenise = TokenToName();
    const temail = tokenise?.email;
    const emailIsValid = validEmails.includes(temail);
    const segmentArray = flightData[0]?.segments;
    const firstSegmentData = segmentArray[0][0];
    const lastSegmentData = segmentArray[0][segmentArray[0]?.length - 1];

    const [dateState, setDateState] = useState(1);

    const handleChange = (value) => {
      setDateState(value);
    };

    const dispatch = useDispatch();
    const { value } = useSelector((state) => state.toggleValue);
    const handleToggle = () => {
      dispatch(toggleOption());
    };

    const [showAll, setShowAll] = useState({
      carriers: false,
      layovers: false,
    });

    const toggleShowMore = (section) => {
      setShowAll((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    };

    const visibleCarriers = showAll.carriers
      ? uniqueCarriers
      : uniqueCarriers.slice(0, 15);

    const visibleLayovers = showAll.layovers
      ? uniqueLayover
      : uniqueLayover.slice(0, 10);

    return (
      <Box>
        {toggleDrawer && (
          <ArrowForwardIcon
            sx={{ color: 'var(--icon-color)', fontSize: 20, mt: -1 }}
            onClick={toggleDrawer('right', false)}
          />
        )}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            my: 0.5,
            py: 1,
            bgcolor: 'var(--bgcolor)',
            borderRadius: '5px',
          }}
        >
          <Box sx={{ color: 'var(--secondary)', fontSize: { xs: 12, md: 14 } }}>
            {value ? 'Hide Agent Fare ' : 'Show Agent Fare'}
          </Box>
          <Box>
            <CustomSwitch checked={value} onChange={handleToggle} />
          </Box>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            borderBottom: '1px solid var(--stroke)',
            pb: 1,
          }}
        >
          <Typography
            sx={{
              color: 'var(--black)',
              fontSize: { xs: 14, sm: 16 },
              fontWeight: 500,
            }}
          >
            Sort & Filter
          </Typography>

          <CustomButton
            value="Reset"
            textcolor="var(--primary)"
            bgcolor="transparent"
            hovercolor="transparent"
            padding="0px"
            handleClick={handleResetData}
          />
        </Stack>
        {emailIsValid && (
          <>
            <Typography
              sx={{
                color: 'var(--black)',
                fontSize: { xs: 13 },
                fontWeight: 500,
                py: 1,
              }}
            >
              Providers
            </Typography>
            <Box>
              {providers.map((provider, i) => (
                <div className="custom-checkbox-air" key={i}>
                  <input
                    type="checkbox"
                    id={provider.value}
                    name={provider.value}
                    checked={selectedProvider.includes(provider.value)}
                    onChange={() => handleProvider(provider.value, 'system')}
                  />
                  <label htmlFor={provider.value}>{provider.name}</label>
                </div>
              ))}
            </Box>
          </>
        )}

        <Typography
          sx={{
            color: 'var(--black)',
            fontSize: { xs: 13 },
            fontWeight: 500,
            py: 1,
            mt: 1,
          }}
        >
          Stops
        </Typography>

        <ButtonFilters
          data={stops}
          buttonState={selectedStops}
          handleChange={handleStops}
          bgcolor="var(--bgcolor)"
          px={{ xs: 1, md: 1, lg: 1.5 }}
        />

        <Typography
          sx={{
            color: 'var(--black)',
            fontSize: { xs: 13 },
            fontWeight: 500,
            py: 1,
            mt: 1,
          }}
        >
          Baggage Filter
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            position: 'relative',
            bgcolor: 'var(--white)',
            borderRadius: '6px',
          }}
        >
          {uniqueBaggage.map((provider, i) => (
            <div
              key={i}
              className="custom-checkbox-air"
              style={{
                position: 'relative',
                width: '60px',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: selectedBag.includes(provider.name)
                  ? 'var(--primary)'
                  : 'var(--bgcolor)',
                borderRadius: '5px',
                color: selectedBag.includes(provider.name)
                  ? 'var(--white)'
                  : 'var(--primary)',
                padding: '2px 0',
                marginBottom: 0,
              }}
            >
              <input
                type="checkbox"
                id={provider.name}
                checked={selectedBag.includes(provider.name)}
                onChange={() => handleBaggage(provider.name?.toString())}
                style={{ position: 'absolute', zIndex: '-1' }}
              />
              <label htmlFor={provider.name}>
                &nbsp;&nbsp;{provider.name}{' '}
                {provider.code === 'P'
                  ? 'piece'
                  : provider.code === 'K'
                  ? 'Kg'
                  : provider.code}
              </label>
            </div>
          ))}
        </Box>

        <Typography
          sx={{
            color: 'var(--black)',
            fontSize: { xs: 13, md: 14, lg: 12 },
            fontWeight: 500,
            py: 1,
            mt: 1,
          }}
        >
          Preferred Airlines
        </Typography>

        <Box>
          {visibleCarriers.map((provider, i) => (
            <div className="custom-checkbox-air" key={i}>
              <input
                type="checkbox"
                id={provider.code}
                checked={selectedAirlins.includes(provider.code)}
                onChange={() => handleAirLine(provider.code)}
              />
              <label htmlFor={provider.code} className="center-img-text">
                <img
                  src={`https://tripfindy-logos.s3.ap-southeast-1.amazonaws.com/airlines/${provider.code}.png`}
                  alt=""
                  style={{ width: '20px', borderRadius: '20%' }}
                />
                &nbsp;&nbsp;{provider.name}
              </label>
            </div>
          ))}
          <Box textAlign={'right'}>
            {uniqueCarriers.length > 15 && (
              <button
                onClick={() => toggleShowMore('carriers')}
                style={{
                  cursor: 'pointer',
                  color: 'var(--primary)',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                {showAll.carriers ? 'See Less' : 'See More'}
              </button>
            )}
          </Box>
        </Box>

        <Typography
          sx={{
            color: 'var(--black)',
            fontSize: { xs: 13 },
            fontWeight: 500,
            py: 1,
            mt: 1,
          }}
        >
          Refundable / Non Refundable
        </Typography>

        <Box>
          {refundable.map((provider, i) => (
            <div className="custom-checkbox-air" key={i}>
              <input
                type="checkbox"
                id={provider.name}
                checked={selectedRefundable.includes(provider.value)}
                onChange={() => handleRefundable(provider.value)}
              />
              <label htmlFor={provider.name}>{provider.name}</label>
            </div>
          ))}
        </Box>
        {/* <Typography
          sx={{
            color: 'var(--black)',
            fontSize: { xs: 13 },
            fontWeight: 500,
            py: 1,
            mt: 1,
          }}
        >
          Baggase
        </Typography>

        <Box>
          {baggage.map((provider, i) => (
            <div className="custom-checkbox-air" key={i}>
              <input
                type="checkbox"
                id={provider.name}
                onChange={() => handleCheckboxChange(provider.name)}
              />
              {window.innerWidth < 900 ? (
                <label
                  htmlFor={provider.name}
                  onClick={() => handleCheckboxChange(provider.name)}
                >
                  {provider.name}
                </label>
              ) : (
                <label htmlFor={provider.name}>{provider.name}</label>
              )}
            </div>
          ))}
        </Box> */}
        <Box pt={1}>
          <ButtonFilters
            data={type}
            buttonState={dateState}
            handleChange={handleChange}
            bgcolor="var(--bgcolor)"
            px={3}
          />
        </Box>

        {dateState === 1 ? (
          <Box
            sx={{
              button: {
                textTransform: 'capitalize',
                fontWeight: 400,
                fontSize: 12,
                px: 1,
                borderRadius: '5px',
                py: 0.5,
              },
            }}
          >
            {/*for oneway */}
            <Typography
              sx={{
                color: 'var(--black)',
                fontSize: { xs: 13 },
                fontWeight: 500,
                py: 1,
              }}
              noWrap
            >
              Departure Time {firstSegmentData.departureLocation?.split(',')[0]}
            </Typography>

            <Grid container spacing={{ xs: 0.5 }}>
              {departureTime.map((button, i) => (
                <ButtonTimeFilter
                  key={i}
                  button={button}
                  selected={selectedDepartTime.name}
                  type="Depart"
                  handleTimeFilter={handleDepartTime}
                />
              ))}
            </Grid>
            {/*for roundway */}
            {tripType === 'roundway' && (
              <>
                <Typography
                  sx={{
                    color: 'var(--black)',
                    fontSize: { xs: 13 },
                    fontWeight: 500,
                    py: 1,
                  }}
                  noWrap
                >
                  Departure Time{' '}
                  {lastSegmentData.arrivalLocation?.split(',')[0]}
                </Typography>
                <Grid container spacing={{ xs: 0.5 }}>
                  {departureTime.map((button, i) => (
                    <ButtonTimeFilter
                      key={i}
                      button={button}
                      selected={selectedBackDepartTime.name}
                      type="returnDepart"
                      handleTimeFilter={handleDepartTime}
                    />
                  ))}
                </Grid>
              </>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              button: {
                textTransform: 'capitalize',
                fontWeight: 400,
                fontSize: 12,
                px: 1,
                borderRadius: '5px',
                py: 0.5,
              },
            }}
          >
            {/* for oneway  */}
            <Typography
              sx={{
                color: 'var(--black)',
                fontSize: { xs: 13 },
                fontWeight: 500,
                py: 1,
              }}
              noWrap
            >
              Arrival Time {lastSegmentData.arrivalLocation?.split(',')[0]}
            </Typography>

            <Grid container spacing={{ xs: 0.5 }}>
              {departureTime.map((button, i) => (
                <ButtonTimeFilter
                  key={i}
                  button={button}
                  selected={selectedArrivalTime.name}
                  type="Arrival"
                  handleTimeFilter={handleDepartTime}
                />
              ))}
            </Grid>

            {/*for roundway */}
            {tripType === 'roundway' && (
              <>
                <Typography
                  sx={{
                    color: 'var(--black)',
                    fontSize: { xs: 13 },
                    fontWeight: 500,
                    py: 1,
                  }}
                  noWrap
                >
                  Arrival Time{' '}
                  {firstSegmentData.departureLocation?.split(',')[0]}
                </Typography>
                <Grid container spacing={{ xs: 0.5 }}>
                  {departureTime.map((button, i) => (
                    <ButtonTimeFilter
                      key={i}
                      button={button}
                      selected={selectedBackArrivalTime.name}
                      type="returnArrival"
                      handleTimeFilter={handleDepartTime}
                    />
                  ))}
                </Grid>
              </>
            )}
          </Box>
        )}
        {uniqueLayover?.length > 0 ? (
          <Box mb={2}>
            <Typography
              sx={{
                color: 'var(--black)',
                fontSize: { xs: 13 },
                fontWeight: 500,
                py: 1,
                mt: 1,
              }}
            >
              Layover
            </Typography>

            <Box>
              {visibleLayovers.map((provider, i) => (
                <div className="custom-checkbox-air" key={i}>
                  <input
                    type="checkbox"
                    id={provider.code}
                    checked={selectedLayover.includes(provider.code)}
                    onChange={() => handleLayover(provider.code)}
                  />
                  <label htmlFor={provider.code}>{provider.name}</label>
                </div>
              ))}
              <Box textAlign={'right'}>
                {uniqueLayover.length > 10 && (
                  <button
                    onClick={() => toggleShowMore('layovers')}
                    style={{
                      cursor: 'pointer',
                      color: 'var(--primary)',
                      border: 'none',
                      borderRadius: '5px',
                    }}
                  >
                    {showAll.layovers ? 'See Less' : 'See More'}
                  </button>
                )}
              </Box>
            </Box>
          </Box>
        ) : (
          ''
        )}
      </Box>
    );
  }
);

export default AirlinesFilter;
