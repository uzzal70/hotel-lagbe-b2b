import { Box, Collapse } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { Calendar } from 'react-date-range';

const Modal = ({ index, handleClose, segment, arr, handleDepartDate }) => {
  const collapseRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked element is outside of the Collapse component
      if (collapseRef.current && !collapseRef.current.contains(event.target)) {
        // Close the Collapse
        // You should have a function to handle closing, e.g., handleClose(index)
        // Make sure to implement it in your code
        handleClose(index);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [index]);
  return (
    <div ref={collapseRef}>
      <Collapse in={segment.openDate} timeout="auto" unmountOnExit>
        <Box
          sx={{
            // position: 'absolute',
            // top: {
            //   xs: '102%',
            // },
            right: '0px',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px ',
            zIndex: 3,
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Calendar
            color="var(--primary)"
            date={
              index === 0
                ? new Date(segment.depDate)
                : new Date(arr[index - 1].depDate)
            }
            months={1}
            minDate={
              index === 0
                ? new Date(segment.depDate)
                : new Date(arr[index - 1].depDate)
            }
            onChange={(date) => handleDepartDate(date, index)}
          />
        </Box>
      </Collapse>
    </div>
  );
};

export default Modal;
