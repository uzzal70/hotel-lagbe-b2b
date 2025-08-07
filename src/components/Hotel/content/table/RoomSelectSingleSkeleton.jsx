import { Box, Skeleton, Typography } from '@mui/material';

const RoomSelectSingleSkeleton = () => {
    return (
        <Box >
              <Typography sx={{ fontSize: 16, fontWeight: 500, borderBottom:1, borderColor:'var(--secondary)' }} >Room</Typography>

            {[...Array(2)].map((_, i) => (
                <Box key={i} mb={1.5} mt={1.5}>
                    <Box
                        sx={{
                            px: 1,
                            py: 1,
                            border: 0.5,
                            borderColor: 'var(--brG)',
                            borderRadius: 2,
                            backgroundColor: 'var(--bgG)',
                        }}
                    >
                        <Skeleton variant="text" width="60%" height={24} />

                        <Skeleton variant="text" width="40%" height={16} />

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
                            <Skeleton variant="circular" width={16} height={16} />
                            <Skeleton variant="text" width="40%" height={16} />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Skeleton variant="text" width={80} height={20} />
                                <Skeleton variant="text" width={160} height={12} />
                            </Box>
                            <Skeleton variant="rectangular" width={70} height={28} sx={{ borderRadius: 1 }} />
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default RoomSelectSingleSkeleton;
