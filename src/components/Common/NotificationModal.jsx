/* eslint-disable react/prop-types */
import { Modal, Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import ImageImport from '../../assets/ImageImport';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useGetItemsQuery } from '../../redux/slices/apiSlice';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: 'none',
  boxShadow: 'none',
  p: 0,
  borderRadius: 2,
  outline: 'none',
  //   overflow: 'hidden',
};

const NotificationModal = ({ afterlogin }) => {
  const url = `/agent/agentAllAdvertisements`;
  const { data, isLoading, isError } = useGetItemsQuery({
    url,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const modalShown = sessionStorage.getItem('modalShown');
    const modalShownTime = sessionStorage.getItem('modalShownTime');
    const thirtyMinutes = 5 * 60 * 60 * 1000;

    if (
      !modalShown ||
      !modalShownTime ||
      Date.now() - modalShownTime > thirtyMinutes
    ) {
      // The modal has not been shown before or it has been more than 30 minutes, so display it
      setModalIsOpen(true);
      sessionStorage.setItem('modalShown', 'true');
      sessionStorage.setItem('modalShownTime', Date.now());
    }
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
    if (afterlogin) {
      return;
    } else {
      sessionStorage.removeItem('modalShown', 'true');
      sessionStorage.removeItem('modalShownTime', Date.now());
    }
  };
  if (isLoading) {
    return;
  }
  return (
    <div>
      {data?.[0]?.status === 'ACTIVE' && (
        <Modal open={modalIsOpen} onClose={closeModal}>
          <Box
            sx={{
              ...style,
              width: { xs: '85%', sm: '50%', md: '40%' },
            }}
          >
            <Box
              sx={{
                img: {
                  width: '100%',
                  borderRadius: 3,
                  bgcolor: 'var(--white)',
                },
                position: 'relative',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <img
                src={data?.[0]?.pcFileUrl || ImageImport.PopUpBanner}
                alt=""
              />
            </Box>
            <Box
              sx={{
                img: {
                  width: '100%',
                  borderRadius: 3,
                },
                position: 'relative',
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <img
                src={data?.[0]?.mobileFileUrl || ImageImport.BannerMobile}
                alt=""
              />
            </Box>

            <Button
              onClick={closeModal}
              sx={{ position: 'absolute', top: -30, right: -40 }}
            >
              <CloseRoundedIcon
                sx={{
                  color: 'var(--white)',
                  border: '1px solid var(--white)',
                  borderRadius: '50%',
                  p: 0.5,
                }}
              />
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default NotificationModal;
