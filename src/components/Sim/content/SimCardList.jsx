/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import hotel from '../../../assets/images/hotel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Typography, Button, Stack, Grid, Collapse } from '@mui/material';
import { useSelector } from 'react-redux';
import TechnicalDetails from './TechnicalDetails';
import { useState } from 'react';
import { getPackageDetails } from '../../Utils/getPackageDetails';
import companyInfo from '../../../common/companyInfo';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
const commonBoxStyle = {
  // border: '1px solid var(--stroke)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};
const SimCard = ({ key, item }) => {
  const navigate = useNavigate();
  const totalSimCards = useSelector((state) => state.simCards.count);

  const { title, limit, perDayPackage, totalPackage, unLimited } =
    getPackageDetails(item);

  const [open, setOpen] = useState(false);

  const handleModelOpne = () => {
    setOpen(!open);
  };
  return (
    <Box
      sx={{
        border: '1px solid var(--stroke)',
        mb: 1.5,
        borderRadius: 2.5,
        overflow: 'hidden',
        bgcolor: 'var(--white)',
      }}
    >
      <Grid container spacing={{ xs: 1, md: 1.5 }} alignItems="stretch">
        <Grid item xs={4} sm={3} md={2.5}>
          <Box
            sx={{
              height: { xs: 70, sm: 100, md: 110 }, // Ensuring height is consistent
              p: 1,
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
        <Grid item xs={8} sm={9} md={7}>
          <Box
            sx={{
              ...commonBoxStyle,
              py: 0.5,
              position: 'relative',
            }}
          >
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display={'flex'} alignItems="center" sx={{ gap: 1 }}>
                  <img src={hotel.pack} alt="" width={14} height={12} />
                  <Typography
                    sx={{
                      color: 'var(--black)',
                      fontWeight: 500,
                      fontSize: { xs: 12, md: 16 },
                      marginRight: 1,
                    }}
                    noWrap
                  >
                    {item.title}
                  </Typography>
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
                  {item?.coverages?.length > 1
                    ? `( ${item?.operatorTitle} )`
                    : ''}
                </Typography>{' '}
              </Stack>
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
                  {item?.operatorType === 'local'
                    ? 'Automatic, when you arrive in' +
                        ' ' +
                        item?.countryTitle || ''
                    : 'Automatic, wherever you are!'}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={2.5}>
          <Box
            sx={{
              ...commonBoxStyle,
              justifyContent: 'space-between',
              p: 1,
              position: 'relative',
            }}
          >
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
              }}
            >
              <Box>
                <Box
                  bgcolor="white"
                  sx={{ display: { xs: 'block', md: 'block' } }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: '',
                      alignItems: 'center',
                      fontSize: 12,
                      color: '#009045',
                    }}
                  >
                    <img src={hotel.trip} alt="" width={13} height={13} />+
                    {(
                      (parseFloat(item?.netPrice) * totalSimCards || 1) / 10
                    ).toFixed(2)}
                  </div>
                </Box>
              </Box>
            </Box>
            <Stack direction="column" justifyContent="flex-end" spacing={0.5}>
              <Box
                sx={{
                  display: { xs: 'none', md: 'block' },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 14, md: 16 },
                    color: 'var(--primary)',
                    fontWeight: 500,
                    textAlign: 'end',
                  }}
                >
                  {companyInfo.currencyCode}{' '}
                  {(parseFloat(item?.netPrice) * totalSimCards || 1).toFixed(2)}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 10, md: 11 },
                    fontWeight: 300,
                    textAlign: 'end',
                    mt: -0.5,
                  }}
                >
                  Price for {totalSimCards || 1} Sim
                </Typography>
              </Box>

              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                spacing={1}
                alignItems={'center'}
              >
                <Button
                  sx={{
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: 300,
                    fontSize: { xs: 10 },
                    backgroundColor: '#ebebfc',
                    color: 'var(--secondary)',
                    textTransform: 'capitalize',
                    '&:hover': { backgroundColor: 'var(--secondary)' },
                    width: 'fit-content',
                  }}
                  onClick={() => handleModelOpne()}
                >
                  Details
                </Button>
                <Box
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 14, md: 16 },
                      color: 'var(--primary)',
                      fontWeight: 500,
                      textAlign: 'end',
                    }}
                  >
                    {companyInfo.currencyCode}{' '}
                    {(parseFloat(item?.netPrice) * totalSimCards || 1).toFixed(
                      2
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: 10, md: 11 },
                      fontWeight: 300,
                      textAlign: 'end',
                      mt: -0.5,
                    }}
                  >
                    Price for {totalSimCards || 1} Sim
                  </Typography>
                </Box>
                <Button
                  sx={{
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: 300,
                    fontSize: 10,
                    backgroundColor: 'var(--primary)',
                    color: '#fff',
                    textTransform: 'capitalize',
                    '&:hover': { backgroundColor: 'var(--secondary)' },
                    width: 'fit-content',
                  }}
                  onClick={() => {
                    navigate(`${item?.id}`, { state: { item } });
                  }}
                >
                  Select &nbsp;{' '}
                  <ArrowForwardIosIcon color="white" sx={{ fontSize: 10 }} />
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Collapse in={open}>
          <Box
            sx={{
              p: 1,
            }}
          >
            <TechnicalDetails data={item} items={item} itemss={item} />
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

const SimCardList = ({ fData }) => {
  const sortedData = fData?.sort(
    (a, b) => parseFloat(a?.netPrice) - parseFloat(b?.netPrice)
  );

  return (
    <Box>
      {sortedData?.map((itemss, i) => (
        <Box key={i}>
          <SimCard key={itemss?.id} item={itemss} />
        </Box>
      ))}
    </Box>
  );
};

export default SimCardList;
