import { Box, Typography, LinearProgress } from '@mui/material';

// Define consistent colors for each category
const titleColors = {
  Vibe: '#4caf50',
  Service: '#2196f3',
  Food: '#ff9800',
  Location: '#9c27b0',
  'Wellness Area': '#00bcd4',
  Cleanliness: '#f44336',
  Breakfast: '#292764',
  Room: '#3f51b5',
  Comfort: '#795548',
  Amenities: '#607d8b',
  WiFi: '#009688',
  Bar: '#e91e63',
};

export default function ScoresBarChart({ goodToKnowList = [] }) {
  const scores = goodToKnowList[0]?.goodToKnowList || [];

  if (!Array.isArray(scores) || scores.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No scores available.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {scores.map(({ title = 'Untitled', score = 0, count = 0 }) => {
        const color = titleColors[title] || '#1976d2';
        const percentage = Math.min((score / 5) * 100, 100);

        return (
          <Box key={title} sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontSize: 11, color }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 11 }}>
                {score.toFixed(1)} ({count})
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: color,
                },
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
}
