/* eslint-disable react/prop-types */
import StarIcon from '@mui/icons-material/Star';
import { Stack } from '@mui/material';

const Rating = ({ rating }) => {
  const parsedRating = Number(rating);
  const safeRating =
    !isNaN(parsedRating) && parsedRating >= 0 && parsedRating <= 5
      ? parsedRating
      : 0;

  const filledStars = Math.floor(safeRating);
  const halfStar = safeRating % 1 >= 0.5;
  const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      {/* Filled stars */}
      {[...Array(filledStars)].map((_, i) => (
        <StarIcon
          key={`filled-${i}`}
          sx={{ fontSize: 12, color: '#FFB400' }}
        />
      ))}

      {/* Half star */}
      {halfStar && (
        <StarIcon
          key="half"
          sx={{
            fontSize: 12,
            color: '#FFB400',
            clipPath: 'inset(0 50% 0 0)',
          }}
        />
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon
          key={`empty-${i}`}
          sx={{ fontSize: 12, color: '#d3d3d3' }}
        />
      ))}
    </Stack>
  );
};

export default Rating;
