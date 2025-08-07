/* eslint-disable react/prop-types */
import { Box, Grid, Stack } from '@mui/material';
import convertMinuteToHAndM from '../../Common/convertMinuteToHAndM';
import commaNumber from 'comma-number';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useDispatch, useSelector } from 'react-redux';
import { setStoreDepDate } from '../../../redux/slices/searchDatepicker';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import companyInfo from '../../../common/companyInfo';
const FilterPrice = ({
  handleChange,
  cheapest,
  handleResetData,
  handleCalculate,
  data,
  segments,
  filterData,
  value,
  childAge,
}) => {
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
      infantCount: infantCount,
      childAge: childAge || [],
      connection: '2',
      cabinCode: classNames || 'Y',
    };
    const encodedQuery = encodeURIComponent(JSON.stringify(urlparams));
    navigate(`/dashboard/search?query=${encodedQuery}`);
  };

  const buttonData = [
    { label: 'Cheapest', value: 'Cheapest' },
    { label: 'Fastest', value: 'Fastest' },
  ];

  const durations = filterData?.map((item) => ({
    duration: item?.durationInMinutes,
    price: item?.totalClientPrice,
  }));

  const minDuration = Math.min(...durations.map((item) => item.duration));
  const minDurationObject = durations.find(
    (item) => item.duration === minDuration
  );
  const minDurationPrice = minDurationObject?.price || 0;
  const chepGrossPrice = data?.[0]?.totalClientPrice;
  const chepTime = data?.[0]?.durationInMinutes;

  return (
    <Box
      sx={{
        borderRadius: 1,
      }}
    >
      <Grid container columnSpacing={0.5}>
        {buttonData.map((button, i) => (
          <Grid item key={i} xs={6} md={4.5}>
            <Box
              onClick={() => {
                handleChange(button.value);
                {
                  button.value === 'Cheapest'
                    ? handleResetData()
                    : handleCalculate();
                }
              }}
              sx={{
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontWeight: 400,
                fontSize: { xs: 12, md: 13 },
                borderRadius: '5px',
                py: 0.5,
                px: 0.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: 'var(--white)',
                color:
                  cheapest === button.value ? 'var(--white)' : 'var(--black)',
                '&:hover': {
                  bgcolor:
                    cheapest === button.value
                      ? 'var(--white)'
                      : 'var(--bgcolor)',
                },
              }}
            >
              {i === 0 ? (
                <Box
                  sx={{
                    px: 1,
                    py: 0.5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    bgcolor:
                      cheapest === button.value
                        ? 'var(--bgcolor)'
                        : 'var(--white)',
                    borderRadius: '4px',
                  }}
                >
                  <Box
                    sx={{
                      color: 'var(--primary)',
                      fontWeight: 400,
                      pl: { xs: 1.5, md: 0 },
                    }}
                  >
                    <Box>{button.label}</Box>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={{ xs: 1, md: 2 }}
                    >
                      <Box>
                        {commaNumber(chepGrossPrice)} {companyInfo.currencyType}
                      </Box>
                      <Box
                        sx={{
                          height: '5px',
                          width: '5px',
                          borderRadius: '50%',
                          bgcolor: 'var(--primary)',
                        }}
                      ></Box>
                      <Box sx={{ color: 'var(--disable)' }}>
                        {convertMinuteToHAndM(chepTime)}
                      </Box>
                    </Stack>
                  </Box>
                  <SyncAltIcon
                    sx={{
                      fontSize: { xs: 12, md: 13 },
                      p: 0,
                      color: 'var(--primary)',
                      transform: 'rotate(90deg)',
                      textAlign: 'end',
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    px: 1,
                    py: 0.5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    bgcolor:
                      cheapest === button.value
                        ? 'var(--bgcolor)'
                        : 'var(--white)',
                    borderRadius: '4px',
                  }}
                >
                  <Box
                    sx={{
                      color: 'var(--primary)',
                      fontWeight: 400,
                      pl: { xs: 1.5, md: 0 },
                    }}
                  >
                    <Box>{button.label}</Box>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={{ xs: 1, md: 2 }}
                    >
                      <Box>{commaNumber(minDurationPrice)} {companyInfo.currencyType}</Box>
                      <Box
                        sx={{
                          height: '5px',
                          width: '5px',
                          borderRadius: '50%',
                          bgcolor: 'var(--primary)',
                        }}
                      ></Box>
                      <Box sx={{ color: 'var(--disable)' }}>
                        {minDuration === 'infinity'
                          ? ''
                          : convertMinuteToHAndM(minDuration)}
                      </Box>
                    </Stack>
                  </Box>
                  <SyncAltIcon
                    sx={{
                      fontSize: { xs: 12, md: 13 },
                      p: 0,
                      color: 'var(--primary)',
                      transform: 'rotate(90deg)',
                      textAlign: 'end',
                    }}
                  />
                </Box>
              )}
            </Box>
          </Grid>
        ))}

        <Grid
          item
          md={3}
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box
            sx={{
              bgcolor: 'var(--white)',
              height: '100%',
              display: 'flex',
              borderRadius: '5px',
              px: 1,
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'var(--black)',
                fontSize: { xs: 12, md: 14 },
                width: '100%',
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  borderRight: '1px solid var(--disable)',
                  width: '50%',
                  cursor: 'pointer',
                }}
                onClick={() => handleNextDay('prev')}
              >
                <ArrowBackIosRoundedIcon
                  sx={{ color: 'var(--disable)', fontSize: 16 }}
                />
                <span>Prev Day</span>
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
                <span>Next Day</span>
                <ArrowForwardIosRoundedIcon
                  sx={{ color: 'var(--disable)', fontSize: 16 }}
                />
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterPrice;
