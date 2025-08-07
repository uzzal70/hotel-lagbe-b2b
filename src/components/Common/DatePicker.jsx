/* eslint-disable react/prop-types */
import moment from 'moment';
import { Box, Stack, Typography, Drawer } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Calendar } from 'react-date-range';
import ImageImport from '../../assets/ImageImport';
import ClearIcon from '@mui/icons-material/Clear';
import CustomButton from './CustomButton';

function DatePicker({
  value,
  name,
  handleDateOpen,
  open,
  handleSelectDate,
  date,
  minDate,
  handleClose,
  setValue,
}) {
  return (
    <Box>
      {value === 'oneway' && name === 'Return Date' ? (
        <Box
          onClick={handleDateOpen}
          sx={{
            py: 3,
            px: 1.4,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Stack direction="row" spacing={1} pt={1.3}>
            <Box>
              <ControlPointIcon
                sx={{ color: 'var(--primary)', fontSize: 16, p: 0 }}
              />
            </Box>
            <Typography sx={{ color: 'var(--primary)', fontSize: 13 }} noWrap>
              {'Add Return' || 'Date'}
            </Typography>
          </Stack>
        </Box>
      ) : (
        <Box
          sx={{
            p: 1.4,
            display: { xs: 'none', sm: 'block' },
            position: 'relative',
          }}
        >
          {value === 'roundway' && name === 'Return Date' ? (
            <ControlPointIcon
              sx={{
                color: 'var(--stroke)',
                fontSize: 16,
                fontWeight: 300,
                p: 0,
                transform: 'rotate(45deg)',
                position: 'absolute',
                right: 5,
                bottom: 5,
                '&:hover': {
                  color: 'var(--red)',
                },
              }}
              onClick={() => {
                setValue('oneway');
                handleClose();
              }}
            />
          ) : null}
          <Box onClick={handleDateOpen}>
            <Stack direction="row" spacing={1}>
              <Box>
                <img src={ImageImport.calender} />{' '}
              </Box>
              <Typography
                sx={{ color: 'var(--secondary)', fontSize: 12 }}
                noWrap
              >
                {name || 'Date'}
              </Typography>
            </Stack>
            <Typography
              sx={{
                color: 'var(--primary)',
                fontSize: { xs: 12, sm: 14, md: 12, lg: 16 },
              }}
              noWrap
            >
              {moment(date).format('DD MMM, YYYY')}
            </Typography>
            <Typography sx={{ color: 'var(--secondary)', fontSize: 12 }}>
              {moment(date).format('dddd')}
            </Typography>
          </Box>
        </Box>
      )}

      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
          px: 2,
          py: 1.2,
          display: { xs: 'flex', sm: 'none' },
        }}
        onClick={handleDateOpen}
      >
        <img src={ImageImport.calenderphone} />{' '}
        <Typography
          sx={{
            color: 'var(--black)',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          {moment(date).format('DD MMM, YYYY')}
        </Typography>
      </Stack>
      {/* for only xs devices   */}
      <Drawer
        anchor="bottom"
        open={open}
        sx={{
          '.MuiPaper-root': {
            height: '100% !important',
          },
          display: { xs: 'block', sm: 'none' },
        }}
        SlideProps={{
          timeout: { enter: 500, exit: 300 },
        }}
      >
        <ClearIcon
          sx={{
            color: 'var(--white)',
            bgcolor: 'var(--disable)',
            borderRadius: '50%',
            fontSize: 20,
            p: 0.5,
            position: 'absolute',
            top: 10,
            right: 25,
          }}
          onClick={handleDateOpen}
        />
        <Typography
          sx={{
            textAlign: 'center',
            color: 'var(--secondary)',
            fontWeight: 500,
            py: 1,
            bgcolor: 'var(--bgcolor)',
          }}
        >
          Select {name}
        </Typography>

        <Box
          sx={{
            boxShadow: 'none',
            borderRadius: '14px',
            overflowX: 'hidden',
            zIndex: 1,
            width: 'fit-content',
            marginX: 'auto',
          }}
        >
          <Box>
            <Calendar
              date={new Date(date)}
              color="var(--primary)"
              months={4}
              minDate={new Date(minDate)}
              onChange={handleSelectDate}
            />
          </Box>
        </Box>
        <Box textAlign="end" p={5}>
          {name !== 'Journey Date' ? (
            <CustomButton value="Journey Date" handleClick={handleClose} />
          ) : (
            <CustomButton value="Add Return Date" handleClick={handleClose} />
          )}
        </Box>
      </Drawer>
      {/* for sm to lg devices */}
      <Box>
        {/* <Collapse in={open} unmountOnExit> */}
        {open && (
          <Box
            sx={{
              position: 'absolute',
              top: { xs: '105%' },
              right: {
                xs: 'unset', // Use 'unset' for null values
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
              date={new Date(date)}
              color="var(--primary)"
              months={1}
              minDate={new Date(minDate)}
              onChange={handleSelectDate}
            />
          </Box>
        )}

        {/* </Collapse> */}
      </Box>
    </Box>
  );
}

export default DatePicker;
