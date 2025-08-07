/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, Modal, Radio } from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const Bag = ({ formik, baggage, passengerIndex, passengerType }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleSelect = (option, groupIndex) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [groupIndex]: option,
    }));

    const updatedBaggage = formik.values[passengerType][passengerIndex].baggage;
    updatedBaggage[groupIndex] = option;

    formik.setFieldValue(
      `${passengerType}[${passengerIndex}].baggage`,
      updatedBaggage
    );
  };

  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box onClick={() => setOpen(!open)}>Add Extra Baggage</Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            ...style,
            width: { xs: '95%', sm: '90%', md: '85%', lg: '65%' },
          }}
        >
          {baggage.map((group, groupIndex) => (
            <Box key={groupIndex} container spacing={2} mb={1.5}>
              {group.map((option, i) => (
                <Box key={i} sx={{ input: { visibility: 'hidden' } }}>
                  <Radio
                    onClick={() => handleSelect(option, groupIndex)}
                    size="small"
                    checked={
                      selectedOptions[groupIndex]?.Price === option.Price
                    }
                  />
                  {option.Price} - {option.Origin} to {option.Destination}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Modal>
    </Box>
  );
};

export default Bag;
