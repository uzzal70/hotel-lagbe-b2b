import { Box, LinearProgress, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

const RoomBarLoad = () => {
    const [progress, setProgress] = useState(0);
    const [buffer, setBuffer] = useState(10);
    const progressRef = useRef(() => { });

    useEffect(() => {
        progressRef.current = () => {
            if (progress === 100) {
                setProgress(0);
                setBuffer(10);
            } else {
                setProgress(progress + 1);
                if (buffer < 100 && progress % 5 === 0) {
                    const newBuffer = buffer + 1 + Math.random() * 10;
                    setBuffer(newBuffer > 100 ? 100 : newBuffer);
                }
            }
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ width: '100%', mb: 1 }}>
            <Typography
                variant="body2"
                sx={{
                    mb: 0.5,
                    color: "var(--primary)",
                    fontWeight: 400,
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    fontSize: { xs: 10, md: 12 },
                }}
            >
                <Box
                    component="span"
                    sx={{
                        color: "var(--dark-green)",
                        fontWeight: 500,
                        fontSize: { xs: 10, md: 12 },
                        mr: 0.5,
                    }}
                >
                    Hang tight!
                </Box>
                We're fetching available rooms at the best prices for you
                <Box sx={{ px: 1, display: "flex", alignItems: "center" }} className="dot-blink">
                    <span></span>
                    <span></span>
                    <span></span>
                </Box>
            </Typography>
            <LinearProgress
                variant="buffer"
                value={progress}
                valueBuffer={buffer}
                sx={{
                    height: 4,
                    borderRadius: 5,
                    backgroundColor: 'var(--orange)',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: 'var(--primary)',
                    },
                    '& .MuiLinearProgress-barBuffer': {
                        backgroundColor: 'var(--orengel)',
                    },
                }}
            />
        </Box>
    );
};

export default RoomBarLoad;
