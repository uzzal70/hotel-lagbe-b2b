import {
  Box,
  Collapse,
  Container,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PassengerInformation from '../PassengerInformation/PassengerInformation';
import CountdownFormatted from '../FlightResults/Fliter/CountdownFormatted ';
import FlightInfoDetails from './FlightInfoDetails';
import PriceSummary from './PriceSummary';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useEffect, useState } from 'react';
import FlightInfoLoading from '../../Loading/FlightInfoLoading/FlightInfoLoading';
import BackButton from './../../Common/BackButton';
import CustomModal from '../../Common/CustomModal';
import companyInfo from '../../../common/companyInfo';
import responseimg from '../../../assets/responseimg';
import { baseUrl } from '../../../../baseurl';
import HeaderTitle from '../../../common/HeaderTitle';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: { xs: 2, md: 4 },
  borderRadius: '10px',
};

const FlightInformation = () => {
  // const { adultCount, childCount, infantCount } = useSelector(
  //   (state) => state.passengerCount
  // );
  const modifyData = sessionStorage.getItem('commonState');
  const searchData = JSON.parse(modifyData);
  const adultCount = searchData?.adultCount || 1;
  const childCount = searchData?.childCount || 0;
  const infantCount = searchData?.infantCount || 0;
  const childAge = searchData?.childAge || [];

  const flightType =
    searchData?.value === 'oneway'
      ? 'ONE_WAY'
      : searchData?.value === 'roundway'
      ? 'ROUND_WAY'
      : 'MULTY_CITY';
  const navigate = useNavigate();
  const location = useLocation();
  const locationData = location.state.data;
  const [expand, setExpand] = useState({});
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClick = (key) => {
    setExpand((prevExpand) => ({
      ...prevExpand,
      [key]: !prevExpand[key],
    }));
  };
  const segmetsData = locationData.segments.flat(2);
  const ndcPricing = locationData?.pricing;
  // console.log(locationData);
  // const priceAndBaggages = locationData.priceBreakdown;
  const priceAndBaggages = locationData?.priceBreakdown?.map((item) => {
    return {
      basePrice: item?.basePrice || '',
      totalPrice: item?.totalPrice || '',
      clientPrice: item?.clientPrice || '',
      clientBasePrice: item?.clientBasePrice || '',
      tax: item?.tax || '',
      passengerCount: item?.passengerCount || '',
      passengerType: item?.passengerType || '',
      discount: item?.discount || '',
      otherCharges: item?.otherCharges || '',
      serviceFee: item?.serviceFee || '',
      baggageRule:
        locationData?.marketingCarrier === '3L' ? [] : item?.baggageRule,
    };
  });
  const allData = {
    gds: locationData.system,
    fareBasisCode: locationData?.fareBasisCode || '',
    traceId: locationData?.traceId || '',
    offerId: locationData?.offerId || '',
    adultCount: adultCount || 1,
    childCount: childCount || 0,
    childAge: childAge,
    infantCount: infantCount || 0,
    resultIndex: locationData?.resultIndex || '',
    segments: segmetsData,
    pricing: locationData?.totalClientPrice || '0',
  };
  const body = JSON.stringify(allData);
  const urlEndPoint = '/core/flight/combined-air-pricing';
  const urlAdivaha = '/core/flight/soto-a-air-pricing';
  const urlTbo = '/core/flight/combined-air-pricing';
  // post this data to api in use redux
  const fetchData = async () => {
    try {
      setIsLoaded(false);
      setError(null);
      const url = `${baseUrl}${
        locationData.system === 'TRIPFINDY'
          ? urlTbo
          : locationData.system === 'SOTO_A'
          ? urlAdivaha
          : urlEndPoint
      }`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setData(responseData);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(error.message);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [body, baseUrl]);

  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        pb: { xs: 10, md: 1 },
      }}
    >
      <HeaderTitle headerTitle={`Add Passenger Information`} />

      {!isLoaded ? (
        <Box mt={2}>
          <FlightInfoLoading />
        </Box>
      ) : data.length === 0 ||
        data.length === null ||
        // data?.response?.offerChangeInfo?.typeOfChange ||
        data?.status === 'unavailable' ? (
        <Box>
          <Modal open={true}>
            <Box sx={{ ...style, width: { xs: '80%', sm: '50%', md: '40%' } }}>
              <CustomModal
                handleClick={() => {
                  setOpen(false);
                  {
                    navigate(-1);
                  }
                }}
                message={
                  <Box fontSize={12}>
                    {data?.status === 'unavailable' ? (
                      'This flight is unavailable. Please search again.'
                    ) : (
                      <>
                        {/* We regret to inform you that your recent flight booking
                    request with {companyInfo.companyName} could not be
                    processed successfully. */}
                        For any query. Please contact us at{' '}
                        <strong>{companyInfo.email}</strong> or Call{' '}
                        <strong>{companyInfo.phone}</strong>
                      </>
                    )}
                  </Box>
                }
                status={
                  data?.status === 'unavailable'
                    ? data?.message
                    : 'Unfortunately, the selected flight is not available'
                }
                text="Search again"
                image={responseimg?.bookingfailed}
              />
            </Box>
          </Modal>
        </Box>
      ) : (
        <Container sx={{ px: { xs: 1, sm: 2, md: '' } }}>
          <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 1.5 }}>
            {/* for xs to sm device */}
            <Box
              sx={{
                display: { xs: 'block', md: 'none' },
                bgcolor: 'var(--white)',
                mb: 1,
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
                <Typography sx={{ color: 'var(--secondary)', fontSize: 14 }}>
                  Session Timeout in
                </Typography>
                <CountdownFormatted
                  padding="5px 0px"
                  fontSize="14px"
                  fontWeight="500"
                  width="150px"
                />
              </Box>
            </Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              onClick={() => handleClick('flight')}
              sx={{
                bgcolor: 'var(--white)',
                p: 1,
                color: 'var(--secondary)',
                fontSize: 12,
                borderRadius: '5px',
                fontWeight: 300,
              }}
            >
              <Typography sx={{ color: 'var(--secondary)', fontSize: 14 }}>
                Flight Details{' '}
              </Typography>
              <KeyboardArrowDownOutlinedIcon
                sx={{
                  color: 'var(--primary)',
                  fontWeight: 600,
                  fontSize: 20,
                  transition: 'transform 0.3s ease-in-out',
                  transform: `rotate(${expand['flight'] ? 180 : 0}deg)`,
                }}
              />
            </Stack>
            <Collapse in={expand['flight']}>
              {locationData.segments.map((item, i) => (
                <FlightInfoDetails
                  key={i}
                  index={i}
                  allData={locationData}
                  data={item}
                  adultCount={adultCount}
                  childCount={childCount}
                  infantCount={infantCount}
                />
              ))}
            </Collapse>
            <Stack
              direction="row"
              justifyContent="space-between"
              onClick={() => handleClick('price')}
              sx={{
                bgcolor: 'var(--white)',
                p: 1,
                fontSize: 14,
                borderRadius: '5px',
                fontWeight: 300,
                mt: 1,
              }}
            >
              <Typography sx={{ color: 'var(--secondary)', fontSize: 14 }}>
                Price Summary{' '}
              </Typography>
              <KeyboardArrowDownOutlinedIcon
                sx={{
                  color: 'var(--primary)',
                  fontWeight: 600,
                  fontSize: 20,
                  transition: 'transform 0.3s ease-in-out',
                  transform: `rotate(${expand['price'] ? 180 : 0}deg)`,
                }}
              />
            </Stack>
            <Collapse in={expand['price']}>
              <PriceSummary
                data={locationData}
                adultCount={adultCount}
                childCount={childCount}
                infantCount={infantCount}
              />
            </Collapse>
          </Box>
          <Box>
            <PassengerInformation
              data={locationData}
              ndcPricing={ndcPricing}
              flightType={flightType}
              airPriceData={isLoaded && data}
              gds={locationData.system}
              tripType={locationData.tripType}
              segmetsData={segmetsData}
              priceAndBaggages={priceAndBaggages}
              adultCount={adultCount}
              childCount={childCount}
              childAge={childAge}
              infantCount={infantCount}
            />
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default FlightInformation;
