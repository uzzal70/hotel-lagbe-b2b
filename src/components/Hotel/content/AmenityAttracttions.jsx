import Amenities from '../Amenities'
import Attractions from '../Attractions'
import { Box, Grid } from '@mui/material'

const AmenityAttracttions = () => {
    return (
        <Box sx={{
            mb: 2,
            padding: 2.5,
            py: 1,
            rounded: 1,
            borderColor: '#DADFE6',
            bgcolor: 'var(--white)',
            borderRadius: '10px',
            mx: { xs: 0.5, md: 'unset' },
            position: 'relative',
            width: '100%',
        }} bgcolor="white">
            
            <Grid container spacing={{ xs: 1, md: 2 }} >

                <Grid item md={6} xs={12}>
                    <Amenities no />
                </Grid>

                <Grid item md={6} xs={12}>
                    <Attractions no />
                </Grid>

            </Grid>
        </Box>
    )
}

export default AmenityAttracttions
