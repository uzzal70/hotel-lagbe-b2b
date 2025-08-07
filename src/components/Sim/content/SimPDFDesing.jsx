/* eslint-disable react/prop-types */
import font from '../../../assets/pdf/Outfit-Regular.ttf';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import { getPackageDetails } from '../../Utils/getPackageDetails';
Font.register({
  family: 'Outfit',
  src: font, // Replace with the actual URL to your font file
});

const convertHtmlToText = (html, companyInfo) => {
  return html
    .replace(/<\/?b>/g, '') // Remove <b> but keep text bold manually in React-PDF
    .replace(/<\/?p>/g, '\n') // Convert <p> to new lines
    .replace(/<\/?br>/g, '\n') // Convert <br> to new lines
    .replace(/<span[^>]*>/g, '') // Remove opening <span> with any attributes
    .replace(/<\/span>/g, '') // Remove closing </span>
    .replace(/<\/?ol>/g, '') // Remove <ol> tags
    .replace(/<li>/g, '• ') // Convert <li> to bullet points
    .replace(/<\/li>/g, '\n') // Add a new line after each <li>
    .replace(
      /airalo\.com\/my-esims/g,
      `<a href="/dashboard?query=Sim" target="_blank">${
        companyInfo?.domainName || ''
      }E-Sim</a>`
    )
    .replace(/\bmy-esims\b/gi, 'E-Sim') // Replace "my-esims", case insensitive
    .replace(/\bAiralo\b/g, 'Ticketlagbe'); // Replace "Airalo" with "Ticketlagbe"
};

const guideData = {
  installationGuideIos: {
    title: 'Installation Guide (iOS)',
    steps: [
      "Go to 'Settings' > 'Cellular/Mobile Data' > 'Add Data Plan' > Install eSIM",
      "Scan QR code or tap 'Enter Details Manually'",
      'Custom Label your eSIM (To identify your eSIM)',
      "Set 'Default line' as 'Primary' to receive call/SMS and 'Mobile Data' to use installed eSIM",
      'Update Access Point Names (APN), if needed (refer information above)',
      'Installation is completed!',
    ],
    postInstallation: {
      subtitle: 'To use eSIM after installation/upon landing:',
      steps: [
        "Go to 'Settings' > 'Cellular/Mobile Data' > Turn on your eSIM > Back to 'Cellular/Mobile Data' to refresh",
        "'Cellular/Mobile Data' > Select your eSIM > Turn on Data Roaming > Back to 'Cellular/Mobile Data' to refresh",
        "'Cellular/Mobile Data' > In Mobile Data > Select eSIM",
        "Turn off 'Allow Mobile Data switching' and disable 'Main Mobile Line Data Roaming' to avoid roaming charges on primary line",
      ],
    },
  },
  installationGuideAndroid: {
    title: 'Installation Guide (Android)',
    steps: [
      "Go to 'Settings' > 'Network/Connections' > 'SIM manager'",
      "Tap '+ Add eSIM' > Scan Carrier QR code / Retrieve QR from file / Enter activation code",
      'Custom Label your eSIM (To identify your eSIM)',
      'Installation is completed!',
    ],
    postInstallation: {
      subtitle: 'To use eSIM after installation/upon landing:',
      steps: [
        "Go to 'Settings' > 'Network/Connections' > 'SIM Manager' > Enable eSIM > Scroll bottom > 'Mobile Data' > select eSIM",
        "'Network/Connections' > 'Mobile network' > Enable 'Data roaming'",
        "'Network/Connections' > 'Mobile network' > Access Point Names > select/input APN (provided in PDF) as Name and APN",
      ],
    },
  },

  importantNotes: {
    title: 'Important Notes',
    steps: [
      'Data validity starts immediately when eSIM QR is scanned / installed.',
      'You may install eSIM before traveling (before your flight) or, at destination when you need it. Stable internet is required for successful installation / activation (preferably WiFi – avoid airport WiFi as they may block eSIM installations).',
      'Fair Usage Policy (FUP) - Unlimited plan data speed will be reduced up to 128kbps once high speed data is used up.',
      ' You can have different eSIM plans installed in your device.',
      "Save data by disabling 'autoplay', 'auto upload/sync' and enable 'Use less data' functions on social media and cloud storage.",
    ],
  },
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: 'Outfit',
    color: '#333',
    fontWeight: 200,
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 7,
    padding: '3px 5px',
    backgroundColor: '#edeeef',
    borderRadius: 5,
  },
  section: {
    marginBottom: 5,
  },
  packageDetails: {
    // padding: '5px 10px',
    // border: '1px solid #ccc',
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#f9f9f9',
  },
  importantNote: {
    // backgroundColor: '#fd505094',
    padding: '5px 15px',
    borderRadius: 5,
    marginBottom: 5,
    border: '1px solid #ff0000',
    fontSize: 9,
  },
  travelerDetails: {
    border: '1px solid #ddd',
    borderRadius: 5,
    padding: 5,
  },
  travelerItem: {
    marginBottom: 4,
    fontSize: 10,
  },
  guide: {
    marginTop: 5,
    fontSize: 9,
    lineHeight: 1.5,
  },
  subtitle: {
    margin: '5px 0px',
    fontSize: 10,
    fontWeight: 500,
  },
  step: {
    fontSize: 8,
    fontWeight: 200,
    color: '#222222',
    lineHeight: 1.5,
  },
  dflex: {
    display: 'flex',
    justifyContent: 'center',
    padding: 2,
  },
  flexp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: '5px',
  },
});
const Section = ({ data, title }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.header}>{title}</Text>
      <Text style={{ fontSize: 9 }}>{data}</Text>
      {/* {data.steps &&
        data.steps.map((step, index) => (
          <Text key={index} style={styles.step}>
            {`${index + 1}. ${step}`}
          </Text>
        ))}
      {data.postInstallation && (
        <View>
          <Text style={styles.subtitle}>{data.postInstallation.subtitle}</Text>
          {data.postInstallation.steps.map((step, index) => (
            <Text key={index} style={styles.step}>
              {`• ${step}`}
            </Text>
          ))}
        </View>
      )} */}
    </View>
  );
};
const Card = ({ data, title }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <Text style={{ width: '25%' }}>{title}</Text>
      <Text style={{ width: '70%' }}>{data}</Text>
    </View>
  );
};

const SimPDFDesing = ({ data, paxData, qrImage, agentData }) => {
  //   total color
  // f color: '#425486',
  // f color: '#132968',
  // f color:  '#643de3',
  // header color:  '#edeeef',
  // body color:  '#f5fcff',
  const updatedQrInstallation = convertHtmlToText(data?.qrCodeInstallation);
  const updatedManualInstallation = convertHtmlToText(data?.manualInstallation);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        {/* <Text style={styles.header}>Ref: {data?.eSimOrderRef}</Text> */}
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
            <Text
              style={{
                fontSize: '16px',
                color: '#425486',
                paddingTop: '10px',
              }}
            >
              {agentData?.companyName || ''}
            </Text>
          </View>
          <View
            style={{
              fontSize: '10px',
              color: '#425486',
              textAlign: 'center',
            }}
          >
            <Text>{agentData?.companyName || ''}</Text>
            <Text
              style={{
                fontSize: '8px',
                color: '#677481',
                textAlign: 'center',
              }}
            >
              {agentData?.companyAddress || ''}
            </Text>
          </View>
          <View style={styles.flexp}>
            {/* <Image src={contact} style={{ width: '30px', maxHeight: '30px' }} /> */}
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
                {agentData?.companyPhone || ''}
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
        {/* Package Details */}
        <View
          style={{
            ...styles.packageDetails,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            // alignItems: 'center',
            backgroundColor: '#FFFFFF',
            marginTop: 15,
          }}
        >
          <View style={{ width: '70%' }}>
            <Card data={paxData?.paxName} title=" Name :" />
            <Card data={paxData?.eSimId} title=" eSim ID :" />
            <Card data={paxData?.iccid} title=" ICCID :" />
            <Card data={data?.data} title=" Package :" />
            <Card data={`${data?.validity} Days`} title=" Validity :" />
            <Card
              data={`${
                data?.simType === 'GLOBAL'
                  ? 'Can be used anywhere!'
                  : `Automatic, when you arrive in ${data?.country}`
              }`}
              title=" Plan Activation :"
            />
          </View>
          {/* {qrImage && ( */}
          <View
            style={{
              width: '30%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ paddingBottom: 2 }}>Your eSIM QR</Text>
            <Image
              src={qrImage}
              style={{
                width: '70px',
                // maxHeight: '70px',
              }}
              alt="QR Code Right"
            />
            {/* <Text style={styles.dflex}>
                {paxData?.eSimId && `eSim ID: ${'  '}${paxData?.eSimId}`}
              </Text> */}
          </View>
          {/* )} */}
        </View>

        {/* Important Note */}
        <View
          style={{ ...styles.importantNote, marginTop: 10, marginBottom: 20 }}
        >
          <Text
            style={{
              marginBottom: 2,
              fontWeight: 300,
            }}
          >
            Important Note:
          </Text>
          <Text>
            ✓ The eSIM QR code can only be scanned and installed once; it cannot
            be reinstalled.
          </Text>
          <Text>
            ✓ DO NOT DELETE/REMOVE eSIM from your mobile after successful
            installation.
          </Text>
        </View>

        {/* Traveler Details */}
        {/* <View style={styles.section}>
          <Text style={styles.header}>Traveler Details</Text>
          <View style={styles.travelerDetails}>
            <Text
              style={{ ...styles.travelerItem, color: '#425486', fontSize: 12 }}
            >
              Name: {paxData?.paxName}
            </Text>
            <Text style={styles.travelerItem}>
              {paxData?.eSimId && `eSim ID: ${'    '}${paxData?.eSimId}`}
            </Text>
            <Text style={styles.travelerItem}>
              {paxData?.activationCode &&
                `Activation Code: ${'    '}${paxData?.activationCode}`}
            </Text>
            <Text>
              {paxData?.androidManualActivationCode &&
                `Android Activation Code: ${'    '}${
                  paxData?.androidManualActivationCode
                }`}
            </Text>
          </View>
        </View> */}

        {/* Installation Guide */}
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <View style={{ width: '50%' }}>
            <Section
              data={updatedQrInstallation}
              title="QR Code Installation"
            />
          </View>
          <View style={{ width: '50%' }}>
            <Section
              data={updatedManualInstallation}
              title="Manual Installation"
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SimPDFDesing;
