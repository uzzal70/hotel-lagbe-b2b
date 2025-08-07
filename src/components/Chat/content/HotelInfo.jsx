/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material'
import moment from 'moment'

export const HotelInfo = ({ hotelName, checkIn, checkOut, result, roomAllocation }) => {
    return (
        <Box mb={1}>
            <Typography fontWeight="bold" fontSize="0.9rem">
                {hotelName}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontSize="0.7rem">
                {moment(checkIn).format('DD MMM')} -
                {moment(checkOut).format('DD MMM')}
                {` | `} {roomAllocation} room,{' '}
                {result?.totalAdult + result?.totalChild} guests
            </Typography>
        </Box>
    )
}
