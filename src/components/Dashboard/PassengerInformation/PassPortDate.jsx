/* eslint-disable react/prop-types */
import { Box, Collapse } from '@mui/material';
import moment from 'moment';
import { Calendar } from 'react-date-range';
import ValidIcon from '../../Common/validIcon';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const PassPortDate = ({
  handleToggleDate,
  handleOnChange,
  name,
  index,
  item,
  type,
  open,
  formik,
  minDate,
  maxDate,
  date,
  placeholder,
  error,
  collapse,
  label,
  selectDate,
  touched,
}) => {
  const utcDate = moment(date || selectDate)
    .utc()
    .toDate();
  const utcMinDate = minDate ? moment(minDate).utc().toDate() : null;
  const utcMaxDate = maxDate ? moment(maxDate).utc().toDate() : null;

  return (
    <Box
      sx={{
        input: {
          width: '100%',
          p: '10px 15px',
          border: '1px solid var(--stroke)',
        },
      }}
    >
      <label>{label}</label>
      <Box
        sx={{ position: 'relative' }}
        onClick={() => handleToggleDate(type, index, item, open)}
      >
        <input
          type="text"
          name={name}
          id={name}
          placeholder={placeholder}
          autoComplete="off"
          readOnly
          onBlur={formik.handleBlur}
          value={date ? moment(date).format('DD MMM YYYY') : ''}
        />
        <Box
          sx={{
            position: 'absolute',
            right: '2%',
            top: '50%',
            transform: 'translateY(-50%)',
            height: '65%',
          }}
        >
          <CalendarTodayIcon
            sx={{
              color: 'var(--disable)',
              fontSize: 19,
              mt: 0.3,
            }}
          />
        </Box>
      </Box>

      <Collapse in={collapse} timeout="auto" unmountOnExit>
        <Box
          sx={{
            position: 'absolute',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            zIndex: 1000,
          }}
        >
          <Calendar
            date={utcDate}
            color={'var(--primary)'}
            months={1}
            onChange={(e) => {
              const value = {
                target: {
                  name: name,
                  value: e,
                },
              };

              handleOnChange(value, item.passengerType, index, 'date');
            }}
            {...(utcMaxDate && { maxDate: utcMaxDate })}
            {...(utcMinDate && { minDate: utcMinDate })}
          />
        </Box>
      </Collapse>
      {touched && error ? (
        <div>
          <ValidIcon msg={error} fontColor="var(--red)" />
        </div>
      ) : null}
    </Box>
  );
};

export default PassPortDate;
