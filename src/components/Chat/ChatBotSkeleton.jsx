import {
    Box,
    Paper,
    Typography,
    IconButton,
    Divider,
    Skeleton,
    Avatar,
} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";

export default function ChatBotSkeleton() {
    const widths = [240, 180, 120, 200, 160, 140];

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
                    color: "white",
                    p: 2,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="subtitle1" fontWeight={600}>
                    Booking Reference
                </Typography>
                <Skeleton variant="circular" width={24} height={24} sx={{ bgcolor: "grey.400" }} />
            </Box>

            {/* Chat Messages */}
            <Box
                sx={{
                    flexGrow: 1,
                    p: 2,
                    bgcolor: "#f1f1f1",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                {widths.map((w, i) => (
                    <Box
                        key={i}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: i % 2 === 0 ? "flex-start" : "flex-end",
                            gap: 0.5,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: i % 2 === 0 ? "row" : "row-reverse",
                                gap: 1,
                                alignItems: "flex-end",
                            }}
                        >
                            {i % 2 === 0 && (
                                <Skeleton variant="circular">
                                    <Avatar sx={{ width: 30, height: 30 }} />
                                </Skeleton>
                            )}
                            <Skeleton
                                variant="rectangular"
                                width={w}
                                height={32}
                                sx={{
                                    borderRadius: 2,
                                    bgcolor: i % 2 === 0 ? "#e0e0e0" : "#1976d2",
                                }}
                            />
                        </Box>
                        <Skeleton width={60} height={10} />
                    </Box>
                ))}
            </Box>

            {/* Footer */}
            <Divider />
            <Box
                sx={{
                    p: 1.5,
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "#fafafa",
                    gap: 1,
                }}
            >
                <IconButton disabled size="small">
                    <EmojiEmotionsIcon />
                </IconButton>
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={36}
                    sx={{
                        borderRadius: 1,
                        flexGrow: 1,
                    }}
                />
                <IconButton disabled>
                    <SendIcon />
                </IconButton>
            </Box>
        </Paper>
    );
}
