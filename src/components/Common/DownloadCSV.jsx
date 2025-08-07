import { Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
const DownloadCSV = ({ data }) => {
  const jsonData = data?.bookings || [];

  // Specify only the required fields
  const selectedFields = [
    'bookingRef',
    'route',
    'contactName',
    'contactEmail',
    'contactPhone',
    'tripType',
    'currency',
    'totalBasePrice',
    'grossTotalPrice',
    'paymentStatus',
    'travelDate',
    'createdAt',
  ];

  const convertToCSV = (json, fields) => {
    if (!json || json.length === 0) return '';

    // Headers
    const headers = fields.join(',') + '\n';

    // Convert rows
    const rows = json
      .map((row) =>
        fields
          .map((field) => `"${String(row[field] || '').padEnd(20, ' ')}"`) // Adjust padding (20 spaces)
          .join(',')
      )
      .join('\n');

    return headers + rows;
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(jsonData, selectedFields);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

    // Create and trigger download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'filtered_booking_data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      onClick={downloadCSV}
      sx={{
        py: 0.5,
        fontSize: 12,
        display: 'flex',
        color: 'var(--secondary)',
        border: '1px solid var(--stroke)',
        px: 1,
        borderRadius: 1,
      }}
    >
      Download CSV{' '}
      <DownloadIcon
        sx={{
          fontSize: 18,
        }}
      />
    </Box>
  );
};

export default DownloadCSV;
