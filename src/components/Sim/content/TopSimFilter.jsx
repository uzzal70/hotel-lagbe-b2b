import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const FilterSection = ({ text, count, onClick, sortData, bg, color }) => (
  <Box pr={1}>
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      p={1}
      borderRadius={1}
      onClick={onClick}
      style={{
        backgroundColor: sortData === 'desc' ? 'var(--primary)' : bg,
      }}
    >
      <Typography
        sx={{
          color: color || (sortData === 'desc' ? 'white' : '#79859A'),
          fontWeight: 400,
          fontSize: 12,
          cursor: 'pointer',
        }}
      >
        {text}&nbsp; {count ? (sortData === 'asc' ? '↑' : '↓') : ''}
      </Typography>
    </Stack>
  </Box>
);

const TopSimFilter = ({ count, onClick, onClick1, sortData, sortPrice }) => {
  return (
    <Stack direction="row" alignItems="center" flexWrap="wrap">
      <FilterSection
        bg="white"
        text={count + ' ' + `${count > 1 ? 'Packages Found' : 'Package Found'}`}
      />
      <FilterSection
        bg="white"
        text="Short By Price"
        onClick={onClick1}
        sortData={sortPrice}
        count
      />
      <FilterSection
        bg="white"
        text="Short By Data"
        onClick={onClick}
        sortData={sortData}
        count
      />
      <FilterSection
        bg="white"
        text="Short By Data"
        onClick={onClick}
        sortData={sortData}
        count
      />
      <FilterSection
        bg="white"
        text="Short By Data"
        onClick={onClick}
        sortData={sortData}
        count
      />
      <FilterSection
        bg=""
        color="var(--ORDER_CANCELEDt)"
        text="Best Data eSIM Plans for Travelers and Locals"
      />
    </Stack>
  );
};

export default TopSimFilter;
