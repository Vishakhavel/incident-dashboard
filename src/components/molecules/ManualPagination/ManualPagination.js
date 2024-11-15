import React, { useState } from "react";
import { Pagination, Box, Typography } from "@mui/material";

const ManualPagination = ({ data = [], itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calculate items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Box>
      {/* Display current items */}
      {/* <Box mb={2}>
        {currentItems.map((item, index) => (
          <Typography key={index} variant="body1">
            {item}
          </Typography>
        ))}
      </Box> */}

      {/* MUI Pagination Controls */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
};

export default ManualPagination;
