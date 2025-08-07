/* eslint-disable react/prop-types */
import { Box, Button, Grid, Typography } from '@mui/material';
import HandshakeIcon from '@mui/icons-material/Handshake';
import companyInfo from '../../common/companyInfo';

const title = {
  color: 'var(--secondary)',
  fontSize: { xs: 12, md: 14 },
  fontWeight: 300,
};
const value = { color: 'var(--primary)', fontSize: { xs: 12, md: 14 } };
const InsuranceResultCard = ({ item, handleDetails }) => {
  const imageUrl = item?.insurance_company?.image?.[0]?.media?.[0]?.url;
  return (
    <Box
      sx={{
        backgroundColor: 'var(--white)',
        borderRadius: '5px',
        padding: { xs: 1, md: 2 },
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }}
    >
      <Grid container>
        <Grid item xs={12} md={handleDetails ? 9 : 12}>
          <Box
            sx={{
              img: {
                width: { xs: 50, md: 100 },
                minHeight: { xs: 25, md: 55 },
                maxHeight: { xs: 40, md: 80 },
                border: '1px solid var(--stroke)',
                borderRadius: '5px',
              },
            }}
          >
            <Grid container>
              <Grid item xs={6} md={2.5}>
                <Box>
                  {imageUrl ? (
                    <img src={imageUrl} alt="Bima" />
                  ) : (
                    <Box
                      sx={{
                        border: '1px solid var(--stroke)',
                        borderRadius: '5px',
                        width: { xs: 50, md: 100 },
                        minHeight: { xs: 25, md: 50 },
                        maxHeight: { xs: 40, md: 80 },
                      }}
                    >
                      <Box textAlign={'center'} pt={1}>
                        <HandshakeIcon
                          sx={{
                            color: 'var(--stroke)',
                            fontSize: { xs: 25, md: 40 },
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box>
                  <Typography sx={title}>Insurance Company </Typography>
                  <Typography sx={value}>
                    {item?.insurance_company?.display_name || 'Company Name'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box>
                  <Typography sx={title}>Insurance Coverage </Typography>
                  <Typography sx={value}>
                    {item?.coverage_text || 'Amount'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3.5}>
                <Box>
                  <Typography sx={title}>Plane Title </Typography>
                  <Typography sx={value}>{item?.plan_name}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {handleDetails && (
          <Grid item xs={12} md={3} mt={{ xs: 1, md: 0 }}>
            <Box
              sx={{
                bgcolor: 'var(--body)',
                textAlign: 'center',
                display: 'flex',
                justifyContent: { xs: 'space-between', md: 'center' },
                alignItems: 'center',
                height: '100%',
                p: { xs: 1, md: 1 },
                gap: 2,
                color: 'var(--dark-green)',
              }}
            >
              <Box>
                <Box
                  sx={{
                    fontSize: 12,
                    color: 'var(--secondary)',
                    textDecorationLine: 'line-through',
                  }}
                >
                  <span>{item.gross_premium || 0}</span>{' '}
                  {companyInfo.currencyType}
                </Box>
                <Box
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {parseInt(item?.priceAfterDiscount)}{' '}
                  {companyInfo.currencyType}
                </Box>
              </Box>
              <Box>
                <Button
                  size="small"
                  sx={{
                    color: 'var(--white)',
                    bgcolor: 'var(--primary)',
                    '&:hover': {
                      bgcolor: 'var(--primary)',
                    },
                  }}
                  onClick={() => handleDetails(item)}
                >
                  Select
                </Button>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default InsuranceResultCard;
