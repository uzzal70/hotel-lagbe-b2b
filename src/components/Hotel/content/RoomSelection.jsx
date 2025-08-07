/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setIsTotalRoomSelected } from '../../../redux/slices/roomFilterSlice';
import moment from 'moment';
import { calculateTotalFinalRate } from '../../Helper/calculateTotalFinalRate';
import {
    CalendarMonth as CalendarMonthIcon,
    BedroomParent as BedroomParentIcon,
} from '@mui/icons-material';
import companyInfo from '../../../common/companyInfo';

const RoomSelection = () => {
    const dispatch = useDispatch();
    const { roomsNumber, startDate, endDate, adult, child } = useParams();

    const parsedRoomCount = parseInt(roomsNumber, 10);
    const selectedRooms = useSelector((state) => state.roomFilter.selectedRooms);
    const rates = useSelector((state) => state.roomData.rates);
    const selectionRoomRate = selectedRooms.slice(0, parsedRoomCount);

    const totalFinalRate = calculateTotalFinalRate(selectionRoomRate, rates);

    const start = moment(startDate);
    const end = moment(endDate);
    const nights = end.diff(start, 'days');

    useEffect(() => {
        dispatch(setIsTotalRoomSelected(selectionRoomRate.length === parsedRoomCount));
    }, [parsedRoomCount, selectionRoomRate.length, dispatch]);

    const SelectedRooms2 = ({ selectionRoomRate, rates }) =>
        selectionRoomRate.map((item, index) => {

            const mainRoom = rates.find((r) => r.uuid === item?.rateId || r.id === item?.rateId);
            const occLength = mainRoom?.occupancies?.length || 0;
            const price = occLength > 0 ? (mainRoom.finalRate / occLength).toFixed(2) : 'N/A';
            return (
                <Grid
                    key={index}
                    xs={1.2}
                    border="1px solid #d0d5dd"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 1, py: 0.5, }}
                >
                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                        <Typography variant="caption" color="var(--primary)" fontWeight="500" noWrap>
                            {`Room ${index + 1}`}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography fontWeight="bold" color="var(--primary)" fontSize="0.75rem">
                                {`${companyInfo.currencyCode} ${price}`}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            );
        });

    return (
        <>

            <Box sx={{ display: 'flex' }} spacing={1} mb={2}>
                {/* Room Info */}
                <Grid xs={8} width={'80%'}>
                    <Grid container mx={'auto'} gap={0.5}>

                        {/* Check-in & Check-out Box */}
                        <Grid
                            border="1px solid #d0d5dd"
                            display="flex"
                            alignItems="center"
                            sx={{ px: 1, py: 0.5 }}
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                            >
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    fontWeight="500"
                                    noWrap
                                >
                                    Check-in
                                </Typography>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <CalendarMonthIcon
                                        fontSize="small"
                                        sx={{ color: '#667085' }}
                                    />
                                    <Typography
                                        fontWeight="bold"
                                        color="#1D2939"
                                        fontSize="0.75rem"
                                    >
                                        {start.format('DD MMM')}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                bgcolor="#f9fafb"
                                border="1px solid #d0d5dd"
                                borderRadius="999px"
                                sx={{ px: 1, py: 0.05, mx: 1 }}
                            >
                                <Typography
                                    fontSize="0.6rem"
                                    fontWeight={300}
                                    color="#344054"
                                >
                                    {nights} {nights > 1 ? 'Nights' : 'Night'}
                                </Typography>
                            </Box>

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-end"
                            >
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    fontWeight="500"
                                    noWrap
                                >
                                    Check-out
                                </Typography>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography
                                        fontWeight="bold"
                                        color="#1D2939"
                                        fontSize="0.75rem"
                                    >
                                        {end.format('DD MMM')}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Total Room Box */}
                        <Grid
                            border="1px solid #d0d5dd"
                            display="flex"
                            alignItems="center"
                            sx={{ px: 1, py: 0.5 }}
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                            >
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    fontWeight="500"
                                    noWrap
                                >
                                    Total Room
                                </Typography>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <BedroomParentIcon
                                        fontSize="small"
                                        sx={{ color: '#667085' }}
                                    />
                                    <Typography
                                        fontWeight="bold"
                                        color="#1D2939"
                                        fontSize="0.75rem"
                                    >
                                        {roomsNumber}
                                    </Typography>
                                    <Typography fontSize="0.75rem" color="#1D2939">
                                        ({`${adult} Adults`})
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>


                        <SelectedRooms2
                            selectionRoomRate={selectionRoomRate}
                            rates={rates}
                        />

                        {Array.from({
                            length: roomsNumber - selectionRoomRate.length,
                        }).map((_, index) => (
                            <Grid
                                item
                                xs={1.2}
                                key={index}
                                display="flex"
                                alignItems="center"
                                sx={{
                                    px: 1,
                                    py: 0.5,
                                    border: '0.5px solid #d0d5dd', // Optional border styling
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                }}
                            >
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="flex-start"
                                >
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        fontWeight="500"
                                        noWrap
                                    >
                                        {`Room ${index + 1 + selectionRoomRate.length}`}
                                    </Typography>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Typography
                                            fontWeight="bold"
                                            color="red"
                                            sx={{ fontSize: '10px' }}
                                        >
                                            Please Select
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}

                    </Grid>
                </Grid>

                {/* Price and Button */}
                <Grid xs={4} width={'20%'}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'end',
                        }}
                        gap={1}
                        mt={0.5}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: 20,
                                color: 'var(--primary)',
                            }}
                        >
                            {companyInfo.currencyCode} {(totalFinalRate).toFixed(2)}
                        </Typography>


                    </Box>
                </Grid>
            </Box>
        </>
    );
};

export default RoomSelection;
