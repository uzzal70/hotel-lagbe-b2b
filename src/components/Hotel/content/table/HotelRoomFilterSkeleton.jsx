import { Box, Skeleton, Stack } from '@mui/material';

const HotelRoomFilterSkeleton = () => {
    return (
        <Box
            sx={{
                px: { xs: 1, sm: 2, md: 1.5 },
                bgcolor: 'var(--white)',
                my: 2,
                mb: { xs: 0, md: 2 },
                py: 1,
                borderRadius: 1.5,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={1}
                sx={{ width: '100%' }}
            >
                <Skeleton variant="rectangular" width={200} height={34} sx={{ borderRadius: 1 }} />
                <Skeleton variant="rectangular" width={110} height={34} sx={{ borderRadius: 1 }} />
                <Skeleton variant="rectangular" width={110} height={34} sx={{ borderRadius: 1 }} />
            </Stack>

            <Skeleton variant="rectangular" width={80} height={34} />
        </Box>
    );
};

export default HotelRoomFilterSkeleton;
