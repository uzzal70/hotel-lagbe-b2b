/* eslint-disable react/prop-types */
import { Box, Button, Collapse, Modal, Stack, Typography } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useState } from 'react';
import companyInfo from '../../common/companyInfo';
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

const HotelConfirmationModal = ({
  isModal,
  handleCloseModal,
  handleConfirm,
  passengerData,
  totalRoomPrice,
}) => {
  const [expand, setExpand] = useState({
    flight: false,
    passenger: true,
  });

  const handleClick = (key) => {
    setExpand((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  console.log(passengerData);
  return (
    <Box>
      <Modal open={isModal} onClose={handleCloseModal}>
        <Box
          sx={{
            ...style,
            p: 0,
            width: { xs: '90%', sm: '70%', md: '40%' },
            minHeight: { xs: '60vh', md: '40vh' },
            maxHeight: { xs: '70vh', md: '90vh' },
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              minHeight: { xs: '60vh', md: '35vh' },
              maxHeight: { xs: '70vh', md: '90vh' },
              overflowY: 'scroll',
            }}
          >
            <Box
              sx={{
                px: { xs: 1, md: 2 },
                py: 1,
                bgcolor: 'var(--gray)',
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 100,
                color: 'var(--primary)',
                fontSize: { xs: 13, md: 16 },
              }}
            >
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Box>Review Guest Details</Box>
                <Box
                  sx={{
                    pr: { xs: 0, md: 2 },
                  }}
                >
                  Total Amount: {totalRoomPrice || '0'}{' '}
                  {companyInfo.currencyType}
                </Box>
              </Stack>
            </Box>
            <Box
              sx={{
                p: { xs: 1, md: 2 },
                mt: 4,
              }}
            >
              <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={0.5}
                mb={1}
              >
                <ErrorOutlineIcon
                  sx={{
                    fontSize: 15,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: 10, md: 12 },
                    color: 'var(--primary)',
                  }}
                >
                  Please recheck the traveler Name and Details with your travel
                  doc
                </Typography>
              </Stack>

              <Box
                sx={{
                  px: { xs: 1, md: 1 },
                  mt: 1,
                  mb: 7,
                  border: '1px solid var(--stroke)',
                  borderRadius: '5px',
                  bgcolor: 'var(--gray)',
                  cursor: 'pointer',
                }}
              >
                <Box onClick={() => handleClick('passenger')}>
                  <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Box>Passenger Details</Box>
                    <Box>
                      <KeyboardArrowDownOutlinedIcon
                        sx={{
                          mt: 0.5,
                          color: 'var(--fontcolor)',
                          fontWeight: 600,
                          fontSize: { xs: 25, md: 30 },
                          transition: 'transform 0.3s ease-in-out',
                          transform: `rotate(${
                            expand?.passenger ? 180 : 0
                          }deg)`,
                        }}
                      />
                    </Box>
                  </Stack>
                </Box>

                <Collapse in={expand?.passenger}>
                  <Box className="preview-pax-table" mb={1.5}>
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">Title</th>
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {passengerData?.map((room, roomIndex) =>
                          room.passengers?.map((pax, paxIndex) => (
                            <tr key={`${roomIndex}-${paxIndex}`}>
                              <td data-label="Title">{pax?.title}</td>
                              <td data-label="First Name">{pax?.firstName}</td>
                              <td data-label="Last Name">{pax?.lastName}</td>
                              <td data-label="Type">{pax?.type}</td>

                              {/* Uncomment below if needed */}
                              {/* {locationType !== 'INSIDE' && (
          <>
            <td data-label="Passport">{pax?.passPortNumber}</td>
            <td data-label="Passport Expiry">{pax?.passPortExpiry}</td>
          </>
        )} */}
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </Box>
                </Collapse>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              width: '100%',
              bgcolor: 'var(--white)',
              textAlign: 'center',
              mb: 1.5,
              button: {
                py: 0.7,
                px: 2,
                border: '1px solid var(--stroke)',
                mx: 1,
                color: 'var(--primary)',
                fontSize: 12,
              },
            }}
          >
            <Button onClick={handleCloseModal}>Edit Details</Button>
            <Button
              sx={{
                bgcolor: 'var(--primary)',
                color: 'var(--white) !important',
                ':hover': {
                  bgcolor: 'var(--primary)',
                },
                fontWeight: 300,
              }}
              onClick={handleConfirm}
            >
              Confirm Now
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default HotelConfirmationModal;
