/* eslint-disable react/prop-types */
import { Box, Collapse, Drawer, Stack, Typography } from '@mui/material';
import ImageImport from '../../../../assets/ImageImport';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { initialSearchData } from './../../../Common/initialSearchData';
import { ConvertCSVtoJson } from '../../../Utils/ConvertCSVtoJson';

const MultiLocationSearch = ({
  segment,
  index,
  departureData,
  setDepartureData,
  arrivalData,
  setArrivalData,
  searchData,
  setSearchData,
  handleOpen,
}) => {
  const airportData = ConvertCSVtoJson();
  const { dInitialData, departAddress, departure, departureCity } =
    departureData;
  const { aInitialData } = arrivalData;

  // console.log(dInitialData);

  const handleOnChange = (e) => {
    const searchName = e.target.name.toLowerCase();
    const searchValue = e.target.value.toLowerCase();

    if (searchValue.length > 2) {
      // const suggestion = airportData.filter((item) =>
      //   item.code.toLowerCase().includes(searchValue)
      // );
      const suggestion = airportData.filter((item) => {
        const codeMatches =
          item.code && item.code.toLowerCase().includes(searchValue);
        return codeMatches;
      });

      if (searchName === 'arrival') {
        setArrivalData({
          aInitialData: suggestion,
          arrivalAddress: "Cox's Bazar Airport",
          arrival: 'CXB',
          arrivalCity: "Cox's Bazar,Bangladesh",
        });
      } else {
        setDepartureData({
          dInitialData: suggestion,
          departAddress: 'Hazrat Shahjalal Intl Airport',
          departure: 'DAC',
          departureCity: 'Dhaka,Bangladesh',
        });
      }
      if (suggestion.length === 0) {
        // const suggestion = airportData.filter(
        //   (item) =>
        //     item.code.toLowerCase().includes(searchValue) ||
        //     item.address.toLowerCase().includes(searchValue)
        // );
        const suggestion = airportData.filter((item) => {
          const codeMatches =
            item.code && item.code.toLowerCase().includes(searchValue);
          const addressMatches =
            item.address && item.address.toLowerCase().includes(searchValue);
          const nameMatches =
            item.name && item.name.toLowerCase().includes(searchValue);
          return codeMatches || addressMatches || nameMatches;
        });

        if (searchName === 'arrival') {
          setArrivalData({
            aInitialData: suggestion,
            arrivalAddress: "Cox's Bazar Airport",
            arrival: 'CXB',
            arrivalCity: "Cox's Bazar,Bangladesh",
          });
        } else {
          setDepartureData({
            dInitialData: suggestion,
            departAddress: 'Hazrat Shahjalal Intl Airport',
            departure: 'DAC',
            departureCity: 'Dhaka,Bangladesh',
          });
        }
      }
    } else {
      if (searchName === 'arrival') {
        setArrivalData({
          aInitialData: initialSearchData,
          arrivalAddress: "Cox's Bazar Airport",
          arrival: 'CXB',
          arrivalCity: "Cox's Bazar,Bangladesh",
        });
      } else {
        setDepartureData({
          dInitialData: initialSearchData,
          departAddress: 'Hazrat Shahjalal Intl Airport',
          departure: 'DAC',
          departureCity: 'Dhaka,Bangladesh',
        });
      }
    }
  };

  const departGetSuggetion = (index) => {
    const departSuggestedText = (code, name, address) => {
      const tempSearchData = [...searchData.segments];
      tempSearchData[index] = {
        ...tempSearchData[index],
        locationFrom: code,
        departaddress: name,
        departcity: address,
        openDepart: false,
        openArrival: false,
      };
      setSearchData({ ...searchData, segments: tempSearchData });
    };
    return (
      <Box
        style={{
          height: 'fit-content',
          position: 'relative',
          width: '100%',
          zIndex: '100',
        }}
      >
        <Box
          sx={{
            maxHeight: { xs: 'auto', sm: '230px' },
            p: { xs: 1, sm: 0 },
            minHeight: '40px',
            overflowY: 'auto',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            '&::-webkit-scrollbar': { width: '5px' },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'var(--primary)',
              borderRadius: '5px',
            },
          }}
        >
          {dInitialData.length !== 0 ? (
            dInitialData.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    paddingLeft: '10px',
                    backgroundColor: 'var(--white)',
                    transition: 'all .1s ease-in-out',
                    color: 'var(--secondary)',
                    '&:hover': {
                      backgroundColor: 'var(--primary)',
                      color: 'var(--white)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      margin: '0px 0px',
                      padding: '5px 0px',
                      cursor: 'pointer',
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                    onClick={() => {
                      departSuggestedText(
                        `${item.code}`,
                        `${item.name}`,
                        `${item.address}`
                      );
                    }} //suggest to display name select with multiple data pass parameter
                  >
                    <Box>
                      <Box
                        className="address"
                        sx={{
                          fontSize: '12px',
                          display: 'block',
                          textAlign: 'left',
                          fontWeight: 500,
                        }}
                      >
                        {item.address.toUpperCase()}
                      </Box>
                      <Box
                        style={{
                          fontSize: '11px',
                          display: 'block',
                          textAlign: 'left',
                          fontWeight: 400,
                        }}
                      >
                        {item.name}
                      </Box>
                    </Box>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        style={{
                          fontSize: '13px',
                          display: 'block',
                          textAlign: 'left',
                          paddingRight: '5px',
                          fontWeight: 600,
                        }}
                      >
                        {item.code}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Box textAlign="center">
              <Typography
                sx={{
                  color: 'var(--white)',
                  py: 1,
                  bgcolor: 'var(--secondary)',
                }}
              >
                Not found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  const arrivalGetSuggetion = (index) => {
    const arrivalSuggestedText = (code, name, address) => {
      const tempSearchData = [...searchData.segments];
      tempSearchData[index] = {
        ...tempSearchData[index],
        locationTo: code,
        arrivaladdress: name,
        arrivalcity: address,
        openDepart: false,
        openArrival: false,
      };
      setSearchData({ ...searchData, segments: tempSearchData });
    };

    return (
      <Box
        style={{
          height: 'fit-content',
          position: 'relative',
          width: '100%',
          zIndex: '100',
        }}
      >
        <Box
          sx={{
            maxHeight: { xs: 'auto', sm: '230px' },
            p: { xs: 1, sm: 0 },
            minHeight: '40px',
            overflowY: 'auto',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            '&::-webkit-scrollbar': { width: '5px' },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'var(--primary)',
              borderRadius: '5px',
            },
          }}
        >
          {aInitialData.length !== 0 ? (
            aInitialData.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    paddingLeft: '10px',
                    backgroundColor: 'var(--white)',
                    transition: 'all .1s ease-in-out',
                    color: 'var(--secondary)',
                    '&:hover': {
                      backgroundColor: 'var(--primary)',
                      color: 'var(--white)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      margin: '0px 0px',
                      padding: '5px 0px',
                      cursor: 'pointer',
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                    onClick={() => {
                      arrivalSuggestedText(
                        `${item.code}`,
                        `${item.name}`,
                        `${item.address}`
                      );
                    }} //suggest to display name select with multiple data pass parameter
                  >
                    <Box>
                      <Box
                        className="address"
                        sx={{
                          fontSize: '12px',
                          display: 'block',
                          textAlign: 'left',
                          fontWeight: 500,
                        }}
                      >
                        {item.address.toUpperCase()}
                      </Box>
                      <Box
                        sx={{
                          fontSize: '11px',
                          display: 'block',
                          textAlign: 'left',
                          fontWeight: 400,
                        }}
                      >
                        {item.name}
                      </Box>
                    </Box>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        style={{
                          fontSize: '13px',
                          display: 'block',
                          textAlign: 'left',
                          paddingRight: '5px',
                          fontWeight: 600,
                        }}
                      >
                        {item.code}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Box textAlign="center">
              <Typography
                sx={{
                  color: 'var(--white)',
                  py: 1,
                  bgcolor: 'var(--secondary)',
                }}
              >
                Not found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box>
        <Stack direction="column">
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              borderBottom: '1px solid var(--light-stroke)',
              alignItems: 'center',
              px: 2,
              py: 1.2,
            }}
            onClick={() => handleOpen(index, !segment.openDepart, false, false)}
          >
            <img src={ImageImport.depart} />{' '}
            <Typography
              sx={{
                fontSize: { xs: 15, sm: 13, md: 14 },
                color: 'var(--black)',
                textTransform: 'capitalize',
              }}
              noWrap
            >
              {segment?.locationFrom
                ? `${segment?.departaddress || null} (${
                    segment?.locationFrom || null
                  })`
                : 'Search a departure airport'}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              alignItems: 'center',
              px: 2,
              py: 1.2,
            }}
            onClick={() =>
              handleOpen(index, false, !segment.openArrival, false)
            }
          >
            <img src={ImageImport.arrival} />{' '}
            <Typography
              sx={{
                fontSize: { xs: 15, sm: 13, md: 14 },
                color: segment.locationTo ? 'var(--black)' : 'var(--secondary)',
                textTransform: 'capitalize',
              }}
              noWrap
            >
              {segment?.locationFrom === segment.locationTo ? (
                <Box textAlign="center">
                  <Typography
                    sx={{
                      color: 'red',
                      fontSize: 12,
                    }}
                    noWrap
                  >
                    From & To airports can&apos;t be same
                  </Typography>
                </Box>
              ) : (
                `${
                  segment.locationTo
                    ? `${segment.arrivaladdress || null} (${
                        segment.locationTo || null
                      })`
                    : 'Search a arrival airport'
                }`
              )}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* from select only xs and sm device   */}

      <Drawer
        anchor="bottom"
        open={segment.openDepart}
        sx={{
          '.MuiPaper-root': {
            height: '100% !important',
          },
          display: { xs: 'block', sm: 'none' },
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
          onClick={() => handleOpen(index, !segment.openDepart, false, false)}
        />
        <Typography
          sx={{
            textAlign: 'center',
            color: 'var(--secondary)',
            fontWeight: 500,
            py: 2,
          }}
        >
          Select Departure Airport
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'var(--secondary)',
            zIndex: 10,
            px: 2,
            border: '1px solid var(--stroke)',
          }}
        >
          <SearchIcon sx={{ color: 'var(--primary)' }} />

          <input
            autoComplete="off"
            autoFocus
            name="departure"
            onChange={handleOnChange}
            placeholder="Enter a airport name or code..."
            style={{
              color: 'var(--black)',
              fontWeight: 500,
              paddingLeft: '10px',
              width: '100%',
              height: '40px',
              backgroundColor: 'var(--white)',
              border: 'none',
              outline: 'none',
            }}
          />
        </Box>
        <Box sx={{ width: '100%', bgcolor: 'var(--white)' }}>
          {departGetSuggetion(index)}
        </Box>
      </Drawer>

      <Drawer
        anchor="bottom"
        open={segment.openArrival}
        sx={{
          '.MuiPaper-root': {
            height: '100% !important',
          },

          display: { xs: 'block', sm: 'none' },
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
          onClick={() => handleOpen(index, !segment.openArrival, false, false)}
        />
        <Typography
          sx={{
            textAlign: 'center',
            color: 'var(--secondary)',
            fontWeight: 500,
            py: 2,
          }}
        >
          Select Arrival Airport
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'var(--secondary)',
            zIndex: 10,
            px: 2,
            border: '1px solid var(--stroke)',
          }}
        >
          <SearchIcon sx={{ color: 'var(--primary)' }} />
          <input
            autoComplete="off"
            autoFocus
            name="arrival"
            onChange={handleOnChange}
            placeholder="Enter a airport name or code..."
            style={{
              color: 'var(--black)',
              fontWeight: 500,
              paddingLeft: '10px',
              width: '100%',
              height: '40px',
              backgroundColor: 'var(--white)',
              border: 'none',
              outline: 'none',
            }}
          />
        </Box>
        <Box sx={{ width: '100%', bgcolor: 'var(--white)' }}>
          {arrivalGetSuggetion(index)}
        </Box>
      </Drawer>

      {/* Departure onChange function */}
      <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Collapse in={segment.openDepart} timeout="auto" unmountOnExit>
          <Box
            sx={{
              position: 'absolute',
              top: '4%',
              left: '0',
              right: '0',
              width: '100%',
              backgroundColor: 'transparent',
              height: 'fit-content',
              zIndex: 3,
            }}
          >
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'var(--secondary)',
                zIndex: 10,
              }}
            >
              <input
                autoComplete="off"
                autoFocus
                name="departure"
                onChange={handleOnChange}
                placeholder="Enter a airport name or code..."
                style={{
                  color: 'var(--black)',
                  fontWeight: 500,
                  paddingLeft: '10px',
                  width: '100%',
                  height: '40px',
                  backgroundColor: 'var(--white)',
                  border: 'none',
                  outline: 'none',
                  marginLeft: '15%',
                }}
              />
            </Box>
            <Box sx={{ width: '100%', bgcolor: 'var(--white)' }}>
              {departGetSuggetion(index)}
            </Box>
          </Box>
        </Collapse>
      </Box>

      {/* Arrival onChange function */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Collapse in={segment.openArrival} timeout="auto" unmountOnExit>
          <Box
            sx={{
              position: 'absolute',
              top: '55%',
              left: '0',
              right: '0',
              width: '100%',
              backgroundColor: 'transparent',
              height: 'fit-content',
              zIndex: 1,
            }}
          >
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'var(--secondary)',
                zIndex: 10,
              }}
            >
              <input
                autoComplete="off"
                autoFocus
                name="arrival"
                onChange={handleOnChange}
                placeholder="Enter a airport name or code..."
                style={{
                  color: 'var(--black)',
                  fontWeight: 500,
                  paddingLeft: '10px',
                  width: '100%',
                  height: '40px',
                  backgroundColor: 'var(--white)',
                  border: 'none',
                  outline: 'none',
                  marginLeft: '15%',
                }}
              />
            </Box>
            <Box sx={{ width: '100%', bgcolor: 'var(--white)' }}>
              {arrivalGetSuggetion(index)}
            </Box>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default MultiLocationSearch;
