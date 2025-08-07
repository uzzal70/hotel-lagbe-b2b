/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import {
  addPassenger,
  removePassenger,
  updatePassenger,
} from '../../redux/slices/hotelBookingPassengerSlice';
import { Box, Button, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useRef, useState } from 'react';
import PassportExpiryPicker from './PassportExpiryPicker';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
const HotelPassengerForm = ({
  roomIndex,
  passengerIndex,
  passenger,
  errors = {},
  item,
  passengerData,
  setErrors,
}) => {
  // console.log(item);
  // console.log(passengerData);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch(updatePassenger({ roomIndex, passengerIndex, name, value }));

    if (name === 'passPortNumber') {
      const trimmed = value.trim();

      if (!trimmed) {
        setErrors((prev) => ({
          ...prev,
          passPortNumber: 'Passport number is required',
        }));
      } else if (trimmed.length < 8) {
        setErrors((prev) => ({
          ...prev,
          passPortNumber: 'Passport must be at least 8 characters',
        }));
      } else {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.passPortNumber; // Completely remove the error key
          return updated;
        });
      }
    }
  };
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const calendarRef = useRef(null);
  // const { IsPassportMandatory = true, IsPANMandatory } = passenger; // orginal
  // const { IsPassportMandatory = true, IsPANMandatory = true } = passenger; // test
  const IsPassportMandatory = false;
  const allowedAdults = parseInt(item.numberOfAdults);
  const allowedChildren = parseInt(item.numberOfChilds);
  const room = passengerData[roomIndex];
  const currentAdults = room.passengers.filter(
    (p) => p.type === 'Adult'
  ).length;
  const currentChildren = room.passengers.filter(
    (p) => p.type === 'Child'
  ).length;
  const indexofChild = item?.childAges[currentChildren];
  const handelAddMorePax = () => {
    // Add Adult if not reached the limit
    if (currentAdults < allowedAdults) {
      dispatch(addPassenger({ roomIndex, type: 'Adult' }));
    }
    // Otherwise add Child if not reached the limit
    else if (currentChildren < allowedChildren) {
      dispatch(addPassenger({ roomIndex, type: 'Child', indexofChild }));
    }
  };

  const handelRemovePax = () => {
    dispatch(removePassenger({ roomIndex, passengerIndex }));
  };

  useEffect(() => {
    const handleClose = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      } else if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClose);
      document.addEventListener('keydown', handleClose);
    }
    return () => {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('keydown', handleClose);
    };
  }, [open]);
  const styleinput = {
    input: {
      width: '100%',
      p: '11px 15px',
      border: '1px solid var(--stroke)',
      borderRadius: 1,
      color: 'var(--primary)',
      bgcolor: 'var(--white)',
    },
    select: {
      width: '100%',
      p: '11px 15px',
      border: '1px solid var(--stroke)',
      borderRadius: 1,
      color: 'var(--primary)',
    },
    label: {
      color: 'var(--secondary)',
      fontSize: 12,
      display: 'block',
      mb: -0.5,
    },
    span: {
      fontWeight: 300,
      display: 'block',
      color: 'var(--red)',
      fontSize: 12,
    },
  };

  return (
    <Box className="custom-input custom-select">
      <Box
        sx={{
          display: passengerIndex === 0 ? 'none' : 'flex',
          alignItems: 'center',
          color: 'var(--primary)',
          fontSize: { xs: 12, md: 14 },
          fontWeight: 500,
          bgcolor: 'var(--bgcolor)',
          width: 'fit-content',
          px: 1,
          py: 0.5,
          borderRadius: 1,
          gap: 1,
          mb: 1,
        }}
      >
        <PersonIcon sx={{ fontSize: 20 }} />
        {passenger?.type || 'Adult'}
      </Box>
      <Grid
        container
        spacing={1}
        sx={{
          mb: item?.allGuestsInfoRequired ? 2 : 0,
        }}
      >
        {/* Passport Fields for Lead Passenger */}

        {/* Title */}
        <Grid item xs={12} md={4}>
          <Box sx={styleinput}>
            <label>Title:</label>
            <select
              name="title"
              value={passenger.title || ''}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
            </select>
            {errors.title && !passenger.title?.trim() && (
              <span>{errors.title}</span>
            )}
          </Box>
        </Grid>

        {/* First Name */}
        <Grid item xs={12} md={4}>
          <Box sx={styleinput}>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={passenger.firstName || ''}
              onChange={handleChange}
            />
            {errors.firstName && !passenger.firstName?.trim() && (
              <span>{errors.firstName}</span>
            )}
          </Box>
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} md={4}>
          <Box sx={styleinput}>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={passenger.lastName || ''}
              onChange={handleChange}
            />
            {errors.lastName && !passenger.lastName?.trim() && (
              <span>{errors.lastName}</span>
            )}
          </Box>
        </Grid>
        {IsPassportMandatory && (
          <>
            <Grid item xs={12} md={4}>
              <Box sx={styleinput}>
                <label>Passport Number:</label>
                <input
                  type="text"
                  name="passPortNumber"
                  placeholder="Passport Number"
                  value={passenger.passPortNumber || ''}
                  onChange={handleChange}
                  minLength={8}
                  maxLength={10}
                />
                {errors.passPortNumber && <span>{errors.passPortNumber}</span>}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <PassportExpiryPicker
                value={passenger.passPortExpiry}
                onChange={handleChange}
                error={errors.passPortExpiry}
              />
            </Grid>
          </>
        )}
        {/* {IsPANMandatory && (
          <Grid item xs={12} md={4}>
            <Box sx={styleinput}>
              <label>PAN Card:</label>
              <input
                type="text"
                name="panCardNumber"
                placeholder="PAN Card"
                value={passenger.panCardNumber || ''}
                onChange={handleChange}
                minLength={8}
                maxLength={10}
              />
              {errors.panCardNumber && !passenger.panCardNumber?.trim() && (
                <span>{errors.panCardNumber}</span>
              )}
            </Box>
          </Grid>
        )} */}
      </Grid>
      {!item?.allGuestsInfoRequired && (
        <Box textAlign={'end'} mt={2}>
          {passengerIndex === item.passengers.length - 1 &&
            (currentAdults < allowedAdults ||
              currentChildren < allowedChildren) && (
              <Button
                startIcon={<PersonAddIcon />}
                onClick={() => handelAddMorePax()}
                sx={{
                  fontSize: 12,
                  color: 'var(--primary)',
                  textTransform: 'capitalize',
                  py: 0.5,
                  border: '1px solid var(--secondary)',
                  position: 'relative',
                }}
              >
                Add other Guest
              </Button>
            )}
          &nbsp;
          {passengerIndex === 0 ? null : (
            <Button
              onClick={() => handelRemovePax()}
              sx={{
                color: 'var(--primary)',
                textTransform: 'capitalize',
                border: '1px solid var(--red)',
                py: 0.5,
              }}
            >
              <RemoveCircleIcon
                sx={{
                  fontSize: 21,
                  px: 0,
                  color: 'var(--red)',
                }}
              />
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default HotelPassengerForm;
