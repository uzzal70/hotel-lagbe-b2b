/* eslint-disable react/prop-types */
import { Box, Grid } from '@mui/material'
import { useState } from 'react'
import GuestRoomsComponent from '../HotelSearchBox/GuestRooms';
import DateRangePicker from '../HotelSearchBox/DateRangePicker';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';



const commonBoxStyle = {
    border: '1px solid var(--stroke)',
    borderRadius: '5px',
    p: 0.5,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
};

const HotelRoomSearch = ({ handleSearch }) => {

    const [dateOpen, setDateOpen] = useState(false);
    return (
        <>

            <Box
                sx={{
                    bgcolor: 'var(--white)',
                    margin: 'auto',
                    borderRadius: '8px',
                    px: 2,
                    pb: 0,
                    pt: 0.5,
                    minHeight: '100px',
                    mb: 2
                }}
            >

                <Box mt={2}>
                    <Grid container rowSpacing={1} columnSpacing={1} alignItems="stretch">

                        <Grid item xs={12} md={6}>
                            <Box sx={commonBoxStyle}>
                                <DateRangePicker open={dateOpen} setOpen={setDateOpen} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ ...commonBoxStyle }}>
                                <GuestRoomsComponent />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Box
                                sx={{
                                    bgcolor: 'var(--primary)',
                                    border: '1px solid gray',
                                    borderRadius: '5px',
                                    px: 1,
                                    py: 0.5,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    color: 'var(--white)',
                                    fontSize: 16,
                                }}
                                onClick={handleSearch}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                    }}
                                >
                                    <SearchRoundedIcon />
                                    <span>Search</span>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

            </Box>
        </>
    )
}

export default HotelRoomSearch
