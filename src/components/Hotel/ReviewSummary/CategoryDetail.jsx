import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Stack,
} from '@mui/material';
import PropTypes from 'prop-types';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import moment from 'moment/moment';
import Rating from '../content/Rating';
const CategoryDetail = ({ title = 'No Title', list = [], sentiment, data }) => {
  // Validate list is actually an array
  const safeList = Array.isArray(list) ? list : [];

  return (
    <Card sx={{ mb: 1.5, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
      <CardContent>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box display="flex" alignItems="center" mb={1}>
            <Avatar
              src={title}
              alt={title}
              sx={{ width: 32, height: 32, mr: 1 }}
            />
            <Box display="flex" alignItems="center">
              <Typography
                sx={{
                  color: 'var(--primary)',
                  fontWeight: 500,
                  fontSize: { xs: 12, md: 16 },
                  marginRight: 1,
                }}
                noWrap
              >
                {title || ''}
              </Typography>

              <Rating rating={data?.rating || 0} />
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography
              sx={{
                color: 'var(--secondary)',
                fontSizeL: 12,
              }}
            >
              {moment(data?.dateSubmitted?.split('T')[0], 'YYYY-MMM').format(
                'MMM YYYY'
              )}
            </Typography>
          </Box>
        </Stack>

        {safeList.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            No items to display.
          </Typography>
        ) : (
          safeList.map((item, idx) => (
            <Typography
              variant="body2"
              key={idx}
              sx={{
                color: 'var(--secondary)',
                display: 'flex',
                alignItems: 'basline',
                gap: 1, // adds space between icon and text
              }}
            >
              {item?.sentiment === undefined || item?.sentiment === '' ? (
                <SmsRoundedIcon sx={{ fontSize: 18, color: 'gray', mt: 0.2 }} />
              ) : item?.sentiment  === 'pos' ? (
                <CheckRoundedIcon
                  sx={{ fontSize: 18, color: 'green', mt: 0.2 }}
                />
              ) : (
                <CloseRoundedIcon
                  sx={{ fontSize: 18, color: 'red', mt: 0.2 }} 
                />
              )}
              {item?.text || 'No content available'} 
            </Typography>
          ))
        )}
      </CardContent>
    </Card>
  );
};

// Optional: Prop validation
CategoryDetail.propTypes = {
  title: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      sentiment: PropTypes.string,
    })
  ),
  image: PropTypes.string,
};

export default CategoryDetail;
