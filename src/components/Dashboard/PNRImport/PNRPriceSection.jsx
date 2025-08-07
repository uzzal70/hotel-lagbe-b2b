import { Box, Collapse, Stack, Typography } from '@mui/material';
import webpImport from '../../../assets/webpImport';
import { useState } from 'react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CustomButton from '../../Common/CustomButton';
import commaNumber from 'comma-number';
import companyInfo from '../../../common/companyInfo';

const PNRPriceSection = () => {
  const price = [
    {
      type: 'ADT',
      basePrice: '5000',
      taxPrice: '484',
      netPrice: '45454',
      pCount: 2,
    },
    {
      type: 'CNN',
      basePrice: '4000',
      taxPrice: '545',
      netPrice: '34805',
      pCount: 1,
    },
    {
      type: 'INF',
      basePrice: '3000',
      taxPrice: '554',
      netPrice: '52465',
      pCount: 1,
    },
  ];
  const [expand, setExpand] = useState({});
  const [selectedProviders, setSelectedProviders] = useState([]);

  const handleClick = (key) => {
    setExpand((prevExpand) => ({
      ...prevExpand,
      [key]: !prevExpand[key],
    }));
  };

  const handleCheckboxChange = () => {
    setSelectedProviders((prevSelectedProviders) => {
      if (prevSelectedProviders.includes('agree')) {
        // Remove 'agree' if it's already present
        return prevSelectedProviders.filter((provider) => provider !== 'agree');
      } else {
        // Add 'agree' if it's not present
        return [...prevSelectedProviders, 'agree'];
      }
    });
  };

  return (
    <Box>
      <Box
        sx={{
          mb: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            fontSize: { xs: 14, sm: 16 },
            color: 'var(--black)',
            bgcolor: 'var(--gray)',
            py: 1,
            px: 2,
          }}
          alignItems="center"
        >
          <img src={webpImport.partial} alt="" height="20px" />
          <Box>Partial Payment Available</Box>
        </Stack>

        <Box
          sx={{
            px: 2,
            pb: { xs: 1, md: 2 },
            pt: { md: 1 },
            bgcolor: 'var(--white)',
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              fontSize: { xs: 12, md: 13 },
              color: 'var(--secondary)',
              pt: 1,
            }}
          >
            <Box>
              <Box>Minimum Payment</Box>
              <Box>Remaining Amount </Box>
            </Box>
            <Box>
              <Box>4000 BDT</Box>
              <Box>14000 BDT</Box>
            </Box>
          </Stack>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            fontSize: { xs: 13, sm: 14 },
            color: 'var(--black)',
            bgcolor: 'var(--gray)',
            py: 1,
            px: 2,
          }}
        >
          <Box>Total Payable (incl. All charges)</Box>
          <Box>14000 BDT</Box>
        </Stack>
      </Box>
      <Box
        sx={{
          mb: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            fontSize: { xs: 14, sm: 16 },
            color: 'var(--black)',
            bgcolor: 'var(--gray)',
            py: 1,
            px: 2,
            display: { xs: 'none', md: 'flex' },
          }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>Agent Price Summary</Box>
          <Stack direction="row" spacing={2}>
            <Stack direction="row" spacing={1}>
              <img src={webpImport.adult} alt="" style={{ height: 17 }} />
              <Typography sx={{ fontSize: 14, color: 'var(--secondary)' }}>
                2
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <img
                src={webpImport.child}
                alt=""
                style={{ height: 15, marginTop: '1px' }}
              />
              <Typography sx={{ fontSize: 14, color: 'var(--secondary)' }}>
                2
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <img src={webpImport.infant} alt="" style={{ height: 10 }} />
              <Typography sx={{ fontSize: 14, color: 'var(--secondary)' }}>
                2
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Box
          sx={{
            px: 2,
            pb: { xs: 1, md: 2 },
            pt: { md: 1 },
            bgcolor: 'var(--white)',
          }}
        >
          {price.map((data, index) => (
            <Box key={index}>
              <Stack
                direction="row"
                sx={{
                  fontSize: { xs: 12, md: 13 },
                  alignItems: 'center',
                  color: 'var(--primary)',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
                onClick={() => handleClick(data.type)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Traveller {data.pCount} (
                  {data.type === 'ADT'
                    ? 'Adult'
                    : data.type === 'CNN'
                    ? 'Child'
                    : 'Infant'}
                  )
                  <KeyboardArrowDownOutlinedIcon
                    sx={{
                      color: 'var(--primary)',
                      fontSize: 16,
                      transition: 'transform 0.3s ease-in-out',
                      transform: `rotate(${expand[data.type] ? 180 : 0}deg)`,
                    }}
                  />
                </Box>
                <Box>{commaNumber(data.netPrice)} BDT</Box>
              </Stack>
              <Collapse in={expand[data.type]}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{
                    fontSize: { xs: 12, md: 13 },
                    color: 'var(--secondary)',
                    py: 1,
                  }}
                >
                  <Box>
                    <Box>Base Price</Box>
                    <Box>Tax fee</Box>
                  </Box>
                  <Box>
                    <Box>{commaNumber(data.basePrice)} BDT</Box>
                    <Box>{commaNumber(data.taxPrice)} BDT</Box>
                  </Box>
                </Stack>
              </Collapse>
            </Box>
          ))}
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              fontSize: { xs: 12, md: 13 },
              color: 'var(--secondary)',
              pt: 1,
            }}
          >
            <Box>
              <Box>Discount</Box>
              <Box>Service fee </Box>
              <Box>AIT</Box>
            </Box>
            <Box>
              <Box>4000 BDT</Box>
              <Box>10000 BDT</Box>
              <Box>14000 BDT</Box>
            </Box>
          </Stack>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            fontSize: { xs: 13, sm: 14 },
            color: 'var(--black)',
            bgcolor: 'var(--gray)',
            py: 1,
            px: 2,
          }}
        >
          <Box>Total Payable (incl. All charges)</Box>
          <Box>14000 BDT</Box>
        </Stack>
      </Box>
      <Box sx={{ m: 2, label: { color: 'var(--primary)' } }}>
        <div className="custom-checkbox">
          <input
            type="checkbox"
            id="agree"
            checked={selectedProviders.includes('agree')}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="agree">
            By Booking/Issuing this Ticket I agree to {companyInfo.companyName} Terms &
            Conditions
          </label>
        </div>
      </Box>

      <Box sx={{ m: 2, label: { color: 'var(--primary)' } }}>
        <CustomButton
          type="submit"
          value="Confirm Import"
          textcolor="var(--white)"
          bgcolor="var(--primary)"
          hovercolor="var(--primary)"
          padding="5px 20px"
          width={{ xs: '100%' }}
          //   handleClick={handleReissueRequestSubmit}
        />
      </Box>
    </Box>
  );
};

export default PNRPriceSection;
