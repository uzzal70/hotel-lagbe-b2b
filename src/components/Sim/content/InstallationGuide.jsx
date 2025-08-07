import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
} from '@mui/material';

const InstallationGuide = ({ data, data1 }) => {
  return (
    <Box
      sx={{
        padding: 2,
        pt: 3,
        maxWidth: '800px',
        margin: 'auto',
        backgroundColor: '#fff',
        borderRadius: 2,
      }}
    >
      {data ? (
        <Box
          sx={{
            p: {
              fontWeight: 400,
              fontSize: 13,
            },
            b: {
              fontWeight: 400,
            },
          }}
        >
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
                  QR Code Installation
                </Typography>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data,
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
                      __html: data1,
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            bgcolor="var(--gray-light)"
            sx={{
              fontSize: { xs: 12, md: 16 },
              px: 2,
              py: 1.2,
              color: 'var(--primary)',
              mb: -0.1,
              borderRadius: 1,
            }}
          >
            Installation Guide
          </Typography>
          <List>
            {[
              "Go to 'Settings' > 'Cellular/Mobile Data' > 'Add Data Plan' > Install eSIM",
              "Scan QR code or tap 'Enter Details Manually'",
              'Custom Label your eSIM (To identify your eSIM)',
              "Set 'Default line' as 'Primary' to receive call / SMS and 'Mobile Data' to use installed eSIM",
              'Update Access Point Names (APN), if needed (refer information above)',
              'Installation is completed!',
            ].map((step, index) => (
              <ListItem key={index} sx={{ py: 0 }}>
                <ListItemText
                  primary={`${index + 1}. ${step}`}
                  sx={{
                    span: {
                      fontSize: { xs: 10, lg: 13 },
                      color: 'var(--primary)',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontSize: { xs: 8, lg: 14 },
              px: 2,
              py: 1.2,
              color: 'var(--primary)',
              mb: -0.1,
              borderRadius: 1,
            }}
          >
            To use eSIM after installation/upon landing:
          </Typography>
          <List>
            {[
              "Go to 'Settings' > 'Cellular/Mobile Data' > Turn on your eSIM > Back to 'Cellular/Mobile Data' to refresh",
              "'Cellular/Mobile Data' > Select your eSIM > Turn on Data Roaming > Back to 'Cellular/Mobile Data' to refresh",
              "'Cellular/Mobile Data' > In Mobile Data > Select eSIM",
              "Turn off 'Allow Mobile Data switching' and disable 'Main Mobile Line Data Roaming' to avoid roaming charges on primary line",
            ].map((step, index) => (
              <ListItem key={index} sx={{ py: 0 }}>
                <ListItemText
                  primary={`• ${step}`}
                  sx={{
                    span: {
                      fontSize: { xs: 10, lg: 13 },
                      color: 'var(--primary)',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>

          <br />
          {/* Android Installation Guide */}
          <Typography
            variant="h5"
            gutterBottom
            bgcolor="var(--gray-light)"
            sx={{
              fontSize: { xs: 12, md: 16 },
              px: 2,
              py: 1.2,
              color: 'var(--primary)',
              mb: -0.1,
              borderRadius: 1,
            }}
          >
            Installation Guide (Android)
          </Typography>
          <List>
            {[
              "Go to 'Settings' > 'Network/Connections' > 'SIM manager'",
              "Tap '+ Add eSIM' > Scan Carrier QR code / Retrieve QR from file / Enter activation code",
              'Custom Label your eSIM (To identify your eSIM)',
              'Installation is completed!',
            ].map((step, index) => (
              <ListItem key={index} sx={{ py: 0 }}>
                <ListItemText
                  primary={`${index + 1}. ${step}`}
                  sx={{
                    span: {
                      fontSize: { xs: 10, lg: 13 },
                      color: 'var(--primary)',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>

          <br />
          <Typography
            variant="h5"
            gutterBottom
            bgcolor="var(--gray-light)"
            sx={{
              fontSize: { xs: 12, md: 16 },
              px: 2,
              py: 1.2,
              color: 'var(--primary)',
              mb: -0.1,
              borderRadius: 1,
            }}
          >
            To use eSIM after installation/upon landing:
          </Typography>
          <List>
            {[
              "Go to 'Settings' > 'Network/Connections' > 'SIM Manager' > Enable eSIM > Scroll bottom > 'Mobile Data' > select eSIM",
              "'Network/Connections' > 'Mobile network' > Enable 'Data roaming'",
              "'Network/Connections' > 'Mobile network' > Access Point Names > select/input APN (provided in PDF) as Name and APN",
            ].map((step, index) => (
              <ListItem key={index} sx={{ py: 0 }}>
                <ListItemText
                  primary={`• ${step}`}
                  sx={{
                    span: {
                      fontSize: { xs: 10, lg: 13 },
                      color: 'var(--primary)',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
          <br />

          {/* Important Notes */}
          <Typography
            variant="h5"
            gutterBottom
            bgcolor="var(--gray-light)"
            sx={{
              fontSize: { xs: 12, md: 16 },
              px: 2,
              py: 1.2,
              color: 'var(--red)',
              mb: -0.1,
              borderRadius: 1,
            }}
          >
            Important Notes:
          </Typography>
          <List>
            {[
              'Data validity starts immediately when eSIM QR is scanned / installed.',
              'You may install eSIM before traveling (before your flight) or, at destination when you need it. Stable internet is required for successful installation / activation (preferably WiFi – avoid airport WiFi as they may block eSIM installations).',
              'Fair Usage Policy (FUP) - Unlimited plan data speed will be reduced up to 128kbps once high speed data is used up.',
              'You can have different eSIM plans installed in your device.',
              "Save data by disabling 'autoplay', 'auto upload/sync' and enable 'Use less data' functions on social media and cloud storage.",
            ].map((note, index) => (
              <ListItem key={index} sx={{ py: 0 }}>
                <ListItemText
                  primary={`• ${note}`}
                  sx={{
                    span: {
                      fontSize: { xs: 10, lg: 13 },
                      color: index === 1 ? 'var(--orengel)' : 'var(--primary)',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      {/* iOS Installation Guide */}
    </Box>
  );
};

export default InstallationGuide;
