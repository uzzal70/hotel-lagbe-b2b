/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  ClickAwayListener,
  Drawer,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { Calendar } from 'react-date-range';
import ImageImport from '../../../../assets/ImageImport';
import TravellarSelection from '../PassengerCount/TravellarSelection';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { v4 as uuidv4 } from 'uuid';
import MultiLocationSearch from './MultiLocationSearch';
import ClearIcon from '@mui/icons-material/Clear';

const Multicity = ({
  open,
  setopen,
  searchData,
  setSearchData,
  departureData,
  setDepartureData,
  setArrivalData,
  arrivalData,
  handleSearch,
  handleClose,
}) => {
  // const [open, setopen] = useState({
  //   departOpen: false,
  //   arrivalOpen: false,
  //   depDateOpen: false,
  //   arrDateOpen: false,
  //   travelarOpen: false,
  //   classOpen: false,
  // });

  const { departOpen, arrivalOpen, travelarOpen, classOpen } = open;
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

  const addCity = () => {
    const tempSearchData = [...searchData.segments];
    const lastIndex = tempSearchData.length - 1;
    const lastDepDate = tempSearchData[lastIndex].depDate;
    const newDepDate = new Date(lastDepDate);
    newDepDate.setDate(newDepDate.getDate() + 3);

    tempSearchData.push({
      id: uuidv4(), // Generate a unique ID
      openDepart: false,
      locationFrom: tempSearchData[tempSearchData.length - 1].locationTo,
      departaddress: tempSearchData[tempSearchData.length - 1].arrivaladdress,
      openArrival: false,
      locationTo: '',
      arrivaladdress: '',
      depDate: moment(newDepDate).format('YYYY-MM-DD'),
      openDate: false,
      open: false,
    });
    setSearchData({
      ...searchData,
      segments: tempSearchData,
      CityCount: tempSearchData.length,
    });
  };

  const removeCity = (id) => {
    const tempSearchData = searchData.segments.filter((item) => item.id !== id);
    setSearchData({
      ...searchData,
      segments: tempSearchData,
      CityCount: tempSearchData.length,
    });
  };

  const handleClickAway = (index) => {
    const tempSegment = [...searchData.segments];
    tempSegment[index] = {
      ...tempSegment[index],
      openDepart: false,
      openArrival: false,
      openDate: false,
    };
    setSearchData({
      ...searchData,
      segments: tempSegment,
    });
  };

  const handleDepartDate = (date, index) => {
    const tempSearchData = [...searchData.segments];
    tempSearchData[index] = {
      ...tempSearchData[index],
      depDate: moment(date).format('YYYY-MM-DD'),
      openDate: false,
    };
    setSearchData({ ...searchData, segments: tempSearchData });
    // setopen({
    //   classOpen: !classOpen,
    // });
  };

  // airport location and date modal open
  const handleOpen = (index, openDepart, openArrival, openDate) => {
    const tempSegment = [...searchData.segments];
    tempSegment[index] = {
      ...tempSegment[index],
      openDepart: openDepart,
      openArrival: openArrival,
      openDate: openDate,
    };
    setSearchData({
      ...searchData,
      segments: tempSegment,
    });
    setopen({
      ...open,
      travelarOpen: false,
      classOpen: false,
    });
  };

  // class and traveler modal open
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
  const handleFake = () => {};
  return (
    <Box>
      {searchData.segments.map((segment, index, arr) => (
        <ClickAwayListener
          key={index}
          onClickAway={
            segment.openDepart
              ? () => handleClickAway(index)
              : segment.openArrival
              ? () => handleClickAway(index)
              : segment.openDate === false
              ? handleFake
              : () => handleClickAway(index)
          }
        >
          <Grid
            container
            columnSpacing={{ xs: 0, sm: 1, md: 2 }}
            rowSpacing={{ xs: 1.5, sm: 0 }}
            mb={2}
          >
            {/* Search for airport locations for from and to */}
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  border: '1px solid var(--light-stroke)',
                  borderRadius: '8px',
                  // height: '100%',
                }}
              >
                <MultiLocationSearch
                  handleClickAway={handleClickAway}
                  segment={segment}
                  index={index}
                  arr={arr}
                  departOpen={departOpen}
                  handleDepartOpen={handleDepartOpen}
                  arrivalOpen={arrivalOpen}
                  handleArrivalOpen={handleArrivalOpen}
                  departureData={departureData}
                  setDepartureData={setDepartureData}
                  setArrivalData={setArrivalData}
                  arrivalData={arrivalData}
                  searchData={searchData}
                  setSearchData={setSearchData}
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                />
              </Box>
            </Grid>
            {/* Date Section */}
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  border: '1px solid var(--light-stroke)',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Grid container>
                  {/* Departure Date Pick */}
                  <Grid
                    item
                    xs={12}
                    sx={{
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Responsive md device  */}
                    <Box
                      onClick={() =>
                        handleOpen(index, false, false, !segment.openDate)
                      }
                      sx={{
                        px: 2,
                        py: 1.4,
                        display: { xs: 'none', sm: 'block' },
                      }}
                    >
                      <Stack direction="row" spacing={1}>
                        <Box>
                          <img src={ImageImport.calender} />{' '}
                        </Box>
                        <Typography
                          sx={{ color: 'var(--secondary)', fontSize: 12 }}
                        >
                          Journy Date
                        </Typography>
                      </Stack>
                      <Typography
                        sx={{ color: 'var(--primary)', fontSize: '100%' }}
                      >
                        {segment.depDate
                          ? moment(segment.depDate).format('DD MMM, YYYY')
                          : 'Select Date'}
                      </Typography>
                      <Typography
                        sx={{ color: 'var(--secondary)', fontSize: 12 }}
                      >
                        {segment.depDate ? (
                          moment(segment.depDate).format('dddd')
                        ) : (
                          <Box sx={{ visibility: 'hidden' }}>For Design</Box>
                        )}
                      </Typography>
                    </Box>

                    {/* Responsive for sm and xs  */}
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        alignItems: 'center',
                        px: 2,
                        py: 1.2,
                        display: { xs: 'flex', sm: 'none' },
                      }}
                      onClick={() =>
                        handleOpen(index, false, false, !segment.openDate)
                      }
                    >
                      <img src={ImageImport.calenderphone} />{' '}
                      <Typography
                        sx={{
                          color: 'var(--black)',
                          fontSize: 15,
                          cursor: 'pointer',
                        }}
                      >
                        {segment.depDate
                          ? moment(segment.depDate).format('DD MMM, YYYY')
                          : 'Select Date'}
                      </Typography>
                    </Stack>

                    {/* for md device  */}
                    {segment.openDate && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: {
                            xs: '102%',
                          },
                          right: '0px',
                          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px ',
                          zIndex: 3,
                          borderRadius: '8px',
                          overflow: 'hidden',
                        }}
                      >
                        <Calendar
                          color="var(--primary)"
                          date={new Date(segment.depDate)}
                          months={1}
                          minDate={
                            index === 0
                              ? new Date()
                              : new Date(searchData.segments[index - 1].depDate)
                          }
                          onChange={(date) => handleDepartDate(date, index)}
                        />
                      </Box>
                    )}

                    {/* for only xs device  */}
                    <Drawer
                      anchor="bottom"
                      open={segment.openDate}
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
                          top: 20,
                          right: 10,
                        }}
                        onClick={() =>
                          handleOpen(index, false, false, !segment.openDate)
                        }
                      />
                      <Typography
                        sx={{
                          textAlign: 'center',
                          color: 'var(--secondary)',
                          fontWeight: 500,
                          py: 2,
                        }}
                      >
                        Select Journy Date
                      </Typography>

                      <Box
                        sx={{
                          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px ',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          zIndex: 1,
                          width: 'fit-content',
                          marginX: 'auto',
                        }}
                      >
                        <Box>
                          <Calendar
                            color="var(--primary)"
                            date={new Date(segment.depDate)}
                            months={1}
                            minDate={
                              index === 0
                                ? new Date()
                                : new Date(
                                    searchData.segments[index - 1].depDate
                                  )
                            }
                            onChange={(date) => handleDepartDate(date, index)}
                          />
                        </Box>
                      </Box>
                    </Drawer>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Class and Passenger selection   */}
            <Grid item xs={12} sm={6} md={3}>
              {index === 0 && (
                <Box
                  sx={{
                    border: {
                      xs: 'none',
                      sm: '1px solid var(--light-stroke)',
                    },
                    borderRadius: '8px',
                  }}
                >
                  <TravellarSelection
                    index={index}
                    searchData={searchData}
                    setSearchData={setSearchData}
                    travelarOpen={travelarOpen}
                    handleTravelarOpen={handleTravelarOpen}
                    classOpen={classOpen}
                    handleClassOpen={handleClassOpen}
                    handleOpen={handleOpen} // multicity
                  />
                </Box>
              )}
              {index >= 1 && (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    transition: '0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    // border: '1px solid var(--light-stroke)',
                    borderRadius: '8px',
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '8px',
                      width: '100%',
                      button: {
                        textTransform: 'capitalize',
                        fontWeight: 400,
                        fontSize: 13,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <Tooltip title="Add City">
                      <button
                        onClick={addCity}
                        disabled={arr.length > 3 ? true : false}
                        style={{
                          display:
                            arr.length === 4
                              ? 'none'
                              : arr.length - 1 === index
                              ? 'flex'
                              : 'none',
                          color: 'var(--primary)',
                        }}
                      >
                        <AddCircleIcon
                          sx={{
                            color:
                              arr.length > 4
                                ? 'var(--disable)'
                                : 'var(--primary)',
                            fontSize: 20,
                          }}
                          disabled={arr.length > 4 ? true : false}
                        />
                      </button>
                    </Tooltip>
                    <Tooltip title="Remove">
                      <button
                        onClick={() => removeCity(segment.id)}
                        disabled={arr.length === 2 ? true : false}
                        style={{
                          visibility: arr.length > 2 ? 'visible' : 'hidden',
                          color: 'var(--dark-orenge)',
                          display: 'flex',
                        }}
                      >
                        <RemoveCircleIcon
                          sx={{ color: 'var(--dark-orenge)', fontSize: 20 }}
                        />
                      </button>
                    </Tooltip>
                  </Stack>
                </Box>
              )}
            </Grid>
            {/* add remove Button Click */}
            <Grid
              item
              xs={12}
              sm={6}
              md={2}
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {index === arr.length - 1 && (
                <Button
                  sx={{ width: '100%' }}
                  disabled={segment?.locationFrom === segment?.locationTo}
                  onClick={async () => {
                    try {
                      await handleSearch();
                      // handleStateChange();
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
                // <Stack
                //   direction="row"
                //   justifyContent="center"
                //   sx={{ width: '100%' }}
                // >
                //   <Stack
                //     direction={{ xs: 'row', sm: 'column' }}
                //     justifyContent={{ xs: 'center', sm: 'space-between' }}
                //     spacing={{ xs: 1, sm: 0 }}
                //     sx={{
                //       my: 1,
                //       px: 1.5,
                //       py: 0.5,
                //       bgcolor: 'var(--primary)',
                //       borderRadius: '10px',
                //       color: 'var(--white)',
                //       width: { xs: '100%', sm: '100%', md: '100%' },
                //       cursor: 'pointer',
                //     }}
                //     className="custom-btn"
                //     onClick={handleSearch}
                //   >
                //     <Box>Search</Box>
                //     <Box textAlign="right">
                //       <img src={ImageImport.flightsearch} />
                //     </Box>
                //   </Stack>
                // </Stack>
              )}
            </Grid>
          </Grid>
        </ClickAwayListener>
      ))}
      {/* <Stack direction="row" justifyContent="center">
        <Stack
          direction={{ xs: 'row', sm: 'column' }}
          justifyContent={{ xs: 'center', sm: 'space-between' }}
          spacing={{ xs: 1, sm: 0 }}
          sx={{
            my: 1,
            px: 1.5,
            py: 0.5,
            bgcolor: 'var(--primary)',
            borderRadius: '14px',
            color: 'var(--white)',
            width: { xs: '100%', sm: '50%', md: '20%' },
          }}
          className="custom-btn"
          onClick={handleSearch}
        >
          <Box>Search</Box>
          <Box textAlign="right">
            <img src={ImageImport.flightsearch} />
          </Box>
        </Stack>
      </Stack> */}
    </Box>
  );
};

export default Multicity;
