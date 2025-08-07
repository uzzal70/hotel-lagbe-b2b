import { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    FormControl,
    FormControlLabel,
    Checkbox,
} from "@mui/material";

const SpecialRequest = () => {
    const [specialRequest, setSpecialRequest] = useState([]);

    const handleSpecialRequest = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSpecialRequest((prev) => [...prev, value]);
        } else {
            setSpecialRequest((prev) => prev.filter((request) => request !== value));
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
                padding: 2.5,
                py: 1,
                rounded: 1,
                borderColor: '#DADFE6',
                bgcolor: 'var(--white)',
                borderRadius: '10px',
                mx: { xs: 0.5, md: 'unset' },
                position: 'relative',
            }}
        >
            {/* Special Request */}
            <Box sx={{ mb: 1 }}>
                <Typography
                    sx={{
                        color: "var(--black)",
                        fontWeight: 500,
                        fontSize: { xs: 12, md: 16 },
                        mb: 0.2,
                    }}
                >
                    Special Request
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "#E63946",
                        mb: 2,
                        fontSize: { xs: 11, md: 13 },
                    }}
                >
                    Special requests depend on each hotel's availability, may incur
                    additional charges, and cannot be guaranteed.
                </Typography>
                <Box sx={{
                    pl: 1,
                }}>
                    <FormControl component="fieldset" fullWidth>
                        <Grid container spacing={1}>
                            {[
                                "Smoking room",
                                "Late check-in",
                                "Early check-in",
                                "Room on a high floor",
                                "Twin beds",
                                "Airport transfer",
                                "On Honeymoon",
                            ].map((request, index) => (
                                <Grid item xs={6} sm={4} md={3} key={index}>
                                    <FormControlLabel
                                        value={request}
                                        control={
                                            <Checkbox
                                                checked={specialRequest.includes(request)}
                                                onChange={handleSpecialRequest}
                                                sx={{
                                                    color: "#A8BAE0",
                                                    "&.Mui-checked": {
                                                        color: "white",
                                                    },
                                                    height: 35
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography
                                                sx={{
                                                    fontSize: { xs: 10, md: 12 },
                                                    flex: 1,
                                                    color: specialRequest.includes(request)
                                                        ? "white"
                                                        : "var(--tertiary)",
                                                }}
                                                noWrap
                                            >
                                                {request}
                                            </Typography>
                                        }
                                        onClick={(event) => event.stopPropagation()}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            borderRadius: "5px",
                                            pr: 1,
                                            backgroundColor: specialRequest.includes(request)
                                                ? "#A8BAE0"
                                                : "var(--gray)",
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
};

export default SpecialRequest;
