import { Box, Grid, Typography } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
import companyInfo from '../../../common/companyInfo';

const ContactInformation = ({
  contact,
  setContact,
  contactErrors,
  setContactErrors,
}) => {
  const handlePhoneChange = (value, country) => {
    const dialCode = country.dialCode;

    // Remove the dial code from the start of the value
    const localNumber = value.startsWith(dialCode)
      ? value.slice(dialCode.length)
      : value;

    setContact((prev) => ({
      ...prev,
      code: dialCode,
      phone: localNumber,
    }));

    // Clear phone error on typing
    setContactErrors((prev) => ({ ...prev, phone: '' }));
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setContact((prev) => ({ ...prev, email: value }));

    // Clear email error on typing
    setContactErrors((prev) => ({ ...prev, email: '' }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mb: 2,
        padding: { xs: 1, md: 2 },
        py: 1,
        rounded: 1,
        borderColor: '#DADFE6',
        bgcolor: 'var(--white)',
        borderRadius: '10px',
        // mx: { xs: 0.5, md: 'unset' },
        position: 'relative',
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Typography
          sx={{
            color: 'var(--primary)',
            fontWeight: 500,
            fontSize: { xs: 12, md: 16 },
          }}
        >
          Contact Information
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'var(--green-light)',
            fontSize: { xs: 11, md: 13 },
            mb: 1,
          }}
        >
          *{companyInfo.companyName} does not send communications to this mobile
          number or email ID; it is used only for hotel communication.
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={4.5} md={4.5}>
            <Box
              sx={{
                '.special-label': { display: 'none' },
                input: {
                  p: '10px 15px',
                  border: '1px solid var(--stroke) !important',
                  width: '100% !important',
                },
              }}
              className="custom-input"
            >
              <label htmlFor="phone">
                Mobile number <span style={{ color: 'red' }}>*</span>
              </label>
              <PhoneInput
                country={'bd'}
                value={contact.code + contact.phone}
                onChange={handlePhoneChange}
                enableSearch={true}
                countryCodeEditable={false}
                inputProps={{
                  required: true,
                  name: 'phone',
                  id: 'phone',
                }}
                containerClass="custom-phone-input"
                dropdownClass="custom-dropdown"
              />
              {contactErrors?.phone && (
                <Typography variant="caption" color="error">
                  {contactErrors.phone}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={4.5}>
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
                Email <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="email"
                value={contact.email}
                onChange={handleEmailChange}
                placeholder="Enter email"
                style={{ width: '100%', padding: '10px', fontSize: '14px' }}
              />
              {contactErrors?.email && (
                <Typography variant="caption" color="error">
                  {contactErrors.email}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContactInformation;
