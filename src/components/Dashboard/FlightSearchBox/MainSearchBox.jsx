/* eslint-disable no-unused-vars */
import { Box } from '@mui/material';
import FlightSearchBox from './FlightSearchBox';
import { useEffect, useRef, useState } from 'react';
import { addDays } from 'date-fns';
import { useSelector } from 'react-redux';
import moment from 'moment';

const MainSearchBox = () => {
  const modifyData = sessionStorage.getItem('commonState');
  const data = JSON.parse(modifyData);
  const initialData = [
    {
      code: 'DAC',
      name: 'Hazrat Shahjalal Intl Airport',
      address: 'Dhaka,Bangladesh',
    },
    {
      code: 'DXB',
      name: 'Dubai Intl Airport',
      address: 'Dubai,UNITED ARAB EMIRATES',
    },
    {
      code: 'SGN',
      name: 'Tan Son Nhut Intl Airport',
      address: 'Ho Chi Minh City,VIETNAM',
    },
    {
      code: 'CMB',
      name: 'Bandaranaike Intl Airport',
      address: 'Colombo,SRI LANKA',
    },
    {
      code: 'CXB',
      name: "Cox's Bazar Airport",
      address: "Cox's Bazar,Bangladesh",
    },
    {
      code: 'CGP',
      name: 'Shah Amanat Intl Airport',
      address: 'Chittagong,Bangladesh',
    },
    {
      code: 'RUH',
      name: 'King Khaled Intl ',
      address: 'Riyadh,SAUDI ARABIA',
    },
    {
      code: 'TAS',
      name: 'Vostochny Intl Airport',
      address: 'Tashkent,UZBEKISTAN',
    },
    { code: 'MCT', name: 'Seeb Intl Airport', address: 'Muscat,OMAN' },
    {
      code: 'SPD',
      name: 'Saidpur Airport',
      address: 'Saidpur,Bangladesh',
    },
  ];
  const [cahngeState, setCahngeState] = useState(false);
  const [value, setValue] = useState(modifyData ? data.value : 'oneway');
  const [option, setOption] = useState({
    directFlightOnly: false,
  });

  const { adultCount, childCount, infantCount, classNames } = useSelector(
    (state) => state.passengerCount
  );

  const [className, setClassName] = useState(classNames || 'Y');
  const [passengerCount, setPassengerCount] = useState({
    adultCount: adultCount,
    childCount: childCount,
    infant: infantCount,
  });

  const { selectDepDate } = useSelector((state) => state.datePicker);

  // const selectDepDate = new Date();

  const now = useRef(new Date());
  const [departDate, setDepartDate] = useState(
    modifyData ? new Date(data.departDate) : new Date(selectDepDate)
  );

  const [arrDate, setArrDate] = useState(
    modifyData ? new Date(data.arrDate) : addDays(now.current, 3)
  );
  useEffect(() => {
    if (new Date(arrDate) <= new Date(departDate)) {
      setArrDate(new Date(departDate));
    }
  }, [departDate]);
  const multidepartDate = addDays(departDate, 2);
  const [departureData, setDepartureData] = useState({
    dInitialData: initialData,
    departAddress: modifyData
      ? data.departureData.departAddress
      : 'Hazrat Shahjalal Intl Airport',
    departure: modifyData ? data.departureData.departure : 'DAC',
    departureCity: modifyData
      ? data.departureData.departureCity
      : 'Dhaka,Bangladesh',
  });
  const [arrivalData, setArrivalData] = useState({
    aInitialData: initialData,
    arrivalAddress: modifyData
      ? data.arrivalData.arrivalAddress
      : `Cox's Bazar Airport`,
    arrival: modifyData ? data.arrivalData.arrival : 'CXB',
    arrivalCity: modifyData
      ? data.arrivalData.arrivalCity
      : `Cox's Bazar,Bangladesh`,
  });

  const { dInitialData, departAddress, departure, departureCity } =
    departureData;
  const { aInitialData, arrivalAddress, arrival, arrivalCity } = arrivalData;

  const [searchData, setSearchData] = useState(
    data?.searchData || {
      agentId: '100000',
      adultCount: passengerCount.adultCount,
      childCount: passengerCount.childCount,
      infantCount: passengerCount.infant,
      connection: 1,
      cabinclass: className || 'Y',
      segments: [
        {
          id: 0,
          openDepart: false,
          locationFrom: departure || 'DAC',
          departaddress: departAddress || 'Hazrat Shahjalal Intl Airport',
          departcity: departureCity || 'Dhaka,Bangladesh',
          openArrival: false,
          locationTo: 'BKK',
          arrivaladdress: 'Suvarnabhumi Intl Airport',
          arrivalcity: 'Bangkok,THAILAND',
          depDate: moment(departDate).format('YYYY-MM-DD'),
          openDate: false,
          open: false,
        },
        {
          id: 1,
          openDepart: false,
          locationFrom: 'BKK',
          departaddress: 'Suvarnabhumi Intl Airport',
          departcity: 'Bangkok,THAILAND',
          openArrival: false,
          locationTo: 'DXB',
          arrivaladdress: 'Dubai Intl Airport',
          arrivalcity: 'Dubai,UNITED ARAB EMIRATES',
          depDate: moment(multidepartDate).format('YYYY-MM-DD'),
          openDate: false,
          open: false,
        },
      ],
    }
  );
  return (
    <Box>
      <FlightSearchBox
        value={value}
        setValue={setValue}
        option={option}
        setOption={setOption}
        departDate={departDate}
        setDepartDate={setDepartDate}
        arrDate={arrDate}
        setArrDate={setArrDate}
        departureData={departureData}
        setDepartureData={setDepartureData}
        setArrivalData={setArrivalData}
        arrivalData={arrivalData}
        searchData={searchData}
        setSearchData={setSearchData}
        cahngeState={cahngeState}
        setCahngeState={setCahngeState}
        passengerCount={passengerCount}
      />
    </Box>
  );
};

export default MainSearchBox;
