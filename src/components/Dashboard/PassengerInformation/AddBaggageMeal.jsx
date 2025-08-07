/* eslint-disable react/prop-types */
import { Box, Button, Modal, Stack, Tooltip } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import LuggageIcon from '@mui/icons-material/Luggage';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import { useState } from 'react';
import Meal from './Meal';
import Baggage from './Baggage';
// import { baggage } from '../../Utils/Flight/baggage';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: { xs: 2, md: 4 },
  borderRadius: '10px',
};
const AddBaggageMeal = ({
  formik,
  bagData,
  mealData,
  passengerIndex,
  passengerType,
  firstName,
  lastName,
  baggageValue,
}) => {
  // console.log(bagData);
  const [alignment, setAlignment] = useState('Baggage');
  const buttons = [
    { label: 'Baggage', value: 'Baggage' },
    { label: 'Meals', value: 'Meals' },
  ];

  const handleChange = (newAlignment) => {
    setAlignment(newAlignment);
  };

  const [selectedOptionsBag, setSelectedOptionsBag] = useState({});
  const [selectedOptionsMeal, setSelectedOptionsMeal] = useState({});
  const handleSelectBag = (option, groupIndex, field) => {
    // console.log('option', option);
    // console.log('groupIndex', groupIndex);
    setSelectedOptionsBag((prevState) => ({
      ...prevState,
      [groupIndex]: option,
    }));
    const defaultBaggageData = {
      AirlineCode: '6E',
      FlightNumber: '1104',
      WayType: 2,
      Code: 'NoBaggage',
      Description: 2,
      Weight: 0,
      Currency: 'INR',
      Price: 0,
      Origin: 'DAC',
      Destination: 'DEL',
    };
    const updatedField = formik.values[passengerType][passengerIndex][field];

    // Handle groupIndex 0
    if (groupIndex === 0) {
      updatedField[0] = option || defaultBaggageData;
    }

    // Handle groupIndex 1
    if (groupIndex === 1) {
      // Ensure that index 0 has default data if it is not selected
      if (!updatedField[0]) {
        updatedField[0] = defaultBaggageData;
      }
      updatedField[1] = option || defaultBaggageData;
    }

    formik.setFieldValue(
      `${passengerType}[${passengerIndex}].${field}`,
      updatedField
    );
  };
  const handleSelectMeal = (option, groupIndex, field) => {
    setSelectedOptionsMeal((prevState) => ({
      ...prevState,
      [groupIndex]: option,
    }));
    const defaultMealData = {
      AirlineCode: 'SG',
      FlightNumber: '8269',
      WayType: 2,
      Code: 'NCC4',
      Description: 2,
      AirlineDescription: '',
      Quantity: 1,
      Currency: 'INR',
      Price: 0,
      Origin: 'DEL',
      Destination: 'BOM',
    };
    const updatedField = formik.values[passengerType][passengerIndex][field];

    // Handle groupIndex 0
    if (groupIndex === 0) {
      updatedField[0] = option || defaultMealData;
    }

    // Handle groupIndex 1
    if (groupIndex === 1) {
      // Ensure that index 0 has default data if it is not selected
      if (!updatedField[0]) {
        updatedField[0] = defaultMealData;
      }
      updatedField[1] = option || defaultMealData;
    }

    updatedField[groupIndex] = option;
    formik.setFieldValue(
      `${passengerType}[${passengerIndex}].${field}`,
      updatedField
    );
  };

  const handleClose = () => {
    formik.setFieldValue(`${passengerType}[${passengerIndex}].baggage`, []);
    formik.setFieldValue(`${passengerType}[${passengerIndex}].meal`, []);
    setSelectedOptionsBag({});
    setSelectedOptionsMeal({});
    setOpen(!open);
  };
  // console.log(formik.values[passengerType][passengerIndex].baggage);
  const [open, setOpen] = useState(false);
  return (
    <Box pt={1}>
      {formik.values[passengerType][passengerIndex].baggage?.length > 0 ||
      formik.values[passengerType][passengerIndex].meal?.length > 0 ? (
        <Stack
          direction={'row'}
          spacing={1}
          sx={{
            fontSize: 14,
            color: 'var(--secondary)',
          }}
        >
          <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
            <LuggageIcon
              sx={{
                px: 0,
                fontSize: 25,
                border: '1px solid var(--green)',
                borderRadius: '50%',
                p: 0.5,
                color: 'var(--dark-green)',
              }}
            />
            <Box>
              {formik.values[passengerType][passengerIndex].baggage[0]?.Weight}{' '}
              Kg
            </Box>
          </Stack>

          <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
            <RestaurantMenuOutlinedIcon
              sx={{
                px: 0,
                fontSize: 25,
                border: '1px solid var(--green)',
                borderRadius: '50%',
                p: 0.5,
                color: 'var(--orengel)',
              }}
            />
            <Tooltip
              titel={
                formik.values[passengerType][passengerIndex].meal[0]?.Code || ''
              }
            >
              <Box>
                {formik.values[passengerType][passengerIndex].meal?.length > 0
                  ? 'Meal'
                  : 'No Meal'}
              </Box>
            </Tooltip>
          </Stack>

          <Stack
            direction={'row'}
            alignItems={'center'}
            onClick={() => setOpen(!open)}
          >
            <BorderColorRoundedIcon
              sx={{
                px: 0,
                fontSize: 25,
                border: '1px solid var(--green)',
                borderRadius: '50%',
                p: 0.5,
                color: 'var(--blue)',
                cursor: 'pointer',
              }}
            />
          </Stack>
        </Stack>
      ) : (
        <Stack
          direction={'row'}
          sx={{
            textTransform: 'capitalize',
            color: 'var(--primary)',
            border: '1px solid var(--disable)',
            py: 0.3,
            px: 1,
            borderRadius: 1,
            fontSize: 12,
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'var(--bgcolor)',
            },
          }}
          onClick={() => setOpen(!open)}
        >
          <AddCircleRoundedIcon sx={{ px: 0, fontSize: 18 }} /> &nbsp;Add Extra
          Bag & Meal
        </Stack>
      )}
      {/* {
        <RestaurantMenuOutlinedIcon
          sx={{
            px: 0,
            fontSize: 25,
            border: '1px solid var(--green)',
            borderRadius: '50%',
            p: 0.5,
          }}
        />
      } */}
      <Modal open={open}>
        <Box
          sx={{
            ...style,
            width: { xs: '90%', sm: '90%', md: '85%', lg: '60%' },
          }}
        >
          <Box
            sx={{
              pb: 1,
              button: {
                textTransform: 'capitalize',
                fontWeight: 400,
                fontSize: { xs: 10, sm: 12 },
                px: { xs: 1, sm: 2 },
                borderRadius: '5px',
              },
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" spacing={{ xs: 1, sm: 2 }}>
              {buttons.map((button) => (
                <Button
                  key={button.value}
                  onClick={() => handleChange(button.value)}
                  sx={{
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
            <Stack direction={'row'} justifyContent={'flex-end'} spacing={2}>
              <Button
                onClick={() => setOpen(!open)}
                size="small"
                startIcon={<CheckCircleOutlineRoundedIcon />}
                sx={{
                  textTransform: 'capitalize',
                  color: 'var(--primary)',
                  border: '1px solid var(--primary)',
                  px: 2,
                }}
              >
                Save
              </Button>
              <Button
                onClick={() => handleClose()}
                size="small"
                startIcon={<CancelRoundedIcon />}
                sx={{
                  textTransform: 'capitalize',
                  color: 'var(--red)',
                  border: '1px solid var(--red)',
                  px: 2,
                }}
              >
                Close
              </Button>
            </Stack>
          </Box>
          <Box
            sx={{
              overflowY: 'auto', // Enable vertical scrolling
              maxHeight: '45vh', // Set a maximum height to enable scrolling within this limit
              minHeight: '40vh', // Set a maximum height to enable scrolling within this limit
            }}
          >
            {alignment == 'Baggage' && (
              <Baggage
                firstName={firstName}
                lastName={lastName}
                bagData={bagData}
                selectedOptions={selectedOptionsBag}
                passengerIndex={passengerIndex}
                handleSelect={handleSelectBag}
              />
            )}
            {alignment == 'Meals' && (
              <Meal
                mealData={mealData}
                firstName={firstName}
                lastName={lastName}
                selectedOptions={selectedOptionsMeal}
                passengerIndex={passengerIndex}
                handleSelect={handleSelectMeal}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddBaggageMeal;
