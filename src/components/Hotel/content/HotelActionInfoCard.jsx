/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Box, Typography, Divider, Tooltip } from '@mui/material';
import commaNumber from 'comma-number';
import { useEffect, useState } from 'react';
import moment from 'moment';

export const HotelActionInfoCard = ({
    title,
    penalty,
    service,
    cost,
    remarks,
    agentRemarks,
    ceheckIn,
    checkOut,
    yes, timeLimit
}) => {


    const CountdownTimer = ({ endTime }) => {
        const calculateTimeLeft = () => {
            const now = moment();
            const end = moment(endTime);
            const duration = moment.duration(end.diff(now));
            return duration.asSeconds() > 0 ? duration : null;
        };

        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

        useEffect(() => {
            const timer = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);

            return () => clearInterval(timer);
        }, [endTime]);

        if (!timeLeft) {
            return <span style={{ color: 'red' }}>Time's up</span>;
        }

        const days = timeLeft.days();
        const hours = timeLeft.hours();
        const minutes = timeLeft.minutes();
        const seconds = timeLeft.seconds();

        return (
            <span className="fs-8 text-muted px-1">
                {days > 0 && `${days}d `}
                {(days > 0 || hours > 0) && `${hours}h `}
                {(days > 0 || hours > 0 || minutes > 0) && `${minutes}m `}
                {(days > 0 || hours > 0 || minutes > 0 || seconds > 0) && `${seconds}s`}
            </span>
        );
    };

    const toolData = <>

        <Box
            sx={{
                width: 280,
                borderRadius: 2,
                overflow: 'hidden',
            }}
        >
            <Box pt={0.5}>
                <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    sx={{ fontSize: '13px', color: 'text.warning' }}
                >
                    Remarks
                </Typography>
            </Box>

            <Box sx={{ mt: 1, bgcolor: 'white', px: 2, py: 1.5 }}>
                <Typography
                    sx={{
                        fontSize: '12px',
                        fontWeight: 600,
                        borderBottom: '1px solid #e0e0e0',
                        pb: 0.5,
                        color: 'var(--primary)',
                    }}
                >
                    Agent
                </Typography>
                <Typography sx={{ fontSize: '13px', mt: 0.5, color: 'var(--primary)' }}>
                    {agentRemarks || '—'}
                </Typography>
            </Box>

            <Box sx={{ bgcolor: 'white', px: 2, py: 1.5, borderTop: '1px solid #f0f0f0' }}>
                <Typography
                    sx={{
                        fontSize: '12px',
                        fontWeight: 600,
                        borderBottom: '1px solid #e0e0e0',
                        pb: 0.5,
                        color: 'var(--primary)',
                    }}
                >
                    Admin
                </Typography>
                <Typography sx={{ fontSize: '13px', mt: 0.5, color: 'var(--primary)' }}>
                    {remarks || '—'}
                </Typography>
            </Box>
        </Box>


    </>
    return (
        <Box 
        // border={1} borderColor="grey.200"
         borderRadius={2} p={2} pt={1} bgcolor="white">
            <Tooltip
                title={toolData}
                arrow
                placement="top"
                followCursor
            >

                <Box display="flex" alignItems="center" mb={1} justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        {/* <FiDollarSign size={16} style={{ marginRight: 4, color: 'green' }} /> */}
                        <Typography
                            variant="subtitle2"
                            fontWeight={600}
                            color="var(--primary)"
                            sx={{ fontSize: { xs: 10, md: 13 } }}
                        >
                            {title}
                        </Typography>
                    </Box>

                    {yes && (
                        <Box sx={{ fontSize: { xs: 10, md: 11 } }}>
                            CheckIn {ceheckIn} / {checkOut}
                        </Box>
                    )}

                </Box>
            </Tooltip>
            <Divider sx={{ mb: 1 }} />

            <Box sx={{ backgroundColor: 'grey.50', p: 1, fontSize: { xs: '11px', md: '12px' } }}>
                {penalty && (

                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography sx={{ fontSize: { xs: 10, md: 12 } }} color="var(--secondary)" fontWeight={500}>
                            Penalty
                        </Typography>
                        <Typography

                            sx={{ fontSize: { xs: 10, md: 12 } }}
                            color="error.main"
                        >
                            ৳ {commaNumber(penalty)}
                        </Typography>
                    </Box>
                )}

                {service && (
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography sx={{ fontSize: { xs: 10, md: 12 } }} color="var(--secondary)" fontWeight={500}>
                            Service Fee
                        </Typography>
                        <Typography
                            sx={{ fontSize: { xs: 10, md: 12 } }}
                            color="warning.main"
                        >
                            ৳ {commaNumber(service)}
                        </Typography>
                    </Box>
                )}

                {cost && (
                    <Box display="flex" justifyContent="space-between">
                        <Typography sx={{ fontSize: { xs: 10, md: 12 } }} color="var(--secondary)" fontWeight={500}>
                            {title === 'Refund Info' ? 'Refunded' : 'Cost'}
                        </Typography>
                        <Typography
                            sx={{ fontSize: { xs: 10, md: 12 } }}
                            color="success.main"
                        >
                            ৳ {commaNumber(cost)}
                        </Typography>
                    </Box>
                )}
            </Box>


            {timeLimit && (
                <Box display="flex" justifyContent="space-between" mt={1} mx={1}>
                    <Typography sx={{ fontSize: { xs: 10, md: 12 } }} color="var(--secondary)" fontWeight={500}>
                        Quotation Time Limit
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 10, md: 12 }, maxWidth: '60%' }} color="info.main">
                        <CountdownTimer
                            endTime={timeLimit}
                        />
                    </Typography>
                </Box>
            )}
        </Box>
    );
};
