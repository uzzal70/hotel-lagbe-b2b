/* eslint-disable react/prop-types */
import { Box, Stack } from '@mui/material';
import { useState } from 'react';
import CustomButton from '../../Common/CustomButton';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import CustomCollapse from '../../Common/CustomCollapse';
import { useNavigate } from 'react-router-dom';

const Download = ({ data, agentData }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  const id = data?.id;
  const status = data?.status;

  const handlePdfDetails = (text) => {
    const routeUrl = `/dashboard/download/${id}?${text}`;
    localStorage.setItem(
      'pdfDetails',
      JSON.stringify({
        id: id,
        agentData: agentData,
      })
    );
    navigate(routeUrl);
  };

  const menuItemStyle = {
    '&:hover': {
      bgcolor: 'var(--bgcolor)',
    },
    px: 2,
    py: 1,
    borderBottom: '1px solid var(--bgcolor)',
    cursor: 'pointer',
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <CustomButton
        fontSize={{ xs: 12, md: 14 }}
        value="Voucher Download"
        textcolor="var(--white)"
        bgcolor="var(--pest)"
        hovercolor="var(--pest)"
        width="100%"
        padding={{ xs: '3px 10px', md: '4px 15px' }}
        borderRadius="5px"
        startIcon={<SimCardDownloadIcon style={{ fontSize: '14px' }} />}
        border="1px solid var(--pest)"
        handleClick={handleToggle}
      />
      <CustomCollapse isOpen={open} onToggle={handleToggle}>
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            right: 0,
            bgcolor: 'var(--white)',
            width: '100%',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
            borderRadius: '5px',
          }}
        >
          <Stack direction="column" justifyContent="end">
            {(status === 'TICKETED' || status === 'MANUAL_TICKETED') && (
              <>
                <Box
                  sx={menuItemStyle}
                  onClick={() => handlePdfDetails('E-Ticket')}
                >
                  E-Ticket
                </Box>
                <Box
                  sx={menuItemStyle}
                  onClick={() => handlePdfDetails('Agent Invoice')}
                >
                  Agent Invoice
                </Box>
              </>
            )}
            {status === 'REISSUE_COMPLETED' && (
              <>
                <Box
                  sx={menuItemStyle}
                  onClick={() => handlePdfDetails('E-Ticket')}
                >
                  Re-issue Voucher
                </Box>
              </>
            )}

            <Box
              sx={menuItemStyle}
              onClick={() => handlePdfDetails('Customer Invoice')}
            >
              {status === 'TICKETED' || status === 'MANUAL_TICKETED'
                ? 'Customer'
                : 'Booking'}{' '}
              Invoice
            </Box>
          </Stack>
        </Box>
      </CustomCollapse>
    </Box>
  );
};

export default Download;
