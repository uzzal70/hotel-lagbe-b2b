import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Rating from './Rating';
import RoomBarLoad from './RoomBarLoad';
import HotelRoomFilterSkeleton from './table/HotelRoomFilterSkeleton';
import LinearProgressDott from '../../Loading/FlightInfoLoading/LinearProgressDott';

const HotelDetailsSkeleton = ({ hide }) => {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', mx: 1 }}>
      <Box sx={{ width: '100%', mt: 0.2 }}>
        <LinearProgressDott />
      </Box>

      <Container sx={{ p: 0 }}>
        <Box
          sx={{
            px: { xs: 1, sm: 2 },
            bgcolor: 'var(--white)',
            my: 2,
            pt: 1,
            borderRadius: 1.5,
            pb: 1,
          }}
        >
          <Stack>
            <Box display="flex" alignItems="center" spacing={2}>
              <Skeleton
                variant="rectangular"
                width="30%"
                sx={{
                  height: { xs: 20, sm: 30 },
                }}
              />
              <Rating rating={''} />
            </Box>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              mb={1.5}
              mt={1}
            >
              <Skeleton
                variant="rectangular"
                width="20%"
                sx={{
                  height: { xs: 8, sm: 10 },
                }}
              />
            </Stack>
          </Stack>

          {/* Image Grid */}
          <Grid container spacing={0.6} sx={{ mt: -1 }}>
            <Grid item xs={12} md={6}>
              <Box>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  sx={{
                    height: { xs: 180, sm: 250, md: 300 },
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={0.5}>
                {[...Array(4)].map((_, i) => (
                  <Grid item xs={6} key={i}>
                    <Box>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        sx={{
                          height: { xs: 90, sm: 120, md: 148 },
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Paper elevation={0} sx={{ my: 1 }}>
            <Grid container spacing={2}>
              {[...Array(3)].map((_, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    sx={{
                      height: { xs: 80, sm: 90, md: 100 },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>

        {[...Array(2)].map((_, index) => (
          <Grid
            item
            xs={12}
            key={index}
            mt={-1}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <Box
              bgcolor="white"
              sx={{ borderRadius: 2, overflow: 'hidden', p: 2 }}
            >
              <Stack direction="row" spacing={2}>
                <Skeleton
                  variant="rectangular"
                  sx={{ width: 120, height: 120 }}
                />
                <Stack spacing={1} flex={1}>
                  <Skeleton variant="rectangular" height={20} width="80%" />
                  <Skeleton variant="rectangular" height={15} width="60%" />
                  <Skeleton variant="rectangular" height={10} width="40%" />
                </Stack>
              </Stack>
              <Box sx={{ mt: 2 }}>
                <Skeleton variant="rectangular" height={40} width="100%" />
              </Box>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                sx={{ mt: 2 }}
              >
                <Stack spacing={1} width="90%">
                  <Skeleton variant="rectangular" height={15} />
                  <Skeleton variant="rectangular" height={10} />
                </Stack>
                <Skeleton variant="rectangular" height={32} width="48%" />
              </Stack>
            </Box>
          </Grid>
        ))}

        {/* <RoomBarLoad /> */}
        {hide ? null : (
          <Box>
            <RoomBarLoad />
            <HotelRoomFilterSkeleton />
          </Box>
        )}
        <TableContainer
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            border: '0.5px solid #DADDE3',
            display: { xs: 'none', sm: hide ? 'none' : 'block' },
          }}
        >
          <Table bgColor="white">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'var(--gray)' }}>
                {['Room Type', 'Facilities', 'Guest', 'Price'].map(
                  (head, i) => (
                    <TableCell
                      key={i}
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        p: 1.2,
                        color: '#344258',
                      }}
                    >
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {[...Array(2)].map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {[350, 280, 80, 260].map((w, i) => (
                    <TableCell
                      key={i}
                      sx={{
                        width: w,
                        borderLeft: i === 3 ? '0.5px solid #DADDE3' : '',
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={w}
                        sx={{
                          height: { xs: 80, sm: 90, md: 110 },
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default HotelDetailsSkeleton;
