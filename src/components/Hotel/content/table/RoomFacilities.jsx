/* eslint-disable react/prop-types */
import { useState } from 'react';

import { Grid, Typography } from '@mui/material';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { facilityIcons } from '../../../Utils/facilityIcons';
import HotelRoomFacilitiesModal from '../HotelRoomFacilitiesModal';

const RoomFacilities = ({ item }) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const facility = !item?.roomDetails?.facilities || item.facilities?.length === 0 ? item?.roomDetails?.facilities : item?.roomDetails?.facilities;

    const count = facility?.length - 6 > 0 ? facility?.length - 6 : 0;

    return (
        <Grid container spacing={1} sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {facility?.slice(0, 4).map((item, index) => {

                const matchingIcon = Object.keys(facilityIcons).find(key =>
                    item.name.toLowerCase().includes(key.toLowerCase())
                );

                return (
                    <Grid
                        item
                        key={index}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.2,
                        }}
                    >

                        {matchingIcon ? facilityIcons[matchingIcon] : <CheckCircleIcon sx={{ color: '#CDD0D3', fontSize: 15 }} />}
                        <Typography
                            variant="body2"
                            color="#344258"
                            sx={{
                                fontSize: { xs: 10, md: 11, lg: 13 },
                            }}

                        >
                            {item.name}
                        </Typography>
                    </Grid>
                );
            })}

            {count > 0 ?

                <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 1.2, pb: 0.54 }}>
                    <AddCircleOutlineIcon sx={{ color: '#3164FF', fontSize: 15 }} />
                    <Typography
                        variant="body2"
                        color="#3164FF"
                        sx={{
                            fontSize: { xs: 10, md: 11, lg: 13 }, cursor: 'pointer'
                        }}
                        noWrap
                        onClick={() => openModal(facility)}
                    >
                        {count} More
                    </Typography>
                </Grid> :
                ''
            }


            <HotelRoomFacilitiesModal modalIsOpen={modalIsOpen} closeModal={closeModal} item={facility} />

        </Grid>
    )
}

export default RoomFacilities
