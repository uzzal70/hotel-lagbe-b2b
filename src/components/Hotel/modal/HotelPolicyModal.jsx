/* eslint-disable react/prop-types */
import { Box, Modal, Typography, Fade, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon from Material UI

const HotelPolicyModal = ({ modalIsOpen, closeModal, data }) => {

    const instructions = data?.checkinInfo?.instructions;
    const minAge = data?.checkinInfo?.minAge;
    const beginTime = data?.checkinInfo?.beginTime;
    const specialInstructions = data?.checkinInfo?.specialInstructions;
    const time = data?.checkoutInfo?.time;
    const policies = data?.policies;

    return (
        <Modal open={modalIsOpen} onClose={closeModal} closeAfterTransition>
            <Fade in={modalIsOpen}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        border: 'none',
                        boxShadow: 24,
                        borderRadius: '6px',
                        px: 3,
                        py: { xs: 1, sm: 2, md: 3 },
                        minWidth: { xs: '95%', sm: '90%', md: '50%' },
                        minHeight: { xs: '60%', sm: '90%', md: '60vh' },
                        maxHeight: { xs: '50%', sm: '90%', md: '300px' },
                        overflow: 'hidden',
                        outline: 'none',
                        transition: 'all 0.3s ease-in-out'
                    }}
                    pb={3}
                >
                    {/* Close button */}
                    <IconButton
                        onClick={closeModal}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'gray',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Box sx={{ fontSize: { xs: 16, md: 20 }, fontWeight: 600 }}> Hotel Policy</Box>
                    <Box sx={{ mb: 3, mt: 1, overflowY: 'auto', maxHeight: '50vh' }}>

                        {/* Policy */}
                        <Box variant="outlined" sx={{ mb: 4 }}>
                            {policies?.map((facility, index) => (
                                <Box key={index}>
                                    <Typography
                                        variant="body1"
                                        color="var(--primary)"
                                        sx={{
                                            textTransform: 'capitalize',
                                            fontSize: { xs: 13, md: 16 }, fontWeight: 500
                                        }}
                                    >
                                        {facility?.type}{' '}
                                    </Typography>
                                    <Box display={'flex'} gap={1} sx={{ mb: 2 }}>
                                        <Box>-</Box>
                                        <Box>
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{
                                                    fontSize: { xs: 12, md: 15 },
                                                    fontWeight: 400,
                                                }}
                                                dangerouslySetInnerHTML={{
                                                    __html: facility?.text,
                                                }}
                                            />{' '}
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                        <Typography sx={{ fontSize: { xs: 13, md: 15 }, fontWeight: 'bold', mb: 1 }}>
                            Check-in Time : {beginTime}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: 13, md: 15 }, fontWeight: 500, mb: 2 }}>
                            Instructions :
                            <Typography fontSize={13}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: instructions,
                                    }}
                                /> Min Age : {minAge}
                            </Typography>
                        </Typography>
                        <Typography sx={{ fontSize: { xs: 13, md: 15 }, fontWeight: 500 }}>
                            Special Instructions :
                            <Typography fontSize={13}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: specialInstructions,
                                    }}
                                />
                            </Typography>
                        </Typography>

                        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                            <Typography sx={{ fontSize: { xs: 13, md: 15 }, fontWeight: 'bold' }}>
                                Check-out Time : {time}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default HotelPolicyModal;
