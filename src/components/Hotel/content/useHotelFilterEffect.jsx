import { useEffect, useMemo, useRef } from 'react';

const areArraysEqual = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b)) return a === b;
  if (a.length !== b.length) return false;
  return a.every((val, i) => val === b[i]);
};

const useHotelFilterEffect = (filters, fetchData, setPage, body) => {
  const prevFiltersRef = useRef();
  const hasInitialLoadRef = useRef(false);

  const memoizedFilters = useMemo(
    () => ({
      hotelName: filters.hotelName,
      finalRate: filters.finalRate,
      freeBreakfast: filters.freeBreakfast,
      isRefundable: filters.isRefundable,
      reviewRatings: filters.reviewRatings || null,
      ratings: [...(filters.ratings || [])],
      type: [...(filters.type || [])],
      facilities: [...(filters.facilities || [])],
      priceRange: {
        min: filters.priceRange?.min ?? 0,
        max: filters.priceRange?.max ?? 0,
      },
    }),
    [
      filters.hotelName,
      filters.finalRate,
      filters.freeBreakfast,
      filters.isRefundable,
      JSON.stringify(filters.reviewRatings || {}),
      JSON.stringify(filters.ratings || []),
      JSON.stringify(filters.type || []),
      JSON.stringify(filters.facilities || []),
      filters.priceRange?.min,
      filters.priceRange?.max,
    ]
  );

  useEffect(() => {
    if (!hasInitialLoadRef.current) {
      hasInitialLoadRef.current = true;
      prevFiltersRef.current = memoizedFilters;
      return;
    }

    const prev = prevFiltersRef.current;

    const isFilterChanged =
      !areArraysEqual(prev?.reviewRatings, memoizedFilters.reviewRatings) ||
      prev?.finalRate !== memoizedFilters.finalRate ||
      prev?.hotelName !== memoizedFilters.hotelName ||
      !areArraysEqual(prev?.ratings, memoizedFilters.ratings) ||
      prev?.freeBreakfast !== memoizedFilters.freeBreakfast ||
      prev?.isRefundable !== memoizedFilters.isRefundable ||
      !areArraysEqual(prev?.type, memoizedFilters.type) ||
      !areArraysEqual(prev?.facilities, memoizedFilters.facilities) ||
      prev?.priceRange?.min !== memoizedFilters.priceRange.min ||
      prev?.priceRange?.max !== memoizedFilters.priceRange.max;

    if (isFilterChanged) {
      prevFiltersRef.current = memoizedFilters;
      setPage(1);
      fetchData(false, 1);
    }
  }, [memoizedFilters, fetchData, setPage]);
};

export default useHotelFilterEffect;
