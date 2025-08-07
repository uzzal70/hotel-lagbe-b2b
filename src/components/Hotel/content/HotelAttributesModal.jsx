/* eslint-disable react/prop-types */
import { Box, Modal, Typography, Fade, IconButton, Grid } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { facilityIcons } from "../../Utils/facilityIcons";

const HotelAttributesModal = ({ modalIsOpen, closeModal, item }) => {
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
                    {/* Close Button */}
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

                    {/* Modal Content */}
                    <Box sx={{ mb: 3, mt: 1, overflowY: 'auto', maxHeight: '57vh' }}>
                        <Typography
                            sx={{
                                color: '#09296B',
                                fontWeight: 500,
                                pb: { xs: 1.5, md: 1 },
                                fontSize: { xs: 12, md: 20 },
                            }}
                        >
                            Attributes
                        </Typography>

                        <Grid container spacing={1} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {item?.map((item, index) => {
                                const matchingIcon = Object.keys(facilityIcons).find(key =>
                                    item.name.toLowerCase().includes(key.toLowerCase())
                                );

                                return (
                                    <Grid
                                        item
                                        xs={6}
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1.2,
                                        }}
                                    >
                                        {matchingIcon ? facilityIcons[matchingIcon] : (
                                            <CheckCircleIcon sx={{ color: '#CDD0D3', fontSize: 15 }} />
                                        )}

                                        <Typography
                                            variant="body2"
                                            color="#344258"
                                            sx={{
                                                fontSize: { xs: 10, md: 11, lg: 13 },
                                            }}
                                            noWrap
                                        >
                                            {item.name}
                                        </Typography>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default HotelAttributesModal;

