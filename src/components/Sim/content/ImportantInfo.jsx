import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';

const infoItems = [
    {
        title: "Important Notes",
        items: [
            {
                label: "Cancellation Policies:",
                text: "Each hotel has its own cancellation policy. These details are available under the Booking Policy section after selecting a hotel on the portal."
            },
            {
                label: "Refunds:",
                text: "Refunds are processed based on the hotel's cancellation policy."
            },
            {
                label: "Non-Refundable Rates:",
                text: "If you booked a non-refundable rate, modifications or cancellations may not be permitted. In such cases, contact the hotel directly for assistance."
            },
        ],
    },

    {
        title: "Refund Policy",
        items: [
            {
                label: "Refund Process:",
                text: "Refunds are processed based on the cancellation policy of the hotel or service provider."
            },
            {
                label: "Refund Timeline:",
                text: "Once the refund is approved, the amount is credited to your wallet within 24 hours."
            },
            {
                label: "Service Charges:",
                text: "A service fee is charged for cancellations or refunds."
            },
            {
                label: "Non-Refundable Bookings:",
                text: "If you booked a non-refundable rate, modifications or cancellations may not be permitted. In such cases, contact the hotel directly for assistance."
            },
        ],
    }
    ,


    {
        title: "Date Chane Policy",
        items: [
            { label: "Date Change:", text: "You can apply for a date change at least 36 hours in advance." },
        ],
    },

    {
        title: "Name Change Policy",
        items: [
            {
                label: "Permission for Name Change:",
                text: "Name changes are generally allowed but depend on the hotel policies."
            },
            {
                label: "Fees and Conditions:",
                text: "Additional charges may apply for name changes, and there may be some restrictions."
            },
            {
                label: "Application Process:",
                text: "You need to apply in advance through customer support and may be required to provide supporting documents."
            },
        ],
    }

];


const ImportantInfo = () => (
    <>
        {infoItems.map((section, index) => (
            <Grid container sx={{ bgcolor: '#fff', borderRadius: '10px' }} key={index} mb={2}>
                <Grid item xs={12}>
                    <Box sx={{ px: { xs: 1.5, sm: 2 }, py: 1, pb: 2 }}>

                        <Box >
                            <Typography sx={{ fontWeight: 600, fontSize: { xs: 11, md: 14 }, color: 'var(--black)' }}>
                                {section.title}
                            </Typography>
                            {section.items.map(({ label, text }, idx) => (
                                <Stack key={idx} direction="row" spacing={1} mt={0.5}>

                                    <ModeStandbyIcon sx={{ fontSize: 13, color: 'var(--black)' }} />

                                    <Box sx={{ color: 'var(--black)', fontWeight: 300, fontSize: { xs: 10, md: 12 } }}>
                                        <span style={{ fontWeight: 400 }}>{label} </span><span style={{ fontWeight: 300 }}>{text}</span>
                                    </Box>
                                </Stack>
                            ))}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        ))}</>
);

export default ImportantInfo;
