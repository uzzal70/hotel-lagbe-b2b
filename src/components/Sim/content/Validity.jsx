import React from "react";
import { Grid, Box, Typography } from "@mui/material";

const Validity = ({ selectedValue, setSelectedValue, itemData = [] }) => {
    // Toggle selection handler
    const handleDataSelectorChange = (value) => {
        setSelectedValue(prevSelectedValue => (prevSelectedValue === value ? '' : value));
    };

    // Sort alphabetically by `label`
    const sortedData = itemData
        .sort((a, b) => {
            if (a.label && b.label) return 1;
            return a.value - b.value;
        });

    return (
        <Box bgcolor="white" sx={{ borderRadius: "6px", width: "100%", p: 2, pt: 0, mb: 2 }}>
            <Typography
                sx={{
                    color: "var(--primary)",
                    fontSize: { xs: 15 },
                    fontWeight: 500,
                    py: 1,
                    width: "100%",
                }}
            >
                Validity
            </Typography>
            <Grid container spacing={1.5}>
                {sortedData.map((item) => (
                    <Grid item key={item.value}>
                        <Box
                            onClick={() => handleDataSelectorChange(item.value)}
                            sx={{
                                height: 25,
                                borderRadius: "10%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 9,
                                px: .8,
                                cursor: "pointer",
                                backgroundColor: selectedValue === item.value ? "var(--primary)" : "",
                                color: selectedValue === item.value ? "white" : "var(--primary)",
                                border:1,
                                borderColor: ` ${selectedValue === item.value ? "var(--stroke)" : "var(--stroke)"}`,
                                "&:hover": {
                                    backgroundColor: selectedValue === item.value ? "var(--primary)" : "#f5f5f5",
                                },
                            }}
                        >
                            {item.value} {item.value < 1 ? 'day' : 'days'}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Validity;
