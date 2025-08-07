import { PDFDownloadLink } from '@react-pdf/renderer';
import InsurancePDFDesign from './InsurancePDFDesign'; // Import the component you created

const DownloadPDFInsurance = ({ data }) => (
  <PDFDownloadLink
    document={<InsurancePDFDesign data={data} />}
    fileName="insurance-details.pdf"
  >
    {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
  </PDFDownloadLink>
);

export default DownloadPDFInsurance;
