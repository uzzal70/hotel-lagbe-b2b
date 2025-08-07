import { Box, Modal } from '@mui/material';
const VideoLoader = ({ isInitialLoading }) => {
  return (
    <Box>
      <Modal open={isInitialLoading}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: { xs: '50%', md: '56%' },
            transform: 'translate(-50%, -50%)',
            bgcolor: 'none', // optional background
            p: 2,
            boxShadow: 'none',
            outline: 'none',
            img: {
              borderRadius: 2,
              overflow: 'hidden',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: { xs: '80vw', sm: '60vw', md: '400px' },
              borderRadius: 2,
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            >
              <source
                src={
                  'https://tripfindy-public.s3.ap-southeast-1.amazonaws.com/videos/load.mp4'
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default VideoLoader;
