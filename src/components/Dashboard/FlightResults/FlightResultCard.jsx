/* eslint-disable react/prop-types */
import { memo } from 'react';
import FlightSearchResult from './FlightSearchResult';
import { Box } from '@mui/material';
import CustomPagination from '../../Common/Table/CustomPagination';
const FlightResultCard = ({
  pageData,
  data,
  result,
  tripType,
  totalPassenger,
  pageIndex,
  pageCount,
  gotoPage,
  canPreviousPage,
  canNextPage,
  selected,
  setSelected,
}) => {
  const MemoizedCustomPagination = memo(CustomPagination);
  return (
    <div>
      {pageData?.map((item, i) => (
        <FlightSearchResult
          key={i}
          index={i}
          data={item}
          allData={data}
          uniqueCarriers={result}
          tripType={tripType}
          totalPassenger={totalPassenger}
          pageData={pageData}
          setSelected={setSelected}
          selected={selected}
          pageIndex={pageIndex}
        />
      ))}
      <Box
        sx={{
          pb: { xs: 5, md: 10 },
        }}
      >
        <MemoizedCustomPagination
          pageIndex={pageIndex}
          pageCount={pageCount}
          gotoPage={gotoPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
        />
      </Box>
    </div>
  );
};

export default FlightResultCard;
