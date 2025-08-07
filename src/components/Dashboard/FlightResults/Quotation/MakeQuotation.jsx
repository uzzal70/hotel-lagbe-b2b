/* eslint-disable react/prop-types */
import { Box, Modal } from '@mui/material';
import { useState } from 'react';
import QuotationFlightItinerary from './QuotationFlightItinerary';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  border: 'none',
  boxShadow: 24,
  borderRadius: '6px',
};

const MakeQuotation = ({ selected }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box
        // sx={{
        //   background: 'var(--light-gray)',
        //   position: 'fixed',
        //   bottom: '0',
        //   bgcolor: 'var(--primary)',
        //   width: '100%',
        //   color: 'var(--white)',
        //   display: 'flex',
        //   justifyContent: 'center',
        //   alignContent: 'center',
        //   py: 1.5,
        //   cursor: 'pointer',
        // }}
        onClick={() => setOpen(true)}
      >
        Make Quotation
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            ...style,
            minWidth: { xs: '80%', sm: '50%', md: '50%' },
            minHeight: { xs: '50%', sm: '50%', md: '50vh' },
            maxHeight: { xs: '60%', sm: '50%', md: '80vh' },
          }}
        >
          <Box
            sx={{
              overflowY: 'scroll',
              minHeight: { xs: '50%', sm: '45%', md: '50vh' },
              maxHeight: { xs: '60%', sm: '50%', md: '80vh' },
            }}
          >
            <Box
              sx={{
                color: 'var(--primary)',
                fontWeight: 500,
                fontSize: { xs: 14, md: 16 },
                bgcolor: 'var(--white)',
                p: 1,
                mb: 2,
                position: 'sticky',
                top: 0,
                zIndex: 2,
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              }}
            >
              Make Quotation Flight Details
            </Box>
            <Box
              sx={{
                px: { xs: 1, md: 2 },
                zIndex: 1,
                position: 'relative',
              }}
            >
              {selected &&
                selected?.map((item, i) => (
                  <QuotationFlightItinerary
                    key={i}
                    segmentData={item.segments}
                    data={item}
                    selectedIndex={i}
                    selected={selected}
                  />
                ))}
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default MakeQuotation;
