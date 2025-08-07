/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import ScoreCard from './ScoreCard';
import ScoresBarChart from './ScoresBarChart';
import ReviewContent from './ReviewContent';

const Review = ({
  catagory,
  reviews,
  tripType,
  handleTripTypeChange,
  hasMore,
  isFetching,
  setIsLoadingMore,
  isLoadingMore,
  setPage,
}) => {
  const {
    categories = {},
    goodToKnowLists = [],
    highlightLists = [],
  } = catagory || {};

  const tabStyle = {
    color: '#666',
    '&.Mui-selected': {
      color: '#1976d2',
      fontWeight: 'bold',
    },
    fontSize: 12,
    minWidth: 'fit-content',
  };

  return (
    <Box>
      <ScoreCard
        rating={Number(reviews?.[0]?.rating ?? 0)}
        totalReviews={Number(reviews?.[0]?.count ?? reviews.length)}
      />

      {/* Tabs for Category Selection */}
      <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Tabs
          value={tripType?.type}
          onChange={(e, newValue) => handleTripTypeChange(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{ style: { backgroundColor: '#1976d2' } }}
          sx={{ mt: 2 }}
        >
          <Tab label="All" value="all" sx={tabStyle} />
          {Object.keys(categories).length > 0 ? (
            Object.keys(categories).map((key) => (
              <Tab
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={key}
                sx={tabStyle}
              />
            ))
          ) : (
            <Tab disabled label="No Categories" />
          )}
        </Tabs>
      </Box>

      <Grid container spacing={{ xs: 1, md: 2 }} py={2}>
        <Grid item xs={12} md={4}>
          <Box>
            <ScoresBarChart goodToKnowList={goodToKnowLists} />

            <Card sx={{ mt: 3, p: 1 }}>
              <Typography variant="h6" sx={{ color: 'var(--primary)' }}>
                Highlights
              </Typography>

              {highlightLists?.[0]?.highlightList?.length > 0 ? (
                <List>
                  {highlightLists?.[0]?.highlightList?.map((h, idx) => (
                    <ListItem key={idx} sx={{ py: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: 'var(--secondary)' }}
                      >
                        • {h?.text || 'No description'}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No highlights available
                </Typography>
              )}
            </Card>
          </Box>
        </Grid>

        <Grid item xs={12} md={7.5}>
          <ReviewContent review={reviews} />
          <Box>
            {/* Loading More Message */}
            {/* {isLoadingMore && (
              <Box display="flex" justifyContent="center" mt={2}>
                <Typography variant="body2" color="textSecondary">
                  Loading more reviews...
                </Typography>
              </Box>
            )} */}

            {/* Load More Button */}
            <Box
              display={hasMore ? 'flex' : 'none'}
              justifyContent="center"
              mt={4}
            >
              <Button
                sx={{
                  bgcolor: 'var(--primary)',
                  color: 'white',
                  px: 2,
                  textTransform: 'capitalize',
                  '&:hover': {
                    bgcolor: 'var(--primary)',
                    color: 'white',
                  },
                  '&.Mui-disabled': {
                    bgcolor: '#d3d3d3', // light gray background for disabled state
                    color: '#777', // darker text color for contrast
                  },
                }}
                onClick={() => {
                  setIsLoadingMore(true);
                  setPage((prev) => prev + 1);
                }}
                disabled={isLoadingMore}
                startIcon={
                  isLoadingMore && (
                    <CircularProgress size={20} color="inherit" />
                  )
                }
              >
                {isLoadingMore ? 'Loading more reviews...' : 'Load More'}
              </Button>
            </Box>

            {/* No More Reviews */}
            {/* {!hasMore && !isFetching && reviews.length > 0 && (
              <Box display="flex" justifyContent="center" py={4}>
                <Typography variant="body2" color="textSecondary">
                  No more reviews.
                </Typography>
              </Box>
            )} */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Review;
