import { useState } from "react";
import {
    Box,
    Typography
} from "@mui/material";
import hotel from "../../../assets/images/hotel";
import CancellationHotel from "./CancellationHotel";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CancellationPolicy = () => {
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState(null);

    const handleModelOpne = (item, id) => {
        setItem(item);
        setOpen(id);
    };

    return (
        <>

            <Box sx={{
                padding: 2.5,
                py: 1,
                bgcolor: "var(--white)",
                borderRadius: "10px",
                margin: "0 auto",
                fontFamily: "Arial, sans-serif",
                mb: 2
            }}>
                <Typography sx={{
                    color: "var(--black)",
                    fontWeight: 500,
                    fontSize: { xs: 12, md: 16 },
                    mb: 0.2,
                }}>
                    Cancellation Policy
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between", // Ensures space between items
                        my: .5,
                    }}
                >
                    {/* Left Section */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>

                        <CheckCircleIcon fontSize="" sx={{ color: "var(--green-light)", marginRight: 0.5 }} />
                        <Typography sx={{ fontSize: { xs: 9, md: 11 } }} color="var(--green-light)">
                            Free Cancellation till 27 January  <small>10:59 PM</small>
                        </Typography>
                    </Box>

                    {/* Right Section */}
                    <Typography
                        onClick={() => handleModelOpne('', 1)}
                        sx={{
                            fontSize: { xs: 9, md: 11 },
                            color: "#007BFF",
                            cursor: "pointer",
                            "&:hover": {
                                color: "#0056b3",
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Cancellation policy details
                    </Typography>
                </Box>


                {/* Cancellation Timeline */}
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        height: { xs: "25px", md: "30px" },
                        backgroundColor: "#F98A17",
                        borderRadius: "18px",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        py: 1, cursor: "pointer"
                    }}

                    onClick={() => handleModelOpne('', 1)}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "65%",
                            height: "100%",
                            backgroundColor: "#00A19D",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >

                        <Typography
                            variant="body2"
                            sx={{
                                color: "#fff",
                                fontSize: { xs: 9, md: 12 }
                            }}
                        >
                            100% Refund
                        </Typography>
                    </Box>


                    <Typography
                        sx={{
                            position: "absolute",
                            left: "80%",
                            transform: "translateX(-50%)",
                            color: "white",
                            fontSize: { xs: 9, md: 12 }

                        }}
                    >
                        Non Refundable
                    </Typography>


                    <Box
                        sx={{
                            position: "absolute",
                            left: { xs: "2px", md: "7px" },
                            top: { xs: "2px", md: "5px" },
                            color: "#fff",
                            fontSize: { xs: 9, md: 11 },
                        }}
                    >
                        <img src={hotel.circle} alt="" width={20} />
                    </Box>

                    <Box
                        sx={{
                            position: "absolute",
                            right: { xs: "2px", md: "7px" },
                            top: { xs: "2px", md: "5px" },
                            color: "#fff",
                            fontSize: { xs: 9, md: 11 },
                        }}
                    >
                        <img src={hotel.circle} alt="" width={20} />
                    </Box>

                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 0.5,
                        width: "100%",

                    }}
                >
                    <Box
                        sx={{
                            width: "65%",
                            display: "flex",
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="body2" color="var(--green-light)" sx={{ fontSize: { xs: 9, md: 11 } }}>
                            Now
                        </Typography>

                        <Box sx={{}}>
                            <Typography variant="body2" color="var(--green-light)" sx={{ fontSize: { xs: 9, md: 11 } }}>
                                25 Dec 10:59 PM
                            </Typography>
                        </Box>

                    </Box>


                    <Typography variant="body2" color="var(--green-light)" sx={{ fontSize: { xs: 9, md: 11 } }}>
                        26 Dec 10:59 PM
                    </Typography>
                </Box>

                <Typography
                    variant="body2"
                    color="#9BA6B2"
                    sx={{ mt: { xs: 2, md: 1 }, fontStyle: "italic", fontSize: { xs: 9.5, md: 12 }, mb: 1 }}
                >
                    All mentioned time above in Hotel/Destination Local Time.
                </Typography>
            </Box>
            <CancellationHotel open={open} item={item} onHide={() => setOpen(false)} />

        </>
    )
}

export default CancellationPolicy
