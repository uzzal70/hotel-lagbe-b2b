
import { Box, IconButton, Paper, Popover, Skeleton, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiPicker from "emoji-picker-react";

export default function LiveChatSkeleton() {
    const widths = [250, 180, 130, 200, 160, 140];
    return (
        <Paper
            elevation={6}
            sx={{
                width: 350,
                height: 520,
                position: "fixed",
                bottom: 70,
                right: 24,
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                overflow: "hidden",
                zIndex: 1000,
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    bgcolor: "var(--primary)",
                    p: 2,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="subtitle1" fontWeight={600} color={"white"}>
                    Live Chat
                </Typography>
                <Skeleton variant="circular" width={24} height={24} />
            </Box>

            {/* Chat messages area */}
            <Box
                sx={{
                    flexGrow: 1,
                    p: 2,
                    bgcolor: "#f1f1f1",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                }}
            >
                {widths.map((width, i) => (
                    <Box
                        key={i}
                        sx={{
                            alignSelf: i % 2 === 0 ? "flex-start" : "flex-end",
                        }}
                    >
                        <Skeleton
                            variant="rectangular"
                            width={width}
                            height={30}
                            sx={{ borderRadius: 2 }}
                        />
                        <Skeleton variant="text" width={50} height={10} sx={{ mt: 0.5 }} />
                    </Box>
                ))}

            </Box>

            {/* Divider */}
            <Box sx={{ p: 1.5, display: "flex", alignItems: "center", bgcolor: "#fafafa", gap: 1 }}>
                <IconButton size="small">
                    <EmojiEmotionsIcon />
                </IconButton>
                <Popover
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                    transformOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                    <EmojiPicker height={350} width={300} />
                </Popover>
                <TextField

                    fullWidth
                    placeholder={"Type a message..."}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    sx={{
                        bgcolor: "white",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        border: "1px solid #ccc",
                        "& .MuiInputBase-input": { fontSize: 14 },
                    }}
                />

                <IconButton color="primary" >
                    <SendIcon />
                </IconButton>
            </Box>
        </Paper>
    );
}
