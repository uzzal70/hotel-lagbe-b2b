import { Box, Skeleton } from '@mui/material';

const SmallRoomSelectionItemListSkeleton = () => {
    return (
        <Box bgcolor="white" mb={2} sx={{ borderRadius: 2, border: '1px solid #E0E0E0' , width:'100%'}}>
            <Box sx={{ borderRadius: 2, overflow: 'hidden', p: 1 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Image Skeleton */}
                    <Skeleton variant="rectangular" width={120} height={120} sx={{ borderRadius: 1 }} />

                    {/* Text Skeletons */}
                    <Box sx={{ flexGrow: 1 }}>
                        <Skeleton variant="text" width="60%" height={20} />
                        <Skeleton variant="text" width="50%" height={15} />
                        <Skeleton variant="text" width="40%" height={15} />
                        <Skeleton variant="text" width="45%" height={15} />
                        <Skeleton variant="text" width="50%" height={15} />
                    </Box>
                </Box>

                {/* Bed Info & Facilities */}
                <Skeleton variant="text" width="70%" height={18} sx={{ mt: 1 }} />
                <Skeleton variant="text" width="50%" height={15} sx={{ mt: 1 }} />
                <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 1 }} />
            </Box>

            {/* Price & Button */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2,
                    py: 1.5,
                    backgroundColor: '#F7F9FC',
                    borderRadius: '0px 0px 5px 5px',
                    height: 60,
                }}
            >
                <Box>
                    <Skeleton variant="text" width={60} height={20} />
                    <Skeleton variant="text" width={140} height={15} />
                </Box>
                <Skeleton variant="rectangular" width={75} height={30} sx={{ borderRadius: 1 }} />
            </Box>
        </Box>
    );
};

export default SmallRoomSelectionItemListSkeleton;
