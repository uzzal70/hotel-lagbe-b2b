import { Box, Typography } from '@mui/material';
import CategoryDetail from './CategoryDetail';

const ReviewContent = ({ review }) => {
  return (
    <Box>
      {review.length > 0 ? (
        review.map((r, i) => (
          <CategoryDetail
            key={i}
            title={r?.title || r?.reviewerName || 'Untitled'}
            sentiment={r?.sentiment || ''}
            list={r?.summarySentenceList || [{ text: r?.text }] || []}
            data={r}
          />
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No reviews to display.
        </Typography>
      )}
    </Box>
  );
};

export default ReviewContent;
