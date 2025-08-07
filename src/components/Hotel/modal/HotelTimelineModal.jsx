/* eslint-disable react/prop-types */
import React from 'react'

import { Box, Modal, Typography, Fade, IconButton, Grid } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon from Material UI
import styled from 'styled-components';
import moment from 'moment';
import ImageImport from '../../../assets/ImageImport';




const LineY = styled('div')({
    position: 'absolute',
    top: '50px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '70px',
    borderLeft: '1px dashed #b1b1b1',
});

const TimelineItem = ({ index, date, status, name, type, remarks, length }) => {

    return (
        <Grid container sx={{ position: 'relative' }}>
            {/* Left Side: Time */}
            <Grid
                item
                xs={3}
                sx={{ flex: 5, textAlign: 'right', fontSize: '0.875rem', width: 50 }}
            >
                <Typography sx={{ fontSize: { xs: 10, md: 12 } }}>
                    {moment(date).format('DD MMM YY', 'hh:mm A')}
                </Typography>
                <Typography sx={{ fontSize: { xs: 9, md: 11 } }}>
                    {moment(date).format('hh:mm A')}
                </Typography>
            </Grid>

            {/* Middle: Icon & Line */}
            <Grid
                item
                sx={{
                    flex: 1,
                    position: 'relative',
                    textAlign: 'center',
                    minHeight: 80,
                }}
            >
                <img src={ImageImport.circle} alt="circle icon" />
                {index !== length - 1 && <LineY />}
            </Grid>

            {/* Right Side: Status & Info */}
            <Grid item xs={7.5} sx={{ flex: 5, fontSize: '0.875rem' }}>
                <Typography sx={{ fontSize: { xs: 9, md: 12 }, textTransform: 'capitalize', width: 'fit-content', }} className={`${status.toLowerCase()}`}>
                    {status?.toLowerCase()?.split('_')?.join(' ')}
                </Typography>

                <Typography sx={{ fontSize: { xs: 9, md: 12 } }}>
                    By: {name}
                    {type && <Box fontSize={'0.5rem'}> ({type?.split('_')?.join(' ')})</Box>}
                </Typography>

                {remarks && <Typography sx={{ fontSize: { xs: 9, md: 10 }, whiteSpace: 'pre-line', mb: 1 }}>
                    Remarks : {remarks}
                </Typography>}
            </Grid>
        </Grid>
    );
};


const HotelTimelineModal = ({ modalIsOpen, closeModal, data }) => {
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
                        minWidth: { xs: '95%', sm: '90%', md: '400px' },
                        minHeight: { xs: '60%', sm: '90%', md: '60vh' },
                        maxHeight: { xs: '70%', sm: '90%', md: '300px' },

                        outline: 'none',
                        transition: 'all 0.3s ease-in-out'
                    }}
                    pb={3}
                >

                    <Box bgcolor='rgb(232, 230, 235)' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pl: 2, color: 'var(--primary)', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                        <Box>Hotel Booking Timeline</Box>
                        <IconButton
                            sx={{ color: 'red', }}
                            onClick={closeModal}
                        >
                            <CloseIcon sx={{ fontSize: 18 }} />
                        </IconButton>

                    </Box>


                    <Box sx={{ px: 1.5, my: 2, maxHeight: { xs: '55vh', md: '450px' }, overflowY: 'auto' }}>
                        {data?.map((item, index) => (
                            <TimelineItem
                                key={index}
                                index={index}
                                date={item?.createdAt}
                                status={item.bookingStatus}
                                name={item.operatedBy}
                                type={item.operatorType}
                                length={data.length}
                                remarks={item?.remarks}
                            />
                        ))}
                    </Box>

                </Box>
            </Fade>
        </Modal>
    )
}

export default HotelTimelineModal
