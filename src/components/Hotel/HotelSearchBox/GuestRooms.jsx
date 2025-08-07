import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useDispatch, useSelector } from 'react-redux';
import { setRooms } from '../../../redux/slices/hotelSearchSlice';
import { checkOutClose, closeModal } from '../../../redux/slices/modalOpen';
// Reusable Guest Control Component
const GuestControl = ({
  label,
  value,
  onIncrease,
  onDecrease,
  title,
  maxValue,
  minValue,
}) => (
  <Box sx={{ width: '300px' }}>
    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
      <Stack direction="row" spacing={2} alignItems="center">
        <RemoveCircleIcon
          onClick={value > minValue ? onDecrease : undefined}
          sx={{
            color: value > minValue ? 'var(--primary)' : 'var(--disable)',
            cursor: value > minValue ? 'pointer' : 'default',
            fontSize: 20,
          }}
        />
        <Typography sx={{ color: 'var(--primary)', width: '10px' }}>
          {value}
        </Typography>
        <AddCircleIcon
          onClick={value < maxValue ? onIncrease : undefined}
          sx={{
            color: value < maxValue ? 'var(--primary)' : 'var(--disable)',
            cursor: value < maxValue ? 'pointer' : 'default',
            fontSize: 20,
          }}
        />
      </Stack>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', color: 'var(--white)' }}
      >
        <Typography sx={{ color: 'var(--secondary)', fontSize: 12 }}>
          {label} {title}
        </Typography>
      </Box>
    </Stack>
  </Box>
);

// Reusable Child Age Selector Component
const ChildAgeSelector = ({ value, onChange }) => (
  <Box
    my={0.5}
    sx={{
      px: 1,
      pb: 1,
      border: '1px solid var(--stroke)',
      fontSize: 12,
      borderRadius: 1,
    }}
  >
    <Box>Age</Box>
    <select
      value={value}
      onChange={onChange}
      style={{
        fontSize: 14,
        outline: 'none',
        cursor: 'pointer',
        border: '1px solid var(--stroke)',
        padding: '2px 5px',
        borderRadius: '5px',
      }}
    >
      {/* Range from 1 to 12 for children ages */}
      {[...Array(12).keys()].map((item) => (
        <option key={item + 1} value={item + 1} style={{ height: '100px' }}>
          {item + 1}
        </option>
      ))}
    </select>
  </Box>
);

const GuestRooms = ({ rooms, setRoomModalOpen }) => {
  const dispatch = useDispatch();

  const modalRef = useRef();
  const roomContainerRef = useRef(null);

  const modifyRoom = useCallback(
    (action) => {
      const newRooms = [...rooms];

      if (action === 'add') {
        newRooms.push({
          id: newRooms.length + 1,
          adults: 1,
          children: 0,
          childrenAges: [],
        });

        // Wait for DOM to update (optional delay)
        setTimeout(() => {
          if (roomContainerRef.current) {
            roomContainerRef.current.scrollTo({
              top: roomContainerRef.current.scrollHeight,
              behavior: 'smooth',
            });
          }
        }, 100);
      } else if (action === 'remove' && newRooms.length > 1) {
        newRooms.pop();
      }

      dispatch(setRooms(newRooms));
    },
    [dispatch, rooms]
  );

  const updateGuests = useCallback(
    (roomId, type, value) => {
      const updatedRooms = rooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              [type]: value,
              childrenAges:
                type === 'children'
                  ? room.childrenAges
                      .slice(0, value)
                      .concat(
                        new Array(
                          Math.max(0, value - room.childrenAges.length)
                        ).fill(5)
                      )
                  : room.childrenAges,
            }
          : room
      );

      dispatch(setRooms(updatedRooms));
    },
    [dispatch, rooms]
  );
  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setRoomModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setRoomModalOpen]);
  return (
    <Box
      ref={(el) => {
        modalRef.current = el;
        roomContainerRef.current = el;
      }}
      sx={{
        position: 'absolute',
        top: '140%',
        left: -5,
        zIndex: 100,
        borderRadius: 2,
        bgcolor: 'var(--white)',
        p: 1,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px ',
        maxHeight: 300,
        overflowY: 'auto',
      }}
    >
      {rooms.map((room, i) => (
        <Card key={room.id} sx={{ p: 1, mb: 1, position: 'relative' }}>
          <Box
            sx={{
              color: 'var(--primary)',
              fontSize: { xs: 10, md: 12 },
              mb: 0.5,
            }}
          >
            Room {i + 1}
          </Box>
          {rooms?.length > 1 && (
            <IconButton
              onClick={() => modifyRoom('remove')}
              color="error"
              sx={{
                textAlign: 'center',
                position: 'absolute',
                right: 0,
                top: 0,
              }}
            >
              <Delete
                sx={{
                  fontSize: { xs: 14, md: 16 },
                }}
              />
            </IconButton>
          )}
          <GuestControl
            label="Adults"
            title="Age 13 and above"
            value={room.adults}
            minValue={1}
            maxValue={8}
            onDecrease={() =>
              updateGuests(room.id, 'adults', Math.max(1, room.adults - 1))
            }
            onIncrease={() =>
              updateGuests(room.id, 'adults', Math.min(8, room.adults + 1))
            }
          />
          <GuestControl
            label="Children"
            title="Age Below 13"
            value={room.children}
            minValue={0}
            maxValue={4}
            onDecrease={() =>
              updateGuests(room.id, 'children', Math.max(0, room.children - 1))
            }
            onIncrease={() =>
              updateGuests(room.id, 'children', Math.min(4, room.children + 1))
            }
          />
          <Grid container columnSpacing={1} rowSpacing={0.5}>
            {room.childrenAges.map((age, index) => (
              <Grid item xs={3} key={index}>
                <ChildAgeSelector
                  value={age}
                  onChange={(e) => {
                    const updatedRooms = rooms.map((roomItem) =>
                      roomItem.id === room.id
                        ? {
                            ...roomItem,
                            childrenAges: roomItem.childrenAges.map((age, i) =>
                              i === index ? Number(e.target.value) : age
                            ),
                          }
                        : roomItem
                    );

                    dispatch(setRooms(updatedRooms));
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Card>
      ))}

      <Stack justifyContent={'space-between'} direction={'row'} mt={1}>
        <Button
          variant="outlined"
          size="small"
          sx={{
            border: '1px solid var(--stroke)',
            color: 'var(--primary)',

            ':hover': {
              backgroundColor: 'var(--primary)',
              color: 'var(--white)',
              border: '1px solid var(--stroke)',
            },
            textTransform: 'capitalize',
            fontSize: { xs: 11, md: 12 },
          }}
          startIcon={<Add />}
          onClick={() => modifyRoom('add')}
          disabled={rooms?.length > 5 && true}
        >
          Add another Room
        </Button>
        <Button
          variant="outlined"
          onClick={() => setRoomModalOpen(false)}
          size="small"
          sx={{
            border: '1px solid var(--stroke)',
            color: 'var(--white)',
            bgcolor: 'var(--primary)',
            ':hover': {
              backgroundColor: 'var(--primary)',
              color: 'var(--white)',
              border: '1px solid var(--stroke)',
            },
            textTransform: 'capitalize',
            fontSize: { xs: 11, md: 12 },
          }}
        >
          Done
        </Button>
      </Stack>
    </Box>
  );
};

const GuestRoomsComponent = () => {
  const dispatch = useDispatch();
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const rooms = useSelector((state) => state.hotel.rooms);
  const getRoomSummary = () => {
    const totalRooms = rooms.length;
    const totalAdults = rooms.reduce((acc, room) => acc + room.adults, 0);
    const totalChildren = rooms.reduce((acc, room) => acc + room.children, 0);
    return `${totalRooms} Room, ${totalAdults} ADT, ${totalChildren} CHD`;
  };
  const handleCloseModal = () => {
    dispatch(checkOutClose());
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{ px: 1, py: 0.2, height: '100%' }}
        onClick={() => {
          setRoomModalOpen(true);
          handleCloseModal();
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            color: 'var(--disable)',
            fontWeight: 300,
            mb: 0.5,
          }}
          noWrap
        >
          Rooms and Guests
        </Typography>
        <Typography
          sx={{
            fontSize: 12.5,
            color: 'var(--primary)',
            mb: 0.5,
            fontWeight: 500,
          }}
          noWrap
        >
          {getRoomSummary()}
        </Typography>
      </Box>
      {roomModalOpen && (
        <GuestRooms rooms={rooms} setRoomModalOpen={setRoomModalOpen} />
      )}
    </Box>
  );
};

export default GuestRoomsComponent;
