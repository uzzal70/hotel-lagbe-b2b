/* eslint-disable react/prop-types */
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';
// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    // backgroundColor: '#b0b0b0', // Background color for the table header
    // color: '#425486',
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    // border: '1px solid red',
    width: '100%',
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    // marginBottom: 1,
  },
  divider: {
    borderBottom: '1px solid #e6e6e6',
    marginVertical: 5,
  },
  benefitsList: {
    marginTop: 10,
  },
  bulletPoint: {
    marginLeft: 10,
  },
  // header: {
  //   backgroundColor: '#edeeef', // Background color for the table header
  //   color: '#425486',
  //   paddingTop: 5,
  //   paddingBottom: 5,
  //   fontSize: '8.5px',
  // },
});

const formatFieldName = (fieldName) => {
  return fieldName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const parseHTMLContent = (htmlContent) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  const traverse = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const isBold =
        node.tagName === 'B' || node.style?.fontWeight === 'bolder';
      const isListItem = node.tagName === 'LI';

      if (isBold)
        return { type: 'text', content: node.textContent, bold: true };
      if (isListItem) return { type: 'listItem', content: node.textContent };
      if (node.tagName === 'P')
        return { type: 'paragraph', content: node.textContent };

      return Array.from(node.childNodes).flatMap(traverse);
    }
  };

  return Array.from(doc.body.childNodes).flatMap(traverse);
};

// Component to render parsed content
const RenderParsedContent = ({ parsedContent }) => {
  return parsedContent.map((item, index) => {
    if (item.type === 'text') {
      return (
        <Text key={index} style={item.bold ? styles.boldText : null}>
          {item.content}
        </Text>
      );
    }
    if (item.type === 'listItem') {
      return (
        <Text key={index} style={styles.listItem}>
          • {item.content}
        </Text>
      );
    }
    if (item.type === 'paragraph') {
      return (
        <Text key={index} style={styles.paragraph}>
          {item.content}
        </Text>
      );
    }
    return null;
  });
};

const InsurancePDFDesign = ({ data }) => {
  const parsedContent = parseHTMLContent(data.detailsContent);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View
          style={{
            backgroundColor: '#2927641c',
            marginBottom: 20,
            padding: '10px 10px',
          }}
        >
          <Text style={styles.header}>
            {formatFieldName(data?.displayName || 'N/A')}
          </Text>
          <Text style={{ textAlign: 'center', marginTop: '5px' }}>
            #Plane : {data?.planName}
          </Text>
        </View>

        {/* Order Information Section */}
        <View style={styles.section}>
          <View
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              gap: '10px',
            }}
          >
            <View style={{ width: '50%' }}>
              <Text style={styles.title}>Order Information</Text>
              <View style={styles.divider}></View>
              <View style={styles.row}>
                <Text>Order ID</Text>
                <Text> {data?.orderRef}</Text>
              </View>
              <View style={styles.row}>
                <Text>Bimafy Order ID:</Text>
                <Text> {data?.orderId}</Text>
              </View>
              <View style={styles.row}>
                <Text>Created At:</Text>
                <Text>
                  {moment(data.bimafyOrderDetailsCreatedAt).format(
                    'DD MMM YYYY'
                  )}
                </Text>
              </View>
              <View style={styles.row}>
                <Text>Status:</Text>
                <Text> {formatFieldName(data?.orderStatus || 'N/A')}</Text>
              </View>
            </View>
            <View style={{ width: '50%' }}>
              <Text style={styles.title}>Financial Details</Text>
              <View style={styles.divider}></View>
              <View style={styles.row}>
                <Text>Gross Premium:</Text>
                <Text> {data?.grossPremium}</Text>
              </View>
              <View style={styles.row}>
                <Text>Discount:</Text>
                <Text>- {data?.discount}</Text>
              </View>
              <View style={styles.row}>
                <Text>Delivery Charge:</Text>
                <Text> {data?.deliveryCharge}</Text>
              </View>
              <View style={styles.row}>
                <Text>Grand Total:</Text>
                <Text>
                  {parseFloat(data?.grossPremium - data?.discount).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Financial Details Section */}
        <View style={styles.section}>
          <View
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              gap: '10px',
            }}
          >
            <View style={{ width: '50%' }}>
              <Text style={styles.title}>Person Details</Text>
              <View style={styles.divider}></View>
              <View style={styles.row}>
                <Text>Name:</Text>
                <Text> {data?.deliveryName}</Text>
              </View>
              <View style={styles.row}>
                <Text>Name In Passport:</Text>
                <Text> {data?.nameInPassport}</Text>
              </View>
              <View style={styles.row}>
                <Text>Passport Number:</Text>
                <Text>{data?.passportNo}</Text>
              </View>
              <View style={styles.row}>
                <Text>Date of Birth:</Text>
                <Text>{moment(data.dateOfBirth).format('DD MMM YYYY')}</Text>
              </View>
              <View style={styles.row}>
                <Text>Occupation:</Text>
                <Text>{data?.occupation}</Text>
              </View>
            </View>

            <View style={{ width: '50%' }}>
              <Text style={styles.title}>Travel Details</Text>
              <View style={styles.divider}></View>
              <View style={styles.row}>
                <Text>Travel Purpose:</Text>
                <Text>{formatFieldName(data?.travelPurpose || 'N/A')}</Text>
              </View>
              <View style={styles.row}>
                <Text>Date of Travel:</Text>
                <Text> {moment(data.dateOfTravel).format('DD MMM YYYY')}</Text>
              </View>
              <View style={styles.row}>
                <Text>Country:</Text>
                <Text>
                  {data?.countries} ({data?.countriesCode})
                </Text>
              </View>
              <View style={styles.row}>
                <Text>Days:</Text>
                <Text>{data?.days}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.section}>
          <Text style={{ ...styles.title, textAlign: 'center', marginTop: 5 }}>
            Benefits
          </Text>
          <View style={styles.divider}></View>

          <View style={styles.bulletPoint}>
            <RenderParsedContent parsedContent={parsedContent} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InsurancePDFDesign;
