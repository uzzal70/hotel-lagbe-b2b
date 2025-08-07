import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  CircleMarker,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';

// Custom marker icon for the last location
const redIcon = new L.DivIcon({
  className: 'custom-red-icon',
  html: `<div style="
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
  ">
    <img 
      src="https://cdn-icons-png.flaticon.com/512/3177/3177361.png" 
      style="
        width: 25px; 
        height: 30px;
      "
    />
  </div>`,
  iconSize: [30, 30], // Adjusted to accommodate icon and label
  iconAnchor: [25, 35], // Centered anchor point
});

// FitBounds component to adjust map view dynamically
const FitBounds = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [14, 22] });
    }
  }, [bounds, map]);
  return null;
};

// const locationList = [
//   [{ name: 'Dubai', coords: [25.276987, 55.296249], isHighlighted: true }],
//   [{ name: 'New York', coords: [40.712776, -74.005974], isHighlighted: true }],
//   [{ name: 'Paris', coords: [48.856613, 2.352222], isHighlighted: true }],
//   [{ name: 'Sydney', coords: [-33.86882, 151.20929], isHighlighted: true }],
//   [{ name: 'Berlin', coords: [52.520008, 13.404954], isHighlighted: true }],
//   [{ name: 'Singapore', coords: [1.352083, 103.819839], isHighlighted: true }],
//   [{ name: 'Beijing', coords: [39.904202, 116.407394], isHighlighted: true }],
//   [{ name: 'Mumbai', coords: [19.07609, 72.877426], isHighlighted: false }],
//   [{ name: 'Istanbul', coords: [41.00824, 28.978359], isHighlighted: true }],
//   [{ name: 'Chicago', coords: [41.878113, -87.629799], isHighlighted: false }],
// ];

const MapComponent = ({ locationList }) => {
  const [hoveredLocation, setHoveredLocation] = useState(null);

  // Default locations if no hover is active
  const defaultLocations = [
    { name: 'Dubai', coords: [25.276987, 55.296249], isHighlighted: true },
  ];

  const activeLocations = hoveredLocation || defaultLocations;

  const bounds = activeLocations.map((loc) => loc.coords);
  const linePath = activeLocations.map((loc) => loc.coords);

  return (
    <Box
      sx={{
        '.leaflet-control-attribution': {
          display: 'none !important',
        },
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <MapContainer
            scrollWheelZoom={true}
            style={{ height: '300px', width: '100%' }} // Map container size
          >
            <FitBounds bounds={bounds} />
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/tripfindy/cm8pkpnu8006l01qq02l8c27q/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHJpcGZpbmR5IiwiYSI6ImNtNGZqYXg3eTE1cXoybnM4MTg0NGpqcXUifQ.XJa8_pLcAg4BV6UQJ68SAQ`}
              attribution=""
            />

            <Polyline
              positions={linePath}
              color="#5e90cc"
              weight={3}
              zIndex={1}
            />

            {/* Markers and Labels */}
            {activeLocations.map((loc, index) => {
              const customLabel = new L.DivIcon({
                className: 'custom-label',
                html: `<div style="
                  color: var(--primary);
                  font-size: 13px;
                  font-weight: 600;
                  margin-top: 10px;
                  width: 100px;
                  text-align: center;
                ">${loc.name}</div>`,
              });

              if (index === activeLocations.length - 1) {
                return (
                  <Marker
                    key={`marker-${index}`}
                    position={loc.coords}
                    icon={redIcon}
                  >
                    <CircleMarker
                      center={loc.coords}
                      radius={5}
                      color="white"
                      fillColor="var(--primary)"
                      fillOpacity={1}
                    >
                      <Marker position={loc.coords} icon={customLabel}></Marker>
                    </CircleMarker>
                  </Marker>
                );
              } else if (index === 0) {
                return (
                  <CircleMarker
                    key={`circle-${index}`}
                    center={loc.coords}
                    radius={5}
                    color="white"
                    fillColor="var(--primary)"
                    fillOpacity={1}
                  >
                    <Marker position={loc.coords} icon={customLabel}></Marker>
                  </CircleMarker>
                );
              } else {
                return (
                  <CircleMarker
                    key={`intermediate-${index}`}
                    center={loc.coords}
                    radius={4}
                    color="white"
                    fillColor="var(--dark-orange)"
                    fillOpacity={1}
                    weight={2}
                  >
                    <Marker position={loc.coords} icon={customLabel}></Marker>
                  </CircleMarker>
                );
              }
            })}
          </MapContainer>
        </Grid>

        {/* <Grid item xs={4}>
          <Box>
            <Typography variant="h5" gutterBottom>
              Flights to Dubai
            </Typography>
            <List>
              {locationList.map((locations, index) => (
                <ListItem
                  key={`list-item-${index}`}
                  onMouseEnter={() => setHoveredLocation(locations)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  <ListItemText
                    primary={locations[0]?.name}
                    secondary={locations[1]?.name || ''}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default MapComponent;
