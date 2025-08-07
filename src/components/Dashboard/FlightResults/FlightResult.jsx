import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeaderSlider from './HeaderSlider/HeaderSlider';
import FlightResultHeader from './FlightResultHeader';
import AirlinesFilter from './Fliter/AirlinesFilter';
import CountdownFormatted from './Fliter/CountdownFormatted ';
import { debounce } from 'lodash';
import ModifyHeader from './ModifyHeader';
import FlightSearchLoading from '../../Loading/FlightSearchLoading';
import Token from '../../Common/Token';
import FilterPrice from './FilterPrice';
import totalDuration from '../../Common/totalDuration';
import CustomLinearProgress from '../../Loading/CustomLinearProgress';
import SliderLoading from '../../Loading/SliderLoading';
import FlightResultCard from './FlightResultCard';
import MakeQuotation from './Quotation/MakeQuotation';
import { baseUrl } from '../../../../baseurl';
import companyInfo from '../../../common/companyInfo';

const FlightResult = () => {
  window.onload = function () {
    sessionStorage.removeItem('dateChange');
    sessionStorage.removeItem('depDate');
  };

  const location = useLocation();
  const agentId = Token();
  // const MemoizedFlightSearchResult = memo(FlightSearchResult);
  // const MemoizedCustomPagination = memo(CustomPagination);

  const queryParams = new URLSearchParams(location.search);
  const encodedQuery = queryParams.get('query');
  const decodedQuery = encodedQuery
    ? JSON.parse(decodeURIComponent(encodedQuery))
    : null;

  const {
    segments,
    tripType,
    adultCount,
    childCount,
    childAge,
    infantCount,
    cabinCode,
    connection,
  } = decodedQuery;

  const [pageIndex, setPageIndex] = useState(0);
  const [filterPageIndex, setFilterPageIndex] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState([]);
  const [selectedStops, setSelectedStops] = useState(null);
  const [cheapest, setCheapest] = useState('Cheapest');
  const [selectedBag, setSelectedBag] = useState([]);
  const [selectedAirlins, setSelectedAirlins] = useState([]);
  const [selectedRefundable, setSelectedRefundable] = useState([]);
  const [selectedDepartTime, setSelectedDepartTime] = useState({
    name: '',
    type: '',
    startTime: '',
    endTime: '',
  });
  const [selectedArrivalTime, setSelectedArrivalTime] = useState({
    name: '',
    type: '',
    startTime: '',
    endTime: '',
  });
  const [selectedBackDepartTime, setSelectedBackDepartTime] = useState({
    name: '',
    type: '',
    startTime: '',
    endTime: '',
  });
  const [selectedBackArrivalTime, setSelectedBackArrivalTime] = useState({
    name: '',
    type: '',
    startTime: '',
    endTime: '',
  });

  // todo:next day previous day variables
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const [selectedLayover, setSelectedLayover] = useState([]);
  const [qutationSelected, setQutationSelected] = useState([]);

  const handleResetData = useCallback(() => {
    setPageIndex(0);
    setFilterPageIndex(null);
    setSelectedProvider([]);
    setSelectedAirlins([]);
    setSelectedBag([]);
    setSelectedStops(null);

    setSelectedRefundable([]);
    setSelectedDepartTime({ name: '', type: '', startTime: '', endTime: '' });
    setSelectedArrivalTime({ name: '', type: '', startTime: '', endTime: '' });
    setSelectedBackDepartTime({
      name: '',
      type: '',
      startTime: '',
      endTime: '',
    });
    setSelectedBackArrivalTime({
      name: '',
      type: '',
      startTime: '',
      endTime: '',
    });
    setSelectedLayover([]);
    setFilterData(data);
    setQutationSelected([]);
  }, [data]);

  const handleCheapest = (name) => {
    const isDeselection = name === selectedStops;
    setCheapest(isDeselection ? null : name);
  };

  const body = JSON.stringify({
    segments: segments,
    tripType: tripType,
    adultCount: adultCount,
    childCount: childCount,
    childAge: childAge,
    infantCount: infantCount,
    connection: connection,
    cabinCode: cabinCode || 'Y',
    userId: agentId || '',
    currency: companyInfo?.currencyType || 'BDT',
  });
  // eslint-disable-next-line no-undef
  const onewayurl = `${baseUrl}/core/flight/combined-search-one-way`;
  const onewayurltl = `${baseUrl}/core/flight/tl-search-one-way`;
  const roundwayurl = `${baseUrl}/core/flight/combined-search-round-way`;
  const roundwayurltl = `${baseUrl}/core/flight/tl-search-round-way`;
  const multiwayurl = `${baseUrl}/core/flight/combined-search-multi-city`;
  const multiwayurltl = `${baseUrl}/core/flight/tl-search-multi-city`;

  // soto api

  const onewayurlAdivaha = `${baseUrl}/core/flight/soto-a-search-one-way`;
  const roundwayurlAdivaha = `${baseUrl}/core/flight/soto-a-search-round-way`;
  const multiwayurlAdivaha = `${baseUrl}/core/flight/soto-a-search-round-way`;

  const urlTl =
    tripType === 'oneway'
      ? onewayurl
      : tripType === 'roundway'
      ? roundwayurl
      : multiwayurl;

  // here url changes to
  const urlSG =
    tripType === 'oneway'
      ? onewayurltl
      : tripType === 'roundway'
      ? roundwayurltl
      : multiwayurltl;

  const urlAdivaha =
    tripType === 'oneway'
      ? onewayurlAdivaha
      : tripType === 'roundway'
      ? roundwayurlAdivaha
      : multiwayurlAdivaha;

  // const fetchData = async () => {
  //   try {
  //     setIsLoaded(false);
  //     setError(null);
  //     const onewayurl = `${baseUrl}/core/flight/combined-search-one-way`;
  //     const onewayurltl = `${baseUrl}/core/flight/tl-search-one-way`;
  //     const roundwayurl = `${baseUrl}/core/flight/combined-search-round-way`;
  //     const multiwayurl = `${baseUrl}/core/flight/combined-search-multi-city`;
  //     const url =
  //       tripType === 'oneway'
  //         ? onewayurl
  //         : tripType === 'roundway'
  //         ? roundwayurl
  //         : multiwayurl;

  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: body,
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const responseData = await response.json();
  //     const resData = responseData || [];
  //     const segmentDurations = resData?.map((item) =>
  //       totalDuration(item.segments)
  //     );
  //     const resultData = resData.map((item, index) => ({
  //       ...item,
  //       durationInMinutes: segmentDurations[index].durationInMinutes,
  //     }));
  //     setData(resultData);
  //     setFilterData(resultData);
  //     setIsLoaded(true);
  //   } catch (error) {
  //     console.error('Error fetching data:', error.message);
  //     setError(error.message);
  //     setIsLoaded(true);
  //   }
  // };

  const fetchData = async (url, body) => {
    // try {
    setIsLoaded(false);
    setIsAllLoaded(false);
    setError(null);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (!response.ok) {
      if (response.status === 504) {
        throw new Error(
          '504 Gateway Timeout: Server took too long to respond.'
        );
      } else {
        throw new Error('Network response was not ok');
      }
    }

    const responseData = await response.json();
    const resData = responseData || [];
    const segmentDurations = resData.map((item) =>
      totalDuration(item.segments)
    );

    const resultData = resData.map((item, index) => ({
      ...item,
      durationInMinutes: segmentDurations[index].durationInMinutes,
    }));
    return resultData;
    // } catch (error) {
    //   console.error('Error fetching data:', error.message);
    //   setError(error.message);
    //   setIsLoaded(true);
    //   setIsAllLoaded(true);
    //   return []; // Return null in case of error
    // }
  };

  useEffect(() => {
    const promise1 = fetchData(urlSG, body);
    const promise2 = fetchData(urlTl, body);

    promise1
      .then((value) => {
        setData(value);
        setFilterData(value);
        setIsLoaded(true); // Moved inside promise1.then()
      })
      .catch((error) => {
        setIsLoaded(true);
        console.error('Error fetching data:', error);
      });

    Promise.race([promise2, promise1])
      .then((value) => {
        setData(value);
        setFilterData(value);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    Promise.all([promise1, promise2])
      .then((values) => {
        const flattenedArray = values.flat();
        const shortings = flattenedArray.sort(
          (a, b) => parseInt(a.totalClientPrice) - parseInt(b.totalClientPrice)
        );
        setData(shortings);
        setFilterData(shortings);
        setIsAllLoaded(true);
      })
      .catch((error) => {
        setIsAllLoaded(true);
        setData([]);
        setFilterData([]);
        console.error('Error fetching data:', error);
      });
  }, [body, tripType, baseUrl]);

  useEffect(() => {
    handleResetData();
  }, [data]);

  // uniqueLayover
  const uniqueLayover = Array.from(
    new Set(
      data
        ?.filter((item) => item.segments[0].length > 1)
        .map((item) => ({
          name:
            item.segments[0].length > 2
              ? item.segments[0][2].departureAirportName
              : item.segments[0][1].departureAirportName,
          code:
            item.segments[0].length > 2
              ? item.segments[0][2].departureAirportCode
              : item.segments[0][1].departureAirportCode,
        }))
        .map((entry) => JSON.stringify(entry))
    )
  ).map((str) => JSON.parse(str));

  const uniqueBaggage = Array.from(
    new Set( // unique value return
      data
        ?.flatMap((item) => {
          const baggageRules = item?.priceBreakdown?.[0]?.baggageRule;
          if (
            Array.isArray(baggageRules) &&
            baggageRules.some((rule) => rule !== null)
          ) {
            return baggageRules
              .filter((rule) => {
                const value = rule?.Value
                  ? String(rule?.Value)?.trim()
                  : rule?.Value;
                return (
                  value !== '' &&
                  value !== 0 &&
                  value !== 'null' &&
                  value !== 'undefined'
                );
              })
              .map((rule) => ({
                name: rule?.Value ? String(rule?.Value)?.trim() : rule?.Value, // Normalize value
                code: normalizeUnit(rule.Unit), // Normalize unit
              }));
          } else {
            return []; // Return an empty array if baggageRule is invalid or [null]
          }
        })
        .map((entry) => JSON.stringify(entry)) // Stringify for uniqueness
    )
  ).map((str) => JSON.parse(str));
  function normalizeUnit(unit) {
    const normalizedUnit = String(unit).trim().toLowerCase();
    if (normalizedUnit === 'p' || normalizedUnit === 'piece') {
      return 'P';
    } else if (
      normalizedUnit === 'kg' ||
      normalizedUnit === 'kilogram' ||
      normalizedUnit === 'k'
    ) {
      return 'K';
    }
    return unit ? unit?.charAt(0)?.toUpperCase() : unit;
  }

  function findShortestDuration(filterData) {
    return filterData
      .slice()
      .sort((a, b) => a.durationInMinutes - b.durationInMinutes);
  }

  const handleCalculate = () => {
    const sortedData = findShortestDuration(filterData);
    setFilterData(sortedData);
  };
  // ----------------filter-------------
  const handleSelection = (name, setSelected) => {
    setSelected((prevSelected) => {
      const isSelected = prevSelected.includes(name);
      return isSelected
        ? prevSelected.filter((item) => item !== name)
        : [...prevSelected, name];
    });

    setFilterPageIndex(name); // 2 or 3.. move page after filter setdata
  };
  const handleProvider = (name) => {
    handleSelection(name, setSelectedProvider);
  };
  const handleStops = (name) => {
    const isDeselection = name === selectedStops;
    setSelectedStops(isDeselection ? null : name);
  };
  const handleBaggage = (name) => {
    handleSelection(name, setSelectedBag);
  };
  const handleAirLine = (name) => {
    handleSelection(name, setSelectedAirlins);
  };
  const handleRefundable = (name) => {
    handleSelection(name, setSelectedRefundable);
  };
  // Date Filter
  const handleDepartTime = useCallback(
    (type, name, startTime, endTime) => {
      const startDate = new Date(`1970-01-01T${startTime}`);
      const endDate = new Date(`1970-01-01T${endTime}`);
      switch (type) {
        case 'Depart':
          setSelectedDepartTime(
            name === selectedDepartTime.name
              ? { name: '', type: '', startTime: '', endTime: '' }
              : { name, type: type, startTime: startDate, endTime: endDate }
          );
          break;
        case 'Arrival':
          setSelectedArrivalTime(
            name === selectedArrivalTime.name
              ? { name: '', type: '', startTime: '', endTime: '' }
              : { name, type: type, startTime: startDate, endTime: endDate }
          );
          break;
        // for roundway
        case 'returnDepart':
          setSelectedBackDepartTime(
            name === selectedBackDepartTime.name
              ? { name: '', type: '', startTime: '', endTime: '' }
              : { name, type: type, startTime: startDate, endTime: endDate }
          );
          break;
        case 'returnArrival':
          setSelectedBackArrivalTime(
            name === selectedBackArrivalTime.name
              ? { name: '', type: '', startTime: '', endTime: '' }
              : { name, type: type, startTime: startDate, endTime: endDate }
          );
          break;
        default:
          break;
      }
    },
    [
      selectedDepartTime,
      selectedArrivalTime,
      selectedBackDepartTime,
      selectedBackArrivalTime,
    ]
  );

  const handleLayover = (name) => {
    handleSelection(name, setSelectedLayover);
  };

  const filter = () => {
    let updateData = data; // Assuming 'data' is your original dataset
    if (selectedProvider.length > 0) {
      updateData = updateData.filter((item) =>
        selectedProvider.includes(item.system)
      );
    }
    if (selectedStops) {
      updateData = updateData.filter(
        (item) => item.segments[0].length === parseInt(selectedStops)
      );
    }
    if (selectedBag.length > 0) {
      updateData = updateData.filter((item) => {
        const bagValue = item.priceBreakdown[0].baggageRule;
        const bagWeight =
          (bagValue.length === 1 && bagValue[0].Value) ||
          (bagValue.length > 1 && bagValue[1].Value);
        const bagWeightStr = String(bagWeight);
        return selectedBag.includes(bagWeightStr);
      });
    }

    if (selectedAirlins.length > 0) {
      updateData = updateData.filter((item) =>
        selectedAirlins.includes(item.marketingCarrier)
      );
    }
    if (selectedRefundable.length > 0) {
      updateData = updateData.filter((item) =>
        selectedRefundable.includes(item.refundable)
      );
    }

    if (
      selectedDepartTime.type === 'Depart' &&
      selectedDepartTime.name.length > 0
    ) {
      updateData = updateData.filter((item) => {
        const time = new Date(
          `1970-01-01T${item.segments[0][0].departureDateTime.slice(11, 19)}`
        );
        return (
          time >= selectedDepartTime.startTime &&
          time <= selectedDepartTime.endTime
        );
      });
    }

    if (selectedArrivalTime.type === 'Arrival') {
      updateData = updateData.filter((item) => {
        const time = new Date(
          `1970-01-01T${item.segments[0][
            item.segments[0].length - 1
          ].arrivalDateTime.slice(11, 19)}`
        );
        return (
          time >= selectedArrivalTime.startTime &&
          time <= selectedArrivalTime.endTime
        );
      });
    }

    if (selectedBackDepartTime.type === 'returnDepart') {
      updateData = updateData.filter((item) => {
        const time = new Date(
          `1970-01-01T${item.segments[item.segments.length - 1][
            item.segments[item.segments.length - 1].length - 1
          ].departureDateTime.slice(11, 19)}`
        );
        return (
          time >= selectedBackDepartTime.startTime &&
          time <= selectedBackDepartTime.endTime
        );
      });
    }

    if (selectedBackArrivalTime.type === 'returnArrival') {
      updateData = updateData.filter((item) => {
        const time = new Date(
          `1970-01-01T${item.segments[item.segments.length - 1][
            item.segments[item.segments.length - 1].length - 1
          ].arrivalDateTime.slice(11, 19)}`
        );
        return (
          time >= selectedBackArrivalTime.startTime &&
          time <= selectedBackArrivalTime.endTime
        );
      });
    }

    if (selectedLayover.length > 0) {
      updateData = updateData.filter((item) => {
        const segments = item.segments[0];
        const departureAirportCode =
          (segments.length === 2 && segments[1].departureAirportCode) ||
          (segments.length > 2 && segments[2].departureAirportCode);
        return selectedLayover.includes(departureAirportCode);
      });
    }
    setFilterData(updateData);
  };
  const itemsPerPage = innerWidth > 600 ? 15 : 15;
  const startIndex = filterPageIndex ? 0 : pageIndex;

  const pageData =
    isLoaded &&
    (filterData || []).slice(
      startIndex * itemsPerPage,
      startIndex * itemsPerPage + itemsPerPage
    );

  const gotoPage = useCallback((value) => {
    setFilterPageIndex(0);
    setPageIndex(value);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
  const pageLength = innerWidth > 600 ? 15 : 15;
  const pageCount = useMemo(
    () => Math.ceil(filterData.length / pageLength),
    [filterData.length]
  );
  const canPreviousPage = useMemo(() => pageIndex > 0, [pageIndex]);
  const canNextPage = useMemo(
    () => pageIndex < pageCount - 1,
    [pageIndex, pageCount]
  );

  const debouncedFilter = debounce(filter, 300);
  useEffect(() => {
    if (cheapest === 'Fastest') {
      setCheapest('Cheapest');
    }
    debouncedFilter();
    // handleResetData();
    // Cleanup function to cancel the debounced filter on unmount or when dependencies change
    return () => {
      debouncedFilter.cancel();
    };
  }, [
    selectedProvider,
    selectedRefundable,
    selectedAirlins,
    selectedLayover,
    selectedStops,
    selectedBag,
    selectedDepartTime,
    selectedArrivalTime,
    selectedBackDepartTime,
    selectedBackArrivalTime,
    data,
  ]);

  // slider shorting
  const uniqueCarriers = Array.from(
    new Set(
      data
        .filter((item) => item.marketingCarrier)
        .map((item) => item.marketingCarrier)
    )
  );
  const result = uniqueCarriers.map((carrier) => {
    const filteredData = data.filter(
      (item) => item.marketingCarrier === carrier
    );
    const minPrice = Math.min(
      ...filteredData.map((item) => parseInt(item.totalClientPrice))
    );
    const carrierName = filteredData[0].marketingCarrierName;
    // change this property after add
    return {
      code: carrier,
      name: carrierName,
      price: minPrice.toString(),
    };
  });

  const totalFlight =
    data.length === 0 || data.length === null ? 0 : error ? 0 : data?.length;
  const totalPassenger = adultCount + childCount + infantCount;
  return (
    <Box
      sx={{ mb: { xs: 10, md: 0, minHeight: '100vh', position: 'relative' } }}
    >
      <Container sx={{ px: { xs: 1, sm: 2, md: '' } }}>
        <ModifyHeader isLoaded={isAllLoaded} totalFlight={totalFlight} />
        {!isAllLoaded && (
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{ fontSize: 14, color: 'var(--secondary)' }}
              py={{ xs: 0.5, md: 1 }}
            >
              {!isLoaded
                ? 'Getting the best deals from over 750 airlines...'
                : 'We are searching for a more affordable flight for you...'}
            </Typography>
            <Box>
              <CustomLinearProgress />
            </Box>
          </Box>
        )}
        {!isLoaded ? (
          <Box sx={{ width: '100%' }}>
            <FlightSearchLoading tripType={tripType} isLoaded={isAllLoaded} />
          </Box>
        ) : (data.length === 0 || data.length === null) && !isLoaded ? (
          <Box sx={{ width: '100%' }}>
            <FlightSearchLoading tripType={tripType} isLoaded={isAllLoaded} />
          </Box>
        ) : (data.length === 0 || data.length === null) && !isAllLoaded ? (
          <Box sx={{ width: '100%' }}>
            <FlightSearchLoading tripType={tripType} isLoaded={isAllLoaded} />
          </Box>
        ) : data.length === 0 || data.length === null ? (
          <Box
            sx={{
              height: '50Vh',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--crimson)',
            }}
          >
            <Box>
              <Box pb={1}>No Flight Available</Box>
              <Link
                to="/dashboard"
                style={{
                  background: 'var(--primary)',
                  color: 'var(--white)',
                  padding: '5px 20px',
                  borderRadius: '5px',
                }}
              >
                Search Again
              </Link>
            </Box>
          </Box>
        ) : error ? (
          <Box
            sx={{
              height: '50Vh',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--crimson)',
            }}
          >
            <Box>
              <Box pb={1}>No Flight Available</Box>
              <Link
                to="/dashboard"
                style={{
                  background: 'var(--primary)',
                  color: 'var(--white)',
                  padding: '5px 20px',
                  borderRadius: '5px',
                }}
              >
                Search Again
              </Link>
            </Box>
          </Box>
        ) : (
          <Box>
            <Box>
              <FlightResultHeader
                flightData={data}
                location={location}
                tripType={tripType}
                totalFlight={totalFlight}
                // ---------Filter
                selectedProvider={selectedProvider}
                handleProvider={handleProvider}
                handleRefundable={handleRefundable}
                handleAirLine={handleAirLine}
                handleBaggage={handleBaggage}
                uniqueBaggage={uniqueBaggage}
                selectedBag={selectedBag}
                selectedAirlins={selectedAirlins}
                handleStops={handleStops}
                selectedStops={selectedStops}
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
                uniqueCarriers={result}
                segments={segments}
                value={tripType}
                childAge={childAge}
              />
            </Box>
            <Grid container columnSpacing={{ xs: 1, lg: 1.5 }} mt={1.5}>
              <Grid item lg={2.5} display={{ xs: 'none', lg: 'flex' }}>
                <Box
                  sx={{
                    bgcolor: 'var(--white)',
                    borderRadius: '6px',
                    width: '100%',
                    p: 1.5,
                    marginX: 'auto',
                    overflowY: 'auto',
                    top: '80px',
                    position: 'sticky',
                    maxHeight: 'calc(100vh - 60px)',
                  }}
                  className="p-sticiky"
                >
                  <Box textAlign="center" mb={1}>
                    <CountdownFormatted width="100%" />
                  </Box>
                  <AirlinesFilter
                    flightData={data}
                    tripType={tripType}
                    selectedProvider={selectedProvider}
                    handleProvider={handleProvider}
                    handleRefundable={handleRefundable}
                    handleAirLine={handleAirLine}
                    selectedAirlins={selectedAirlins}
                    handleBaggage={handleBaggage}
                    uniqueBaggage={uniqueBaggage}
                    selectedBag={selectedBag}
                    handleStops={handleStops}
                    selectedStops={selectedStops}
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
                    uniqueCarriers={result}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={12} lg={9.5}>
                <Box sx={{ width: '100%' }}>
                  {!isAllLoaded ? (
                    <SliderLoading />
                  ) : (
                    <>
                      <HeaderSlider
                        uniqueCarriers={result}
                        selectedAirlins={selectedAirlins}
                        handleAirLine={handleAirLine}
                      />
                      {(tripType === 'oneway' || tripType === 'roundway') && (
                        <Box my={1}>
                          <FilterPrice
                            segments={segments}
                            value={tripType || 'oneway'}
                            handleResetData={handleResetData}
                            handleChange={handleCheapest}
                            setCheapest={setCheapest}
                            cheapest={cheapest}
                            filterData={filterData}
                            handleCalculate={handleCalculate}
                            data={data}
                            childAge={childAge}
                          />
                        </Box>
                      )}
                    </>
                  )}

                  {!filterData?.length > 0 ? (
                    <Box
                      sx={{
                        height: '50Vh',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--crimson)',
                      }}
                    >
                      No Flight Available
                    </Box>
                  ) : (
                    <Box>
                      <FlightResultCard
                        pageData={pageData || []}
                        data={data}
                        result={result}
                        tripType={tripType}
                        totalPassenger={totalPassenger}
                        pageIndex={pageIndex}
                        pageCount={pageCount}
                        gotoPage={gotoPage}
                        canPreviousPage={canPreviousPage}
                        canNextPage={canNextPage}
                        setSelected={setQutationSelected}
                        selected={qutationSelected}
                      />
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
      {qutationSelected?.length > 0 && (
        <Box
          sx={{
            // background: 'var(--light-gray)',
            position: 'fixed',
            bottom: '0',
            bgcolor: 'var(--primary)',
            width: '100%',
            color: 'var(--white)',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            py: 1.5,
            cursor: 'pointer',
          }}
        >
          <MakeQuotation selected={qutationSelected} />
        </Box>
      )}
    </Box>
  );
};

export default FlightResult;
