/* eslint-disable react/prop-types */
import { Box, IconButton } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';

export const ChatBotButton = ({ onClick }) => {
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 105,
                right: 25,
                zIndex: 1000,
                display: {
                    xs: 'bolck',
                    md: 'none',
                },
            }}
        >
            <IconButton
                onClick={onClick}
                color="primary"
                sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                }}
            >
                <ChatIcon />
            </IconButton>
        </Box>
    )
}
