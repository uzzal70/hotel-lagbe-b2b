/* eslint-disable react/prop-types */
import { Box, Grow, Stack, Tab } from '@mui/material';
import OneAndRoundway from './OneAndRoundway/OneAndRoundway';
import Multicity from './Multicity/Multicity';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ImageImport from '../../../assets/ImageImport';
import { useCallback, useState } from 'react';
// import CheckBox from '../../Common/CheckBox';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { toggleModal } from '../../../redux/slices/modalOpen';

const FlightSearchBox = ({
  value,
  setValue,
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
  changeState,
  setChangeState,

  // --------
}) => {
  const navigate = useNavigate();
  const [open, setopen] = useState({
    departOpen: false,
    arrivalOpen: false,
    depDateOpen: false,
    arrDateOpen: false,
    travelarOpen: false,
    classOpen: false,
  });

  const handleChange = useCallback(
    (event, newValue) => {
      setValue(newValue);
      setopen({
        departOpen: false,
        arrivalOpen: false,
        depDateOpen: false,
        arrDateOpen: false,
        travelarOpen: false,
        classOpen: false,
      });
    },
    [setValue, setopen]
  );

  const dispatch = useDispatch();
  const modifyModal = useSelector((state) => state.modalValue.modifyModal);
  const handleToggle = () => {
    dispatch(toggleModal({ modalName: 'modifyModal' }));
  };

  const handleClose = useCallback(() => {
    setopen({
      departOpen: false,
      arrivalOpen: false,
      depDateOpen: false,
      arrDateOpen: false,
      travelarOpen: false,
      classOpen: false,
    });
  }, [setopen]);

  const { adultCount, childCount, infantCount, classNames, childAge } =
    useSelector((state) => state.passengerCount);

  const { selectDepDate } = useSelector((state) => state.datePicker);
  // const selectDepDate = new Date();

  const handleSearch = useCallback(() => {
    handleClose();
    if (modifyModal) {
      handleToggle();
    }
    const commonState = {
      value,
      departDate,
      arrDate,
      departureData,
      arrivalData,
      searchData,
      changeState,
      adultCount,
      childCount,
      childAge,
      infantCount,
      classNames,
    };
    // Stringify the commonState before storing it in localStorage
    sessionStorage.setItem('commonState', JSON.stringify(commonState));
    sessionStorage.setItem('depDate', JSON.stringify(departDate));
    // sessionStorage.removeItem('dateChange');
    const oneandround = [
      {
        locationFrom: departureData.departure || 'DAC',
        locationTo: arrivalData.arrival || 'CXB',
        depDate: moment(selectDepDate).format('YYYY-MM-DD'),
      },
      ...(value === 'roundway'
        ? [
            {
              locationFrom: arrivalData.arrival || 'CXB',
              locationTo: departureData.departure || 'DAC',
              depDate:
                moment(arrDate).format('YYYY-MM-DD') ||
                moment(new Date()).format('YYYY-MM-DD'),
            },
          ]
        : []),
    ];
    const multicity = searchData.segments;
    const urlparams = {
      segments: value === 'multicity' ? multicity : oneandround,
      tripType: value,
      adultCount: adultCount,
      childCount: childCount,
      childAge: childAge,
      infantCount: infantCount,
      connection: '2',
      cabinCode: classNames || 'Y',
    };

    const encodedQuery = encodeURIComponent(JSON.stringify(urlparams));

    if (value === 'oneway' || value === 'roundway' || value === 'multicity') {
      navigate(`/dashboard/search?query=${encodedQuery}`);
      // window.location.reload();
    } else {
      throw new Error('Something went wrong!');
    }
  }, [
    value,
    departDate,
    arrDate,
    departureData,
    arrivalData,
    searchData,
    adultCount,
    childCount,
    childAge,
    infantCount,
    classNames,
    changeState,
    navigate,
    selectDepDate,
  ]);

  // const handleNext = useCallback(() => {
  //   handleSearch();
  // }, [selectDepDate]);

  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'var(--white)',
          margin: 'auto',
          borderRadius: '8px',
          p: { xs: 1, sm: 2, md: 3, lg: 4 },
          py: { xs: 4, sm: 3 },
          minHeight: '190px',
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              width: '100%',
              height: { md: 'fit-content', sm: '100%', xs: '100%' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', sm: 'start' },
              opacity: '1',
              '.MuiTabs-root': {
                minHeight: 'fit-content',
              },
              '& button': {
                opacity: '1',
                borderRadius: '5px',
                background: 'transparent',
                color: 'var(--secondary)',
                width: 'fit-content',
                minHeight: 'fit-content',
                textTransform: 'capitalize',
                fontSize: { xs: 13, sm: 12 },
                fontWeight: 400,
                p: 1,
              },
              '& button.Mui-selected,& button.Mui-selected >svg': {
                background: 'var(--primary-btn)',
                color: 'var(--white)',
                borderRadius: '5px',
              },
              '& img': {
                height: 10,
                marginY: 'auto',
              },
            }}
          >
            <TabList
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{
                style: { display: 'none' },
              }}
              sx={{
                border: '1px solid var(--bgcolor)',
                borderRadius: '8px',
              }}
            >
              <Tab
                label={
                  <Stack direction="row">
                    {value === 'oneway' ? (
                      <img src={ImageImport.oneway} alt="" />
                    ) : (
                      <img src={ImageImport.onewayD} alt="" />
                    )}
                    &nbsp;&nbsp;One&nbsp;way
                  </Stack>
                }
                value="oneway"
              />
              <Tab
                label={
                  <Stack direction="row">
                    <img src={ImageImport.roundway} alt="" />
                    &nbsp;&nbsp;Round&nbsp;way
                  </Stack>
                }
                value="roundway"
              />
              <Tab
                label={
                  <Stack direction="row">
                    <img src={ImageImport.multicity} alt="" />
                    &nbsp;&nbsp;Multi&nbsp;way
                  </Stack>
                }
                value="multicity"
              />
            </TabList>
          </Box>
          <TabPanel value="oneway" style={{ padding: '12px 0px 0px' }}>
            <Grow
              in={value === 'oneway' ? true : false}
              {...(value && window.innerWidth < 700
                ? { timeout: 1000 }
                : { timeout: 0 })}
            >
              <Box>
                <OneAndRoundway
                  value={value}
                  setValue={setValue}
                  open={open}
                  setopen={setopen}
                  searchData={searchData}
                  setSearchData={setSearchData}
                  departDate={departDate}
                  setDepartDate={setDepartDate}
                  arrDate={arrDate}
                  setArrDate={setArrDate}
                  departureData={departureData}
                  setDepartureData={setDepartureData}
                  arrivalData={arrivalData}
                  setArrivalData={setArrivalData}
                  handleSearch={handleSearch}
                  changeState={changeState}
                  setChangeState={setChangeState}
                  handleClose={handleClose}
                />
              </Box>
            </Grow>
          </TabPanel>

          <TabPanel value="roundway" style={{ padding: '12px 0px 0px' }}>
            <Grow
              in={value === 'roundway' ? true : false}
              {...(value && window.innerWidth < 700
                ? { timeout: 1000 }
                : { timeout: 0 })}
            >
              <Box>
                <OneAndRoundway
                  value={value}
                  setValue={setValue}
                  open={open}
                  setopen={setopen}
                  searchData={searchData}
                  setSearchData={setSearchData}
                  departDate={departDate}
                  setDepartDate={setDepartDate}
                  arrDate={arrDate}
                  setArrDate={setArrDate}
                  departureData={departureData}
                  setDepartureData={setDepartureData}
                  arrivalData={arrivalData}
                  setArrivalData={setArrivalData}
                  handleSearch={handleSearch}
                  changeState={changeState}
                  setChangeState={setChangeState}
                  handleClose={handleClose}
                />
              </Box>
            </Grow>
          </TabPanel>

          <TabPanel value="multicity" style={{ padding: '12px 0px 0px' }}>
            <Grow
              in={value === 'multicity' ? true : false}
              {...(value && window.innerWidth < 700
                ? { timeout: 1000 }
                : { timeout: 0 })}
            >
              <Box>
                <Multicity
                  value={value}
                  setValue={setValue}
                  open={open}
                  setopen={setopen}
                  searchData={searchData}
                  setSearchData={setSearchData}
                  departDate={departDate}
                  setDepartDate={setDepartDate}
                  arrDate={arrDate}
                  setArrDate={setArrDate}
                  departureData={departureData}
                  setDepartureData={setDepartureData}
                  setArrivalData={setArrivalData}
                  arrivalData={arrivalData}
                  handleSearch={handleSearch}
                  handleClose={handleClose}
                />
              </Box>
            </Grow>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default FlightSearchBox;
