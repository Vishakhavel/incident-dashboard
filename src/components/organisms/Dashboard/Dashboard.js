import React, { useEffect, useMemo, useState, Fragment } from "react";

import {
  CircularProgress,
  Typography,
  Container,
  Grid2 as Grid,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

import IncidentCard from "../../molecules/IncidentCard/";
import Filter from "../../molecules/Filter";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // make the API call
        const incidentApiData = await fetch(`${process.env.REACT_APP_API_URL}`);

        const response = await incidentApiData.json();
        setApiData(response);
        setError("");
      } catch (error) {
        setError(error.message);
        setApiData([]);
        console.error("Error fetching data:", error); // Error logger
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // empty dependency array to ensure the effect runs only once

  useEffect(() => {
    setFilteredData(apiData);
  }, [apiData]);

  const paginatedData = useMemo(
    () => filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [filteredData, page, rowsPerPage]
  );

  // handler functions
  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const handleFilterChange = (filters) => {
    let newData = [...apiData];

    if (filters.createdAt) {
      newData = newData.filter(
        (item) => new Date(item.created_at) >= filters.createdAt
      );
    }

    if (filters.updatedAt) {
      newData = newData.filter(
        (item) => new Date(item.updated_at) <= filters.updatedAt
      );
    }

    if (filters.team !== "All") {
      newData = newData.filter((item) =>
        item.teams.some((team) => team.summary === filters.team)
      );
    }

    if (filters.status !== "All") {
      newData = newData.filter((item) => item.status === filters.status);
    }

    if (filters.priority !== "All") {
      newData = newData.filter(
        (item) => item.priority && item.priority.summary === filters.priority
      );
    }

    if (filters.urgency !== "All") {
      newData = newData.filter((item) => item.urgency === filters.urgency);
    }

    setFilteredData(newData);
    setPage(1); // Reset page to 1 when filters are applied
  };

  return (
    <Fragment>
      {/* {!error && !loading && ( */}
      {!loading && (
        <Grid
          container
          rowSpacing={1}
          columnSpacing={3}
          className="container mx-auto flex flex-col p-4"
        >
          {/* header */}
          <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Container className="flex justify-center mb-4">
              <Typography variant="h2">Incident report</Typography>
            </Container>
          </Grid>
          {/* filter component to filter the incidents based on the API fields */}
          <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Container className="flex justify-center mb-4">
              <Filter onFilterChange={handleFilterChange} />
            </Container>
          </Grid>
          {/* the incident cards */}
          <Grid container className="container mx-auto flex flex-col p-4">
            {(paginatedData || []).map((incidentData) => (
              <Grid item size={{ xs: 12, sm: 12, md: 4, lg: 3 }}>
                <IncidentCard incidentData={incidentData} />
              </Grid>
            ))}
          </Grid>

          {/* API call finished, no error, but no data found */}
          {!error && !loading && filteredData.length === 0 && (
            <Grid
              size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
              className="flex justify-center mb-4"
            >
              <Typography variant="h6" color="textSecondary">
                No data found
              </Typography>
            </Grid>
          )}

          {/* API call finished, but there was an error */}
          {error && !loading && filteredData.length === 0 && (
            <Grid
              size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
              className="flex justify-center mb-4"
            >
              <Typography variant="h6" color="textSecondary">
                Error fetching API - {error}
              </Typography>
            </Grid>
          )}

          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Container className="flex justify-center mb-4">
              <Pagination
                count={Math.ceil(filteredData.length / rowsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Container>
          </Grid>
        </Grid>
      )}

      {loading && (
        <Grid className="flex justify-center items-center w-full h-full absolute">
          <CircularProgress />
        </Grid>
      )}
    </Fragment>
  );
};

export default Dashboard;
