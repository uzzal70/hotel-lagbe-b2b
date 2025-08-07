import {
  Button,
  Typography,
  Grid,
  Modal,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
} from '@mui/material';
import { useState } from 'react';

const DownloadBookingConfirmation = ({ open, item, onHide }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    borderRadius: '10px',
  };

  return (
    <Modal open={open}>
      <Box sx={{ ...style, width: { xs: '90%', sm: '60%', md: '500px' } }}>
        <Typography
          sx={{
            backgroundColor: 'var(--gray)',
            fontSize: { xs: 12, lg: 18 },
            borderRadius: '10px',
            px: { xs: 2, md: 3 },
            py: { xs: 1, md: 1.5 },
            color: 'var(--primary)',
          }}
        >
          Download Booking Confirmation
        </Typography>

        <Box
          sx={{
            px: { xs: 2, md: 3 },
            py: { xs: 1, md: 1 },
            mb: 2,
          }}
        >
          {/* Radio Buttons for "Absolute" and "Percentage" */}
          <RadioGroup value={selectedOption} onChange={handleRadioChange} row>
            <FormControlLabel
              value="absolute"
              control={
                <Radio
                  sx={{
                    '&.Mui-checked': {
                      color: 'var(--primary)', // Change checked radio color
                    },
                    '& .MuiSvgIcon-root': {
                      borderRadius: '50%', // Round background
                      padding: '3px', // Padding for the radio button circle
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: 13,
                    color: 'var(--primary)',
                    fontWeight: 300,
                  }}
                >
                  Absolute
                </Typography>
              }
            />
            <FormControlLabel
              value="percentage"
              control={
                <Radio
                  sx={{
                    '&.Mui-checked': {
                      color: 'var(--primary)', // Change checked radio color
                    },
                    '& .MuiSvgIcon-root': {
                      borderRadius: '50%', // Round background
                      padding: '3px', // Padding for the radio button circle
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: 13,
                    color: 'var(--primary)',
                    fontWeight: 300,
                  }}
                >
                  Percentage
                </Typography>
              }
            />
          </RadioGroup>

          {/* Price Input Field */}
          <Box
            sx={{
              input: {
                padding: '10px 10px',
                fontSize: 14,
                border: '1px solid var(--stroke)',
                fontWeight: 400,
                width: '100%',
                boxSizing: 'border-box',
                outline: 'none',
              },
            }}
            className="custom-input"
          >
            <label>
              Price <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter price"
              style={{ width: '100%', padding: '10px', fontSize: '14px' }}
            />
          </Box>

          {/* Additional Information */}
          <Box mt={1}>
            <Typography
              sx={{ fontSize: 12, fontWeight: 300, color: 'var(--primary)' }}
            >
              This amount will be added to Fees & Surcharges
            </Typography>
            <hr />
            <Typography color="var(--primary)" fontSize={{ xs: 13, md: 14 }}>
              Payment Details
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Box sx={{ fontSize: { xs: 11, md: 13, color: '#5A6573' } }}>
                Base Charges
              </Box>

              <Box sx={{ fontSize: { xs: 11, md: 13, color: '#5A6573' } }}>
                BDT 5000
              </Box>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Box sx={{ fontSize: { xs: 11, md: 13, color: '#5A6573' } }}>
                Fees & Surcharges
              </Box>

              <Box sx={{ fontSize: { xs: 11, md: 13, color: '#5A6573' } }}>
                BDT 350
              </Box>
            </Stack>
            <hr />
            <Stack direction="row" justifyContent="space-between">
              <Box
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: 11, md: 13, color: 'var(--primary)' },
                }}
              >
                Total Charge
              </Box>

              <Box
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: 11, md: 13, color: 'var(--primary)' },
                }}
              >
                BDT 5350
              </Box>
            </Stack>

            <Stack direction="row" mt={2} gap={2} justifyContent="end">
              <Button
                onClick={onHide}
                sx={{
                  backgroundColor: 'var(--orengel)',
                  fontSize: 10,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'var(--orengel)', // Change color
                    opacity: 0.8, // Slight transparency
                  },
                }}
              >
                Close
              </Button>

              <Button
                sx={{
                  backgroundColor: 'var(--primary)',
                  fontSize: 10,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'var(--primary)', // Change color
                    opacity: 0.8, // Slight transparency
                  },
                }}
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DownloadBookingConfirmation;
