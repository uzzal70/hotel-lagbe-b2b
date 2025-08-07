import { Card, CardContent, Typography, Box } from '@mui/material';

const ScoreCard = ({ rating, totalReviews }) => (
  <Box
    display="flex"
    alignItems="center"
    sx={{
      bgcolor: 'var(--gray)',
      p: 1,
      borderRadius: 1,
    }}
  >
    <Typography variant="h4" color="green" mr={2}>
      {rating}
    </Typography>
    <Box>
      <Typography variant="subtitle1">Excellent</Typography>
      <Typography variant="body2">({totalReviews} reviews)</Typography>
    </Box>
  </Box>
);

export default ScoreCard;
