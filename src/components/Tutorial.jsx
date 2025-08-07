import { Box, Button, Grid, Modal, Skeleton, Stack } from '@mui/material';
import BackButton from './Common/BackButton';
import { useState } from 'react';
import { useGetItemsQuery } from '../redux/slices/apiSlice';
import HeaderTitle from '../common/HeaderTitle';

const Tutorial = () => {
  const supporturl = `/tutorials/getAllTutorialsByAgent`;
  const { data, error, isLoading } = useGetItemsQuery({
    url: supporturl,
  });

  let content = null;

  if (isLoading) {
    content = (
      <Box sx={{ m: 2, p: { xs: 2, md: 3 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <Box
              sx={{
                bgcolor: 'var(--white)',
                borderRadius: '10px',
                overflow: 'hidden',
                p: 2,
              }}
            >
              <Skeleton height="200px" width={'100%'} />
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={6}>
                  <Skeleton height="50px" width={'100%'} />
                </Grid>
                <Grid item xs={6}>
                  <Skeleton height="50px" width={'100%'} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box
              sx={{
                bgcolor: 'var(--white)',
                borderRadius: '10px',
                overflow: 'hidden',
                p: 2,
              }}
            >
              <Skeleton height="200px" width={'100%'} />
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={6}>
                  <Skeleton height="50px" width={'100%'} />
                </Grid>
                <Grid item xs={6}>
                  <Skeleton height="50px" width={'100%'} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box
              sx={{
                bgcolor: 'var(--white)',
                borderRadius: '10px',
                overflow: 'hidden',
                p: 2,
              }}
            >
              <Skeleton height="200px" width={'100%'} />
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={6}>
                  <Skeleton height="50px" width={'100%'} />
                </Grid>
                <Grid item xs={6}>
                  <Skeleton height="50px" width={'100%'} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (error) {
    content = <Box p={2}>Not Found </Box>;
  }

  if (data?.length > 0) {
    content = (
      <Box sx={{ m: 2, p: { xs: 2, md: 3 } }}>
        <Grid container spacing={2}>
          {data?.map((video, i) => (
            <Grid item xs={12} md={6} lg={4} key={i}>
              <Box
                sx={{
                  bgcolor: 'var(--white)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  p: 2,
                }}
              >
                <iframe
                  width="100%"
                  height="250px"
                  src={video.videoId}
                  title="Explore Greece With TripFindy"
                  frameBorder="0"
                ></iframe>
                <Stack
                  direction={'row'}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box sx={{ mt: 1, color: 'var(--primary)', fontSize: 14 }}>
                    Title: {video.title}
                  </Box>
                  <Button size="small" onClick={() => openModal(video)}>
                    View
                  </Button>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openModal = (video) => {
    setSelectedVideo(video);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setModalIsOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: 'calc(100vh - 80px)' },
        pb: { xs: 10, md: 1 },
      }}
    >
      <HeaderTitle headerTitle={`Tutorial`} showCustomButtons={false} />

      {content}

      <Modal open={modalIsOpen} onClose={closeModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            border: 'none',
            boxShadow: 24,
            borderRadius: '6px',
            py: 0,
            minWidth: { xs: '80%', sm: '50%', md: '40%' },
            minHeight: { xs: '50%', sm: '50%', md: '400px' },
            maxHeight: { xs: '60%', sm: '50%', md: '400px' },
            overflow: 'hidden',
          }}
        >
          <iframe
            title={selectedVideo?.title}
            width="100%"
            height="400px"
            src={selectedVideo?.videoId}
            frameBorder="0"
          ></iframe>
        </Box>
      </Modal>
    </Box>
  );
};

export default Tutorial;
