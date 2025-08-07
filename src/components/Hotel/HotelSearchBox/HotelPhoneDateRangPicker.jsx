import { Box, Drawer } from '@mui/material';
import { Calendar } from 'react-date-range';
import { useDispatch } from 'react-redux';
import { checkOutClose } from '../../../redux/slices/modalOpen';

const HotelPhoneDateRangPicker = ({
  dateRange,
  dateRangeStyles,
  handleDateChange,
  checkInModal,
  checkOutModal,
}) => {
  const handleCloseModal = () => {
    dispatch(checkOutClose());
  };

  const dispatch = useDispatch();
  // const handleDateChange = (item) => {
  //   const { startDate, endDate } = item.selection;
  //   dispatch(setDateRange([item.selection]));

  //   if (endDate && startDate !== endDate) {
  //     handleCloseModal();
  //   }
  // };
  const DoneButton = () => (
    <Box
      onClick={handleCloseModal}
      sx={{
        position: 'absolute',
        bottom: 5,
        right: 8,
        bgcolor: 'var(--primary)',
        color: 'var(--white)',
        borderRadius: 1,
        padding: '2px 10px',
        cursor: 'pointer',
        fontSize: 16,
      }}
    >
      Done
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor="bottom"
        open={checkInModal || checkOutModal}
        sx={{
          '.MuiPaper-root': {
            height: '100% !important',
          },
          display: { xs: 'block', md: 'none' },
        }}
        SlideProps={{
          timeout: { enter: 500, exit: 300 },
        }}
      >
        <Box
          sx={{
            background: 'white',
            padding: 1,
            borderRadius: 2,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={dateRangeStyles}>
            <Box textAlign={'center'} mb={2}>
              {checkInModal ? 'Select CheckIn Date' : 'Select CheckOut Date'}{' '}
            </Box>
            <Calendar
              date={
                checkInModal
                  ? new Date(dateRange[0]?.startDate || new Date())
                  : new Date(dateRange[0]?.endDate || new Date())
              }
              color="var(--primary)"
              months={4}
              minDate={new Date()}
              onChange={handleDateChange}
            />
          </Box>
          <DoneButton />
        </Box>
      </Drawer>
    </div>
  );
};

export default HotelPhoneDateRangPicker;
