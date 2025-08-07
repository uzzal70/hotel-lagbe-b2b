import { Box, Stack, Typography } from '@mui/material'

const AddGuest = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
                padding: 2.5,
                py: 1,
                rounded: 1,
                borderColor: '#DADFE6',
                bgcolor: 'var(--white)',
                borderRadius: '10px',
                mx: { xs: 0.5, md: 'unset' },
                position: 'relative',
            }}
        >

            {/* Room */}
            <Box sx={{ mb: 1 }}>
                <Typography
                    sx={{
                        color: "var(--primary)",
                        fontWeight: 500,
                        fontSize: { xs: 12, md: 16 },
                    }}
                >
                    Room - 1
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "var(--primary)",
                        fontSize: { xs: 11, md: 13 },
                    }}
                >
                    Guest names must match the valid identification presented at check-in.
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" my={1}>
                    <Typography
                        sx={{
                            color: "var(--primary)",
                            fontWeight: 500,
                            fontSize: { xs: 12, md: 13 },
                        }}
                    >
                        Main Guest 1
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: "var(--primary)",
                            mb: 2,
                            fontSize: { xs: 11, md: 13 },
                        }}
                    >
                        This booking allows for up to 2 guests.
                    </Typography>
                </Stack>


            </Box>

        </Box>
    )
}

export default AddGuest
