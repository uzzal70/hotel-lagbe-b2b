import { Box, Modal } from '@mui/material';
import CustomButton from '../../Common/CustomButton';
import CustomModal from '../../Common/CustomModal';
import { useNavigate } from 'react-router-dom';
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
const BookingButton = ({ isDone }) => {
  const navigate = useNavigate();
  return (
    <Box>
      {!isDone ? (
        <CustomButton
          type="submit"
          value="Book & Hold"
          textcolor="var(--white)"
          bgcolor="var(--primary)"
          hovercolor="var(--primary)"
          padding="5px 20px"
          width={{ xs: '100%' }}
        />
      ) : (
        'Loading...'
      )}

      {/* <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ ...style, width: { xs: '80%', sm: '50%', md: '40%' } }}>
          <CustomModal
            handleClick={() => {
              setOpen(false);
              navigate('/dashboard/bookingdetails');
            }}
          />
        </Box>
      </Modal> */}
    </Box>
  );
};

export default BookingButton;
