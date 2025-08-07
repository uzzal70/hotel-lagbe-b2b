/* eslint-disable react/prop-types */
import { Image, Text, View } from '@react-pdf/renderer';
import moment from 'moment';
import {
  GetAircraftName,
  TransitTimeCalculate,
} from '../../Common/TimeAndDistanceCalculation/totalTimeDifference';
import arrow from '../../../assets/pdf/arrow.png';
import circle from '../../../assets/pdf/circle.png';
import flight from '../../../assets/pdf/flight.png';
import { convertToSegments } from '../convertToSegments';

const PDFFlightItinery = ({
  segments,
  styles,
  price,
  adult,
  child,
  infant,
  segIndex,
}) => {
  const mainData = segments || [];
  const segmentedData = convertToSegments(mainData);

  const timeAndDistance = (value, time) => {
    let totalDistance = parseInt(value);
    let totalKilometers = Math.floor(totalDistance) * 1.60934;
    const hours = Math.floor(totalDistance / 60);
    const minutes = totalDistance % 60;
    const formattedDuration = `${hours}h ${minutes}m`;
    return time ? formattedDuration : parseInt(totalKilometers);
  };
  return (
    <View
      style={{
        marginBottom: '10px',
      }}
    >
      {segmentedData?.map((segment, index) => (
        <View
          key={index}
          style={{ ...styles.flightText, paddingBottom: '10px' }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#edeeef', // Background color for the table header
              marginBottom: 5,
              width: '100%',
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                color: '#425486',
                paddingLeft: 8,
                paddingTop: 6,
                paddingBottom: 6,
                fontSize: '8.5px',
              }}
            >
              <Image src={arrow} style={{ height: '10px' }} />
              <Text>
                {segment[0]?.departureAirportCode}
                {' - '}
                {segment[segment?.length - 1]?.arrivalAirportCode}
                &nbsp;&nbsp;&nbsp;&nbsp;{'|'}
              </Text>
              <Text style={{ fontSize: 8 }}>
                {moment(
                  segment[0]?.departureDateTime?.split('T')[0],
                  'YYYY-MM-DD'
                ).format('DD MMM YYYY')}
                &nbsp;&nbsp;&nbsp;&nbsp;{'|'}
              </Text>
              <Text>
                {segment?.length === 1 ? 'Non' : segment?.length - 1}{' '}
                Stop&nbsp;&nbsp;&nbsp;&nbsp;{'|'}
              </Text>
              <Text style={{ textTransform: 'capitalize', fontWeight: 600 }}>
                {segment[segment?.length - 1]?.cabinClass?.toLowerCase() ||
                  'Economy'}{' '}
                Class
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                fontSize: '10px',
                color: '#fe6b40',
                paddingRight: 10,
              }}
            >
              {segIndex === 0 && (
                <>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '10px',
                      color: '#425486',
                      paddingRight: 20,
                    }}
                  >
                    <Text>Adult ({adult})</Text>
                    {child && <Text>Child ({child || 0})</Text>}
                    {infant && <Text>Infant ({infant || 0})</Text>}
                  </View>
                  {price && <Text> Total Customer Payable: {price}</Text>}
                </>
              )}
            </View>
          </View>
          <View>
            {segment?.map((item, index, arr) => (
              <View key={index}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text>{item?.marketingCarrierName || 'Flight Name'}</Text>
                  <Text style={{ fontSize: 9 }}>
                    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    {item?.operatingCarrier || item?.marketingCarrier}
                    {' - '}
                    {item?.marketingflight}
                  </Text>
                  <Text style={{ fontSize: 9 }}>
                    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    {GetAircraftName(item)}
                  </Text>
                </View>

                <View style={{ paddingBottom: '5px' }}>
                  <Text style={{ fontSize: 8 }}>
                    {/* {item?.marketingCarrier !== item.operatingCarrier &&
                      `Operated by ${
                        item?.operatingCarrierName || item?.marketingCarrierName
                      }`} */}
                    {item?.operatingCarrier &&
                      item.operatingCarrier !== item.marketingCarrier &&
                      `Operated by ${
                        item.operatingCarrierName || item.marketingCarrierName
                      }`}
                  </Text>
                </View>
                <View style={styles.spaceBetween}>
                  <View style={{ width: '5%' }}>
                    <Image
                      src={{
                        uri: `https://tripfindy-logos.s3.ap-southeast-1.amazonaws.com/airlines/${item?.marketingCarrier}.png`,
                        method: 'GET',
                        headers: { 'Cache-Control': 'no-cache' },
                      }}
                      style={{ width: '20px', maxHeight: '30px' }}
                    />
                  </View>
                  <View style={{ width: '37%' }}>
                    <Text>
                      {item?.departureLocation?.split(',')[0]}&nbsp;(
                      {item?.departureAirportCode})
                    </Text>
                    <Text>
                      {moment(
                        item?.departureDateTime?.split('T')[0],
                        'YYYY-MM-DD'
                      ).format('ddd DD MMM YYYY')}
                      {', '}
                      {moment(
                        item?.departureDateTime?.slice(11, 16),
                        'HH:mm'
                      ).format('hh:mm A')}
                    </Text>
                    <Text>{item?.departureAirportName}</Text>

                    {item?.dpartureTerminal === null ||
                    item?.dpartureTerminal === '' ? null : (
                      <Text>Terminal: {item?.dpartureTerminal || 'N/A'}</Text>
                    )}
                  </View>

                  <View
                    style={{
                      width: '21%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <View style={{ textAlign: 'center' }}>
                      <Text>
                        {timeAndDistance(item.flightDuration, 'time')}
                      </Text>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Image
                          src={circle}
                          style={{ width: '13px', padding: '2px' }}
                        />
                        <Text
                          style={{
                            fontSize: '7px',
                            color: '#9da5b6',
                          }}
                        >
                          - - - - - - - - - - - - - - - - - - - - - -{' '}
                        </Text>
                        &nbsp;
                        <Image
                          src={flight}
                          style={{
                            width: '15px',
                            padding: '2px',
                            marginTop: 1,
                          }}
                        />
                      </View>
                      <Text>
                        {Number(item?.totalMiles) > 0
                          ? `${
                              item.totalMiles
                                ? `${timeAndDistance(item.totalMiles)} km`
                                : ''
                            } `
                          : null}
                      </Text>
                    </View>
                  </View>

                  <View style={{ width: '37%' }}>
                    <Text style={{ textAlign: 'right' }}>
                      {item?.arrivalLocation?.split(',')[0]}&nbsp;(
                      {item?.arrivalAirportCode})
                    </Text>
                    <Text style={{ textAlign: 'right' }}>
                      {moment(
                        item?.arrivalDateTime?.split('T')[0],
                        'YYYY-MM-DD'
                      ).format('ddd DD MMM YYYY')}
                      {', '}
                      {moment(
                        item?.arrivalDateTime?.slice(11, 16),
                        'HH:mm'
                      ).format('hh:mm A')}
                    </Text>
                    <Text style={{ textAlign: 'right' }}>
                      {item?.arrivalAirportName}
                    </Text>

                    {item?.arrivalTerminal === null ||
                    item?.arrivalTerminal === '' ? null : (
                      <Text style={{ textAlign: 'right' }}>
                        Terminal: {item?.arrivalTerminal || 'N/A'}
                      </Text>
                    )}
                  </View>
                </View>

                {arr?.length - 1 !== index && (
                  <View
                    style={{
                      position: 'relative',
                      paddingTop: '7px',
                      paddingBottom: '7px',
                    }}
                  >
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        margin: 'auto',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 7,
                          paddingTop: 2,
                          color: '#9da5b6',
                        }}
                      >
                        --------------
                      </Text>
                      <Text
                        style={{
                          border: '1px dashed #9da5b6',
                          fontSize: 9,
                          color: '#425486',
                          borderRadius: '20px',
                          padding: '1px 10px',
                        }}
                      >
                        Change of plane{' '}
                        {TransitTimeCalculate(
                          segment?.[index + 1]?.departureDateTime?.split(
                            '+'
                          )[0],
                          segment?.[index]?.arrivalDateTime?.split('+')[0]
                        )}{' '}
                        Layover in {item.arrivalLocation?.split(',')[0]}
                      </Text>
                      <Text
                        style={{
                          fontSize: 7,
                          paddingTop: 2,
                          color: '#9da5b6',
                        }}
                      >
                        --------------
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default PDFFlightItinery;
