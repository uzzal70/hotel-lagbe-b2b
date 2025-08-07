/* eslint-disable react/prop-types */
// BookingConfirmationPDF.jsx

import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import { baseUrl } from '../../../../baseurl';
import TokenToName from '../../Common/TokenToName';
import contact from '../../../assets/pdf/contact.png';
import font from '../../../assets/pdf/Outfit-Regular.ttf';
import moment from 'moment';
import companyInfo from '../../../common/companyInfo';
import logo from '../../../assets/pdf/logo.png';

Font.register({
  family: 'Outfit',
  src: font, // Replace with the actual URL to your font file
});

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: 'Outfit',
    color: '#425486',
    fontWeight: 200,
  },
  section: {
    marginBottom: 10,
    fontSize: 9,
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: 'bold',
  },
  box: {
    // border: '1px solid #ccc',
    padding: 6,
    marginBottom: 6,
  },
  subheader: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#edeeef',
    width: '100%',
    padding: '3px 10px',
  },
  text: {
    marginBottom: 2,
    fontSize: 9,
    fontWeight: 200,
  },
  small: {
    fontSize: 8,
  },
  flexp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: '5px',
  },
  hotelTitle: {
    color: '#292764',
    fontSize: 11,
    fontWeight: 400,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bullet: {
    width: 10,
    fontWeight: 'bold',
  },
  bulletText: {
    flex: 1,
  },
});

function calculateTotalGuests(roomAllocation) {
  let totalAdult = 0;
  let totalChild = 0;

  for (const room of roomAllocation) {
    totalAdult += room.adultCount || 0;
    totalChild += room.childCount || 0;
  }

  return { totalAdult, totalChild };
}

const extractListItems = (html) => {
  const matches = html.match(/<li>(.*?)<\/li>/g);
  return matches
    ? matches.map((item) => item.replace(/<\/?li>/g, '').trim())
    : [];
};
const HotelPdfDesign = ({
  checkImage,
  profileData,
  data,
  hotelData,
  markup,
}) => {
  // console.log(data);
  // console.log(hotelData);
  const bookingData = data?.booking;
  const getData = data?.booking?.guestRoomAllocations;
  const rooms = data?.booking?.guestRoomAllocations?.roomAllocation;
  const tokenise = TokenToName();

  const checkinInstructions = extractListItems(
    hotelData?.checkinInfo?.instructions?.[0] || ''
  );
  const specialInstructions = hotelData?.checkinInfo?.specialInstructions || [];
  const paxCount = calculateTotalGuests(
    data?.booking.guestRoomAllocations.roomAllocation
  );
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
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
          <Text
            style={{
              fontSize: '7px',
              fontWeight: 200,
              color: '#9da5b6',
              borderBottom: '1px solid #b0b0b0',
              marginBottom: 10,
              marginTop: 2,
            }}
          ></Text>
        </View>

        {/* <View style={[styles.section, styles.row]}>
          <View>
            <Text style={styles.bold}>RAHAMAT TRAVELS</Text>
            <Text>Kolkata, West Bengal</Text>
            <Text>Phone No: 91 9831516212</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[styles.bold, { color: 'blue' }]}>
              Confirmation No : 9066806993574
            </Text>
            <Text>Guest: Mr Rabin Mallick</Text>
            <Text>Check in: April 5, 2025</Text>
            <Text>Checkout: April 7, 2025</Text>
            <Text>Booking Id : tmkbx</Text>
          </View>
        </View> */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: 10,
          }}
        >
          <Text>Booking Ref: {bookingData?.bookingRef}</Text>
          <Text>
            Booking Time:{' '}
            {moment(getData?.createdAt?.split('Z')[0]).format(
              'D MMM YYYY, h:mm a'
            )}
          </Text>
          <Text
            style={{
              backgroundColor: '#10b15a',
              padding: '1px 10px 2px 10px',
              borderRadius: '5px',
              color: '#fff',
              textTransform: 'capitalize',
            }}
          >
            {bookingData?.tfStatus?.replace(/_/g, ' ').toLowerCase()}
          </Text>
        </View>

        {/* Hotel Info */}
        <View style={{ ...styles.row, marginTop: 4, marginBottom: 3 }}>
          <View style={{ width: '48%' }}>
            <Text style={{ ...styles.subheader, fontWeight: 600 }}>
              Hotel Name: {getData?.hotelName || 'N/A'}
            </Text>
            <View>
              <Text>Address: {getData?.address}</Text>
              <Text>
                City: {getData?.city} {getData?.country}
              </Text>
              <Text>Phone No: {getData?.phone}</Text>
            </View>
          </View>
          <View style={{ width: '48%' }}>
            <Text style={{ ...styles.subheader, color: '#f76641' }}>
              Hotel PNR: {bookingData?.pnr || bookingData?.bookingRef || 'N/A'}
            </Text>
            <View>
              <View style={styles.row}>
                <Text style={{ width: '48%' }}>
                  Check-In: {moment(getData?.checkIn).format('D MMM YYYY')}
                </Text>
                <Text style={{ width: '48%' }}>
                  Check-Out: {moment(getData?.checkOut).format('D MMM YYYY')}
                </Text>
              </View>

              <View>
                <Text>
                  Payment Status:{' '}
                  <Text style={{ color: '#10b15a' }}> Paid</Text>
                </Text>
              </View>
              {markup && (
                <Text style={styles.hotelTitle}>
                  Total Paid Amount: {markup || getData?.finalFare || '0'}{' '}
                  {companyInfo?.currencyType}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Booking Details */}
        <View style={styles.section}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              fontSize: 11,
              fontWeight: 'bold',
              marginTop: 6,
              marginBottom: 4,
              alignItems: 'center',
              backgroundColor: '#edeeef',
              width: '100%',
              padding: '3px 10px',
            }}
          >
            <Text style={{ width: '80%' }}>
              Booking Details ({rooms?.length || 1} Room
              {rooms?.length > 1 ? 's' : ''},{paxCount?.totalAdult} Adult
              {paxCount?.totalAdult > 1 ? 's' : ''}
              {paxCount?.totalChild > 0
                ? `, ${paxCount.totalChild} Child${
                    paxCount.totalChild > 1 ? 'ren' : ''
                  }`
                : ''}
              )
            </Text>

            <Text
              style={{
                color: getData?.refundable ? '#28a745' : '#FF0000',
                width: '20%',
                textAlign: 'right',
              }}
            >
              {getData?.refundable ? 'Refundable' : 'Non Refundable'}
            </Text>
          </View>
          <View>
            {rooms?.map((room, i) => (
              <View key={room} style={{ ...styles.row, width: '100%' }}>
                <View style={{ width: '48%' }}>
                  <Text style={styles.hotelTitle}>
                    Room {i + 1}: {room?.roomName}
                  </Text>
                  <Text>
                    Inclusions:{' '}
                    {room?.services || 'Free Wifi, Free Self parking'}
                  </Text>
                  <View style={{ marginBottom: 10 }}>
                    {JSON.parse(room?.roomType).map((item, index) => (
                      <Text style={styles.bold} key={index}>
                        Type: {item.type} x {item.count}
                      </Text>
                    ))}
                  </View>
                </View>
                <View style={{ width: '48%' }}>
                  {room?.guests?.map((guest, j) => (
                    <View key={j}>
                      <Text style={styles.hotelTitle}>
                        {guest?.isLeadGuest === true
                          ? 'Lead Guest'
                          : `Guest ${j + 1}`}{' '}
                        : {guest?.title} {guest?.firstName}{' '}
                        {guest?.lastName || ''}
                      </Text>
                      {i === 0 && <Text>Phone: {guest?.contactNumber}</Text>}
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ ...styles.section, width: '48%' }}>
            <Text style={styles.subheader}>Hotel Facilities</Text>
            {hotelData?.facilities?.map((section, index) => (
              <View key={index}>
                <Text style={styles.text}>{section?.name}</Text>
              </View>
            ))}
          </View>
          <View style={{ ...styles.section, width: '48%' }}>
            <Text style={styles.subheader}>Hotel Rules</Text>
            {/* Check-in Info */}
            <View style={styles.section}>
              <Text style={styles.hotelTitle}>Check-In Information</Text>
              <Text style={styles.paragraph}>
                Check-in Time: {hotelData?.checkinInfo?.beginTime || 'N/A'}
              </Text>
              <Text style={styles.paragraph}>
                Minimum Age: {hotelData?.checkinInfo?.minAge || 'N/A'}
              </Text>

              <Text style={styles.heading}>Instructions</Text>
              {checkinInstructions.map((item, index) => (
                <View key={index} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}

              {specialInstructions.length > 0 && (
                <>
                  <Text style={styles.heading}>Special Instructions</Text>
                  {specialInstructions.map((text, idx) => (
                    <Text key={idx} style={styles.text}>
                      {text}
                    </Text>
                  ))}
                </>
              )}
            </View>

            {/* Check-out Info */}
            <View style={styles.section}>
              <Text style={styles.hotelTitle}>Check-Out Information</Text>
              <Text style={styles.text}>
                Check-out Time: {hotelData?.checkoutInfo?.time || 'N/A'}
              </Text>
            </View>
          </View>
        </View>

        {/* Hotel Rules */}
      </Page>
    </Document>
  );
};

export default HotelPdfDesign;
