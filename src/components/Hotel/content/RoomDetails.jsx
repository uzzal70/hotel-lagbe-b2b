
import { Box, Card, Typography, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import BedIcon from "@mui/icons-material/Bed";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const RoomDetails = () => {
  return (
    <Card
      sx={{
        borderRadius: "8px",
        boxShadow: 0,
        mt: 1.5
      }}
    >
      <Box
        sx={{
          backgroundColor: "var(--primary)",
          color: "white",
          padding: "8px 16px",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <Typography sx={{
          fontWeight: 500, color: 'var(--white)',fontSize: { xs: 12, md: 13 }
        }}>
          Room Details
        </Typography>
      </Box>
      <Box sx={{ border: "1px solid #E0E0E0", m: 1, p: 1, px: 1.5, borderRadius: "8px" }}>
        <Typography sx={{ color: "var(--black)", fontSize: { xs: 12, md: 14 }, fontWeight: 500, mb: 1, pt: 0, mt: 0 }} rounded>
          Room 1
        </Typography>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PersonIcon fontSize="small" />
            <Typography sx={{ color: "var(--black)", fontSize: { xs: 11, md: 13 } }}>2 Adults</Typography>
            <ChildCareIcon fontSize="small" />
            <Typography sx={{ color: "var(--black)", fontSize: { xs: 11, md: 13 } }}>1 Child</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <BedIcon fontSize="small" />
            <Typography sx={{ color: "var(--black)", fontSize: { xs: 11, md: 13 } }}>Double Premium Queen Bed</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <RestaurantIcon fontSize="small" />
            <Typography sx={{ color: "var(--black)", fontSize: { xs: 11, md: 13 } }}>Breakfast not Included</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CheckCircleIcon fontSize="small" sx={{ color: "var(--green-light)" }} />
            <Typography variant="body2" sx={{ color: "var(--green-light)", fontSize: { xs: 11, md: 13 } }}>
              Free Cancellation till 27 January
            </Typography>
          </Stack>
        </Stack>
      </Box>

    </Card>
  );
};

export default RoomDetails;
