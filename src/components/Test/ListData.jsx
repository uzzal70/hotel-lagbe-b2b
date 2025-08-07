import { Box, TableCell, TableRow } from '@mui/material';
import React from 'react';

const ListData = ({ roomData }) => {
  // const matchedRoom = FindMatchingRooms({ roomData });
  return (
    <div>
      {/* {matchedRoom.map((room) => (
        <TableRow key={room?.uuid || room?.rateId}>
          <TableCell
            sx={{
              width: { xs: 250, md: 350 },
              border: '1px solid #E0E0E0',
              p: 1,
            }}
          >
            <Box sx={{ fontSize: 10 }}>Rate Id : {room?.rateId || 'N/A'}</Box>
          </TableCell>
          <TableCell
            sx={{
              width: { xs: 200, md: 280 },
              border: '1px solid #E0E0E0',
              p: 1,
            }}
          >
            Facilities
          </TableCell>
          <TableCell
            sx={{
              width: { xs: 60, md: 80 },
              textAlign: 'center',
              border: '1px solid #E0E0E0',
              p: 1,
            }}
          >
            Guests
          </TableCell>
          <TableCell
            sx={{
              width: { xs: 90, md: 110 },
              border: '1px solid #E0E0E0',
              p: 1,
            }}
          >
            {room?.price?.publishedPrice || 'N/A'}
          </TableCell>
        </TableRow>
      ))} */}
    </div>
  );
};

export default ListData;
