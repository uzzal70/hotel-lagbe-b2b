import { Stack, Typography } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// eslint-disable-next-line react/prop-types
const Accordion = ({ handleExpand, value, content }) => {
  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          bgcolor: 'var(--body)',
          px: 2,
          py: 0.8,
          my: 1,
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handleExpand}
      >
        <Typography
          sx={{
            color: 'var(--black)',
            fontSize: { xs: 14, md: 16 },
          }}
        >
          {content || 'Summary'}
        </Typography>
        <KeyboardArrowDownOutlinedIcon
          sx={{
            color: 'var(--dark-sky)',
            fontWeight: 600,
            fontSize: { xs: 25, md: 28 },
            transition: 'transform 0.3s ease-in-out',
            transform: `rotate(${value ? 180 : 0}deg)`,
          }}
        />
      </Stack>
    </div>
  );
};

export default Accordion;
