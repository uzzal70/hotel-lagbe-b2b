/* eslint-disable react/prop-types */
import font from '../../../assets/pdf/Outfit-Regular.ttf';
import logo from '../../../assets/pdf/logo.png';
import contact from '../../../assets/pdf/contact.png';
import flightstatus from '../../../assets/pdf/flightstatus.png';
import nid from '../../../assets/pdf/nid.png';
import online from '../../../assets/pdf/online.png';
import bag from '../../../assets/pdf/bag.png';
import exit from '../../../assets/pdf/exit.png';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import moment from 'moment';
import TokenToName from '../../Common/TokenToName';
import { checkLocation } from '../../Helper/handleSearch';
import PDFFlightItinery from './PDFFlightItinery';
import { convertToSegments } from '../convertToSegments';
import BaggagePdf from './BaggagePdf';
import companyInfo from '../../../common/companyInfo';
Font.register({
  family: 'Outfit',
  src: font, // Replace with the actual URL to your font file
});

const PDFpageDesign = ({
  segments,
  passengers,
  allData,
  bookingData,
  customerFare,
  price, // with price
  // tickteText,
  data, // customer fare data
  totalPrice, //customer total price
  profileData,
  ait,
  currency,
  discount,
  checkImage,
  baseUrl,
}) => {
  const tokenise = TokenToName();
  const mainData = segments || [];
  const segmentedData = convertToSegments(mainData);
  const depart = segmentedData?.[0]?.[0]?.departureLocation || 'DA';
  const arrival =
    convertToSegments?.[0]?.[convertToSegments?.[0]?.length - 1]
      ?.arrivalLocation || '';

  const adtObject =
    passengers?.find((item) => item?.passengerType === 'ADT') || null;
  const cnnObject =
    passengers?.find((item) => item?.passengerType === 'CNN') || null;
  const infObject =
    passengers?.find((item) => item?.passengerType === 'INF') || null;
  const fareData = [adtObject, cnnObject, infObject]?.filter(Boolean);

  const paxDefined = (code) => {
    const paxMap = {
      A: 'Adult',
      C: 'Child',
      I: 'Infant',
    };
    return paxMap[code].toUpperCase() || 'unknown';
  };

  const calculatePaxTotal = (count, bPrice, tPrice, dPrice, oPrice) => {
    const basePrice = parseFloat(bPrice) || 0;
    const tax = parseFloat(tPrice) || 0;
    const other = parseFloat(oPrice) || 0;
    const discount = parseFloat(dPrice) || 0;
    const totalPrice = count * (basePrice + tax + other - discount);
    return totalPrice.toFixed(2);
  };

  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      padding: '30px 25px 25px 25px',
      fontFamily: 'Outfit',
      fontWeight: 300,
      width: '100%',
    },
    table: {
      display: 'table',
      width: 'auto',
    },
    tableRow: {
      flexDirection: 'row',
    },

    // table Cell start for passenger
    tableCol: {
      width: '32%',
    },
    tableCol1: {
      width: '17%',
    },
    // table Cell end
    // table Cell start for flight itinerary
    tableCol2: {
      width: '27.5%',
    },
    tableCol3: {
      width: '15%',
    },

    tableHeader: {
      backgroundColor: '#edeeef', // Background color for the table header
      color: '#425486',
      paddingLeft: 8,
      paddingTop: 5,
      paddingBottom: 5,
      fontSize: '8.5px',
    },
    tableBody: {
      // backgroundColor: '#f5fcff', // Background color for even rows
      color: '#132968',
      paddingLeft: 8,
      paddingTop: 4,
      paddingBottom: 4,
      fontSize: '9.5px',
      borderBottom: '1px solid #edeeef',
    },
    flightText: {
      color: '#425486',
      fontSize: '9.5px',
      fontWeight: 100,
    },
    tableCell: {
      margin: 'auto',
    },
    evenRow: {
      backgroundColor: '#f5fcff', // Background color for even rows
      color: '#132968',
    },
    oddRow: {
      backgroundColor: '#FFFFFF', // Background color for even rows
      color: '#132968',
    },
    flexp: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: '5px',
    },
    fontH: {
      fontSize: '11px',
      color: '#425486',
    },
    fontD: {
      fontSize: '11px',
      color: '#425486',
    },
    dottedLine: {
      width: '100%',
      marginBottom: '16px',
    },
    spaceBetween: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imgsize: {
      backgroundColor: '#D9D9D9',
      padding: '5px',
      borderRadius: '4px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '25px',
      height: '25px',
    },
    terms: {
      fontWeight: 'bold',
      color: '#060446',
      fontSize: 10,
    },
  });

  //   total color
  // f color: '#425486',
  // f color: '#132968',
  // f color:  '#643de3',
  // header color:  '#edeeef',
  // body color:  '#f5fcff',

  const statusMap = {
    BOOKING_HOLD: 'On Hold',
    MANUAL_TICKETED: 'CONFIRMED',
    TICKETED: 'CONFIRMED',
    PARTIAL_REFUND_INITIATED: 'Refund Initiated',
    BOOKING_CANCELLED: 'CANCELLED',
  };

  const statusDisplay =
    statusMap[bookingData?.status] ||
    bookingData?.status?.replace(/_/g, ' ').toLowerCase();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              width: '140px',
              height: '40px',
            }}
          >
            {checkImage?.length > 0 ? (
              <Image
                src={
                  checkImage?.length > 0
                    ? `${baseUrl}/core/agent/getCompanyLogoFilebyId/${tokenise?.userId}`
                    : logo
                }
                style={{
                  maxWidth: '100%',
                  height: '40px',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <Text
                style={{
                  fontSize: '16px',
                  color: '#425486',
                  paddingTop: '10px',
                }}
              >
                {profileData?.companyName || ''}
              </Text>
            )}
          </View>
          <View
            style={{
              fontSize: '10px',
              color: '#425486',
              textAlign: 'center',
            }}
          >
            <Text>{profileData?.companyName || ''}</Text>
            <Text
              style={{
                fontSize: '8px',
                color: '#677481',
                textAlign: 'center',
              }}
            >
              {profileData?.companyAddress || ''}
            </Text>
          </View>
          <View style={styles.flexp}>
            <Image src={contact} style={{ width: '30px', maxHeight: '30px' }} />
            <View>
              <Text style={{ fontSize: '8px', color: '#425486' }}>
                Emergency Contact
              </Text>
              <Text
                style={{
                  fontSize: '12px',
                  color: '#132968',
                  paddingTop: '2px',
                }}
              >
                {profileData?.companyPhone || ''}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.dottedLine}>
          <Text style={{ fontSize: '7px', fontWeight: 200, color: '#9da5b6' }}>
            - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - -
          </Text>
        </View>
        {/* <View style={styles.dottedLine} /> */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '7px',
          }}
        >
          <View>
            <Text
              style={{
                fontSize: '12px',
                color: '#425486',
                marginTop: '-5px',
              }}
            >
              Passenger Information
            </Text>
          </View>
          <View style={{ marginTop: '-10px' }}>
            <Text
              style={{
                fontSize: '10px',
                color: '#425486',
              }}
            >
              Airline PNR :{' '}
              {bookingData?.airlinesPNR || bookingData?.pnr || 'N/A'}
            </Text>
            <Text
              style={{
                fontSize: '9px',
                color: '#132968',
              }}
            >
              BookingId: {bookingData?.bookingRef || 'Bookingid'}
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: '10px',
                color:
                  bookingData?.status === 'MANUAL_TICKETED' ||
                  bookingData?.status === 'TICKETED'
                    ? '#10b15a'
                    : '#425486',
                marginTop: '-10px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              {/* {tickteText === 'Customer Invoice' ? 'Booking' : tickteText} */}
              {statusDisplay || ''}
            </Text>
            <Text
              style={{
                fontSize: '9px',
                color: '#132968',
              }}
            >
              {moment(bookingData?.lastUpdatedAt).format('DD MMM YYYY hh:mm A')}
            </Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCol}>
              <Text>&nbsp;Name</Text>
            </View>
            <View style={{ width: '15%' }}>
              <Text>Type</Text>
            </View>

            <View style={styles.tableCol1}>
              <Text>
                {passengers?.[0]?.ticketNo ? 'E-Ticket No' : 'Passport No'}
              </Text>
            </View>
            <View style={styles.tableCol1}>
              <Text>Check-in Baggage</Text>
            </View>
            <View style={styles.tableCol1}>
              <Text>Cabin Baggage</Text>
            </View>
            {(passengers?.[0]?.vip || passengers?.[0]?.wheelChair) && (
              <View style={styles.tableCol1}>
                <Text>SSR</Text>
              </View>
            )}
          </View>
          {passengers?.map((item, index) => (
            <View key={index} style={[styles.tableRow, styles.tableBody]}>
              <View style={styles.tableCol}>
                <Text>
                  &nbsp; {item?.prefix || ''} {item.firstName?.toUpperCase()}{' '}
                  {item.lastName?.toUpperCase()}
                </Text>
              </View>
              <View style={{ width: '15%' }}>
                <Text>{paxDefined(item?.passengerType[0])}</Text>
              </View>
              <View style={styles.tableCol1}>
                <Text>
                  {item?.ticketNo
                    ? item?.ticketNo
                    : checkLocation(depart, arrival) === 'Domestic'
                    ? 'Domestic'
                    : item?.passportNo}
                </Text>
              </View>
              <View style={styles.tableCol1}>
                <BaggagePdf item={item} />
                {/* <Text></Text> */}
              </View>
              <View style={styles.tableCol1}>
                <Text> 7 kg</Text>
              </View>
              {(item?.vip || item?.wheelChair) && (
                <View style={styles.tableCol1}>
                  <Text>
                    {item?.vip && `${item?.vip}${item?.wheelChair && ','} `}
                    {item?.wheelChair && item?.wheelChair}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View>
          <Text
            style={{
              fontSize: '12px',
              color: '#425486',
              margin: '10px 0 5px 0',
            }}
          >
            Flight Itinerary
          </Text>
        </View>

        {bookingData?.status === 'REISSUE_COMPLETED' ? (
          <View>
            <PDFFlightItinery
              segments={allData?.reissuedSegments}
              styles={styles}
            />
          </View>
        ) : (
          <View>
            <PDFFlightItinery segments={segments} styles={styles} />
          </View>
        )}

        {price && customerFare !== 'default' ? (
          <View>
            <Text
              style={{
                fontSize: '12px',
                color: '#425486',
                margin: '10px 0 5px 0',
              }}
            >
              Fare Summary
            </Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <View style={{ width: '25%' }}>
                  <Text style={styles.tableCell}>&nbsp;Pax Type</Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={styles.tableCell}>Base Fare</Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={styles.tableCell}>Taxes</Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={styles.tableCell}>Total Pax</Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={styles.tableCell}>Discount</Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={styles.tableCell}>Total Fare</Text>
                </View>
              </View>
              {data?.map((item, index) => (
                <View key={index} style={[styles.tableRow, styles.tableBody]}>
                  <View style={{ width: '25%' }}>
                    <Text style={styles.tableCell}>
                      &nbsp;{paxDefined(item?.passengerType[0])}
                    </Text>
                  </View>
                  <View style={{ width: '25%' }}>
                    <Text style={styles.tableCell}>{item?.basePrice}</Text>
                  </View>
                  <View style={{ width: '25%' }}>
                    <Text style={styles.tableCell}>{item?.tax}</Text>
                  </View>
                  <View style={{ width: '25%' }}>
                    <Text style={styles.tableCell}>
                      {item?.passengerType === 'ADT'
                        ? bookingData?.adultCount
                        : item?.passengerType === 'INF'
                        ? bookingData?.infantCount
                        : bookingData?.childCount}
                    </Text>
                  </View>
                  <View style={{ width: '25%' }}>
                    <Text style={styles.tableCell}>
                      {'—'}&nbsp;{item?.discount}
                    </Text>
                  </View>
                  <View style={{ width: '25%' }}>
                    <Text style={styles.tableCell}>
                      {item?.passengerType === 'ADT'
                        ? calculatePaxTotal(
                            bookingData?.adultCount,
                            item?.basePrice || 0,
                            item?.tax || 0,
                            item?.discount || 0,
                            item?.otherCharges || 0
                          )
                        : item?.passengerType === 'INF'
                        ? calculatePaxTotal(
                            bookingData?.infantCount,
                            item?.basePrice || 0,
                            item?.tax || 0,
                            item?.discount || 0,
                            item?.otherCharges || 0
                          )
                        : calculatePaxTotal(
                            bookingData?.childCount,
                            item?.basePrice || 0,
                            item?.tax || 0,
                            item?.discount || 0,
                            item?.otherCharges || 0
                          )}
                    </Text>
                  </View>
                </View>
              ))}

              {/* <View style={{ textAlign: 'right' }}>
                <Text
                  style={{ fontSize: '7px', fontWeight: 200, color: '#9da5b6' }}
                >
                  - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - -
                </Text>
              </View> */}
              <View
                style={{
                  paddingTop: '10px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <View
                  style={{
                    width: '250px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: '8px',
                        color: '#425486',
                      }}
                    >
                      Total Discount
                    </Text>
                    <Text
                      style={{
                        fontSize: '8px',
                        color: '#425486',
                      }}
                    >
                      AIT & VAT
                    </Text>
                    <Text
                      style={{
                        fontSize: '12px',
                        color: '#425486',
                      }}
                    >
                      Grand Total
                    </Text>
                  </View>
                  <View
                    style={{
                      textAlign: 'right',
                      width: '120px',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: '8px',
                        color: '#425486',
                      }}
                    >
                      {discount > 0 ? '-' : null}&nbsp;
                      {discount || 0.0} {companyInfo.currencyType}
                    </Text>
                    <Text
                      style={{
                        fontSize: '8px',
                        color: '#425486',
                      }}
                    >
                      {ait || 0.0} {companyInfo.currencyType}
                    </Text>
                    <Text
                      style={{
                        fontSize: '12px',
                        color: '#425486',
                      }}
                    >
                      {currency || companyInfo.currencyType}&nbsp;
                      {`${(Number(totalPrice) + Number(ait || 0)).toFixed(2)}`}
                      {/* {totalPrice + parseInt(bookingData?.ait || 0)} BDT */}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : price ? (
          <View>
            <Text
              style={{
                fontSize: '12px',
                color: '#425486',
                margin: '10px 0 5px 0',
              }}
            >
              Fare Summary
            </Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <View style={{ width: '25%' }}>
                  <Text style={styles.tableCell}>&nbsp;Passenger Type</Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={styles.tableCell}>Base Fare</Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={styles.tableCell}>Taxes</Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={styles.tableCell}>Total Pax</Text>
                </View>
                {/* <View style={{ width: '25%' }}>
                  <Text style={styles.tableCell}>Discount</Text>
                </View> */}
                <View style={{ width: '25%' }}>
                  <Text style={styles.tableCell}>Total Fare</Text>
                </View>
              </View>
              {fareData?.map((item, index) => (
                <View key={index} style={[styles.tableRow, styles.tableBody]}>
                  <View style={{ width: '25%' }}>
                    <Text style={styles.tableCell}>
                      &nbsp;{paxDefined(item?.passengerType[0])}
                    </Text>
                  </View>
                  <View style={{ width: '25%' }}>
                    <Text style={styles.tableCell}>{item?.basePrice}</Text>
                  </View>
                  <View style={{ width: '25%' }}>
                    <Text style={styles.tableCell}>{item?.tax}</Text>
                  </View>
                  <View style={{ width: '25%' }}>
                    <Text style={styles.tableCell}>
                      {item?.passengerType === 'ADT'
                        ? bookingData?.adultCount
                        : item?.passengerType === 'INF'
                        ? bookingData?.infantCount
                        : bookingData?.childCount}
                    </Text>
                  </View>
                  {/* <View style={{ width: '25%' }}>
                    <Text style={styles.tableCell}>
                      {'—'}&nbsp;{item?.discount}
                    </Text>
                  </View> */}
                  <View style={{ width: '25%' }}>
                    <Text style={styles.tableCell}>
                      {item?.passengerType === 'ADT'
                        ? bookingData?.adultCount * parseInt(item.totalPrice)
                        : item?.passengerType === 'INF'
                        ? bookingData?.infantCount * parseInt(item.totalPrice)
                        : bookingData?.childCount * parseInt(item.totalPrice)}
                    </Text>
                  </View>
                </View>
              ))}

              {/* <View style={{ textAlign: 'right' }}>
                <Text
                  style={{ fontSize: '7px', fontWeight: 200, color: '#9da5b6' }}
                >
                  - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - -
                </Text>
              </View> */}

              <View
                style={{
                  paddingTop: '10px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <View
                  style={{
                    width: '250px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  <View>
                    {/* <Text
                      style={{
                        fontSize: '8px',
                        color: '#425486',
                      }}
                    >
                      Total Discount
                    </Text> */}
                    <Text
                      style={{
                        fontSize: '8px',
                        color: '#425486',
                      }}
                    >
                      AIT & VAT
                    </Text>
                    <Text
                      style={{
                        fontSize: '12px',
                        color: '#425486',
                      }}
                    >
                      Grand Total
                    </Text>
                  </View>
                  <View
                    style={{
                      textAlign: 'right',
                      width: '120px',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: '8px',
                        color: '#425486',
                      }}
                    >
                      {bookingData?.ait || 0.0} {companyInfo.currencyType}
                    </Text>
                    <Text
                      style={{
                        fontSize: '12px',
                        color: '#425486',
                      }}
                    >
                      {parseInt(bookingData?.grossTotalPrice || 0) +
                        parseInt(bookingData?.ait || 0)}{' '}
                      {companyInfo.currencyType}
                      {/* {totalPrice + parseInt(bookingData?.ait || 0)} BDT */}
                      {/* {bookingData?.totalClientPrice} */}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          ''
        )}
        <View>
          <View>
            <Text style={{ ...styles.terms, margin: '10px 0', fontSize: 12 }}>
              Reminders:
            </Text>
            <View style={styles.flexp}>
              <View style={styles.imgsize}>
                <Image src={flightstatus} />
              </View>
              <View>
                <View style={styles.flexp}>
                  <Text style={styles.terms}>Flight Status:</Text>
                  <Text style={styles.flightText}>
                    Before your flight, please check your update flight status
                    by inputting airline PNR on
                  </Text>
                </View>
                <View>
                  <Text style={styles.flightText}>
                    the airline website or by calling the airline’s customer
                    support.
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ ...styles.flexp, marginTop: 10 }}>
              <View style={styles.imgsize}>
                <Image src={nid} />
              </View>

              <View>
                <View style={styles.flexp}>
                  <Text style={styles.terms}>Government ID:</Text>
                  <Text style={styles.flightText}>
                    Please carry a government issued photo ID card with your
                    e-ticket for
                  </Text>
                </View>
                <View>
                  <Text style={styles.flightText}>
                    verification during check-in.
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ ...styles.flexp, marginTop: 10 }}>
              <View style={styles.imgsize}>
                <Image src={online} />
              </View>
              <View>
                <View style={styles.flexp}>
                  <Text style={styles.terms}>Online Check-in:</Text>
                  <Text style={styles.flightText}>
                    Airline website usually have online check-in available which
                    can be
                  </Text>
                </View>
                <View>
                  <Text style={styles.flightText}>availed in requirement.</Text>
                </View>
              </View>
            </View>
            <View style={{ ...styles.flexp, marginTop: 10 }}>
              <View style={styles.imgsize}>
                <Image src={bag} />
              </View>

              <View>
                <View style={styles.flexp}>
                  <Text style={styles.terms}>Baggage Drop:</Text>
                  <Text style={styles.flightText}>
                    Please ensure you arrive at the Check-in Bag Drop counter
                    before it closes for document
                  </Text>
                </View>
                <View>
                  <Text style={styles.flightText}>
                    verification and to check in your baggage.
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ ...styles.flexp, marginTop: 10 }}>
              <View style={styles.imgsize}>
                <Image src={exit} />
              </View>

              <View>
                <View style={styles.flexp}>
                  <Text style={styles.terms}>Emergency Exit:</Text>
                  <Text style={styles.flightText}>
                    Passengers occupying seats in the emergency exit row are
                    required to adhere to safety
                  </Text>
                </View>
                <View>
                  <Text style={styles.flightText}>
                    regulations and fulfill necessary requirements.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Text
            style={{ ...styles.terms, margin: '20px 0 10px 0', fontSize: 12 }}
          >
            Important Information:
          </Text>
          <Text style={styles.flightText}>
            This electronic ticket receipt / itinerary serves as your
            documentation for your electronic ticket and is an integral part of
            your contract of carriage. Your electronic ticket is securely stored
            in the airline&apos;s computer reservation system. You may be
            required to present this receipt when entering the airport or to
            demonstrate return or onward travel to customs and immigration
            officials.
          </Text>
          <Text style={{ ...styles.flightText, margin: '10px 0' }}>
            We advise you to complete the check-in process 2-3 hours before your
            flight&apos;s departure time. Boarding typically commences at least
            35 minutes prior to the scheduled departure, with gates closing 15
            minutes before departure. Please consult the departure airport for
            any regulations concerning the transportation of liquids, aerosols,
            and gels in your hand baggage.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFpageDesign;
