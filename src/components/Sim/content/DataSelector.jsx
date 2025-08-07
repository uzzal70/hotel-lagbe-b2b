import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
const DataSelector = ({ selectedValue, setSelectedValue, itemData }) => {

  // Toggle selection handler
  const handleDataSelectorChange = (value) => {
    setSelectedValue(prevSelectedValue => prevSelectedValue === value ? '' : value);
  };

  // Sort MB first, UNLIMITED last, then others alphabetically
  const sortedData = itemData.sort((a, b) => {
    if (a.label === 'MB' && b.label !== 'MB') return -1; // 'MB' should come first
    if (a.label !== 'MB' && b.label === 'MB') return 1;  // 'MB' should come first
    if (a.value === 'UNLIMITED') return 1; // 'UNLIMITED' should come last
    if (b.value === 'UNLIMITED') return -1; // 'UNLIMITED' should come last
    return a.value - b.value; // Sort by value if both are neither 'MB' nor 'UNLIMITED'
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
        Internet Plan
      </Typography>
      <Grid container spacing={1.5}>
        {sortedData.map((item) => (
          <Grid item key={item.value}>
            <Box
              onClick={() => handleDataSelectorChange(item.value)}
              sx={{
                width: 35,
                height: 35,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 8,
                cursor: "pointer",
                backgroundColor: selectedValue === item.value ? "var(--primary)" : "white",
                color: selectedValue === item.value ? "white" : "var(--primary)",
                border: 1,
                borderColor: ` ${selectedValue === item.value ? "var(--stroke)" : "var(--stroke)"}`,
                "&:hover": {
                  backgroundColor: selectedValue === item.value ? "var(--primary)" : "#f5f5f5",
                },
              }}
            >

              {item.value === "UNLIMITED" ? <AllInclusiveIcon sx={{ fontSize: 10 }} /> :
                <>
                  {item.value} {item.label}

                </>
              }
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DataSelector;
