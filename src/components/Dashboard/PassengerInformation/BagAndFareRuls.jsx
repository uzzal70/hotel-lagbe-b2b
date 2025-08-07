import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import ImageImport from '../../../assets/ImageImport';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Contact from '../../Common/Contact';
import companyInfo from '../../../common/companyInfo';

const BagAndFareRuls = () => {
  const [alignment, setAlignment] = useState(
    window.innerWidth > 800 ? 'Baggage' : ''
  );
  const cancellation = [
    {
      c1: `Ticket Cancel Fee = Airline's Fee + ${companyInfo.companyName} Fee`,
    },
    {
      c1: `Refund Amount = Airlines Paid Amount - ${companyInfo.companyName} Fee`,
    },
    {
      c1: `Ticket Cancel Fee = Airline's Fee + ${companyInfo.companyName} Fee`,
    },
  ];
  const buttons = [
    { label: 'Baggage', value: 'Baggage' },
    { label: 'Fare Rules', value: 'FareRules' },
    { label: 'Contact', value: 'Contact' },
  ];

  const handleChange = (newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box>
      <Box my={{ xs: 1 }}>
        <Box
          sx={{
            button: {
              textTransform: 'capitalize',
              fontWeight: 400,
              fontSize: { xs: 12 },
              px: { xs: 1, sm: 2 },
              borderRadius: '5px',
            },
          }}
        >
          <Stack direction="row" spacing={{ xs: 1, sm: 1 }}>
            {buttons.map((button, index, arr) => (
              <Button
                key={button.value}
                onClick={() => handleChange(button.value)}
                sx={{
                  display: { md: index === arr.length - 1 ? 'none' : 'unset' },
                  width: '100%',
                  bgcolor:
                    alignment === button.value
                      ? 'var(--primary)'
                      : 'var(--bgcolor)',
                  color:
                    alignment === button.value
                      ? 'var(--white)'
                      : 'var(--primary)',
                  '&:hover': {
                    bgcolor:
                      alignment === button.value
                        ? 'var(--primary)'
                        : 'var(--bgcolor)',
                  },
                }}
              >
                {button.label}
              </Button>
            ))}
          </Stack>
        </Box>
        <Box mt={1}>
          {alignment === 'Baggage' && (
            <Box
              sx={{
                bgcolor: 'var(--white)',
                p: { xs: 1, md: 0 },
                borderRadius: '5px',
              }}
            >
              <Typography
                sx={{
                  color: 'var(--black)',
                  fontSize: { xs: 12, md: 16 },
                  fontWeight: 400,
                }}
              >
                Baggage allowance
              </Typography>
              <Stack direction="row" spacing={1} pt={2}>
                <Box pt={0.5}>
                  <CheckIcon
                    sx={{
                      color: 'var(--dark-green)',
                      bgcolor: 'var(--green)',
                      borderRadius: '50%',
                      fontSize: 18,
                      p: 0.5,
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: 'var(--tertiary)',
                      fontSize: { xs: 12 },
                    }}
                  >
                    7kg cabin baggage
                  </Typography>
                  <Typography
                    sx={{
                      color: 'var(--secondary)',
                      fontSize: { xs: 12 },
                    }}
                  >
                    1 piece
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1} pt={1}>
                <Box pt={0.5}>
                  <ClearIcon
                    sx={{
                      color: 'var(--dark-orenge)',
                      bgcolor: 'var(--orenge)',
                      borderRadius: '50%',
                      fontSize: 18,
                      p: 0.5,
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    color: 'var(--tertiary)',
                    fontSize: { xs: 12 },
                  }}
                >
                  Checked in baggage not included
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} pt={1}>
                <Box pt={0.5}>
                  <CheckIcon
                    sx={{
                      color: 'var(--dark-green)',
                      bgcolor: 'var(--green)',
                      borderRadius: '50%',
                      fontSize: 18,
                      p: 0.5,
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    color: 'var(--tertiary)',
                    fontSize: { xs: 12 },
                  }}
                >
                  Extra checked in baggage can be purchased in next step
                </Typography>
              </Stack>
            </Box>
          )}
          {alignment === 'FareRules' && (
            <Box
              sx={{
                bgcolor: 'var(--white)',
                p: { xs: 1, md: 0 },
                borderRadius: '5px',
              }}
            >
              <Typography
                sx={{
                  color: 'var(--black)',
                  fontSize: { xs: 12, md: 16 },
                  fontWeight: 400,
                  mb: 1,
                }}
              >
                Cancellation Policy
              </Typography>
              {cancellation.map((item, i) => (
                <Box key={i} my={1}>
                  <Typography
                    sx={{
                      color: 'var(--tertiary)',
                      fontSize: { xs: 12 },
                      textTransform: 'lowercase',
                    }}
                  >
                    <img src={ImageImport.arrow} style={{ width: 9 }} alt="" />
                    &nbsp;&nbsp;{item.c1}
                  </Typography>
                </Box>
              ))}
              <Typography
                sx={{
                  color: 'var(--black)',
                  fontSize: { xs: 12, md: 16 },
                  fontWeight: 500,
                  mt: 2,
                  mb: 1,
                }}
              >
                Re-issue
              </Typography>
              <Typography
                sx={{ color: 'var(--tertiary)', fontSize: { xs: 12 } }}
              >
                <img src={ImageImport.arrow} style={{ width: 9 }} alt="" />
                &nbsp;&nbsp;Re-Issuing Fee = Airline&apos;s Fee + Fare
                Difference + {companyInfo.companyName} Fee
              </Typography>
            </Box>
          )}
          {alignment === 'Contact' && (
            <Box
              sx={{
                bgcolor: 'var(--white)',
                p: { xs: 1, md: 0 },
                borderRadius: '5px',
              }}
            >
              <Contact />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BagAndFareRuls;
