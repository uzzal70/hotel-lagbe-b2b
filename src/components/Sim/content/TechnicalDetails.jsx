/* eslint-disable react/prop-types */
import { Box, Typography, Divider, Grid } from '@mui/material';
import companyInfo from '../../../common/companyInfo';
// import parse from 'html-react-parser';

const TechnicalDetails = ({ data }) => {
  const {
    title,
    day,
    data: dataSize,
    shortInfo,
    qrInstallation,
    manualInstallation,
    netPrice,
  } = data;

  const updatedQrInstallation = qrInstallation
    .replace(
      /airalo\.com\/my-esims/g,
      `<a href="/dashboard?query=Sim" target="_blank">
      ${companyInfo.domainName}E-Sim
    </a>`
    )
    .replace(/my-esims/g, 'E-Sim')
    .replace(/My eSIMs/g, 'E-Sim')
    .replace(/Airalo/g, 'Ticketlagbe');

  const updateManualInstallation = manualInstallation
    .replace(
      /airalo\.com\/my-esims/g,
      `<a href="/dashboard?query=Sim" target="_blank">
    ${companyInfo.domainName}E-Sim
  </a>`
    )
    .replace(/my-esims/g, 'E-Sim')
    .replace(/My eSIMs/g, 'E-Sim')
    .replace(/Airalo/g, 'Ticketlagbe');

  return (
    <Box
      sx={{
        // p: { xs: 1, md: 3 },
        // border: '1px solid #ddd',
        borderRadius: 2,
        p: {
          fontWeight: 400,
          fontSize: 13,
        },
        b: {
          fontWeight: 400,
        },
      }}
    >
      <Box
        sx={{
          p: { xs: 1, md: 3 },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Additional Information
        </Typography>
        Title & Basic Info
        <Typography>{title}</Typography>
        <Typography color="text.secondary">{shortInfo}</Typography>
        <Divider sx={{ my: 2, borderColor: 'var(--light-stroke)' }} />
        {/* Pricing & Validity */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography>Validity</Typography>
            <Typography color="text.secondary">{day} Days</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Data</Typography>
            <Typography color="text.secondary">{dataSize}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Price</Typography>
            <Typography color="text.secondary">BDT {netPrice}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2, borderColor: 'var(--light-stroke)' }} />
        {/* Coverage */}
        {/* <Typography>Coverage</Typography>
        <Box
          sx={{
            maxHeight: 150,
            overflowY: 'auto',
            border: '1px solid #ddd',
            borderRadius: 1,
            p: 1,
          }}
        >
          <List dense>
            {coverageList.map((country, index) => (
              <ListItem key={index} sx={{ p: 0 }}>
                <ListItemText primary={country} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider sx={{ my: 2 }} /> */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                border: '1px solid var(--light-stroke)',
                p: 1.5,
                overflow: 'hidden',
              }}
            >
              <Typography fontWeight="500" fontSize={18}>
                QR Installation
              </Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: updatedQrInstallation,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                border: '1px solid var(--light-stroke)',
                p: 1.5,
                overflow: 'hidden',
              }}
            >
              <Typography fontWeight="500" fontSize={18}>
                Manual Installation
              </Typography>
              <Box>
                <div
                  dangerouslySetInnerHTML={{
                    __html: updateManualInstallation,
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* Installation Instructions */}
      </Box>
    </Box>
  );
};

export default TechnicalDetails;
