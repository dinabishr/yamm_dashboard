import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { TableProps } from "../../types/tableProps";

// Generic reusable table component
// this table component accepts any data type and dynamically renders columns based on the provided configuration
// it supports pagination with max 15 rows per page

const CustomTable = <T,>({ data, columns }: TableProps<T>) => {
  const [page, setPage] = useState(0); // State that manages the current page in pagination
  const [rowsPerPage, setRowsPerPage] = useState(15); //state to manage no. of rows per page default: 15 per page

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  //Handles changes to the number of rows displayed per page
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  //Memoized paginated data to improve performance.
  const paginatedData = useMemo(
    () => data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [data, page, rowsPerPage]
  );

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
        margin: 2,
        overflowX: "auto",
        maxWidth: "99%",
      }}
    >
      <Table sx={{ tableLayout: "auto" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f3e5f5" }}>
            {columns.map((col) => (
              <TableCell
                key={String(col.key)}
                sx={{
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  padding: "10px",
                  fontSize: "0.92rem",
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((item, index) => (
            <TableRow key={index}>
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  sx={{
                    padding: "10px",
                  }}
                >
                  {col.render
                    ? col.render(item) // If a custom render function exists, use it, else display raw data
                    : (item[col.key as keyof T] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
      <TablePagination
        rowsPerPageOptions={[15]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default CustomTable;
