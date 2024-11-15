import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Container,
  Grid2 as Grid,
  Button,
  Select,
} from "@mui/material";

// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import DateAdapter from "@mui/lab/AdapterDateFns"; // or @mui/lab/AdapterDayjs for Day.js

// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // Correct import

import debounce from "lodash.debounce";

const FilterComponent = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    createdAt: null,
    updatedAt: null,
    team: "All",
    status: "All",
    priority: "All",
    urgency: "All",
  });

  const [selectedDate, setSelectedDate] = useState(null);

  // Debounced filter handler
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
      createdAt: null,
      updatedAt: null,
      team: "All",
      status: "All",
      priority: "All",
      urgency: "All",
    });
  };

  return (
    <Grid>
      {/*  4 filter options - team , status, priority, urgency */}
      <Grid
        container
        columnSpacing={4}
        // size={{ xs: 1, sm: 1, md: 2, lg: 4, xl: 5 }}
      >
        <Grid item>
          <TextField
            label="Team"
            select
            value={filters.team}
            onChange={(e) => handleFilterChange("team", e.target.value)}
            sx={{ width: "200px" }}
            // placeholder="All"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="Operations">Operations</MenuItem>
          </TextField>
        </Grid>
        <Grid item>
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
        <Grid item>
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
        <Grid item>
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
      <Grid container xs={12} md={4}>
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
