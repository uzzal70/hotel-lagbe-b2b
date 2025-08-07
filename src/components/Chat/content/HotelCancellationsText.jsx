import { Grid, Paper, Typography } from '@mui/material'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const HotelCancellationsText = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={1} sx={{ p: 2, pt: 1, backgroundColor: '#e8f0ff' }}>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            display="flex"
                            alignItems="center"
                            gutterBottom
                            fontSize="0.7rem"
                        >
                            <HighlightOffIcon fontSize="small" sx={{ mr: 1 }} />
                            Full Cancellations
                        </Typography>
                        <Typography component="ul" fontSize="0.7rem" variant="body2" sx={{ pl: 2 }}>
                            <li>Free cancellation requests are final.</li>
                            <li>Non-refundable? We’ll confirm before proceeding.</li>
                            <li>Wallet refund within 36 hours.</li>
                            <li>Waivers may take 48–72 hours.</li>
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={1} sx={{ p: 2, pt: 1, backgroundColor: '#fff8e1' }}>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            display="flex"
                            alignItems="center"
                            gutterBottom
                            fontSize="0.7rem"
                        >
                            <InfoOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                            Know more about this!
                        </Typography>
                        <Typography component="ul" fontSize="0.7rem" variant="body2" sx={{ pl: 2 }}>
                            <li>Subject to hotel confirmation.</li>
                            <li>Please allow 24–48 hours.</li>
                            <li>Delays may occur on weekends.</li>
                            <li>Handled in local hotel time.</li>
                            <li>No same-day check-in modifications.</li>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
