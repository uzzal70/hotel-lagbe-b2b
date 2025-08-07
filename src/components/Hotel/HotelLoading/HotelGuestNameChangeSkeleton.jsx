
import { Box, Card, Container, Grid, Skeleton } from '@mui/material';

const HotelGuestNameChangeSkeleton = () => {
    
    return (
        <>
            <Box
                sx={{
                    color: 'var(--white)',
                    fontSize: { xs: 16, sm: 20 },
                    fontWeight: 400,
                    py: { xs: 1.5, sm: 2, md: 1.5 },
                    px: { xs: 2, sm: 2, md: 3 },
                    bgcolor: 'var(--primary)',
                    display: 'flex',
                    position: 'sticky',
                    top: { xs: 0, md: 70, lg: 80 },
                    zIndex: 1,
                }}
            >
                <Skeleton variant="rectangular" width={120} height={30} />
            </Box>

            <Container>
                <Box my={3}>
                    <Grid container spacing={2}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                            <Skeleton variant="text" width="60%" height={25} />
                            <Skeleton variant="rectangular" height={1} sx={{ my: 1 }} />
                            <Skeleton variant="text" width="80%" height={20} />
                            <Skeleton variant="text" width="70%" height={20} />
                            <Skeleton variant="text" width="50%" height={20} />
                            <Skeleton variant="text" width="60%" height={20} />
                            <Box mt={2}>
                                <Skeleton variant="rounded" height={35} />
                                <Skeleton variant="rounded" height={35} sx={{ mt: 1 }} />
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box mt={3}>
                <Skeleton variant="rounded" width="100px" height={25} />
                <Skeleton variant="rounded" width="100%" height={100} sx={{ mt: 1 }} />
                <Skeleton variant="rounded" width={120} height={40} sx={{ mt: 2 }} />
            </Box>
                </Box>
            </Container>
        </>
    );
};

export default HotelGuestNameChangeSkeleton;
