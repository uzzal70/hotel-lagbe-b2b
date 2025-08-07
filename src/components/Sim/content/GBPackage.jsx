import hotel from '../../../assets/images/hotel';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { getPackageDetails } from '../../Utils/getPackageDetails';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
const GBPackage = ({ item }) => {
  // const { title, limit, perDayPackage, totalPackage, unLimited } =
  //   getPackageDetails(item);

  return (
    <>
      <Grid
        container
        sx={{
          rounded: 1,
          bgcolor: 'var(--white)',
          borderRadius: '10px',
          mb: 1.5,
        }}
      >
        {/* Left Side - Package Details */}
        <Grid item xs={9} md={9}>
          <Box sx={{ p: { xs: 1.5, sm: 2, lg: 2 } }}>
            {/* Title */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
                <img src={hotel.pack} alt="package" width={12} height={12} />
                <Typography
                  sx={{
                    color: 'var(--black)',
                    fontWeight: 500,
                    fontSize: { xs: 12, md: 16 },
                    marginRight: 1,
                  }}
                >
                  {item?.title || `${item?.data} - ${item?.validity} Days`}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Box>
                    <Typography sx={{ fontSize: 10, color: 'var(--info)' }}>
                      {item?.operatorTitle}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>

            {/* Restriction */}
            <Stack
              direction="row"
              spacing={5}
              alignItems="center"
              mb={0.5}
              sx={{
                mt: { xs: 0, md: 1 },
                fontWeight: 300,
                fontSize: { xs: 10, md: 12 },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <PhoneInTalkIcon
                  sx={{
                    fontSize: 14,
                  }}
                />{' '}
                Call: {item?.voice ? `${item?.voice} Minutes` : 'N/A'}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <SmsOutlinedIcon
                  sx={{
                    fontSize: 14,
                  }}
                />{' '}
                TEXT: {item?.text ? `${item?.text} SMS` : 'N/A'}
              </Box>
            </Stack>

            {/* World */}
            {item?.coverages && (
              <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                <img
                  src={`https://airalo.com/images/${item?.countryFlag}`}
                  alt=""
                  width={14}
                  // height={12}
                />
                <Typography
                  sx={{
                    color: 'var(--black)',
                    fontWeight: 300,
                    fontSize: { xs: 10, md: 12 },
                  }}
                  noWrap
                >
                  Coverage:{' '}
                  {item?.coverages?.length > 1
                    ? `${item?.coverages?.length} countries`
                    : item?.title}{' '}
                  {item?.coverages?.length > 1 ? `(${item?.title})` : ''}
                </Typography>{' '}
              </Stack>
            )}

            {/* Plan */}
            <Stack direction="row" spacing={1}>
              <img
                src={hotel.plan}
                alt=""
                width={14}
                height={12}
                style={{ marginTop: '2px' }}
              />
              <Typography
                sx={{
                  fontWeight: 300,
                  fontSize: { xs: 10, md: 12 },
                  gap: 0.5,
                  color: '#6D48E5',
                }}
                noWrap
              >
                <span>Plan activation</span>: &nbsp;
                {/* {item?.operatorType === 'local' || item?.packageType === 'local'
                  ? 'Automatic, when you arrive in' + ' ' + item?.country
                    ? item?.country
                    : item?.countryTitle
                  : 'Automatic, wherever you are!'} */}
                {item?.operatorType === 'local' || item?.packageType === 'local'
                  ? `Automatic, when you arrive in ${
                      item?.country || item?.countryTitle
                    }`
                  : 'Automatic, wherever you are!'}
              </Typography>
            </Stack>

            {/* activation */}
          </Box>
        </Grid>

        {/* Right Side - Image */}

        <Grid item xs={3} md={3} justifyContent="end" display="flex">
          <Box
            sx={{
              pt: 2,
              pr: 2,
              pb: { xs: 1, md: 2 },
              height: { xs: 70, sm: 100, md: 110 }, // Ensuring height is consistent
            }}
          >
            <img
              src={`https://airalo.com/images/${item?.operatorLogo}`}
              alt=""
              style={{
                maxWidth: '100%',
                height: '100%',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default GBPackage;
