/* eslint-disable react/prop-types */
import { HotelInfo } from './HotelInfo';
import { Box, Button, Card, Typography } from '@mui/material';
// import { HotelCancellationsText } from './HotelCancellationsText';

export const DefaultChat = ({
  hotel,
  hotelName,
  checkIn,
  checkOut,
  roomAllocation,
  result,
  visibleReasons,
  selectedReason,
  setSelectedReason,
  formatStatus,
  readableStatusArray,
  showAllReasons,
  setShowAllReasons,
}) => {
  return (
    <>
      {hotel && (
        <HotelInfo
          hotelName={hotelName}
          checkIn={checkIn}
          checkOut={checkOut}
          roomAllocation={roomAllocation}
          result={result}
        />
      )}

      <Card
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 3,
          border: '1px dashed #ccc',
          backgroundColor: '#fffdfc',
          boxShadow: '0 1px 6px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          It looks like this booking doesn't have an active conversation with
          support team yet.
          <br />
          To start a conversation, please choose a topic below that best
          describes your query.
        </Typography> */}

        {/* <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      backgroundColor: '#fff3e0',
                      border: '1px solid #ffe0b2',
                      borderRadius: 2,
                      p: 2,
                      mb: 2,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontSize: 13 }}>
                      If you’ve already discussed this issue outside of the platform, please choose the most relevant topic to continue the conversation here.
                    </Typography>
                  </Box> */}

        <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 1 }}>
          🔍 Common Topics You Can Select:
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {visibleReasons?.map((reason) => (
            <Button
              key={reason}
              variant={
                selectedReason.trim() === reason.trim()
                  ? 'contained'
                  : 'outlined'
              }
              size="small"
              sx={{ fontSize: 10 }}
              onClick={() =>
                setSelectedReason((prev) =>
                  prev.trim() === reason.trim() ? '' : reason
                )
              }
            >
              {formatStatus(reason)}
            </Button>
          ))}

          {readableStatusArray?.length > 10 && (
            <Button
              size="small"
              sx={{ fontSize: 10 }}
              onClick={() => setShowAllReasons((prev) => !prev)}
            >
              {showAllReasons ? 'See Less' : 'See More'}
            </Button>
          )}
        </Box>
      </Card>

      {/* {hotel && <HotelCancellationsText />} */}
    </>
  );
};
