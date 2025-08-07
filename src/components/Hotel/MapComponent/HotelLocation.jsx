import { Box } from '@mui/material';
import React from 'react';

const HotelLocation = ({ lat, lng, name }) => {
  const locationName = name
  return (
    <div style={{ position: 'relative', width: '100%', height: '62vh', marginTop: '10px' }}>
      {/* Embedded Google Map */}
      <iframe
        src={`https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`}
        title="Google Map"
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: '8px' }}
        loading="lazy"
      ></iframe>

      {/* Floating "popup" label */}

      {locationName &&

        <div
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            backgroundColor: 'white',
            color: '#333',
            zIndex: 2,
          }}
        >
          <Box sx={{ ps: 0, px: 2, py: 0.5, fontWeight: 600 }}>📍 {locationName}</Box>
        </div>
      }

    </div>
  );
};

export default HotelLocation;
