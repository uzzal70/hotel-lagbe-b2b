/* eslint-disable react/prop-types */
import hotel from '../../assets/images/hotel'
import { Box, Grid, Stack, Typography } from '@mui/material'
import HotelNearbyAttractionModal from './modal/HotelNearbyAttractionModal';
import { useState } from 'react';
import { facilityIcons } from '../Utils/facilityIcons';

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const Attractions = ({ item }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const count = item?.length - 6 > 0 ? item?.length - 6 : 0;

    return (
        <Box
            sx={{
                width: '100%',
                px: { xs: 1, md: 2 },
                py: { xs: 0.5, md: 1 },
                backgroundColor: '#f5f7fa',
                borderRadius: 1
            }}
        >
            <Typography
                sx={{
                    color: '#09296B',
                    fontWeight: 500,
                    pb: { xs: 1.5, md: 1 },
                    fontSize: { xs: 12, md: 16 },
                }}
            >
                Attractions
            </Typography>
            <Grid container spacing={0.6} sx={{ mt: 0, px: { xs: 0.5, md: 1 } }}>
                <Grid container spacing={0.6} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {item?.slice(0, 3).map((item, index) => {
                        const matchingIcon = Object.keys(facilityIcons).find(key =>
                            item.name.toLowerCase().includes(key.toLowerCase())
                        );

                        return (
                            <Grid
                                item
                                xs={12}
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
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
                                    {item.name} {item.distance ? `- ${item.distance}${item?.unit || ''}` : ''}
                                </Typography>
                            </Grid>
                        );
                    })}
                </Grid>

                {count > 0 && (
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <Typography
                                onClick={() => openModal(item)}
                                sx={{
                                    color: '#2E4FF5',
                                    fontSize: { xs: 9, md: 12 },
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#1A3BB5',
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                + {count} more
                            </Typography>
                        </Stack>
                    </Grid>
                )}
            </Grid>

            <HotelNearbyAttractionModal modalIsOpen={modalIsOpen} closeModal={closeModal} item={item} />
        </Box>

    )
}

export default Attractions
