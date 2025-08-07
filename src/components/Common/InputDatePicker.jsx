/* eslint-disable react/prop-types */
import { Box, ClickAwayListener, Grow } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Calendar } from 'react-date-range';
import moment from 'moment';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import ValidIcon from './validIcon';

const InputDatePicker = ({
  name,
  placeholder,
  formik,
  date,
  selectDate,
  open,
  handleDateSelect,
  handleOpen,
  handleClose,
  handleDateReset,
  maxDate,
  minDate,
  padding,
  width,
  fontSize,
  display,
  bgcolor,
  border,
  right,
  left,
  touched,
}) => {
  return (
    <ClickAwayListener onClickAway={() => handleClose(name)}>
      <Box
        className="custom-input"
        sx={{
          input: {
            border: border || '1px solid var(--bgcolor)',
            outline: 'none',
            p: padding || '8px',
            fontSize: fontSize || 14,
            borderRadius: '5px',
            width: width || { xs: '160px', sm: '160px', md: '200px' },
            bgcolor: bgcolor || '',
          },
          position: 'relative',
        }}
      >
        <Box>
          <input
            type="text"
            name={name}
            id={name}
            placeholder={placeholder}
            value={date ? moment(date).format('DD MMM YYYY') : ''}
            onClick={() => handleOpen(name)}
            readOnly
            autoComplete="off"
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
            <CalendarMonthTwoToneIcon
              sx={{ color: 'var(--disable)', fontSize: 20, mt: 0.2 }}
              onClick={() => handleOpen(name)}
            />
          </Box>
        </Box>
        {date && (
          <Box
            sx={{
              position: 'absolute',
              right: '20%',
              top: '50%',
              transform: 'translateY(-50%)',
              height: '60%',
              zIndex: 1,
              display: display || '',
            }}
          >
            <CancelOutlinedIcon
              sx={{ color: 'var(--disable)', fontSize: 14 }}
              onClick={() => {
                handleDateReset(name);
                handleClose(name);
              }}
            />
          </Box>
        )}

        {/* {(date === undefined || date === null) && formik ? (
          <Box>
            <ValidIcon msg={formik} fontColor="var(--red)" />
          </Box>
        ) : null} */}
        {touched && formik ? (
          <div>
            <ValidIcon msg={formik} fontColor="var(--red)" />
          </div>
        ) : (
          ''
        )}

        <Grow in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '100%%',
              ...(right && { right }),
              ...(left && { left }),
              transform: 'translateX(10%)',
              bottom: { xs: name === 'passEx' ? 0 : 'unset', md: 'unset' },
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px ',
              borderRadius: '14px',
              overflow: 'hidden',
              zIndex: 1,
            }}
          >
            <Calendar
              // date={new Date(date || selectDate)}
              color="var(--primary)"
              months={1}
              {...(maxDate && { maxDate })}
              {...(minDate && { minDate })}
              onChange={(selectedDate) => handleDateSelect(selectedDate, name)}
            />
          </Box>
        </Grow>
      </Box>
    </ClickAwayListener>
  );
};
export default InputDatePicker;
