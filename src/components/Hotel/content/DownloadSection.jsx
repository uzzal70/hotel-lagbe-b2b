/* eslint-disable react/prop-types */
import { Button, Box } from '@mui/material';
// import hotel from '../../../assets/images/hotel';
// import DownloadBookingConfirmation from './DownLoadBookingConfirmation';
import { useState } from 'react';

const DownloadSection = () => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);

  const handleModelOpne = (item, id) => {
    setItem(item);
    setOpen(id);
  };
  return (
    <>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
        gap={{ xs: 1, md: 3 }}
        p={2}
        sx={{ backgroundColor: 'white', borderRadius: '8px', mb: 2 }}
      >
        <DownloadButton label=" Voucher" subLabel="With Price" />
        <DownloadButton
          label=" Voucher"
          subLabel="Without Price"
          onClick={() => handleModelOpne('', 1)}
        />
        <DownloadButton label="Invoice" subLabel="" />
      </Box>
      {/* <DownloadBookingConfirmation
        open={open}
        item={item}
        onHide={() => setOpen(false)}
      /> */}
    </>
  );
};

const DownloadButton = ({ label, subLabel, onClick }) => {
  return (
    <Button
      // startIcon={<img src={hotel.download} alt="voucher download" />}
      sx={{
        display: 'flex',
        color: '#12296c',
        textTransform: 'none',
        fontWeight: 500,
        gap: 1,
        backgroundColor: 'var(--gray)',
        px: 2,
      }}
      onClick={onClick}
    >
      <Box>
        <span>{label}</span>
      </Box>
      <Box>
        <span style={{ fontSize: '10px', fontWeight: 300 }}> {subLabel}</span>
      </Box>
    </Button>
  );
};

export default DownloadSection;
