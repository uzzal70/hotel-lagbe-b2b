/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import { usePagination, useSortBy, useTable } from 'react-table';
import CustomPagination from './CustomPagination';
import './CustomTable.css';

const CustomTable = ({
  columns,
  data,
  display,
  bgcolor,
  border,
  pageList,
  textAlign,
  cell,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Access the current page
    state: { pageIndex, pageSize },
    gotoPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0, // Initial page index
        pageSize: pageList || 10, // Initial page size
      },
    },
    useSortBy, // Add sorting functionality
    usePagination // Add pagination functionality
  );
  const pageCount = pageOptions.length;
  return (
    <Box
      sx={{
        '.table-header': {
          bgcolor: bgcolor || 'var(--bgcolor)',
        },
        tbody: {
          border: border || '',
          borderColor: bgcolor || 'var(--stroke)',
        },
        'tbody tr': {
          border: border || '',
          borderColor: bgcolor || 'var(--bgcolor)',
          '&:hover': {
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            transform: 'translateY(-1px)',
            transition: 'all 0.3s ease',
          },
        },
        '.table-cell': {
          textAlign: cell || 'center',
        },
        '.table-cell:first-of-type': {
          textAlign: textAlign || 'center',
        },
      }}
    >
      <div className="table-container">
        <table {...getTableProps()} className="custom-table">
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr
                key={i}
                {...headerGroup.getHeaderGroupProps()}
                className="table-header"
              >
                {headerGroup.headers.map((column, j) => (
                  <th
                    key={j}
                    {...column.getHeaderProps(column.getSortByToggleProps())} // Enable sorting on column header click
                    className="table-cell"
                  >
                    {column.render('Header')}
                    {/* <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="table-body">
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i} {...row.getRowProps()} className="table-row">
                  {row.cells.map((cell, j) => (
                    <td key={j} {...cell.getCellProps()} className="table-cell">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Box sx={{ mt: 2, display: display || '', justifyContent: 'center' }}>
        <CustomPagination
          pageIndex={pageIndex}
          pageCount={pageCount}
          gotoPage={gotoPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
        />
      </Box>
    </Box>
  );
};

export default CustomTable;
