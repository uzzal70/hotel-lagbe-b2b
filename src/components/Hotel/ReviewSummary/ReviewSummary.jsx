/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { baseUrlHotel } from '../../../../baseurl';
import { useGetItemsQuery } from '../../../redux/slices/apiSlice';
import Review from './Review';
import { Box, Typography } from '@mui/material';
import ReviewSkeleton from './ReviewSkeleton';

const HotelReviews = ({ hotelId }) => {
  const [tripType, setTripType] = useState({
    type: 'all',
    categoryCode: '',
  });
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [category, setCategory] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [fetchUrl, setFetchUrl] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const buildUrl = (tripType, page) => {
    return tripType.type === 'all'
      ? `${baseUrlHotel}/getReviews/${hotelId}?page=${page}`
      : `${baseUrlHotel}/getReviewsByCategory/${hotelId}?categoryCode=${tripType?.categoryCode}&page=${page}`;
  };

  useEffect(() => {
    if (!hotelId) return;
    setFetchUrl(buildUrl(tripType, page));
  }, [hotelId, tripType, page]);

  const { data, error, isFetching } = useGetItemsQuery(
    { url: fetchUrl },
    {
      skip: !fetchUrl,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (!data?.results?.reviews) return;

    const newReviews = data.results.reviews || [];
    const currentPage = data.results.currentPage || page;
    const totalPages = data.results.totalPages || 1;

    setCategory({
      categories: data.results.categories || {},
      highlightLists: data.results.highlightLists || [],
      goodToKnowLists: data.results.goodToKnowLists || [],
    });

    setReviews((prev) =>
      currentPage === 1 ? newReviews : [...prev, ...newReviews]
    );
    setHasMore(currentPage < totalPages);
    setIsLoadingMore(false); // Reset load more spinner
  }, [data]);

  useEffect(() => {
    setPage(1);
    setReviews([]);
    setHasMore(true);
  }, [tripType]);

  const handleTripTypeChange = (type) => {
    const categories = data?.results?.categories || {};
    const categoryCode = type === 'all' ? '' : categories?.[type]?.code || '';
    setTripType({ type, categoryCode });
  };

  return (
    <Box p={1}>
      {/* Error */}
      {error && (
        <Typography
          variant="body1"
          color="error"
          align="center"
          fontWeight="bold"
          py={2}
        >
          {error?.status === 404
            ? 'No reviews found for this hotel.'
            : 'Failed to load reviews. Please try again later.'}
        </Typography>
      )}

      {/* Initial Loading */}
      {isFetching && reviews.length === 0 && <ReviewSkeleton />}

      {/* No Reviews */}
      {!isFetching && reviews.length === 0 && !error && (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          py={2}
        >
          No reviews found.
        </Typography>
      )}

      {/* Review Section */}
      {reviews.length > 0 && category && (
        <Review
          reviews={reviews}
          catagory={category}
          tripType={tripType}
          handleTripTypeChange={handleTripTypeChange}
          hasMore={hasMore}
          isFetching={isFetching}
          setIsLoadingMore={setIsLoadingMore}
          isLoadingMore={isLoadingMore}
          setPage={setPage}
        />
      )}
    </Box>
  );
};

export default HotelReviews;
