/* eslint-disable react/prop-types */
import {
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  Image,
} from '@react-pdf/renderer';
import PDFFlightItinery from '../../../BookingDetails/PDF/PDFFlightItinery';
import logo from '../../../../assets/pdf/logo.png';
import contact from '../../../../assets/pdf/contact.png';

const QuotaitonPDFpageDesign = ({
  selected,
  checkImage,
  baseUrl,
  tokenise,
  profileData,
}) => {
  const timeAndDistance = (value, time) => {
    let totalDistance = parseInt(value);
    let totalKilometers = Math.floor(totalDistance) * 1.60934;
    const hours = Math.floor(totalDistance / 60);
    const minutes = totalDistance % 60;
    const formattedDuration = `${hours}h ${minutes}m`;
    return time ? formattedDuration : parseInt(totalKilometers);
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
  const modifyData = sessionStorage.getItem('commonState');
  const searchData = JSON.parse(modifyData);
  const adultCount = searchData?.adultCount || 1;
  const childCount = searchData?.childCount || 0;
  const infantCount = searchData?.infantCount || 0;
  // console.log(selected);
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
            <Text> {profileData?.companyName || ''}</Text>
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

        <View>
          {selected?.map((item, i) => {
            return (
              <View key={i}>
                <Text
                  style={{
                    fontSize: '11px',
                    color: '#082799',
                    backgroundColor: '#edeeef',
                    width: '85x',
                    padding: '1px 6px',
                    marginBottom: '2px',
                    fontWeight: 200,
                  }}
                >
                  Flight option {i + 1}
                </Text>
                <View
                  style={{
                    border: '1px solid #edeeef',
                    padding: '2px 4px',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '30px',
                    marginBottom: '2px',
                  }}
                >
                  {item?.priceBreakdown[0].baggageRule?.map((price, k) => (
                    <View key={k}>
                      <Text
                        style={{
                          ...styles.flightText,
                          fontSize: 9,
                          fontWeight: 200,
                        }}
                      >
                        {item?.segments[k][0].departureLocation?.split(',')[0]}
                        {' - '}
                        {
                          item?.segments[k][
                            item?.segments[k].length - 1
                          ].arrivalLocation?.split(',')[0]
                        }
                      </Text>
                      <View
                        style={{
                          ...styles.flightText,
                          fontSize: 9,
                          fontWeight: 200,
                        }}
                      >
                        {item.priceBreakdown[0]?.baggageRule[0]?.Value ===
                          undefined ||
                        item.priceBreakdown[0]?.baggageRule[0]?.Value === '' ? (
                          <Text>Checked in baggage not included</Text>
                        ) : (
                          <>
                            {item.priceBreakdown.map((x, j, arr) => (
                              <Text key={j}>
                                {`${
                                  x.passengerType === 'ADT'
                                    ? `Adult's ${
                                        parseInt(x.baggageRule[k]?.Value) > 3
                                          ? x.baggageRule[k]?.Value || 0
                                          : parseInt(
                                              x.baggageRule[k]?.Value || 0
                                            ) * 23
                                      } kg / person, Cabin Baggage:  7 Kg${
                                        arr.length > 1 ? ',' : ''
                                      }`
                                    : x.passengerType === 'INF'
                                    ? `Infant's ${
                                        parseInt(x.baggageRule[k]?.Value) > 3
                                          ? x.baggageRule[k]?.Value || 0
                                          : parseInt(
                                              x.baggageRule[k]?.Value || 0
                                            ) * 10
                                      } kg / person ${arr.length > 2 ? '' : ''}`
                                    : `Child's ${
                                        parseInt(x.baggageRule[k]?.Value) > 3
                                          ? x.baggageRule[k]?.Value || 0
                                          : parseInt(
                                              x.baggageRule[k]?.Value || 0
                                            ) * 23
                                      } kg / person, Cabin Baggage:  7 Kg`
                                }`}
                              </Text>
                            ))}
                          </>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
                {item.segments?.map((segment, index) => (
                  <PDFFlightItinery
                    key={index}
                    segIndex={index}
                    segments={segment}
                    styles={styles}
                    price={item.grossTotalPrice}
                    adult={adultCount}
                    child={childCount}
                    infant={infantCount}
                  />
                ))}
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default QuotaitonPDFpageDesign;
