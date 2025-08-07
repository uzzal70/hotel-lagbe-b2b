import { useRef, useState, useEffect } from 'react';
import { Box, Grow } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Calendar } from 'react-date-range'; // or your preferred calendar
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';
import moment from 'moment';

const PassportExpiryPicker = ({
  value,
  onChange,
  error,
  name = 'passPortExpiry',
  label = 'Passport Expiry',
}) => {
  const inputRef = useRef(null);
  const calendarRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleCalendarOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(e.target) &&
      !inputRef.current.contains(e.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateSelect = (selectedDate) => {
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    onChange({
      target: { name, value: formattedDate },
    });
    setOpen(false);
  };
  // Ensure the `value` is parsed and converted correctly to UTC for display
  const utcDate = value ? moment(value).toDate() : new Date();
  return (
    <Box>
      <label
        style={{
          color: 'var(--secondary)',
          fontSize: 12,
          display: 'block',
          marginBottom: '-4px',
        }}
      >
        {label}:
      </label>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'relative' }} onClick={handleCalendarOpen}>
          <input
            type="text"
            name={name}
            value={value || ''}
            placeholder="Select Date"
            readOnly
            ref={inputRef}
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              width: '100%',
              padding: '11px 15px',
              cursor: 'pointer',
              backgroundColor: 'var(--white)',
            }}
          />
          <CalendarMonthIcon
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#555',
            }}
          />
        </div>

        {error && !value?.trim() && (
          <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>
        )}

        {open && (
          <Grow in={open}>
            <Box
              ref={calendarRef}
              sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                mt: 1,
                zIndex: 10,
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                borderRadius: '14px',
                backgroundColor: '#fff',
                overflow: 'hidden',
              }}
            >
              <Calendar
                date={utcDate}
                color="var(--primary)"
                months={1}
                onChange={handleDateSelect}
                minDate={new Date()}
              />
            </Box>
          </Grow>
        )}
      </div>
    </Box>
  );
};

export default PassportExpiryPicker;
