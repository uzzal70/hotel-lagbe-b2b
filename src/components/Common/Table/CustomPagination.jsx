/* eslint-disable react/prop-types */
import Pagination from '@mui/material/Pagination';
import { Box, PaginationItem, Stack } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const CustomPagination = ({
  pageIndex,
  pageCount,
  gotoPage,
  canPreviousPage,
  canNextPage,
}) => {
  return (
    <Box
      sx={{
        '.MuiPaginationItem-root': {
          minWidth: { xs: '25px', sm: '30px' },
          height: { xs: '25px', sm: '30px' },
        },
        '.MuiPagination-ul button': {
          border: '1px solid var(--btn-stroke)',
        },
        '.Mui-selected': {
          backgroundColor: 'var(--primary) !important',
        },
        button: {
          border: 'none',
          cursor: 'pointer',
          bgcolor: 'transparent',
        },
      }}
    >
      <Stack
        spacing={1}
        direction="row"
        justifyContent={{ xs: 'center', sm: 'end' }}
      >
        <Box display={{ xs: 'none', sm: 'block' }}>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <KeyboardDoubleArrowLeftIcon
              sx={{
                border: '1px solid var(--btn-stroke)',
                borderRadius: '50%',
                fontSize: '33px',
                p: 0.8,
              }}
            />
          </button>
        </Box>
        <Pagination
          count={pageCount}
          page={pageIndex + 1}
          onChange={(event, value) => gotoPage(value - 1)}
          color="primary"
        >
          {Array.from({ length: pageCount }, (_, index) => (
            <PaginationItem
              key={index}
              component="div"
              page={index + 1}
              onClick={() => gotoPage(index)}
              disabled={pageIndex === index}
            >
              {index + 1}
            </PaginationItem>
          ))}
        </Pagination>
        <Box display={{ xs: 'none', sm: 'block' }}>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <KeyboardDoubleArrowRightIcon
              sx={{
                border: '1px solid var(--btn-stroke)',
                borderRadius: '50%',
                fontSize: '33px',
                p: 0.8,
              }}
            />
          </button>
        </Box>
      </Stack>
    </Box>
  );
};

export default CustomPagination;
