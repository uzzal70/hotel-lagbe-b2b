/* eslint-disable react/prop-types */
import {
  Tooltip,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FlatwareIcon from '@mui/icons-material/Flatware';
import PoolOutlinedIcon from '@mui/icons-material/PoolOutlined';
import DryCleaningOutlinedIcon from '@mui/icons-material/DryCleaningOutlined';
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';

const styleicon = {
  fontSize: { xs: 14, md: 16 },
  color: 'var(--secondary)',
  border: '1px solid var(--stroke)',
  p: 0.2,
  borderRadius: 0.5,
};

const priorityAmenities = [
  { keyword: 'WiFi', icon: <WifiIcon sx={styleicon} />, label: 'Free WiFi' },
  {
    keyword: 'Parking',
    icon: <LocalParkingIcon sx={styleicon} />,
    label: 'Free Parking',
  },
  {
    keyword: 'Breakfast',
    icon: <FreeBreakfastIcon sx={styleicon} />,
    label: 'Breakfast',
  },
  {
    keyword: 'Fitness',
    icon: <FitnessCenterIcon sx={styleicon} />,
    label: 'Fitness Center',
  },
  {
    keyword: 'Airport',
    icon: <AirportShuttleOutlinedIcon sx={styleicon} />,
    label: 'Airport Shuttle',
  },
  {
    keyword: 'Restaurant',
    icon: <FlatwareIcon sx={styleicon} />,
    label: 'Restaurant',
  },
  {
    keyword: 'pool',
    icon: <PoolOutlinedIcon sx={styleicon} />,
    label: 'Swimming Pool',
  },
  {
    keyword: 'Dry cleaning',
    icon: <DryCleaningOutlinedIcon sx={styleicon} />,
    label: 'Laundry Services',
  },
];

function extractTopAmenities(facilitiesData) {
  if (!Array.isArray(facilitiesData)) return [];

  const allFacilities = facilitiesData.flatMap((item) =>
    Array.isArray(item?.facilities) ? item.facilities : []
  );

  const matched = priorityAmenities
    .map((priority) => {
      const match = allFacilities.find((f) =>
        f?.name?.toLowerCase().includes(priority.keyword.toLowerCase())
      );
      return match ? { ...priority, name: match.name } : null;
    })
    .filter(Boolean);

  return matched.slice(0, 8);
}

const Amenities = ({ facilitiesData }) => {
  const topAmenities = extractTopAmenities(facilitiesData);
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));

  const visibleAmenities = isSmallDevice
    ? topAmenities.slice(0, 4)
    : topAmenities;

  return (
    <div>
      <Tooltip
        placement="top"
        title={
          <Box
            px={1}
            py={0.5}
            fontSize="0.875rem"
            maxWidth={300}
            sx={{
              maxHeight: 200,
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#aaa',
                borderRadius: '4px',
              },
            }}
          >
            {Array.isArray(facilitiesData) && facilitiesData.length > 0 ? (
              facilitiesData.map((group) => (
                <Box key={group?.Id || Math.random()} mb={1} fontWeight="300">
                  <Typography fontSize={12} color="var(--white)">
                    {group?.Name || 'Unknown Group'}
                  </Typography>
                  <Box pl={1} fontSize={10}>
                    {Array.isArray(group?.facilities) &&
                    group.facilities.length > 0 ? (
                      group.facilities.map((fac) => (
                        <Box
                          key={fac?.id || Math.random()}
                          color="var(--white)"
                        >
                          • {fac?.name || 'Unnamed Facility'}
                        </Box>
                      ))
                    ) : (
                      <Typography fontSize={10} color="var(--white)">
                        No facilities listed.
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))
            ) : (
              <Typography fontSize={12} color="var(--white)">
                No amenities available.
              </Typography>
            )}
          </Box>
        }
        slotProps={{
          tooltip: {
            sx: {
              backgroundColor: '#333',
              color: '#fff',
              borderRadius: 1,
              fontSize: '0.875rem',
              whiteSpace: 'normal',
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 0.7,
            cursor: 'pointer',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {topAmenities.length > 0
            ? visibleAmenities?.map((item, index) => (
                <Box key={index}>
                  <Box display="flex" alignItems="center">
                    {item.icon}
                    {topAmenities.length < 3 &&
                      index === topAmenities.length - 1 && (
                        <PostAddIcon sx={styleicon} />
                      )}
                  </Box>
                </Box>
              ))
            : priorityAmenities.slice(0, 2).map((item, index) => (
                <Box key={index} display="flex" alignItems="center">
                  {item.icon}
                </Box>
              ))}
        </Box>
      </Tooltip>
    </div>
  );
};

export default Amenities;
