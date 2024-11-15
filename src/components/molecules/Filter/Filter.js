import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Grid2 as Grid, Button } from "@mui/material";

import debounce from "lodash.debounce";

const FilterComponent = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    team: "All",
    status: "All",
    priority: "All",
    urgency: "All",
  });

  // Debounced filter handler for smoother UX
  const debouncedFilterChange = debounce((newFilters) => {
    onFilterChange(newFilters);
  }, 300);

  // Update filters and trigger debounced change
  useEffect(() => {
    debouncedFilterChange(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      team: "All",
      status: "All",
      priority: "All",
      urgency: "All",
    });
  };

  return (
    <Grid>
      {/*  4 filter options - team , status, priority, urgency */}
      {/* <Grid container columnSpacing={4}> */}
      <Grid
        container
        columnSpacing={4}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item mb={4}>
          {/* <Grid item size={{ sm: 12, md: 6, lg: 3 }}> */}
          <TextField
            label="Team"
            select
            value={filters.team}
            onChange={(e) => handleFilterChange("team", e.target.value)}
            sx={{ width: "200px" }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="Operations">Operations</MenuItem>
          </TextField>
        </Grid>
        <Grid item mb={4}>
          {/* <Grid item size={{ sm: 12, md: 6, lg: 4 }}> */}
          <TextField
            sx={{ width: "200px" }}
            label="Status"
            select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="triggered">Triggered</MenuItem>
            <MenuItem value="acknowledged">Acknowledged</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
          </TextField>
        </Grid>
        <Grid item mb={4}>
          {/* <Grid item size={{ sm: 12, md: 6, lg: 4 }}> */}
          <TextField
            sx={{ width: "200px" }}
            label="Priority"
            select
            value={filters.priority}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="P1">P1</MenuItem>
            <MenuItem value="P2">P2</MenuItem>
            <MenuItem value="P3">P3</MenuItem>
          </TextField>
        </Grid>
        <Grid item mb={4}>
          {/* <Grid item size={{ sm: 12, md: 6, lg: 4 }}> */}
          <TextField
            sx={{ width: "200px" }}
            label="Urgency"
            select
            value={filters.urgency || ""}
            onChange={(e) => handleFilterChange("urgency", e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* Reset Button */}
      <Grid
        container
        size={12}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100px" }}
      >
        <Grid item>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilterComponent;
