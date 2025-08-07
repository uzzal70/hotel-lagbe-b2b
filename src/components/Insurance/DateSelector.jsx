/* eslint-disable react/prop-types */
import { Box, Typography, Collapse } from '@mui/material';
import moment from 'moment';
import { Calendar } from 'react-date-range';
const isValidDate = (date) => {
  const parsedDate = new Date(date);
  return date && !isNaN(parsedDate.getTime());
};
function DateSelector({
  date,
  toggleModal,
  modal,
  name,
  title,
  handleSelectDate,
  minDate,
  maxDate,
}) {
  // console.log('formData.date_of_travel', date);
  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          bgcolor: 'var(--gray)',
          color: 'var(--disable)',
          height: '42px',
          px: 1.5,
          border: '1px solid var(--light-stroke)',
          borderRadius: '8px',
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onClick={() => toggleModal(name)}
      >
        <span>{title}</span>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 400,
            color: 'var(--primary)',
          }}
        >
          {date?.length === 10
            ? moment(date, 'DD-MM-YYYY').format('DD MMM, YYYY')
            : date
            ? `${moment(date).format('DD MMM, YYYY')}`
            : 'Select a date'}
        </Typography>
      </Box>
      <Collapse in={modal} timeout="auto" unmountOnExit>
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '105%' },
            right: {
              xs: 'unset',
              sm: 0,
            },
            left: {
              xs: 0,
              sm: 'unset',
            },
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px ',
            borderRadius: '14px',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          <Calendar
            date={isValidDate(date) ? new Date(date) : new Date()}
            color="var(--primary)"
            months={1}
            onChange={(date) => handleSelectDate(date, name)}
            minDate={minDate ? new Date(minDate) : undefined}
            maxDate={maxDate ? new Date(maxDate) : undefined}
          />
        </Box>
      </Collapse>
    </Box>
  );
}

export default DateSelector;
