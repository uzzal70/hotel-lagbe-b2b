/* eslint-disable react/prop-types */
import { Box, Collapse, Drawer, Stack, Typography } from '@mui/material';
import ImageImport from '../../../../assets/ImageImport';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { initialSearchData } from '../../../Common/initialSearchData';
import { ConvertCSVtoJson } from '../../../Utils/ConvertCSVtoJson';

function capitalizeTitleCase(inputString) {
  return inputString
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const LocationSearch = ({
  // -----Departure search data-----
  departOpen,
  handleDepartOpen,
  departureData,
  setDepartureData,

  // -----arrival search data-----
  arrivalOpen,
  handleArrivalOpen,
  arrivalData,
  setArrivalData,

  // -----Departure Date Open function -----
  handleDepartDateOpen,
  handleClose,
}) => {
  const airportData = ConvertCSVtoJson();
  const { dInitialData, departAddress, departure, departureCity } =
    departureData;
  const { aInitialData, arrivalAddress, arrival, arrivalCity } = arrivalData;
  const [toggle, setToggle] = useState();

  const departOnChange = (e) => {
    const searchValue = e.target.value.toLowerCase(); // Convert to lowercase once
    if (searchValue.length > 2) {
      const suggestion = airportData.filter((item) => {
        const codeMatches =
          item.code && item.code.toLowerCase().includes(searchValue);
        return codeMatches;
      });

      setDepartureData({
        dInitialData: suggestion,
        departAddress: departAddress,
        departure: departure,
        departureCity: departureCity,
      });

      // If no suggestions found, look for item.name
      if (suggestion.length === 0) {
        const suggestion = airportData.filter((item) => {
          const codeMatches =
            item.code && item.code.toLowerCase().includes(searchValue);
          const addressMatches =
            item.address && item.address.toLowerCase().includes(searchValue);
          const nameMatches =
            item.name && item.name.toLowerCase().includes(searchValue);
          return codeMatches || addressMatches || nameMatches;
        });

        setDepartureData({
          dInitialData: suggestion,
          departAddress: departAddress,
          departure: departure,
          departureCity: departureCity,
        });
      }
    } else {
      setDepartureData({
        dInitialData: initialSearchData,
        departAddress: departAddress,
        departure: departure,
        departureCity: departureCity,
      });
    }
  };

  const arrivalOnChange = (e) => {
    const searchValue = e.target.value.toLowerCase(); // Convert to lowercase once
    if (searchValue.length > 2) {
      const suggestion = airportData.filter((item) => {
        const codeMatches =
          item.code && item.code.toLowerCase().includes(searchValue);
        return codeMatches;
      });

      setArrivalData({
        aInitialData: suggestion,
        arrivalAddress: arrivalAddress,
        arrival: arrival,
        arrivalCity: arrivalCity,
      });

      if (suggestion.length === 0) {
        const suggestion = airportData.filter((item) => {
          const codeMatches =
            item.code && item.code.toLowerCase().includes(searchValue);
          const addressMatches =
            item.address && item.address.toLowerCase().includes(searchValue);
          const nameMatches =
            item.name && item.name.toLowerCase().includes(searchValue);
          return codeMatches || addressMatches || nameMatches;
        });

        setArrivalData({
          aInitialData: suggestion,
          arrivalAddress: arrivalAddress,
          arrival: arrival,
          arrivalCity: arrivalCity,
        });
      }
    } else {
      setArrivalData({
        aInitialData: initialSearchData,
        arrivalAddress: arrivalAddress,
        arrival: arrival,
        arrivalCity: arrivalCity,
      });
    }
  };

  const departSuggestedText = (code, name, address) => {
    setDepartureData({
      // ...dInitialData,
      departAddress: name,
      departure: code,
      departureCity: address,
      dInitialData: [
        {
          code: code,
          name: name,
          address: address,
        },
      ],
    });
    if (window.innerWidth > 500) {
      handleArrivalOpen();
    } else {
      handleDepartOpen();
    }
  };

  const arrivalSuggestedText = (code, name, address) => {
    setArrivalData({
      ...aInitialData,
      arrivalAddress: name,
      arrival: code,
      arrivalCity: address,
      aInitialData: [
        {
          code: code,
          name: name,
          address: address,
        },
      ],
    });
    if (window.innerWidth > 500) {
      handleArrivalOpen();
      departure === code || (arrival !== undefined && departure === undefined)
        ? null
        : handleDepartDateOpen();
    } else {
      handleArrivalOpen();
    }
  };

  const departGetSuggetion = () => {
    return (
      <Box
        style={{
          height: 'fit-content',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'end',
          width: '100%',
        }}
      >
        <Box
          sx={{
            maxHeight: { xs: 'auto', sm: '230px' },
            p: { xs: 1, sm: 0 },
            minHeight: '40px',
            overflowY: 'auto',
            boxShadow: {
              xs: 'auto',
              sm: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            },
            '&::-webkit-scrollbar': { width: '5px' },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'var(--primary)',
              borderRadius: '5px',
            },
            width: { xs: '100%', md: '85%' },
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
                      setDepartureData({
                        dInitialData: initialSearchData,
                        departAddress: item.name,
                        departure: item.code,
                        departureCity: item.address,
                      });
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
                          textTransform: 'capitalize',
                        }}
                      >
                        {item.address}
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

  const arrivalGetSuggetion = () => {
    return (
      <Box
        style={{
          height: 'fit-content',
          position: 'relative',
          width: '100%',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <Box
          sx={{
            maxHeight: { xs: 'auto', sm: '230px' },
            p: { xs: 1, sm: 0 },
            minHeight: '40px',
            overflowY: 'auto',
            boxShadow: {
              xs: 'auto',
              sm: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            },
            '&::-webkit-scrollbar': { width: '5px' },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'var(--primary)',
              borderRadius: '5px',
            },
            width: { xs: '100%', md: '85%' },
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
                      setArrivalData({
                        aInitialData: initialSearchData,
                        arrivalAddress: item.name,
                        arrival: item.code,
                        arrivalCity: item.address,
                      });
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

  const handleToggleButton = () => {
    setToggle(!toggle);
    setDepartureData({
      ...departureData,
      departAddress: arrivalAddress,
      departure: arrival,
      departureCity: arrivalCity,
    });
    setArrivalData({
      ...arrivalData,
      arrivalAddress: departAddress,
      arrival: departure,
      arrivalCity: departureCity,
    });
  };
  return (
    <Box sx={{ position: 'relative' }}>
      <Box>
        <Stack
          direction="column"
          sx={{
            position: 'relative',
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              borderBottom: '1px solid var(--flight-stroke)',
              alignItems: 'center',
              width: '90%',
              px: 2,
              py: 1.2,
            }}
            onClick={() => handleDepartOpen()}
          >
            <img src={ImageImport.depart} />{' '}
            <Typography
              sx={{
                fontSize: { xs: 14, sm: 13, md: 14 },
                color: 'var(--black)',
                textTransform: 'capitalize',
              }}
              noWrap
            >
              {departAddress
                ? `${capitalizeTitleCase(departAddress) || null} (${
                    departure || null
                  })`
                : 'Hazrat Shahjalal Intl Airport (DAC)'}
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
            onClick={() => handleArrivalOpen()}
          >
            <img src={ImageImport.arrival} />{' '}
            <>
              {departure === arrival ||
              (arrival !== undefined && departure === undefined) ? (
                <Typography
                  sx={{
                    color: 'red',
                    fontSize: 12,
                    textAlign: 'center',
                  }}
                  noWrap
                >
                  From & To airports can&apos;t be the same
                </Typography>
              ) : arrivalAddress ? (
                <Typography
                  sx={{
                    fontSize: { xs: 14, sm: 13, md: 14 },
                    color: 'var(--black)',
                  }}
                  noWrap
                >
                  {capitalizeTitleCase(arrivalAddress)} ({arrival || ''})
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontSize: { xs: 14, sm: 13, md: 14 },
                    color: 'var(--black)',
                  }}
                  noWrap
                >
                  Cox&apos;s Bazar Airport (CXB)
                </Typography>
              )}
            </>
          </Stack>
          <Box
            sx={{
              position: 'absolute',
              right: 14,
              top: '50%',
              zIndex: '2',
              cursor: 'pointer',
            }}
            onClick={() => handleToggleButton()}
          >
            <img
              src={ImageImport.toggle}
              style={{
                width: 30,
                transition: 'transform 0.2s ease-in-out',
                transform: `translateY(-50%) rotate(${toggle ? 180 : 0}deg)`,
              }}
            />
          </Box>
        </Stack>
      </Box>

      {/* from select only xs and sm device  Departur */}

      <Drawer
        anchor="bottom"
        open={departOpen}
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
            top: 10,
            right: 25,
          }}
          onClick={handleClose}
        />
        <Typography
          sx={{
            textAlign: 'center',
            color: 'var(--secondary)',
            fontWeight: 500,
            py: 1,
            bgcolor: 'var(--bgcolor)',
          }}
        >
          Select Departure Airport
        </Typography>
        <Stack
          direction="row"
          sx={{
            border: '1px solid var(--stroke)',
            alignItems: 'center',
            px: 2,
          }}
        >
          <SearchIcon sx={{ color: 'var(--primary)' }} />
          <input
            autoComplete="off"
            autoFocus
            onChange={departOnChange}
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
              borderRadius: '4px',
            }}
          />
        </Stack>
        <Box
          sx={{ width: '100%', overflow: 'hidden', bgcolor: 'var(--white)' }}
        >
          {departGetSuggetion()}
        </Box>
      </Drawer>
      {/* only md device  */}
      <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Collapse in={departOpen} timeout="auto" unmountOnExit>
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
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'var(--secondary)',
                zIndex: 10,
                paddingLeft: { xs: '13%', md: '15%' },
              }}
            >
              <input
                autoComplete="off"
                autoFocus
                onChange={departOnChange}
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
            <Box sx={{ width: '100%' }}>{departGetSuggetion()}</Box>
          </Box>
        </Collapse>
      </Box>

      {/* only xs and sm device Arival */}
      <Box>
        <Drawer
          anchor="bottom"
          open={arrivalOpen}
          sx={{
            '.MuiPaper-root': {
              height: '100% !important',
              width: '100%',
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
              top: 10,
              right: 25,
            }}
            onClick={handleClose}
          />
          <Typography
            sx={{
              textAlign: 'center',
              color: 'var(--secondary)',
              fontWeight: 500,
              py: 1,
              bgcolor: 'var(--bgcolor)',
            }}
          >
            Select Arrival Airport
          </Typography>

          <Stack
            direction="row"
            sx={{
              border: '1px solid var(--stroke)',
              alignItems: 'center',
              px: 2,
            }}
          >
            <SearchIcon sx={{ color: 'var(--primary)' }} />
            <input
              autoComplete="off"
              autoFocus
              onChange={arrivalOnChange}
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
                borderRadius: '4px',
              }}
            />
          </Stack>

          <Box sx={{ width: '100%', bgcolor: 'var(--white)' }}>
            {arrivalGetSuggetion()}
          </Box>
        </Drawer>
      </Box>
      {/* only md to device  */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Collapse in={arrivalOpen} timeout={'auto'} unmountOnExit>
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
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'var(--secondary)',
                zIndex: 10,
                paddingLeft: { xs: '13%', md: '15%' },
              }}
            >
              <input
                autoComplete="off"
                autoFocus
                onChange={arrivalOnChange}
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
            <Box sx={{ width: '100%' }}>{arrivalGetSuggetion()}</Box>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default LocationSearch;
