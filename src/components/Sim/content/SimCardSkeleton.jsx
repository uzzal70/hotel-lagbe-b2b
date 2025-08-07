import React from "react";
import { Box, Skeleton, Stack } from "@mui/material";

const SimCardSkeleton = () => {
    return (
        <Box sx={{
            display: "flex", justifyContent: 'space-between', mb: 3, paddingX: { xs: 0, md: 0 }, border: 0.1, rounded: 1, borderColor: '#DADFE6', bgcolor: 'var(--white)',
            borderRadius: '10px', my: 1.5, mx: { xs: 0, md: 'unset' }, position: 'relative',
        }}>
            {/* Left Side - SIM Image Skeleton */}
            <Skeleton variant="rectangular" width={140} height={140} sx={{borderRadius: "8px 0px 0px 8px"}} />

            {/* Right Side - SIM Details Skeleton */}
            <Stack sx={{ flex: "1 0 auto", px: { xs: 1, md: 3 }, width: '59%', mt: 1 }}>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Skeleton variant="text" width="60%" height={24} />
                    <Skeleton variant="text" width="20%" height={24} />
                </Stack>

                <Skeleton variant="text" width="80%" height={16} sx={{ mt: 1 }} />
                <Skeleton variant="text" width="70%" height={16} sx={{ mt: 1 }} />
                <Skeleton variant="text" width="90%" height={16} sx={{ mt: 1 }} />
                <Skeleton variant="text" width="50%" height={16} sx={{ mt: 1 }} />
            </Stack>

            {/* Right Side - Price and Button Skeleton */}
            <Stack sx={{ display: { xs: 'none', md: 'block', width: 150 }, textAlign: 'end' }}>
                <Skeleton variant="text" width="40%" height={24} sx={{ mx: 'auto', mt: 1.6 }} />
                <Skeleton variant="text" width="60%" height={24} sx={{ mx: 'auto', mt: 1 }} />
                <Skeleton variant="rectangular" width="80%" height={36} sx={{ mx: 'auto', mt: 2 }} />
            </Stack>
        </Box>
    );
};

export default SimCardSkeleton;
